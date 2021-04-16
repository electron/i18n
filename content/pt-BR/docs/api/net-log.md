# netLog

> Registrando eventos de rede para uma sessão.

Processo: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require ('electron')

app.whenReady().then(async () => {
  aguard netLog.startLogging ('/path/to/net-log')
  // Depois de alguns eventos de rede
  caminho const = aguard netLog.stopLogging()
  console.log('Net-logs escritos para', caminho)
})
```

Veja [`--log-net-log`](command-line-switches.md#--log-net-logpath) para registrar eventos de rede durante todo o ciclo de vida do aplicativo.

**Nota:** Todos os métodos, a menos que seja especificados, só podem ser usados ​​após o evento `app` quando é emitido.

## Métodos

### `netLog.startLogging (caminho[, opções])`

* `path` String - Caminho de arquivo para registrar registros de rede.
* `options` Object (optional)
  * `captureMode` String (opcional) - Que tipos de dados devem ser capturados. Até padrão, apenas metadados sobre solicitações serão capturados. Definindo-o para `includeSensitive` incluirá cookies e dados de autenticação. A configuração -lo para `everything` incluirá todos os bytes transferidos em soquetes. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Starts recording network events to `path`.

### `netLog.stopLogging()`

Returns `Promise<void>` - resolves when the net log has been flushed to disk.

Stops recording network events. If not called, net logging will automatically end when app quits.

## Propriedades

### `netLog.currentlyLogging` _Readonly_

A `Boolean` property that indicates whether network logs are currently being recorded.
