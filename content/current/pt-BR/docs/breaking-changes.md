# Breaking Changes

Quebrar as alterações serão documentadas aqui e quando possível as advertências de depreciação adicionadas ao código JS. pelo menos [uma versão principal](tutorial/electron-versioning.md#semver) antes que a alteração seja feita.

### Tipos de Alterações de Abertura

Este documento usa a seguinte convenção para categorizar as alterações mais significativas:

* **API alterada:** Uma API foi alterada de tal forma que o código que não foi atualizado tem a garantia de lançar uma exceção.
* **Comportamento alterado:** O comportamento do Electron mudou, mas não de tal forma que uma exceção será necessariamente lançada.
* **Padrão alterado:** O código dependendo do antigo padrão pode quebrar, não necessariamente lançando uma exceção. O comportamento antigo pode ser restaurado especificando explicitamente o valor.
* **Obsoleto:** Uma API foi marcada como obsoleta. A API continuará funcionando, mas emitirá um aviso de depreciação, e será removida em uma versão futura.
* **Removido:** Uma API ou recurso foi removida, e não é mais suportada pelo Electron.

## Alterações planejadas na API (13.0)

### Removido: `shell.moveItemToTrash()`

A API depreciada `shell.moveItemToTrash()` foi removida. Use a `shell.trashItem()` assíncrona.

```js
// Removido no Electron 13
shell.moveItemToTrash(path)
// Substitua com
shell.trashItem(path).then(/* ... */)
```

## Alterações planejadas na API (12.0)

### Removido: suporte ao Pepper Flash

O Chromium removeu o suporte para Flash, então devemos seguir o exemplo. Consulte o [Flash Roadmap do Chromium](https://www.chromium.org/flash-roadmap) para mais detalhes .

### Alterado padrão: `contextIsolamento` padrão é `verdadeiro`

Em Electron 12, `contextIsolamento` será ativado por padrão.  Para restaurar o comportamento anterior, `contextIsolation: false` deve ser especificado em WebPreferences.

Recomendamos [ter contextIsolamento ativado](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) para a segurança do seu aplicativo.

Para mais detalhes veja: https://github.com/electron/electron/issues/23506

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

* `início_crashReporter.start`
* `Relatório`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

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
// Substitua com
shell.trashItem(path).then(/* ... */)
```

## Alterações planejadas na API (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## Alterações planejadas na API (10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

* `início_crashReporter.start`
* `Relatório`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

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

We [recommend moving away from the remote module](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`

### `protocol.registerBufferProtocol`

### `protocol.registerStringProtocol`

### `protocol.registerHttpProtocol`

### `protocol.registerStreamProtocol`

### `protocol.interceptFileProtocol`

### `protocol.interceptStringProtocol`

### `protocol.interceptBufferProtocol`

### `protocol.interceptHttpProtocol`

### `protocol.interceptStreamProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Alterações planejadas na API (9.0)

### Alterado padrão: carregar módulos nativos não-informados pelo contexto no processo de renderização está desativado por padrão

A partir do Electron 9, não permitimos o carregamento de módulos nativos não conscientes do contexto no processo de renderização.  Isto é para melhorar a segurança, o desempenho e a manutenção do Electron como um projeto.

Se isso impactar você, você pode definir temporariamente o `app.allowRendererProcessReuse` para `false` para reverter para o antigo comportamento.  Esta bandeira só será uma opção até o Electron 11, então você deve planejar atualizar seus módulos nativos para estarem cientes do contexto.

Para obter informações mais detalhadas, consulte [#18397](https://github.com/electron/electron/issues/18397).

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

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. A função foi descontinuada no Electron 8.x, e foi removida no Electron 9.x. O limite do nível de zoom do layout agora são fixos no mínimo 0. 5 e um máximo de 5.0, conforme definido [aqui](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportamento alterado: Enviar objetos não-JS sobre o IPC agora lança uma exceção

No Electron 8.0, o IPC foi alterado para usar o Algoritmo de Clone Estruturado, trazendo melhorias significativas de desempenho. Para ajudar a facilitar a transição, o antigo algoritmo de serialização do IPC foi mantido e usado para alguns objetos que não são serializáveis com o Clone Estruturado. Em particular, objetos DOM (por exemplo, `Elemento`, `Localização` e `DOMMatriz`), nó. s objetos apoiados por classes C ++ (por exemplo, `processo. nv`, alguns membros da `Stream`) e objetos do Electron apoiados por C++ classes (por exemplo, `WebContents`, `BrowserWindow` e `WebFrame`) não são serializáveis com Clones Estruturados. Sempre que o algoritmo antigo foi invocado, um aviso de depreciação foi impresso.

No Electron 9. , o antigo algoritmo de serialização foi removido e enviar tais objetos não serializáveis agora lançarão um erro de "objeto não pôde ser clonado.

### API alterada: `shell.openItem` agora é `shell.openPath`

A API `shell.openItem` foi substituída por uma API assíncrona `shell.openPath`. Você pode ver a proposta original da API e o raciocínio [aqui](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Alterações planejadas na API (8.0)

### Comportamento alterado: os valores enviados sobre o IPC agora são serializados com o Algoritmo de Clone Estruturado

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

* Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
* Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
* `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
* `BigInt` values will be correctly serialized, instead of being converted to `null`.
* Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
* `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
* Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
* Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Descontinuado: `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

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

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Alterações planejadas na API (7.0)

### Descontinuado: URL dos cabeçalhos do Node Atom.io

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API alterada: `session.clearAuthCache()` não aceita mais opções

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
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
// Removed in Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Removido: `marcado a propriedade` em `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Comportamento alterado: `atributo webkitdirectory` para `<input type="file"/>` agora lista o conteúdo do diretório

A propriedade `webkitdirectory` em entradas de arquivos HTML permite que eles selecionem pastas. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

A partir do Electron 7, `FileList` agora é a lista de todos os arquivos contidos dentro da pasta, similarmente ao Chrome, Firefox e Edge ([link para documentação MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Como ilustração, tire um diretório com esta estrutura:

```console
folder
├── file1
├── file2
└── file3
```

No Electron <=6, isto retornaria um `FileList` com um `arquivo` objeto para:

```console
path/to/folder
```

No Electron 7, agora retorna um `FileList` com um objeto `File` para:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Observe que `webkitdirectory` não expõe o caminho à pasta selecionada. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Alterações planejadas na API (6.0)

### API alterada: `win.setMenu(null)` agora é `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API alterada: `contentTracing.getTraceBufferUsage()` agora é uma promessa

```js
// Deprecated
contentTracing.getTraceBufferUsage((percentage, value) => {
  // do something
})
// Replace with
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject has percentage and value fields
})
```

### API alterada: `electron.screen` no processo de renderização deve ser acessado via `controle remoto`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API Alterada: `require()`a construção de nó em renderizadores sandboxed não carrega mais implicitamente a versão `remota`

```js
// Deprecated
require('child_process')
// Replace with
require('electron').remote.require('child_process')

// Deprecated
require('fs')
// Replace with
require('electron').remote.require('fs')

// Deprecated
require('os')
// Replace with
require('electron').remote.require('os')

// Deprecated
require('path')
// Replace with
require('electron').remote.require('path')
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
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Obsoleto: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Alterações planejadas na API (5.0)

### Alterado padrão: `nodeIntegração` e `webviewTag` padrão para falso, `contextIsolação` é verdadeiro

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

| Property           | Deprecated Default                   | New Default |
| ------------------ | ------------------------------------ | ----------- |
| `contextIsolation` | `false`                              | `true`      |
| `nodeIntegration`  | `true`                               | `false`     |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`     |

E.g. Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### Comportamento alterado: `nodeIntegration` em janelas filhas abertas pelo `nativeWindowOpen`

Janelas filhas abertas com a opção `nativeWindowOpen` sempre terão a integração do Node.js desabilitada, a menos que `nodeIntegrationInSubFrames` seja `true`.

### API alterada: Registrar esquemas privilegiados deve ser feito antes do aplicativo ser pronto

As APIs do processo Renderer `webFrame.registerURLSchemeAsPrivileged` e `webFrame.registerURLSchemeAsBypassingCSP` bem como o processo do navegador na API `protocol.registerStandardSchemes` foram removidos. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Obsoleto: `webFrame.setIsolatedWorld*` substituído por `webFrame.setIsolatedWorldInfo`

```js
// Deprecated
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### API alterada: `webFrame.setSpellCheckProvider` agora leva um callback assíncrono

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Alterações planejadas na API (4.0)

The following list includes the breaking API changes made in Electron 4.0.

### `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
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
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

## Alterações na API (3.0)

A lista a seguir inclui as alterações na API do Election 3.0.

### `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
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
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

### `session`

```js
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

### `Tray`

```js
// Deprecated
tray.setHighlightMode(true)
// Replace with
tray.setHighlightMode('on')

// Deprecated
tray.setHighlightMode(false)
// Replace with
tray.setHighlightMode('off')
```

### `webContents`

```js
// Deprecated
webContents.openDevTools({ detach: true })
// Replace with
webContents.openDevTools({ mode: 'detach' })

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

### `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Removed
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Removed
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Keyboard listeners no longer work on webview tag
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

## Alterações na API (2.0)

The following list includes the breaking API changes made in Electron 2.0.

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
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Removed
nativeImage.toPng()
// Replaced with
nativeImage.toPNG()

// Removed
nativeImage.toJpeg()
// Replaced with
nativeImage.toJPEG()
```

### `processado`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

### `webContents`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Removed
webFrame.setZoomLevelLimits(1, 2)
// Replaced with
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Removed
webview.setZoomLevelLimits(1, 2)
// Replaced with
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

O arquivo _sem o prefixo_ ainda está sendo publicado para evitar quebrar configurações que podem estar consumindo. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
