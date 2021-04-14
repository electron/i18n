# Quebrando mudanças

Quebrar as alterações serão documentadas aqui e quando possível as advertências de depreciação adicionadas ao código JS. pelo menos [uma versão principal](tutorial/electron-versioning.md#semver) antes que a alteração seja feita.

### Tipos de Alterações de Abertura

Este documento usa a seguinte convenção para categorizar as alterações mais significativas:

* **API alterada:** Uma API foi alterada de tal forma que o código que não foi atualizado tem a garantia de lançar uma exceção.
* **Comportamento alterado:** O comportamento do Electron mudou, mas não de tal forma que uma exceção será necessariamente lançada.
* **Padrão alterado:** O código dependendo do antigo padrão pode quebrar, não necessariamente lançando uma exceção. O comportamento antigo pode ser restaurado especificando explicitamente o valor.
* **Obsoleto:** Uma API foi marcada como obsoleta. A API continuará funcionando, mas emitirá um aviso de depreciação, e será removida em uma versão futura.
* **Removido:** Uma API ou recurso foi removida, e não é mais suportada pelo Electron.

## Alterações planejadas na API (14.0)

### API alterada: `window.(open)`

O parâmetro opcional `frameName` não definirá mais o título da janela. Segue-se agora a especificação descrita pela documentação nativa [](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) sob o parâmetro correspondente `windowName`.

Se você estava usando este parâmetro para definir o título de uma janela, você pode usar [win.setTitle (título)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle).

### Removido: `worldSafeExecuteJavaScript`

Em Elétron 14, `worldSafeExecuteJavaScript` serão removidos.  Não há alternativa, por favor, garantir que seu código funcione com esta propriedade habilitada.  Ele foi ativado por padrão desde Electron
12.

Você será afetado por esta mudança se você usar `webFrame.executeJavaScript` ou `webFrame.executeJavaScriptInIsolatedWorld`. Você precisará garantir que os valores devolvidos por qualquer um desses métodos sejam suportados pela API [Context Bridge](api/context-bridge.md#parameter--error--return-type-support) , pois esses métodos usam o mesmo valor passando semântica.

## Alterações planejadas na API (13.0)

### API alterada: `session.setPermissionCheckHandler(handler)`

O primeiro parâmetro de métodos `handler` era anteriormente sempre um `webContents`, agora às vezes pode ser `null`.  Você deve usar as propriedades `requestingOrigin`, `embeddingOrigin` e `securityOrigin` para responder corretamente à verificação de permissão.  Como o `webContents` pode ser `null` não pode mais ser confiado.

```js
Sessão de
de código antigo.setPermissionCheckHandler(webContents, permissão) => {
  se (webContents.getURL().startsWith('https://google.com/') && permissão === 'notificação') {
    return true
  }
  devolver falsa
})

// Substituir com
session.setPermissionCheckHandler((webContents, permissão, solicitandoOrigin) => {
  se (novo URL (solicitandoOrigin).hostname === 'google.com' && permissão === 'notificação') {
    return true
  }
  devolver falsa
})
```

### Removido: `shell.moveItemToTrash()`

A API depreciada `shell.moveItemToTrash()` foi removida. Use a `shell.trashItem()` assíncrona.

```js
Removido em Electron 13
shell.moveItemToTrash(caminho)
// Substituir por
shell.trashItem(path).then(/* ... */)
```

### Removido: APIs de extensão `BrowserWindow`

As APIs de extensão preteridas foram removidas:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(nome)`
* `BrowserWindow.removeDevToolsExtension(nome)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use as APIs de sessão em vez disso:

* `ses.loadExtension(caminho)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
Removido no Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Substituir com
session.defaultSession.loadExtension(path)
```

```js
Removido no Electron 13
BrowserWindow.removeExtension(nome)
BrowserWindow.removeDevToolsExtension(nome)
// Substituir com
session.defaultSession.removeExtension(extension_id)
```

```js
Removido no Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Substituir por
session.defaultSession.getAllExtensions()
```

### Removido: métodos em `systemPreferences`

Os seguintes métodos `systemPreferences` foram preteridos:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use as seguintes propriedades `nativeTheme` :

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Removido em Electron 13
sistemaPreferencias.isDarkMode()
// Substituir por
nativoTheme.shouldUseDarkColors

// Removido em Electron 13
sistemaPreferências.isInvertedColorScheme()
/// Substitua por
nativeTheme.shouldUseInvertedColorScheme

// Removido em Electron 13
sistemaPreferencias.isHighContrastColorScheme()
// Substituir por
nativoTheme.shouldUseHighContrastColors
```

## Alterações planejadas na API (12.0)

### Removido: suporte ao Pepper Flash

O Chromium removeu o suporte para Flash, então devemos seguir o exemplo. Consulte o [Flash Roadmap do Chromium](https://www.chromium.org/flash-roadmap) para mais detalhes .

### Padrão Alterado: `worldSafeExecuteJavaScript` inadimplência para `true`

No Elétron 12, `worldSafeExecuteJavaScript` será habilitado por padrão.  Para restaurar o comportamento anterior, `worldSafeExecuteJavaScript: false` devem ser especificados em WebPreferências. Observe que definir esta opção para `false` é ****inseguro .

Esta opção será removida no Elétron 14, então, por favor, migrem seu código para suportar o valor padrão.

### Alterado padrão: `contextIsolamento` padrão é `verdadeiro`

Em Electron 12, `contextIsolamento` será ativado por padrão.  Para restaurar o comportamento anterior, `contextIsolation: false` deve ser especificado em WebPreferences.

Recomendamos [ter contextIsolamento ativado](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) para a segurança do seu aplicativo.

Outra implicação é que `require()` não pode ser usada no processo de renderização, a menos que `nodeIntegration` seja `true` e `contextIsolation` seja `false`.

Para mais detalhes veja: https://github.com/electron/electron/issues/23506

### Removido: `crashReporter.getCrashesDirectory()`

O método `crashReporter.getCrashesDirectory` foi removido. O uso deve ser substituído por `app.getPath('crashDumps')`.

```js
// Removido no Electron 12
crashReporter.getCrashesDirectory()
// Substitua por
app.getPath('crashDumps')
```

### Removido: `crashReporter` métodos no processo renderizador

Os seguintes métodos `crashReporter` não estão mais disponíveis no processo de renderização :

* `início_crashReporter.start`
* `Relatório`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Eles devem ser chamados apenas do processo principal.

Consulte [#23265](https://github.com/electron/electron/pull/23265) para mais detalhes.

### Padrão alterado: `crashReporter.start({ compress: true })`

O valor padrão da opção de `comprimir` para `crashReporter.start` mudou de `false` para `true`. Isto significa que os dumps de erro serão enviados para o servidor de travamento com o cabeçalho `Content-Encoding: gzip` e o corpo será comprimido.

Se o seu servidor de travamento não suportar payloads comprimidos, você pode desativar a compressão especificando `{ compress: false }` nas opções de reportador de erro.

### Descontinuado: módulo</code> remoto `</h3>

<p spaces-before="0">O módulo <code>remoto` está obsoleto no Electron 12, e será removido no Electron 14. É substituído pelo módulo [`@electron/remote`](https://github.com/electron/remote).</p>

```js
// Descontinuado no Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Substitui com:
const { BrowserWindow } = require('@electron/remote')

// No processo principal:
require('@electron/remote/main').initialize()
```

### Descontinuado: `shell.moveItemToTrash()`

O `shell.moveItemToTrash()` sincronizado foi substituído pelo novo, assíncrono `shell.trashItem()`.

```js
// Descontinuado no Electron 12
shell.moveItemToTrash(path)
// Substitua por
shell.trashItem(path).then(/* ... */)
```

## Alterações planejadas na API (11.0)

### Removido: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` e propriedade `id` de `BrowserView`

As APIs experimentais `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` foram removidas. Além disso, a propriedade `id` de `BrowserView` também foi removida.

Para obter informações mais detalhadas, consulte [#23578](https://github.com/electron/electron/pull/23578).

## Alterações planejadas na API (10.0)

### Preterido: `companyName` argumento para `crashReporter.start()`

O `companyName` argumento para `crashReporter.start()`, que antes era exigido, agora é opcional, e ainda assim, é preterido. Para obter o mesmo comportamento de forma não preterida, você pode passar um valor `companyName` em `globalExtra`.

```js
Preterido em Electron 10
crashReporter.start ({ companyName: 'Umbrella Corporation' })
// Substituir por
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Preterido: `crashReporter.getCrashesDirectory()`

O método `crashReporter.getCrashesDirectory` foi preterido. O uso deve ser substituído por `app.getPath('crashDumps')`.

```js
Preterido em Electron 10
crashReporter.getCrashesDirectory()
// Substituir com
app.getPath ('crashDumps')
```

### Depreciado: `crashReporter` métodos no processo renderizador

Chamar os seguintes métodos `crashReporter` do processo renderizador é preterido:

* `início_crashReporter.start`
* `Relatório`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Os únicos métodos não depreciados que restam no módulo `crashReporter` na renderização são `addExtraParameter`, `removeExtraParameter` e `getParameters`.

Todos os métodos acima permanecem não depreciados quando chamados do processo principal.

Consulte [#23265](https://github.com/electron/electron/pull/23265) para mais detalhes.

### Descontinuado: `crashReporter.start({ compress: false })`

A configuração `{ compress: false }` em `crashReporter.start` está obsoleta. Quase todos os servidores de travamento suportam compressão gzip. Esta opção será removida em uma versão futura do Electron.

### Removido: Afinidade da Janela do Navegador

A opção `de afinidade` quando construir uma nova `BrowserWindow` será removida como parte de nosso plano de acordo com o modelo de processo do Chromium, para segurança, desempenho e manutenção.

Para obter informações mais detalhadas, consulte [#18397](https://github.com/electron/electron/issues/18397).

### Padrão alterado: `enableRemoteModule` padrão é `false`

No Electron 9, usando o módulo remoto sem explicitamente habilitá-lo através do `enableRemoteModule` a opção WebPreferences começou a emitir um aviso. No Electron 10, o módulo remoto agora está desativado por padrão. Para usar o módulo remoto , `enableRemoteModule: true` deve ser especificado em WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Nós [recomendamos se afastar do módulo de remoto](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocolo.unregisterProtocol`

### `protocolo.uninterceptProtocol`

As APIs agora são síncronos e o retorno opcional não é mais necessário.

```javascript
Protocolo de
preterido.não-recadoProtocol(esquema, () => { /* ... */ })
// Substituir com
protocolo.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`

### `protocol.registerBufferProtocol`

### `protocol.registerStringProtocol`

### `protocolo.registerHttpProtocol`

### `protocol.registerStreamProtocol`

### `protocolo.interceptFileProtocol`

### `protocolo.interceptStringProtocol`

### `protocolo.interceptBufferProtocol`

### `protocolo.interceptHttpProtocol`

### `protocolo.interceptStreamProtocol`

As APIs agora são síncronos e o retorno opcional não é mais necessário.

```javascript
Preterido
protocol.registerFileProtocol(esquema, manipulador, () => { /* ... */ })
// Substituir por
protocolo.registerFileProtocol(esquema, manipulador)
```

O protocolo registrado ou interceptado não tem efeito na página atual até que a navegação aconteça.

### `protocol.isProtocolHandled`

Esta API é preterida e os usuários devem usar `protocol.isProtocolRegistered` e `protocol.isProtocolIntercepted` em vez disso.

```javascript
Deprecado
protocolo.isProtocolHandled(scheme).then(((() => { /* ... */ })
// Substituir por
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Alterações planejadas na API (9.0)

### Alterado padrão: carregar módulos nativos não-informados pelo contexto no processo de renderização está desativado por padrão

A partir do Electron 9, não permitimos o carregamento de módulos nativos não conscientes do contexto no processo de renderização.  Isto é para melhorar a segurança, o desempenho e a manutenção do Electron como um projeto.

Se isso impactar você, você pode definir temporariamente o `app.allowRendererProcessReuse` para `false` para reverter para o antigo comportamento.  Esta bandeira só será uma opção até o Electron 11, então você deve planejar atualizar seus módulos nativos para estarem cientes do contexto.

Para obter informações mais detalhadas, consulte [#18397](https://github.com/electron/electron/issues/18397).

### Preteridos: APIs de extensão `BrowserWindow`

As seguintes APIs de extensão foram preteridas:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(nome)`
* `BrowserWindow.removeDevToolsExtension(nome)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use as APIs de sessão em vez disso:

* `ses.loadExtension(caminho)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
Preterido no Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Substituir com
session.defaultSession.loadExtension(path)
```

```js
Preterido no Electron 9
BrowserWindow.removeExtension(nome)
BrowserWindow.removeDevToolsExtension(nome)
// Substituir por
session.defaultSession.removeExtension(extension_id)
```

```js
Preterido no Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Substituir por
session.defaultSession.getAllExtensions()
```

### Removido: `<webview>.getWebContents()`

Esta API, que foi descontinuada no Electron 8.0, foi removida.

```js
// Removido no Electron 9.0
webview.getWebContents()
// Substitui com
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Removido: `webFrame.setLayoutZoomLevelLimits()`

O Chromium removeu o suporte para alterar os limites de nível de zoom de layout, e está além da capacidade da Electron de mantê-lo. A função foi preterida em Electron 8.x, e foi removida em Elétron 9.x. Os limites de nível de zoom de layout agora são fixados em um mínimo de 0,25 e um máximo de 5,0, conforme definido [aqui](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportamento alterado: Enviar objetos não-JS sobre o IPC agora lança uma exceção

No Electron 8.0, o IPC foi alterado para usar o Algoritmo de Clone Estruturado, trazendo melhorias significativas de desempenho. Para ajudar a facilitar a transição, o antigo algoritmo de serialização do IPC foi mantido e usado para alguns objetos que não são serializáveis com o Clone Estruturado. Em particular, objetos DOM (por exemplo, `Elemento`, `Localização` e `DOMMatriz`), nó. s objetos apoiados por classes C ++ (por exemplo, `processo. nv`, alguns membros da `Stream`) e objetos do Electron apoiados por C++ classes (por exemplo, `WebContents`, `BrowserWindow` e `WebFrame`) não são serializáveis com Clones Estruturados. Sempre que o algoritmo antigo foi invocado, um aviso de depreciação foi impresso.

No Electron 9. , o antigo algoritmo de serialização foi removido e enviar tais objetos não serializáveis agora lançarão um erro de "objeto não pôde ser clonado.

### API alterada: `shell.openItem` agora é `shell.openPath`

A API `shell.openItem` foi substituída por uma API assíncrona `shell.openPath`. Você pode ver a proposta original da API e o raciocínio [aqui](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Alterações planejadas na API (8.0)

### Comportamento alterado: os valores enviados sobre o IPC agora são serializados com o Algoritmo de Clone Estruturado

O algoritmo usado para serializar objetos enviados pelo IPC (através de `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` e métodos relacionados) foi trocado de um algoritmo personalizado para o [Algoritmo de Clone estruturado da V8][SCA], o mesmo algoritmo usado para serializar mensagens para `postMessage`. Isso traz uma melhoria de desempenho 2x para mensagens de grande , mas também traz algumas mudanças de comportamento.

* Envio de funções, promessas, weakmaps, WeakSets ou objetos contendo qualquer tais valores, sobre IPC agora lançará uma exceção, em vez de silenciosamente converter as funções para `undefined`.

```js
Anteriormente:
ipcRenderer.send ('channel', { valor: 3, someFunction: () => {} })
// => resulta em { value: 3 } chegando no processo principal

// Da Electron 8:
ipcRenderer.send ('canal', { valor: 3, alguma função: () => {} })
// => lança erro("() => {} não poderia ser clonado.")
```

* `NaN`, `Infinity` e `-Infinity` agora serão corretamente serializados, em vez de serem convertidos em `null`.
* Objetos contendo referências cíclicas serão agora serializados corretamente, em vez de serem convertidos em `null`.
* `Set`, `Map`, `Error` e `RegExp` valores serão corretamente serializados, em vez de serem convertidos em `{}`.
* `BigInt` valores serão corretamente serializados, em vez de serem convertidos em `null`.
* Matrizes esparsas serão serializadas como tal, em vez de serem convertidas em matrizes densas com `null`s.
* `Date` objetos serão transferidos como objetos `Date` , em vez de serem convertidos à sua representação de strings ISO.
* Arrays digitados (como `Uint8Array`, `Uint16Array`, `Uint32Array` e assim por diante) serão transferidos como tal, em vez de serem convertidos em Node.js `Buffer`.
* Objetos .js `Buffer` nó serão transferidos como `Uint8Array`s. Você pode converter um `Uint8Array` de volta para um Nó.js `Buffer` embrulhando o `ArrayBuffer`subjacente:

```js
Buffer.from (value.buffer, value.byteOffset, value.byteLength)
```

Enviando objetos que não sejam tipos nativos de JS, como objetos DOM (por exemplo, `Element`, `Location`, `DOMMatrix`), Objetos .js node (por exemplo. `process.env`, `Stream`), ou objetos elétrons (por exemplo. `WebContents`, `BrowserWindow`, `WebFrame`) é preterido. Em Electron 8, esses objetos serão serializados como antes com uma mensagem DeprecationWarning, mas a partir do Elétron 9, o envio esses tipos de objetos lançará um erro "não poderia ser clonado".

### Descontinuado: `<webview>.getWebContents()`

Esta API é implementada usando o módulo `remote` , que tem de desempenho e implicações de segurança. Portanto, seu uso deve ser explícito.

```js
Depreciado
webview.getWebContents()
// Substituir com
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

No entanto, recomenda-se evitar o uso do módulo `remote` completamente.

```js
// principal
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, conteúdo) => {
  const guest = webContents. romId(webContentsId)
  se (! uest) {
    lança novo Error(`ID inválido webContentsId: ${webContentsId}`)
  }
  se (convidado. ostWebconteúdo ! = contents) {
    throw new Error('Acesso negado a webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  convidados. penDevTools()
})

// renderizando
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Obsoleto: `webFrame.setLayoutZoomLevelLimits()`

O Chromium removeu o suporte para alterar os limites de nível de zoom de layout, e está além da capacidade da Electron de mantê-lo. A função emitirá um aviso em Elétron 8.x, e deixará de existir no Elétron 9.x. O nível de zoom de layout limites agora são fixados em um mínimo de 0,25 e um máximo de 5,0, conforme definido [aqui](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Eventos preteridos em `systemPreferences`

Os seguintes eventos `systemPreferences` foram preteridos:

* `inverted-cor-esquema-alterado`
* `alta-contraste-cor-esquema-mudou`

Use o novo evento `updated` no módulo `nativeTheme` .

```js
Sistema de
preteridoPreferências.on ('invertido-colorido-scheme-changed', () => { /* ... * * } sistema
Preferências.on ('high-contrast-color-scheme-changed', () => { /* ... */ })

// Substituir por
nativeTheme.on('atualizado', () => { /* ... */ })
```

### Preterido: métodos em `systemPreferences`

Os seguintes métodos `systemPreferences` foram preteridos:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use as seguintes propriedades `nativeTheme` :

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Sistema de
preteridoPreferencias.isDarkMode()
// Substituir por
nativoTheme.shouldUseDarkColors

// Sistema de
pretadoPreferences.isInvertedColorScheme()
// Substitua por
nativeTheme.shouldUseInvertedColorScheme

// Sistema de
precadoPreferencias.isHighContrastColorScheme()
// Substituir por
nativoTheme.shouldUseHighContratrastColors
```

## Alterações planejadas na API (7.0)

### Descontinuado: URL dos cabeçalhos do Node Atom.io

Esta é a URL especificada como `disturl` em um arquivo `.npmrc` ou como a bandeira da linha de comando `--dist-url` ao criar módulos de nó nativos.  Ambos serão apoiados para o futuro previsível, mas é recomendável que você mude.

Preterido: https://atom.io/download/electron

Substitua por: https://electronjs.org/headers

### API alterada: `session.clearAuthCache()` não aceita mais opções

A `session.clearAuthCache` API não aceita mais opções para o que limpar e, em vez disso, limpa incondicionalmente todo o cache.

```js
Sessão de
preterida.clearAuthCache({ type: 'password' })
// Substituir por
session.clearAuthCache()
```

### API alterada: `powerMonitor.querySystemIdleState` agora é `powerMonitor.getSystemIdleState`

```js
// Removido no Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Substitui com API síncrona
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API alterada: `powerMonitor.querySystemIdleTime` agora é `powerMonitor.getSystemIdleTime`

```js
// Removido no Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Substituir com API síncrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### API alterada: `webFrame.setIsolatedWorldInfo` substitui métodos separados

```js
Removido no Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy (worldId, csp)
webFrame.setIsolatedWorldHumanReadableName (worldId, nome)
webFrame.setIsolatedWorldSecurityOrigin (worldId, securityOrigin)
// Substituir por
webFrame.setIsolatedWorldInfo (
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Removido: `marcado a propriedade` em `getBlinkMemoryInfo`

Esta propriedade foi removida no Chromium 77, e como tal não está mais disponível.

### Comportamento alterado: `atributo webkitdirectory` para `<input type="file"/>` agora lista o conteúdo do diretório

A propriedade `webkitdirectory` em entradas de arquivos HTML permite que eles selecionem pastas. Versões anteriores do Electron tiveram uma implementação incorreta onde o `event.target.files` da entrada devolveu um `FileList` que devolveu um `File` correspondente à pasta selecionada.

A partir do Electron 7, `FileList` agora é a lista de todos os arquivos contidos dentro da pasta, similarmente ao Chrome, Firefox e Edge ([link para documentação MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Como ilustração, tire um diretório com esta estrutura:

```console

arquivo de pasta1
arquivo2
└➤➤ arquivo3
```

No Electron <=6, isto retornaria um `FileList` com um `arquivo` objeto para:

```console
caminho/para/pasta
```

No Electron 7, agora retorna um `FileList` com um objeto `File` para:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Observe que `webkitdirectory` não expõe o caminho à pasta selecionada. Se você exigir o caminho para a pasta selecionada em vez do conteúdo da pasta, ver a API `dialog.showOpenDialog` ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### API alterada: Versões baseadas em callback de APIs promisificadas

O Electron 5 e o Electron 6 introduziram versões baseadas na Promessa das APIs assíncronsas existentes e preteriu suas contrapartes mais antigas baseadas em callback. No Electron 7, todas as APIs baseadas em callback preteridos são agora removidas.

Essas funções agora só retornam Promessas:

* `app.getFileIcon()` [#15742](https://github.com/electron/electron/pull/15742)
* `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)
* `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
* `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
* `contentTracing.startRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contentTracing.stopRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
* `debugger.sendCommand()` [#16861](https://github.com/electron/electron/pull/16861)
* `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
* `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
* `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
* `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
* `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
* `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
* `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
* `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
* `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
* `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
* `shell.openExternal()` [#16176](https://github.com/electron/electron/pull/16176)
* `webContents.loadFile()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.loadURL()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
* `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
* `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
* `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
* `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `win.capturePage()` [#15743](https://github.com/electron/electron/pull/15743)

Essas funções agora têm duas formas, sincronizadas e baseadas em Promiss:

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

## Alterações planejadas na API (6.0)

### API alterada: `win.setMenu(null)` agora é `win.removeMenu()`

```js
Preterido
win.setMenu(nulo)
// Substituir por
win.removeMenu()
```

### API alterada: `electron.screen` no processo de renderização deve ser acessado via `controle remoto`

```js

preteridos requerem ('elétron').tela
// Substituir por
requer ('elétron').remote.screen
```

### API Alterada: `require()`a construção de nó em renderizadores sandboxed não carrega mais implicitamente a versão `remota`

```js

preterido child_process s requerem
// Substituir por
requer ('elétron').remote.require ('child_process')

//
preteridos requerem ('fs')
// Substituir por
requerem ('elétron').remote.require('fs'))

//
preteridos requerem ('os')
// Substituir por
requer ('elétron').remote.require('os')

//
preteridos requerem ('path')
// Substituir por
requerem ('elétron').remoto.require('path')
```

### Descontinuado: `powerMonitor.querySystemIdleState` substituído por `powerMonitor.getSystemIdleState`

```js
// Descontinuado
powerMonitor.querySystemIdleState(threshold, callback)
// Substitui com API síncrona
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Descontinuado: `powerMonitor.querySystemIdleTime` substituído por `powerMonitor.getSystemIdleTime`

```js
// Descontinuado
powerMonitor.querySystemIdleTime(callback)
// Substitui com API síncrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### Descontinuado: `app.enableMixedSandbox()` não é mais necessário

```js

prediced app.enableMixedSandbox()
```

O modo caixa de areia mista agora está ativado por padrão.

### Obsoleto: `Tray.setHighlightMode`

Sob o macOS Catalina, nossa implementação anterior tray quebra. O substituto nativo da Apple não suporta mudar o comportamento de destaque.

```js
Depreciado
tray.setHighlightMode(modo)
// API será removido em v7.0 sem substituição.
```

## Alterações planejadas na API (5.0)

### Alterado padrão: `nodeIntegração` e `webviewTag` padrão para falso, `contextIsolação` é verdadeiro

Os seguintes `webPreferences` os valores padrão da opção são preteridos em favor dos novos padrões listados abaixo.

| Propriedade              | Padrão preterido                         | Novo Padrão |
| ------------------------ | ---------------------------------------- | ----------- |
| `contextualizarIsolação` | `False`                                  | `true`      |
| `nodeIntegração`         | `true`                                   | `False`     |
| `webviewTag`             | `nodeIntegration` se definir mais `true` | `False`     |

Ex. Reativando o webviewTag

```js
const w = novo BrowserWindow({
  webPreferências: {
    webviewTag: true
  }
})
```

### Comportamento alterado: `nodeIntegration` em janelas filhas abertas pelo `nativeWindowOpen`

Janelas filhas abertas com a opção `nativeWindowOpen` sempre terão a integração do Node.js desabilitada, a menos que `nodeIntegrationInSubFrames` seja `true`.

### API alterada: Registrar esquemas privilegiados deve ser feito antes do aplicativo ser pronto

As APIs do processo Renderer `webFrame.registerURLSchemeAsPrivileged` e `webFrame.registerURLSchemeAsBypassingCSP` bem como o processo do navegador na API `protocol.registerStandardSchemes` foram removidos. Uma nova API, `protocol.registerSchemesAsPrivileged` foi adicionada e deve ser usada para registrar esquemas personalizados com os privilégios necessários. Esquemas personalizados devem ser registrados antes do aplicativo pronto.

### Obsoleto: `webFrame.setIsolatedWorld*` substituído por `webFrame.setIsolatedWorldInfo`

```js
Deprecado
webFrame.setIsolatedWorldContentSecurityPolicy (worldId, csp)
webFrame.setIsolatedWorldHumanReadableName (worldId, nome)
webFrame.setIsolatedWorldSecurityOrigin (worldId, securityOrigin)
// Substituir por
webFrame.setIsolatedWorldInfo (
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### API alterada: `webFrame.setSpellCheckProvider` agora leva um callback assíncrono

O retorno `spellCheck` agora é assíncrona, e `autoCorrectWord` parâmetro foi removido.

```js
Deprecado
webFrame.setSpellCheckProvider ('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Substituir por
webFrame.setSpellCheckProvider('en-US', {
  spellChecker: (palavras, retorno de chamada) => {
    callback (words.filter(text => spellchecker.isMisspelled(text))
  }
})
```

### API alterado: `webContents.getZoomLevel` e `webContents.getZoomFactor` agora são síncronsas

`webContents.getZoomLevel` e `webContents.getZoomFactor` não aceitam mais parâmetros de retorno de chamada, , em vez disso, retornando diretamente seus valores numé somados.

```js

preterido webContents.getZoomLevel((nível) => { console
  .log(nível)
})
// Substituir com
nível const = webContents.getZoomLevel() console
.log(nível)
```

```js

preterido webContents.getZoomFactor((fator) => { console
  .log(fator)
})
// Substituir por
fator const = webContents.getZoomFactor() console
.log(fator)
```

## Alterações planejadas na API (4.0)

A lista a seguir inclui as alterações de API de ruptura feitas no Elétron 4.0.

### `app.makeSingleInstance`

```js
Deprecado
app.makeSingleInstance(argv, cwd) => {
  /* ... */
})
// Substituir por
app.requestSingleInstanceLock()
app.on('segunda instância', (evento, argv, cwd) => {
  /* ... */
})
```

### `app.releaseSingleInstance`

```js
// depreciado
app.releaseSingleInstance()
// Substituir com
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo ('completo')
// Agora se comporta da mesma forma com 'básico' no aplicativo macOS
.getGPUInfo('básico')
```

### `win_delay_load_hook`

Ao construir módulos nativos para janelas, a variável `win_delay_load_hook` em `binding.gyp` do módulo deve ser verdadeira (que é o padrão). Se este gancho não estiver presente, o módulo nativo não carregará no Windows, com um erro mensagem como `Cannot find module`. Consulte o [módulo nativo guia](/docs/tutorial/using-native-node-modules.md) para mais.

## Alterações na API (3.0)

A lista a seguir inclui as alterações na API do Election 3.0.

### `app`

```js

preterido  app.getAppMemoryInfo()
// Substituir por
app.getAppMetrics()

// Métricas preteridas
const = app.getAppMetrics()
const { memory } = métricas[0] // Propriedade preterida
```

### `BrowserWindow`

```js
// Descontinuado
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Substitui com
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const serWindow(optionsB)

// Descontinuada
janela. n('comando-app', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // faz algo
  }
})
// Substituir por
janela. n('comando-app', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // faz algo
  }
})
```

### `clipboard`

```js
// depreciado
clipboard.readRtf()
// Substitua com
clipboard.readRTF()

// depreciado
clipboard.writeRtf()
// Substitua com
clipboard.writeRTF()

// depreciado
clipboard.readHtml()
// Substitua com
clipboard.readHTML()

// depreciado
clipboard.writeHtml()
// Substitua com
clipboard.writeHTML()
```

### `crashReporter`

```js
// depreciado
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Substitua com
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// depreciado
nativeImage.createFromBuffer(buffer, 1.0)
// Substitua com
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `processado`

```js
Informações preteridas
const = process.getProcessMemoryInfo()
```

### `screen`

```js
Depreciado
screen.getMenuBarHeight()
// Substituir por
screen.getPrimaryDisplay().workArea
```

### `session`

```js
Deprecado
ses.setCertificateVerifyProc((hostname, certificado, callback) => {
  callback(true)
})
// Substituir por
ses.setCertificVerifyProc(((solicitação, retorno de chamada) => {
  callback(0)
})
```

### `Tray`

```js
Deprecado
tray.setHighlightMode(true)
// Substituir por
bandeja.setHighlightMode('on')

// Depreterado
bandeja.setHighlightMode (falso)
// Substituir por bandeja
.setHighlightMode('off')
```

### `webContents`

```js


preterido  webContents({ detach: true })  // Substituir por
webContents.openDevTools ({ mode: 'detach' })

// Removido
webContents.setSize(opções)
// Não há substituição para esta API
```

### `webFrame`

```js
Preterido
webFrame.registerURLSchemeAsSecure ('app')
// Substituir com
protocol.registerStandardSchemes(['app'], { secure: true })

// Preterido
webFrame.registerURLSchemeAsPrivileged ('app', { secure: true })
// Substituir por
protocolo.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
Removido
webview.setAttribute('disableguestresize', '')
// Não há substituição para esta API

// Removido
webview.setAttribute('guestinstance', instanceId)
// Não há substituição para esta API

// Os ouvintes do teclado não trabalham mais na tag webview
webview.onkeydown = () => { /* manipulador */ }
webview.onkeyup = () => { /* manipulador */ }
```

### URL de cabeçalhos de nó

Esta é a URL especificada como `disturl` em um arquivo `.npmrc` ou como a bandeira da linha de comando `--dist-url` ao criar módulos de nó nativos.

Preterido: https://atom.io/download/atom-shell

Substitua por: https://atom.io/download/electron

## Alterações na API (2.0)

A lista a seguir inclui as alterações de API de ruptura feitas no Elétron 2.0.

### `BrowserWindow`

```js
// Descontinuado
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Substitui com
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
Removido
menu.popup (browserWindow, 100, 200, 2)
// Substituído por menu
.popup (browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
Removido
nativeImage.toPng()
// Substituído por
nativeImage.toPNG()

// Removido
nativoImage.toJpeg()
// Substituído por
nativoImage.toJPEG().
```

### `processado`

* `process.versions.electron` e `process.version.chrome` serão feitas propriedades somente leitura para consistência com as outras propriedades `process.versions` definidas pelo Node.

### `webContents`

```js
Removido
webContents.setZoomLevelLimits(1, 2)
// Substituído por
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
Removido
webFrame.setZoomLevelLimits(1, 2)
// Substituído por
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
Removido
webview.setZoomLevelLimits(1, 2)
// Substituído por
webview.setVisualZoomLevelLimits(1, 2)
```

### Ativos ARM duplicados

Cada versão electron inclui duas compilações ARM idênticas com nomes de arquivos ligeiramente diferentes, como `electron-v1.7.3-linux-arm.zip` e `electron-v1.7.3-linux-armv7l.zip`. O ativo com o prefixo `v7l` foi adicionado para esclarecer aos usuários qual versão ARM ele suporta, e desambiguar-lo de futuros ativos armv6l e arm64 que possam ser produzidos.

O arquivo _sem o prefixo_ ainda está sendo publicado para evitar quebrar configurações que podem estar consumindo. A partir das 2.0, o arquivo não prefixado não será mais publicado.

Para mais detalhes, consulte [6986](https://github.com/electron/electron/pull/6986) e [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
