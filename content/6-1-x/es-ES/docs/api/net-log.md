# netLog

> Registrar eventos de red para una sesión.

Proceso: [principal](../glossary.md#main-process)</0>

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

Comienza la agravación de eventos de red en `path`.

### `netLog.stopLogging([callback])`

* `retrocallback` Funcion (opcional)
  * `path` String - Ruta de archivo en el cual se guardo los registros de red.

Detener la grabación de los eventos de red. Si no se llama, la grabación de los registros de red terminará automáticamente cuando la aplicación se cierre.

**[Próximamente desaprobado](modernization/promisification.md)**

### `netLog.stopLogging()`

Devuelve `Promise<String>` - resuelve con una rula de archivo en la que se registraron los registros de red.

Parar la grabación de eventos de red. Si no se llama, el registro de red automáticamente terminara cuando la aplicación se cierre.

## Propiedades

### `netLog.currentlyLogging`

Un propiedad `Boolean` que indica si los registros de red están configurados o no.

### `netLog.currentlyLoggingPath`

Un propiedad `String` que devuelve la ruta del archivo de registro actual.
