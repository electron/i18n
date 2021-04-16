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

Eine `String` , die die von der Seite verwendete Sitzung festlegt. Wenn `partition` mit `persist:`beginnt, verwendet die Seite eine persistente Sitzung, die für alle Seiten in der App mit dem gleichen `partition`verfügbar ist. if there is no `persist:` prefix, the page will use an in-memory session. Durch Zuweisen derselben `partition`können mehrere Seiten derselben Sitzung gemeinsam nutzen. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Ein `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

## Methoden

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Beispiel**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Objekt (optional)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (optional) – Ein Benutzer-Agent, der die Anforderung stammt.
  * `extraHeaders` String (optional) - Zusätzliche Header getrennt durch "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Stops any pending navigation.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Clears the navigation history.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Rückgaben `Promise<void>`

Füge `text` in das fokusierte Element ein.

### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Objekt (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

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
  * `pageRanges` Object[] (optional) - The page range to print.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.

Rückgaben `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` -Objekt
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and `width` in microns.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. On macOS, only the first range is honored.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

Gibt `Promise<NativeImage>` zurück - Löst mit einem [NativeImage](native-image.md)

Erfasst eine Momentaufnahme der Seite in `rect`. Wenn Sie `rect` auslassen, wird die gesamte sichtbare Seite erfasst.

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` any[]

Rückgaben `Promise<void>`

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Rückgaben `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom faktor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Rückgaben `Promise<void>`

Setzt das Maximum und Minimum pinch-to-zoom Level.

### `<webview>.showDefinitionForSelection()` _macOS_

Zeigt das Popupwörterbuch an, das das ausgewählte Wort auf der Seite durchsucht.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Rückgabewert:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

Rückgabewert:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

Rückgabewert:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'dom-ready'

Fired when document in the given frame is loaded.

### Event: 'page-title-updated'

Rückgabewert:

* `title` String
* `explicitSet` Boolean

Wird ausgelöst, wenn der Seitentitel während der Navigation festgelegt wird. `explicitSet` ist falsch, wenn Titel aus der Datei-URL synthetisiert wird.

### Event: 'page-favicon-updated'

Rückgabewert:

* `favicons` String[] - Array mit URLs.

Fired when page receives favicon urls.

### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

Rückgabewert:

* `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Event: 'found-in-page'

Rückgabewert:

* `result` -Objekt
  * `requestId` Integer
  * `activeMatchOrdinal` Ganzzahl - Position des aktiven Spiels.
  * `matches` Ganzzahl - Anzahl der Übereinstimmungen.
  * `selectionArea` -Rechteck - Koordinaten des ersten Übereinstimmungsbereichs.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Event: 'new-window'

Rückgabewert:

* `url` String
* `frameName` String
* `disposition` String - Kann `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` und `other`sein.
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Event: 'will-navigate'

Rückgabewert:

* `url` String

Wird angezeigt, wenn ein Benutzer oder die Seite die Navigation starten möchte. Dies kann vorkommen, wenn das `window.location` Objekt geändert wird oder ein Benutzer auf einen Link auf der Seite klickt.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

Calling `event.preventDefault()` does __NOT__ have any effect.

### Event: 'did-navigate'

Rückgabewert:

* `url` String

Emitted when a navigation is done.

Dieses Ereignis wird nicht für In-Page-Navigationen angezeigt, z. B. durch Klicken auf Ankerlinks oder Aktualisieren der `window.location.hash`. Verwenden Sie `did-navigate-in-page` Ereignis, um diesen Zweck .

### Event: 'did-navigate-in-page'

Rückgabewert:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

Wenn die In-Page-Navigation stattfindet, ändert sich die Seiten-URL, verursacht jedoch keine Navigation außerhalb der Seite. Beispiele hierfür sind, wenn Ankerverknüpfungen angeklickt werden oder wenn das DOM- `hashchange` -Ereignis ausgelöst wird.

### Event: 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

Rückgabewert:

* `channel` String
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

Fired when the renderer process is crashed.

### Event: 'plugin-crashed'

Rückgabewert:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### Event: 'destroyed'

Fired when the WebContents is destroyed.

### Event: 'media-started-playing'

Emittiert wenn ein Media Element anfängt zu spielen.

### Event: 'media-paused'

Emittiert, wenn Medien angehalten oder die Wiedergabe beendet ist.

### Event: 'did-change-theme-color'

Rückgabewert:

* `themeColor` String

Emittiert, wenn sich die Designfarbe einer Seite ändert. This is usually due to encountering a meta tag:

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
