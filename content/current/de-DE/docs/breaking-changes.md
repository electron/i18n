# Breaking Changes

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](tutorial/electron-versioning.md#semver) before the change is made.

### Typen von Bruchänderungen

Dieses Dokument verwendet die folgende Konvention um die Änderungen zu kategorisieren:

* **API geändert:** Eine API wurde so geändert, dass Code, der nicht aktualisiert wurde, garantiert eine Ausnahme wirft.
* **Verhalten geändert:** Das Verhalten von Electron hat sich geändert, aber nicht so, dass eine Ausnahme unbedingt geworfen wird.
* **Standard geändert:** Code abhängig von der alten Standardeinstellung kann kaputt gehen und wirft nicht notwendigerweise eine Ausnahme. Das alte Verhalten kann durch explizite Angabe des Wertes wiederhergestellt werden.
* **Veraltet:** Eine API wurde als veraltet markiert. Die API wird weiterhin funktionieren, sendet aber eine Deprecation-Warnung aus und wird in einer zukünftigen Version entfernt.
* **Entfernt:** Eine API oder Funktion wurde entfernt und wird von Electron nicht mehr unterstützt.

## Geplante Bruch-API-Änderungen (13.0)

### Entfernt: `shell.moveItemToTrash()`

Die veraltete synchrone `shell.moveItemToTrash()` API wurde entfernt. Verwende stattdessen die asynchrone `shell.trashItem()`.

```js
// Entfernt in Electron 13
shell.moveItemTosh(path)
// Ersetzen mit
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

## Planned Breaking API Changes (12.0)

### Entfernt: Pepper Flash Unterstützung

Chromium hat die Unterstützung für Flash gestrichen, und deshalb müssen wir diesem Beispiel folgen. Siehe Chromium's [Flash-Roadmap](https://www.chromium.org/flash-roadmap) für weitere Details.

### Standard geändert: `Kontext-Isolation` standardmäßig `true`

In Electron 12, `Kontext-Isolation` wird standardmäßig aktiviert.  Um das vorherige Verhalten wiederherzustellen, muss `contextIsolation: false` in WebPreferences angegeben werden.

Wir [empfehlen, Kontext-Isolation](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) für die Sicherheit Ihrer Anwendung zu aktivieren.

Für weitere Details siehe https://github.com/electron/electron/issues/23506

### Removed: `crashReporter.getCrashesDirectory()`

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

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Standard geändert: `crashReporter.start({ compress: true })`

Der Standardwert der `Komprimierung` Option zu `crashReporter.start` hat sich von `false` auf `true` geändert. Das bedeutet, dass Absturzdumps mit dem `Content-Encoding: gzip` Header auf den -Absturzserver hochgeladen werden und der Körper wird komprimiert.

Wenn Ihr Absturzeinnahme Server keine komprimierten Payloads unterstützt, Sie können die Komprimierung ausschalten, indem Sie `{ compress: false }` in den Absturzberichten Optionen angeben.

### Veraltet: `Remote-` Modul

Das `Remote-Modul` ist in Electron 12 veraltet und wird in Electron 14 entfernt. Es wird durch das Modul [`@electron/remote`](https://github.com/electron/remote) ersetzt.

```js
// Veraltet in Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Ersetzen von:
const { BrowserWindow } = require('@electron/remote')

// Im Hauptprozess:
require('@electron/remote/main').initialize()
```

### Veraltet: `shell.moveItemToTrash()`

Die synchrone `shell.moveItemToTrash()` wurde durch die neue, asynchrone `shell.trashItem()` ersetzt.

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

## Geplante API-Änderungen (10.0)

### Veraltet: `companyName` Argument, um `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. Um das gleiche Verhalten auf nicht veraltete Weise zu erhalten, können Sie einen `companyName` Wert in `globalExtra`übergeben.

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

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Veraltet: `crashReporter.start({ compress: false })`

Setze `{ compress: false }` in `crashReporter.start` ist veraltet. Fast alle Absturzeinnahmeserver unterstützen gzip-Kompression. Diese Option wird in einer zukünftigen Version von Electron entfernt.

### Entfernt: Browser-Fenster-Affinität

Die `Affinität` Option beim Erstellen eines neuen `BrowserWindow` wird als Teil unseres Plans entfernt, um das Chromium-Prozessmodell für Sicherheit besser auszurichten Leistung und Wartbarkeit.

Nähere Informationen finden Sie unter [#18397](https://github.com/electron/electron/issues/18397).

### Standard geändert: `RemoteModule` standardmäßig auf `false`

In Electron 9 hat die Verwendung des Remote-Moduls ohne es explizit über die Option `aktiviertes RemoteModule` WebPreferences eine Warnung ausgelöst. Im Electron 10 ist das Remote-Modul nun standardmäßig deaktiviert. Um das Remote- -Modul verwenden zu können, muss `RemoteModule: true` in WebPreferences angegeben werden:

```js
const w = new BrowserWindow({
  webEinstellungen: {
    enableRemoteModule: true
  }
})
```

Wir [empfehlen Ihnen, sich vom Remote- Modul](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31) zu entfernen.

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

Diese Schnittstelle ist jetzt Synchron und der optionale callback wird nicht länger gebraucht.

```javascript
// Veraltet
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Ersetzen durch
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

Diese Schnittstelle ist jetzt Synchron und der optionale callback wird nicht länger gebraucht.

```javascript
// Veraltet
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Ersetzt durch
protocol.registerFileProtocol(scheme, handler)
```

Das registrierte oder abgefangene Protokoll hat keine Auswirkungen auf die aktuelle Seite, bis eine Navigation stattfindet.

### `protocol.isProtocolHandled`

Diese Schnittstelle ist veraltet anstatt dessen sollten Benutzer `protocol.isProtocolRegistered` und `protocol.isProtocolIntercepted` nutzen.

```javascript
// Veraltet
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Ersetzen mit
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocolIntercepted(scheme)
```

## Geplante API-Änderungen (9.0)

### Standard geändert: Das Laden von nicht-kontextabhängigen nativen Modulen im Renderer-Prozess ist standardmäßig deaktiviert

Ab Electron 9 erlauben wir das Laden von nicht kontextabhängigen nativen Modulen im Prozess nicht.  Dies ist zur Verbesserung der Sicherheit, Leistung und Wartbarkeit von Electron als Projekt.

Wenn dies Sie betrifft, können Sie vorübergehend `app.allowRendererProcessReuse` auf `false` setzen, um zum alten Verhalten zurückzukehren.  Dieses Flag wird nur eine Option bis Electron 11 sein, so dass Sie planen sollten Ihre nativen Module zu aktualisieren, um den Kontext zu erkennen.

Nähere Informationen finden Sie unter [#18397](https://github.com/electron/electron/issues/18397).

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

### Entfernt: `<webview>.getWebContents()`

Diese API, die in Electron 8.0 veraltet war, wird nun entfernt.

```js
// In Electron 9.0 entfernt
webview.getWebContents()
// Ersetzen durch
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Entfernt: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. Die Funktion wurde in Electron 8.x veraltet und in Electron 9.x entfernt. Die Layout-Zoomgrenzen sind jetzt auf ein Minimum von 0 festgelegt. 5 und ein Maximum von 5.0, wie definiert [hier](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Verhalten geändert: Das Senden von Nicht-JS-Objekten über IPC wirft jetzt eine Ausnahme

In Electron 8.0 wurde IPC geändert, um den strukturierten Clone Algorithmus zu verwenden, der erhebliche Leistungsverbesserungen bringt. Um den Übergang zu erleichtern, wurde der alte IPC-Serialisierungsalgorithmus beibehalten und für einige Objekte verwendet, die nicht serialisierbar mit strukturiertem Klon sind. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Wann immer der alte Algorithmus aufgerufen wurde, wurde eine -Veraltungswarnung ausgegeben.

In Electron 9. , der alte Serialisierungsalgorithmus wurde entfernt, und das Senden von solcher nicht serialisierbarer Objekte wird nun ein "Objekt konnte nicht geklont werden" Fehler werfen.

### API geändert: `shell.openItem` ist jetzt `shell.openPath`

Die `shell.openItem` API wurde durch eine asynchrone `shell.openPath` API ersetzt. Sie können den ursprünglichen API-Vorschlag und die Argumentation [hier sehen](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Planned Breaking API Changes (8.0)

### Verhalten geändert: Über IPC gesendete Werte werden nun serialisiert mit dem strukturierten Clone Algorithmus

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

### Veraltet: `<webview>.getWebContents()`

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
// Haupt
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  if (! uest) {
    throw new Error(`Ungültige webContentsId: ${webContentsId}`)
  }
  if (guest. ostWebcontent ! = contents) {
    throw new Error('Access denied to webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  guest. penDevTools()
})

// Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Veraltet: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Planned Breaking API Changes (7.0)

### Veraltet: Atom.io Knoten-Header-URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API geändert: `session.clearAuthCache()` akzeptiert keine Optionen mehr

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API geändert: `powerMonitor.querySystemIdleState` ist jetzt `powerMonitor.getSystemIdleState`

```js
// In Electron 7.0 entfernt
powerMonitor.querySystemIdleState(Schwelle, Rückruf)
// Ersetzen mit synchroner API
const idleState = powerMonitor.getSystemIdleState(Schwell)
```

### API geändert: `powerMonitor.querySystemIdleTime` ist jetzt `powerMonitor.getSystemIdleTime`

```js
// Entfernt in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Ersetzen mit synchroner API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API geändert: `webFrame.setIsolatedWorldInfo` ersetzt separate Methoden

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

### Entfernt: `markiert` Eigenschaft auf `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Verhalten geändert: `webkitdirectory` Attribut für `<input type="file"/>` listet nun Verzeichnisinhalte auf

Die Eigenschaft `webkitdirectory` bei HTML-Datei-Eingaben erlaubt es ihnen, Ordner auszuwählen. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Ab Electron 7 ist `Dateiliste` jetzt eine Liste aller Dateien im Ordner ähnlich wie Chrome, Firefox und Edge ([Link zur MDN Dokumentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Nehmen Sie als Illustration einen Ordner mit dieser Struktur:

```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6 würde dies eine `Dateiliste` mit einem `Datei` Objekt für:

```console
path/to/folder
```

In Electron 7 liefert dies nun eine `Dateiliste` mit einem `Datei-` Objekt für:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Beachten Sie, dass `webkitdirectory` den Pfad nicht mehr dem ausgewählten Ordner anzeigt. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

### API geändert: `win.setMenu(null)` ist jetzt `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### API geändert: `contentTracing.getTraceBufferUsage()` ist jetzt ein Versprechen

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

### API geändert: `electron.screen` im Renderer-Prozess sollte über `Remote` aufgerufen werden

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### API geändert: `require()`eingebaute Knoten in Sandbox-Renderer laden nicht mehr implizit die `entfernte` Version

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

### Veraltet: `powerMonitor.querySystemIdleState` ersetzt durch `powerMonitor.getSystemIdleState`

```js
// Veraltet
powerMonitor.querySystemIdleState(Schwellenwert, Callback)
// Ersetzen mit synchroner API
const idleState = powerMonitor.getSystemIdleState(Schwellenwert)
```

### Veraltet: `powerMonitor.querySystemIdleTime` ersetzt durch `powerMonitor.getSystemIdleTime`

```js
// Veraltet
powerMonitor.querySystemIdleTime(callback)
// Ersetzen mit synchroner API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Veraltet: `app.enableMixedSandbox()` wird nicht mehr benötigt

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Veraltet: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

### Standard geändert: `nodeIntegration` und `webviewTag` default to false, `contextIsolation` defaults to true

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

### Verhalten geändert: `Knoten-Integration` in untergeordneten Fenstern, geöffnet über `nativeWindowOpen`

Kindfenster, die mit der Option `nativeWindowOpen` geöffnet wurden, werden die Node.js Integration immer deaktiviert, es sei denn, `nodeIntegrationInSubFrames` ist `true`.

### API geändert: Das Registrieren von privilegierten Schemas muss jetzt erledigt werden, bevor die App fertig ist

Renderer Prozess-APIs `webFrame.registerURLSchemeAsPrivileged` und `webFrame.registerURLSchemeAsBypassingCSP` sowie Browser-Prozess-API `protocol.registerStandardSchemes` wurden entfernt. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### Veraltet: `webFrame.setIsolatedWorld*` ersetzt durch `webFrame.setIsolatedWorldInfo`

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

### API geändert: `webFrame.setSpellCheckProvider` nimmt jetzt einen asynchronen Callback ein

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
// Veraltet
app.releaseSingleInstance()
// Ersetze mit
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Verhält sich jetzt gleich wie `basic` auf macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

## Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

### `app`

```js
// Veraltet
app.getAppMemoryInfo()
// Ersetze mit
app.getAppMetrics()

// Veraltet
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `BrowserWindow`

```js
// Veraltet
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Ersetzen durch
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Veraltet
Fenster. n('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // etwas tun
  }
})
// Ersetzen durch
Fenster. n('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // etwas tun
  }
})
```

### `Zwischenablage (clipboard)`

```js
// Veraltet
clipboard.readRtf()
// Ersetze mit
clipboard.readRTF()

// Veraltet
clipboard.writeRtf()
// Ersetze mit
clipboard.writeRTF()

// Veraltet
clipboard.readHtml()
// Ersetze mit
clipboard.readHTML()

// Veraltet
clipboard.writeHtml()
// Ersetze mit
clipboard.writeHTML()
```

### `crashReporter`

```js
// Veraltet
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Ersetze mit
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Veraltet
nativeImage.createFromBuffer(buffer, 1.0)
// Ersetze mit
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Veraltet
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Veraltet
screen.getMenuBarHeight()
// Ersetze mit
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

### `Fach`

```js
// Veraltet
tray.setHighlightMode(true)
// Ersetze mit
tray.setHighlightMode('on')

// Veraltet
tray.setHighlightMode(false)
// Ersetze mit
tray.setHighlightMode('off')
```

### `webContents`

```js
// Veraltet
webContents.openDevTools({ detach: true })
// Ersetze mit
webContents.openDevTools({ mode: 'detach' })

// Entfernt
webContents.setSize(options)
// Für diese API gibt es keinen Ersatz
```

### `webFrame`

```js
// Veraltet
webFrame.registerURLSchemeAsSecure('app')
// Ersetze mit
protocol.registerStandardSchemes(['app'], { secure: true })

// Veraltet
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Ersetze mit
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Entfernt
webview.setAttribute('disableguestresize', '')
// Für diese API gibt es keinen Ersatz

// Entfernt
webview.setAttribute('guestinstance', instanceId)
// Für diese API gibt es keinen Ersatz

// Keyboard listener funktionieren nicht länger für webview tag
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
// Veraltet
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Ersetzen durch
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Entfernt
menu.popup(browserWindow, 100, 200, 2)
// Ersetze mit
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Entfernt
nativeImage.toPng()
// Ersetze mit
nativeImage.toPNG()

// Entfernt
nativeImage.toJpeg()
// Ersetze mit
nativeImage.toJPEG()
```

### `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

### `webContents`

```js
// Entfernt
webContents.setZoomLevelLimits(1, 2)
// Ersetze mit
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Entfernt
webFrame.setZoomLevelLimits(1, 2)
// Ersetze mit
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Entfernt
webview.setZoomLevelLimits(1, 2)
// Ersetze mit
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

Die Datei _ohne das Präfix_ wird immer noch veröffentlicht, um zu vermeiden, dass Setups, die sie verbrauchen könnten, unterbrochen werden. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
