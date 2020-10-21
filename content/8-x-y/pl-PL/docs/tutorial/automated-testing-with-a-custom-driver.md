# Automatyczne testowania z pomocą niestandardowego sterownika

Aby zapisywać zautomatyzowane testy dla twojej aplikacji Electron, będziesz potrzebował sposobu na "dyskowanie" aplikacji. [Spectron](https://electronjs.org/spectron) to często używane rozwiązanie, które pozwala emulować działania użytkownika przez [WebDriver](http://webdriver.io/). Możliwe jest jednak również zapisanie własnego sterownika za pomocą wbudowanego IPC węzła poza STDIO. Zaletą niestandardowego sterownika jest to, że zazwyczaj wymaga on mniej uderzeń niż Spectron, i pozwala ujawnić niestandardowe metody swojemu zestawowi testowemu.

Aby utworzyć własny kierowcę, używamy API Node.js' [child_process](https://nodejs.org/api/child_process.html). Pakiet testowy pojawi się proces Electrona, a następnie ustanowi prosty protokół wiadomości:

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

// wyślij wiadomość IPC do aplikacji
appProcess.send({ my: 'message' })
```

Z aplikacji Electron możesz słuchać wiadomości i wysyłać odpowiedzi za pomocą procesu Node.js [](https://nodejs.org/api/process.html) API:

```js
// nasłuchuj wiadomości IPC z pakietu testowego
process.on('message', (msg) => {
  // ...
})

// wyślij wiadomość IPC do testowego zestawu
process.send({ my: 'message' })
```

Możemy teraz komunikować się z pakietu testowego do aplikacji Electron za pomocą obiektu `appProcess`.

Dla wygody, możesz zebrać `appProcess` w obiekcie sterownika, który zapewnia więcej funkcji wysokiego poziomu. Oto przykład tego, jak można to zrobić:

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

W aplikacji musisz napisać prosty program obsługi połączeń RPC:

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

Następnie, w zestawie testowym, możesz użyć sterownika testowego w następujący sposób:

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
