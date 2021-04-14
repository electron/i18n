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
    * `inError` Boolean - Ob das Medienelement abgestürzt ist.
    * `isPaused` Boolean - Gibt an, ob das Medienelement angehalten wird.
    * `isMuted` Boolean - Gibt an, ob das Medienelement stummgeschaltet ist.
    * `hasAudio` Boolean - Gibt an, ob das Medienelement Audio hat.
    * `isLooping` Boolean - Gibt an, ob das Medienelement eine Schleife ist.
    * `isControlsVisible` Boolean – Gibt an, ob die Steuerelemente des Medienelements sichtbar sind.
    * `canToggleControls` Boolean - Gibt an, ob die Steuerelemente des Medienelements umschaltbar sind.
    * `canRotate` Boolean - Gibt an, ob das Medienelement gedreht werden kann.
  * `editFlags` -Objekt - Diese Flags geben an, ob der Renderer glaubt, dass er die entsprechende Aktion ausführen kann.
    * `canUndo` Boolean - Ob der Renderer glaubt, dass er rückgängig machen kann.
    * `canRedo` Boolean - Ob der Renderer glaubt, dass er es wiederholen kann.
    * `canCut` Boolean - Ob der Renderer glaubt, dass es schneiden kann.
    * `canCopy` Boolean - Ob der Renderer glaubt, dass er kopieren kann
    * `canPaste` Boolean - Ob der Renderer glaubt, dass er einfügen kann.
    * `canDelete` Boolean - Gibt an, ob der Renderer glaubt, dass er löschen kann.
    * `canSelectAll` Boolean - Ob der Renderer glaubt, dass er alle auswählen kann.

Emittiert, wenn es ein neues Kontextmenü gibt, das behandelt werden muss.

#### Event: 'select-bluetooth-device'

Rückgabewert:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String

Emittiert, wenn Bluetooth-Gerät auf Abruf ausgewählt werden muss, um `navigator.bluetooth.requestDevice`. Um `navigator.bluetooth` api zu verwenden, sollten `webBluetooth` aktiviert sein. Wenn `event.preventDefault` nicht aufgerufen wird, wird erste verfügbare Gerät ausgewählt. `callback` mit `deviceId` aufgerufen werden sollte, um ausgewählt zu werden, wird die leere Zeichenfolge an `callback` die Anforderung abbrechen.

```javascript
const { app, BrowserWindow } = require('electron')

lassen sie win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then()=> '
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (ereignis, deviceList, callback) =>
    event.preventDefault()
    const result = deviceList.find(device) => '
      return device.deviceName === 'test'
    ')
    wenn (!result)
    
      ,  ,
      callback(result.deviceId

  
    )
```

#### Event: 'paint'

Rückgabewert:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - Die Bilddaten des gesamten Frames.

Emittiert, wenn ein neuer Frame generiert wird. Nur der schmutzige Bereich wird im -Puffer übergeben.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow(' webPreferences: { offscreen: true } ')
win.webContents.on('paint', (event, dirty, image) => '
  / updateBitmap(dirty, image.getBitmap())
')
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

Emittiert, wenn das devtools-Fenster die WebContents zum erneuten Laden anweist

#### Event: 'will-attach-webview'

Rückgabewert:

* `event` Event
* `webPreferences` WebPreferences - Die Webeinstellungen, die von der Gastseite verwendet werden. Dieses Objekt kann geändert werden, um die Einstellungen für die Gastseite anzupassen.
* `params` Record<string, string> - Die anderen `<webview>` Parameter wie die `src` URL. Dieses Objekt kann geändert werden, um die Parameter der Gästeseite anzupassen.

Es wird angezeigt, wenn die Webinhalte eines `<webview>`an diese Web- -Inhalte angefügt werden. Wenn sie `event.preventDefault()` aufrufen, wird die Gastseite zerstört.

Dieses Ereignis kann verwendet werden, um `webPreferences` für die `webContents` eines `<webview>` zu konfigurieren, bevor es geladen wird, und bietet die Möglichkeit, Einstellungen festzulegen, die nicht über `<webview>` Attribute festgelegt werden können.

**Hinweis:** Die angegebene `preload` Skriptoption wird als `preloadURL` (nicht `preload`) im `webPreferences` Mit diesem Ereignis emittierten Objekt angezeigt.

#### Event: 'did-attach-webview'

Rückgabewert:

* `event` Event
* `webContents` WebContents - Die Gastwebinhalte, die vom `<webview>`verwendet werden.

Emittiert, wenn ein `<webview>` an diesen Webinhalt angehängt wurde.

#### Event: 'console-message'

Rückgabewert:

* `event` Event
* `level` Ganzzahl - Die Protokollebene von 0 bis 3. Damit er `verbose`, `info`, `warning` und `error`entspricht.
* `message` String - Die eigentliche Konsolenmeldung
* `line` Ganzzahl - Die Zeilennummer der Quelle, die diese Konsolennachricht ausgelöst hat
* `sourceId` String

Wird angezeigt, wenn das zugehörige Fenster eine Konsolennachricht protokolliert.

#### Ereignis: 'preload-error'

Rückgabewert:

* `event` Event
* `preloadPath` String
* ` Fehler </ 0> Fehler</li>
</ul>

<p spaces-before="0">Es wird gesendet, wenn das Preload-Skript <code>preloadPath` eine nicht behandelte Ausnahme `error`auslöst.</p>

#### Ereignis: 'ipc-message'

Rückgabewert:

* `event` Event
* `channel` String
* `...args` any[]

Emittiert, wenn der Rendererprozess eine asynchrone Nachricht über `ipcRenderer.send()`sendet.

#### Ereignis: 'ipc-message-sync'

Rückgabewert:

* `event` Event
* `channel` String
* `...args` any[]

Emittiert, wenn der Rendererprozess eine synchrone Nachricht über `ipcRenderer.sendSync()`sendet.

#### Event: 'desktop-capturer-get-sources'

Rückgabewert:

* `event` Event

Emittiert, wenn `desktopCapturer.getSources()` im Rendererprozess aufgerufen wird. Wenn `event.preventDefault()` ruft, werden leere Quellen zurückgegeben.

#### Ereignis: 'Remote-require' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `moduleName` String

Emittiert, wenn `remote.require()` im Rendererprozess aufgerufen wird. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Veranstaltung: 'remote-get-global' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `globalName` String

Emittiert, wenn `remote.getGlobal()` im Rendererprozess aufgerufen wird. Wenn `event.preventDefault()` aufgerufen wird, wird verhindert, dass die globale Zurückgegebenwerden. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Event: 'remote-get-builtin' _veraltete_

Rückgabewert:

* `event` IpcMainEvent
* `moduleName` String

Emittiert, wenn `remote.getBuiltin()` im Rendererprozess aufgerufen wird. Wenn `event.preventDefault()` wird verhindert, dass das Modul zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Ereignis: 'remote-get-current-window' _veraltete_

Rückgabewert:

* `event` IpcMainEvent

Emittiert, wenn `remote.getCurrentWindow()` im Rendererprozess aufgerufen wird. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Event: 'remote-get-current-web-contents' _veraltete_

Rückgabewert:

* `event` IpcMainEvent

Emittiert, wenn `remote.getCurrentWebContents()` im Rendererprozess aufgerufen wird. Durch aufrufendes `event.preventDefault()` verhindert, dass das Objekt zurückgegeben wird. Ein eigener Wert kann zurückgegeben werden durch Setzen von `event.returnValue`.

#### Ereignis: 'bevorzugte Größe geändert'

Rückgabewert:

* `event` Event
* `preferredSize` [Größe](structures/size.md) – Die Mindestgröße, die für erforderlich ist, enthält das Layout des Dokuments, ohne dass ein Bildlauf erforderlich ist.

Emittiert, wenn sich die `WebContents` bevorzugte Größe geändert hat.

Dieses Ereignis wird nur dann emittiert, wenn `enablePreferredSizeMode` in `webPreferences`auf `true` festgelegt ist.

### Instanz Methoden

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Objekt (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - Eine HTTP Referrer URL.
  * `userAgent` String (optional) – Ein Benutzer-Agent, der die Anforderung stammt.
  * `extraHeaders` String (optional) - Zusätzliche Header getrennt durch "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Basis-URL (mit Nachtrailing-Pfadtrennzeichen) für Dateien, die von der Daten-URL geladen werden sollen. Dies ist nur erforderlich, wenn die angegebene `url` eine Daten-URL ist und andere Dateien laden muss.

Gibt `Promise<void>` zurück - das Versprechen wird aufgelöst, wenn die Seite geladen hat (siehe [`did-finish-load`](web-contents.md#event-did-finish-load)), und lehnt ab, wenn die Seite nicht geladen werden kann (siehe [`did-fail-load`](web-contents.md#event-did-fail-load)). Ein Noop-Ablehnungshandler ist bereits angefügt, wodurch nicht behandelte Ablehnungsfehler vermieden werden.

Lädt die `url` in das Fenster. Die `url` muss das Protokollpräfix enthalten, z. B. die `http://` oder `file://`. Wenn die Last den http-Cache umgehen soll, den `pragma` -Header verwenden, um dies zu erreichen.

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

Lädt die angegebene Datei im Fenster, `filePath` sollte ein Pfad zum einer HTML-Datei relativ zum Stamm der Anwendung sein.  Zum Beispiel eine App-Struktur wie diese:

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

Initiiert einen Download der Ressource auf `url` , ohne zu navigieren. Das `will-download` Ereignis der `session` wird ausgelöst.

#### `contents.getURL()`

Gibt einen `String` zurück - Die URL der aktuellen web page.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com'
.log
  
  > ).
```

#### `contents.getTitle()`

Gibt `String` zurück - Der Titel der aktuellen Webseite.

#### `contents.isDestroyed()`

Gibt `Boolean` zurück - Gibt an, ob die Webseite zerstört wurde.

#### `contents.focus()`

Fokussiert die Webseite.

#### `contents.isFocused()`

Gibt `Boolean` zurück - Gibt an, ob die Webseite fokussiert ist.

#### `contents.isLoading()`

Gibt `Boolean` zurück : Gibt an, ob die Webseite noch Ressourcen lädt.

#### `contents.isLoadingMainFrame()`

Gibt `Boolean` zurück - Ob der Hauptrahmen (und nicht nur iframes oder Frames darin) noch geladen wird.

#### `contents.isWaitingForResponse()`

Gibt `Boolean` zurück : Gibt an, ob die Webseite auf eine erste Antwort von der Hauptressource der Seite wartet.

#### `contents.stop()`

Beendet alle ausstehenden Navigationen.

#### `contents.reload()`

Lädt die aktuelle web page neu.

#### `contents.reloadIgnoringCache()`

Lädt die aktuelle web page neu und ignoriert dabei die Caches.

#### `contents.canGoBack()`

Gibt `Boolean` zurück - Gibt an, ob der Browser zur vorherigen Webseite zurückkehren kann.

#### `contents.canGoForward()`

Gibt `Boolean` zurück - Gibt an, ob der Browser zur nächsten Webseite weitergeleitet werden kann.

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Gibt `Boolean` zurück – Gibt an, ob die Webseite zu `offset`wechseln kann.

#### `contents.clearHistory()`

Löscht den Navigationsverlauf.

#### `contents.goBack()`

Lässt den Browser eine Webseite zurück.

#### `contents.goForward()`

Lässt den Browser eine Webseite vorwärts gehen.

#### `contents.goToIndex(index)`

* `index` Integer

Navigiert im Browser zum angegebenen absoluten Webseitenindex.

#### `contents.goToOffset(offset)`

* `offset` Integer

Navigiert vom "aktuellen Eintrag" zum angegebenen Offset.

#### `contents.isCrashed()`

Gibt `Boolean` zurück - Gibt an, ob der Renderer-Prozess abgestürzt ist.

#### `contents.forcefullyCrashRenderer()`

Beendet den Rendererprozess, der derzeit diese `webContents`hostet, mit Nachdruck. Dadurch wird das `render-process-gone` Ereignis mit dem `reason=killed || reason=crashed`ausgesendet. Bitte beachten Sie, dass einige webContents-Freigabe-Renderer Prozessen und daher das Aufrufen dieser Methode kann auch den Host-Prozess für andere webContents abstürzen.

Wenn Sie `reload()` unmittelbar nach dem Aufruf dieses -Methode aufrufen, wird das erneute Laden in einem neuen Prozess erzwingen. Dies sollte verwendet werden, wenn dieser Prozess instabil oder unbrauchbar ist, z. B. um vom `unresponsive` -Ereignis wiederherzustellen.

```js
contents.on('nicht ansprechbar', async () =>
  const { response } = await dialog.showMessageBox('
    Nachricht: 'App X ist nicht mehr reagiert',
    Titel: 'Möchten Sie versuchen, die App mit Nachdruck neu zu laden?',
    -Buttons: ['OK', 'Abbrechen'],
    cancelId: 1


  
    
    
  ' .
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

Überschreibt den Benutzer-Agent für diese Webseite.

#### `contents.getUserAgent()`

Gibt `String` zurück : Der Benutzer-Agent für diese Webseite.

#### `contents.insertCSS(css[, optionen])`

* `css` String
* `options` Objekt (optional)
  * `cssOrigin` String (optional) - Kann entweder 'user' oder 'author' sein; Durch die Angabe von "Benutzer" können Sie verhindern, dass Websites das von Ihnen eingefügte CSS überschreiben. Standard ist 'author'.

Gibt `Promise<String>` zurück - Ein Versprechen, das mit einem Schlüssel für das eingefügte CSS aufgelöst wird, das später verwendet werden kann, um das CSS über `contents.removeInsertedCSS(key)`zu entfernen.

Fügt CSS in die aktuelle Webseite ein und gibt einen eindeutigen Schlüssel für das eingefügte -Stylesheet zurück.

```js
contents.on('did-finish-load', () => '
  contents.insertCSS('html, body 'background-color: #f00; '')
')
```

#### `contents.removeInsertedCSS(Key)`

* `key` String

Gibt `Promise<void>` zurück - Wird behoben, wenn die Entfernung erfolgreich war.

Entfernt das eingefügte CSS von der aktuellen Webseite. Das Stylesheet wird durch seinen Schlüssel identifiziert, der von `contents.insertCSS(css)`zurückgegeben wird.

```js
contents.on('did-finish-load', async () => '
  const key = await contents.insertCSS('html, body 'background-color: #f00; '')
  contents.removeInsertedCSS(key)

```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.

Gibt `Promise<any>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn das Ergebnis des Codes ein abgelehntes Versprechen ist.

Bewertet `code` in Der Seite.

Im Browserfenster können einige HTML-APIs wie `requestFullScreen` nur durch eine Geste des Benutzers aufgerufen werden. Wenn Sie `userGesture` auf `true` festlegen, wird diese Einschränkung entfernt.

Die Codeausführung wird angehalten, bis die Webseite beendet wird.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - Die ID der Welt, in der das Javascript ausgeführt werden soll, `0` die Standardwelt ist, `999` die Welt ist, die von Electrons `contextIsolation` -Funktion verwendet wird.  Sie können hier jede ganze Zahl angeben.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (optional) - Default is `false`.

Gibt `Promise<any>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn das Ergebnis des Codes ein abgelehntes Versprechen ist.

Funktioniert wie `executeJavaScript` , sondern bewertet `scripts` in einem isolierten Kontext.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignorieren Sie Anwendungsmenüverknüpfungen, während dieser Webinhalt fokussiert ist.

#### `contents.setWindowOpenHandler(handler)`

* `handler` -Funktion<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` -Objekt
    * `url` String - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` String - Name of the window provided in `window.open()`
    * `features` String - Comma separated list of window features provided to `window.open()`.

  Returns `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancels the creation of the new window. `allow` will allow the new window to be created. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Wird aufgerufen, bevor ein Fenster erstellt wird, wenn `window.open()` vom -Renderer aufgerufen wird. Weitere Informationen und die Verwendung in Verbindung mit `did-create-window`finden Sie in [`window.open()`](window-open.md) .

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

Stummschalten Sie den Ton auf der aktuellen Webseite.

#### `contents.isAudioMuted()`

Gibt `Boolean` zurück - Gibt an, ob diese Seite stummgeschaltet wurde.

#### `contents.isCurrentlyAudible()`

Gibt `Boolean` zurück - Gibt an, ob Audio gerade wiedergegeben wird.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom-Faktor; Der Standardwert ist 1.0.

Ändert den Zoomfaktor in den angegebenen Faktor. Zoom-Faktor ist Zoom Prozent geteilt durch 100, also 300% = 3,0.

Der Faktor muss größer als 0,0 sein.

#### `contents.getZoomFactor()`

Gibt `Number` zurück - den aktuellen Zoomfaktor.

#### `contents.setZoomLevel(level)`

* `level` Number - Zoom level.

Ändert die Zoomstufe auf die angegebene Ebene. Die ursprüngliche Größe ist 0, und jedes -Inkrement über oder unter stellt ein Zoomum um 20 % größer oder kleiner auf standard Grenzwerte von 300 % bzw. 50 % der ursprünglichen Größe dar. Die Formel dafür lautet `scale := 1.2 ^ level`.

> **HINWEIS**: Die Zoomrichtlinie auf Chromium-Ebene ist gleich-Ursprung, was bedeutet, dass die Zoomstufe für eine bestimmte Domäne über alle Instanzen von Fenstern mit derselben Domäne weitergegeben wird. Durch die Differenzierung der Fenster-URLs funktioniert der Zoom pro Fenster.

#### `contents.getZoomLevel()`

Gibt `Number` zurück - die aktuelle Zoomstufe.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Rückgaben `Promise<void>`

Setzt das Maximum und Minimum pinch-to-zoom Level.

> **HINWEIS**: Der visuelle Zoom ist in Electron standardmäßig deaktiviert. Um es erneut zu aktivieren, rufen Sie:
> 
> ```js
> contents.setVisualZoomLevelLimits(1, 3)
> ```

#### `contents.undo()`

Führt den Bearbeitungsbefehl `undo` in der Webseite aus.

#### `contents.redo()`

Führt den Bearbeitungsbefehl `redo` in der Webseite aus.

#### `contents.cut()`

Führt den Bearbeitungsbefehl `cut` in der Webseite aus.

#### `contents.copy()`

Führt den Bearbeitungsbefehl `copy` in der Webseite aus.

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Kopieren Sie das Bild an der angegebenen Position in die Zwischenablage.

#### `contents.paste()`

Führt den Bearbeitungsbefehl `paste` in der Webseite aus.

#### `contents.pasteAndMatchStyle()`

Führt den Bearbeitungsbefehl `pasteAndMatchStyle` in der Webseite aus.

#### `contents.delete()`

Führt den Bearbeitungsbefehl `delete` in der Webseite aus.

#### `contents.selectAll()`

Führt den Bearbeitungsbefehl `selectAll` in der Webseite aus.

#### `contents.unselect()`

Führt den Bearbeitungsbefehl `unselect` in der Webseite aus.

#### `contents.replace(text)`

* `text` String

Führt den Bearbeitungsbefehl `replace` in der Webseite aus.

#### `contents.replaceMisspelling(text)`

* `text` String

Führt den Bearbeitungsbefehl `replaceMisspelling` in der Webseite aus.

#### `contents.insertText(text)`

* `text` String

Rückgaben `Promise<void>`

Füge `text` in das fokusierte Element ein.

#### `contents.findInPage(text[, options])`

* `text` String - Inhalte, die gesucht werden sollen, dürfen nicht leer sein.
* `options` Objekt (optional)
  * `forward` Boolean (optional) - Gibt an, vorwärts oder rückwärts zu suchen, standardmäßig `true`.
  * `findNext` Boolean (optional) - Unabhängig davon, ob es sich bei dem Vorgang um eine erste Anforderung oder eine Nachverfolgung handelt, standardmäßig `false`.
  * `matchCase` Boolean (optional) - Ob bei der Suche die Groß-/Kleinschreibung beachtet werden soll, standardmäßig `false`.

Gibt `Integer` zurück - Die für die Anforderung verwendete Anforderungs-ID.

Startet eine Anforderung, um alle Übereinstimmungen für die `text` auf der Webseite zu finden. Das Ergebnis der Anforderung kann durch Abonnieren [`found-in-page`](web-contents.md#event-found-in-page) Ereignis erhalten werden.

#### `contents.stopFindInPage(action)`

* `action` String - Gibt die Aktion an, die beim Beenden [`webContents.findInPage`] -Anforderung stattfinden soll.
  * `clearSelection` - Löschen Sie die Auswahl.
  * `keepSelection` - Übersetzen Sie die Auswahl in eine normale Auswahl.
  * `activateSelection` - Fokus und klicken Sie auf den Auswahlknoten.

Beendet jede `findInPage` Anfrage für die `webContents` mit dem bereitgestellten `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect])`

* `rect` [Rechteck](structures/rectangle.md) (optional) - Der Bereich der zu erfassenden Seite.

Gibt `Promise<NativeImage>` zurück - Löst mit einem [NativeImage](native-image.md)

Erfasst eine Momentaufnahme der Seite in `rect`. Wenn Sie `rect` auslassen, wird die gesamte sichtbare Seite erfasst.

#### `contents.isBeingCaptured()`

Gibt `Boolean` zurück - Gibt an, ob diese Seite erfasst wird. Es gibt true zurück, wenn die der Erfassungsanzahl groß als 0 ist.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - Die bevorzugte Größe für den Capturer.
* `stayHidden` boolesch (optional) - Halten Sie die Seite ausgeblendet statt sichtbar.

Erhöhen Sie die Anzahl der Erfassungen um eins. Die Seite gilt als sichtbar, wenn das Browserfenster ausgeblendet ist und die Erfassungsanzahl ungleich Null ist. Wenn Sie möchten, dass die Seite ausgeblendet bleibt, sollten Sie sicherstellen, dass `stayHidden` auf true festgelegt ist.

Dies wirkt sich auch auf die Seitensichtbarkeits-API aus.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` boolesch (optional) - Halten Sie die Seite im versteckten Zustand statt sichtbar.

Verringern Sie die Anzahl der Erfassungen um eins. Die Seite wird auf einen ausgeblendeten oder ausgeblendeten Zustand festgelegt, wenn das Browserfenster sausiert oder ausgeblendet ist und die Erfassungsanzahl Null erreicht. Wenn Sie stattdessen die Anzahl der ausgeblendeten Erfassungen verringern möchten, sollten Sie `stayHidden` auf true festlegen.

#### `contents.getPrinters()`

Holen Sie sich die Systemdruckerliste ab.

Returns [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

* `options` Objekt (optional)
  * `silent` Boolean (optional) - Fragen Sie den Benutzer nicht nach Druckeinstellungen. Standard ist `false`.
  * `printBackground` Boolean (optional) - Druckt die Hintergrundfarbe und das Bild der der Webseite. Standard ist `false`.
  * `deviceName` String (optional) - Legen Sie den zu verwendenden Druckergerätenamen fest. Es muss der systemdefinierte Name sein und nicht der 'freundliche' Name, z. B. 'Brother_QL_820NWB' und nicht 'Brother QL-820NWB'.
  * `color` boolesch (optional) - Legen Sie fest, ob die gedruckte Webseite in Farbe oder Graustufen sein soll. Standard ist `true`.
  * `margins` Objekt (optional)
    * `marginType` String (optional) - Kann `default`, `none`, `printableArea`oder `custom`sein. Wenn `custom` ausgewählt ist, müssen Sie auch `top`, `bottom`, `left`und `right`angeben.
    * `top` Zahl (optional) - Der obere Rand der gedruckten Webseite in Pixel.
    * `bottom` Zahl (optional) - Der untere Rand der gedruckten Webseite in Pixel.
    * `left` Zahl (optional) - Der linke Rand der gedruckten Webseite in Pixel.
    * `right` Zahl (optional) - Der rechte Rand der gedruckten Webseite in Pixel.
  * `landscape` Boolean (optional) - Gibt an, ob die Webseite im Querformat gedruckt werden soll. Standard ist `false`.
  * `scaleFactor` Zahl (optional) - Der Skalierungsfaktor der Webseite.
  * `pagesPerSheet` Anzahl (optional) - Die Anzahl der zu druckenden Seiten pro Seitenblatt.
  * `collate` Boolean (optional) - Gibt an, ob die Webseite zusammengestellt werden soll.
  * `copies` -Nummer (optional) - Die Anzahl der zu druckenden Kopien der Webseite.
  * `pageRanges` Object[] (optional) - Der zu druckende Seitenbereich. Unter macOS wird nur ein Bereich berücksichtigt.
    * `from` - Index der ersten zu druckenden Seite (0-basiert).
    * `to` - Index der letzten zu druckenden Seite (inklusive) (0-basiert).
  * `duplexMode` String (optional) - Legen Sie den Duplexmodus der gedruckten Webseite fest. Kann `simplex`, `shortEdge`oder `longEdge`sein.
  * `dpi` Datensatz<string, number> (optional)
    * `horizontal` Zahl (optional) - Die horizontale dpi.
    * `vertical` Zahl (optional) - Die vertikale dpi.
  * `header` String (optional) - String, der als Seitenkopf gedruckt werden soll.
  * `footer` String (optional) - String, der als Seitenfußzeile gedruckt werden soll.
  * `pageSize` String | Größe (optional) - Geben Sie die Seitengröße des gedruckten Dokuments an. Kann `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` oder ein Objekt sein, das `height`enthält.
* `callback` Funktion (optional)
  * `success` Boolean - Gibt den Erfolg des Druckaufrufs an.
  * `failureReason` String - Fehlerbeschreibung wird zurückgerufen, wenn der Druck fehlschlägt.

Wenn ein benutzerdefiniertes `pageSize` übergeben wird, versucht Chromium, plattformspezifische Mindestwerte für `width_microns` und `height_microns`zu überprüfen. Breite und Höhe müssen mindestens 353 Mikrometer betragen, können aber auf einigen Betriebssystemen höher sein.

Druckt die Webseite des Fensters. Wenn `silent` auf `true`eingestellt ist, wählt Electron Standarddrucker des Systems aus, wenn `deviceName` leer ist und die Standardeinstellungen für den Druck.

Verwenden Sie `page-break-before: always;` CSS-Stil, um das Drucken auf einer neuen Seite zu erzwingen.

Beispielverwendung:

```js
const-Optionen =
  still: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
'
win.webContents.print(options, (success, errorType) => '
  if (!success) console.log(errorType)

```

#### `contents.printToPDF(options)`

* `options` -Objekt
  * `headerFooter` Record<string, string> (optional) - kopf- und fußzeile für die PDF-Datei.
    * `title` String - Der Titel für den PDF-Header.
    * `url` String - die URL für die PDF-Fußzeile.
  * `landscape` boolesch (optional) - `true` für Landschaft, `false` für Porträt.
  * `marginsType` Ganzzahl (optional) - Gibt den Typ der zu verwendenden Ränder an. Verwendet 0 für Standardmarge, 1 für keine Marge und 2 für die minimale Marge.
  * `scaleFactor` Zahl (optional) - Der Skalierungsfaktor der Webseite. Kann von 0 bis 100 reichen.
  * `pageRanges` Record<string, number> (optional) - Der zu druckende Seitenbereich.
    * `from` - Index der ersten zu druckenden Seite (0-basiert).
    * `to` - Index der letzten zu druckenden Seite (inklusive) (0-basiert).
  * `pageSize` String | Größe (optional) - Geben Sie die Seitengröße der generierten PDF-Datei an. Kann `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` oder ein Objekt sein, das `height` und `width` in Mikrometern enthält.
  * `printBackground` Boolean (optional) - Ob CSS-Hintergründe gedruckt werden sollen.
  * `printSelectionOnly` Boolean (optional) - Gibt an, ob nur die Auswahl gedruckt werden soll.

Gibt `Promise<Buffer>` zurück - Behebt mit den generierten PDF-Daten.

Druckt die Webseite des Fensters als PDF mit chromiums Vorschau drucken benutzerdefinierte Einstellungen.

Die `landscape` wird ignoriert, wenn `@page` CSS at-rule auf der Webseite verwendet wird.

Standardmäßig wird ein leerer `options` als:

```javascript
-
  ränderTyp: 0,
  printBackground: false,
  printSelectionOnly: false,
  Landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
.
```

Verwenden Sie `page-break-before: always;` CSS-Stil, um das Drucken auf einer neuen Seite zu erzwingen.

Ein Beispiel für `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () =>
  // Verwenden Sie die Standarddruckoptionen
  win.webContents.printToPDF().then(data =>
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => '
      wenn (Fehler) Fehler
      Konsole auslösen.log('Schreiben Sie PDF erfolgreich auf ${pdfPath}')
    ')
  .catch(error => '
    console.log('Fehler beim Schreiben von PDF in ${pdfPath}: ', fehler)
  ')

```

#### `contents.addWorkSpace(path)`

* `path` String

Fügt den angegebenen Pfad zum DevTools-Arbeitsbereich hinzu. Muss nach DevTools Erstellung verwendet werden:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.webContents.on('devtools-opened', () => '
  win.webContents.addWorkSpace(__dirname)
')
```

#### `contents.removeWorkSpace(path)`

* `path` String

Entfernt den angegebenen Pfad aus dem DevTools-Arbeitsbereich.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Verwendet die `devToolsWebContents` als Ziel `WebContents` , um Devtools anzuzeigen.

Die `devToolsWebContents` dürfen keine Navigation durchgeführt haben, und sie sollten nicht nach dem Anruf für andere Zwecke verwendet werden.

Standardmäßig verwaltet Electron die Devtools, indem es eine interne `WebContents` mit nativer Ansicht erstellt, auf die Entwickler nur sehr eingeschränkt e.v.a. verfügen. Mit der `setDevToolsWebContents` -Methode können Entwickler jede `WebContents` verwenden, um die darin enthaltenen Devtools anzuzeigen, einschließlich `BrowserWindow`, `BrowserView` und `<webview>` -Tags.

Beachten Sie, dass das Schließen der Devtools nicht die `devToolsWebContents`zerstört, es ist die Verantwortung des Aufrufers, `devToolsWebContents`zu zerstören.

Ein Beispiel für das Anzeigen von devtools in einem `<webview>` -Tag:

```html
<html>
<head>
  <style type="text/css">
    * - Marge: 0;
    #browser - Höhe: 70%; -
    #devtools - Höhe: 30%; { ipcRenderer } 
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>

    const emittedOnce = (element, eventName) => neues Promise(resolve => -
      element.addEventListener(eventName, event => resolve(event), { once: true })
    )
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementBy
    Id , 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(()=>
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.
  </script>
</body>
</html>
    send
```

```js
Hauptprozess
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => '
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevWebContents(devtools)
  target.
open
```

Ein Beispiel zum zeigen der DevTools in einem `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

lassen sie win = null
lassen devtools = null

app.whenReady().then() =>
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents
{ mode: 'detach' }
  )
```

#### `contents.openDevTools([options])`

* `options` Objekt (optional)
  * `mode` String - Öffnet die devtools mit dem angegebenen Dock-Status, kann `right`, `bottom`, `undocked`, `detach`sein. Standardmäßig wird der zuletzt verwendete Dockstatus verwendet. Im `undocked` Modus ist es möglich, zurück zu docken. Im `detach` Modus ist es nicht.
  * `activate` Boolean (optional) - Ob das geöffnete Devtools-Fenster in den Vordergrund rückt. Der Standardwert ist `true`.

Öffnet die Devtools.

Wenn `contents` ein `<webview>` -Tag ist, wird die `mode` standardmäßig `detach` , das explizite Übergeben eines leeren `mode` die Verwendung des zuletzt verwendeten Dock-Status erzwingen kann.

#### `contents.closeDevTools()`

Schließt die DevTools.

#### `contents.isDevToolsOpened()`

Gibt `Boolean` zurück - Gibt an, ob die Devtools geöffnet werden.

#### `contents.isDevToolsFocused()`

Gibt `Boolean` zurück - Gibt an, ob die devtools-Ansicht fokussiert ist.

#### `contents.toggleDevTools()`

Schaltet die Entwicklertools um.

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Startet die Prüfung des Elements an der Position (`x`, `y`).

#### `contents.inspectSharedWorker()`

Öffnet die Entwicklertools für den freigegebenen Workerkontext.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Überprüft die freigegebene Arbeitskraft basierend auf ihrer ID.

#### `contents.getAllSharedWorkers()`

Gibt [`SharedWorkerInfo[]`](structures/shared-worker-info.md) zurück - Informationen zu allen freigegebenen Arbeitskräften.

#### `contents.inspectServiceWorker()`

Öffnet die Entwicklertools für den Service-Worker-Kontext.

#### `contents.send(Kanal, ... args)`

* `channel` String
* `...args` any[]

Senden Sie eine asynchrone Nachricht über `channel`, zusammen mit Argumenten an den Rendererprozess. Argumente werden mit dem [Structured Clone Algorithm][SCA]serialisiert, genau wie [`postMessage`][], so dass Prototypketten nicht werden. Beim Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets wird eine Ausnahme auslösen.

> **HINWEIS**: Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.

Der Rendererprozess kann die Nachricht verarbeiten, indem er `channel` mit dem [`ipcRenderer`](ipc-renderer.md) -Modul abhört.

Ein Beispiel für das Senden von Nachrichten vom Hauptprozess an den Rendererprozess:

```javascript
// Im Hauptprozess.
const { app, BrowserWindow } = require('electron')
win = null

app.whenReady().then() => -
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('file://${__dirname}/index.html')
  win.webContents.on('did-finish-load', () => '
    win.webContents.send', 'whoooooooh!')
  })
})
```

```html<!-- Index.html --><html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (ereignis, message) => '
      console.log(message) / / Prints 'whoooooooh!'
    "
  </script>
</body>
</html>
```

#### `contents.sendToFrame(frameId, kanal, ... args)`

* `frameId` Ganzzahl-| [Nummer, Zahl] - die ID des zu sendenden Rahmens oder ein Paar `[processId, frameId]` , wenn sich der Rahmen in einem anderen Prozess befindet als der -Hauptrahmen.
* `channel` String
* `...args` any[]

Senden Sie eine asynchrone Nachricht über `channel`zusammen mit Argumenten an einen bestimmten Frame in einem Rendererprozess. Argumente werden mit dem [Structured Clone Algorithm][SCA]serialisiert, genau wie [`postMessage`][], so dass Prototypen Ketten nicht enthalten sind. Das Senden von Funktionen, Versprechen, Symbolen, WeakMaps oder WeakSets löst eine Ausnahme aus.

> **HINWEIS:** Das Senden nicht standardmäßiger JavaScript-Typen wie DOM-Objekte oder speziellen Electron-Objekte löst eine Ausnahme aus.

Der Rendererprozess kann die Nachricht verarbeiten, indem er `channel` mit dem [`ipcRenderer`](ipc-renderer.md) -Modul abhört.

Wenn Sie die `frameId` eines bestimmten Rendererkontexts abrufen möchten, sollten Sie den `webFrame.routingId` -Wert verwenden.  z.B.

```js
In einem Rendererprozess
Konsole.log('My frameId is:', require('electron').webFrame.routingId)
```

Sie können auch `frameId` aus allen eingehenden IPC-Nachrichten im Hauptprozess lesen.

```js
Im Hauptprozess
ipcMain.on('ping', (event) => '
  console.info('Message kam von frameId:', event.frameId)
')
```

#### `contents.postMessage(Kanal, Nachricht, [transfer])`

* `channel` String
* `message`
* `transfer` MessagePortMain[] (optional)

Senden Sie eine Nachricht an den Rendererprozess, wodurch optional der Besitz von Null oder mehr [`MessagePortMain`]-Objekten übertragen wird.

Die übertragenen `MessagePortMain` Objekte stehen im Renderer- Prozess zur Verfügung, indem sie auf die `ports` -Eigenschaft des emitted-Ereignisses zugreifen. Wenn sie im Renderer ankommen , sind sie systemeigene DOM- `MessagePort` -Objekte.

Ein Beispiel:

```js
Hauptprozess
const { port1, port2 } = neue MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

/ Renderer-Prozess
ipcRenderer.on('port', (e, msg) => '
  const [port] = e.ports
  ...
})
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` -Objekt
  * `screenPosition` String - Geben Sie den Bildschirmtyp an, der emulieren soll (Standard: `desktop`):
    * `desktop` - Desktop-Bildschirmtyp.
    * `mobile` - Mobiler Bildschirmtyp.
  * `screenSize` [Größe](structures/size.md) - Legen Sie die emulierte Bildschirmgröße fest (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Positionieren Sie die Ansicht auf dem Bildschirm (screenPosition == mobile) (Standard: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Ganzzahl - Legen Sie den Geräteskalierungsfaktor fest (wenn Null standardmäßig auf ursprünglichen Geräteskalierungsfaktor) (Standard: `0`).
  * `viewSize` [Größe](structures/size.md) - Festlegen der emulierten Ansichtsgröße (leer bedeutet keine Außerkraftsetzung)
  * `scale` Float - Skalierung der emulierten Ansicht innerhalb des verfügbaren Raums (nicht in Ansichtsmodus) (Standard: `1`).

Aktivieren Sie die Geräteemulation mit den angegebenen Parametern.

#### `contents.disableDeviceEmulation()`

Deaktivieren Sie die Geräteemulation, die durch `webContents.enableDeviceEmulation`aktiviert ist.

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sendet eine Eingabe `event` an die Seite. **Hinweis:** Die [`BrowserWindow`](browser-window.md) , die den Inhalt enthält, müssen fokussiert werden, damit `sendInputEvent()` funktioniert.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` Boolean (optional) - Defaults to `false`.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Beginnen Sie mit dem Abonnieren von Präsentationsereignissen und erfassten Frames wird der `callback` mit `callback(image, dirtyRect)` aufgerufen, wenn eine Präsentation Ereignis vorhanden ist.

Die `image` ist eine Instanz [NativeImage-](native-image.md) , in der der erfasste Frame gespeichert wird.

Der `dirtyRect` ist ein Objekt mit `x, y, width, height` Eigenschaften, die beschreibt, welcher Teil der Seite neu gezeichnet wurde. Wenn `onlyDirty` auf `true`festgelegt ist, enthält `image` nur den neu lackierten Bereich. `onlyDirty` standardmäßig auf `false`.

#### `contents.endFrameSubscription()`

Beenden Sie das Abonnieren für Framepräsentationsereignisse.

#### `contents.startDrag(item)`

* `item` -Objekt
  * `file` String[] | String - Der Pfad(e) zu den Filen, die gezogen werden.
  * `icon` [NativeImage](native-image.md) | String - Das Bild muss unter macOS nicht leer sein.

Legt die `item` als Ziehelement für den aktuellen Drag-Drop-Vorgang fest, `file` ist der absoluter Pfad der zu ziehenden Datei, und `icon` ist das Bild, das beim Ziehen unter Cursor angezeigt wird.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - Der volle Dateipfad.
* `saveType` String - Geben Sie den Speichertyp an.
  * `HTMLOnly` - Speichern Sie nur den HTML-Code der Seite.
  * `HTMLComplete` - Complete-HTML-Seite speichern.
  * `MHTML` - Speichern Sie die Complete-HTML-Seite als MHTML.

Gibt `Promise<void>` zurück - löst auf, wenn die Seite gespeichert wird.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => '
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete.log
    > ').
  .catch(err =>
    Konsole.log(err)
  )
)
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

* `filePath` String - Pfad zur Ausgabedatei.

Gibt `Promise<void>` zurück: Gibt an, ob der Snapshot erfolgreich erstellt wurde.

Erstellt einen V8-Heap-Snapshot und speichert ihn in `filePath`.

#### `contents.getBackgroundThrottling()`

Gibt `Boolean` zurück : ob diese WebContents Animationen und Timer drosseln , wenn die Seite hintergrundgebunden wird. Dies wirkt sich auch auf die Seitensichtbarkeits-API aus.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Steuert, ob diese WebContents Animationen und Timer drosseln, wenn die Seite hintergrundgebunden wird. Dies wirkt sich auch auf die Seitensichtbarkeits-API aus.

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

Eine `Integer` Eigenschaft, die die Bildrate des Webinhalts auf die angegebene Zahl festlegt. Es werden nur Werte zwischen 1 und 240 akzeptiert.

Nur anwendbar, wenn *Offscreen-Rendering-* aktiviert ist.

#### `contents.id` _Readonly_

Ein `Integer` , der die eindeutige ID dieser WebContents darstellt. Jede ID ist unter allen `WebContents` Instanzen der gesamten Electron-Anwendung eindeutig.

#### `contents.session` _Readonly_

Ein [`Session`](session.md) , der von diesen webContents verwendet wird.

#### `contents.hostWebContents` _Readonly_

Eine [`WebContents`](web-contents.md) Instanz, die diese `WebContents`besitzen könnte.

#### `contents.devToolsWebContents` _Readonly_

Eine `WebContents | null` Eigenschaft, die die von DevTools darstellt, `WebContents` einem bestimmten `WebContents`zugeordnet.

**Hinweis:** Benutzer sollten dieses Objekt niemals speichern, da es möglicherweise `null` wird, wenn die DevTools geschlossen wurden.

#### `contents.debugger` _Readonly_

Eine [`Debugger`](debugger.md) Instanz für diese webContents.

#### `contents.backgroundThrottling`

Eine `Boolean` Eigenschaft, die bestimmt, ob diese WebContents Animationen und Timer drosseln , wenn die Seite hintergrundgebunden wird. Dies wirkt sich auch auf die Seitensichtbarkeits-API aus.

#### `contents.mainFrame` _Readonly_

Eine [`WebFrameMain`](web-frame-main.md) Eigenschaft, die den oberen Rahmen der Rahmenhierarchie der Seite darstellt.

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
