# Testando Automatizado com um Driver Personalizado

Para escrever testes automatizados para seu aplicativo Electron, você precisará de uma maneira de "conduzir" seu aplicativo. [Spectron](https://electronjs.org/spectron) é uma solução comumente usada que permite que você emule ações de usuário via [WebDriver](http://webdriver.io/). No entanto, também é possível escrever seu próprio driver personalizado usando o IPC-over STDIO do nó. O benefício de um driver personalizado é que ele tende a exigir menos sobrecarga que Spectron, e permite que você exponha métodos personalizados ao seu conjunto de testes.

Para criar um driver personalizado, usaremos a API [child_process](https://nodejs.org/api/child_process.html) do Node.js. O conjunto de testes irá gerar o processo do Electron e, em seguida, estabelecer um simples protocolo de mensagens:

```js
var childProcess = require('child_process')
var electronPath = require('electron')

// spawn the process
var env = { /* ... */ }
var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
var appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// envia uma mensagem IPC para o aplicativo
appProcess.send({ my: 'message' })
```

De dentro do aplicativo Electron, você pode ouvir mensagens e enviar respostas usando o [processo](https://nodejs.org/api/process.html) do Node.js:

```js
// escuta mensagens IPC do suite de teste
process.on('message', (msg) => {
  // ...
})

// envia uma mensagem IPC para o conjunto de testes
process.send({ my: 'message' })
```

Agora podemos nos comunicar da suíte de testes com o aplicativo Electron usando o objeto `appProcess`.

Para conveniência, você pode querer encapsular o `appProcess` em um objeto de driver que fornece mais funções de alto nível. Aqui está um exemplo de como você pode fazer isso:

```js
class TestDriver {
  constructor ({ path, args, env }) {
    this.rpcCalls = []

    // start child process
    env.APP_TEST_DRIVER = 1 // let the app know it should listen for messages
    this.process = childProcess.spawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // handle rpc responses
    this.process.on('message', (message) => {
      // pop the handler
      var rpcCall = this.rpcCalls[message.msgId]
      if (!rpcCall) return
      this.rpcCalls[message.msgId] = null
      // reject/resolve
      if (message.reject) rpcCall.reject(message.reject)
      else rpcCall.resolve(message.resolve)
    })

    // wait for ready
    this.isReady = this.rpc('isReady').catch((err) => {
      console.error('Application failed to start', err)
      this.stop()
      process.exit(1)
    })
  }

  // simple RPC call
  // to use: driver.rpc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // send rpc request
    var msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

No aplicativo, você precisará escrever um manipulador simples para as chamadas RPC:

```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  var method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    var resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    var reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process.send({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // do any setup needed
    return true
  }
  // define your RPC-able methods here
}
```

Em seguida, no seu conjunto de testes, você pode usar o seu piloto de teste da seguinte forma:

```js
var test = require('ava')
var electronPath = require('electron')

var app = new TestDriver({
  path: electronPath,
  args: ['./app'],
  env: {
    NODE_ENV: 'test'
  }
})
test.before(async t => {
  await app.isReady
})
test.after.always('cleanup', async t => {
  await app.stop()
})
```
