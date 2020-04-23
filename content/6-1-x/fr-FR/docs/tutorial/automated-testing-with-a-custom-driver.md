# Test automatisé avec un driver personnalisé

Afin d'écrire des tests automatisés pour votre application Electron, vous aurez besoin d'un moyen de "piloter" votre application. [Spectron](https://electronjs.org/spectron) est une solution usuelle, qui vous laisse émuler des actions utilisateur avec [WebDriver](http://webdriver.io/). Toutefois, il est également possible d'écrire votre propre driver personnalisé avec l'IPC-over-STDIO intégré à node.js. L'avantage d'un driver personnalisé est qu'il demande moins de ressources que Spectron, et qu'il vous laisse éprouver des méthodes personnalisées à votre suite de tests.

Pour créer un driver personnalisée, nous utiliserons l'API [child_process](https://nodejs.org/api/child_process.html) de nodejs. La suite de tests fera apparaître le processus Electron, puis établira un protocole de messagerie basique :

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

// send an IPC message to the app
appProcess.send({ my: 'message' })
```

Depuis l'application Electron, vous pouvez rester en écoute des messages entrant et répondre avec l'API [process](https://nodejs.org/api/process.html) de nodejs :

```js
// listen for IPC messages from the test suite
process.on('message', (msg) => {
  // ...
})

// send an IPC message to the test suite
process.send({ my: 'message' })
```

We can now communicate from the test suite to the Electron app using the `appProcess` object.

For convenience, you may want to wrap `appProcess` in a driver object that provides more high-level functions. Here is an example of how you can do this:

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

In the app, you'd need to write a simple handler for the RPC calls:

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

Then, in your test suite, you can use your test-driver as follows:

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
