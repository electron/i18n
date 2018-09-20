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

### `eklentiler`

```html
<webview src="https://www.github.com/" plugins></webview>
```

Bu özellik bulunduğunda, `webview`'deki misafir sayfa tarayıcı eklentilerini kullanabilecektir. Eklentiler varsayılan olarak devre dışıdır.

### `önyükleme`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

Konuk sayfasında diğer komut dosyaları çalıştırılmadan önce yüklenecek bir komut dosyasını belirtir. Komut dosyası URL'sinin protokolü, başlık altındaki misafir sayfasında `require` tarafından yükleneceğinden, `file:` veya `asar:` olmalıdır.

Konuk sayfasında hiçbir düğüm entegrasyonu yoksa, bu komut dosyası tüm Düğüm api'lerine yine de erişime sahip olacak, ama düğüm tarafından enjekte edilen genel nesneler, bu komut dosyası çalışmayı bitirdikten sonra silinecek.

**Not:** Bu seçenek, `will-attach-webview` etkinliğinde belirtilmiş `webPreferences` içinde `preloadURL` olarak (`preload` olarak değil) görünecektir.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

Tüm sayfalar için yönlendiren URL'yi ayarlayın.

### `kullanıcı temsilcisi`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

Sayfa gezinilmeden önce konuk sayfasının kullanıcı aracısını ayarlar. Bir kere sayfa yüklendiğinde, kullanıcı aracısını değiştirmek için `setUserAgent` yöntemini kullanın.

### `web güveliği devredışı`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

Bu özellik bulunduğunda, misafir sayfasında web güvenliği devre dışı bırakılacaktır. Web güvenliği varsayılan olarak etkindir.

### `bölüm`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

Sayfanın kullandığı oturumu ayarlar. `partition` starts with `persist:`ile başlıyorsa, sayfa, uygulamanın aynı `partition` bölümüne sahip tüm sayfalar için kalıcı bir oturum kullanacaktır. `persist:` öneki yoksa, sayfa bir bellek içi oturum kullanacaktır. Aynı `partition` bölümü atayarak, aynı oturumda birden çok sayfa paylaşabilir. `partition` ayıklanırsa, uygulamanın varsayılan oturumu kullanılır.

Bu değer yalnızca ilk gezinmeden önce değiştirilebilir, çünkü oturum aktif bir oluşturucu sürecindeyken değiştiremezsiniz. Ardından, değeri bir DOM hatası ile başarısız olur.

### `pop up'lara izin ver`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

Bu özellik mevcut olduğunda tüm sayfaların yeni bir pencere açmasına izin verir. Açılır pencereler varsayılan olarak devre dışıdır.

### `web tercihleri`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

Web görünümünde ayarlanacak web tercihlerinde `, ` ile ayrılmış olarak belirten dizelerin bir listesi. Desteklenen tercih dizelerinin tam listesi şu adreste bulunabilir [BrowserWindow](browser-window.md#new-browserwindowoptions).

Dize, içindeki özelliklerin türü ile aynı biçimi izler `window.open`. Bir ismin başına `true` boolean değeri verilir. Bir seçenek, izlediği değere `=` dahil edilerek başka bir değere dönüştürülebilir. `yes` ve `1` şeklinde özel değerler `true`, `no` ve `0` şeklindeki özel değerler de `false` olarak yorumlanır.

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Yanıp sönme özelliklerini belirten dizi listeleri `,` ayrılarak etkinleştirilir. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

### `yanıp sönme özelliklerini devre dışı bırak`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Yanıp sönme özelliklerini belirten dizilerin listesi `,` ayrılarak devre dışı bırakılabilir. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) dosyasında bulunabilir.

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
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Buna, sadece belirtilen `url` bir veri bağlantısıysa ve başka dosyalar yüklemesi gerekiyorsa, gerek duyulur.

Webview'ün içinde `url`'i yükler, `url` prefix protokolünü içermelidir, örneğin: `http://` ya da `file://`.

### `<webview>.getURL()`

Returns `String` - Misafir sayfasının URL'si.

### `<webview>.getURL()`

Returns `String` - Misafir sayfasının başlığı.

### `<webview>.isLoading()`

Returns `Boolean` - Misafir sayfası hala kaynakları yüklüyorsa.

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

CSS'i misafir sayfasının içine yerleştirir.

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default `false`.
* `geri aramak` Fonksiyon (isteğe bağlı) - Betik tamamlandıktan sonra çağrılır. 
  * `result` Any

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

### `<webview>.inspectServiceWorker()`

Konuk sayfasında bulunan hizmet çalışanı içeriği için DevTools'u açar.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

Misafir sayfası sessiz.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Misafir sayfası sessize alınmışsa.

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

* `text` Dizi

Sayfada düzenleme komutu olan `replaceMisspelling`'i yerine getirir.

### `<webview>.insertText(text)`

* `text` String

Odaklanmış öğeye `metin` ekler.

### `<webview>.findInPage(text[, options])`

* `text` Dizgi - Araştırılacak içerik, boş bırakılmaması zorunludur.
* `seçenekler` Obje (opsiyonel) 
  * `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Diğer çeşitli alt kelime (intra-word) eşleşmelerini kabul eder, varsayılan olarak `false`'tur.

`Integer` döndürür - İstek için kullanılan istek kimliği.

Web sayfasındaki `metin` ile tüm eşleşenleri bulmak için bir istek başlatır. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `hareket` String - Bitişte, yerini alacak olayı belirtir [`<webview>.findInPage`](#webviewfindinpagetext-options) istek. 
  * `clearSelection` - Seçimi silin.
  * `keepSelection` - Seçimi normal bir seçime çevirir.
  * `activateSelection` - Odaklanır ve seçim ağına (node'a) tıklar.

`action` ile sağlanan `webview` için herhangi `findInPage` isteğini durdurur.

### `<webview>.print([options])`

* `seçenekler` Obje (opsiyonel) 
  * `silent` Boolean (isteğe bağlı) - Kullanıcıya yazdırma seçeneklerini sormaz. Varsayılan olarak `false`'tur.
  * `printBackground` Boolean (isteğe bağlı) - Ek olarak arkaplan rengini ve web sayfasının görüntüsünü de yazdırır. Varsayılan olarak `false`'tur.
  * `deviceName` String (isteğe bağlı) - Kullanılacak yazıcının ismini ayarla. `''` varsayılandır.

`webview`'ün web sayfasını yazdırır. Tıpkı `webContents.print([options])` gibi.

### `<webview>.printToPDF(options, callback)`

* `seçenekler` Nesne 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String (optional) - Specify page size of the generated PDF. `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ya da micron olarak `height` ve `width` içeren bir nesne olabilir.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `geri aramak` Function 
  * `error` Error
  * `data` Buffer

`webview`'ün web sayfasını PDF olarak yazdırır, tıpkı `webContents.printToPDF(options, callback)` gibi.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (isteğe bağlı) - Sayfanın yakalanılmak istenen alanı.
* `geri aramak` Function 
  * `image` [NativeImage](native-image.md)

`webview` sayfasının anlık görüntüsünü alır. Tıpkı `webContents.capturePage([rect, ]callback)` gibi.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

İşleyiciye ` kanal ` üzerinden eşzamansız bir ileti gönder, keyfi argümanlar da gönderebilirsiniz. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

Örnekler için [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) 'i ziyaret edin.

### `<webview>.sendInputEvent(event)`

* `event` Object

`event` girdisini sayfaya yollar.

`event` nesnesinin detaylı açıklaması için [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) 'i ziyaret edin.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Yakınlaştırma faktörü.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. Yakınlaştırma faktörü yakınlaştırma yüzdesinin 100'e bölünmüşüdür, böylece % 300 = 3.0 olur.

### `<webview>.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder.

### `<webview>.showDefinitionForSelection()` *macOS*

Sayfadaki seçili sözcüğü arayan pop-up sözlüğünü gösterir.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - Web içerikleri `webview` ile ilişkilendirilmiştir.

## DOM etkinlikleri

Aşağıdaki DOM etkinlikleri `webview` etiketinde kullanılabilir:

### Etkinlik: 'load-commit'

Dönüşler:

* `url` Dize
* `isMainFrame` Boolean

Bir yükleme işlendiğinde tetiklenir. Bu, subframe belge düzeyi yüklemeleri içinde olduğu kadar, mevcut belge içinde de gezinmeyi içerir, ancak eş zamanlı olmayan kaynak yüklemelerini içermez.

### Olay: 'did-finish-load'

Gezinme bittiğinde tetiklenir, diğer bir ifadeyle sekmedeki topaç dönmeyi durduracaktır ve `onload` etkinliği gönderilecektir.

### Olay: 'did-fail-load'

Dönüşler:

* `errorCode` Tamsayı
* `errorDescription` Koşul
* `validatedURL` Koşul
* `isMainFrame` Boolean

Bu etkinlik `did-finish-load` gibidir, fakat yükleme başarısız olduğunda veya iptal edildiğinde, örneğin: `window.stop()` çağrılır.

### Olay: 'did-frame-finish-load'

Dönüşler:

* `isMainFrame` Boolean

Bir kare, navigasyonunu tamamladığında tetiklenir.

### Olay: 'did-start-loading'

Sekmenin döndürücüsünün dönmeye başladığı andaki noktalara karşılık gelir.

### Olay: 'did-stop-loading'

Sekmenin döndürücüsünün dönmeyi durdurduğu andaki noktalara karşılık gelir.

### Olay: 'dom-ready'

Verilen karedeki belge yüklendiğinde tetiklenir.

### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `title` String
* `explicitSet` Boolean

Gezinme sırasında sayfa başlığı ayarlanırsa tetiklenir. Başlık dosya url'inden sentezlenmişse `explicitSet` yanlıştır.

### Olay: 'page-favicon-updated'

Dönüşler:

* `favicons` String[] - URL'lerin dizilişleri.

Sayfa favicon url'lerini aldığında tetiklenir.

### Etkinlik: 'enter-html-full-screen'

Tam ekran HTML API tarafından etkinleştirildiğinde ateşlenir.

### Etkinlik: 'leave-html-full-screen'

Tam ekran HTML API tarafından çıkıldığında ateşlenir.

### Etkinlik: 'console-message'

Dönüşler:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Misafir pencere konsol mesajı girdiğinde ateşlenir.

Aşağıdaki örnek kod, günlük düzeyini veya diğer özellikleri dikkate almadan tüm günlük iletilerini karıştırıcının konsoluna iletir.

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

Bir sonuç [`webview.findInPage`](#webviewfindinpagetext-options) isteği için geçerli hale geldiğinde tetiklenir.

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

* `url` Dize
* `frameName` Dize
* `disposition` Dize - `default`, `foreground-tab`, `background-tab`, `new-window`, `ave-to-disk` ve `other` olabilir.
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Misafir sayfası yeni bir tarayıcı penceresi açmaya çalıştığında tetiklenir.

Aşağıdaki örnek kod, sistemin varsayılan tarayıcısında yeni url'yi açar.

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

### Olay: 'will-navigate'

Dönüşler:

* `url` Dize

Bir kullanıcı veya sayfa gezinme başlatmak istediğinde ortaya çıkar. `window.location` nesnesi değiştirildiğinde veya bir kullanıcı sayfadaki bir bağlantıyı tıklattığında olabilir.

Bu olay navigasyon programlı bir şekilde `<webview>.loadURL` ve `<webview>.back` API gibi başlatıldığında sinyal yaymaz.

Sayfa içi navigasyon sırasında, çapa linklere tıklama ya da `window.location.hash` güncellendiğindede sinyal yaymaz. `did*navigate-in-page` olayını bu amaçla kullanınız.

`event.preventDefault()` öğesinin çağırılmasının herhangi bir etkisi **yoktur**.

### Olay: 'did-navigate'

Dönüşler:

* `url` Dize

Bir gezinme yapıldığında ortaya çıkar.

Ayrıca, bağlı linkleri tıklama veya `window.location.hash` öğesini güncelleme gibi sayfa içi gezinmeler için de yayımlanmaz. Bu amaçla `did-navigate-in-page` etkinliğini kullanın.

### Olay: 'did-navigate-in-page'

Dönüşler:

* `isMainFrame` Boolean
* `url` Dize

Sayfa içi gezinme gerçekleştiğinde ortaya çıktı.

Sayfa içi gezinme gerçekleştiğinde, sayfa URL'si değişir, ancak sayfanın dışına çıkmasına neden olmaz. Bu gerçekleşen örnekler, bağlı link bağlantıları tıklandığında veya DOM `hashchange` olayı tetiklendiğinde görülür.

### Etkinlik: 'kapalı'

Misafir sayfası kendisini kapatmaya çalıştığında tetiklenir.

Misafir kapatmaya çalıştığında örnek kod `webview`, `about:blank` arasında dolaşmaya başlar.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Etkinlik: 'ipc-message'

Dönüşler:

* `channel` Dizesi
* `args` Array

Ziyaretçi sayfası, katıştırıcı sayfasına bir eşzamansız mesaj gönderdiğinde tetiklenir.

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
const {ipcRenderer} = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Etkinlik: 'çöktü'

Renderer işlemi çöktüğünde tetiklenir.

### Etkinlik: 'gpu-çöktü'

Gpu işlemi çöktüğünde tetiklenir.

### Event: 'plugin-crashed'

Dönüşler:

* `name` Dizi
* `versiyon` String

Plugin işlemi çöktüğünde tetiklenir.

### Etkinlik: 'yıkıldı'

WebContents işlemi çöktüğünde tetiklenir.

### Olay: Medya oynamaya başladı

Medya oynamaya başladığında belirir.

### Etkinlik: 'medya-duraklatıldı'

Medya duraklatıldığında veya oynatıldığında yaydır.

### Olay: tema rengi değiştirildi

Dönüşler:

* `themeColor` String

Sayfanın tema rengi değiştiğinde belirtilir. Bu, genellikle bir meta etiketi ile karşılaşılmasından dolayıdır:

```html
<meta name='theme-color' content='#ff0000'>
```

### Etkinlik: 'update-target-url'

Dönüşler:

* `url` Dize

Fare bir bağlantı üzerinden geçtiğinde veya klavyenin bir bağlantıya odaklamasını sağladığı zaman yayımlanır.

### Olay: devtools açıldı

DevTools açıldığında yayınla.

### Olay: devtools kapandı

DevTools kapandığında ortaya çıkar.

### Olay: devtools odaklanıldı

DevTools odaklandığında / açıldığında ortaya çıkar.