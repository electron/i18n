# Suporte à extensão do Chrome

A Electron suporta um subconjunto do [Chrome Extensions API][chrome-extensions-api-index], principalmente para suportar extensões e extensões internas do DevTools e Chromium, mas também acontece de suportar alguns outros recursos de extensão .

> **Nota:** Electron não suporta extensões arbitrárias do Chrome da loja , e é um</strong> não-objetivo **do projeto Electron ser perfeitamente compatível com a implementação de extensões do Chrome.</p> </blockquote> 
> 
> ## Extensões de carregamento
> 
> O electron só suporta carregar extensões não embaladas (ou seja, `.crx` arquivos não funcionam). As extensões são instaladas por`session`. Para carregar uma extensão, ligue para [`ses.loadExtension`](session.md#sesloadextensionpath-options):
> 
> ```js
const { session } = require ('electron')

session.loadExtension ('path/to/unpacked/extension').então({ id }) => {
  // ...
})
```

As extensões carregadas não serão automaticamente lembradas nas saídas; se você não chamar `loadExtension` quando o aplicativo for executado, a extensão não será carregada.

Observe que as extensões de carregamento só são suportadas em sessões persistentes. Tentar carregar uma extensão em uma sessão de memória irá jogar um erro.

Consulte a documentação [`session`](session.md) para obter mais informações sobre de carga, descarga e consulta de extensões ativas.

## APIs de extensões suportadas

Apoiamos as seguintes APIs de extensões, com algumas ressalvas. Outras APIs podem adicionalmente ser suportadas, mas o suporte para quaisquer APIs não listadas aqui é provisório e pode ser removido.

### `chrome.devtools.inspectedWindow`

Todos os recursos desta API são suportados.

### `chrome.devtools.network`

Todos os recursos desta API são suportados.

### `chrome.devtools.panels`

Todos os recursos desta API são suportados.

### `chrome.extension`

As seguintes propriedades de `chrome.extension` são suportadas:

- `chrome.extension.lastError`

Os seguintes métodos de `chrome.extension` são suportados:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

As seguintes propriedades de `chrome.runtime` são suportadas:

- `chrome.runtime.lastError`
- `chrome.runtime.id`

Os seguintes métodos de `chrome.runtime` são suportados:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

Os seguintes eventos de `chrome.runtime` são suportados:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Apenas `chrome.storage.local` é suportado; `chrome.storage.sync` e `chrome.storage.managed` não são.

### `chrome.tabs`

Os seguintes métodos de `chrome.tabs` são suportados:

- `chrome.tabs.sendMEssage`
- `chrome.tabs.executeScript`

> **Nota:** No Chrome, passar `-1` como iD da guia significa a "guia atualmente ativa". Como a Electron não tem esse conceito, passar `-1` como um ID de guia não é suportado e levantará um erro.

### `chrome.management`

Os seguintes métodos de `chrome.management` são suportados:

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

Todos os recursos desta API são suportados.

> **NOTA:** módulo [`webRequest`](web-request.md) da Electron tem precedência sobre `chrome.webRequest` se houver manipuladores conflitantes.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
