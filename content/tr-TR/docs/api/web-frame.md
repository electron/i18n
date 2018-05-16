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

* `level` Number - Zoom level.

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
  * `spellCheck` Function - Returns `Boolean`. 
    * `text` String

Sets a provider for spell checking in input fields and text areas.

The `provider` must be an object that has a `spellCheck` method that returns whether the word passed is correctly spelled.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

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

Registers the `scheme` as secure scheme.

Secure schemes do not trigger mixed content warnings. For example, `https` and `data` are secure schemes because they cannot be corrupted by active network attackers.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` Dizi
* `seçenekler` Nesne (isteğe bağlı) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

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
* `geri aramak` Function (isteğe bağlı) - Script çalıştıktan sonra çağırılır. 
  * `result` Any

`Promise` döndürür - çalışan kodun sonucuyla çözülen bir söz veya kodun sonucu reddedilen bir söz ise reddedilir.

Sayfadaki `code`'u değerlendirir.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
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

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

This will generate:

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

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).