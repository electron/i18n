# `<webview>` Tag

> Ipakita ang panlabas na nilalaman ng web sa mga liblib na anyu at proseso.

Proseso:[Tagabigay](../tutorial/quick-start.md#renderer-process)

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

## Mga pamamaraan ng CSS notes

Paki tandaan na ang `webview` tag's na estilo ay gumagamit `displey:fleks;` internali upang makasiguro na ang batang `object` elemento pumuno sa buong taas at lapad ng `webview` container kung saan magagamit na may tradisyonal at layout na fleksbaks (mula v.0.36.11). Pakisuyo na hindi magpatung-sulat sa defolt `displey:fleks;` CSS na ari-arian, maliban sa isinasaad `displey:fleks;` para sa inlayn na layout.

`webview` ay may isyo habang nakatago gamit ang `hidden` katangian o gamit `displey: wala;`. Na makasanhi ng di-pangkaraniwang pagsasalin sa loob ng bata `browserplugin` objek at ang pahina ng web ay naka-relod habang `webview` ay hindi nakatago. Ang rekomendadong pamamaraan ay dapat itago ang `webview` gamit ang `pagpapakita: nakatago`.

```html
<style>
  webview {
    display:inline-flex;
    width:640px;
    height:480px;
  }
  webview.hide {
    visibility: hidden;
  }
</style>
```

## Katangian ng Tag

Ang `webview` na tag ay may sumusunod na katangian:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Ibinabalik ang makikitang URL. Pagsulat sa mga katangian ang nagsimula ng top-lebel nabigasyon.

Pag-aatas `src` sa kanyang sariling balyu ay pagreload ng kasalukuyang pahina.

Ang `src` katangian ay maaring ding tumanggap ng mga datos sa URL, tulad ng `datos:text/plain,Hello,world!`.

### `autosize`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

Habang ang katangian na ito ay naroroon sa `webview` kontayner ay magiging awtomatikong magbago ng laki sa loob ng hangganan na tinutukoy sa mga katangian `minwidth`, `minheight`. `maxwidth`, at `maxheight`. Mga limitasong hindi makakaapekto sa `webview` maliban `autosize` ay pinagana. Habang ang `autosize` ay pinagana, ang `webview` kontayner na laki ay hindi maging mababa kaysa sa minimum na balyos o hindi tataas sa pinakamataas.

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Kapag itong katangian ay mayroon sa pahina ng panauhin sa `webview` ay magkakaroon ng integrasyon sa nod ang maaring maggamit sa node APIs tulad `require` at `process` para maka-access sa maliliit na lebel sa antas ng sistema. Integarason sa node ay hindi pinagana batay sa default ng pahina nag panauhin.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Habang ang katangian na ito ay mayroon sa pahina ng panauhin sa `webview` ay maaring maggamit samga browser plugins. Plugins ay hindi pinagana sa default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Tinutukoy ang isang iskrip ma makakarga bago ang ibang iskrips na tumakbo sa pahina ng panauhin. Ang protokol ng iskrips URL ay dapat maging `file:` or `asar:`, dahil ito ay makakarga sa `require` sa pahina ng panauhin sa ilalim ng hood.

Habang ang pahina ng panauhin ay walang integrasyon na node ang iskrip na ito ay maari paring maka-access sa lahat ng Node APIs, pero gobal na objeks ay naka-injek kay Node at ito ay matatangal pagkatapos ng iskrip na matapos ang ginagawa.

**Paalala:** Ang opsyon na ito ay maaring lumitaw bilang `preloadURL`(hindi `preload`) sa `webPreferences` na tumutukoy sa `will-attach-webview` na pangyayari.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Nagtatakda ng referral na URL para sa pahina ng mga panauhin.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Nagtatakda sa mga gumagamit na ahente para sa pahina ng panauhin bago i-navigate sa pahina. Kapag ang pahina ay nakarga na, gamitin and `setUserAgent` na paraan para palitan ang ahente ang gumagamit.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Habang itong katangian mayroon ang pahina ng panauhin hindi pinagana ang seguridad sa web. Ang seguridad sa web ay pinagana sa default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electron.atom.io" partition="electron"></webview>
```

Itakda ang sesyon na ginamit sa pahina. Kapag `partition` ay nagsimula sa `persist:`, ang pahina ay gagamit ng masugid na sesyon na magagamit sa lahat ng pahina sa app na may kaparihang `partition`. kung wala naman `persist:` na panlapi, ang pahina ay gagamit na in-memory na sesyon. Sa pag-aatas ng kaparihang `partition`, maramihang pahina ang pwede maibahagi sa parehang sesyon. Kung ang `partition` ay di pa na set pagkatapos ang default na sesyon ng app ay magagamit.

Itong balyo lang ang pwede mabago bago ang unang nabigasyon, mula sa sesyon sa aktibong tagabahagi ang proseso ay di magbabago. Kasunod na pagtatangka na baguhin ang balyo ay mabibigo na may DOM eksepsyon.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Habang itong katangian ay mayroon ang pahina ng panauhin ay maaring buksan ang mga bagong bintana. Popups ay hindi pinagana sa default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Isang listahan mg mga string na tumutukoy sa web preferencies na iiset sa webview, pinaghihiwaly ng `,`. Ang buong listahan ay supportado ng preference strings na makikita sa [BrowserWindow](browser-window.md#new-browserwindowoptions).

Ang string sumusunod sa kapareihang pormat bilang sa katangian ng string sa `window.open`. Ang pangalan ay ibinigay mismo ng `true` bollean balyo. Isang preference ay maaring mag takda ng ibang balyo kabilang ang `=`, kasunod ng balyo. Tumutukoy sa balyo na `yes` at `1` ay inerterprit sa `true`, habang `no` at `` ay binigyang-kahulugan ng `false`.

### `blinkfeatures`

```html
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Ang lishtahan ng mga pisi na tumutukoy sa blink na katangian na pinagana ay pinaghihiwalay ng `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) na fayl.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Ang listahan ng strings na tumutukoy sa blink na katangian ay maaring di-pinagana sa paghihiwalay ng `,`. Ang buong listahan ng supportadong katangian ng pisi ay makikita sa [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) na fayl.

### `guestinstance`

```html
<webview src="https://www.github.com/" guestinstance="3"></webview>
```

Ang balyo na nag-uugnay sa webview sa isang partikular na webContents. Kung ang webview ay unang kargahin ang bagong webContents ay nilikha ang mga katangian na itakda sa tagatukoy ng pagkakataon. Ang pagtatakda sa ganitong katangian sa bagong o umiiral na webview ay kumunekta sa mga umiiral webContents na kasalukuyang nagbibigay sa ibang webview.

Ang umiiral na webview ay makikita ang `destroy` na kaganapan at lilikha ng bagong webContents habang ang bagong url ay nakakarga.

### `disableguestresize`

```html
<webview src="https://www.github.com/" disableguestresize></webview>
```

Habang ang katangian na naroroon sa `webview` ang nilalaman ay nahadlang sa pag-resizing habang ang `webview` na elemento ay mismong naka resized.

Ito ay magagamit sa kombinasyon na may [`webContents.setSize`](web-contents.md#contentssetsizeoptions) na manu-manong baguhin ang laki sa nilalaman ng webview bilang reaksyon sa pagbago ng laki sa bintana. Ito ay maaring gawin na resizing na mas mabilis kompara kung nag-aasa sa elemento ng webview papunta sa awtomatic pag bago ng laki sa mga nilalaman.

```javascript
const {webContents} = require('electron')

// We assume that `win` points to a `BrowserWindow` instance containing a
// `<webview>` with `disableguestresize`.

win.on('resize', () => {
  const [width, height] = win.getContentSize()
  for (let wc of webContents.getAllWebContents()) {
    // Check if `wc` belongs to a webview in the `win` window.
    if (wc.hostWebContents &&
        wc.hostWebContents.id === win.webContents.id) {
      wc.setSize({
        normal: {
          width: width,
          height: height
        }
      })
    }
  }
})
```

## Pamamaraan

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
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `httpReferrer` String(opsyonal) - Ang tagabigay ng HTTP url.
  * `userAgent` String(opsyonal) - Ang ahente na gumagamit ng pinagmumulan ng kahilingan.
  * `extraHeaders` String(opsyonal) - Sobrang ulunan ay pinaghihiwalay sa "\n"
  * `postData`([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional) Context | Request Context
  * `baseURLForDataURL` String(opsyonal) - Basi nag url (may tagapahiwalay sa landas ng separator) para sa mga dokumento na kakargahin sa pamamagitan ng datos ng url. Ito ay kailangan kung ang tinutukoy ng `url` iy isang datos ng url at kailangan maikarga sa ibang dokumento.

Kakargahin ang `url` sa webview, ang `url` ay dapat magkaroon ng protokol na panlapi, e.g ang `http://` or `file://`.

### `<webview>.getURL()`

Nagbabalik `String` - Ang URL ng pahina ng panauhin.

### `<webview>.getTitle()`

Nagbabalik `String` - Ang titulo ng pahina ng panauhin.

### `<webview>.isLoading()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay nakakarga pa rin.

### `<webview>.isWaitingForResponse()`

Nagbabalik `Boolean` - Kung ang pahina ng panauhin ay naghihintay ng unang-sagot para sa pangunahing mapagkukunan ng pahina.

### `<webview>.stop()`

Nagtitigil ng anumang nakabingbing na nabigasyon.

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

Nagbabalik `Boolean` - Kung saan ang proseso ng tagapagbigay ay nasira.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Pumupatong sa gumagamit na ahente para sa pahina ng panauhin.

### `<webview>.getUserAgent()`

Nagbabalik `String` - Ang gumagamit na ahente para sa pahina ng panauhin.

### `<webview>.insertCSS(css)`

* `css` String

Paglagay ng CSS sa pahina ng panauhin.

### `<webview>.executeJavaScript(code, userGesture, callback)`

* `code` String
* `userGesture` Boolean - Default `false`.
* `pagbalik tawag` Gumagana (opsyonal) - Tinawag pagkatapos ang iskrip ay ginawa. 
  * `result` Any

Sinusuri `code` sa pahina. Kung `userGesture` ay nakatakda, ito ay lilikha ng konteksto ng kilos ng gugamit sa pahina. HTML APIs tulad ng `requestFullScreen`, na nangangailangan ng aksyon sa gugamit, ay maaring kumuha ng kalamangan para sa opsyon ng otomasyon.

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

### `<webview>.inspectServiceWorker()`

Ang pagbukas ng DevTools para sa konteksto sa serbisyo ng trabahanti ay naroroon sa pahina ng panauhin.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Ang pagtakda nag pahina sa panauhin na naka tahimik.

### `<webview>.isAudioMuted()`

Nagbabalik `Boolean` - Kung saan ang pahina ng panauhin ay naka tahimik.

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

* `text` String - Ang nilalaman na maaring suriin, ay dapat may laman.
* `mga pagpipilian` Mga bagay (opsyonal) 
  * `abanti` Boolean - (opsyonal) Kung mananaliksik ka ng paabanti o patalikod, defaults sa `true`.
  * `findNext` Boolean - (opsyonal) Kung ang operasyon isang kahilingan o isang pagsasagawang kasunod, mga defaults sa `false`.
  * `matchCase` Boolean - (opsyonal) Kung saan ang paghahanap ay dapat case-sensitive, mga defaults sa `false`.
  * `wordStart` Boolean - (opsyonal) Kung saan maghahanap ka lang ng simula ng salita. mga defaults sa `false`.
  * `medialCapitalAsWordStart` Boolean - (opsyonal) Kung ang pinagsama na may `wordStart`, tinatanggap ang kapareha sa gitna ng salita at kung ang kapareha nag nagsimula ng malaking titik at sinundan ng maliit na titik o walang-letter. Tinatanggap ang ilan na ibang intra-salitang magkapareha, mga defaults `false`.

Simulan ng kahilingan para makahanap ng lahat ng magkapareha para sa `text` sa pahina ng web ang nagbalik sa `integer` kumakatawan sa kahilingan na id na naggamit para sa kahilingan. Ang resulta ng mga kahilingan ay maaring makuha sa pag-subscribe sa [`matatagpuan-sa-pahina`](webview-tag.md#event-found-in-page) na kaganapan.

### `<webview>.stopFindInPage(action)`

* `aksyon` String - Tinitiyak ang aksyon na mangyayari sa katapusan [`<webview>.findInPage`](webview-tag.md#webviewtagfindinpage) hiling. 
  * `clearSelection` - Tanggalin ang mga napili.
  * `keepSelection` - I-translate ang mga napili para maging normal.
  * `activateSelection` - Ipukos at iclick ang node ng napili.

Itigil ang anumang `findInPage` na hinihiling para sa `webview` na may kaukulang `aksyon`.

### `<webview>.print([options])`

* `mga pagpipilian` Mga bagay (opsyonal) 
  * `silent` Boolean (opsyonal) - Huwag itanong sa user sa mga setting sa pagpapaimprinta. Ang naka-default ay `false`.
  * `printBackground` Boolean (opsyonal) - Iniimprinta rin ang kulay ng background at ang mukha ng web page. Ang naka-default ay `false`.
  * `deviceName` String (opsyonal) - Itakda ang pangalan ng gagamiting printer na gagamitin. Ang naka-default ay `"`.

Inimprinta ang web page ng `webview`. Pareho sa `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `mga pagpipilian` Bagay 
  * `marginsType` Integer - (opsyonal) Itinatakda ang uri ng mga margin na gagamitin. Gumagamit ng 0 para sa naka-default na margin, 1 para sa walang margin, at 2 para sa pinakamaliit na maaaring gawing margin.
  * `pageSize` String - (optional) Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean - (optional) Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean - (optional) Whether to print selection only.
  * `landscape` Boolean - (optional) `true` for landscape, `false` for portrait.
* `tumawag muli` Punsyon 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `tumawag muli` Punsyon 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` anuman[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the `ipcRenderer` module.

See [webContents.send](web-contents.md#webcontentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#webcontentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### `<webview>.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

## DOM events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Magbabalik ng:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

Magbabalik ng:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

Magbabalik ng:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'did-get-response-details'

Magbabalik ng:

* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* ang `referer` String
* `headers` Object
* `resourceType` String

Fired when details regarding a requested resource is available. `status` indicates socket connection to download the resource.

### Event: 'did-get-redirect-request'

Magbabalik ng:

* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean

Fired when a redirect was received while requesting a resource.

### Event: 'dom-ready'

Fired when document in the given frame is loaded.

### Event: 'page-title-updated'

Magbabalik ng:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Event: 'page-favicon-updated'

Magbabalik ng:

* `favicons` String[] - Array of URLs.

Fired when page receives favicon urls.

### Event: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Event: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

Magbabalik ng:

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

### Event: 'found-in-page'

Magbabalik ng:

* `result` Bagay 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](webview-tag.md#webviewtagfindinpage) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Event: 'new-window'

Magbabalik ng:

* `url` String
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which should be used for creating the new `BrowserWindow`.

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const {shell} = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})
```

### Event: 'will-navigate'

Magbabalik ng:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Event: 'did-navigate'

Magbabalik ng:

* `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### Event: 'did-navigate-in-page'

Magbabalik ng:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

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

Magbabalik ng:

* `channel` String
* `args` Array

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can easily communicate between guest page and embedder page:

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
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

Fired when the renderer process is crashed.

### Event: 'gpu-crashed'

Fired when the gpu process is crashed.

### Event: 'plugin-crashed'

Magbabalik ng:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### Event: 'destroyed'

Fired when the WebContents is destroyed.

### Event: 'media-started-playing'

Emitted when media starts playing.

### Event: 'media-paused'

Emitted when media is paused or done playing.

### Event: 'did-change-theme-color'

Magbabalik ng:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

Magbabalik ng:

* `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### Event: 'devtools-opened'

Emitted when DevTools is opened.

### Event: 'devtools-closed'

Emitted when DevTools is closed.

### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.