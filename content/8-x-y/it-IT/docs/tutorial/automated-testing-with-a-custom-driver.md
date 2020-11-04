# Test Automatico con un Driver Personalizzato

Per scrivere test automatici per la tua app Electron, avrai bisogno di un modo per "guidare" la tua applicazione. [Spectron](https://electronjs.org/spectron) è una soluzione comunemente utilizzata che consente di emulare le azioni degli utenti tramite [WebDriver](http://webdriver.io/). Tuttavia, è anche possibile scrivere il proprio driver personalizzato utilizzando il nodo integrato IPC-over-STDIO. Il vantaggio di un driver personalizzato è che tende a richiedere meno sovraccarico rispetto a Spectron, e ti permette di esporre metodi personalizzati alla tua suite di test.

Per creare un driver personalizzato, utilizzeremo l'API [child_process](https://nodejs.org/api/child_process.html) di Node.js. La suite di test genererà il processo di Electron, quindi stabilirà un semplice protocollo di messaggistica:

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

// invia un messaggio IPC all'app
appProcess.send({ my: 'message' })
```

Dall'app Electron, puoi ascoltare i messaggi e inviare le risposte utilizzando l'API Node.js [processa](https://nodejs.org/api/process.html):

```js
// ascolta i messaggi IPC dalla suite di test
process.on('message', (msg) => {
  // ...
})

// invia un messaggio IPC alla suite di test
process.send({ my: 'message' })
```

Ora possiamo comunicare dalla suite di test all'app Electron utilizzando l'oggetto `appProcess`.

Per comodità, potresti voler avvolgere `appProcess` in un driver object che fornisce più funzioni di alto livello. Ecco un esempio di come si può fare questo:

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

Nell'app, dovresti scrivere un semplice gestore per le chiamate RPC:

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

Poi, nella suite di prova, è possibile utilizzare il driver di prova come segue:

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
