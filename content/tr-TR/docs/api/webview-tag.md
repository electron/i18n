# `<webview>`Etiket

> Harici web içeriğini yalıtılmış bir çerçeve ve işlemde görüntüleme.

Süreç: [Renderer](../tutorial/quick-start.md#renderer-process)

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

## CSS stil notları

Ürünün tam yüksekliğini ve genişliğini doldurmasını sağlamak için `display:flex;` `object` `webview` etiket stilini kullanır `webview` kapsayıcısı geleneksel sürüm ve flexbox planları birlikte kullanıldığında (v0.36.11'den beri) dahili olarak bulunduğunu lütfen dikkate alın. Lütfen varsayılanın üzerine yazma `display:flex;` Belirtilmediği sürece, CSS özelliği için düzen `display:inline-flex;`.

`webview` 'un `hidden` veya `display: none;` sembolü kullanımı sırasında gizleniyor olmasıyla alakalı sorunlar vardır. Bu durum, içinde olan `browserplugin` nesnelerinin ve `webview` gizli değilken web sitesinin yüklenmesi olağan dışı kaplama tutumlarına neden olabilir. Önerilen yaklaşım, `webview` gizlemektir. `visibility: hidden`.

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
<webview src="https://electron.atom.io" partition="electron"></webview>
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

Dize, içindeki özelliklerin türü ile aynı biçimi izler `window.open`. Bir ismin başına `true` boolean değeri verilir. Bir seçenek, izlediği değere `=` dahil edilerek başka bir değere dönüştürülebilir. `yes` ve `1` şeklinde özel değerler `true`, `no` ve `` şeklindeki özel değerler de `false` olarak yorumlanır.

### `blinkfeatures`

```html
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Yanıp sönme özelliklerini belirten dizi listeleri `,` ayrılarak etkinleştirilir. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) dosyasında bulunabilir.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

Yanıp sönme özelliklerini belirten dizilerin listesi `,` ayrılarak devre dışı bırakılabilir. Desteklenen özellik dizilerinin tam listesi [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) dosyasında bulunabilir.

### `guestinstance`

```html
<webview src="https://www.github.com/" guestinstance="3"></webview>
```

Web görüntülemeyi belirli bir web içeriğine bağlayan bir değer. When a webview first loads a new webContents is created and this attribute is set to its instance identifier. Setting this attribute on a new or existing webview connects it to the existing webContents that currently renders in a different webview.

Var olan webview `destroy` etkinliğini görecektir ve bu durumda yeni bir url yüklendiğinde yeni bir webContents oluşturacaktır.

### `disableguestresize`

```html
<webview src="https://www.github.com/" disableguestresize></webview>
```

When this attribute is present the `webview` contents will be prevented from resizing when the `webview` element itself is resized.

Bu, [`webContents.setSize`](web-contents.md#contentssetsizeoptions) ile kombinasyonlu bir şekilde manuel olarak webview içeriklerini pencere büyüklüğüne boyutlandırmada kullanılabilir. Bu, içerikleri otomatik olarak yeniden boyutlandırmak için webview öğesi sınırlarına dayanmakla karşılaştırıldığında daha hızlı yeniden boyutlandırma yapabilir.

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
* `ayarlar` Obje (isteğe bağlı) 
  * `httpReferrer` Dizgi (isteğe bağlı) - Bir HTTP başvuru bağlantısı.
  * `userAgent` Dizgi (isteğe bağlı) - İsteğin kaynağını oluşturan bir kullanıcı aracı.
  * `extraHeaders` Dizgi (isteğe bağlı) - "\n" ile ayrılan ek sayfa başlıkları
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (opsiyonel)
  * `baseURLForDataURL` Dizgi (isteğe bağlı) - Veri bağlantıları tarafından dosyaların yükleneceği (Dizin ayracına sahip) temel bağlantı. Bu, yalnızca belirtilen `url` veri url'si ve diğer dosyaları yüklemek gerekiyorsa gereklidir.

Webview'ün içinde `url`'i yükler, `url` prefix protokolünü içermelidir, örneğin: `http://` ya da `file://`.

### `<webview>.getURL()`

Returns `String` - Misafir sayfasının URL'si.

### `<webview>.getTitle()`

Returns `String` - Misafir sayfasının başlığı.

### `<webview>.isLoading()`

Returns `Boolean` - Misafir sayfası hala kaynakları yüklüyorsa.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.dur()`

Bekleyen gezinmeyi durdurur.

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

* `userAgent` String

Konuk sayfasının kullanıcı aracısını geçersiz kılar.

### `<webview>.getUserAgent()`

Returns `String` - Misafir sayfası için kullanıcı aracı.

### `<webview>.insertCSS(css)`

* `css` Dizgi

CSS'i misafir sayfasının içine yerleştirir.

### `<webview>.executeJavaScript(code, userGesture, callback)`

* `code` Dizi
* `userGesture` Boolean - Default `false`.
* `geri arama` Fonksiyon (isteğe bağlı) - Komut dosyası çalıştırıldıktan sonra çağrılır. 
  * `result` Herhangi bir

Sayfadaki `code`'u değerlendirir. `userGesture` kuruluysa, sayfada kullanıcı hareketleri bağlamını yaratır. `requestFullScreen` gibi kullanıcı hareketi gerektiren HTML API'ları, otomasyon için olan bu ayardan avantaj sağlayabilir.

### `<webview>.openDevTools()`

Misafir sayfası için bir DevTools penceresi açar.

### `<webview>.closeDevTools()`

Misafir sayfasının DevTools penceresini kapatır.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Misafir sayfasına DevTools penceresi sabitlenmişse.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Misafir sayfasının DevTools penceresine odaklanıldığında.

### `<webview>.inspectElement(x, y)`

* `x` tamsayı
* `x` tamsayı

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

* `text` Dizi

Odaklanılan öğeye `text`'i yerleştirir.

### `<webview>.findInPage(text[, options])`

* `text` Dizi - Aranacak içerik; boş olmamalıdır.
* `seçenekler` Obje (isteğe bağlı) 
  * `forward` Boolean - (isteğe bağlı) İleriye ya da geriye doğru aranırsa, `true` varsayılan olur.
  * `findNext` Boolean - (isteğe bağlı) İşlem ilk istek ya da devamı ise, `false` varsayılan olur.
  * `matchCase` Boolean - (isteğe bağlı) Arama harfe duyarlı olmalıysa, `false` varsayılan olur.
  * `wordStart` Boolean - (isteğe bağlı) Kelimelerin sadece başına bakılmalıysa, `false` varsayılan olur.
  * `medialCapitalAsWordStart` Boolean - (isteğe bağlı) `wordStart` ile birleştirildiğinde, eşleşme büyük bir harfle başlayıp küçük harfle ya da harfsiz devam ediyorsa, kelimenin ortasındaki bir eşleşmeyi kabul eder. Diğer birtakım kelime-içi eşleşmeyi kabul eder, `false` varsayılan olur.

Web sayfasındaki `metin` için tüm eşleşmeleri bulmak için bir istek başlatır ve istek için kullanılan istek kimlik numarasını temsil eden bir `Tamsayı` döndürür. İsteğin sonucu [`found-in-page`](webview-tag.md#event-found-in-page) etkinliğine katılınarak elde edilebilinir.

### `<webview>.stopFindInPage(action)`

* `eylem` String - Bitişte, yerini alacak olayı belirtir [`<webview>.findInPage`](webview-tag.md#webviewtagfindinpage) istek. 
  * `clearSelection` - Seçimi silin.
  * `keepSelection` - Seçimi, normal bir seçime tercüme eder.
  * `activateSelection` - Seçim node'una odaklanır ve tıklar.

`action` ile sağlanan `webview` için herhangi `findInPage` isteğini durdurur.

### `<webview>.print([options])`

* `ayarlar` Obje (isteğe bağlı) 
  * `silent` Boolean (isteğe bağlı) - Kullanıcıya yazdırma seçeneklerini sorma, `false` varsayılandır.
  * `printBackground` Boolean (isteğe bağlı) - Ayrıca arka plan rengini ve web sayfasının görüntüsünü yazdırır. `false` varsayılandır.
  * `deviceName` String (isteğe bağlı) - Kullanılacak yazıcının ismini ayarla. `''` varsayılandır.

`webview`'ün web sayfasını yazdırır. Tıpkı `webContents.print([options])` gibi.

### `<webview>.printToPDF(options, callback)`

* `ayarlar` Nesne 
  * `marginsType` Integer - (isteğe bağlı) Kullanılacak kenar tipini belirler. Varsayılan kenar için 0, kenarsız olması için 1 ve en az kenar için 2'yi kullanır.
  * `pageSize` String - (isteğe bağlı) Oluşturulan PDF'nin sayfa boyutunu belirler. `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` ya da micron olarak `height` ve `width` içeren bir nesne olabilir.
  * `printBackground` Boolean - (isteğe bağlı) CSS arka planı yazdırılacaksa.
  * `printSelectionOnly` Boolean - (isteğe bağlı) - Sadece seçim yeri yazdırılırsa.
  * `landscape` Boolean - (isteğe bağlı) manzara için `true`, portre için `false`.
* `geri arama` Fonksiyon 
  * `error` Hata 
  * `data` Buffer

`webview`'ün web sayfasını PDF olarak yazdırır, tıpkı `webContents.printToPDF(options, callback)` gibi.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `geri arama` Fonksiyon 
  * `image` [NativeImage](native-image.md)

`webview` sayfasının anlık görüntüsünü alır. Tıpkı `webContents.capturePage([rect, ]callback)` gibi.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

İşleyiciye ` kanal ` üzerinden eşzamansız bir ileti gönder, keyfi argümanlar da gönderebilirsiniz. Renderer işlemi, mesajları `ipcRenderer` modülü ile `channel` etkinliğini dinleyerek halledebilir.

Örnekler için [webContents.send](web-contents.md#webcontentssendchannel-args) 'i ziyaret edin.

### `<webview>.sendInputEvent(event)`

* `event` Object

`event` girdisini sayfaya yollar.

`event` nesnesinin detaylı açıklaması için [webContents.sendInputEvent](web-contents.md#webcontentssendinputeventevent) 'i ziyaret edin.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Yakınlaştırma fakötrü.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. om factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### `<webview>.showDefinitionForSelection()` *macOS*

Sayfadaki seçili sözcüğü arayan pop-up sözlüğünü gösterir.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - Web içerikleri `webview` ile ilişkilendirilmiştir.

## DOM etkinlikleri

Aşağıdaki DOM etkinlikleri `webview` etiketinde kullanılabilir:

### Event: 'load-commit'

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

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Olay: 'did-frame-finish-load'

Dönüşler:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Olay: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Olay: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Olay: 'did-get-response-details'

Dönüşler:

* `status` Boolean
* `newURL` Dize
* `originalURL` Dize
* `httpResponseCode` Tamsayı
* `requestMethod` Dize
* `referrer` String
* `headers` Nesne
* `resourceType` Dize

Fired when details regarding a requested resource is available. `status` indicates socket connection to download the resource.

### Olay: 'did-get-redirect-request'

Dönüşler:

* `oldURL` Dize
* `newURL` Dize
* `isMainFrame` Boolean

Fired when a redirect was received while requesting a resource.

### Olay: 'dom-ready'

Fired when document in the given frame is loaded.

### Etkinlik: 'sayfa-başlığı-güncellendi'

Dönüşler:

* `başlık` Dizi
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Olay: 'page-favicon-updated'

Dönüşler:

* `favicons` String[] - Array of URLs.

Fired when page receives favicon urls.

### Etkinlik: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### Etkinlik: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

Dönüşler:

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Fired when the guest window logs a console message.

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
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

Bir sonuç [`webview.findInPage`](webview-tag.md#webviewtagfindinpage) isteği için geçerli hale geldiğinde tetiklenir.

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
* `options` Object - Bu seçenekler yeni `BrowserWindow` oluşturulacağı zaman kullanılmalıdır.

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

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

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

### Etkinlik: 'kapat'

Misafir sayfası kendisini kapatmaya çalıştığında tetiklenir.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

Dönüşler:

* `channel` String
* `args` Array

Ziyaretçi sayfası, katıştırıcı sayfasına bir eşzamansız mesaj gönderdiğinde tetiklenir.

`sendToHost` yöntemi ve `ipc-message` etkinliği ile misafir sayfa ve gömülü sayfa arasında kolayca geçiş yapabilirsiniz:

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

### Event: 'media-started-playing'

Medya oynamaya başladığında belirir.

### Etkinlik: 'medya-duraklatıldı'

Medya duraklatıldığında veya oynatma süresi bittiğinde belirir.

### Event: 'did-change-theme-color'

Dönüşler:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

Dönüşler:

* `url` Dize

Fare bir bağlantı üzerinden geçtiğinde veya klavyenin bir bağlantıya odaklamasını sağladığı zaman yayımlanır.

### Olay: devtools açıldı

DevTools açıldığında yayınla.

### Olay: devtools kapandı

DevTools kapandığında ortaya çıkar.

### Olay: devtools odaklanıldı

DevTools odaklandığında / açıldığında ortaya çıkar.