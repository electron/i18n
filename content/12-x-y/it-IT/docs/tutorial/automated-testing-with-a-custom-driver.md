# Test Automatico con un Driver Personalizzato

Per scrivere test automatici per la tua app Electron, avrai bisogno di un modo per "guidare" la tua applicazione. [Spectron](https://electronjs.org/spectron) è una soluzione usata comunemente che ti consente di emulare le azioni utente tramite [WebDriver](https://webdriver.io/). Tuttavia, è anche possibile scrivere il proprio driver personalizzato utilizzando il nodo integrato IPC-over-STDIO. Il vantaggio di un driver personalizzato è che tende a richiedere meno sovraccarico rispetto a Spectron, e ti permette di esporre metodi personalizzati alla tua suite di test.

Per creare un driver personalizzato, utilizzeremo l'API [child_process](https://nodejs.org/api/child_process.html) di Node.js. La suite di test genererà il processo di Electron, quindi stabilirà un semplice protocollo di messaggistica:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// ascolta i messaggi IPC dall'app
appProcess. n('message', (msg) => {
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
    this. pcCalls = []

    // avvia processo figlio
    env. PP_TEST_DRIVER = 1 // far sapere all'app che dovrebbe ascoltare i messaggi
    this.process = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // handle rpc responses
    this.process. n('message', (message) => {
      // pop the handler
      const rpcCall = this. pcCalls[message.msgId]
      se (!rpcCall) restituisce
      questo. pcCalls[message.msgId] = null
      // rigetta/risolve
      se (messaggio. eject) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // aspetta
    this.isReady = this.rpc('isReady'). atch((err) => {
      console. rror('Application failed to start', err)
      this.stop()
      process. xit(1)
    })
  }

  // semplice chiamata RPC
  // da usare: driver. pc('metodo', 1, 2, 3).allora(...)
  async rpc (cmd, ...args) {
    // send rpc request
    const msgId = this. pcCalls.length
    this.process. end({ msgId, cmd, args })
    restituisce la nuova Promise((resolve, reject) => this.rpcCalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

Nell'app, dovresti scrivere un semplice gestore per le chiamate RPC:

```js
if (process.env.APP_TEST_DRIVER) {
  process. n('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  if (! ethod) method = () => new Error('Invalid method: ' + cmd)
  try {
    const resolve = await method(. .args)
    processo. end({ msgId, resolve })
  } catch (err) {
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
    // do any setup needed
    return true
  }
  // define your RPC-able methods here
}
```

Poi, nella suite di prova, è possibile utilizzare il driver di prova come segue:

```js
const test = require('ava')
const electronPath = require('electron')

const app = new TestDriver({
  path: electronPath,
  args: ['. app'],
  env: {
    NODE_ENV: 'test'
  }
})
test.before(async t => {
  await app.isReady
})
test. fter.always('cleanup', async t => {
  await app.stop()
})
```
