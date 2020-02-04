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

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

Pag-aatas `src` sa kanyang sariling balyu ay pagreload ng kasalukuyang pahina.

Ang `src` katangian ay maaring ding tumanggap ng mga datos sa URL, tulad ng `datos:text/plain,Hello,world!`.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

A `Boolean`. Kapag itong katangian ay mayroon sa pahina ng panauhin sa `webview` ay magkakaroon ng integrasyon sa nod ang maaring maggamit sa node APIs tulad `require` at `process` para maka-access sa maliliit na lebel sa antas ng sistema. Integarason sa node ay hindi pinagana batay sa default ng pahina nag panauhin.

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. This option is disabled by default in the guest page.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

A `Boolean`. When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is available by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. Ang protokol ng iskrips URL ay dapat maging `file:` or `asar:`, dahil ito ay makakarga sa `require` sa pahina ng panauhin sa ilalim ng hood.

Habang ang pahina ng panauhin ay walang integrasyon na node ang iskrip na ito ay maari paring maka-access sa lahat ng Node APIs, pero gobal na objeks ay naka-injek kay Node at ito ay matatangal pagkatapos ng iskrip na matapos ang ginagawa.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

A `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. Kapag `partition` ay nagsimula sa `persist:`, ang pahina ay gagamit ng masugid na sesyon na magagamit sa lahat ng pahina sa app na may kaparihang `partition`. kung wala naman `persist:` na panlapi, ang pahina ay gagamit na in-memory na sesyon. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. Kung ang `partition` ay di pa na set pagkatapos ang default na sesyon ng app ay magagamit.

Itong balyo lang ang pwede mabago bago ang unang nabigasyon, mula sa sesyon sa aktibong tagabahagi ang proseso ay di magbabago. Kasunod na pagtatangka na baguhin ang balyo ay mabibigo na may DOM eksepsyon.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

A `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. Ang buong listahan ay supportado ng preference strings na makikita sa [BrowserWindow](browser-window.md#new-browserwindowoptions).

Ang string sumusunod sa kapareihang pormat bilang sa katangian ng string sa `window.open`. Ang pangalan ay ibinigay mismo ng `true` bollean balyo. Isang preference ay maaring mag takda ng ibang balyo kabilang ang `=`, kasunod ng balyo. Tumutukoy sa balyo na `yes` at `1` ay inerterprit sa `true`, habang `no` at `0` ay binigyang-kahulugan ng `false`.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) na fayl.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) na fayl.

## Mga Paraan

Nag `webview` na tag ay may mga susmusunod na pamamaraan:

**Paalala:** Ang webview na elemento ay dapat makarga bago gamitin ang mga pamamaraan.

**Halimbawa**

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

Returns `Promise<void>`

Pagsingit `text` para sa nakapukos na elemento.

### `<webview>.findInPage(text[, options])`

* `teksto` String - Ang nilalaman na hahanapin, ay hindi dapat walang laman.
* `options` Na Bagay (opsyonal) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Ibinabalik `Integer` - Ang kahilingang id na ginagamit para sa kahilingan.

Magsisimula ng isang kahilingan upang mahanap ang lahat ng mga tugma para sa `text` sa pahina ng web. Ang resulta ng kahilingan ay maaaring makuha sa pamamagitan ng pag-subscribe sa [`found-in-page`](webview-tag.md#event-found-in-page) kaganapan.

### `<webview>.stopFindInPage(action)`

* `aksyon` String - Tinitiyak ang aksyon na mangyayari sa katapusan [`<webview>.findInPage`](#webviewfindinpagetext-options) hiling. 
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - Isalin ang seleksyon sa isang normal na seleksyon.
  * `activateSelect` - Tumuon at i-click ang node ng pagpili.

Itigil ang anumang `findInPage` na hinihiling para sa `webview` na may kaukulang `aksyon`.

### `<webview>.print([options])`

* `options` Na Bagay (opsyonal) 
  * `silent` Boolean (opsyonal) - Huwag itanong sa user sa mga setting sa pagpapaimprinta. Ang naka-default ay `false`.
  * `printBackground` Boolean (opsyonal) - Iniimprinta rin ang kulay ng background at ang mukha ng web page. Ang naka-default ay `false`.
  * `deviceName` String (opsyonal) - Itakda ang pangalan ng gagamiting printer na gagamitin. Ang naka-default ay `"`.

Returns `Promise<void>`

Inimprinta ang web page ng `webview`. Pareho sa `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `options` Bagay 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Pwedeng `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` o ang Objek na mayroong `height` at `width` na naka-micron.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (opsyonal) - Ang kabuuan ng page na kukuhanin.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` anuman[]

Returns `Promise<void>`

Magpadala ng mensahe na asynchronous para maisagawa ang proseso sa pamamagitan ng `channel`. pwede mo ring ipadala ang mga argumento na arbitraryo. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

Tignan ang [webContents.send](web-contents.md#contentssendchannel-args) bilang mga halimbawa.

### `<webview>.sendInputEvent(event)`

* `event` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Returns `Promise<void>`

Nagpapadala ng input na `event` sa page.

Tignan ang [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) para sa mga detalyadong paglalarawan ng objek na `event`.

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

Returns `Promise<void>`

Itinatakda ang pinakamataas at pinakamababang antas ng pinch-sa-zoom.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)` *Deprecated*

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Returns `Promise<void>`

Nagtatakda ng pinakamataas at pinakamababa na antas batay sa layout (i.e hindi visual) na antas ng zoom.

**Deprecated:** This API is no longer supported by Chromium.

### `.showDefinitionForSelection()` *macOS*

Pinapakita ang pop-up na diksyonaryo na naghahanap ng mga napiling salita sa page.

### `<webview>.getWebContents()` *Deprecated*

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Pagbabalik:

* `url` Tali
* `ay pangunahing kuwadro` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Kaganapan: 'ginawa-tapusin-dala'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Kaganapan: 'ginawa-mabibigo-dala'

Pagbabalik:

* `pagkakamalingCode`kabuuan
* `Paglalarawan ng pagkakamali`tali
* `napatunayan sa Url`tali
* `ay pangunahing kuwadro` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Kaganapan: 'ginawa-frame-finish-load'

Pagbabalik:

* `ay pangunahing kuwadro` Boolean

Fired when a frame has done navigation.

### Kaganapan: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Kaganapan: 'did-stop-loading'

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
* `mensahe` Tali
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

Pagbabalik:

* `resulta` Bagay 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Posisyon ng aktibong tugma.
  * `tugma` Integer - Bilang ng Mga Tugma.
  * `selectionArea` Rectangle - Coordinates of first match region.
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
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

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

* `ay pangunahing kuwadro` Boolean
* `url` Tali

Emitted when an in-page navigation happened.

Kapag nangyayari ang pag-navigate sa pahina, ang pahina ng URL ay nagbabago ngunit hindi ito magiging dahilan ng nabigasyon sa labas ng pahina. Ang mga halimbawa ng nangyari ay kapag ang mga anchor link ay na-click o kapag ang DOM `hashchange` at ang kaganapan ay na-trigger.

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

Pagbabalik:

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