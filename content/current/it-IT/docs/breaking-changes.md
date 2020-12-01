# Ultime modifiche

I cambiamenti delle API assieme agli avvisi di deprecazione aggiunti al codice JavaScript, dove possibile, saranno qui documentati almeno [una versione maggiore](tutorial/electron-versioning.md#semver) prima che il cambiamento sia implementato.

### Tipi di Ultime Modifiche

Questo documento usa la seguente convenzione per categorizzare le ultime modifiche:

* **API Modificata:** Un API è stata modificata in modo tale che il codice che non è stato aggiornato è garantito di lanciare un'eccezione.
* **Comportamento Modificato:** Il comportamento di Electron è cambiato, ma non in modo tale che un'eccezione sarà necessariamente lanciata.
* **Predefinito Modificato:** Il codice dipendente dal vecchio predefinito potrebbe rompersi, non necessariamente lanciando un'eccezione. Il vecchio comportamento può essere ripristinato specificando esplicitamente il valore.
* **Deprecato:** Un'API è stata contrassegnata come deprecata. L'API continuerà a funzionare, ma emetterà un avviso di deprecazione e sarà rimossa in una versione futura.
* **Rimossa:** Un'API o funzione è stata rimossa, o non è più supportata da Electron.

## Cambiamenti Pianificati API (13.0)

### Rimosso: `shell.moveItemToTrash()`

L'API `shell.moveItemToTrash()` deprecata è stata rimossa. Utilizza invece l'asincrono `shell.trashItem()`.

```js
// Rimosso in Electron 13
shell.moveItemToTrash(path)
// Sostituisci con
shell.trashItem(path).then(/* ... */)
```

### Removed: `BrowserWindow` extension APIs

The deprecated extension APIs have been removed:
* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:
* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Removed in Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Removed in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Removed in Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

## Cambiamenti Pianificati API (12.0)

### Rimosso: Pepper Flash supporto

Il cromo ha rimosso il supporto per Flash, e quindi dobbiamo seguire l'esempio. Vedi Chromium [Flash Roadmap](https://www.chromium.org/flash-roadmap) per maggiori dettagli .

### Predefinito Modificato: `contextIsolation` è predefinito a `true`

In Electron 12, `contextIsolation` sarà abilitata di default.  Per ripristinare il comportamento precedente, deve essere specificato `contextIsolation: false` in WebPreferences.

[Raccomandiamo di avere contextIsolation abilitato](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) per la sicurezza della tua applicazione.

Per ulteriori dettagli vedi: https://github.com/electron/electron/issues/23506

### Removed: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been removed. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Removed in Electron 12
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Rimosso: metodi del `crashReporter` nel processo di rendering

I seguenti metodi del `crashReporter` non sono più disponibili nel processo renderer:

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Dovrebbero essere chiamati solo dal processo principale.

Vedi [#23265](https://github.com/electron/electron/pull/23265) per maggiori dettagli.

### Predefinito Modificato: `crashReporter.start({ compress: true })`

Il valore predefinito dell'opzione `compress` per `crashReporter.start` è cambiato da `false` a `true`. Ciò significa che i crash dump verranno caricati sul crash ingestion server con l'intestazione `Content-Encoding: gzip` , e il corpo sarà compresso.

Se il tuo server di ingestione dei crash non supporta i carichi utili compressi, puoi spegnere la compressione specificando `{ compress: false }` nelle opzioni del segnalatore dei crash.

### Deprecato: `modulo remoto`

Il modulo `remoto` è deprecato in Electron 12 e verrà rimosso in Electron 14. È sostituito dal modulo [`@electron/remote`](https://github.com/electron/remote).

```js
// Deprecato in Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Sostituire con:
const { BrowserWindow } = require('@electron/remote')

// Nel processo principale:
require('@electron/remote/main').initialize()
```

### Deprecato: `shell.moveItemToTrash()`

Il sincrono `shell.moveItemToTrash()` è stato sostituito dal nuovo, asincrono `shell.trashItem()`.

```js
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Cambiamenti Pianificati API (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## Cambiamenti Pianificati API (10.0)

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

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

Vedi [#23265](https://github.com/electron/electron/pull/23265) per maggiori dettagli.

### Deprecato: `crashReporter.start({ compress: false })`

Impostare `{ compress: false }` in `crashReporter.start` è deprecato. Quasi tutti i server di ingestione crash supportano la compressione gzip. Questa opzione sarà rimossa in una futura versione di Electron.

### Rimosso: Affinità Della Finestra Del Browser

L'opzione `affinity` quando si costruisce una nuova `BrowserWindow` verrà rimossa come parte del nostro piano per allinearsi più strettamente al modello di processo di Chromium per la sicurezza, prestazioni e manutenzione.

Per informazioni più dettagliate cfr. [#18397](https://github.com/electron/electron/issues/18397).

### Default Changed: `enableRemoteModule` defaults to `false`

In Electron 9, utilizzando il modulo remoto senza attivarlo esplicitamente tramite l'opzione `enableRemoteModule` WebPreferences ha iniziato a emettere un avviso. In Electron 10, il modulo remoto è ora disabilitato per impostazione predefinita. Per utilizzare il modulo remoto, `enableRemoteModule: true` deve essere specificato in WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

[consigliamo di allontanarsi dal modulo remoto](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

## Cambiamenti Pianificati API (9.0)

### Predefinito modificato: il caricamento dei moduli nativi non consapevoli del contesto nel processo di renderer è disabilitato per impostazione predefinita

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  Questo per migliorare la sicurezza, le prestazioni e la manutenzione di Electron come progetto.

Se questo ti impatta, puoi temporaneamente impostare `app.allowRendererProcessReuse` a `false` per tornare al vecchio comportamento.  Questo flag sarà solo un'opzione fino a Electron 11, quindi dovresti pianificare di aggiornare i tuoi moduli nativi per essere consapevole del contesto.

Per informazioni più dettagliate cfr. [#18397](https://github.com/electron/electron/issues/18397).

### Rimosso: `<webview>.getWebContents()`

Questa API, che è stata deprecata in Electron 8.0, è ora rimossa.

```js
// Rimosso in Electron 9.0
webview.getWebContents()
// Sostituisci con
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Rimosso: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. La funzione è stata deprecata in Electron 8.x, ed è stata rimossa in Electron 9.x. I limiti di livello di zoom del layout sono ora fissati ad un minimo di 0. 5 e un massimo di 5,0, come definito [qui](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Comportamento modificato: Inviare oggetti non-JS su IPC ora lancia un'eccezione

In Electron 8.0, IPC è stato modificato per utilizzare l'algoritmo di clone strutturato, apportando miglioramenti significativi delle prestazioni. Per facilitare la transizione, il vecchio algoritmo di serializzazione IPC è stato mantenuto e utilizzato per alcuni oggetti che non sono serializzabili con Structured Clone. In particolare, oggetti DOM (ad esempio `Element`, `Posizione` e `DOMMatrix`), Node. s oggetti supportati da classi C++ (es. `processo. nv`, alcuni membri di `Stream`) e oggetti Electron supportati da classi C++ (ad es. `WebContents`, `BrowserWindow` e `WebFrame`) non sono serializzabili con Structured Clone. Ogni volta che il vecchio algoritmo è stato invocato, è stato stampato un avviso di deprecazione .

In Electron 9. , il vecchio algoritmo di serializzazione è stato rimosso, e l'invio di tali oggetti non serializzabili ora lancerà un "object could not be cloned" error.

### API Changed: `shell.openItem` is now `shell.openPath`

L'API `shell.openItem` è stata sostituita con un'API asincrona `shell.openPath`. Puoi vedere la proposta API originale e il ragionamento [qui](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Cambiamenti Pianificati API (8.0)

### Comportamento modificato: i valori inviati tramite IPC sono ora serializzati con l'algoritmo di clone strutturato

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

### Deprecato: `<webview>.getWebContents()`

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
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  se (! uest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest. ostWebContents ! = contenuti) {
    throw new Error('Access denied to webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  ospite. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Deprecato: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Cambiamenti Pianificati API (7.0)

### Deprecato: Atom.io Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecato: https://atom.io/download/electron

Rimpiazza con: https://electronjs.org/headers

### API Changed: `session.clearAuthCache()` non accetta più opzioni

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API modificata: `powerMonitor.querySystemIdleState` ora è `powerMonitor.getSystemIdleState`

```js
// Rimosso in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Sostituisci con API sincrona
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API modificata: `powerMonitor.querySystemIdleTime` ora è `powerMonitor.getSystemIdleTime`

```js
// Rimosso in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Sostituisci con API sincrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### API modificata: `webFrame.setIsolatedWorldInfo` sostituisce metodi separati

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

### Rimosso: `ha contrassegnato` proprietà su `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Comportamento modificato: l'attributo `webkitdirectory` per `<input type="file"/>` ora elenca i contenuti della directory

La proprietà `webkitdirectory` su ingressi di file HTML permette loro di selezionare le cartelle. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

A partire da Electron 7, che `FileList` è ora elenco di tutti i file contenuti all'interno di la cartella, analogamente a Chrome, Firefox, e Edge ([link a MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Come illustrazione, prendi una cartella con questa struttura:

```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6, questo restituirebbe un `FileList` con un `File` object per:

```console
path/to/folder
```

In Electron 7, questo ora restituisce un `FileList` con un `File` object per:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Nota che `webkitdirectory` non espone più il percorso alla cartella selezionata. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Cambiamenti Pianificati API (6.0)

### API Changed: `win.setMenu(null)` is now `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API modificata: `contentTracing.getTraceBufferUsage()` è ora una promessa

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

### API Changed: `electron.screen` nel processo di renderer dovrebbe essere accessibile via `remote`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers non carica più implicitamente la `versione remota`

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

### Deprecato: `powerMonitor.querySystemIdleState` sostituito con `powerMonitor.getSystemIdleState`

```js
// Deprecato
powerMonitor.querySystemIdleState(threshold, callback)
// Sostituire con l'API sincrona
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Deprecato: `powerMonitor.querySystemIdleTime` sostituito con `powerMonitor.getSystemIdleTime`

```js
// Deprecato
powerMonitor.querySystemIdleTime(callback)
// Sostituire con l'API sincrona
const idleTime = powerMonitor.getSystemIdleTime()
```

### Deprecato: `app.enableMixedSandbox()` non è più necessario

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Deprecato: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Cambiamenti Pianificati API (5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` default to true

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

### Comportamento modificato: `nodeIntegrazione` nelle finestre figlie aperte tramite `nativeWindowOpen`

Le finestre figlie aperte con l'opzione `nativeWindowOpen` avranno sempre l'integrazione di Node.js disabilitata, a meno che `nodeIntegrationInSubFrames` non sia `vero`.

### API modificato: la registrazione di schemi privilegiati deve ora essere fatta prima che l'app sia pronta

Le API di processo di Renderer `webFrame.registerURLSchemeAsPrivileged` e `webFrame.registerURLSchemeAsBypassingCSP` e le API di processo del browser `protocol.registerStandardSchemes` sono state rimosse. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Deprecato: `webFrame.setIsolatedWorld*` sostituito con `webFrame.setIsolatedWorldInfo`

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

### API modificata: `webFrame.setSpellCheckProvider` ora richiede una callback asincrona

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

## Cambiamenti Pianificati API (4.0)

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

### `app.rilasciaIstanzaSingola`

```js
// Deprecato
app.releaseSingleInstance()
// Sostituire con
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

## Cambiamenti API (3.0)

La seguente lista include i cambiamenti delle API in Electron 3.0.

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
// Deprecato
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Sostituisci con
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Deprecato
finestra. n('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Sostituisci con
finestra. n('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

### `appunti`

```js
// Deprecato
clipboard.readRtf()
// Rimpiazza con
clipboard.readRTF()

// Deprecato
clipboard.writeRtf()
// Rimpiazza con
clipboard.writeRTF()

// Deprecato
clipboard.readHtml()
// Rimpiazza con
clipboard.readHTML()

// Deprecato
clipboard.writeHtml()
// Rimpiazza con
clipboard.writeHTML()
```

### `riportatorecrash`

```js
// Deprecato
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Rimpiazza con
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Deprecato
nativeImage.createFromBuffer(buffer, 1.0)
// Rimpiazza con
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `schermo`

```js
// Deprecato
screen.getMenuBarHeight()
// Rimpiazza con
screen.getPrimaryDisplay().workArea
```

### `sessione`

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
// Deprecato
tray.setHighlightMode(true)
// Rimpiazza con
tray.setHighlightMode('on')

// Deprecato
tray.setHighlightMode(false)
// Rimpiazza con
tray.setHighlightMode('off')
```

### `webContents`

```js
// Deprecato
webContents.openDevTools({ detach: true })
// Sostituire con
webContents.openDevTools({ mode: 'detach' })

// Rimosso
webContents.setSize(options)
// Non c'è sostituzione per questa API
```

### `webFrame`

```js
// Deprecato
webFrame.registerURLSchemeAsSecure('app')
// Rimpiazza con
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecato
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Rimpiazza con
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Rimosso
webview.setAttribute('disableguestresize', '')
// Non c'è sostituzione per questa API

// Rimosso
webview.setAttribute('guestinstance', instanceId)
// Non c'è sostituzione per questa API

// I listeners di tastiera non funzionano più sul tag webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

Questa è l'URL specificata come `disturl` in un file `.npmrc` o come linea di comando `--dist-url` segnalata costruendo moduli Node nativi.

Deprecato: https://atom.io/download/atom-shell

Rimpiazza con: https://atom.io/download/electron

## Cambiamenti API (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `BrowserWindow`

```js
// Deprecato
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Sostituire con
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Rimosso
menu.popup(browserWindow, 100, 200, 2)
// Sostituito con
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Rimosso
nativeImage.toPng()
// Sostituito con
nativeImage.toPNG()

// Rimosso
nativeImage.toJpeg()
// Sostituito con
nativeImage.toJPEG()
```

### `process`

* `process.versions.electron` e `process.version.chrome` diventeranno delle proprietà di sola lettura coerentemente con le altre proprietà `process.versions` impostate da Node.

### `webContents`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Rimosso
webContents.setZoomLevelLimits(1, 2)
// Sostituito con
webContents.setVisualZoomLevelLimits(1, 2)
```

### Asset ARM duplicati

Ogni rilascio di Electron include due build ARM identiche con filename leggermente differenti, come `electron-v1.7.3-linux-arm.zip` e `electron-v1.7.3-linux-armv7l.zip`. L'asset con il prefisso `v7l` è stato aggiunto per chiarire agli utenti quale versione di ARM esso supporti, e per renderlo disambiguo dai futuri asset armv6l e arm64 che potrebbero essere prodotti.

Il file _senza prefisso_ è ancora in fase di pubblicazione per evitare di rompere le configurazioni che lo stanno ancora utilizzando. Starting at 2.0, the unprefixed file will no longer be published.

Per maggiori dettagli, vedere [6986](https://github.com/electron/electron/pull/6986) e [7189](https://github.com/electron/electron/pull/7189).
