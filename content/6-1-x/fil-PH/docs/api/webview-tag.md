# `<webview>` Pananda

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5.  You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Overview

> Ipakita ang panlabas na nilalaman ng web sa mga liblib na anyu at proseso.

Mga proseso: [Renderer](../glossary.md#renderer-process)

Gumamit ng `webview` tag sa embed na 'panauhin' nilalaman(tulad ng pahina sa web) sa iyong Electron app. Ang nilalaman ng panauhin ay may nakalagay sa loob ng container na `webview`. Ang naka-embed na pahina sa loob ng iyong app kontrol kung paano ang nilalaman ng panauhin ay nailatag at naibigay.

Hindi tulad ng `iframe`, ang `webview` ay tumatakbo sa hiwalay na proseso kaysa ginagamit mong app. Ito ay walang parehang pahintulot tulad ng web na pahina at ang lahat ng mga interaskyon pagitan sa iyong app ang naka-embed na nilalaman ay magiging asinkrunos. Ito ay pinapanatili ang iyong app na ligtas sa mga naka-embed na nilalaman. **Note:** Most methods called on the webview from the host page require a synchronous call to the main process.

## Mga halimbawa

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

Returns the visible URL. Writing to this attribute initiates top-level navigation.

Pag-aatas `src` sa kanyang sariling balyu ay pagreload ng kasalukuyang pahina.

Ang `src` katangian ay maaring ding tumanggap ng mga datos sa URL, tulad ng `datos:text/plain,Hello,world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Kapag itong katangian ay mayroon sa pahina ng panauhin sa `webview` ay magkakaroon ng integrasyon sa nod ang maaring maggamit sa node APIs tulad `require` at `process` para maka-access sa maliliit na lebel sa antas ng sistema. Integarason sa node ay hindi pinagana batay sa default ng pahina nag panauhin.

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

Specifies a script that will be loaded before other scripts run in the guest page. Ang protokol ng iskrips URL ay dapat maging `file:` or `asar:`, dahil ito ay makakarga sa `require` sa pahina ng panauhin sa ilalim ng hood.

Habang ang pahina ng panauhin ay walang integrasyon na node ang iskrip na ito ay maari paring maka-access sa lahat ng Node APIs, pero gobal na objeks ay naka-injek kay Node at ito ay matatangal pagkatapos ng iskrip na matapos ang ginagawa.

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

Sets the session used by the page. Kapag `partition` ay nagsimula sa `persist:`, ang pahina ay gagamit ng masugid na sesyon na magagamit sa lahat ng pahina sa app na may kaparihang `partition`. kung wala naman `persist:` na panlapi, ang pahina ay gagamit na in-memory na sesyon. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. Kung ang `partition` ay di pa na set pagkatapos ang default na sesyon ng app ay magagamit.

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

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. Ang buong listahan ay supportado ng preference strings na makikita sa [BrowserWindow](browser-window.md#new-browserwindowoptions).

Ang string sumusunod sa kapareihang pormat bilang sa katangian ng string sa `window.open`. Ang pangalan ay ibinigay mismo ng `true` bollean balyo. Isang preference ay maaring mag takda ng ibang balyo kabilang ang `=`, kasunod ng balyo. Tumutukoy sa balyo na `yes` at `1` ay inerterprit sa `true`, habang `no` at `0` ay binigyang-kahulugan ng `false`.

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

Nag `webview` na tag ay may mga susmusunod na pamamaraan:

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
* `options` Object (optional)
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

Injects CSS into the guest page.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.
* `callback` Function (optional) - Called after script has been executed.
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sinusuri ang mga `code` sa pahina. Kung `userGesture` ay nakatakda, ito ay lilikha ng konteksto ng kilos ng gugamit sa pahina. HTML APIs tulad ng `requestFullScreen`, na nangangailangan ng aksyon sa gugamit, ay maaring kumuha ng kalamangan para sa opsyon ng otomasyon.

**[Deprecated Soon](modernization/promisification.md)**

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sinusuri ang mga `code` sa pahina. Kung `userGesture` ay nakatakda, ito ay lilikha ng konteksto ng kilos ng gugamit sa pahina. HTML APIs tulad ng `requestFullScreen`, na nangangailangan ng aksyon sa gugamit, ay maaring kumuha ng kalamangan para sa opsyon ng otomasyon.

### `<webview>.openDevTools()`

Ang pagbukas ng DevTools na bintana para sa pahina ng panauhin.

### `<webview>.closeDevTools()`

Ang pagsirado ng DevTools na bintana para sa pahina ng panauhin.

### `<webview>.isDevToolsOpened()`

Nagbabalik `Boolean` - Kung saan ang pahina ng panauhin ay mayroong DevTools na may bintana na nakalagay.

### `<webview>.isDevToolsFocused()`

Nagbabalik `Boolean` - Kung saan ang bintana ng DevTools ay ang pahina ng panauhin ay nakatuon.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Naguumpisa sa pagsusi sa mga elemnto sa posisyon (`x`, `y`) sa pahina ng panauhin.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Ang pagbukas ng DevTools para sa konteksto sa serbisyo ng trabahanti ay naroroon sa pahina ng panauhin.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Ang pagtakda nag pahina sa panauhin na naka tahimik.

### `<webview>.isAudioMuted()`

Nagbabalik `Boolean` - Kung saan ang pahina ng panauhin ay naka tahimik.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.undo()`

Paggawa ng pag-edit na utos `undo` sa pahina.

### `<webview>.redo()`

Ang paggawa ng pag-edit sa utos na `redo` sa pahina.

### `<webview>.cut()`

Paggawa ng pag-edit na utos na `cut` sa pahina.

### `<webview>.copy()`

Paggawa ng pag-edit sa utos na `copy` sa pahina.

### `<webview>.paste()`

Paggawa ng pag-edit sa utos na `paste` sa pahina.

### `<webview>.pasteAnd MatchStyle()`

Paggawa ng pag-edit sa utos na `pasteAndMatchStyle` sa pahina.

### `<webview>.delete()`

Paggawa ng pag-edit sa utos na `delete` sa pahina.

### `<webview>.selectAll()`

Paggawa ng pag-edit sa utos na `selectAll` sa pahina.

### `<webview>.unselect()`

Paggawa ng pag-edit sa utos na `unselect` sa pahina.

### `<webview>.replace(text)`

* `text` String

Paggawa ng pag-edit sa utos na `replace` sa pahina.

### `<webview>.replaceMisspelling(text)`

* `text` String

Paggawa ng pag-edit sa utos na `replaceMisspelling` sa pahina.

### `<webview>.insertText(text)`

* `text` String

Pagsingit `text` para sa nakapukos na elemento.

### `<webview>.findInPage(text[, options])`

* `teksto` String - Ang nilalaman na hahanapin, ay hindi dapat walang laman.
* `options` Object (optional)
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Ibinabalik `Integer` - Ang kahilingang id na ginagamit para sa kahilingan.

Magsisimula ng isang kahilingan upang mahanap ang lahat ng mga tugma para sa `text` sa pahina ng web. Ang resulta ng kahilingan ay maaaring makuha sa pamamagitan ng pag-subscribe sa [`found-in-page`](webview-tag.md#event-found-in-page) kaganapan.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - Isalin ang seleksyon sa isang normal na seleksyon.
  * `activateSelect` - Tumuon at i-click ang node ng pagpili.

Itigil ang anumang `findInPage` na hinihiling para sa `webview` na may kaukulang `aksyon`.

### `<webview>.print([options])`

* `options` Object (optional)
  * `silent` Boolean (optional) - Don't ask user for print settings. Ang default ay `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Ang default ay `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `options` Object
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` na Function
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

**[Deprecated Soon](modernization/promisification.md)**

### `<webview>.printToPDF(options)`

* `options` Object
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Para ma-makuha ang bounds
* `callback` na Function
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

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

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

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

### `<webview>.showDefinitionForSelection()` _macOS_

Pinapakita ang pop-up na diksyonaryo na naghahanap ng mga napiling salita sa page.

### `<webview>.getWebContents()`

Bumalik sa [`WebContents`](web-contents.md) - Ang laman ng web ay naka-ugnay sa `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM events

Ang mga sumusunod na event ng DOM ay nasa tanda ng `webview`:

### Event: 'load-commit'

Pagbabalik:

* `url` Tali
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Itigil kapag natapos na ang nabigasyon, i.e. ang taga-ikot ng tab ay huminto sa pag-ikot, at ang event na `onload` ay na-dispatch.

### Event: 'did-fail-load'

Pagbabalik:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

Ang event na ito ay tulad ng `did-finish-load`, pero natigil nung nag-fail ang load o nakansela, e.g. `window.stop()` ay na-invoke.

### Kaganapan: 'ginawa-frame-finish-load'

Pagbabalik:

* `isMainFrame` Boolean

Itigil kapag natapos na ang nabigasyon ng frame.

### Kaganapan: 'did-start-loading'

Tumutugon sa mga puntos ng oras kung kailan nagsimulang umikot ang taga-ikot ng tab.

### Kaganapan: 'did-stop-loading'

Tumutugon sa mga puntos ng oras kung kailan huminto sa pag-ikot ang taga-ikot ng tab.

### Kaganapan: 'dom-ready'

Itigil kapag ang dokumento ng sinasabing frame ay na-load.

### Event: 'page-title-updated'

Pagbabalik:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Kaganapan: 'pahina-favicon-updated'

Pagbabalik:

* `favicons` String[] - Hanay ng mga URL.

Itigil kapag nakatanggap ang page ng mga url na favicon.

### Event: 'enter-html-full-screen'

Itigil kapag ang page ay naka-fullscreen na dulot ng HTML API.

### Event: 'leave-html-full-screen'

Itigil kapag ang page ay hindi na naka-fullscreen na dulot ng HTML API.

### Event: 'console-message'

Pagbabalik:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Itigil kapag ang guest window ay nagtalaga ng mensahe na konsol.

Ang mga sumunod na halimbawa na mga code ay pinapasa ang lahat ng mga mensaheng nakatalaga sa konsol ng embedder na hindi nakapaloob sa nakatalagang lebel o iba pang mga katangian.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Kaganapan: 'natagpuan-sa-pahina'

Pagbabalik:

* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong tugma.
  * `tugma` Integer - Bilang ng Mga Tugma.
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

Itigil kung meron ng resulta sa hinihingi ng [`webview.findInPage`](#webviewfindinpagetext-options).

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

Itigil kapag ang guest page ay sinusubukang magbukas ng bagong browser window.

Ang mga sumusunod na halimbawa na code ay nagbubukas ng bagong url sa nakadefault na browser sa sistema.

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

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

Itong event na ito ay hindi ilalabas kapag ang nabigasyon ay na-istart na ang gamit ay programa na may mga API tulad ng `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.

### Kaganapan: 'ginawa-navigate'

Pagbabalik:

* `url` Tali

Nilalabas kapag ang nabigasyon ay natapos na.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Kaganapan: 'ginawa-navigate-in-page'

Pagbabalik:

* `isMainFrame` Boolean
* `url` Tali

Inilalabas kapag nangyari ang pag-navigate sa pahina.

Kapag nangyayari ang pag-navigate sa pahina, ang pahina ng URL ay nagbabago ngunit hindi ito magiging dahilan ng nabigasyon sa labas ng pahina. Ang mga halimbawa ng nangyari ay kapag ang mga anchor link ay na-click o kapag ang DOM `hashchange` at ang kaganapan ay na-trigger.

### Event: 'isara'

Itigil kung ang guest page ay sinubukang isara ang sarili.

Ang mga sumusunod na halimbawa na mga code ay ninanavigate ang `webview` sa `about:blank` kapag ang bisita ay sinubukang isara ang sarili.

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

Itigil kapag ang guest page ay nagpadala ng mensahe na asynchronous sa embedder page.

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

Itigil kapag ang nag-crash ang proseso na nagsumite.

### Kaganapan: 'plugin-nag-crash'

Pagbabalik:

* `name` String
* `Bersyon` Pisi

Itigil kapag ang proseso na plug-in ay nagcrash.

### Kaganapan: 'nawasak'

Itigil kapag ang nasira ang mga WebContent.

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
