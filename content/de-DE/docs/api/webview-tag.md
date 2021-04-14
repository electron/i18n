# `<webview>` Tag

## Warnung

Das `webview` -Tag von Electron basiert auf [ `webview`][chrome-webview]von Chromium, das dramatische architektonische Veränderungen durchläuft. Dies wirkt sich auf die Stabilität von `webviews`, einschließlich Rendering, Navigation und Ereignisrouting aus. Wir empfehlen derzeit, das `webview` -Tag nicht verwenden und Alternativen wie `iframe`, Electron es `BrowserView`, oder eine Architektur zu berücksichtigen, die eingebettete Inhalte vollständig vermeidet.

## Aktivieren

Standardmäßig ist das `webview` -Tag in Electron >= 5 deaktiviert.  Sie müssen das Tag aktivieren, indem Sie beim Erstellen ihrer `BrowserWindow` die Option `webviewTag` webPreferences festlegen. Weitere Informationen finden Sie unter [BrowserWindow-Konstruktor-Docs](browser-window.md).

## Übersicht

> Anzeigen externer Webinhalte in einem isolierten Frame und Prozess.

Prozess: [Renderer](../glossary.md#renderer-process)

Verwenden Sie das `webview` -Tag, um "Gast"-Inhalte (z. B. Webseiten) in Ihre Electron-App einzubetten. Der Gastinhalt ist im `webview` -Container enthalten. Eine eingebettete Seite in Ihrer App steuert, wie der Gastinhalt angeordnet und gerendert wird.

Im Gegensatz zu einem `iframe`wird die `webview` in einem separaten Prozess als Ihre -App ausgeführt. Es verfügt nicht über die gleichen Berechtigungen wie Ihre Webseite, und alle Interaktionen zwischen Ihrer App und eingebetteten Inhalten sind asynchron. Dadurch wird Ihre App vor eingebetteten Inhalten geschützt. **Hinweis:** Die meisten Methoden, die in der Webview von der Hostseite aufgerufen werden, erfordern einen synchronen Aufruf des Hauptprozesses.

## Beispiel

Um eine Webseite in Ihre App einzubetten, fügen Sie das `webview` -Tag zum Einbetten Ihrer App Seite hinzu (dies ist die App-Seite, auf der der Gastinhalt angezeigt wird). In seiner einfachsten Form enthält das `webview` -Tag die `src` der Webseite und css-Stile, die die Darstellung des `webview` -Containers steuern :

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Wenn Sie den Gastinhalt in irgendeiner Weise steuern möchten, können Sie JavaScript- schreiben, das auf `webview` Ereignisse abhört und auf diese Ereignisse mit den `webview` Methoden antwortet. Hier ist Beispielcode mit zwei Ereignislistenern: einer, der hört, bis die Webseite mit dem Laden beginnt, der andere, damit die Webseite das Laden beendet, und ein "Laden..." anzeigt. Meldung während der Ladezeit:

```html
<script>
  onload = () =>
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => '
      indicator.innerText = 'loading...'
    •

    const loadstop = () =>
      indicator.innerText = ''
    '

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  '
</script>
```

## Interne Umsetzung

Unter der Haube wird `webview` mit [Out-of-Process-iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes)implementiert. Das `webview` -Tag ist im Wesentlichen ein benutzerdefiniertes Element, das Schatten-DOM verwendet, um ein `iframe` -Element darin zu umschließen.

Das Verhalten von `webview` ist also einem domänenübergreifenden `iframe`sehr ähnlich, wie Beispiele:

* Wenn Sie auf eine `webview`klicken, wird der Seitenfokus vom Einbettungsrahmen Frame in `webview`verschoben.
* Sie können `webview`keine Tastatur-, Maus- und Bildlaufereignislistener hinzufügen.
* Alle Reaktionen zwischen dem Einbettungsrahmen und `webview` sind asynchron.

## CSS Styling Notizen

Bitte beachten Sie, dass der Stil des `webview` -Tags intern `display:flex;` verwendet, um sicherzustellen, dass das untergeordnete `iframe` Element die volle Höhe und Breite seines `webview` -Containers ausfüllt, wenn es mit herkömmlichen und Flexbox-Layouts verwendet wird. Bitte überschreiben Sie die Standardeigenschaft `display:flex;` CSS nicht , es sei denn, Sie geben `display:inline-flex;` für das Inlinelayout an.

## Tag-Attribute

Das `webview` -Tag weist die folgenden Attribute auf:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Ein `String` , der die sichtbare URL darstellt. Wenn Sie in dieses Attribut schreiben, wird die der obersten Ebene initiiert.

Wenn Sie `src` eigenen Wertzuweisen, wird die aktuelle Seite neu geladen.

Das `src` -Attribut kann auch Daten-URLs akzeptieren, z. B. `data:text/plain,Hello, world!`.

### `Knotenintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Ein `Boolean`. Wenn dieses Attribut vorhanden ist, verfügt die Gastseite in `webview` über eine -Integration von Knoten und kann Knoten-APIs wie `require` und `process` verwenden, um auf Systemressourcen auf niedriger Ebene zuzugreifen. Die Knotenintegration ist standardmäßig auf der Seite "Gast deaktiviert.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Ein `Boolean` für die experimentelle Option zum Aktivieren der NodeJS-Unterstützung in Subframes wie iframes, die sich im `webview` . Alle Ihre Vorspannungen werden für jeden iframe geladen, Sie können `process.isMainFrame` verwenden, um zu bestimmen, ob Sie sich im Hauptframe befinden oder nicht. Diese Option ist standardmäßig auf der Gastseite deaktiviert.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Ein `Boolean`. Wenn dieses Attribut `false` die Gastseite in `webview` keinen Zugriff auf das [`remote`](remote.md) -Modul . Das Remotemodul ist standardmäßig nicht verfügbar.

### `plug-ins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Ein `Boolean`. Wenn dieses Attribut vorhanden ist, kann die Gastseite in `webview` Browser-Plugins verwenden. Plugins sind standardmäßig deaktiviert.

### `Vorspannung`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Ein `String` , der ein Skript angibt, das geladen wird, bevor andere Skripts auf der Seite des Gastes ausgeführt werden. Das Protokoll der SKRIPT-URL muss entweder `file:` oder `asar:`sein, da es von `require` in der Gastseite unter der Haube geladen wird.

Wenn die Gastseite keine Knotenintegration hat, hat dieses Skript weiterhin Zugriff auf alle Knoten-APIs, aber globale Objekte, die von Node eingefügt werden, werden gelöscht, nachdem die Ausführung dieses Skripts abgeschlossen wurde.

**Hinweis:** Diese Option wird als `preloadURL` (nicht `preload`) in der `webPreferences` angezeigt, die für das `will-attach-webview` -Ereignis angegeben ist.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Eine `String` , die die Referrer-URL für die Gastseite festlegt.

### `Useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Eine `String` , die den Benutzer-Agent für die Gastseite festlegt, bevor die Seite navigiert wird. Nachdem die Seite geladen wurde, verwenden Sie die `setUserAgent` Methode, um den Benutzer-Agent zu ändern.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Ein `Boolean`. Wenn dieses Attribut vorhanden ist, ist die Websicherheit auf der Gastseite deaktiviert. Die Websicherheit ist standardmäßig aktiviert.

### `Partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Eine `String` , die die von der Seite verwendete Sitzung festlegt. Wenn `partition` mit `persist:`beginnt, verwendet die Seite eine persistente Sitzung, die für alle Seiten in der App mit dem gleichen `partition`verfügbar ist. Wenn kein `persist:` -Präfix vorhanden ist, verwendet die Seite eine In-Memory-Sitzung. Durch Zuweisen derselben `partition`können mehrere Seiten derselben Sitzung gemeinsam nutzen. Wenn die `partition` nicht gesetzt ist, wird die Standardsitzung der App verwendet.

Dieser Wert kann nur vor der ersten Navigation geändert werden, da sich die Sitzung eines aktiven Rendererprozesses nicht ändern kann. Nachfolgende Versuche, den Wert zu ändern, schlagen mit einer DOM-Ausnahme fehl.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Ein `Boolean`. Wenn dieses Attribut vorhanden ist, kann die Gastseite neue Fenster öffnen. Popups sind standardmäßig deaktiviert.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Eine `String` eine durch Kommas getrennte Liste von Zeichenfolgen, die die Webeinstellungen angibt, die in der Webansicht festgelegt werden sollen. Die vollständige Liste der unterstützten Einstellungszeichenfolgen finden Sie in [BrowserWindow](browser-window.md#new-browserwindowoptions).

Die Zeichenfolge folgt dem gleichen Format wie die Features-Zeichenfolge in `window.open`. Ein Name selbst erhält einen `true` booleschen Wert. Eine Voreinstellung kann auf einen anderen Wert festgelegt werden, indem ein `=`gefolgt vom Wert eingebunden wird. Sonderwerte `yes` und `1` werden als `true`interpretiert, während `no` und `0` als `false`interpretiert werden.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Ein `String` eine Liste von Zeichenfolgen, die die Blink-Features angibt, die durch `,`getrennt aktiviert werden sollen. Die vollständige Liste der unterstützten Feature-Zeichenfolgen finden Sie in der Datei [RuntimeEnabledFeatures.json5][runtime-enabled-features] .

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Ein `String` eine Liste von Zeichenfolgen, die die blink-Features angibt, die durch `,`deaktiviert werden sollen. Die vollständige Liste der unterstützten Feature-Zeichenfolgen finden Sie in der Datei [RuntimeEnabledFeatures.json5][runtime-enabled-features] .

## Methoden

Das `webview` -Tag verfügt über die folgenden Methoden:

**Hinweis:** Das Webview-Element muss geladen werden, bevor die Methoden verwendet werden.

**Beispiel**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => '
  webview.openDevTools()

```

### `<webview>.loadURL(url[, optionen])`

* `url` URL
* `options` Objekt (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - Eine HTTP Referrer URL.
  * `userAgent` String (optional) – Ein Benutzer-Agent, der die Anforderung stammt.
  * `extraHeaders` String (optional) - Zusätzliche Header getrennt durch "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Basis-URL (mit Nachtrailing-Pfadtrennzeichen) für Dateien, die von der Daten-URL geladen werden sollen. Dies ist nur erforderlich, wenn die angegebene `url` eine Daten-URL ist und andere Dateien laden muss.

Gibt `Promise<void>` zurück - Das Versprechen wird aufgelöst, wenn das Laden der Seite beendet ist (siehe [`did-finish-load`](webview-tag.md#event-did-finish-load)), und lehnt ab, wenn die Seite nicht geladen werden kann (siehe [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Lädt die `url` in der Webview, die `url` muss das Protokollpräfix enthalten, z. B. die `http://` oder `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Initiiert einen Download der Ressource auf `url` , ohne zu navigieren.

### `<webview>.getURL()`

Gibt `String` zurück - Die URL der Gastseite.

### `<webview>.getTitle()`

Gibt `String` zurück - Der Titel der Gastseite.

### `<webview>.isLoading()`

Gibt `Boolean` zurück - Gibt an, ob die Gastseite noch Ressourcen lädt.

### `<webview>.isLoadingMainFrame()`

Gibt `Boolean` zurück - Ob der Hauptrahmen (und nicht nur iframes oder Frames darin) noch geladen wird.

### `<webview>.isWaitingForResponse()`

Gibt `Boolean` zurück : Gibt an, ob die Gastseite auf eine erste Antwort für die Hauptressource der Seite wartet.

### `<webview>.stop()`

Beendet alle ausstehenden Navigationen.

### `<webview>.reload()`

Lädt die Gastseite neu.

### `<webview>.reloadIgnoringCache()`

Lädt die Gastseite neu und ignoriert den Cache.

### `<webview>.canGoBack()`

Gibt `Boolean` zurück - Gibt an, ob die Gastseite zurückgehen kann.

### `<webview>.canGoForward()`

Gibt `Boolean` zurück - Gibt an, ob die Gastseite vorwärts gehen kann.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Gibt `Boolean` zurück - Gibt an, ob die Gastseite zu `offset`wechseln kann.

### `<webview>.clearHistory()`

Löscht den Navigationsverlauf.

### `<webview>.goBack()`

Macht die Gastseite zurück.

### `<webview>.goForward()`

Macht die Gastseite vorwärts.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigiert zum angegebenen absoluten Index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigiert vom "aktuellen Eintrag" zum angegebenen Offset.

### `<webview>.isCrashed()`

Gibt `Boolean` zurück - Gibt an, ob der Renderer-Prozess abgestürzt ist.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Überschreibt den Benutzer-Agent für die Gastseite.

### `<webview>.getUserAgent()`

Gibt `String` zurück : Der Benutzer-Agent für die Gastseite.

### `<webview>.insertCSS(css)`

* `css` String

Gibt `Promise<String>` zurück - Ein Versprechen, das mit einem Schlüssel für die eingefügte CSS aufgelöst wird, die später verwendet werden kann, um das CSS über `<webview>.removeInsertedCSS(key)`zu entfernen.

Fügt CSS in die aktuelle Webseite ein und gibt einen eindeutigen Schlüssel für das eingefügte -Stylesheet zurück.

### `<webview>.removeInsertedCSS(Key)`

* `key` String

Gibt `Promise<void>` zurück - Wird behoben, wenn die Entfernung erfolgreich war.

Entfernt das eingefügte CSS von der aktuellen Webseite. Das Stylesheet wird durch seinen Schlüssel identifiziert, der von `<webview>.insertCSS(css)`zurückgegeben wird.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Standard `false`.

Gibt `Promise<any>` zurück - Ein Versprechen, das mit dem Ergebnis des ausgeführten Codes aufgelöst wird oder abgelehnt wird, wenn das Ergebnis des Codes ein abgelehntes Versprechen ist.

Bewertet `code` in Der Seite. Wenn `userGesture` festgelegt ist, wird der Benutzer Gestenkontext auf der Seite erstellt. HTML-APIs wie `requestFullScreen`, die Benutzeraktion erfordern, können diese Option für die Automatisierung nutzen.

### `<webview>.openDevTools()`

Öffnet ein DevTools-Fenster für die Gastseite.

### `<webview>.closeDevTools()`

Schließt das DevTools-Fenster der Gastseite.

### `<webview>.isDevToolsOpened()`

Gibt `Boolean` zurück : Gibt an, ob eine DevTools-Seite mit einem DevTools-Fenster verbunden ist.

### `<webview>.isDevToolsFocused()`

Gibt `Boolean` zurück - Gibt an, ob das DevTools-Fenster der Gastseite fokussiert ist.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Startet die Überprüfung des Elements an der Position (`x`, `y`) der Gastseite.

### `<webview>.inspectSharedWorker()`

Öffnet die DevTools für den freigegebenen Workerkontext, der auf der Gastseite vorhanden ist.

### `<webview>.inspectServiceWorker()`

Öffnet die DevTools für den Service-Worker-Kontext, der auf der Gästeseite vorhanden ist.

### `<webview>.setAudioMuted (stummgeschaltet)`

* `muted` Boolean

Legen Sie die Stummschaltung der Gastseite fest.

### `<webview>.isAudioMuted()`

Gibt `Boolean` zurück - Gibt an, ob die Gastseite stummgeschaltet wurde.

### `<webview>.isCurrentlyAudible()`

Gibt `Boolean` zurück - Gibt an, ob Audio gerade wiedergegeben wird.

### `<webview>.undo()`

Führt den Bearbeitungsbefehl `undo` in der Seite aus.

### `<webview>.redo()`

Führt den Bearbeitungsbefehl `redo` in der Seite aus.

### `<webview>.cut()`

Führt den Bearbeitungsbefehl `cut` in der Seite aus.

### `<webview>.copy()`

Führt den Bearbeitungsbefehl `copy` in der Seite aus.

### `<webview>.paste()`

Führt den Bearbeitungsbefehl `paste` in der Seite aus.

### `<webview>.pasteAndMatchStyle()`

Führt den Bearbeitungsbefehl `pasteAndMatchStyle` in der Seite aus.

### `<webview>.delete()`

Führt den Bearbeitungsbefehl `delete` in der Seite aus.

### `<webview>.selectAll()`

Führt den Bearbeitungsbefehl `selectAll` in der Seite aus.

### `<webview>.unselect()`

Führt den Bearbeitungsbefehl `unselect` in der Seite aus.

### `<webview>.replace(Text)`

* `text` String

Führt den Bearbeitungsbefehl `replace` in der Seite aus.

### `<webview>.replaceMisspelling(Text)`

* `text` String

Führt den Bearbeitungsbefehl `replaceMisspelling` in der Seite aus.

### `<webview>.insertText(Text)`

* `text` String

Rückgaben `Promise<void>`

Füge `text` in das fokusierte Element ein.

### `<webview>.findInPage(text[, optionen])`

* `text` String - Inhalte, die gesucht werden sollen, dürfen nicht leer sein.
* `options` Objekt (optional)
  * `forward` Boolean (optional) - Gibt an, vorwärts oder rückwärts zu suchen, standardmäßig `true`.
  * `findNext` Boolean (optional) - Unabhängig davon, ob es sich bei dem Vorgang um eine erste Anforderung oder eine Nachverfolgung handelt, standardmäßig `false`.
  * `matchCase` Boolean (optional) - Ob bei der Suche die Groß-/Kleinschreibung beachtet werden soll, standardmäßig `false`.

Gibt `Integer` zurück - Die für die Anforderung verwendete Anforderungs-ID.

Startet eine Anforderung, um alle Übereinstimmungen für die `text` auf der Webseite zu finden. Das Ergebnis der Anforderung kann durch Abonnieren [`found-in-page`](webview-tag.md#event-found-in-page) Ereignis erhalten werden.

### `<webview>.stopFindInPage(Aktion)`

* `action` String - Gibt die Aktion an, die beim Beenden [`<webview>.findInPage`](#webviewfindinpagetext-options) Anforderung stattfinden soll.
  * `clearSelection` - Löschen Sie die Auswahl.
  * `keepSelection` - Übersetzen Sie die Auswahl in eine normale Auswahl.
  * `activateSelection` - Fokus und klicken Sie auf den Auswahlknoten.

Beendet jede `findInPage` Anfrage für die `webview` mit dem bereitgestellten `action`.

### `<webview>.print([options])`

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
  * `pageRanges` Object[] (optional) - Der zu druckende Seitenbereich.
    * `from` - Index der ersten zu druckenden Seite (0-basiert).
    * `to` - Index der letzten zu druckenden Seite (inklusive) (0-basiert).
  * `duplexMode` String (optional) - Legen Sie den Duplexmodus der gedruckten Webseite fest. Kann `simplex`, `shortEdge`oder `longEdge`sein.
  * `dpi` Datensatz<string, number> (optional)
    * `horizontal` Zahl (optional) - Die horizontale dpi.
    * `vertical` Zahl (optional) - Die vertikale dpi.
  * `header` String (optional) - String, der als Seitenkopf gedruckt werden soll.
  * `footer` String (optional) - String, der als Seitenfußzeile gedruckt werden soll.
  * `pageSize` String | Größe (optional) - Geben Sie die Seitengröße des gedruckten Dokuments an. Kann `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` oder ein Objekt sein, das `height`enthält.

Rückgaben `Promise<void>`

Druckt `webview`Webseite. Genauso wie `webContents.print([options])`.

### `<webview>.printToPDF(Optionen)`

* `options` -Objekt
  * `headerFooter` Record<string, string> (optional) - kopf- und fußzeile für die PDF-Datei.
    * `title` String - Der Titel für den PDF-Header.
    * `url` String - die URL für die PDF-Fußzeile.
  * `landscape` boolesch (optional) - `true` für Landschaft, `false` für Porträt.
  * `marginsType` Ganzzahl (optional) - Gibt den Typ der zu verwendenden Ränder an. Verwendet 0 für Standardmarge, 1 für keine Marge und 2 für die minimale Marge. und `width` in Mikrometern.
  * `scaleFactor` Zahl (optional) - Der Skalierungsfaktor der Webseite. Kann von 0 bis 100 reichen.
  * `pageRanges` Record<string, number> (optional) - Der zu druckende Seitenbereich. Unter macOS wird nur der erste Bereich berücksichtigt.
    * `from` - Index der ersten zu druckenden Seite (0-basiert).
    * `to` - Index der letzten zu druckenden Seite (inklusive) (0-basiert).
  * `pageSize` String | Größe (optional) - Geben Sie die Seitengröße der generierten PDF-Datei an. Kann `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` oder ein Objekt sein, das `height`enthält
  * `printBackground` Boolean (optional) - Ob CSS-Hintergründe gedruckt werden sollen.
  * `printSelectionOnly` Boolean (optional) - Gibt an, ob nur die Auswahl gedruckt werden soll.

Gibt `Promise<Uint8Array>` zurück - Behebt mit den generierten PDF-Daten.

Druckt `webview`Webseite als PDF, Gleich wie `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rechteck](structures/rectangle.md) (optional) - Der Bereich der zu erfassenden Seite.

Gibt `Promise<NativeImage>` zurück - Löst mit einem [NativeImage](native-image.md)

Erfasst eine Momentaufnahme der Seite in `rect`. Wenn Sie `rect` auslassen, wird die gesamte sichtbare Seite erfasst.

### `<webview>.send(Kanal, ... args)`

* `channel` String
* `...args` any[]

Rückgaben `Promise<void>`

Senden Sie eine asynchrone Nachricht über `channel`an den Rendererprozess, Sie können auch beliebige Argumente senden. Der Rendererprozess kann die Nachricht verarbeiten, indem er , das `channel` Ereignis mit dem [`ipcRenderer`](ipc-renderer.md) -Modul zu hören.

Beispiele finden Sie unter [webContents.send](web-contents.md#contentssendchannel-args) .

### `<webview>.sendInputEvent(ereignis)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Rückgaben `Promise<void>`

Sendet eine Eingabe `event` an die Seite.

Ausführliche Beschreibungen `event` Objekts finden Sie unter [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) .

### `<webview>.setZoomFactor(Faktor)`

* `factor` Number - Zoom faktor.

Ändert den Zoomfaktor in den angegebenen Faktor. Zoom-Faktor ist Zoom Prozent geteilt durch 100, also 300% = 3,0.

### `<webview>.setZoomLevel(ebene)`

* `level` Number - Zoom level.

Ändert die Zoomstufe auf die angegebene Ebene. Die ursprüngliche Größe ist 0, und jedes -Inkrement über oder unter stellt ein Zoomum um 20 % größer oder kleiner auf standard Grenzwerte von 300 % bzw. 50 % der ursprünglichen Größe dar. Die Formel dafür lautet `scale := 1.2 ^ level`.

> **HINWEIS**: Die Zoomrichtlinie auf Chromium-Ebene ist gleich-Ursprung, was bedeutet, dass die Zoomstufe für eine bestimmte Domäne über alle Instanzen von Fenstern mit derselben Domäne weitergegeben wird. Durch die Differenzierung der Fenster-URLs funktioniert der Zoom pro Fenster.

### `<webview>.getZoomFactor()`

Gibt `Number` zurück - den aktuellen Zoomfaktor.

### `<webview>.getZoomLevel()`

Gibt `Number` zurück - die aktuelle Zoomstufe.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Rückgaben `Promise<void>`

Setzt das Maximum und Minimum pinch-to-zoom Level.

### `<webview>.showDefinitionForSelection()` _macOS-_

Zeigt das Popupwörterbuch an, das das ausgewählte Wort auf der Seite durchsucht.

### `<webview>.getWebContentsId()`

Gibt `Number` zurück - Die WebContents-ID dieses `webview`.

## DOM-Ereignisse

Die folgenden DOM-Ereignisse stehen für das `webview` -Tag zur Verfügung:

### Ereignis: 'load-commit'

Rückgabewert:

* `url` String
* `isMainFrame` Boolean

Wird ausgelöst, wenn eine Last festgeschrieben wurde. Dies umfasst die Navigation innerhalb des aktuellen Dokuments sowie Lasten auf Subframe-Dokumentebene, jedoch nicht asynchrone Ressourcenlasten.

### Event: 'did-finish-load'

Wird ausgelöst, wenn die Navigation abgeschlossen ist, d. h. der Spinner der Registerkarte stoppt Drehen, und das `onload` Ereignis wird ausgelöst.

### Event: 'did-fail-load'

Rückgabewert:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Dieses Ereignis ist wie `did-finish-load`, wird aber ausgelöst, wenn die Last fehlgeschlagen ist oder abgebrochen wurde, z. B. `window.stop()` wird aufgerufen.

### Event: 'did-frame-finish-load'

Rückgabewert:

* `isMainFrame` Boolean

Wird ausgelöst, wenn ein Frame die Navigation durchgeführt hat.

### Event: 'did-start-loading'

Entspricht den Zeitpunkten, zu denen der Spinner der Registerkarte zu drehen beginnt.

### Event: 'did-stop-loading'

Entspricht den Zeitpunkten, an denen der Spinner der Registerkarte aufhört zu drehen.

### Event: 'dom-ready'

Wird ausgelöst, wenn das Dokument im angegebenen Frame geladen wird.

### Event: 'page-title-updated'

Rückgabewert:

* `title` String
* `explicitSet` Boolean

Wird ausgelöst, wenn der Seitentitel während der Navigation festgelegt wird. `explicitSet` ist falsch, wenn Titel aus der Datei-URL synthetisiert wird.

### Event: 'page-favicon-updated'

Rückgabewert:

* `favicons` String[] - Array mit URLs.

Wird ausgelöst, wenn die Seite favicon-URLs empfängt.

### Event: 'enter-html-full-screen'

Wird ausgelöst, wenn die Seite den Vollbildmodus betritt, der von der HTML-API ausgelöst wird.

### Event: 'leave-html-full-screen'

Wird ausgelöst, wenn die Seite den Vollbildmodus verlässt, der durch die HTML-API ausgelöst wird.

### Event: 'console-message'

Rückgabewert:

* `level` Ganzzahl - Die Protokollebene von 0 bis 3. Damit er `verbose`, `info`, `warning` und `error`entspricht.
* `message` String - Die eigentliche Konsolenmeldung
* `line` Ganzzahl - Die Zeilennummer der Quelle, die diese Konsolennachricht ausgelöst hat
* `sourceId` String

Wird ausgelöst, wenn das Gastfenster eine Konsolennachricht protokolliert.

Der folgende Beispielcode leitet alle Protokollnachrichten an die Konsole des Einbettungsgebers weiter ohne Rücksicht auf Protokollebene oder andere Eigenschaften.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => '
  console.log('Guest page logged a message:', e.message)

```

### Event: 'found-in-page'

Rückgabewert:

* `result` -Objekt
  * `requestId` Integer
  * `activeMatchOrdinal` Ganzzahl - Position des aktiven Spiels.
  * `matches` Ganzzahl - Anzahl der Übereinstimmungen.
  * `selectionArea` -Rechteck - Koordinaten des ersten Übereinstimmungsbereichs.
  * `finalUpdate` Boolean

Wird ausgelöst, wenn ein Ergebnis für [`webview.findInPage`](#webviewfindinpagetext-options) Anforderung verfügbar ist.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => '
  webview.stopFindInPage('keepSelection')
')

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Event: 'new-window'

Rückgabewert:

* `url` String
* `frameName` String
* `disposition` String - Kann `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` und `other`sein.
* `options` BrowserWindowConstructorOptions - Die Optionen, die zum Erstellen der neuen [`BrowserWindow`](browser-window.md)verwendet werden sollen.

Wird ausgelöst, wenn die Gastseite versucht, ein neues Browserfenster zu öffnen.

Der folgende Beispielcode öffnet die neue URL im Standardbrowser des Systems.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => '
  const protocol = (new URL(e.url)).protocol
  if (protocol ==='http:' || protocol === 'https:'

  
    )
```

### Event: 'will-navigate'

Rückgabewert:

* `url` String

Wird angezeigt, wenn ein Benutzer oder die Seite die Navigation starten möchte. Dies kann vorkommen, wenn das `window.location` Objekt geändert wird oder ein Benutzer auf einen Link auf der Seite klickt.

Dieses Ereignis wird nicht ausgesendet, wenn die Navigation programmgesteuert mit APIs wie `<webview>.loadURL` und `<webview>.back`gestartet wird.

Sie wird auch nicht während der Seitennavigation angezeigt, z. B. durch Klicken auf Ankerlinks oder aktualisieren sie die `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

Das Aufrufen `event.preventDefault()` hat __KEINE Auswirkungen__ .

### Event: 'did-navigate'

Rückgabewert:

* `url` String

Emittiert, wenn eine Navigation abgeschlossen ist.

Dieses Ereignis wird nicht für In-Page-Navigationen angezeigt, z. B. durch Klicken auf Ankerlinks oder Aktualisieren der `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

### Event: 'did-navigate-in-page'

Rückgabewert:

* `isMainFrame` Boolean
* `url` String

Emittiert, wenn eine In-Page-Navigation stattgefunden hat.

Wenn die In-Page-Navigation stattfindet, ändert sich die Seiten-URL, verursacht jedoch keine Navigation außerhalb der Seite. Beispiele hierfür sind, wenn Ankerverknüpfungen angeklickt werden oder wenn das DOM- `hashchange` -Ereignis ausgelöst wird.

### Event: 'close'

Wird ausgelöst, wenn die Gästeseite versucht, sich selbst zu schließen.

Der folgende Beispielcode navigiert durch den `webview` zu `about:blank` , wenn der Gast versucht, sich selbst zu schließen.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => '
  webview.src = 'about:blank'
'
```

### Ereignis: 'ipc-message'

Rückgabewert:

* `channel` String
* `args` any[]

Wird ausgelöst, wenn die Gastseite eine asynchrone Nachricht an die Einbettungsseite gesendet hat.

Mit `sendToHost` Methode und `ipc-message` -Ereignis können Sie zwischen Gastseite und Einbettungsseite kommunizieren:

```javascript
In Einbettungsseite.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => '
  console.log(event.channel)
  / / Druckt "pong"
')
webview.send('ping')
```

```javascript
Auf der Gästeseite.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => '
  ipcRenderer.sendToHost('pong')

```

### Event: 'crashed'

Wird ausgelöst, wenn der Renderer-Prozess abgestürzt ist.

### Event: 'plugin-crashed'

Rückgabewert:

* `name` String
* `version` String

Wird ausgelöst, wenn ein Plugin-Prozess abgestürzt ist.

### Event: 'destroyed'

Wird ausgelöst, wenn die WebContents zerstört werden.

### Event: 'media-started-playing'

Emittiert wenn ein Media Element anfängt zu spielen.

### Event: 'media-paused'

Emittiert, wenn Medien angehalten oder die Wiedergabe beendet ist.

### Event: 'did-change-theme-color'

Rückgabewert:

* `themeColor` String

Emittiert, wenn sich die Designfarbe einer Seite ändert. Dies ist in der Regel auf das Auftreten eines Meta-Tags zurückzuführen:

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

Rückgabewert:

* `url` String

Emittiert, wenn sich die Maus über einen Link bewegt oder die Tastatur den Fokus auf einen Link verschiebt.

### Event: 'devtools-opened'

Emittiert wenn die DevTools geöffnet wurden.

### Event: 'devtools-closed'

Emittiert wenn die DevTools geschlossen wurden.

### Event: 'devtools-focused'

Emittiert, wenn DevTools fokussiert / geöffnet wird.

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
