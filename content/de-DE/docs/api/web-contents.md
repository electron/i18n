# webContents

> Rendert und steuert web pages.

Prozess: [Main](../glossary.md#main-process)

`webContents` ist ein [EventEmitter][event-emitter]. Ist zuständig für das rendering und die Steuerung einer web page und ist eine Property des [`BrowserWindow`](browser-window.md) Objekts. Ein Beispiel für die Verwendung des `webContents` Objekts:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

const contents = win.webContents
console.log(contents)
```

## Methoden

Diese diese Methoden des `webContents` Modul hast du zugriff:

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

Gibt `WebContents[]` zurück - Ein array aller `WebContents` Instanzen. Dies enthält Webinhalte für alle Fenster, Webviews, geöffneten devtools und devtools-Erweiterungshintergrundseiten.

### `webContents.getFocusedWebContents()`

Gibt `WebContents` zurück - Der Webinhalt, der in dieser Anwendung fokussiert ist, andernfalls gibt `null`zurück.

### `webContents.fromId(id)`

* `id` Integer

Rücksendungen `WebContents` | undefined - Eine WebContents-Instanz mit der angegebenen ID oder `undefined` , wenn der angegebenen ID kein WebContents zugeordnet ist.

## Class: WebContents

> Rendert und steuert den Inhalt einer BrowserWindow Instanze.

Prozess: [Main](../glossary.md#main-process)

### Instanz Events

#### Event: 'did-finish-load'

Emittiert wenn die Navigation abgeschlossen ist, daher, wenn der Spinner des Tab fertig ist und das `onload` Event gesendet wurde.

#### Event: 'did-fail-load'

Rückgabewert:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Dieses Ereignis ist wie `did-finish-load` , aber emittiert, wenn die Last fehlgeschlagen ist. Die vollständige Liste der Fehlercodes und ihre Bedeutung finden Sie [hier](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h).

#### Veranstaltung: 'did-fail-provisional-load'

Rückgabewert:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Dieses Ereignis ist wie `did-fail-load` , aber emittiert, wenn die Last abgebrochen wurde (z. B. `window.stop()` wurde aufgerufen).

#### Event: 'did-frame-finish-load'

Rückgabewert:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert, wenn ein Frame die Navigation durchgeführt hat.

#### Event: 'did-start-loading'

Entspricht den Zeitpunkten, zu denen der Spinner der Registerkarte zu drehen begann.

#### Event: 'did-stop-loading'

Entspricht den Zeitpunkten, an denen der Spinner der Registerkarte aufgehört hat zu drehen.

#### Event: 'dom-ready'

Rückgabewert:

* `event` Event

Emittiert, wenn das Dokument im angegebenen Frame geladen wird.

#### Event: 'page-title-updated'

Rückgabewert:

* `event` Event
* `title` String
* `explicitSet` Boolean

Wird ausgelöst, wenn der Seitentitel während der Navigation festgelegt wird. `explicitSet` ist falsch, wenn Titel aus der Datei-URL synthetisiert wird.

#### Event: 'page-favicon-updated'

Rückgabewert:

* `event` Event
* `favicons` String[] - Array mit URLs.

Emittiert, wenn die Seite favicon-URLs empfängt.

#### Ereignis: 'new-window' _veraltete_

Rückgabewert:

* `event` NewWindowWebContentsEvent
* `url` String
* `frameName` String
* `disposition` String - Kann `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` und `other`sein.
* `options` BrowserWindowConstructorOptions - Die Optionen, die zum Erstellen der neuen [`BrowserWindow`](browser-window.md)verwendet werden.
* `additionalFeatures` String[] - Die nicht standardmäßigen Features (Features, die nicht von Chromium oder Electron behandelt werden) `window.open()`.
* `referrer` [Referrer](structures/referrer.md) - Der Referrer, der an das neue Fenster übergeben wird. Kann dazu führen, dass der `Referer` -Header gesendet wird, je nach Referrer-Richtlinie.
* `postBody` [PostBody](structures/post-body.md) (optional) - Die Postdaten, die , werden zusammen mit den entsprechenden Headern, die festgelegt werden, an das neue Fenster gesendet. Wenn keine Postdaten gesendet werden sollen, wird der Wert `null`. Nur definiert wenn das Fenster von einem Formular erstellt wird, das `target=_blank`festgelegt hat.

Veraltet zugunsten [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler).

Emittiert, wenn die Seite anfordert, ein neues Fenster für eine `url`zu öffnen. Es könnte von `window.open` oder einem externen Link wie `<a target='_blank'>`angefordert werden.

Standardmäßig wird ein neues `BrowserWindow` für die `url`erstellt.

Wenn `event.preventDefault()` aufgerufen wird, verhindert das Aufrufen von Electron, dass es automatisch einen neuen [`BrowserWindow`](browser-window.md)erstellt. Wenn Sie `event.preventDefault()` aufrufen und manuell eine neue [`BrowserWindow`](browser-window.md) erstellen, müssen Sie `event.newGuest` festlegen, um auf die neue [`BrowserWindow`](browser-window.md) Instanz zu verweisen, andernfalls kann dies zu unerwartetem Verhalten führen. Ein Beispiel:

```javascript
myBrowserWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => '
  event.preventDefault()
  const win = new BrowserWindow('
    webContents: options.webContents, / / verwenden Sie vorhandene webContents, wenn
    zeigen: false
  
  () => win.show())
  wenn (!options.webContents) -
    const loadOptions = {
      httpReferrer: referrer
    }
    wenn (postBody != null)
      const { data, contentType, boundary } = postBody
      loadOptions.postData = postBody.data
      loadOptions.extraHeaders = 'content-type: ${contentType}; boundary=${boundary}'
    '

    win.loadURL(url, loadOptions

  
  )
```

#### Ereignis: 'did-create-window'

Rückgabewert:
* `window` BrowserWindow
* `details` -Objekt
    * `url` String - URL für das erstellte Fenster.
    * `frameName` String - Name, der dem erstellten Fenster im `window.open()` -Aufruf angegeben wurde.
    * `options` BrowserWindowConstructorOptions - Die Optionen, die zum Erstellen des BrowserWindow verwendet werden. Sie werden in zunehmender Priorität zusammengeführt: Optionen, die vom übergeordneten Element geerbt wurden, analysierte Optionen aus der `features` Zeichenfolge aus `window.open()`und Optionen, die von [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)angegeben werden. Nicht erkannte Optionen werden nicht herausgefiltert.
    * `additionalFeatures` String[] - Die nicht standardmäßigen Merkmale (Features, die nicht mit Chrom oder Electron behandelt werden) _veraltete_
    * `referrer` [Referrer](structures/referrer.md) - Der Referrer, der an das neue Fenster übergeben wird. Kann dazu führen, dass die `Referer` -Header- gesendet werden, abhängig von der Referrer-Richtlinie.
    * `postBody` [PostBody](structures/post-body.md) (optional) - Die Postdaten , die zusammen mit den entsprechenden Headern an das neue Fenster gesendet werden, , die festgelegt werden. Wenn keine Postdaten gesendet werden sollen, wird der Wert `null`. Nur definiert, wenn das Fenster von einem Formular erstellt wird, das `target=_blank`festgelegt hat.
    * `disposition` String - Kann `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` und `other`sein.

Emittted _nach_ erfolgreichen Erstellung eines Fensters über `window.open` im Renderer. Nicht emittiert, wenn die Erstellung des Fensters von [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)abgebrochen wird.

Weitere Informationen und die Verwendung in Verbindung mit `webContents.setWindowOpenHandler`finden Sie in [`window.open()`](window-open.md) .

#### Event: 'will-navigate'

Rückgabewert:

* `event` Event
* `url` String

Wird angezeigt, wenn ein Benutzer oder die Seite die Navigation starten möchte. Dies kann vorkommen, wenn das `window.location` Objekt geändert wird oder ein Benutzer auf einen Link auf der Seite klickt.

Dieses Ereignis wird nicht ausgesendet, wenn die Navigation programmgesteuert mit APIs wie `webContents.loadURL` und `webContents.back`gestartet wird.

Es wird auch nicht für In-Page-Navigationen emittiert, z. B. durch Klicken auf Ankerlinks oder aktualisieren sie die `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

Wenn `event.preventDefault()` aufruft, wird die Navigation verhindert.

#### Event: 'did-start-navigation'

Rückgabewert:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert, wenn ein Frame (einschließlich Hauptbild) mit der Navigation beginnt. `isInPlace` werden für In-Page-Navigationen `true` .

#### Event: 'will-redirect'

Rückgabewert:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert als serverseitige Umleitung tritt während der Navigation auf.  Zum Beispiel eine 302 Umleitung.

Dieses Ereignis wird nach `did-start-navigation` und immer vor dem `did-redirect-navigation` -Ereignis für dieselbe Navigation angezeigt.

Wenn Sie `event.preventDefault()` aufrufen, wird die Navigation verhindert (nicht nur die Umleitung).

#### Event: 'did-redirect-navigation'

Rückgabewert:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert, nachdem während der Navigation eine serverseitige Umleitung erfolgt.  Zum Beispiel eine 302 Umleitung.

Dieses Ereignis kann nicht verhindert werden, wenn Sie Umleitungen verhindern möchten, sollten Sie auschecken die `will-redirect` Ereignis oben.

#### Event: 'did-navigate'

Rückgabewert:

* `event` Event
* `url` String
* `httpResponseCode` Ganzzahl - -1 für Nicht-HTTP-Navigationen
* `httpStatusText` String - leer für Nicht-HTTP-Navigationen

Emittiert, wenn eine Hauptframenavigation durchgeführt wird.

Dieses Ereignis wird nicht für In-Page-Navigationen angezeigt, z. B. durch Klicken auf Ankerlinks oder Aktualisieren der `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

#### Event: 'did-frame-navigate'

Rückgabewert:

* `event` Event
* `url` String
* `httpResponseCode` Ganzzahl - -1 für Nicht-HTTP-Navigationen
* `httpStatusText` String - leer für Nicht-HTTP-Navigationen,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert, wenn eine Framenavigation durchgeführt wird.

Dieses Ereignis wird nicht für In-Page-Navigationen angezeigt, z. B. durch Klicken auf Ankerlinks oder Aktualisieren der `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

#### Event: 'did-navigate-in-page'

Rückgabewert:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emittiert, wenn eine In-Page-Navigation in einem beliebigen Frame stattgefunden hat.

Wenn die In-Page-Navigation stattfindet, ändert sich die Seiten-URL, verursacht jedoch keine Navigation außerhalb der Seite. Beispiele hierfür sind, wenn Ankerverknüpfungen angeklickt werden oder wenn das DOM- `hashchange` -Ereignis ausgelöst wird.

#### Event: 'will-prevent-unload'

Rückgabewert:

* `event` Event

Es wird angezeigt, wenn ein `beforeunload` Ereignishandler versucht, das Entladen einer Seite abzubrechen.

Wenn `event.preventDefault()` aufruft, wird der des `beforeunload` -Ereignishandlers ignoriert und das Entladen der Seite zugelassen.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBoxSync(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Veranstaltung: "abgestürzt" _veraltete_

Rückgabewert:

* `event` Event
* `killed` Boolean

Emittiert, wenn der Renderer-Prozess abstürzt oder getötet wird.

**Deprecated:** Dieses Ereignis wird durch das `render-process-gone` -Ereignis ersetzt das weitere Informationen darüber enthält, warum der Renderprozess verschwunden ist. Ist es nicht immer, wenn es abgestürzt ist.  Der Boolesche Wert `killed` kann ersetzt werden durch Überprüfung von `reason === 'killed'`, wenn Sie zu diesem Ereignis wechseln.

#### Ereignis: 'render-process-gone'

Rückgabewert:

* `event` Event
* `details` -Objekt
  * `reason` String - Der Grund, warum der Renderprozess vorgangslos ist.  Mögliche werte:
    * `clean-exit` - Prozess mit einem Exit-Code von Null beendet
    * `abnormal-exit` - Prozess mit einem Exit-Code ungleich Null beendet
    * `killed` - Prozess wurde ein SIGTERM gesendet oder auf andere Weise extern getötet
    * `crashed` - Prozess abgestürzt
    * `oom` - Prozess läuft nicht mehr auf
    * `launch-failed` - Prozess nie erfolgreich gestartet
    * `integrity-failure` - Fehler bei Windows-Codeintegritätsprüfungen
  * `exitCode` Ganzzahl - Der Exitcode des Prozesses, es sei denn, `reason` `launch-failed`ist, in diesem Fall ist `exitCode` ein plattformspezifischer Fehlerfehlercode.

Emittiert, wenn der Rendererprozess unerwartet verschwindet.  Dies ist normalerweise , weil es abgestürzt oder getötet wurde.

#### Event: 'unresponsive'

Ausgegeben wenn die Webseite nicht mehr antwortet.

#### Event: 'responsive'

Ausgegeben wenn eine Webseite, die zuvor nicht mehr antwortete, wieder antwortet.

#### Event: 'plugin-crashed'

Rückgabewert:

* `event` Event
* `name` String
* `version` String

Emittiert, wenn ein Plugin-Prozess abgestürzt ist.

#### Event: 'destroyed'

Emittiert, wenn `webContents` zerstört wird.

#### Event: 'before-input-event'

Rückgabewert:

* `event` Event
* `input` -Objekt - Eingabeeigenschaften.
  * `type` String - Entweder `keyUp` oder `keyDown`.
  * `key` String - Equivalent zu [KeyboardEvent.key][keyboardevent].
  * `code` String - Equivalent zu [KeyboardEvent.code][keyboardevent].
  * `isAutoRepeat` Boolean - Equivalent zu [KeyboardEvent.repeat][keyboardevent].
  * `isComposing` boolesch - Entspricht [KeyboardEvent.isComposing][keyboardevent].
  * `shift` Boolean - Equivalent zu [KeyboardEvent.shiftKey][keyboardevent].
  * `control` Boolean - Equivalent zu [KeyboardEvent.controlKey][keyboardevent].
  * `alt` Boolean - Equivalent zu [KeyboardEvent.altKey][keyboardevent].
  * `meta` Boolean - Equivalent zu [KeyboardEvent.metaKey][keyboardevent].

Emittiert, bevor die `keydown` und `keyup` Ereignisse auf der Seite gesendet werden. Wenn `event.preventDefault` aufruft, wird verhindert, dass die Seite `keydown` /`keyup` Ereignisse und die Menüverknüpfungen.

Um nur die Menüverknüpfungen zu verhindern, verwenden Sie [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore):

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => '
  * Aktivieren Sie z. B. Anwendungsmenü-Tastaturbefehle nur, wenn
  / Strg/Cmd unten sind.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'enter-html-full-screen'

Wird gesendet, wenn das Fenster in einen Vollbildstatus wechselt, der durch die HTML-API ausgelöst wird.

#### Event: 'leave-html-full-screen'

Wird angezeigt, wenn das Fenster einen Vollbildstatus verlässt, der durch die HTML-API ausgelöst wird.

#### Ereignis: 'zoom-changed'

Rückgabewert:

* `event` Event
* `zoomDirection` String - Kann `in` oder `out`werden.

Wird gesendet, wenn der Benutzer anfordert, die Zoomstufe mit dem Mausrad zu ändern.

#### Event: 'devtools-opened'

Emittiert wenn die DevTools geöffnet wurden.

#### Event: 'devtools-closed'

Emittiert wenn die DevTools geschlossen wurden.

#### Event: 'devtools-focused'

Emittiert, wenn DevTools fokussiert / geöffnet wird.

#### Event: 'certificate-error'

Rückgabewert:

* `event` Event
* `url` String
* `error` String - Der error code.
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function
  * `isTrusted` boolesch - Gibt an, ob das Zertifikat als vertrauenswürdig betrachtet werden kann.

Emittiert, wenn die `certificate` für `url`nicht überprüft werden konnte.

Die Verwendung ist die gleiche mit [dem `certificate-error` Ereignis von `app`](app.md#event-certificate-error).

#### Event: 'select-client-certificate'

Rückgabewert:

* `event` Event
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function
  * `certificate` [Zertifikat](structures/certificate.md) - Muss ein Zertifikat aus der angegebenen Liste sein.

Emittiert wenn ein Client Zertifikat angefordert wird.

Die Verwendung ist die gleiche mit [dem `select-client-certificate` Ereignis von `app`](app.md#event-select-client-certificate).

#### Event: 'login'

Rückgabewert:

* `event` Event
* `authenticationResponseDetails` -Objekt
  * `url` URL
* `authInfo` -Objekt
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (optional)
  * `password` String (optional)

Wird ausgelöst wenn `webContents` grundlegende Authentifizierung durchführen will.

Die Verwendung ist die gleiche mit [dem `login` Ereignis von `app`](app.md#event-login).

#### Event: 'found-in-page'

Rückgabewert:

* `event` Event
* `result` -Objekt
  * `requestId` Integer
  * `activeMatchOrdinal` Ganzzahl - Position des aktiven Spiels.
  * `matches` Ganzzahl - Anzahl der Übereinstimmungen.
  * `selectionArea` -Rechteck - Koordinaten des ersten Übereinstimmungsbereichs.
  * `finalUpdate` Boolean

Emittiert, wenn ein Ergebnis für [`webContents.findInPage`] Anforderung verfügbar ist.

#### Event: 'media-started-playing'

Emittiert wenn ein Media Element anfängt zu spielen.

#### Event: 'media-paused'

Emittiert, wenn Medien angehalten oder die Wiedergabe beendet ist.

#### Event: 'did-change-theme-color'

Rückgabewert:

* `event` Event
* `color` (String | null) - Die Designfarbe ist im Format '#rrggbb'. Es ist `null` , wenn keine Designfarbe festgelegt ist.

Emittiert, wenn sich die Designfarbe einer Seite ändert. Dies ist in der Regel auf das Auftreten einem Meta-Tag zurückzuführen:

```html
<meta name='theme-color' content='#ff0000'>
```

#### Event: 'update-target-url'

Rückgabewert:

* `event` Event
* `url` String

Emittiert, wenn sich die Maus über einen Link bewegt oder die Tastatur den Fokus auf einen Link verschiebt.

#### Event: 'cursor-changed'

Rückgabewert:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (optional)
* `scale` Float (optional) - Skalierungsfaktor für den benutzerdefinierten Cursor.
* `size` [Size](structures/size.md) (optional) - Die Größe des`Bildes`.
* `hotspot` [Point](structures/point.md) (optional) - Koordinaten des Hotspots des benutzerdefinierten Cursors.

Emittiert wenn der Cursor Typ sich ändert. Der `type` Parameter kann folgenden Werte haben `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

Wenn der Parameter `type` `custom`ist, enthält der Parameter `image` das benutzerdefinierte Cursorbild in einem [`NativeImage`](native-image.md), und `scale`, `size` und `hotspot` enthalten zusätzliche Informationen über den benutzerdefinierten Cursor.

#### Event: 'context-menu'

Rückgabewert:

* `event` Event
* `params` -Objekt
  * `x` Integer - x Koordinate.
  * `y` Integer - y Koordinate.
  * `linkURL` String - URL des Links, der den Knoten einschließt, auf dem das Kontextmenü aufgerufen wurde.
  * `linkText` String - Text, der dem Link zugeordnet ist. Kann eine leere Zeichenfolge sein, wenn der Inhalt des Links ein Bild ist.
  * `pageURL` String - URL der Seite der obersten Ebene, auf der das Kontextmenü aufgerufen wurde.
  * `frameURL` String - URL des Subframes, auf dem das Kontextmenü aufgerufen wurde, .
  * `srcURL` String - Quell-URL für das Element, für das das Kontextmenü aufgerufen wurde. Elemente mit Quell-URLs sind Bilder, Audio und Video.
  * `mediaType` String - Typ des Knotens, auf dem das Kontextmenü aufgerufen wurde. Kann `none`, `image`, `audio`, `video`, `canvas` `file` oder `plugin`sein.
  * `hasImageContents` Boolean - Gibt an, ob das Kontextmenü für ein Bild aufgerufen wurde das nicht leeren Inhalt hat.
  * `isEditable` Boolean - Gibt an, ob der Kontext editierbar ist.
  * `selectionText` String - Text der Auswahl, für die das Kontextmenü aufgerufen wurde.
  * `titleText` String - Titel oder Alttext der Auswahl, für die der Kontext aufgerufen wurde.
  * `misspelledWord` String - Das falsch geschriebene Wort unter dem Cursor, falls vorhanden.
  * `dictionarySuggestions` String[] - Ein Array von vorgeschlagenen Wörtern, um den Benutzer anzuzeigen, der die `misspelledWord`ersetzt.  Nur verfügbar, wenn ein falsch geschriebenes Wort und rechtschreibweise aktiviert ist.
  * `frameCharset` String - Die Zeichencodierung des Frames, für den das Menü aufgerufen wurde.
  * `inputFieldType` String - Wenn das Kontextmenü für ein Eingabefeld aufgerufen wurde, , der Typ dieses Feldes. Mögliche Werte sind `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Eingabequelle, die das Kontextmenü aufgerufen hat. Kann `none`, `mouse`, `keyboard`, `touch` oder `touchMenu`sein.
  * `mediaFlags` -Objekt - Die Flags für das Medienelement, für das das Kontextmenü aufgerufen wurde.
    * `inError` Boolean - Whether the media element has crashed.
    * `isPaused` Boolean - Whether the media element is paused.
    * `isMuted` Boolean - Whether the media element is muted.
    * `hasAudio` Boolean - Whether the media element has audio.
    * `isLooping` Boolean - Whether the media element is looping.
    * `isControlsVisible` Boolean - Whether the media element's controls are visible.
    * `canToggleControls` Boolean - Whether the media element's controls are toggleable.
    * `canRotate` Boolean - Whether the media element can be rotated.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
    * `canUndo` Boolean - Whether the renderer believes it can undo.
    * `canRedo` Boolean - Whether the renderer believes it can redo.
    * `canCut` Boolean - Whether the renderer believes it can cut.
    * `canCopy` Boolean - Whether the renderer believes it can copy
    * `canPaste` Boolean - Whether the renderer believes it can paste.
    * `canDelete` Boolean - Whether the renderer believes it can delete.
    * `canSelectAll` Boolean - Whether the renderer believes it can select all.

Emitted when there is a new context menu that needs to be handled.

#### Event: 'select-bluetooth-device'

Rückgabewert:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Event: 'paint'

Rückgabewert:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emitted when the devtools window instructs the webContents to reload

#### Event: 'will-attach-webview'

Rückgabewert:

* `event` Event
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

Rückgabewert:

* `event` Event
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### Event: 'console-message'

Rückgabewert:

* `event` Event
* `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

Rückgabewert:

* `event` Event
* `preloadPath` String
* ` Fehler </ 0> Fehler</li>
</ul>

<p spaces-before="0">Emitted when the preload script <code>preloadPath` throws an unhandled exception `error`.</p>

#### Event: 'ipc-message'

Rückgabewert:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

Rückgabewert:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### Event: 'desktop-capturer-get-sources'

Rückgabewert:

* `event` Event

Emitted when `desktopCapturer.getSources()` is called in the renderer process. Wenn `event.preventDefault()` ruft, werden leere Quellen zurückgegeben.

#### Ereignis: 'Remote-require' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Veranstaltung: 'remote-get-global' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Wenn `event.preventDefault()` aufgerufen wird, wird verhindert, dass die globale Zurückgegebenwerden. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Event: 'remote-get-builtin' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Ereignis: 'remote-get-current-window' _veraltete_

Rückgabewert:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Event: 'remote-get-current-web-contents' _veraltete_

Rückgabewert:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Event: 'preferred-size-changed'

Rückgabewert:

* `event` Event
* `preferredSize` [Size](structures/size.md) - The minimum size needed to contain the layout of the document—without requiring scrolling.

Emitted when the `WebContents` preferred size has changed.

This event will only be emitted when `enablePreferredSizeMode` is set to `true` in `webPreferences`.

### Instanz Methoden

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Objekt (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optional) – Ein Benutzer-Agent, der die Anforderung stammt.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Lädt die `url` in das Fenster. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Objekt (optional)
  * `query` Record<String, String> (optional) - An `url.format()`übergeben.
  * `search` String (optional) - An `url.format()`übergeben.
  * `hash` String (optional) - An `url.format()`übergeben.

Gibt `Promise<void>` zurück - das Versprechen wird aufgelöst, wenn die Seite geladen hat (siehe [`did-finish-load`](web-contents.md#event-did-finish-load)), und lehnt ab, wenn die Seite nicht geladen werden kann (siehe [`did-fail-load`](web-contents.md#event-did-fail-load)).

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application.  For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

Würde Code wie diesen benötigen

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Gibt einen `String` zurück - Die URL der aktuellen web page.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
```

#### `contents.getTitle()`

Returns `String` - The title of the current web page.

#### `contents.isDestroyed()`

Returns `Boolean` - Whether the web page is destroyed.

#### `contents.focus()`

Focuses the web page.

#### `contents.isFocused()`

Returns `Boolean` - Whether the web page is focused.

#### `contents.isLoading()`

Returns `Boolean` - Whether web page is still loading resources.

#### `contents.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

#### `contents.isWaitingForResponse()`

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### `contents.stop()`

Stops any pending navigation.

#### `contents.reload()`

Lädt die aktuelle web page neu.

#### `contents.reloadIgnoringCache()`

Lädt die aktuelle web page neu und ignoriert dabei die Caches.

#### `contents.canGoBack()`

Returns `Boolean` - Whether the browser can go back to previous web page.

#### `contents.canGoForward()`

Returns `Boolean` - Whether the browser can go forward to next web page.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

Clears the navigation history.

#### `contents.goBack()`

Makes the browser go back a web page.

#### `contents.goForward()`

Makes the browser go forward a web page.

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

#### `contents.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

#### `contents.forcefullyCrashRenderer()`

Forcefully terminates the renderer process that is currently hosting this `webContents`. This will cause the `render-process-gone` event to be emitted with the `reason=killed || reason=crashed`. Please note that some webContents share renderer processes and therefore calling this method may also crash the host process for other webContents as well.

Calling `reload()` immediately after calling this method will force the reload to occur in a new process. This should be used when this process is unstable or unusable, for instance in order to recover from the `unresponsive` event.

```js
contents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcefullyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for this web page.

#### `contents.getUserAgent()`

Returns `String` - The user agent for this web page.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Objekt (optional)
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', () => {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async () => {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setWindowOpenHandler(handler)`

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` -Objekt
    * `url` String - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` String - Name of the window provided in `window.open()`
    * `features` String - Comma separated list of window features provided to `window.open()`.

  Returns `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancels the creation of the new window. `allow` will allow the new window to be created. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Called before creating a window when `window.open()` is called from the renderer. See [`window.open()`](window-open.md) for more details and how to use this in conjunction with `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Mute the audio on the current web page.

#### `contents.isAudioMuted()`

Returns `Boolean` - Whether this page has been muted.

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

#### `contents.setZoomLevel(level)`

* `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Rückgaben `Promise<void>`

Setzt das Maximum und Minimum pinch-to-zoom Level.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```

#### `contents.undo()`

Executes the editing command `undo` in web page.

#### `contents.redo()`

Executes the editing command `redo` in web page.

#### `contents.cut()`

Executes the editing command `cut` in web page.

#### `contents.copy()`

Executes the editing command `copy` in web page.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

Executes the editing command `paste` in web page.

#### `contents.pasteAndMatchStyle()`

Executes the editing command `pasteAndMatchStyle` in web page.

#### `contents.delete()`

Executes the editing command `delete` in web page.

#### `contents.selectAll()`

Executes the editing command `selectAll` in web page.

#### `contents.unselect()`

Executes the editing command `unselect` in web page.

#### `contents.replace(text)`

* `text` String

Executes the editing command `replace` in web page.

#### `contents.replaceMisspelling(text)`

* `text` String

Executes the editing command `replaceMisspelling` in web page.

#### `contents.insertText(text)`

* `text` String

Rückgaben `Promise<void>`

Füge `text` in das fokusierte Element ein.

#### `contents.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Objekt (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

Gibt `Promise<NativeImage>` zurück - Löst mit einem [NativeImage](native-image.md)

Erfasst eine Momentaufnahme der Seite in `rect`. Wenn Sie `rect` auslassen, wird die gesamte sichtbare Seite erfasst.

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The preferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `contents.getPrinters()`

Get the system printer list.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Objekt (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Standard ist `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. Standard ist `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. Standard ist `true`.
  * `margins` Object (optional)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. Standard ist `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Object[]  (optional) - The page range to print. On macOS, only one range is honored.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.
* `callback` Funktion (optional)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

When a custom `pageSize` is passed, Chromium attempts to validate platform specific minimum values for `width_microns` and `height_microns`. Width and height must both be minimum 353 microns but may be higher on some operating systems.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

Example usage:

```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `options` -Objekt
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

Ein Beispiel für `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">
    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```

```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```

Ein Beispiel zum zeigen der DevTools in einem `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Objekt (optional)
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. Der Standardwert ist `true`.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

Schließt die DevTools.

#### `contents.isDevToolsOpened()`

Returns `Boolean` - Whether the devtools is opened.

#### `contents.isDevToolsFocused()`

Returns `Boolean` - Whether the devtools view is focused .

#### `contents.toggleDevTools()`

Toggles the developer tools.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// Im Hauptprozess.
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number] - the ID of the frame to send to, or a pair of `[processId, frameId]` if the frame is in a different process to the main frame.
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **HINWEIS:** Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  z.B.

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` String
* `message` any
* `transfer` MessagePortMain[] (optional)

Send a message to the renderer process, optionally transferring ownership of zero or more [`MessagePortMain`][] objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

Ein Beispiel:

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### `contents.disableDeviceEmulation()`

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - Der volle Dateipfad.
* `saveType` String - Specify the save type.
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

Zeigt das Popupwörterbuch an, das das ausgewählte Wort auf der Seite durchsucht.

#### `contents.isOffscreen()`

Gibt `Boolean` zurück : Gibt an, ob *Offscreen-Rendering-* aktiviert ist.

#### `contents.startPainting()`

Wenn *Offscreen-Rendering-* aktiviert ist und nicht malen, beginnen Sie mit dem Malen.

#### `contents.stopPainting()`

Wenn *Offscreen-Rendering-* aktiviert ist und das Malen aktiviert ist, beenden Sie das Malen.

#### `contents.isPainting()`

Gibt `Boolean` zurück : Wenn *Offscreen-Rendering aktiviert ist, wird* aktiviert, ob es gerade malt.

#### `contents.setFrameRate(fps)`

* `fps` Integer

Wenn *Offscreen-Rendering-* aktiviert ist, wird die Bildrate auf die angegebene Zahl festgelegt. Es werden nur Werte zwischen 1 und 240 akzeptiert.

#### `contents.getFrameRate()`

Gibt `Integer` zurück : Wenn *Offscreen-Rendering aktiviert ist, wird* die aktuelle Bildrate zurückgegeben.

#### `contents.invalidate()`

Plant eine vollständige Neubemalung des Fensters, in dem sich dieser Webinhalt befindet.

Wenn *Offscreen-Rendering aktiviert ist* , wird der Frame ungültig und ein neues durch das `'paint'` -Ereignis generiert.

#### `contents.getWebRTCIPHandlingPolicy()`

Gibt `String` zurück: Gibt die WebRTC IP-Behandlungsrichtlinie zurück.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String – Geben Sie die WebRTC IP-Handhabungsrichtlinie an.
  * `default` - Stellt öffentliche und lokale IPs des Benutzers zur Anzeige. Dies ist die Standardeinstellung Verhalten. Wenn diese Richtlinie verwendet wird, hat WebRTC das Recht, alle Schnittstellen aufzuzählen und sie zu binden, um öffentliche Schnittstellen zu ermitteln.
  * `default_public_interface_only` - Macht die öffentliche IP des Benutzers verfügbar, macht jedoch nicht die lokale IP des Benutzers verfügbar machen. Wenn diese Richtlinie verwendet wird, sollte WebRTC nur die Standardroute verwenden, die von http verwendet wird. Dadurch werden keine lokalen Adressen verfügbar gemacht.
  * `default_public_and_private_interfaces` - Stellt die öffentlichen und lokalen -IPs des Benutzers auf. Wenn diese Richtlinie verwendet wird, sollte WebRTC nur die Standardroute verwenden, die von http verwendet wird. Dadurch wird auch die zugehörige private Standardadresse verfügbar gemacht. Standardroute route ist die Route, die vom Betriebssystem auf einem mehrfach in landgebundenen Endpunkt ausgewählt wurde.
  * `disable_non_proxied_udp` - Stellt keine öffentlichen oder lokalen IPs zur Hand. Wenn diese -Richtlinie verwendet wird, sollte WebRTC TCP nur verwenden, um Peers oder Server zu kontaktieren, es sei denn, der Proxyserver UDP unterstützt.

Durch Festlegen der WebRTC-IP-Behandlungsrichtlinie können Sie steuern, welche IPs über WebRTC verfügbar gemacht werden. Weitere Informationen finden Sie in [BrowserLeaks ](https://browserleaks.com/webrtc) .

#### `contents.getOSProcessId()`

Gibt `Integer` zurück - Das Betriebssystem `pid` des zugeordneten Renderers Prozess.

#### `contents.getProcessId()`

Gibt `Integer` zurück - Die interne Chromium- `pid` des zugeordneten Renderers. Kann mit dem `frameProcessId` verglichen werden, der von rahmenspezifischen Navigationsereignissen (z. B. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Gibt `Promise<void>` zurück: Gibt an, ob der Snapshot erfolgreich erstellt wurde.

Erstellt einen V8-Heap-Snapshot und speichert ihn in `filePath`.

#### `contents.getBackgroundThrottling()`

Gibt `Boolean` zurück : ob diese WebContents Animationen und Timer drosseln , wenn die Seite hintergrundgebunden wird. This also affects the Page Visibility API.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Steuert, ob diese WebContents Animationen und Timer drosseln, wenn die Seite hintergrundgebunden wird. This also affects the Page Visibility API.

#### `contents.getType()`

Gibt `String` zurück - den Typ des webContent. Kann `backgroundPage`, `window`, `browserView`, `remote`, `webview` oder `offscreen`sein.

### Instanz Eigenschaften

#### `contents.audioMuted`

Eine `Boolean` Eigenschaft, die bestimmt, ob diese Seite stummgeschaltet ist.

#### `contents.userAgent`

Eine `String` Eigenschaft, die den Benutzer-Agent für diese Webseite bestimmt.

#### `contents.zoomLevel`

Eine `Number` Eigenschaft, die die Zoomstufe für diesen Webinhalt bestimmt.

Die ursprüngliche Größe ist 0, und jedes Inkrement über oder unter stellt ein Zoomum um 20 % größer oder kleiner auf Standardlimits von 300 % bzw. 50 % der ursprünglichen Größe dar. Die Formel dafür lautet `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

Eine `Number` Eigenschaft, die den Zoomfaktor für diesen Webinhalt bestimmt.

Der Zoomfaktor ist der Zoom-Prozentsatz geteilt durch 100, also 300% = 3,0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Es werden nur Werte zwischen 1 und 240 akzeptiert.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` _Readonly_

A `Integer` representing the unique ID of this WebContents. Each ID is unique among all `WebContents` instances of the entire Electron application.

#### `contents.session` _Readonly_

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` _Readonly_

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.

#### `contents.backgroundThrottling`

A `Boolean` property that determines whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.mainFrame` _Readonly_

A [`WebFrameMain`](web-frame-main.md) property that represents the top frame of the page's frame hierarchy.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
