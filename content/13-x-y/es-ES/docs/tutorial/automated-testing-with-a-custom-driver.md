# Prueba Automática con un controlador personalizado

Para escribir pruebas automatizadas para su aplicación Electron, necesitará una forma de "manejar" su aplicación. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). Sin embargo, también es posible escribir su propio controlador personalizado utilizando el IPC-over-STDIO incorporado en el nodo. El beneficio de un controlador personalizado es que tiende a requerir menos gastos generales que Spectron, y le permite exponer métodos personalizados a su conjunto de pruebas.

Para crear un controlador personalizado, usaremos la API de Node.js [child_process](https://nodejs.org/api/child_process.html). El conjunto de pruebas generará el proceso de Electron, luego establecerá un protocolo de mensajería simple:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// genera el proceso
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// escucha mensajes IPC desde la app
appProcess. n('message', (msg) => {
  // ...
})

// envía un mensaje IPC a la aplicación 
appProcess.send({ my: 'message' })
```

Desde dentro de la aplicación Electron, puedes escuchar mensajes y enviar respuestas usando la API de Node.js [process](https://nodejs.org/api/process.html):

```js
// escuchar por mensajes IPC desde el suite de prueba
process.on('message', (msg) => {
  // ...
})

// enviar un mensaje IPC al suite de prueba
process.send({ my: 'message' })
```

Ahora podemos comunicar desde la suite de test a la aplicación Electron usando el objeto `appProcess`.

Por conveniencia, es posible que desee encapsular `appProcess` en un objeto controlador, que provea funciones de más alto nivel. Este es un ejemplo de como podría hacerlo:

```js
class TestDriver {
  constructor ({ path, args, env }) {
    esto. pcCalls = []

    // iniciar proceso secundario
    env. PP_TEST_DRIVER = 1 // dejar que la aplicación sepa que debe escuchar los mensajes
    this.process = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // manejar respuestas rpc
    this.process. n('mensaje', (message) => {
      // pop the handler
      const rpcCall = this. pcCalls[message.msgId]
      si (!rpcCall) devuelve
      esto. pcCalls[message.msgId] = null
      // rechazar/resolver
      if (mensaje. eject) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // esperar por lista
    this.isReady = this.rpc('isReady'). atch((err) => {
      consola. rror('La aplicación no pudo iniciar', err)
      this.stop()
      proceso. xit(1)
    })
  }

  // simple llamada RPC
  // para usar: driver. pc('método', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // enviar solicitud rpc
    const msgId = this. pcCalls.length
    this.process. end({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

En la aplicación, necesitará escribir un manejador sencillo para las llamadas RPC:

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

Luego, en tu suite de test, puede usar sus test-driver del siguiente modo:

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
