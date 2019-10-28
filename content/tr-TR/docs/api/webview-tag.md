# `<webview>`Etiket

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Enabling

By default the `webview` tag is disabled in Electron >= 5. You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`. For more information see the [BrowserWindow constructor docs](browser-window.md).

## Genel Bakış

> Harici web içeriğini yalıtılmış bir çerçeve ve işlemde görüntüleme.

İşlem: [Renderer](../glossary.md#renderer-process)

'Misafir' içeriğini (web sayfaları gibi) Electron uygulamanıza gömmek için `webview` etiketini kullanın. Misafir içeriği, `webview` kapsayıcısı tarafından kapsanır. Uygulamanızdaki gömülmüş bir sayfa, konuk içeriğinin nasıl düzenlendiğini ve oluşturulduğunu denetler.

Bir `iframe`'in aksine `webview`, uygulamanızdan ayrı bir süreçte çalışır. Web sayfanızla aynı izinlere sahip olmaz ve uygulamanız ile gömülmüş içerik arasındaki etkileşimler asenkrondur. Bu, gömülmüş içeriğe karşı uygulamanızı güvende tutar. **Not:** Ana sayfadan webview'de çağrılan yöntemlerin çoğu, ana işleme eş zamanlı olarak çağırılmasını gerektirir.

## Örnek

Uygulamanıza bir web sayfası gömmek için, uygulamanızın gömücü sayfasına (misafir içeriğini görüntüleyen uygulama sayfasıdır) `webview` etiketini ekleyin. En basit biçiminde, `webview` etiketi, web sayfasının `src`'unu ve `webview` kapsayıcısının görünümünü denetleyen css stillerini içerir:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Misafir içeriğini herhangi bir şekilde kontrol etmek isterseniz JavaScript'i yazabilirsiniz `webview` olaylarını görüntüler ve bu olaylar`webview` yöntemleridir. İki olay dinleyicisine sahip örnek kod: biri web sayfasını yüklemeye başlamak için dinlerken diğeri web sayfasının yüklemeyi durdurmasını dinler ve yükleme süresi boyunca bir "yükleme..." mesajı görüntüler:

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

## CSS stil notları

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Etiket özellikleri

`webview` etiketi aşağıdaki özellikleri destekler:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

A `String` representing the visible URL. Writing to this attribute initiates top-level navigation.

`src` değerine kendi değerini atamak, mevcut sayfayı yeniden yükler.

`src` özelliği ayrıca `data:text/plain,Merhaba dünya!` gibi veri URL'lerini de kabul eder.

### `düğüm entegrasyonu`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

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

### `eklentiler`

```html
<webview src="https://www.github.com/" plugins></webview>
```

A `Boolean`. When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `önyükleme`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. Komut dosyası URL'sinin protokolü, başlık altındaki misafir sayfasında `require` tarafından yükleneceğinden, `file:` veya `asar:` olmalıdır.

Konuk sayfasında hiçbir düğüm entegrasyonu yoksa, bu komut dosyası tüm Düğüm api'lerine yine de erişime sahip olacak, ama düğüm tarafından enjekte edilen genel nesneler, bu komut dosyası çalışmayı bitirdikten sonra silinecek.

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `kullanıcı temsilcisi`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `web güveliği devredışı`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

A `Boolean`. When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `bölüm`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. `partition` starts with `persist:`ile başlıyorsa, sayfa, uygulamanın aynı `partition` bölümüne sahip tüm sayfalar için kalıcı bir oturum kullanacaktır. `persist:` öneki yoksa, sayfa bir bellek içi oturum kullanacaktır. Aynı `partition` bölümü atayarak, aynı oturumda birden çok sayfa paylaşabilir. `partition` ayıklanırsa, uygulamanın varsayılan oturumu kullanılır.

Bu değer yalnızca ilk gezinmeden önce değiştirilebilir, çünkü oturum aktif bir oluşturucu sürecindeyken değiştiremezsiniz. Ardından, değeri bir DOM hatası ile başarısız olur.

### `pop up'lara izin ver`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

A `Boolean`. When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `web tercihleri`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

A `String` which is a comma separated list of strings which specifies the web preferences to be set on the webview. Desteklenen tercih dizelerinin tam listesi şu adreste bulunabilir [BrowserWindow](browser-window.md#new-browserwindowoptions).

Dize, içindeki özelliklerin türü ile aynı biçimi izler `window.open`. Bir ismin başına `true` boolean değeri verilir. Bir seçenek, izlediği değere `=` dahil edilerek başka bir değere dönüştürülebilir. `yes` ve `1` şeklinde özel değerler `true`, `no` ve `0` şeklindeki özel değerler de `false` olarak yorumlanır.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

### `yanıp sönme özelliklerini devre dışı bırak`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

## Metodlar

`webview` etiketi aşağıda yöntemlere sahiptir:

**Not:** Webview öğesi yöntemleri kullanmadan önce yüklenmiş olmalıdır.

**Örnek**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `seçenekler` Obje (opsiyonel) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Bu, yalnızca belirtilen `url` veri url'si ve diğer dosyaları yüklemek gerekiyorsa gereklidir.

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

Webview'ün içinde `url`'i yükler, `url` prefix protokolünü içermelidir, örneğin: `http://` ya da `file://`.

### `<webview>.downloadURL(url)`

* `url` Dize

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

Returns `String` - Misafir sayfasının URL'si.

### `<webview>.getURL()`

Returns `String` - Misafir sayfasının başlığı.

### `<webview>.isLoading()`

Returns `Boolean` - Misafir sayfası hala kaynakları yüklüyorsa.

### `<webview>.isLoadingMainFrame()`

`Boolean` olarak dönüt verir - (Sadece bilgi iletim birimlerinin veya içindeki birimlerin değil) Ana bilgisayarın hala yüklemekte olup olmadığı.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Misafir sayfası, sayfanın ana kaynağından gelecek bir ilk-karşılığı bekliyorsa.

### `<webview>.dur()`

Bekleyen gezinmeleri durdurur.

### `<webview>.yeniden yükle()`

Misafir sayfasını yeniden yükleyin.

### `<webview>.reloadIgnoringCache()`

Konuk sayfasını yeniden yükler ve önbellek yok sayılır.

### `<webview>.canGoBack()`

Döndür `Boolean` - Konuk sayfanın geri dönüp dönmeyeceğini belirtir.

### `<webview>.canGoForward()`

Returns `Boolean` - Misafir sayfası ilerleyebiliyorsa.

### `<webview>.canGoToOffset(offset)`

* `offset` Tamsayı

Returns `Boolean` - Misafir sayfası `offset`'e gidebiliyorsa.

### `<webview>.clearHistory()`

Gezinme geçmişini temizle.

### `<webview>.goBack()`

Misafir sayfasını geri getirir.

### `<webview>.goForward()`

Ziyaretçi sayfasını ilerletir.

### `<webview>.goToIndex(index)`

* `index` Tamsayı

Belirtilen mutlak dizine gider.

### `<webview>.goToOffset(offset)`

* `offset` Tamsayı

"Geçerli girişten" belirtilen aralıkta gezinir.

### `<webview>.isCrashed()`

`Boolean` olarak dönüt verir - Görselleştirme işleminin arızalanıp arızalanmadığı.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` Dizgi

Konuk sayfasının kullanıcı aracısını geçersiz kılar.

### `<webview>.getUserAgent()`

Returns `String` - Misafir sayfası için kullanıcı aracı.

### `<webview>.insertCSS(css)`

* `css` Dizgi

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` Dizgi
* `userGesture` Boolean (optional) - Default `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sayfadaki `code`'u ölçer. `userGesture` kuruluysa, sayfada kullanıcı hareketleri bağlamını yaratır. `requestFullScreen` gibi kullanıcı hareketi gerektiren HTML API'ları, otomasyon için olan bu ayardan avantaj sağlayabilir.

### `<webview>.openDevTools()`

Misafir sayfası için bir DevTools penceresi açar.

### `<webview>.closeDevTools()`

Misafir sayfasının DevTools penceresini kapatır.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Misafir sayfasına DevTools penceresi sabitlenmişse.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Misafir sayfasının DevTools penceresine odaklanıldığında.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `x` Integer

Misafir sayfasının inceleyici öğesini (`x`, `y`) başlatır.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Konuk sayfasında bulunan hizmet çalışanı içeriği için DevTools'u açar.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Misafir sayfası sessiz.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Misafir sayfası sessize alınmışsa.

### `<webview>.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

### `<webview>.geri almak()`

Sayfada düzenleme komutu olan `undo`'yu yerine getirir.

### `<webview>.yeniden yapmak()`

Sayfada düzenleme komutu olan `redo`'yu yerine getirir.

### `<webview>.kes()`

Sayfada düzenleme komutu olan `cut`'ı yerine getirir.

### `<webview>.kopyala()`

Sayfada düzenleme komutu olan `copy`'yi yerine getirir.

### `<webview>.paste()`

Sayfada düzenleme komutu olan `paste`'i yerine getirir.

### `<webview>.pasteAndMatchStyle()`

Sayfada düzenleme komutu olan `pasteAndMatchStyle`'ı yerine getirir.

### `<webview>.delete()`

Sayfada düzenleme komutu olan `delete`'i yerine getirir.

### `<webview>.selectAll()`

Sayfada düzenleme komutu olan `selectAll`'ı yerine getirir.

### `<webview>.unselect()`

Sayfada düzenleme komutu olan `unselect`'i yerine getirir.

### `<webview>.replace(text)`

* `text` Dizi

Sayfada düzenleme komutu olan `replace`'i yerine getirir.

### `<webview>.replaceMisspelling(text)`

* `text` String

Sayfada düzenleme komutu olan `replaceMisspelling`'i yerine getirir.

### `<webview>.insertText(text)`

* `text` String

Returns `Promise<void>`

Odaklanmış öğeye `metin` ekler.

### `<webview>.findInPage(text[, options])`

* `text` Dizgi - Araştırılacak içerik, boş bırakılmaması zorunludur.
* `seçenekler` Obje (opsiyonel) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Diğer birtakım kelime-içi eşleşmeyi kabul eder, `false` varsayılan olur.

`Integer` döndürür - İstek için kullanılan istek kimliği.

Web sayfasındaki `metin` ile tüm eşleşenleri bulmak için bir istek başlatır. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `hareket` String - Bitişte, yerini alacak olayı belirtir [`<webview>.findInPage`](#webviewfindinpagetext-options) istek. 
  * `clearSelection` - Seçimi silin.
  * `keepSelection` - Seçimi normal bir seçime çevirir.
  * `activateSelection` - Odaklanır ve seçim ağına (node'a) tıklar.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `seçenekler` Obje (opsiyonel) 
  * `silent` Boolean (isteğe bağlı) - Kullanıcıya yazdırma seçeneklerini sormaz. Varsayılan olarak `false`'tur.
  * `printBackground` Boolean (isteğe bağlı) - Ek olarak arkaplan rengini ve web sayfasının görüntüsünü de yazdırır. Varsayılan olarak `false`'tur.
  * `deviceName` Dizgi (isteğe bağlı) - Kullanılacak cihaz ismini ayarlar. Varsayılan olarak `''`'tur.

Returns `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `seçenekler` Nesne 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ya da micron olarak `height` ve `width` içeren bir nesne olabilir.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - Sayfanın yakalanılmak istenen alanı.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel, ...args)`

* `channel` Dizesi
* `...args` any[]

Returns `Promise<void>`

İşleyiciye ` kanal ` üzerinden eşzamansız bir ileti gönder, keyfi argümanlar da gönderebilirsiniz. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Returns `Promise<void>`

`event` girdisini sayfaya yollar.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Sayı - Yakınlaştırma değeri.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. Yakınlaştırma faktörü yakınlaştırma yüzdesinin 100'e bölünmüşüdür, böylece % 300 = 3.0 olur.

### `<webview>.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder. The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Maksimum ve minimum bas-yakınlaştır seviyesini ayarlar.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Returns `Promise<void>`

Maksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

### `<webview>.showDefinitionForSelection()` *macOS*

Sayfadaki seçili sözcüğü arayan pop-up sözlüğünü gösterir.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

Dönüşler:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Olay: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Olay: 'did-fail-load'

Dönüşler:

* `errorCode` Tamsayı
* `errorDescription` Koşul
* `validatedURL` Koşul
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Olay: 'did-frame-finish-load'

Dönüşler:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Olay: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Olay: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Olay: 'dom-ready'

Fired when document in the given frame is loaded.

### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `title` String
* `explicitSet` Boolean

Gezinme sırasında sayfa başlığı ayarlanırsa tetiklenir. Başlık dosya url'inden sentezlenmişse `explicitSet` yanlıştır.

### Olay: 'page-favicon-updated'

Dönüşler:

* `favicons` String[] - URL'lerin dizilişleri.

Fired when page receives favicon urls.

### Etkinlik: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Etkinlik: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Etkinlik: 'console-message'

Dönüşler:

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

### Etkinlik: 'sayfa içinde kurmak'

Dönüşler:

* `sonuç` Nesne 
  * `requestId` Tamsayı
  * `activeMatchOrdinal` Tamsayı - Etkin eşleşmenin konumu.
  * `matches` Tamsayı - Numaraların eşleştirilmesi.
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

### Olay: 'new-window'

Dönüşler:

* `url` String
* `frameName` Dize
* `disposition` Dize - `default`, `foreground-tab`, `background-tab`, `new-window`, `ave-to-disk` ve `other` olabilir.
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

### Olay: 'will-navigate'

Dönüşler:

* `url` String

Bir kullanıcı veya sayfa gezinme başlatmak istediğinde ortaya çıkar. `window.location` nesnesi değiştirildiğinde veya bir kullanıcı sayfadaki bir bağlantıyı tıklattığında olabilir.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Olay: 'did-navigate'

Dönüşler:

* `url` Dize

Emitted when a navigation is done.

Ayrıca, bağlı linkleri tıklama veya `window.location.hash` öğesini güncelleme gibi sayfa içi gezinmeler için de yayımlanmaz. Bu amaçla `did-navigate-in-page` etkinliğini kullanın.

### Olay: 'did-navigate-in-page'

Dönüşler:

* `isMainFrame` Boolean
* `url` String

Emitted when an in-page navigation happened.

Sayfa içi gezinme gerçekleştiğinde, sayfa URL'si değişir, ancak sayfanın dışına çıkmasına neden olmaz. Bu gerçekleşen örnekler, bağlı link bağlantıları tıklandığında veya DOM `hashchange` olayı tetiklendiğinde görülür.

### Etkinlik: 'kapalı'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Etkinlik: 'ipc-message'

Dönüşler:

* `channel` Dizesi
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

### Etkinlik: 'çöktü'

Fired when the renderer process is crashed.

### Event: 'plugin-crashed'

Dönüşler:

* `name` String
* `versiyon` String

Fired when a plugin process is crashed.

### Etkinlik: 'yıkıldı'

Fired when the WebContents is destroyed.

### Olay: Medya oynamaya başladı

Medya oynatılmaya başladığında yayınlanır.

### Etkinlik: 'medya-duraklatıldı'

Medya duraklatıldığında veya oynatıldığında yaydır.

### Olay: tema rengi değiştirildi

Dönüşler:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Etkinlik: 'update-target-url'

Dönüşler:

* `url` String

Fare bir bağlantı üzerinden geçtiğinde veya klavyenin bir bağlantıya odaklamasını sağladığı zaman yayımlanır.

### Olay: devtools açıldı

DevTools açıldığında yayınla.

### Olay: devtools kapandı

DevTools kapandığında ortaya çıkar.

### Olay: devtools odaklanıldı

DevTools odaklandığında / açıldığında ortaya çıkar.