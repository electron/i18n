# Testando Automatizado com um Driver Personalizado

Para escrever testes automatizados para seu aplicativo Electron, você precisará de uma maneira de "conduzir" seu aplicativo. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). No entanto, também é possível escrever seu próprio driver personalizado usando o IPC-over STDIO do nó. O benefício de um driver personalizado é que ele tende a exigir menos sobrecarga que Spectron, e permite que você exponha métodos personalizados ao seu conjunto de testes.

Para criar um driver personalizado, usaremos a API [child_process](https://nodejs.org/api/child_process.html) do Node.js. O conjunto de testes irá gerar o processo do Electron e, em seguida, estabelecer um simples protocolo de mensagens:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawna o processo
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// escuta mensagens IPC do processo app
do aplicativo. n('message', (msg) => {
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
  construtor ({ path, args, env }) {
    este. pcCalls = []

    // inicia processo filho
    env. PP_TEST_DRIVER = 1 // avise o aplicativo que deve ouvir mensagens
    this.process = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // manipula respostas rpc
    this.process. n('mensagem', (message) => {
      // aparece o manipulador
      const rpcCall = isso. PcCalls[message.msgId]
      if (!rpcCall) retornam
      . pcCalls[message.msgId] = null
      // rejeitar/resolver
      se (mensagem. eject) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // espera por pronto
    this.isReady = this.rpc('isReady'). atch((err) => {
      console. rror('Aplicativo falhou ao iniciar', err)
      this.stop()
      process. xit(1)
    })
  }

  // chamado de RPC simples
  // para usar: driver. pc('método', 1, 2, 3).then(...)
  rpc async (cmd, ...args) {
    // envia solicitação rpc
    const msgId = this. pcCalls.length
    this.process. end({ msgId, cmd, args })
    retornar nova Promise((resolve, reject) => this.rpcCalls. ush({ resolve, reject }))
  }

  parar () {
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
    const resolve = await method(. .args)
    processo. end({ msgId, resolve })
  } captura (err) {
    const reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    processo. end({ msgId, reject })
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

const app = new TestDriver({
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
