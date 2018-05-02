# webFrame

> Geçerli web sayfasının görünümünü özelleştirin.

Süreç:[ İşleyici](../glossary.md#renderer-process)

Geçerli sayfayı% 200'e yakınlaştırmaya bir örnek.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Yöntemler

`webFrame` modülü aşağıdaki metodları içerir:

### `webFrame.setZoomFactor(factor)`

* `factor` Sayı - Yakınlaştırma değeri.

Yakınlaştırma değerini belirtilen değere değiştirir. Yakışlaştırma değeri, yakınlaştırma yüzdesi bölü 100'dür, bu yüzden %300 = 3.0.

### `webFrame.getZoomFactor()`

`Number` döndürür - Geçerli yakınlaştırma faktörü.

### `webFrame.setZoomLevel(level)`

* `level` Number - Yakınlaştırma seviyesi.

Yakınlaştırma düzeyini belirtilen düzeye değiştirir. Orijinal boyut 0'dır ve her bir artış veya azalış, orijinal boyutun %300'ü ve %50'si olan varsayılan değerler içerisinde %20'lik bir büyümeyi veya küçülmeyi temsil eder.

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

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `scheme` Dizi

`scheme`'yı güvenli scheme olarak kaydeder.

Güvenli scheme'lar karışık içerik uyarılarını tetiklemiyor. Örneğin, `https` ve `veri` güvenli scheme'lardır, çünkü bunlar etkin ağ saldırganları tarafından bozulamazlar.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

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

* `text` String

Odaklanmış öğeye `metin` ekler.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
* `geri aramak` Fonksiyon (isteğe bağlı) - Betik tamamlandıktan sonra çağrılır. 
  * `result` Any

`Promise` döndürür - çalışan kodun sonucuyla çözülen bir söz veya kodun sonucu reddedilen bir söz ise reddedilir.

Sayfadaki `code`'u değerlendirir.

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