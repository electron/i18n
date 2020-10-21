# Testando Automatizado com um Driver Personalizado

Para escrever testes automatizados para seu aplicativo Electron, você precisará de uma maneira de "conduzir" seu aplicativo. [Spectron](https://electronjs.org/spectron) é uma solução comumente usada que permite que você emule ações de usuário via [WebDriver](http://webdriver.io/). No entanto, também é possível escrever seu próprio driver personalizado usando o IPC-over STDIO do nó. O benefício de um driver personalizado é que ele tende a exigir menos sobrecarga que Spectron, e permite que você exponha métodos personalizados ao seu conjunto de testes.

Para criar um driver personalizado, usaremos a API [child_process](https://nodejs.org/api/child_process.html) do Node.js. O conjunto de testes irá gerar o processo do Electron e, em seguida, estabelecer um simples protocolo de mensagens:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
let env = { /* ... */ }
let stdio = ['inherit', 'inherit', 'inherit', 'ipc']
let appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

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
      let rpcCall = this.rpcCalls[message.msgId]
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
    let msgId = this.rpcCalls.length
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
  process. n('mensagem', onMessage)
}

função async onMessage ({ msgId, cmd, args }) {
  let método = METHODS[cmd]
  if (! método do ethod) = () => new Error('Método inválido: ' + cmd)
  tente {
    let resolve = await method(. .args)
    processo. end({ msgId, resolve })
  } catch (err) {
    let reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process. end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // faz qualquer configuração necessária
    return true
  }
  // define seus métodos que podem RPC aqui
}
```

Em seguida, no seu conjunto de testes, você pode usar o seu piloto de teste da seguinte forma:

```js
const test = require('ava')
const electronPath = require('electron')

let app = new TestDriver({
  path: electronPath,
  arges: ['. app'],
  env: {
    NODE_ENV: 'test'
  }
})
teste.before(async => {
  await app.isReady
})
teste. fter.always('limpeza', async t => {
  await app.stop()
})
```
