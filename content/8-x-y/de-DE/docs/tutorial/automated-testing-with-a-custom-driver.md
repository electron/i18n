# Automatisiertes Testen mit einem benutzerdefinierten Treiber

Um automatisierte Tests für Ihre Electron-App zu schreiben, benötigen Sie eine Möglichkeit, Ihre Anwendung zu "steuern". [Spektron](https://electronjs.org/spectron) ist eine gängige Lösung, mit der Sie Benutzeraktionen über [WebDriver](http://webdriver.io/) emulieren können. Es ist aber auch möglich, einen eigenen eigenen Treiber mit dem eingebauten IPC-over-STDIO zu schreiben. Der Vorteil eines benutzerdefinierten Treibers ist, dass er weniger Overhead benötigt als Spectron, und lässt Sie Ihre Testsuite mit benutzerdefinierten Methoden ausstatten.

Um einen eigenen Treiber zu erstellen, verwenden wir die [child_process](https://nodejs.org/api/child_process.html) API. Die Testsuite wird den Electron-Prozess spawnen und dann ein einfaches Messaging-Protokoll erstellen:

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

// Eine IPC-Nachricht an die App senden
appProcess.send({ my: 'message' })
```

Aus der Electron-App heraus können Sie Nachrichten hören und Antworten über die Node.js [Prozess](https://nodejs.org/api/process.html) API senden:

```js
// lausche IPC-Nachrichten aus der Testsuite
process.on('message', (msg) => {
  // ...
})

// Eine IPC-Nachricht an die Testsuite senden
process.send({ my: 'message' })
```

Wir können nun mit dem `appProcess` Objekt von der Testsuite zur Electron-App kommunizieren.

Zur Bequemlichkeit können Sie `appProcess` in ein Treiberobjekt einwickeln, das mehr Funktionen auf hohem Niveau bietet. Hier ist ein Beispiel dafür, wie Sie dies tun können:

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

In der App musst du einen einfachen Handler für die RPC-Aufrufe schreiben:

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

Dann können Sie in Ihrer Testsuite Ihren Testtreiber wie folgt verwenden:

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
