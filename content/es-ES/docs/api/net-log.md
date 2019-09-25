# netLog

> Registrar eventos de red para una sesión.

Process: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // Despues de algunos eventos de red
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Vea [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) para registrar eventos a lo largo del ciclo de vida de la aplicación.

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Métodos

### `netLog.startLogging(path)`

* `path` String - Ruta de archivo para guardar los registros de red.

Starts recording network events to `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (opcional) 
  * `path` String - File path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

**[Próximamente desaprobado](modernization/promisification.md)**

### `netLog.stopLogging()`

Devuelve `Promise<String>` - resuelve con una rula de archivo en la que se registraron los registros de red.

Parar la grabación de eventos de red. Si no se llama, el registro de red automáticamente terminara cuando la aplicación se cierre.

## Propiedades

### `netLog.currentlyLogging`

Un propiedad `Boolean` que indica si los registros de red están configurados o no.

### `netLog.currentlyLoggingPath`

Un propiedad `String` que devuelve la ruta del archivo de registro actual.