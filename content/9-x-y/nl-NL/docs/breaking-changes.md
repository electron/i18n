# Breaking Changes

Het onderbreken van wijzigingen zal hier gedocumenteerd worden en tijdelijke waarschuwingen waar mogelijk toegevoegd aan de JS-code minstens [één grote versie](tutorial/electron-versioning.md#semver) voordat de wijziging wordt doorgevoerd.

### Soorten onderbreken wijzigingen

Dit document maakt gebruik van de volgende conventie om de wijzigingen te categoriseren:

- **API veranderd:** Een API is zo gewijzigd dat code die niet is bijgewerkt gegarandeerd wordt om een uitzondering te gooien.
- **Gedrag gewijzigd:** Het gedrag van Electron is veranderd, maar niet op een zodanige manier dat een uitzondering noodzakelijkerwijs wordt geworpen.
- **Standaard gewijzigd:** Code afhankelijk van de oude standaard kan breken, niet noodzakelijk een uitzondering weggooien. Het oude gedrag kan worden hersteld door de waarde expliciet te specificeren.
- **Afgekeurd:** Een API is gemarkeerd als verouderd. De API blijft functioneren, maar geeft een waarschuwing en wordt in een toekomstige versie verwijderd.
- **Verwijderd:** Een API of functie is verwijderd en wordt niet langer ondersteund door Electron.

## Planned Breaking API Changes (12.0)

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadeReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

## Planned Breaking API Changes (11.0)

## Geplande Breaking API Wijzigingen (10.0)

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

- `start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadeReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Verwijderd: Affiniteit van het browservenster

De optie `affiniteit` bij het bouwen van een nieuw `BrowserWindow` zal worden verwijderd als onderdeel van ons plan om nauwer af te stemmen op Chromium procesmodel voor veiligheid prestaties en onderhoudsmogelijkheden.

Zie [#18397](https://github.com/electron/electron/issues/18397) voor meer gedetailleerde informatie.

### Standaard gewijzigd: `enableRemoteModule` standaard `false`

In Electron 9 begon het gebruik van de externe module zonder deze expliciet in te schakelen via de `Activeer deze module` WebVoorkeuren optie een waarschuwing te geven. In Electron 10 is de externe module nu standaard uitgeschakeld. Om de externe module te gebruiken, `enableRemoteModule: true` moet worden opgegeven in WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

Wij [raden aan om weg te gaan van de externe module](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

## Geplande Breaking API Wijzigingen (9.0)

### Standaard gewijzigd: niet-context-aware native modules in het renderer-proces is standaard uitgeschakeld

Vanaf Electron 9 staan we het laden van niet-context-aware native modules niet toe in het renderer-proces.  Dit is om de beveiliging, prestaties en onderhoud van Electron als project te verbeteren.

Als dit je beïnvloedt, kun je tijdelijk `app.allowRendererProcessReuse` zetten op `false` om terug te keren naar het oude gedrag.  Deze vlag zal alleen een optie zijn tot Electron 11 dus je van plan bent om je native modules te updaten zodat je context weet.

Zie [#18397](https://github.com/electron/electron/issues/18397) voor meer gedetailleerde informatie.

### Verwijderd: `<webview>.getWebContents()`

Deze API, die verouderd was in Electron 8.0, is nu verwijderd.

```js
// Verwijderd in Electron 9.0
webview.getWebContents()
// Vervang door
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Verwijderd: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Gedrag veranderd: Het verzenden van niet-JS objecten over IPC geeft nu een uitzondering

In Electron 8.0 is IPC gewijzigd om het gestructureerde Clone Algoritme te gebruiken. Dit brengt aanzienlijke prestatieverbeteringen met zich mee. Om de overgang te vergemakkelijken werd het oude IPC-serialisatiealgoritme bewaard en gebruikt voor sommige objecten die niet serialiseerbaar zijn met gestructureerde klas. Vooral DOM-objecten (bijv. `element`, `Locatie` en `DOMMatrix`), Node. de objecten die worden ondersteund door C++ klassen (bijv. `proces. nv`, sommige leden van `Stream`), en Electron objecten ondersteund door C++ klassen (bijv. `WebContents`, `BrowserVenster` en `WebFrame`) zijn niet serialiseerbaar met gestructureerde klas. Wanneer het oude algoritme werd ingeroepen, is een afschrikkingswaarschuwing afgedrukt.

In Electron 9. , het oude serialisatiealgoritme is verwijderd, en het sturen van dergelijke niet-serialiseerbare objecten gooit nu een "object kon niet worden gekloond" fout.

### API gewijzigd: `shell.openItem` is nu `shell.openPath`

De `shell.openItem` API is vervangen door een asynchrone `shell.openPath` API. Je kunt het oorspronkelijke API-voorstel en de redenering [hier](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md) zien.

## Planned Breaking API Changes (8.0)

### Gedrag gewijzigd: Waarden die via IPC zijn verzonden zijn nu geserialiseerd met een gestructureerd kloonalgoritme

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

### Afgekeurd: `<webview>.getWebContents()`

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
// hoofd
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const gast = webContents. romId(webContentsId)
  if (! uest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (gast. ostWebInhoud ! = contents) {
    throw new Error(`Access denied to webContents`)
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const gast = getGuestForWebContents(webContentsId, event.sender)
  gast. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Verouderd: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Planned Breaking API Changes (7.0)

### Verouderd: Atom.io Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API gewijzigd: `session.clearAuthCache()` accepteert niet langer opties

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API veranderd: `powerMonitor.querySystemIdleState` is nu `powerMonitor.getSystemIdleState`

```js
// Verwijderd in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Vervang door synchrone API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API veranderd: `powerMonitor.querySystemIdleTime` is nu `powerMonitor.getSystemIdleState`

```js
// Verwijderd in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Vervang door synchrone API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API gewijzigd: `webFrame.setIsolatedWorldInfo` vervangt afzonderlijke methoden

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

### Verwijderd: `gemarkeerd` eigenschap op `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Gedrag gewijzigd: `webkitdirectory` attribuut voor `<input type="file"/>` geeft nu de inhoud van de map weer

De `webkitdirectory` eigenschap van HTML-bestandsinvoer stelt hen in staat mappen te selecteren. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Vanaf Electron 7 is dat `Bestandslijst` nu een lijst is van alle bestanden in de map, Hetzelfde geldt voor Chrome, Firefox en Edge ([link naar MDN-docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Neem als een illustratie een map met deze structuur:
```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6 zou dit een `Bestandslijst` met een `Bestand` object teruggeven voor:
```console
path/to/folder
```

In Electron 7 retourneert dit nu een `Bestandslijst` met een `Bestand` object voor:
```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Merk op dat `webkitdirectory` niet langer het pad naar de geselecteerde map blootstelt. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

### API gewijzigd: `win.setMenu(null)` is nu `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API gewijzigd: `contentTracing.getTraceBufferUsage()` is nu een belofte

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

### API gewijzigd: `electron.screen` in het renderer-proces moet worden geopend via `remote`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API veranderd: `require()`ing node builtins in sandboxed renderers ladt niet langer impliciet de `externe` versie

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

### Afgekeurd: `powerMonitor.querySystemIdleState` vervangen door `powerMonitor.getSystemIdleState`

```js
// Verouderd
powerMonitor.querySystemIdleState(drempelwaarde, callback)
// Vervang door synchrone API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Afgekeurd: `powerMonitor.querySystemIdleTime` vervangen door `powerMonitor.getSystemIdleTime`

```js
// Verouderd
powerMonitor.querySystemIdleTime(callback)
// Vervang door synchrone API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Afgekeurd: `app.enableMixedSandbox()` is niet langer nodig

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Verouderd: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

### Standaard gewijzigd: `nodeIntegration` en `webviewTag` standaard op false, `contextIsolation` standaard op true

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

### Gedrag gewijzigd: `nodeIntegration` in subvensters geopend via `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API veranderd: Het registreren van bevoorrechte schema's moet nu worden gedaan voordat de app klaar is

Renderer-proces API's `webFrame.registerURLSchemeAsPrivileged` en `webFrame.registerURLSchemeAsBypassingCSP` en browserproces API `protocol.registerStandardSchemes` zijn verwijderd. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Verouderd: `webFrame.setIsolatedWorld*` vervangen door `webFrame.setIsolatedWorldInfo`

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

### API gewijzigd: `webFrame.setSpellCheckProvider` neemt nu een asynchrone callback in
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
// Deprecated
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Deprecated
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Replace with
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

### `klembord`

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

### `crashReporter`

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

### `scherm`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

### `sessie`

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
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
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

Het bestand _zonder het voorvoegsel_ wordt nog steeds gepubliceerd om te voorkomen dat er instellingen gebroken worden die het kunnen verbruiken. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
