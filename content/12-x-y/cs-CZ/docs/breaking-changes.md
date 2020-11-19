# Breaking Changes

Přerušení změn bude zdokumentováno zde, a pokud možno přidáno upozornění na zastaralý JS kód, alespoň [jedna hlavní verze](tutorial/electron-versioning.md#semver) před provedením změny.

### Typy změn zlomu

Tento dokument používá následující úmluvu pro kategorizaci změn porušení:

- **API změněno:** API bylo změněno tak, aby kód, který nebyl aktualizován, byl zaručen hodit výjimku.
- **Chování se změnilo:** Chování Electronu se změnilo, ale ne takovým způsobem, že výjimka bude nutně hozena.
- **Výchozí změněno:** Kód v závislosti na starém výchozím nastavení se může rozbít, nemusí nutně házet výjimku. Staré chování lze obnovit výslovným zadáním hodnoty.
- **Deprecated:** API bylo označeno jako zastaralé. API bude i nadále fungovat, ale vypouští varování o zastaralosti a bude odstraněno v budoucí verzi.
- **Odstraněno:** API nebo funkce byla odstraněna a Electron již nepodporuje.

## Plánované přerušení API změn (13.0)

### Odstraněno: `shell.moveItemToTrash()`

Zastaralé synchronní `shell.moveItemToTrash()` API bylo odstraněno. Použijte místo toho asynchronní `shell.trashItem()`.

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Planned Breaking API Changes (12.0)

### Odstraněno: podpora Pepper Flash

Chrom odstranil podporu pro Flash, a proto ji musíme následovat. Více informací najdete Chromium's [Flash Roadmap](https://www.chromium.org/flash-roadmap) .

### Výchozí změněno: `contextIsolation` výchozí je `true`

V Electronu 12 bude ve výchozím nastavení povoleno `kontextIsolation`.  Pro obnovení předchozího chování, `kontextIsolation: false` musí být specifikováno v WebPreferences.

Pro bezpečnost vaší aplikace [doporučujeme povolit kontextIzolaci](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content).

Pro více informací viz https://github.com/electron/electron/issues/23506

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Výchozí změněno: `crashReporter.start({ compress: true })`

Výchozí hodnota možnosti `komprimace` na `crashReporter.start` se změnila z `false` na `true`. To znamená, že crash dumpy budou nahrány na crash ingestion server s hlavičkou `Content-Encoding: gzip` , a tělo bude komprimováno.

Pokud váš server nepodporuje komprimované užitečné zatížení, můžete vypnout kompresi zadáním `{ compress: false }` v možnostech reportéra pádu .

### Deprecated: `vzdálený` modul

`vzdálený` modul je zastaralý v Electron 12 a bude odstraněn v Electron 14. Je nahrazen modulem [`@electron/remote`](https://github.com/electron/remote).

```js
// Deprecated in Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Nahradit
: 
 const { BrowserWindow } = require('@electron/remote')

// V hlavním procesu:
vyžadováno ('@electron/remote/main').initialize()
```

### Deprecated: `shell.moveItemToTrash()`

Synchronní `shell.moveItemToTrash()` byl nahrazen novým asynchronním `shell.trashItem()`.

```js
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Planned Breaking API Changes (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`
The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## Plánované změny API (10.0)

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

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Deprecated: `crashReporter.start({ compress: false })`

Nastavení `{ compress: false }` v `crashReporter.start` je zastaralé. Téměř všechny servery s havarijní funkcí podporují kompresi gzipu. Tato možnost bude odstraněna v budoucí verzi Electronu.

### Odstraněno: Vhodnost okna prohlížeče

Možnost `affinity` při vytváření nového `BrowserWindow` bude odstraněna v rámci našeho plánu, abychom se více přiblížili modelu procesu Chromia pro bezpečnost, výkonnost a údržba.

Podrobnější informace naleznete v [#18397](https://github.com/electron/electron/issues/18397).

### Výchozí změněno: `enableRemoteModule` výchozí je `false`

V Electronu 9 používání vzdáleného modulu bez výslovného povolení prostřednictvím `enableRemoteModule` WebPreferences začalo vydávat varování. V Electron 10 je vzdálený modul ve výchozím nastavení zakázán. Pro použití vzdáleného modulu, `enableRemoteModule: true` musí být specifikováno v WebPreference:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

[doporučujeme přesunout se z vzdáleného modulu](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

## Plánované přerušení API změn (9.0)

### Výchozí změněno: Načítání nativních modulů bez kontextu, které nejsou známy v procesu vykreslování, je ve výchozím nastavení zakázáno

Od Electronu 9 nepovolujeme načítání nativních modulů, které nejsou v kontextu, do procesu vykreslování.  Tím se zlepší bezpečnost, výkonnost a udržitelnost Electronu jako projektu.

Pokud to ovlivní vás, můžete dočasně nastavit `app.allowRenderProcessReuse` na `false` a vrátit se ke starému chování.  Tato vlajka bude pouze volbou do Electron 11, takže byste měli plánovat aktualizaci svých rodilých modulů, abyste si byli vědomi kontextu.

Podrobnější informace naleznete v [#18397](https://github.com/electron/electron/issues/18397).

### Odstraněno: `<webview>.getWebContents()`

Toto API, které bylo zastaralé v Electron 8.0, je nyní odstraněno.

```js
// Odstraněno v Electron 9.0
webview.getWebContents()
// Nahradit
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Odstraněno: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Změna chování: Odesílání ne-JS objektů přes IPC nyní hodí výjimku

V Electronu 8.0 byla IPC změněna na použití algoritmu strukturovaného klonu , který přináší významná zlepšení výkonu. To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. Zejména objekty DOM (např. `Element`, `Poloha` a `DOMMatrix`, Node. s objekty podporované třídami C++ (např. `. nv`, někteří členové `Stream`a Electron objekty podporované třídami C++ (např. `WebObsah`, `BrowserWindow` a `WebFrame`nejsou serializovatelný se strukturovaným klonováním. Kdykoli byl spuštěn starý algoritmus, byla vytištěna výstraha při ladění.

V elektronce 9. , starý serializační algoritmus byl odstraněn a odeslání takovýchto neserializovatelných objektů nyní hodí "objekt nelze klonovat" chybu.

### API změněno: `shell.openItem` je nyní `shell.openPath`

`shell.openItem` API bylo nahrazeno asynchronním `shell.openPath` API. Původní API návrh a odůvodnění [naleznete zde](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Planned Breaking API Changes (8.0)

### Změna chování: Hodnoty odeslané přes IPC jsou nyní serializovány se strukturovaným algoritmem klonování

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm][SCA], the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
- `BigInt` values will be correctly serialized, instead of being converted to `null`.
- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Deprecated: `<webview>.getWebContents()`

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

const getGuestForWebContents = (webContentsId contents) => {
  const guest = webContents. romId(webContentsId)
  pokud (! uest) {
    hodí novou chybu (`Neplatný webContentsId: ${webContentsId}`)
  }
  pokud (host. ostWebContent ! = obsah) {
    hodí novou chybu ('Access denied to webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event of webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  host. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRender.invoke('openDevTools', webview.getWebContentsId())
```

### Depredátor: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Planned Breaking API Changes (7.0)

### Deprecated: URL hlavičky uzlu Atom.io

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API změněno: `session.clearAuthCache()` již nepřijímá možnosti

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API změněno: `powerMonitor.querySystemIdleState` je nyní `powerMonitor.getSystemIdleState`

```js
// Odstraněno v Electron 7.0
powerMonitor.querySystemIdleState(práh, callback)
// Nahradit synchronním API
const idleState = powerMonitor.getSystemIdleState(prahová hodnota)
```

### API změněno: `powerMonitor.querySystemIdleTime` je nyní `powerMonitor.getSystemIdleTime`

```js
// Odstraněno v Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Nahradit synchronním API
const nečinnosti = powerMonitor.getSystemIdleTime()
```

### API změněno: `webFrame.setIsolatedWorldInfo` nahrazuje samostatné metody

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

### Odstraněno: `označená` vlastnost na `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Chování bylo změněno: `webkitdirectory` atribut pro `<input type="file"/>` nyní uvádí obsah adresáře

Vlastnost `webkitdirectory` pro HTML soubory umožňuje vybrat složky. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Počínaje Electron 7 je tento `FileList` nyní seznam všech souborů obsažených v složce, podobně jako Chrome, Firefox a Edge ([odkaz na MDN dokumentace](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Jako ilustraci, vezměte složku s touto strukturou:

```console
folder
├── file1
├── file2
└── file3
```

V Electronu <=6 by se vrátil `Seznam souborů` s objektem `Soubor` pro:

```console
path/to/folder
```

V Electronu 7 to nyní vrací `SouborList` s objektem `Soubor` pro:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Všimněte si, že `webkitdirectory` již nevystavuje cestu k vybrané složce. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

### API změněno: `win.setMenu(null)` je `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API změněno: `contentTracing.getTraceBufferUsage()` je nyní příslib

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

### API bylo změněno: `electron.screen` v procesu vykreslování by měl být přístupný prostřednictvím `vzdáleného`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API bylo změněno: `vyžadováno()`ing Node builtins v sandboxed renderers již implicitně nenačte `vzdálenou verzi`

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

### Deprecated: `powerMonitor.querySystemIdleState` nahrazeno `powerMonitor.getSystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold callback)
// Replace synchronním API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Deprecated: `powerMonitor.querySystemIdleTime` nahrazeno `powerMonitor.getSystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace synchronním API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Deprecated: `app.enableMixedSandbox()` již není potřeba

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Ztlumeno: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

### Výchozí změněno: `nodeIntegration` a `webviewTag` výchozí na hodnotu false, `contextIsolation` výchozí hodnota je true

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

### Chování bylo změněno: `nodeIntegration` v podřízených oknech otevřených přes `nativeWindowOpen`

Podřízené okna otevřená s možností `nativeWindowOpen` budou vždy vypnuta integrace Node.js, pokud `nodeIntegrationInSubFrames` není `true`.

### API změněno: Registrace privilegovaných schémat musí být nyní provedena před tím, než je aplikace připravena

Byl odstraněn proces Renderer APIs `webFrame.registerURLSchemeAsPrivileged` a `webFrame.registerURLSchemeAsBypassingCSP` a také prohlížeč proces API `protocol.registerStandardSchemes`. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Deprecated: `webFrame.setIsolatedWorld*` nahrazeno `webFrame.setIsolatedWorldInfo`

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

### API změněno: `webFrame.setSpellCheckProvider` nyní přijímá asynchronní zpětné volání

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

## Planned Breaking API Changes (4.0)

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
// Deprecated
app.releaseSingleInstance()
// Replace with
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

## Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

### `appka`

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
// Deprecated
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Replace
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Deprecated
window. n('app-command', (e, cmd) => {
  , pokud (cmd === 'media-play_pause') {
    // do něco
  }
})
// Nahradit oknem
. n('app-command', (e, cmd) => {
  , pokud (cmd === 'media-play-pause') {
    // do něco
  }
})
```

### `schránka`

```js
// Deprecated
clipboard.readRtf()
// Replace with
clipboard.readRTF()

// Deprecated
clipboard.writeRtf()
// Replace with
clipboard.writeRTF()

// Deprecated
clipboard.readHtml()
// Replace with
clipboard.readHTML()

// Deprecated
clipboard.writeHtml()
// Replace with
clipboard.writeHTML()
```

### `Hlášení pádů`

```js
// Deprecated
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Replace with
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `proces`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `obrazovka`

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

## Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `BrowserWindow`

```js
// Deprecated
Const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(volitelné)
// Replace
Const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(volitelné)
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

### `proces`

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

Soubor _bez prefixu_ je stále zveřejněn, aby se zabránilo rozbití jakýchkoli nastavení, která jej mohou konzumovat. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
