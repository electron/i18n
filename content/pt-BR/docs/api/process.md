# processado

> Extensões para objeto process.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

O objeto `process` do Electron estende do [objeto `process` do Node.js](https://nodejs.org/api/process.html). Ele adiciona os seguintes eventos, propriedades e métodos:

## Sandbox

Em renderizadores de caixa de areia, o objeto `process` contém apenas um subconjunto das APIs:

- `acidente() acidente()`
- `hang() hang()`
- `getCreationTime()`
- `getHeapStatistics()`
- `getBlinkMemoryInfo()`
- `getProcessMemoryInfo()`
- `getSystemMemoryInfo()`
- `getSystemVersion()`
- `obterCPUUsage()`
- `getIOCounters()`
- `Argv`
- `execPath`
- `env`
- `Pid`
- `Arco`
- `plataforma`
- `Sandboxed`
- `tipo`
- `versão`
- `Versões`
- `mas`
- `windowsStore`

## Eventos

### Evento: 'loaded'

Emitido quando o Electron já carregou seu script de inicialização interno e começa a carregar a página da web ou o script principal.

Ele pode ser usado pelo script de pré-carga para adicionar símbolos globais de nó removidos de volta ao escopo global quando a integração do nó é desligada:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Propriedades

### `process.defaultApp` _Readonly_

Um `Boolean`. Quando o aplicativo é iniciado sendo passado como parâmetro para o aplicativo padrão, este propriedade é `true` no processo principal, caso contrário é `undefined`.

### `process.isMainFrame` _Readonly_

Um `Boolean`, `true` quando o contexto renderizador atual é o renderizador "principal" quadro. Se você quiser o ID do quadro atual, você deve usar `webFrame.routingId`.

### `process.mas` _Readonly_

Um `Boolean`. Para a construção da Mac App Store, esta propriedade é `true`, para outras construções é `undefined`.

### `process.noAsar`

Uma `Boolean` que controla o suporte ASAR dentro de sua aplicação. Definindo isso para `true` desativará o suporte para `asar` arquivos nos módulos incorporados do Node.

### `process.noDeprecation`

Um `Boolean` que controla se os avisos de depreciação são impressos ou não para `stderr`. Definindo isso para `true` silenciará os avisos de depreciação. Esta propriedade é usada em vez da bandeira da linha de comando `--no-deprecation` .

### `process.resourcesPath` _Readonly_

Uma `String` que representa o caminho para o diretório de recursos.

### `process.sandboxed` _Readonly_

Um `Boolean`. Quando o processo de renderização é sandboxed, esta propriedade é `true`, caso contrário é `undefined`.

### `process.throwDeprecation`

Uma `Boolean` que controla se os avisos de depreciação serão ou não lançados como exceções . Definindo isso para `true` irá lançar erros para depreciações. Esta propriedade é usada em vez da bandeira da linha de comando `--throw-deprecation` .

### `process.traceDeprecation`

Um `Boolean` que controla se as depreciações impressas ou não `stderr` incluem seu traço de pilha. Definindo isso para `true` imprimirá traços de pilha para depreciações. Esta propriedade é em vez da bandeira da linha de comando `--trace-deprecation` .

### `process.traceProcessWarnings`

Uma `Boolean` que controla se os avisos de processo impressos ou não para `stderr` incluem seu rastreamento de pilha. Definindo isso para `true` imprimirá traços de pilha para avisos de processo (incluindo depreciações). Esta propriedade é em vez do comando `--trace-warnings` bandeira da linha.

### `process.type` _Readonly_

Um `String` representando o tipo do processo atual, pode ser:

* `browser` - O processo principal
* `renderer` - Um processo de renderização
* `worker` - Em um web worker

### `process.versions.chrome` _Readonly_

Um `String` representando a string de versão do Chrome.

### `process.versions.electron` _Readonly_

Um `String` representando a sequência de versão de Electron.

### `process.windowsStore` _Readonly_

Um `Boolean`. Se o aplicativo estiver sendo executado como um aplicativo da Windows Store (appx), esta propriedade é `true`, para o contrário é `undefined`.

## Métodos

O objeto `process` tem os seguintes métodos:

### `process.crash()`

Causa o fio principal do processo atual.

### `process.getCreationTime()`

Devoluções `Number | null` - O número de milissegundos desde época, ou `null` se a informação não estiver disponível

Indica o tempo de criação da aplicação. O tempo é representado como número de milissegundos desde a época. Ele retorna nulo se não conseguir o tempo de criação do processo.

### `process.getCPUUsage()`

Retornos [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` __Linux do Windows</em> _</h3>

Retornos [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Retorna `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Booleano

Retorna um objeto com estatísticas de pilha V8. Note-se que todas as estatísticas são relatadas em Kilobytes.

### `process.getBlinkMemoryInfo()`

Retorna `Object`:

* `allocated` Inteiro - Tamanho de todos os objetos alocados em Kilobytes.
* `marked` Inteiro - Tamanho de todos os objetos marcados em Kilobytes.
* `total` Inteiro - Total de espaço alocado em Kilobytes.

Retorna um objeto com informações de memória Blink. Pode ser útil para depurar problemas de memória relacionados à renderização / DOM. Observe que todos os valores são reportados em Kilobytes.

### `process.getProcessMemoryInfo()`

`Promise<ProcessMemoryInfo>` de retornos - Resolve com um</a>processmemoryInfo

</p> 

Retorna um objeto que dá estatísticas de uso da memória sobre o processo atual. Note que todas as estatísticas são relatadas em Kilobytes. Esta api deve ser chamada após o aplicativo pronto.

O Cromo não fornece `residentSet` valor para macOS. Isso ocorre porque o macOS realiza compressão na memória de páginas que não foram usadas recentemente. Como resultado , o residente define o valor do tamanho não é o que se esperaria. `private` de memória é mais representativo do uso real de memória de pré-compressão do processo no macOS.



### `process.getSystemMemoryInfo()`

Retorna `Object`:

* `total` Inteiro - A quantidade total de memória física em Kilobytes disponível para o sistema .

* `free` Inteiro - A quantidade total de memória que não está sendo usada por aplicativos ou cache de em disco.

* `swapTotal` Integer _Windows_ __ Linux - A quantidade total de memória de swap em Kilobytes disponível para o sistema .

* `swapFree` Integer _Windows_ __ Linux - A quantidade gratuita de memória de troca em Kilobytes disponível para o sistema .

Retorna um objeto que dá estatísticas de uso da memória sobre todo o sistema. Note que todas as estatísticas são relatadas em Kilobytes.



### `process.getSystemVersion()`

Devoluções `String` - A versão do sistema operacional host.

Exemplo:



```js
versão const = process.getSystemVersion() console
.log(versão)
// No macOS -> '10.13.6'
// No Windows -> '10.0.17763'
// No Linux -> '4.15.0-45-genérico' genérico
```


**Nota:** Ele retorna a versão real do sistema operacional em vez da versão do kernel no macOS ao contrário `os.release()`.



### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Caminho para o arquivo de saída.

Devoluções `Boolean` - Indica se o snapshot foi criado com sucesso.

Tira um instantâneo de pilha V8 e salva-o para `filePath`.



### `process.hang()`

Faz com que o fio principal do processo atual fique pendurado.



### `process.setFdLimit(maxDescriptors)` __MacOS</em> _Linux</h3> 

* `maxDescriptors` Integer

Define o limite descritor de arquivos para `maxDescriptors` ou o limite de rígido do SISTEMA OPERACIONAL, o que for menor para o processo atual.
