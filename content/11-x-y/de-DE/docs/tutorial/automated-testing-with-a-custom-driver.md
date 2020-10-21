# Automatisiertes Testen mit einem benutzerdefinierten Treiber

Um automatisierte Tests für Ihre Electron-App zu schreiben, benötigen Sie eine Möglichkeit, Ihre Anwendung zu "steuern". [Spektron](https://electronjs.org/spectron) ist eine gängige Lösung, mit der Sie Benutzeraktionen über [WebDriver](http://webdriver.io/) emulieren können. Es ist aber auch möglich, einen eigenen eigenen Treiber mit dem eingebauten IPC-over-STDIO zu schreiben. Der Vorteil eines benutzerdefinierten Treibers ist, dass er weniger Overhead benötigt als Spectron, und lässt Sie Ihre Testsuite mit benutzerdefinierten Methoden ausstatten.

Um einen eigenen Treiber zu erstellen, verwenden wir die [child_process](https://nodejs.org/api/child_process.html) API. Die Testsuite wird den Electron-Prozess spawnen und dann ein einfaches Messaging-Protokoll erstellen:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// Prozess spawnen
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// IPC-Nachrichten aus der App
appProcess hören. n('message', (msg) => {
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
Klasse TestDriver {
  Konstruktor ({ path, args, env }) {
    dies. pcalls = []

    // Kindprozess starten
    env. PP_TEST_DRIVER = 1 // Lassen Sie die App wissen, dass sie auf Nachrichten lauschen sollte
    this.process = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // rpc-Antworten handhaben
    this.process n('Nachricht', (message) => {
      // Laden Sie den Handler
      const rpcCall = dies. pcalls[message.msgId]
      wenn (!rpcCall)
      zurückgibt. pcalls[message.msgId] = null
      // zurückweisen/auflösen
      if (message). eject) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // warten auf bereit
    this.isReady = this.rpc('isReady'). atch((err) => {
      Konsole. rror('Anwendung konnte nicht starten', err)
      this.stop()
      Prozess. xit(1)
    })
  }

  // einfacher RPC-Aufruf
  // zum Benutzen: Treiber. pc('Methode', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // rpc request
    const msgId = this senden. pcCalls.length
    this .process end({ msgId, cmd, args })
    return new Promise(resolve, reject) => this.rpcCalls. ush({ resolve, reject }))
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
  let method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    const resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    const reject = {
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
  warten app.stop()
})
```
