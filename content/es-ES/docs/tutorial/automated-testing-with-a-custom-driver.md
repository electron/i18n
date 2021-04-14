# Tests automatizados con un Controlador Personalizado

Para escribir tests automatizados para su aplicación Electron, necesitará una forma de "controlar" su aplicación. [Spectron](https://electronjs.org/spectron) es una solución de uso común que le permite emular las acciones de los usuarios a través de [WebDriver](https://webdriver.io/). Sin embargo, también es posible escribir su propio controlador personalizado utilizando el IPC-over-STDIO incorporado en node. El beneficio de un controlador personalizado es que tiende a requerir menos recursos que Spectron, y le permite exponer métodos personalizados a su conjunto de pruebas.

Para crear un controlador personalizado, usaremos la API de Node.js [child_process](https://nodejs.org/api/child_process.html). El conjunto de pruebas generará el proceso de Electron, luego establecerá un protocolo de mensajería simple:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* ... */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// send an IPC message to the app
appProcess.send({ my: 'message' })
```

Desde dentro de la aplicación Electron, puedes escuchar mensajes y enviar respuestas usando la API de Node.js [process](https://nodejs.org/api/process.html):

```js
// listen for IPC messages from the test suite
process.on('message', (msg) => {
  // ...
})

// send an IPC message to the test suite
process.send({ my: 'message' })
```

Ahora podemos comunicar desde la suite de pruebas a la aplicación Electron usando el objeto `appProcess`.

Por conveniencia, es posible que desee encapsular `appProcess` en un objeto controlador, que provea funciones de más alto nivel. Este es un ejemplo de como podría hacerlo:

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
      const rpcCall = this.rpcCalls[message.msgId]
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
    const msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

En la aplicación, necesitará escribir un controlador sencillo para las llamadas RPC:

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

Luego, en su suite de pruebas puede usar sus test-driver del siguiente modo:

```js
const test = require('ava')
const electronPath = require('electron')

const app = new TestDriver({
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
