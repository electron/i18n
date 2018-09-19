# webFrame

> Geçerli web sayfasının görünümünü özelleştirin.

Süreç:[ İşleyici](../glossary.md#renderer-process)

`webFrame` export of the electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Geçerli sayfayı% 200'e yakınlaştırmaya bir örnek.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Yöntemler

The `WebFrame` class has the following instance methods:

### `webFrame.setZoomFactor(factor)`

* `factor` Sayı - Yakınlaştırma değeri.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. Yakınlaştırma faktörü yakınlaştırma yüzdesinin 100'e bölünmüşüdür, böylece % 300 = 3.0 olur.

### `webFrame.getZoomFactor()`

`Number` döndürür - Geçerli yakınlaştırma faktörü.

### `webFrame.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder.

### `webFrame.getZoomLevel()`

`Number` döndürür - Geçerli yakınlaştırma seviyesi.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Maksimum ve minimum bas-yakınlaştır seviyesini ayarlar.

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Maksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Nesne 
  * `spellCheck` Function - döner `Boole değeri`. 
    * `text` String

Giriş alanlarında ve metin alanlarında yazım denetimi için bir provider ayarlar.

`Provider` kelimenin doğru yazılıp yazılmadığını döndüren, `spellCheck` metoduna sahip bir nesne olmalıdır.

Provider gibi [node-spellchecker](https://github.com/atom/node-spellchecker) kullanılarak bir örnek:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` Dizi

Geçerli sayfanın İçerik Güvenliği Politikası ne olursa olsun kaynaklar bu `scheme`'dan yüklenecektir.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` Dizi
* `seçenekler` Obje (opsiyonel) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

`Scheme`'i güvenli olarak kaydeder, kaynaklar için içerik güvenliği ilkesini atlar, ServiceWorker'ı kaydettirmenize izin verir ve getirme API'sini destekler.

Kayıttan çıkarmak için `false` değerine sahip bir seçenek belirtin. İçerik Güvenliği Politikasını atlamaksızın ayrıcalıklı bir scheme'nin kaydedilmesine bir örnek:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` Dizi

Odaklanılan öğeye `text`'i yerleştirir.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dır.
* `geri aramak` Fonksiyon (isteğe bağlı) - Betik tamamlandıktan sonra çağrılır. 
  * `result` Any

`Promise` döner - Çalıştırılan kodun sonucuyla çözülen veya eğer kod sonucu promise reddedildiyse reddedilen bir promise.

Sayfadaki `code`'u ölçer.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dır.
* `geri aramak` Function (isteğe bağlı) - Script çalıştıktan sonra çağırılır. 
  * `result` Any

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` Dizi

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.getResourceUsage()`

`Object` 'i geri getirir:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Blink'in dahili belleğinin önbelleklerinin kullanım bilgilerini açıklayan bir nesne döndürür.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

Bu oluşturur:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Artık kullanılmayan belleği boşa çıkarmaya çalışır (ör. önceki gezinmeden fotoğraflar).

Boşu boşuna bu metodu çağırmanın muhtemelen Electron'u yavaşlatacağını unutmayın çünkü boşalan önbellekleri tekrar doldurmak zorunda kalacaktır, sadece uygulamanızda sayfanın aslında daha az bellek kullandığını düşündüğünüz bir olay varsa bunu çağırmalısınız (örneğin, çok yoğun bir sayfadan çoğunlukla boş olan bir sayfaya gidiyorsanız ve orada kalmak niyetindeyseniz).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - CSS selector for a frame element.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* `name` Dizi

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - An `Integer` representing the unique frame id in the current renderer process. Routing IDs can be retrieved from `WebFrame` instances (`webFrame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## Özellikler

### `webFrame.top`

A `WebFrame` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### `webFrame.opener`

A `WebFrame` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### `webFrame.parent`

A `WebFrame` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### `webFrame.firstChild`

A `WebFrame` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### `webFrame.nextSibling`

A `WebFrame` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### `webFrame.routingId`

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.