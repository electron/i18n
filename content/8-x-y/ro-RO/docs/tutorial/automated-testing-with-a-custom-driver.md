# Testare automată cu un driver personalizat

Pentru a scrie teste automate pentru aplicația ta Electron vei avea nevoie de un mod de a "conduce" aplicația ta. [Spectron](https://electronjs.org/spectron) este o soluție utilizată frecvent, care vă permite să emulați acțiunile utilizatorului prin [WebDriver](http://webdriver.io/). Cu toate acestea, este de asemenea posibil să vă scrieți propriul șofer personalizat folosind nodul IPC-over-STDIO încorporat. Beneficiul unui șofer personalizat este că tinde să necesite cheltuieli mai mici decât în cazul spectrului radio, și vă permite să expuneți metode personalizate la grupul de teste.

Pentru a crea un șofer personalizat, vom folosi API-ul [pentru copil_process](https://nodejs.org/api/child_process.html) Node.js. Suita de teste va genera procesul Electron, apoi va stabili un simplu protocol de mesagerie:

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

// trimite un mesaj IPC către aplicația
appProcess.send({ my: 'message' })
```

Din interiorul aplicației Electron, poți asculta mesaje și trimite răspunsuri folosind procesul [Node.js](https://nodejs.org/api/process.html) API:

```js
// ascultă mesajele IPC din suita de teste
process.on('message', (msg) => {
  // ...
})

// trimite un mesaj IPC la suita de teste
proces.send({ my: 'message' })
```

Acum putem comunica din suita de teste către aplicația Electron folosind obiectul `appProcess`.

Pentru comoditate, poate doriți să încheiați `appProcess` într-un obiect șofer care oferă mai multe funcții de înalt nivel. Iată un exemplu despre cum poți face asta:

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

În aplicație trebuie să scrieți un simplu handler pentru apelurile RTP:

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

Apoi, în suita de teste, poți folosi șoferul de probă după cum urmează:

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
