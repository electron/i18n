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
* objeto `options` (opcional)
  * `captureMode` String (opcional) - Que tipos de dados devem ser capturados. Até padrão, apenas metadados sobre solicitações serão capturados. Definindo-o para `includeSensitive` incluirá cookies e dados de autenticação. A configuração -lo para `everything` incluirá todos os bytes transferidos em soquetes. Pode ser `default`, `includeSensitive` ou `everything`.
  * `maxFileSize` Número (opcional) - Quando o registro crescer além deste tamanho, o registro parará automaticamente. Padrão para ilimitado.

Retornos `Promise<void>` - resolve quando o registro da rede começou a ser gravado.

Começa a gravar eventos de rede para `path`.

### `netLog.stopLogging()`

Devoluções `Promise<void>` - resolve quando o registro da rede foi liberado para o disco.

Para de gravar eventos da rede. Se não for chamado, o registro líquido terminará automaticamente quando o aplicativo sair.

## Propriedades

### `netLog.currentlyLogging` _Readonly_

Uma propriedade `Boolean` que indica se os registros de rede estão sendo gravados.
