# netLog

> Registrar eventos de red para una sesión.

Proceso: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require (' Electron ')

app. whenReady (). then (Async () => {
  Await a netLog. startLogging ('/Path/to/net-log ')
  //después de algunos eventos de red
  const path = Await netLog. stopLogging ()
  Console. log (' net-logs escrito a ', Path)
})
```

Vea [`--log-net-log`](command-line-switches.md#--log-net-logpath) para registrar eventos a lo largo del ciclo de vida de la aplicación.

**Nota:** Todos los métodos salvo los especificados pueden ser usados solo después de que el evento `listo` del módulo de la `aplicación` sea emitido.

## Métodos

### `netLog. startLogging (path [, Options])`

* `path` String - Ruta de archivo para guardar los registros de red.
* `options` Object (opcional)
  * `captureMode` String (opcional) - Que tipos de datos deberían ser capturados. Por defecto, solo metadatos sobre las solicitudes serán capturados. Estableciendo esto a `includeSensitive` incluirá cookies y datos de autenticación. Estableciéndolo a `everything` incluirá todos los bytes transferidos en los sockets. Puede ser `default`, `includeSensitive` o `everything`.
  * `maxFileSize` Number (opcional) - Cunado el registro crece más allá de este tamaño el registro se detendrá automáticamente. Por defecto ilimitado.

Devuelve `Promise<void>` - se resuelve cuando el net log ha comenzado a grabar.

Comienza la agravación de eventos de red en `path`.

### `netLog.stopLogging()`

Devuelve `Promise<void>` - se resuelve cuando el net log se ha descargado en el disco.

Detener la grabación de los eventos de red. Si no se llama, la grabación de los registros de red terminará automáticamente cuando la aplicación se cierre.

## Propiedades

### `netLog.currentlyLogging` _SoloLectura_

Una propiedad `Boolean` que indica si los registros de red están siendo grabados actualmente.
