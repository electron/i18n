# Prueba Automática con un controlador personalizado

Para escribir pruebas automatizadas para su aplicación Electron, necesitará una forma de "manejar" su aplicación. Spectron es una solución de uso común que le permite emular acciones de usuario a través de WebDriver. Sin embargo, también es posible escribir su propio controlador personalizado utilizando el IPC-over-STDIO incorporado en el nodo. El beneficio de un controlador personalizado es que tiende a requerir menos gastos generales que Spectron, y le permite exponer métodos personalizados a su conjunto de pruebas.

Para crear un controlador personalizado, usaremos la API child_process de nodejs. El conjunto de pruebas generará el proceso de Electron, luego establecerá un protocolo de mensajería simple:

```js
var childProcess = require('child_process')
var electronPath = require('electron')

// spawn the process
var env = { /* ... */ }
var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
var appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// escucha por un mensaje IPC desde la aplicación
appProcess.on('message', (msg) => {
  // ...
})

// envía un mensaje IPC a la aplicación 
appProcess.send({ my: 'message' })
```

Desde dentro de la aplicación Electron, usted puede escuchar mensajes y enviar respuestas usando la API [process](https://nodejs.org/api/process.html) de nodejs:

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
    this.rpcCalls = []

    // iniciar procesos hijos
    env.APP_TEST_DRIVER = 1 // hazle saber a la aplicación que debe escuchar los mensajes
    this.process = childProcess.spawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // manejar las respuestas rpc
    this.process.on('message', (message) => {
      // Destruye el manejador
      var rpcCall = this.rpcCalls[message.msgId]
      if (!rpcCall) return
      this.rpcCalls[message.msgId] = null
      // reject/resolve
      if (message.reject) rpcCall.reject(message.reject)
      else rpcCall.resolve(message.resolve)
    })

    // esperar a que este listo
    this.isReady = this.rpc('isReady').catch((err) => {
      console.error('La aplicación fallo ', err)
      this.stop()
      process.exit(1)
    })
  }

  // simple llamada RPC 
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

En la aplicación, necesitará escribir un manejador sencillo para las llamadas RPC:

```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  var method = METHODS[cmd]
  if (!method) method = () => new Error('Método inválido: ' + cmd)
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

Luego, en tu suite de test, puede usar sus test-driver del siguiente modo:

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
