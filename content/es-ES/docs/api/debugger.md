## Clase: Debugger

> Un transporte alternativo para el protocolo de depuración remoto de Chrome.

Process: [Main](../glossary.md#main-process)

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

### Métodos de Instancia

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Cadena (opcional) - Versión solicitada del protocolo de depuración.

Adjunta el depurador al `webContents`.

#### `debugger.isAttached()`

Devuelve `Boolean` - Si un depurador se adjunta o no a la `webContents`.

#### `debugger.detach()`

Desasocia el depurador de la `webContents`.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Objeto (opcional) - El objeto JSON con parámetros de la solicitud.
* `callback` Function (opcional) - Respuesta 
  * `error` Objeto- Mensaje de error que indica el fallo del comando.
  * `result` Any - Respuesta definida por el atributo "returns" de la descripción del comando en el protocolo de depuración remoto.

Envía el comando al objetivo de la depuración.

**[Deprecated Soon](promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Objeto (opcional) - El objeto JSON con parámetros de la solicitud.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Envía el comando al objetivo de la depuración.

### Eventos de Instancia

#### Evento: 'detach'

* `event` Evento
* `reason` Cadena - Razón para desasociar el depurador.

Aparece cuando la sesión del depurador es finalizada. Esto sucede ya sea cuando se cierra `webContents` o cuando se invoca las herramientas del desarrollador para el adjunto `webContents`.

#### Evento: 'message'

* `evento` Evento
* `method` Cadena- Nombre del método.
* `params` Objeto - Los parámetros del evento definidos por el atributo "parameters" en el protocolo de depuración remoto.

Aparece cada vez que se depura el evento de instrumentación de problemas del objetivo.