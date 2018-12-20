# `<webview>`Etiket

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Overview

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
* You can not add keyboard event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## CSS stil notları

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Etiket özellikleri

`webview` etiketi aşağıdaki özellikleri destekler:

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Görünür URL'yi döndürür. Bu özelliğe yazmak, üst düzey gezinimi başlatır.

`src` değerine kendi değerini atamak, mevcut sayfayı yeniden yükler.

`src` özelliği ayrıca `data:text/plain,Merhaba dünya!` gibi veri URL'lerini de kabul eder.

### `otomatik boyutlandır`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

Bu özellik varsa, `webview` `minwidth`, `minheight`, özellikleri tarafından belirtilen sınırlar içinde, kapsayıcısı otomatik olarak yeniden boyutlandırır `maxwidth` ve `maxheight`.</0>. Bu kısıtlamalar, `webview` `autosize` etkinleştirilmemişse. `autosize` etkinleştirildiğinde, `webview` dosya boyutu minimum değerlerden az veya maksimum değerden fazla olamaz.

### `düğüm entegrasyonu`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

Bu özellik varsa, `webview` konuk sayfasında Node. js entegrasyona izin verir ve erişim için `require` ve `process` gibi Node. js API'lerini düşük seviyeli sistem kaynaklarına erişmek için kullanabilir. Node.js entegrasyon konuk sayfada varsayılan olarak devre dışıdır.

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is avaiable by default.

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

Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. Aynı `partition`, değişkenine değer atayarak birden çok sayfada aynı oturumu paylaşabilirsiniz. If the `partition` is unset then default session of the app will be used.

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

A list of strings which specifies the blink features to be enabled separated by `,`. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

## Metodlar

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

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

Bekleyen gezinmeyi durdurur.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Tamsayı

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Gezinme geçmişini temizle.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Tamsayı

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Tamsayı

"Geçerli girişten" belirtilen aralıkta gezinir.

### `<webview>.isCrashed()`

`Boolean` olarak dönüt verir - Görselleştirme işleminin arızalanıp arızalanmadığı.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` Dizgi

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` Dizgi

Injects CSS into the guest page.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.
* `geri aramak` Function (isteğe bağlı) - Script çalıştıktan sonra çağırılır. 
  * `result` Any

Sayfadaki `code`'u değerlendirir. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

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
* `x` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

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

* `text` Dizi

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` Dizi

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Odaklanılan öğeye `text`'i yerleştirir.

### `<webview>.findInPage(text[, options])`

* `text` Dizgi - Araştırılacak içerik, boş bırakılmaması zorunludur.
* `seçenekler` Nesne (isteğe bağlı) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Diğer çeşitli alt kelime (intra-word) eşleşmelerini kabul eder, varsayılan olarak `false`'tur.

`Integer` döndürür - İstek için kullanılan istek kimliği.

Web sayfasındaki `metin` ile tüm eşleşenleri bulmak için bir istek başlatır. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `hareket` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request. 
  * `clearSelection` - Seçimi silin.
  * `keepSelection` - Seçimi normal bir seçime çevirir.
  * `activateSelection` - Odaklanır ve seçim ağına (node'a) tıklar.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `seçenekler` Nesne (isteğe bağlı) 
  * `silent` Boolean (isteğe bağlı) - Kullanıcıya yazdırma seçeneklerini sormaz. Varsayılan olarak `false`'tur.
  * `printBackground` Boolean (isteğe bağlı) - Ek olarak arkaplan rengini ve web sayfasının görüntüsünü de yazdırır. Varsayılan olarak `false`'tur.
  * `deviceName` Dizgi (isteğe bağlı) - Kullanılacak cihaz ismini ayarlar. Varsayılan olarak `''`'tur.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `seçenekler` Nesne 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ya da micron olarak `height` ve `width` içeren bir nesne olabilir.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `geri aramak` Function 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - Sayfadaki alınacak bölge.
* `geri aramak` Fonksiyon 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` any[]

İşleyiciye ` kanal ` üzerinden eşzamansız bir ileti gönder, keyfi argümanlar da gönderebilirsiniz. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

See [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

`event` girdisini sayfaya yollar.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Sayı - Yakınlaştırma değeri.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. Yakınlaştırma faktörü yakınlaştırma yüzdesinin 100'e bölünmüşüdür, böylece % 300 = 3.0 olur.

### `<webview>.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder. The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor(callback)`

* `geri aramak` Fonksiyon 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

### `<webview>.getZoomLevel(callback)`

* `geri aramak` Fonksiyon 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Maksimum ve minimum bas-yakınlaştır seviyesini ayarlar.

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Maksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

### `<webview>.showDefinitionForSelection()` *macOS*

Sayfadaki seçili sözcüğü arayan pop-up sözlüğünü gösterir.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

## DOM etkinlikleri

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

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

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
  * `activeMatchOrdinal` Integer - Etkin olan eşleşmenin konumu.
  * `matches` Tamsayı - Numaraların eşleştirilmesi.
  * `selectionArea` Obje - Eşleşme bölgesinin koordinatları.
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
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
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

### Event: 'ipc-message'

Dönüşler:

* `channel` Dizesi
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

### Etkinlik: 'çöktü'

Fired when the renderer process is crashed.

### Event: 'gpu-crashed'

Fired when the gpu process is crashed.

### Event: 'plugin-crashed'

Dönüşler:

* `name` String
* `versiyon` String

Fired when a plugin process is crashed.

### Etkinlik: 'yıkıldı'

Fired when the WebContents is destroyed.

### Olay: Medya oynamaya başladı

Medya oynamaya başladığında belirir.

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