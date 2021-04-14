## Clase: Debugger

> Un transporte alternativo para el protocolo de depuración remoto de Chrome.

Proceso: [Main](../glossary.md#main-process)

Las herramientas para desarrolladores de Chrome tiene un [special binding][rdp] disponible en JavaScript runtime que permite interactuar con las páginas y equiparlas.

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

* `event` Event
* `reason` Cadena - Razón para desasociar el depurador.

Emitido cuando la sesión de depuración es terminada. Esto ocurre cuando `webContents` es cerrado o el devtools es invocado para el `webContents` adjunto.

#### Evento: 'message'

Devuelve:

* `event` Event
* `method` Cadena- Nombre del método.
* `params` parámetros de cualquier evento definidos por el atributo ' Parameters ' en el protocolo de depuración remota.
* `sessionId` cadena-identificador único de sesión de depuración adjunta, coincidirá con el valor enviado desde `debugger.sendCommand`.

Emitido cada vez que el objetivo de depuración emite un evento de instrumentación.

### Métodos de Instancia

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Cadena (opcional) - Versión solicitada del protocolo de depuración.

Adjunta el depurador al `webContents`.

#### `debugger.isAttached()`

Devuelve `Boolean` - Si un depurador se adjunta o no a la `webContents`.

#### `debugger.detach()`

Desasocia el depurador de la `webContents`.

#### `Debugger. sendCommand (método [, commandParams, sessionId])`

* `method` nombre de método de cadena, debe ser uno de los métodos definidos por el [protocolo de depuración remota][rdp].
* `commandParams` any (opcional) - Objeto JSON con parámetros de la solicitud.
* `sessionId` cadena (opcional)-enviar comando al destino con ID de sesión de depuración asociado. El valor inicial se puede obtener enviando [mensaje de][attachToTarget] Target. attachToTarget.

Devuelve `Promise<any>` - Una promesa que resuelve con la respuesta definida por el atributo 'returns' del comando de descripción en el protocolo de depuración remoto o es rechazada indicando el fallo del comando.

Envía el comando al objetivo de la depuración.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
