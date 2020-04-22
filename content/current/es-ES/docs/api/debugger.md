## Clase: Debugger

> Un transporte alternativo para el protocolo de depuración remoto de Chrome.

Proceso: [Main](../glossary.md#main-process)

Las herramientas para desarrolladores de Chrome tiene un [special binding](https://chromedevtools.github.io/devtools-protocol/) disponible en JavaScript runtime que permite interactuar con las páginas y equiparlas.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### Eventos de Instancia

#### Evento: 'detach'

Devuelve:

* `event` Event
* `reason` Cadena - Razón para desasociar el depurador.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Evento: 'message'

Devuelve:

* `event` Event
* `method` Cadena- Nombre del método.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever the debugging target issues an instrumentation event.

### Métodos de Instancia

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Cadena (opcional) - Versión solicitada del protocolo de depuración.

Adjunta el depurador al `webContents`.

#### `debugger.isAttached()`

Devuelve `Boolean` - Si un depurador se adjunta o no a la `webContents`.

#### `debugger.detach()`

Desasocia el depurador de la `webContents`.

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (optional) - JSON object with request parameters.

Devuelve `Promise<any>` - Una promesa que resuelve con la respuesta definida por el atributo 'returns' del comando de descripción en el protocolo de depuración remoto o es rechazada indicando el fallo del comando.

Envía el comando al objetivo de la depuración.
