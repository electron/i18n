# webFrame

> Geçerli web sayfasının görünümünü özelleştirin.

İşlem: [Renderer](../glossary.md#renderer-process)

Geçerli sayfayı% 200'e yakınlaştırmaya bir örnek.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Metodlar

`webFrame` modülü aşağıdaki metodları içerir:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Yakınlaştırma faktörü.

Yakınlaştırma faktörünü belirtilen faktöre değiştirir. Yakınlaştırma faktörü yakınlaştırma yüzdesinin 100'e bölünmüşüdür, böylece % 300 = 3.0 olur.

### `webFrame.getZoomFactor()`

`Number` döndürür - Geçerli yakınlaştırma faktörü.

### `webFrame.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. Orijinal boyut 0'dır ve her bir artım yukarıdaki veya aşağıdaki %20 daha büyük veya daha küçük, varsayılan %300 sınırına ve %50 orijinal boyutuna sırasıyla yakınlaştırma oranını temsil eder.

### `webFrame.getZoomLevel()`

`Number` döndürür - Geçerli yakınlaştırma seviyesi.

### `webFrame.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

**Kullanım dışı:** Bunun yerine, görsel yakınlaştırma seviye sınırlarını ayarlamak için `setVisualZoomLevelLimits` 'i çağırın. Bu yöntem Elektron 2.0'da kaldırılacaktır.

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
* `provider` Object 
  * `spellCheck` Function - döner `Boolean` 
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

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `scheme` String

`scheme`'yı güvenli scheme olarak kaydeder.

Güvenli scheme'lar karışık içerik uyarılarını tetiklemiyor. Örneğin, `https` ve `veri` güvenli scheme'lardır, çünkü bunlar etkin ağ saldırganları tarafından bozulamazlar.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

Geçerli sayfanın İçerik Güvenliği Politikası ne olursa olsun kaynaklar bu `scheme`'dan yüklenecektir.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (isteğe bağlı) 
  * `secure` Boolean - (isteğe bağlı) Varsayılan true.
  * `bypassCSP` Boolean - (isteğe bağlı) Varsayılan true.
  * `allowServiceWorkers` Boolean - (isteğe bağlı) Varsayılan true.
  * `supportFetchAPI` Boolean - (isteğe bağlı) Varsayılan true.
  * `corsEnabled` Boolean - (isteğe bağlı) Varsayılan true.

`Scheme`'i güvenli olarak kaydeder, kaynaklar için içerik güvenliği ilkesini atlar, ServiceWorker'ı kaydettirmenize izin verir ve getirme API'sini destekler.

Kayıttan çıkarmak için `false` değerine sahip bir seçenek belirtin. İçerik Güvenliği Politikasını atlamaksızın ayrıcalıklı bir scheme'nin kaydedilmesine bir örnek:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Odaklanmış öğeye `metin` ekler.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
* `callback` Function (isteğe bağlı) - Script çalıştıktan sonra çağırılır. 
  * `result` Any

`Promise` döndürür - çalışan kodun sonucuyla çözülen bir söz veya kodun sonucu reddedilen bir söz ise reddedilir.

Sayfadaki `code`'u ölçer.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

### `webFrame.getResourceUsage()`

`Object` döndürür:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
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