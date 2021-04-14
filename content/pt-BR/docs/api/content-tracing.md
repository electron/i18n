# contentTracing

> Colete dados de rastreamento do Chromium para encontrar gargalos de desempenho e operações lentas.

Processo: [Main](../glossary.md#main-process)

Este módulo não inclui uma interface web. Para visualizar os traços gravados, use [][]do visualizador de rastreamento, disponível em `chrome://tracing` no Chrome.

**Nota:** Voce nao deve usar este modulo ate que o '`ready` event' do modulo da aplicacao esteja finalizado e emitido.

```javascript
const { app, contentTracing } = require ('electron')

app.whenReady().then(() => {
  (async () => {
    aguardam contentTracing.startRecording({
      included_categories: ['*']
    })
    console.log('Rastreamento iniciado')
    aguardam nova Promessa(resolver => setTimeout(resolver, 5000))
    caminho const = aguarde contentTracing.stopRecording()
    console.log('Rastrear dados gravados em ' + caminho)
  })()
})
```

## Métodos

O módulo `contentTracing` tem os seguintes métodos:

### `contentTracing.getCategories()`

Devoluções `Promise<String[]>` - resolve com uma série de grupos de categoria uma vez que todos os processos infantis reconheceram a solicitação `getCategories`

Obtenha um conjunto de grupos de categoria. Os grupos de categoria podem mudar à medida que novos caminhos de código são alcançados. Veja também a lista [das categorias de rastreamento incorporado ](https://chromium.googlesource.com/chromium/src/+/master/base/trace_event/builtin_categories.h).

> **NOTA:** Electron adiciona uma categoria de rastreamento não padrão chamada `"electron"`. Esta categoria pode ser usada para capturar eventos de rastreamento específicos de elétrons.

### `contentTracing.startRecording(opções)`

* `options` (</a> | traceconfig

 [TraceCategoriesAndOptions](structures/trace-categories-and-options.md))</li> </ul> 
  
  Devoluções `Promise<void>` - resolvidas uma vez que todos os processos infantis tenham reconhecido o pedido `startRecording` .
  
  Comece a gravar em todos os processos.
  
  A gravação começa imediatamente localmente e assincronicamente em processos infantis assim que receberem a solicitação Habilitar Gravação.
  
  Se uma gravação já estiver sendo em execução, a promessa será imediatamente resolvida, pois apenas uma operação de rastreamento pode estar em andamento de cada vez.
  
  

### `contentTracing.stopRecording ([resultFilePath])`

* `resultFilePath` String (opcional)

Devoluções `Promise<String>` - resolve com um caminho para um arquivo que contém os dados rastreados uma vez que todos os processos infantis tenham reconhecido a solicitação `stopRecording`

Pare de gravar em todos os processos.

Os processos infantis normalmente armazenam dados de rastreamento e raramente dão descarga e enviam rastrear dados até o processo principal. Isso ajuda a minimizar a sobrecarga de tempo de execução de rastreamento, uma vez que o envio de dados de rastreamento sobre iPC pode ser uma operação cara. Então, para terminar o rastreamento, o Cromo pede assincronamente a todos os processos infantis que lavem qualquer dados de rastreamento pendentes.

Os dados do rastreamento serão escritos em `resultFilePath`. Se `resultFilePath` estiver vazio ou não fornecido, os dados de rastreamento serão escritos em um arquivo temporário, e o caminho será devolvido na promessa.



### `contentTracing.getTraceBufferUsage()`

Devoluções `Promise<Object>` - Resolve com um objeto contendo o `value` e `percentage` de uso máximo do buffer de rastreamento

* Número de `value`
* Número de `percentage`

Obtenha o uso máximo entre os processos de buffer de rastreamento como uma porcentagem do estado completo.

[1]: https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md

[2]: https://chromium.googlesource.com/catapult/+/HEAD/tracing/README.md
