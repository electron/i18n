# Breaking Changes

Breaking-Änderungen werden hier dokumentiert, und Veraltungswarnungen werden js-Code nach Möglichkeit hinzugefügt, mindestens [eine Hauptversion](tutorial/electron-versioning.md#semver) , bevor die Änderung vorgenommen wird.

### Typen von Bruchänderungen

Dieses Dokument verwendet die folgende Konvention um die Änderungen zu kategorisieren:

* **API geändert:** Eine API wurde so geändert, dass Code, der nicht aktualisiert wurde, garantiert eine Ausnahme wirft.
* **Verhalten geändert:** Das Verhalten von Electron hat sich geändert, aber nicht so, dass eine Ausnahme unbedingt geworfen wird.
* **Standard geändert:** Code abhängig von der alten Standardeinstellung kann kaputt gehen und wirft nicht notwendigerweise eine Ausnahme. Das alte Verhalten kann durch explizite Angabe des Wertes wiederhergestellt werden.
* **Veraltet:** Eine API wurde als veraltet markiert. Die API wird weiterhin funktionieren, sendet aber eine Deprecation-Warnung aus und wird in einer zukünftigen Version entfernt.
* **Entfernt:** Eine API oder Funktion wurde entfernt und wird von Electron nicht mehr unterstützt.

## Geplante Brechende API-Änderungen (14.0)

### API geändert: `window.(open)`

Der optionale Parameter `frameName` setzt den Titel des Fensters nicht mehr. Dies folgt nun der Spezifikation, die von der [nativen Dokumentation beschrieben wird, die unter dem entsprechenden Parameter `windowName`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) .

Wenn Sie diesen Parameter zum Festlegen des Titels eines Fensters verwendet haben, können Sie stattdessen [win.setTitle(title)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle)verwenden.

### Entfernt: `worldSafeExecuteJavaScript`

In Elektron 14 werden `worldSafeExecuteJavaScript` entfernt.  Es gibt keine Alternative, bitte stellen Sie sicher, dass Ihr Code mit dieser Eigenschaft aktiviert funktioniert.  Es wurde standardmäßig aktiviert, da Electron
12.

Sie sind von dieser Änderung betroffen, wenn Sie entweder `webFrame.executeJavaScript` oder `webFrame.executeJavaScriptInIsolatedWorld`verwenden. Sie müssen sicherstellen, dass Werte, die von einer dieser Methoden zurückgegeben werden, von der [Context Bridge-API unterstützt werden](api/context-bridge.md#parameter--error--return-type-support) da diese Methoden dieselbe Wertübergabesemantik verwenden.

## Geplante Bruch-API-Änderungen (13.0)

### API geändert: `session.setPermissionCheckHandler(handler)`

Der `handler` Methoden erster Parameter war früher immer ein `webContents`, kann es jetzt manchmal `null`sein.  Sie sollten die Eigenschaften `requestingOrigin`, `embeddingOrigin` und `securityOrigin` verwenden, um korrekt auf die Berechtigungsprüfung zu reagieren.  Da die `webContents` `null` können, kann man sich nicht mehr darauf verlassen.

```js
Alter Code
session.setPermissionCheckHandler((webContents, permission) =>
  if (webContents.getURL().startsWith('https://google.com/') && berechtigung === 'Benachrichtigung') {
    return true
  }
  false
')

/ / Ersetzen sie mit
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) =
{
    return true
  }
  && google.com
  >
```

### Entfernt: `shell.moveItemToTrash()`

Die veraltete synchrone `shell.moveItemToTrash()` API wurde entfernt. Verwende stattdessen die asynchrone `shell.trashItem()`.

```js
In Electron 13
shell.moveItemToTrash(path)
/ / Ersetzen durch
shell.trashItem(path).then(/* ... */)
```

### Entfernt: `BrowserWindow` Erweiterungs-APIs

Die veralteten Erweiterungs-APIs wurden entfernt:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Verwenden Sie stattdessen die Sitzungs-APIs:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
In Electron 13
BrowserWindow.addExtension(path) entfernt
BrowserWindow.addDevToolsExtension(path)
/ / Ersetzen durch
session.defaultSession.loadExtension(path)
```

```js
Entfernt in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
/ / Ersetzen durch
session.defaultSession.removeExtension(extension_id)
```

```js
In Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
/ / Ersetzen mit
session.defaultSession.getAllExtensions()
```

### Entfernt: Methoden in `systemPreferences`

Die folgenden `systemPreferences` Methoden sind veraltet:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Verwenden Sie stattdessen die folgenden `nativeTheme` Eigenschaften:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Entfernt in Electron 13
systemPreferences.isDarkMode()
/ / Ersetzen mit
nativeTheme.shouldUseDarkColors

/ / Entfernt in Electron 13
systemPreferences.isInvertedColorScheme()
/ / Ersetzen mit
nativeTheme.shouldUseInvertedColorScheme




/
```

## Geplante Brechende API-Änderungen (12.0)

### Entfernt: Pepper Flash Unterstützung

Chromium hat die Unterstützung für Flash gestrichen, und deshalb müssen wir diesem Beispiel folgen. Siehe Chromium's [Flash-Roadmap](https://www.chromium.org/flash-roadmap) für weitere Details.

### Standard geändert: `worldSafeExecuteJavaScript` standardmäßig auf `true`

In Electron 12 werden `worldSafeExecuteJavaScript` standardmäßig aktiviert.  Um das vorherige Verhalten wiederherzustellen, müssen `worldSafeExecuteJavaScript: false` in WebPreferences angegeben werden. Bitte beachten Sie, dass das Festlegen dieser Option auf `false` **unsicherist**ist.

Diese Option wird in Electron 14 entfernt, also migrieren Sie bitte Ihren Code, um den standardmäßigen -Wert zu unterstützen.

### Standard geändert: `Kontext-Isolation` standardmäßig `true`

In Electron 12, `Kontext-Isolation` wird standardmäßig aktiviert.  Um das vorherige Verhalten wiederherzustellen, muss `contextIsolation: false` in WebPreferences angegeben werden.

Wir [empfehlen, Kontext-Isolation](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) für die Sicherheit Ihrer Anwendung zu aktivieren.

Eine weitere Auswirkung ist, dass `require()` im Rendererprozess nur verwendet werden kann, wenn `nodeIntegration` `true` ist und `contextIsolation` `false`ist.

Für weitere Details siehe https://github.com/electron/electron/issues/23506

### Entfernt: `crashReporter.getCrashesDirectory()`

Die `crashReporter.getCrashesDirectory` Methode wurde entfernt. Die Verwendung sollte durch `app.getPath('crashDumps')`ersetzt werden.

```js
Entfernt in Electron 12
crashReporter.getCrashesDirectory()
/ / Ersetzen durch
app.getPath('crashDumps')
```

### Entfernt: `crashReporter` Methoden im Rendererprozess

Die folgenden `crashReporter` Methoden sind im Renderer- -Prozess nicht mehr verfügbar:

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Sie sollten nur aus dem Hauptprozess aufgerufen werden.

Weitere Informationen finden Sie in [#23265](https://github.com/electron/electron/pull/23265) .

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
Veraltet in Electron 12
shell.moveItemToTrash(path)
/ / Ersetzen durch
shell.trashItem(path).then(/* ... */)
```

## Geplante Brechende API-Änderungen (11.0)

### Entfernt: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` und `id` Eigentum von `BrowserView`

Die experimentellen APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` wurden nun entfernt. Darüber hinaus wurde auch die `id` Eigenschaft von `BrowserView` entfernt.

Ausführlichere Informationen finden Sie unter [#23578](https://github.com/electron/electron/pull/23578).

## Geplante API-Änderungen (10.0)

### Veraltet: `companyName` Argument, um `crashReporter.start()`

Das `companyName` Argument für `crashReporter.start()`, das zuvor erforderlich war, ist jetzt optional und darüber hinaus veraltet. Um das gleiche Verhalten auf nicht veraltete Weise zu erhalten, können Sie einen `companyName` Wert in `globalExtra`übergeben.

```js
Veraltet in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
/ / Ersetzen Sie durch
crashReporter.start(' globalExtra: { _companyName: 'Umbrella Corporation' } )
```

### Veraltet: `crashReporter.getCrashesDirectory()`

Die `crashReporter.getCrashesDirectory` Methode ist veraltet. Die Verwendung sollte durch `app.getPath('crashDumps')`ersetzt werden.

```js
Veraltet in Electron 10
crashReporter.getCrashesDirectory()
/ / Ersetzen durch
app.getPath('crashDumps')
```

### Veraltet: `crashReporter` Methoden im Rendererprozess

Das Aufrufen der folgenden `crashReporter` Methoden aus dem Rendererprozess ist veraltet:

* `crashReporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Die einzigen nicht veralteten Methoden, die im `crashReporter` -Modul im -Renderer verbleiben, sind `addExtraParameter`, `removeExtraParameter` und `getParameters`.

Alle oben genannten Methoden bleiben nicht veraltet, wenn sie aus dem Hauptprozess aufgerufen werden.

Weitere Informationen finden Sie in [#23265](https://github.com/electron/electron/pull/23265) .

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
Veraltete
protocol.unregisterProtocol(scheme, () => s /* * */ )
/ Ersetzen durch
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
Veraltete
protocol.registerFileProtocol(scheme, handler, () => '/* ... */ '
/ Ersetzen durch
protocol.registerFileProtocol(scheme, handler)
```

Das registrierte oder abgefangene Protokoll hat keine Auswirkungen auf die aktuelle Seite, bis eine Navigation stattfindet.

### `protocol.isProtocolHandled`

Diese Schnittstelle ist veraltet anstatt dessen sollten Benutzer `protocol.isProtocolRegistered` und `protocol.isProtocolIntercepted` nutzen.

```javascript
Veraltete
protocol.isProtocolHandled(scheme).then()=> s /* ... */ )
/ Ersetzen durch
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Geplante API-Änderungen (9.0)

### Standard geändert: Das Laden von nicht-kontextabhängigen nativen Modulen im Renderer-Prozess ist standardmäßig deaktiviert

Ab Electron 9 erlauben wir das Laden von nicht kontextabhängigen nativen Modulen im Prozess nicht.  Dies ist zur Verbesserung der Sicherheit, Leistung und Wartbarkeit von Electron als Projekt.

Wenn dies Sie betrifft, können Sie vorübergehend `app.allowRendererProcessReuse` auf `false` setzen, um zum alten Verhalten zurückzukehren.  Dieses Flag wird nur eine Option bis Electron 11 sein, so dass Sie planen sollten Ihre nativen Module zu aktualisieren, um den Kontext zu erkennen.

Nähere Informationen finden Sie unter [#18397](https://github.com/electron/electron/issues/18397).

### Veraltet: `BrowserWindow` Erweiterungs-APIs

Die folgenden Erweiterungs-APIs sind veraltet:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Verwenden Sie stattdessen die Sitzungs-APIs:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
Veraltet in Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
/ / Ersetzen durch
session.defaultSession.loadExtension(path)
```

```js
Veraltet in Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
/ / Ersetzen durch
session.defaultSession.removeExtension(extension_id)
```

```js
Veraltet in Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
/ / Ersetzen durch
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

Chrom hat die Unterstützung für die Änderung der Layout-Zoom-Level-Limits entfernt, und es nicht in der Lage ist, es beizubehalten. Die Funktion war in Electron 8.x veraltet und wurde in Electron 9.x entfernt. Die Layout-Zoom-Stufen-Limits sind nun auf mindestens 0,25 und maximal 5,0 festgelegt, wie hier [](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11)definiert.

### Verhalten geändert: Das Senden von Nicht-JS-Objekten über IPC wirft jetzt eine Ausnahme

In Electron 8.0 wurde IPC geändert, um den strukturierten Clone Algorithmus zu verwenden, der erhebliche Leistungsverbesserungen bringt. Um den Übergang zu erleichtern, wurde der alte IPC-Serialisierungsalgorithmus beibehalten und für einige Objekte verwendet, die nicht serialisierbar mit strukturiertem Klon sind. Insbesondere DOM-Objekte (z.B. `Element`, `Location` und `DOMMatrix`), Node.js-Objekte, die von C++-Klassen (z. B. `process.env`, einige Member von `Stream`) und Electron-Objekten, die von C++- -Klassen (z. B. `WebContents`, `BrowserWindow` und `WebFrame`) sind mit Structured Clone nicht serialisierbar. Wann immer der alte Algorithmus aufgerufen wurde, wurde eine -Veraltungswarnung ausgegeben.

In Electron 9. , der alte Serialisierungsalgorithmus wurde entfernt, und das Senden von solcher nicht serialisierbarer Objekte wird nun ein "Objekt konnte nicht geklont werden" Fehler werfen.

### API geändert: `shell.openItem` ist jetzt `shell.openPath`

Die `shell.openItem` API wurde durch eine asynchrone `shell.openPath` API ersetzt. Sie können den ursprünglichen API-Vorschlag und die Argumentation [hier sehen](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Geplante Brechende API-Änderungen (8.0)

### Verhalten geändert: Über IPC gesendete Werte werden nun serialisiert mit dem strukturierten Clone Algorithmus

Der Algorithmus, der zum Serialisieren von Objekten verwendet wird, die über IPC gesendet werden (über `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` und verwandte Methoden) wurde von einem benutzerdefinierten Algorithmus auf den integrierten [Structured Clone Algorithm][SCA]von V8 umgestellt, dem gleichen Algorithmus, der zum Serialisieren von Nachrichten für `postMessage`verwendet wird. Dies führt zu einer 2-fachen Leistungsverbesserung für große Nachrichten, bringt aber auch einige brechende Verhaltensänderungen mit sich.

* Beim Senden von Funktionen, Versprechen, WeakMaps, WeakSets oder Objekten, die solchen Werten enthalten, wird nun eine Ausnahme ausgelöst, anstatt die Funktionen im Hintergrund in `undefined`zu konvertieren.

```js
Zuvor:
ipcRenderer.send('channel', - Wert: 3, someFunction: () => )
/ => führt dazu, dass { value: 3 } im Hauptprozess ankommen

/ Von Electron 8:
ipcRenderer.send('channel', é value: 3, someFunction: () => '> > 
.
```

* `NaN`werden `Infinity` und `-Infinity` nun korrekt serialisiert, anstatt in `null`konvertiert zu werden.
* Objekte, die zyklische Referenzen enthalten, werden nun korrekt serialisiert, anstatt in `null`konvertiert zu werden.
* `Set`, `Map`, `Error` - und `RegExp` werte werden korrekt serialisiert, statt in `{}`konvertiert zu werden.
* `BigInt` Werte werden korrekt serialisiert, anstatt in `null`konvertiert zu werden.
* Sparse-Arrays werden als solche serialisiert, anstatt in dichte Arrays mit `null`s konvertiert zu werden.
* `Date` Objekte werden als `Date` Objekte übertragen, anstatt in ihre ISO-Zeichenfolgendarstellung konvertiert zu werden.
* Typisierte Arrays (z. B. `Uint8Array`, `Uint16Array`, `Uint32Array` usw.) werden als solche übertragen, anstatt in Node.js `Buffer`konvertiert zu werden.
* Knoten.js `Buffer` Objekte werden als `Uint8Array`s übertragen. Sie können einen `Uint8Array` zurück in einen Knoten konvertieren.js `Buffer` indem Sie die zugrunde liegenden `ArrayBuffer`umschließen:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Senden von Objekten, die keine systemeigenen JS-Typen sind, z. B. DOM-Objekte (z. B. `Element`, `Location`, `DOMMatrix`), Node.js-Objekte (z. B. `process.env`, `Stream`) oder Electron-Objekte (z. B. `WebContents`, `BrowserWindow`, `WebFrame`) ist veraltet. In Electron 8 werden diese Objekte zuvor mit einer DeprecationWarning-Meldung als serialisiert, aber ab Elektron 9 wird das Senden diese Art von Objekten einen Fehler "könnte nicht geklont werden" auslösen.

### Veraltet: `<webview>.getWebContents()`

Diese API wird mithilfe des `remote` -Moduls implementiert, das sowohl Auswirkungen auf die Leistung als auch auf die Sicherheit hat. Daher sollte seine Verwendung explizit sein.

```js
Veraltete
webview.getWebContents()
/ / Ersetzen mit
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

Es wird jedoch empfohlen, die Verwendung des `remote` Moduls ganz zu vermeiden.

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

Chrom hat die Unterstützung für die Änderung der Layout-Zoom-Level-Limits entfernt, und es nicht in der Lage ist, es beizubehalten. Die Funktion gibt eine Warnung aus, die in in Electron 8.x ist, und hört in Electron 9.x auf zu existieren. Die Layout-Zoomstufe -Grenzwerte werden nun auf mindestens 0,25 und maximal 5,0 festgelegt, wie hier [definiert](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Veraltete Ereignisse in `systemPreferences`

Die folgenden `systemPreferences` Ereignisse wurden veraltet:

* `invertiert-farbschema-geändert`
* `kontrastreich-farblich-schema-verändert`

Verwenden Sie stattdessen das neue `updated` -Ereignis auf dem `nativeTheme` -Modul.

```js
Veraltet
systemPreferences.on('inverted-color-scheme-changed', () => '/* ... */ ')
systemPreferences.on('high-contrast-color-scheme-changed', () => '/* ... */> 


'
```

### Veraltet: Methoden in `systemPreferences`

Die folgenden `systemPreferences` Methoden sind veraltet:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Verwenden Sie stattdessen die folgenden `nativeTheme` Eigenschaften:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Veraltet
systemPreferences.isDarkMode()
/ / Ersetzen durch
nativeTheme.shouldUseDarkColors

/ / Deprecated
systemPreferences.isInvertedColorScheme()
/ / Ersetzen mit
nativeTheme.shouldUseInvertedColorScheme




/
```

## Geplante Brechende API-Änderungen (7.0)

### Veraltet: Atom.io Knoten-Header-URL

Dies ist die URL, die beim Erstellen systemeigener Knotenmodule als `disturl` in einer `.npmrc` Datei oder als `--dist-url` Befehlszeilenflag angegeben ist.  Beide werden in absehbarer Zeit unterstützt, es wird jedoch empfohlen, zu wechseln.

Veraltet: https://atom.io/download/electron

Ersetzen durch: https://electronjs.org/headers

### API geändert: `session.clearAuthCache()` akzeptiert keine Optionen mehr

Die `session.clearAuthCache` -API akzeptiert keine Optionen mehr, was gelöscht werden soll, und löscht stattdessen bedingungslos den gesamten Cache.

```js
Veraltete
session.clearAuthCache({ type: 'password' })
/ / Ersetzen durch
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
In Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
/ / Ersetzen mit
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Entfernt: `markiert` Eigenschaft auf `getBlinkMemoryInfo`

Diese Eigenschaft wurde in Chromium 77 entfernt und ist daher nicht mehr verfügbar.

### Verhalten geändert: `webkitdirectory` Attribut für `<input type="file"/>` listet nun Verzeichnisinhalte auf

Die Eigenschaft `webkitdirectory` bei HTML-Datei-Eingaben erlaubt es ihnen, Ordner auszuwählen. Frühere Versionen von Electron hatten eine falsche Implementierung, bei der die `event.target.files` der Eingabe eine `FileList` zurückgegeben hat, die eine `File` zurückgegeben hat, die dem ausgewählten Ordner entspricht.

Ab Electron 7 ist `Dateiliste` jetzt eine Liste aller Dateien im Ordner ähnlich wie Chrome, Firefox und Edge ([Link zur MDN Dokumentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Nehmen Sie als Illustration einen Ordner mit dieser Struktur:

```console
Ordner
Datei1
Datei2
Datei3
```

In Electron <=6 würde dies eine `Dateiliste` mit einem `Datei` Objekt für:

```console
Pfad/zu/Ordner
```

In Electron 7 liefert dies nun eine `Dateiliste` mit einem `Datei-` Objekt für:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Beachten Sie, dass `webkitdirectory` den Pfad nicht mehr dem ausgewählten Ordner anzeigt. Wenn Sie den Pfad zum ausgewählten Ordner anstelle des Ordnerinhalts benötigen, die `dialog.showOpenDialog` -API ([Link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)) anzeigen.

### API geändert: Rückruf-basierte Versionen von promisifizierten APIs

Electron 5 und Electron 6 führten Promise-basierte Versionen vorhandener asynchronen APIs ein und verstellten ihre älteren, Callback-basierten Gegenstücke. In Electron 7 werden nun alle veralteten Callback-basierten APIs entfernt.

Diese Funktionen geben jetzt nur noch Versprechen zurück:

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

Diese Funktionen haben nun zwei Formen, synchron und promise-basiert asynchron:

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

## Geplante Brechende API-Änderungen (6.0)

### API geändert: `win.setMenu(null)` ist jetzt `win.removeMenu()`

```js
Veraltete
win.setMenu(null)
/ / Ersetzen durch
win.removeMenu()
```

### API geändert: `electron.screen` im Renderer-Prozess sollte über `Remote` aufgerufen werden

```js
Veraltete
erfordern ('Elektron').Screen
/ / Ersetzen mit
require('electron').
```

### API geändert: `require()`eingebaute Knoten in Sandbox-Renderer laden nicht mehr implizit die `entfernte` Version

```js
Veraltete
require('child_process')
/ / Ersetzen mit
require('electron').remote.require('child_process')

/ / Deprecated
require('fs')
/ / Ersetzen mit
require('electron').remote.require('fs')

/ Veraltete
require('os')
/ / Ersetzen mit
require('electron').remote.require('os')

/ / Deprecated
require('path')
/ / Ersetzen mit
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
Veraltete
app.enableMixedSandbox()
```

Der Mixed-Sandbox-Modus ist jetzt standardmäßig aktiviert.

### Veraltet: `Tray.setHighlightMode`

Unter macOS Catalina bricht unsere frühere Tray-Implementierung. Apples nativer Ersatz unterstützt keine Änderung des Hervorhebungsverhaltens.

```js
Veraltete
tray.setHighlightMode(mode)
/ API werden in v7.0 ohne Ersatz entfernt.
```

## Geplante Brechende API-Änderungen (5.0)

### Standard geändert: `nodeIntegration` und `webviewTag` default to false, `contextIsolation` defaults to true

Die folgenden `webPreferences` Optionsstandardwerte sind zugunsten der unten aufgeführten neuen Standardwerte veraltet.

| Eigenschaft        | Veraltete Standardeinstellung        | Neuer Standardwert |
| ------------------ | ------------------------------------ | ------------------ |
| `contextIsolation` | `false`                              | `true`             |
| `nodeIntegration`  | `true`                               | `false`            |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`            |

z.B. Erneute Aktivierung des webviewTags

```js
const w = neues BrowserWindow(-
  webPreferences: {
    webviewTag: true
  }
)
```

### Verhalten geändert: `Knoten-Integration` in untergeordneten Fenstern, geöffnet über `nativeWindowOpen`

Kindfenster, die mit der Option `nativeWindowOpen` geöffnet wurden, werden die Node.js Integration immer deaktiviert, es sei denn, `nodeIntegrationInSubFrames` ist `true`.

### API geändert: Das Registrieren von privilegierten Schemas muss jetzt erledigt werden, bevor die App fertig ist

Renderer Prozess-APIs `webFrame.registerURLSchemeAsPrivileged` und `webFrame.registerURLSchemeAsBypassingCSP` sowie Browser-Prozess-API `protocol.registerStandardSchemes` wurden entfernt. Eine neue API, `protocol.registerSchemesAsPrivileged` wurde hinzugefügt und sollte zum Registrieren benutzerdefinierter Schemas mit den erforderlichen Berechtigungen verwendet werden. Benutzerdefinierte Schemata müssen registriert werden, bevor die App bereit ist.

### Veraltet: `webFrame.setIsolatedWorld*` ersetzt durch `webFrame.setIsolatedWorldInfo`

```js
Veraltet
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
/ / Ersetzen durch
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### API geändert: `webFrame.setSpellCheckProvider` nimmt jetzt einen asynchronen Callback ein

Der `spellCheck` Rückruf ist jetzt asynchron, und `autoCorrectWord` Parameter wurde entfernt.

```js
Veraltete
webFrame.setSpellCheckProvider('en-US', true,
  spellCheck: (text) =>
    rückgabe !spellchecker.isMisspelled(text)
  .
)
/ Ersetzen mit
webFrame.setSpellCheckProvider('en-US', '
  spellCheck: (words, callback) => '
    callback(words.filter(text=> spellchecker.

  is
```

### API geändert: `webContents.getZoomLevel` und `webContents.getZoomFactor` sind jetzt synchron

`webContents.getZoomLevel` und `webContents.getZoomFactor` keine Rückrufparameter mehr, sondern direkt ihre Nummernwerte zurückgeben.

```js
Veraltete
webContents.getZoomLevel((level) =>
  konsole.log(ebene)
)
/ Ersetzen mit
const-Ebene = webContents.getZoomLevel()
console.log(level)
```

```js
Veraltet
webContents.getZoomFactor((factor) =>
  konsole.log(Faktor)
)
/ Ersetzen mit
const-Faktor = webContents.getZoomFactor()
konsole.log(Faktor)
```

## Geplante Brechende API-Änderungen (4.0)

Die folgende Liste enthält die brechenden API-Änderungen, die in Electron 4.0 vorgenommen wurden.

### `app.makeSingleInstance`

```js
Veraltete
app.makeSingleInstance((argv, cwd) =>
  /* ... */
)
/ Ersetzen mit
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => '
  /* ... */
))
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

Beim Erstellen systemeigener Module für Fenster muss die `win_delay_load_hook` -Variable in `binding.gyp` des Moduls true sein (standardeinstellung). Wenn dieser Hook nicht vorhanden ist, kann das systemeigene Modul nicht auf Windows geladen werden, mit einer Fehlermeldung Meldung wie `Cannot find module`. Weitere Informationen finden Sie im [systemeigenen Modul ](/docs/tutorial/using-native-node-modules.md) .

## Brechen von API-Änderungen (3.0)

Die folgende Liste enthält die brechenden API-Änderungen in Electron 3.0.

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
Veraltete
ses.setCertificateVerifyProc((hostname, certificate, callback) =>
  callback(true)
)
/ / Ersetzen mit
ses.setCertificateVerifyProc((request, callback) =>
  callback(0)
)
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

Dies ist die URL, die beim Erstellen systemeigener Knotenmodule als `disturl` in einer `.npmrc` Datei oder als `--dist-url` Befehlszeilenflag angegeben ist.

Veraltet: https://atom.io/download/atom-shell

Ersetzen durch: https://atom.io/download/electron

## Brechen von API-Änderungen (2.0)

Die folgende Liste enthält die brechenden API-Änderungen, die in Electron 2.0 vorgenommen wurden.

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

* `process.versions.electron` und `process.version.chrome` werden schreibgeschützten Eigenschaften aus Konsistenz mit den anderen `process.versions` Eigenschaften, die von Node festgelegt werden, vorgenommen.

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

### Duplizieren von ARM-Assets

Jede Electron-Version enthält zwei identische ARM-Builds mit leicht unterschiedlichen Dateinamen, wie `electron-v1.7.3-linux-arm.zip` und `electron-v1.7.3-linux-armv7l.zip`. Das Asset mit dem Präfix `v7l` wurde hinzugefügt, um den Benutzern zu klären, welche ARM-Version es unterstützt, und um es von zukünftigen armv6l- und arm64-Assets zu veruntreuen, die produziert werden können.

Die Datei _ohne das Präfix_ wird immer noch veröffentlicht, um zu vermeiden, dass Setups, die sie verbrauchen könnten, unterbrochen werden. Ab 2.0 wird die unvoreingestellte Datei nicht mehr veröffentlicht.

Einzelheiten sind [6986](https://github.com/electron/electron/pull/6986) und [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
