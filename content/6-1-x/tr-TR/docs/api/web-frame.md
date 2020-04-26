# webFrame

> Geçerli web sayfasının görünümünü özelleştirin.

İşlem: [Renderer](../glossary.md#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Geçerli sayfayı% 200'e yakınlaştırmaya bir örnek.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Yöntemler

The `WebFrame` class has the following instance methods:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - Yakınlaştırma faktörü.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

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

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> `js
  webFrame.setVisualZoomLevelLimits(1, 3)`

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Maksimum ve minimum layout-tabanlı (yani görsel olmayan) yakınlaştırma düzeyini ayarlar.

### `webFrame.setSpellCheckProvider(language, provider)`

* `language` String
* `provider` Object
  * `spellCheck` Function.
    * `words` String[]
    * `callback` Function
      * `misspeltWords` String[]

Giriş alanlarında ve metin alanlarında yazım denetimi için bir provider ayarlar.

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

Provider gibi [node-spellchecker](https://github.com/atom/node-spellchecker) kullanılarak bir örnek:

```javascript
const { webFrame } = require('electron')
const spellChecker = require('spellchecker')
webFrame.setSpellCheckProvider('en-US', {
  spellCheck (words, callback) {
    setTimeout(() => {
      const spellchecker = require('spellchecker')
      const misspelled = words.filter(x => spellchecker.isMisspelled(x))
      callback(misspelled)
    }, 0)
  }
})
```

### `webFrame.insertCSS(css)`

* `css` String - CSS source code.

Inserts `css` as a style sheet in the document.

### `webFrame.insertText(text)`

* `text` String

Odaklanmış öğeye `metin` ekler.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` Dizgi
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
* `callback` Function (optional) - Called after script has been executed.
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sayfadaki `code`'u ölçer.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

**[Deprecated Soon](modernization/promisification.md)**

### `webFrame.executeJavaScript(code[, userGesture])`

* `code` Dizgi
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Sayfadaki `code`'u ölçer.

Tarayıcı penceresinde, `requestFullScreen` gibi bazı HTML API'leri yalnızca kullanıcıdan gelen bir hareket ile çağrılmaktadır. `userGesture` ayarını `true` olarak ayarladığınızda bu sınırlama kaldırılır.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.
* `callback` Function (optional) - Called after script has been executed.
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

**[Deprecated Soon](modernization/promisification.md)**

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (isteğe bağlı) - Varsayılan `false`'dur.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)` _(Deprecated)_

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)` _(Deprecated)_

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `name` Dizi

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)` _(Deprecated)_

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.setIsolatedWorldInfo(worldId, info)`
* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. Chrome extensions reserve the range of IDs in `[1 << 20, 1 << 29)`. You can provide any integer here.
* `info` Object
  * `securityOrigin` String (optional) - Security origin for the isolated world.
  * `csp` String (optional) - Content Security Policy for the isolated world.
  * `name` String (optional) - Name for isolated world. Useful in devtools.

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

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
const { webFrame } = require('electron')
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
