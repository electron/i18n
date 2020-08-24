# netLog

> Registrar eventos de red para una sesión.

Proceso: [principal](../glossary.md#main-process)</0>

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

Vea [`--log-net-log`](command-line-switches.md#--log-net-logpath) para registrar eventos a lo largo del ciclo de vida de la aplicación.

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Métodos

### `netLog.startLogging(path[, options])`

* `path` String - Ruta de archivo para guardar los registros de red.
* `options` Object (opcional)
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Comienza la agravación de eventos de red en `path`.

### `netLog.stopLogging()`

Devuelve `Promise<String>` - resuelve con una rula de archivo en la que se registraron los registros de red.

Detener la grabación de los eventos de red. Si no se llama, la grabación de los registros de red terminará automáticamente cuando la aplicación se cierre.

## Propiedades

### `netLog.currentlyLogging` _Readonly_

Un propiedad `Boolean` que indica si los registros de red están configurados o no.

### `netLog.currentlyLoggingPath` _Readonly_ _Deprecated_

Un propiedad `String` que devuelve la ruta del archivo de registro actual.
