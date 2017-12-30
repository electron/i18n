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

Yakınlaştırma düzeyini belirtilen seviyeye değiştirir. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

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

M aksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

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

Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (isteğe bağlı) 
  * `secure` Boolean - (isteğe bağlı) Varsayılan true.
  * `bypassCSP` Boolean - (isteğe bağlı) Varsayılan true.
  * `allowServiceWorkers` Boolean - (isteğe bağlı) Varsayılan true.
  * `supportFetchAPI` Boolean - (isteğe bağlı) Varsayılan true.
  * `corsEnabled` Boolean - (isteğe bağlı) Varsayılan true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Inserts `text` to the focused element.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
* `callback` Function (isteğe bağlı) - Script çalıştıktan sonra çağırılır. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### `webFrame.getResourceUsage()`

`Object` döndürür:

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

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).