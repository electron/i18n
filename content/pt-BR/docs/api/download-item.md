## Class: DownloadItem

> Controla o download de arquivos de fontes remotas.

Processo: [Main](../glossary.md#main-process)

`DownloadItem` é um [EventEmitter][event-emitter] que representa um item de download no Electron. É usado no evento `will-download` da classe `Session`, e permite aos usuários controlarem o item de download.

```javascript
// No processo main.
const { BrowserWindow } = require ('electron')
const win = novo BrowserWindow()
win.webContents.session.on('will-download', (evento, item, webContents) => {
  // Defina o caminho de salvamento, fazendo com que a Electron não solicite uma caixa de diálogo save.
  item.setSavePath ('/tmp/save.pdf')

  item.on ('atualizado', (evento, estado) => {
    se (estado === 'interrompido') {
      console.log('O download é interrompido, mas pode ser retomado')

      } console
        .log('Download é pausado')
      } else {
        console.log('Received bytes: ${item.getReceivedBytes()}')
      }
    }
  }) item
  .once('done', (evento, estado) => {
    se (estado === 'concluído') {
      console.log('Baixar com sucesso')
    } else {
      console.log('Download falhou: ${state}')
    }
  })
})
```

### Eventos de instância

#### Evento: 'atualizado'

Retorna:

* `event` Event
* `state` String - Pode ser `progressing` ou `interrupted`.

Emitida quando o download foi atualizado e ainda não terminou.

`state` pode ser um dos seguintes:

* `progressing` - O download está em andamento.
* `interrupted` - O download foi interrompido e pode ser retomado.

#### Evento: 'done'

Retorna:

* `event` Event
* `state` String - Pode ser `completed`, `cancelled` ou `interrupted`.

Emitido quando o download está em um estado terminal. Isso inclui um download completo de , um download cancelado (via `downloadItem.cancel()`), e interrompido download que não pode ser retomado.

`state` pode ser um dos seguintes:

* `completed` - O download foi concluído com sucesso.
* `cancelled` - O download foi cancelado.
* `interrupted` - O download foi interrompido e não pode ser retomado.

### Métodos de Instância

O objeto `downloadItem` tem os seguintes métodos:

#### `downloadItem.setSavePath(caminho)`

* `path` String - Defina o caminho do arquivo de salvamento do item de download.

A API só está disponível na função de retorno de chamada `will-download` da sessão. Se `path` não existir, Electron tentará fazer o diretório recursivamente. Se o usuário não definir o caminho de salvamento através da API, a Electron usará a rotina de original para determinar o caminho de salvamento; isso geralmente solicita um diálogo de salvamento.

#### `downloadItem.getSavePath()`

Devoluções `String` - O caminho de salvar do item de download. Este será o caminho definido através de `downloadItem.setSavePath(path)` ou o caminho selecionado a partir do diálogo de salvar mostrado.

#### `downloadItem.setSaveDialogOptions(opções)`

* `options` SalvarDialogOptions - Defina as opções de diálogo de arquivos de salvamento. Este objeto tem as mesmas propriedades que o parâmetro `options` de [`dialog.showSaveDialog()`](dialog.md).

Esta API permite que o usuário defina opções personalizadas para a caixa de diálogo de salvamento que abre para o item de download por padrão. A API só está disponível na função de retorno de chamada `will-download` da sessão.

#### `downloadItem.getSaveDialogOptions()`

Devoluções `SaveDialogOptions` - Retorna o objeto previamente definido por `downloadItem.setSaveDialogOptions(options)`.

#### `downloadItem.pause()`

Pausa o download.

#### `downloadItem.isPaused()`

Devoluções `Boolean` - Se o download é pausado.

#### `downloadItem.resume()`

Retoma o download que foi pausado.

**Nota:** Para habilitar downloads resumiveles o servidor do que você está baixando deve suportar solicitações de intervalo e fornecer valores de cabeçalho `Last-Modified` e `ETag` . Caso contrário, `resume()` descartará bytes recebidos anteriormente e reiniciará o download desde o início.

#### `downloadItem.canResume()`

Devoluções `Boolean` - Se o download pode ser retomado.

#### `downloadItem.cancel()`

Cancela a operação de download.

#### `downloadItem.getURL()`

Devoluções `String` - A URL de origem de onde o item é baixado.

#### `downloadItem.getMimeType()`

Devoluções `String` - O tipo de mime de arquivos.

#### `downloadItem.hasUserGesture()`

Devoluções `Boolean` - Se o download tem gesto do usuário.

#### `downloadItem.getFilename()`

Devoluções `String` - O nome do arquivo do item de download.

**Nota:** O nome do arquivo nem sempre é o mesmo que o real salvo no disco local. Se o usuário mudar o nome do arquivo em uma caixa de caixa de salvamento de download solicitada, o nome real do arquivo salvo será diferente.

#### `downloadItem.getTotalBytes()`

Devoluções `Integer` - O tamanho total em bytes do item de download.

Se o tamanho é desconhecido, ele retorna 0.

#### `downloadItem.getReceivedBytes()`

Devoluções `Integer` - Os bytes recebidos do item de download.

#### `downloadItem.getContentDisposition()`

Retorna `String` - O campo Conteúdo-Disposição da resposta cabeçalho.

#### `downloadItem.getState()`

Retorno `String` - O estado atual. Pode ser `progressing`, `completed`, `cancelled` ou `interrupted`.

**Nota:** Os seguintes métodos são úteis especificamente para retomar um item `cancelled` quando a sessão é reiniciada.

#### `downloadItem.getURLChain()`

Devoluções `String[]` - A cadeia completa de URL do item, incluindo quaisquer redirecionamentos.

#### `downloadItem.getLastModifiedTime()`

Retornos `String` - Valor do cabeçalho modificado pela última vez.

#### `downloadItem.getETag()`

Retornos `String` - Valor do cabeçalho ETag.

#### `downloadItem.getStartTime()`

Retorna `Double` - Número de segundos desde a época unix quando o download foi começou.

### Propriedades de Instância

#### `downloadItem.savePath`

Uma propriedade `String` que determina o caminho do arquivo salvar do item de download.

A propriedade só está disponível na função de retorno de chamada `will-download` da sessão. Se o usuário não definir o caminho de salvamento através da propriedade, a Electron usará a rotina de original para determinar o caminho de salvamento; isso geralmente solicita um diálogo de salvamento.

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
