## Clase: Debugger

> Un transporte alternativo para el protocolo de depuración remoto de Chrome.

Proceso: [principal](../glossary.md#main-process)</0>

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

* `method` String - Nombre del método, debe ser un de los métodos definido por el [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Objeto (opcional) - El objeto JSON con parámetros de la solicitud.
* `callback` Function (optional) - Response
  * `error` Objeto- Mensaje de error que indica el fallo del comando.
  * `result` Any - Respuesta definida por el atributo "returns" de la descripción del comando en el protocolo de depuración remoto.

Envía el comando al objetivo de la depuración.

**[Próximamente desaprobado](modernization/promisification.md)**

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Nombre del método, debe ser un de los métodos definido por el [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` Objeto (opcional) - El objeto JSON con parámetros de la solicitud.

Devuelve `Promise<any>` - Una promesa que resuelve con la respuesta definida por el atributo 'returns' del comando de descripción en el protocolo de depuración remoto o es rechazada indicando el fallo del comando.

Envía el comando al objetivo de la depuración.

### Eventos de Instancia

#### Evento: 'detach'

* `event` Event
* `reason` Cadena - Razón para desasociar el depurador.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Evento: 'message'

* `evento` Evento
* `method` Cadena- Nombre del método.
* `params` Objeto - Los parámetros del evento definidos por el atributo "parameters" en el protocolo de depuración remoto.

Aparece cada vez que se depura el evento de instrumentación de problemas del objetivo.
