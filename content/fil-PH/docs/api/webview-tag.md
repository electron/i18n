# `<webview>` Pananda

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5. You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Overview

> Ipakita ang panlabas na nilalaman ng web sa mga liblib na anyu at proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Gumamit ng `webview` tag sa embed na 'panauhin' nilalaman(tulad ng pahina sa web) sa iyong Electron app. Ang nilalaman ng panauhin ay may nakalagay sa loob ng container na `webview`. Ang naka-embed na pahina sa loob ng iyong app kontrol kung paano ang nilalaman ng panauhin ay nailatag at naibigay.

Hindi tulad ng `iframe`, ang `webview` ay tumatakbo sa hiwalay na proseso kaysa ginagamit mong app. Ito ay walang parehang pahintulot tulad ng web na pahina at ang lahat ng mga interaskyon pagitan sa iyong app ang naka-embed na nilalaman ay magiging asinkrunos. Ito ay pinapanatili ang iyong app na ligtas sa mga naka-embed na nilalaman. **Paalala:** Lahat ng paraan ay tinatawag sa webview galing sa unang pahina na nangangailangan a asinkrunos na tawag papunta sa pangunahing proseso.

## Halimbawa

Para i-embed ang pahina ng web sa iyong app, Idagdag ang `webview` tag sa iyong app's na taga-embed na pahina (Ito ang app na pahina na makikita sa panauhin na nilalaman). Sa kanyang pinakasimpleng porma, ang `webview` tag kasama ang `src` sa pahina ng web at css na estilo na ikontrol ang itsura ng `webview` container:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Kung gusto mong ikontrol ang nilalaman ng panauhin sa anumang paraan, maari kang sumulat sa JavaScript na nakikinig para `webview` pangyayari at tumutugon sa mga pangyayari gamit ang `webview` na pamamaraan. Ito ang mga halimbawang kod na may dalawang tagapakinig na pangyayari: isa na nakikinig sa pahina ng web upang simulan ang pagloloding, ang isa naman sa pahina ng web na patigilin ang pag loloding, at nagpapakita ng "loding..." na mensahe habang sa lod taym:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## Mga pamamaraan ng CSS notes

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Katangian ng Tag

Ang `webview` na tag ay may sumusunod na katangian:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Ibinabalik ang makikitang URL. Pagsulat sa mga katangian ang nagsimula ng top-lebel nabigasyon.

Pag-aatas `src` sa kanyang sariling balyu ay pagreload ng kasalukuyang pahina.

Ang `src` katangian ay maaring ding tumanggap ng mga datos sa URL, tulad ng `datos:text/plain,Hello,world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

Experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is available by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will be appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be enabled separated by `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) na fayl.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) na fayl.

## Mga Paraan

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Mga halimbawa**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` Ang URL
* `mga opsyon` Na Bagay (opsyonal) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` Pisi (opsyonal) - Isang ahenteg gumagamit na nagmumula sa kahilingan.
  * `extraHeaders` Pisi (opsyonal) - Mga dagdag na header na pinaghihiwalay ng "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` Pisi (opsyonal) - Base url (na may trailing path separator) para sa mga dokumento na mai-load ng url ng data. Ito ay kinakailangan lamang kung ang tinutukoy na `url` ay isang url ng data at kailangang mag-load ng iba pang mga file.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Kakargahin ang `url` sa webview, ang `url` ay dapat magkaroon ng protokol na panlapi, e.g ang `http://` or `file://`.

### `<webview>.downloadURL(url)`

* `url` Tali

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Nagbabalik `String` - Ang URL ng pahina ng panauhin.

### `<webview>.getTitle()`

Nagbabalik `String` - Ang titulo ng pahina ng panauhin.

### `<webview>.isLoading()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay nakakarga pa rin.

### `<webview>.isLoadingMainFrame()`

Ibinabalik `Boolean` - Kung ang pangunahing frame (at hindi lamang mga iframe o mga frame sa loob nito) ay naglo-load pa rin.

### `<webview>.isWaitingForResponse()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay naghihintay ng unang-sagot para sa pangunahing mapagkukunan ng pahina.

### `<webview>.stop()`

Hinihinto ang anumang nakabinbing nabigasyon.

### `<webview>.reload()`

Ikarga muli ang pahina ng panauhin.

### `<webview>.reloadIgnoringCache()`

Ikarga muli ang pahina ng panauhin at ang hindi napansin na cache.

### `<webview>.canGoBack()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay hindi makabalik.

### `<webview>.canGoForward()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay makaka-abanti.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay makakapunta sa `offset`.

### `<webview>.clearHistory()`

Linisin ang kasaysayan ng nabigasyon.

### `<webview>.goBack()`

Gawin na ang pahina ng panauhin na bumalik.

### `<webview>.goForward()`

Gawin ang pahina ng panauhin na sumulong.

### `<webview>.goToIndex(index)`

* `index` Integer

Ang nabigasyon sa tinutukoy na lubos na index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Ang nabigasyon sa tinutukoy na offset galing sa "kasalukuyang entri".

### `<webview>.isCrashed()`

Ibinabalik `Boolean` - Kapag ang proseso ng tagapag-render ay nawasak.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` na String

Pumupatong sa gumagamit na ahente para sa pahina ng panauhin.

### `<webview>.getUserAgent()`

Nagbabalik `String` - Ang gumagamit na ahente para sa pahina ng panauhin.

### `<webview>.insertCSS(css)`

* `css` Pisi

Paglagay ng CSS sa pahina ng panauhin.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.
* `callback` Function (opsyonal) - Tinawagan pagkatapos na maisakatuparan ang iskrip. 
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sinusuri ang mga `code` sa pahina. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

**[Deprecated Soon](modernization/promisification.md)**

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sinusuri ang mga `code` sa pahina. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

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

Pagsingit `text` para sa nakapukos na elemento.

### `<webview>.findInPage(text[, options])`

* `teksto` String - Ang nilalaman na hahanapin, ay hindi dapat walang laman.
* `pagpipilian` Bagay (opsyonal) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Ibinabalik `Integer` - Ang kahilingang id na ginagamit para sa kahilingan.

Magsisimula ng isang kahilingan upang mahanap ang lahat ng mga tugma para sa `text` sa pahina ng web. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `aksyon` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request. 
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - Isalin ang seleksyon sa isang normal na seleksyon.
  * `activateSelect` - Tumuon at i-click ang node ng pagpili.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Bagay (opsyonal) 
  * `silent` Boolean (opsyonal) - Huwag itanong sa user sa mga setting sa pagpapaimprinta. Ang naka-default ay `false`.
  * `printBackground` Boolean (opsyonal) - Iniimprinta rin ang kulay ng background at ang mukha ng web page. Ang naka-default ay `false`.
  * `deviceName` String (opsyonal) - Itakda ang pangalan ng gagamiting printer na gagamitin. Ang naka-default ay `"`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `pagpipilian` Bagay 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

**[Deprecated Soon](modernization/promisification.md)**

### `<webview>.printToPDF(options)`

* `pagpipilian` Bagay 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Para ma-makuha ang bounds
* `callback` Punsyon 
  * `image` [NativeImage](native-image.md)

Kumukuha ng isang snapshot ng pahina sa loob ng `rect`. Sa oras na makumpleto `callback` ay tatawagan `callback(imahe)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

**[Deprecated Soon](modernization/promisification.md)**

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Ang kabuuan ng page na kukuhanin.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Magpadala ng mensahe na asynchronous para maisagawa ang proseso sa pamamagitan ng `channel`. pwede mo ring ipadala ang mga argumento na arbitraryo. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

Nagpapadala ng input na `event` sa page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `kadahilanan`Numero - Zoom factor.

Binabago ang factor ng pag-zoom sa tinukoy na factor. Ang factor ng pag-zoom ay porsiyento ng zoom na hinati sa 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `antas` Numero - antas ng Zoom.

Binabago ang antas ng pag-zoom para sa tinitiyak na antas. Ang orihinal na laki ng 0 at bawat isa Ang pagdagdag sa pagtaas o sa pagbaba ay kumakatawan sa pag-zooming ng 20% na mas malaki o mas maliit sa default mga limitasyon ng 300% at 50% ng orihinal na laki, ayon sa pagkakabanggit. The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Itinatakda ang pinakamataas at pinakamababang antas ng pinch-sa-zoom.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Nagtatakda ng pinakamataas at pinakamababa na antas batay sa layout (i.e hindi visual) na antas ng zoom.

### `<webview>.showDefinitionForSelection()` *macOS*

Pinapakita ang pop-up na diksyonaryo na naghahanap ng mga napiling salita sa page.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## Mga event ng DOM

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Ibinabalik ang:

* `url` Tali
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

Pagbabalik:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

Pagbabalik:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Kaganapan: 'dom-ready'

Fired when document in the given frame is loaded.

### Event: 'page-title-updated'

Pagbabalik:

* `title` String
* `explicitSet` Boolean

Itigil kapag ang titulo ng page ay naitakdang habang naka-nabigasyon. Ang `explicitSet` ay di totoo kapag ang titulo ay nabuo mula sa file url.

### Kaganapan: 'pahina-favicon-updated'

Pagbabalik:

* `favicons` String[] - Hanay ng mga URL.

Fired when page receives favicon urls.

### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

Pagbabalik:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Kaganapan: 'natagpuan-sa-pahina'

Ibinabalik ang:

* `resulta` Bagay 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong tugma.
  * `tugma` Integer - Bilang ng Mga Tugma.
  * `selectionArea` Layunin - Coordinates ng unang rehiyon ng pagtutugma.
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

### Kaganapan: 'bagong-bintana'

Pagbabalik:

* `url` Tali
* `frameName` Pisi
* `Disposisyon` String - Maaaring `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` at `iba pang`.
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Kaganapan: 'mag-navigate'

Pagbabalik:

* `url` Tali

Napalabas kapag nais ng isang user o ng pahina na magsimulang mag-navigate. Maaari itong mangyari kung kailan ang bagay na `bintana.lokasyon` ay nagbago o ang isang gumagamit ay nag-click ng isang link sa pahina.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Kaganapan: 'ginawa-navigate'

Pagbabalik:

* `url` Tali

Emitted when a navigation is done.

Ang kaganapang ito ay hindi ipinapalabas para sa pag-navigate sa pahina, tulad ng pag-click sa mga link ng anchor o pag-update ng `bintana.lokasyon.hash`. Gamit ang `ginawa-navigate-sa-pahina` kaganapan para sa layuning ito.

### Kaganapan: 'ginawa-navigate-in-page'

Pagbabalik:

* `isMainFrame` Boolean
* `url` Tali

Emitted when an in-page navigation happened.

Kapag nangyayari ang pag-navigate sa pahina, ang pahina ng URL ay nagbabago ngunit hindi ito magiging dahilan ng nabigasyon sa labas ng pahina. Ang mga halimbawa ng nangyari ay kapag ang mga anchor link ay na-click o kapag ang DOM `hashchange` at ang kaganapan ay na-trigger.

### Event: 'isara'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

Pagbabalik:

* `channel` String
* `args` Array

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

### Kaganapan: 'nag-crash'

Fired when the renderer process is crashed.

### Kaganapan: 'plugin-nag-crash'

Pagbabalik:

* `name` String
* `Bersyon` Pisi

Fired when a plugin process is crashed.

### Kaganapan: 'nawasak'

Fired when the WebContents is destroyed.

### Kaganapan: 'media-started-playing'

Naipalalabas kapag nagsimula ng maglaro ang media.

### Kaganapan: 'media-paused'

Naipalalabas kapag ang media ay naka-nakahinto o tapos na ang pag-play.

### Kaganapan: 'ginawa-baguhin-tema-kulay'

Pagbabalik:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Kaganapan: 'update-target-url'

Pagbabalik:

* `url` Tali

Inilalabas kapag gumagalaw ang mouse sa isang link o inililipat ng keyboard ang focus sa isang link.

### Kaganapan: 'devtools-binuksan'

Nilalabas kapag ang DevTools ay nabuksan.

### Kaganapan: 'devtools-sarado'

Nilalabas kapag ang DevTools ay sarado.

### Kaganapan: 'devtools-nakatuon'

Nilalabas kapag ang DevTools ay nakatuon/binuksan.