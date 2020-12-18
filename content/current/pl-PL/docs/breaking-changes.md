# Breaking Changes

Zmienne zmiany zostaną tutaj udokumentowane i w miarę możliwości zostaną dodane ostrzeżenia do kodu JS, co najmniej [jednej głównej wersji](tutorial/electron-versioning.md#semver) przed wprowadzeniem zmiany.

### Rodzaje zmian

Niniejszy dokument stosuje następującą konwencję do kategoryzowania zmian naruszających:

* **Zmieniono API:** API zostało zmienione w taki sposób, że kod, który nie został zaktualizowany, jest gwarantowany, aby rzucić wyjątek.
* **Zachowanie zmienione:** Zachowanie Electrona uległo zmianie, ale nie w taki sposób, aby wyjątek został wyrzucony.
* **Zmieniono domyślnie:** Kod w zależności od starej wartości domyślnej może się złamać, niekoniecznie wyrzucając wyjątek. Stare zachowanie może zostać przywrócone poprzez wyraźne określenie wartości.
* **Przestarzałe:** API zostało oznaczone jako przestarzałe. API będzie nadal działać, ale będzie emitować ostrzeżenie o deprekacji i zostanie usunięte w przyszłym wydaniu.
* **Usunięto:** API lub funkcja została usunięta i nie jest już obsługiwana przez Electron.

## Planowane zmiany API (13.0)

### API Changed: `session.setPermissionCheckHandler(handler)`

The `handler` methods first parameter was previously always a `webContents`, it can now sometimes be `null`.  You should use the `requestingOrigin`, `embeddingOrigin` and `securityOrigin` properties to respond to the permission check correctly.  As the `webContents` can be `null` it can no longer be relied on.

```js
// Old code
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// Replace with
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### Usunięto: `shell.moveItemToTrash()`

Przestarzałe synchroniczne `shell.moveItemToTrash()` API zostało usunięte. Zamiast tego użyj asynchronicznego `shell.trashItem()`.

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
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
// Usunięte w Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Zamienione z
session.defaultSession.loadExtension(path)
```

```js
// Usunięte Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Zamienione z
session.defaultSession.removeExtension(extension_id)
```

```js
// Usunięte w Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Zamienione z
session.defaultSession.getAllExtensions()
```

### Usunięto: metody w `systemPreferences`

The following `systemPreferences` methods have been deprecated:
* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:
* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Usunięte w Electron 13
systemPreferences.isDarkMode()
// Zamienione z
nativeTheme.shouldUseDarkColors

// Usunięte w Electron 13
systemPreferences.isInvertedColorScheme()
// Zamienione z
nativeTheme.shouldUseInvertedColorScheme

// Usunięte w Electron 13
systemPreferences.isHighContrastColorScheme()
// Zamienione z
nativeTheme.shouldUseHighContrastColors
```

## Planned Breaking API Changes (12.0)

### Usunięta: Wsparcie Pepper Flash

Chromium usunął wsparcie dla Flash, a więc musimy śledzić garnitur. Zobacz Chromium [Flash Roadmap](https://www.chromium.org/flash-roadmap) , aby uzyskać więcej szczegółów.

### Zmieniono domyślnie: `contextIsolation` domyślnie `true`

W Electron 12 `contextIsolation` będzie domyślnie włączone.  Aby przywrócić poprzednie zachowanie, `Isolation: false` musi być określony w ustawieniach WebPreferences.

[Zalecamy włączenie izolacji kontekstowej](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) dla bezpieczeństwa aplikacji.

Więcej informacji na stronie: https://github.com/electron/electron/issues/23506

### Usunięto: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been removed. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Removed in Electron 12
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

They should be called only from the main process.

Zobacz [#23265](https://github.com/electron/electron/pull/23265) aby uzyskać więcej szczegółów.

### Zmieniono domyślnie: `crashReporter.start({ compress: true })`

Domyślna wartość opcji `kompresuj` na `crashReporter.start` zmieniła się z `false` na `true`. Oznacza to, że zrzuty awarii zostaną przesłane do serwera awaria przy użyciu nagłówka `Content-Encoding: gzip` , a ciało zostanie skompresowane.

Jeśli twój serwer awarii nie obsługuje skompresowanych ładunków, możesz wyłączyć kompresję, określając `{ compress: false }` w opcjach raportowania awarii .

### Moduł przestarzały: `zdalny`

`zdalny` moduł jest przestarzały w Electron 12 i zostanie usunięty w Electron 14. Jest zastąpiony modułem [`@electron/remote`](https://github.com/electron/remote).

```js
// Przestarzałe w Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Zamień z:
const { BrowserWindow } = require('@electron/remote')

// W głównym procesie:
require('@electron/remote/main').initialize()
```

### Przestarzałe: `shell.moveItemToTrash()`

synchroniczny `shell.moveItemToTrash()` został zastąpiony nowym, asynchronicznym `shell.trashItem()`.

```js
// Przestarzałe w Electron 12
shell.moveItemToTrash(path)
// Zamienione z
shell.trashItem(path).then(/* ... */)
```

## Planned Breaking API Changes (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

Aby uzyskać bardziej szczegółowe informacje, zobacz [#23578](https://github.com/electron/electron/pull/23578).

## Planowane zmiany API (10.0)

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

Zobacz [#23265](https://github.com/electron/electron/pull/23265) aby uzyskać więcej szczegółów.

### Przestarzałe: `crashReporter.start({ compress: false })`

Ustawienie `{ compress: false }` w `crashReporter.start` jest przestarzałe. Prawie wszystkie serwery obsługują kompresję gzip. Ta opcja zostanie usunięta w przyszłej wersji Electron.

### Usunięto: Doskonałość okna przeglądarki

Opcja `powinowactwo` podczas konstruowania nowego `BrowserWindow` zostanie usunięta w ramach naszego planu, aby w większym stopniu dostosować się do modelu procesu Chromium dla bezpieczeństwa, wydajność i możliwość utrzymania.

Więcej szczegółowych informacji można znaleźć w [#18397](https://github.com/electron/electron/issues/18397).

### Zmieniono domyślnie: `enableRemoteModule` domyślnie `false`

W Electron 9 użycie zdalnego modułu bez wyraźnego włączenia go za pośrednictwem `enableteModule` WebPreferencje zaczęły wysyłać ostrzeżenie. W Electron 10 moduł zdalny jest domyślnie wyłączony. Aby użyć zdalnego modułu , `enableteModule: true` musi być określony w WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

[Zalecamy odsunięcie się od zdalnego modułu ](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

## Planowane zmiany API (9.0)

### Zmieniono domyślnie: domyślnie wczytywanie niekontekstowych natywnych modułów w procesie renderowania jest wyłączone

Od Electron 9 nie możemy wczytywać nieuwzględnionych kontekstowo modułów natywnych w procesie renderowania.  Ma to na celu poprawę bezpieczeństwa, wydajności i utrzymania Electrona jako projektu.

Jeśli to wpływa na Ciebie, możesz tymczasowo ustawić `app.allowRendererProcessReuse` na `false` aby powrócić do starego zachowania.  Ta flaga będzie tylko do Electron 11, więc powinieneś zaplanować aktualizację swoich natywnych modułów, aby być świadomym kontekstu.

Więcej szczegółowych informacji można znaleźć w [#18397](https://github.com/electron/electron/issues/18397).

### Deprecated: `BrowserWindow` extension APIs

The following extension APIs have been deprecated:

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
// Deprecated in Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Deprecated in Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Deprecated in Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### Usunięto: `<webview>.getWebContents()`

Ten API, który został przestarzały w Electron 8.0, został teraz usunięty.

```js
// Usunięto w Electron 9.0
webview.getWebContents()
// Zamień z
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Usunięto: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. Funkcja została przestarzała w Electron 8.x i została usunięta w Electron 9.x. Limity poziomów powiększenia układu są teraz ustalone na poziomie co najmniej 0. 5 i maksimum 5,0, zgodnie z definicją [tutaj](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Zmieniono zachowanie: Wysyłanie obiektów innych niż JS przez IPC teraz rzuca wyjątek

W Electron 8.0 IPC zmieniono na algorytm Klonowania Strukturalnego, przynosząc znaczące ulepszenia wydajności. Aby ułatwić transformację, stary algorytm serializacji IPC został zachowany i użyty dla niektórych obiektów, które nie są serializowane z Klonem Strukturalnym. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Za każdym razem, gdy przywołano stary algorytm, wydrukowano ostrzeżenia o deprekacji.

In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.

### Zmieniono API: `shell.openItem` jest teraz `shell.openŚcieżka`

`shell.openItem` API zostało zastąpione asynchronicznym `shell.openPath` API. Możesz zobaczyć oryginalną propozycję API i rozumowanie [tutaj](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Planned Breaking API Changes (8.0)

### Zmieniono zachowanie: Wartości wysłane przez IPC są teraz serializowane z Algorytmem Klonowania Strukturalnego

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

### Przestarzałe: `<webview>.getWebContents()`

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

const getGuestForWebContents = (webContentsId, zawartość) => {
  const gość = webContents. romId(webContentsId)
  jeśli (! uest) {
    rzuca nowy błąd(`Invalid webContentsId: ${webContentsId}`)
  }
  jeśli (gość. ostWebContent! = zawartość) {
    rzuca nowy Error('Odmowa dostępu do webContents')
  }
  wróć gość
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const goest = getGuestForWebContents(webContentsId, event.sender)
  gość. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Przestarzałe: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Deprecated events in `systemPreferences`

The following `systemPreferences` events have been deprecated:
* `inverted-color-scheme-changed`
* `high-contrast-color-scheme-changed`

Use the new `updated` event on the `nativeTheme` module instead.

```js
// Przestarzałe
systemPreferences.on('inverted-color-scheme-changed', () => { /* ... */ })
systemPreferences.on('high-contrast-color-scheme-changed', () => { /* ... */ })

// Zamień z
nativeTheme.on('updated', () => { /* ... */ })
```

### Deprecated: methods in `systemPreferences`

The following `systemPreferences` methods have been deprecated:
* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:
* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Deprecated
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Deprecated
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

## Planned Breaking API Changes (7.0)

### Przestarzałe: URL nagłówków węzła Atom.io

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### Zmieniono API: `session.clearAuthCache()` nie akceptuje już opcji

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### Zmieniono API: `powerMonitor.querySystemIdleState` jest teraz `powerMonitor.getSystemIdleState`

```js
// Usunięto w Electron 7.0
powerMonitor.querySystemIdleState(prog, wywołanie zwrotne)
// Zastąp synchronicznym API
const idleState = powerMonitor.getSystemIdleState(prog)
```

### Zmieniono API: `powerMonitor.querySystemIdleTime` jest teraz `powerMonitor.getSystemIdleTime`

```js
// Usunięto w Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Zastąp synchronicznym API
const Time = powerMonitor.getSystemIdleTime()
```

### Zmieniono API: `webFrame.setIsolatedWorldInfo` zastępuje oddzielne metody

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

### Usunięto: `oznaczono` właściwość na `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Zmieniono zachowanie: `webkitdirectory` atrybut dla `<input type="file"/>` teraz zawiera zawartość katalogu

Własność `webkitdirectory` w plikach HTML pozwala im wybrać foldery. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Począwszy od Electron 7, ta `Lista Plików` jest teraz listą wszystkich plików zawartych w folderze, podobnie jak Chrome, Firefox i Edge ([link do dokumentów MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Jako ilustrację, weź folder z tą strukturą:

```console
folder
├── file1
├── file2
└── file3
```

W Electron <=6 zwróci to listę plików `` z obiektem `Plik` dla:

```console
path/to/folder
```

W Electron 7 zwróci teraz `Listę Plików` z `Plikiem` obiektu dla:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Pamiętaj, że `webkitdirectory` nie wyświetla już ścieżki do wybranego folderu. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

### Zmieniono API: `win.setMenu(null)` jest teraz `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### Zmieniono API: `contentTracing.getTraceBufferUsage()` jest teraz obietnicą

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

### Zmieniono API: `electron.screen` w procesie renderowania powinien być dostępny przez `zdalny`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers not implicly load the `remote` version

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

### Przestarzałe: `powerMonitor.querySystemIdleState` zastąpiony `powerMonitor.getSystemIdleState`

```js
// Przestarzały
powerMonitor.querySystemIdleState(prog, wywołanie zwrotne)
// Zastąp synchronicznym API
const idleState = powerMonitor.getSystemIdleState(prog)
```

### Przestarzałe: `powerMonitor.querySystemIdleTime` zastąpiony `powerMonitor.getSystemIdleTime`

```js
// Przestarzały
powerMonitor.querySystemIdleTime(callback)
// Zastąp synchronicznym API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Przestarzałe: `app.enableMixedSandbox()` nie jest już potrzebny

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Przestarzałe: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

### Zmieniono domyślnie: `nodeIntegration` i `webtag` domyślnie na false, `contextIsolation` domyślnie na true

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

### Zmieniono zachowanie: `nodeIntegration` w oknach podrzędnych otwartych przez `nativeWindowOpen`

Okna podrzędne otwarte za pomocą opcji `nativeWindowOpen` zawsze będą wyłączone integracje Node.js, chyba że `nodeIntegrationInSubFrames` jest `true`.

### Zmieniono API: Rejestracja uprzywilejowanych schematów musi zostać zakończona przed przygotowaniem aplikacji

API procesu renderowania `webFrame.registerURLSchemeAsPrivileged` i `webFrame.registerURLSchemeAsBypassingCSP` oraz przeglądarki API `protocol.registerStandardSchemes` zostały usunięte. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Przestarzałe: `webFrame.setIsolatedWorld*` zastąpiony `webFrame.setIsolatedWorldInfo`

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

### Zmieniono API: `webFrame.setSpellCheckProvider` teraz przyjmuje asynchroniczne wywołanie zwrotne

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
// Przestarzałe
app.releaseSingleInstance()
// Zamień na
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
// Przestarzały
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Zastąp
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Przestarzałe okno
. n('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // zrób coś
  }
})
// Zastąp oknem
. n('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // zrób coś
  }
})
```

### `clipboard`

```js
// Przestarzałe
clipboard.readRtf()
// Zamień na
clipboard.readRTF()

// Przestarzałe
clipboard.writeRtf()
// Zamień na
clipboard.writeRTF()

// Przestarzałe
clipboard.readHtml()
// Zamień na
clipboard.readHTML()

// Przestarzałe
clipboard.writeHtml()
// Zamień na
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
// Przestarzałe
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

## Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `BrowserWindow`

```js
// Przestarzały
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Zastąp
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

Plik _bez prefiksu_ jest nadal publikowany, aby uniknąć łamania konfiguracji, które mogą go zużywać. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
