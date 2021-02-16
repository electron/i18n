## Clase: Debugger

> Un transporte alternativo para el protocolo de depuración remoto de Chrome.

Proceso: [principal](../glossary.md#main-process)</0>

Las herramientas para desarrolladores de Chrome tiene un [special binding](https://chromedevtools.github.io/devtools-protocol/) disponible en JavaScript runtime que permite interactuar con las páginas y equiparlas.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

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

* `event`
* `reason` Cadena - Razón para desasociar el depurador.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Evento: 'message'

Devuelve:

* `event` Event
* `method` Cadena- Nombre del método.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Emitido cada vez que el objetivo de depuración emite un evento de instrumentación.

### Métodos de Instancia

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Cadena (opcional) - Versión solicitada del protocolo de depuración.

Adjunta el depurador al `webContents`.

#### `debugger.isAttached()`

Devuelve `Boolean` - Si un depurador se adjunta o no a la `webContents`.

#### `debugger.detach()`

Desasocia el depurador de la `webContents`.

#### `debugger.sendCommand(method[, commandParams, sessionId])`

* `method` String - Nombre del método, debe ser un de los métodos definido por el [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (opcional) - Objeto JSON con parámetros de la solicitud.
* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget](https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget) message.

Devuelve `Promise<any>` - Una promesa que resuelve con la respuesta definida por el atributo 'returns' del comando de descripción en el protocolo de depuración remoto o es rechazada indicando el fallo del comando.

Envía el comando al objetivo de la depuración.
