# webFrame

> Настройка отображения текущей веб-страницы.

Процесс: [Renderer](../glossary.md#renderer-process)

Пример масштабирования текущей страницы до 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Методы

`webFrame` имеет следующие методы:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - фактор увилечения.

Изменяет указанный масштаб. Коэффициент масштабирования является процент масштабирования, делится на 100, поэтому 300% = 3.0.

### `webFrame.getZoomFactor()`

Возвращает `Number` - текущего маштаба.

### `webFrame.setZoomLevel(level)`

* `level` Number - Zoom level.

Изменяет уровень масштаба на указанный уровень. Оригинальный размер 0 и каждое приращение выше или ниже представляет масштабирование 20% больше или меньше, по умолчанию ограничение на 300% и 50% от исходного размера, соответственно.

### `webFrame.getZoomLevel()`

Возвращает `Number` - текущего уровня маштаба.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Устанавливает максимальный и минимальный уровень пинч-маштабирования.

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Устанавливает максимальный и минимальный на основе слоя (т.е. невизуальный) уровень масштаба.

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Object 
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

* `scheme` String
* `options` Object (опиционально) 
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

Вставляет `text` в элемент с фокусом.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (опиционально) - по умолчанию `false`.
* `callback` Function (опционально) - вызывается после выполнения сценария. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Вычисляет `code` на странице.

В окне браузера некоторые HTML API как `requestFullScreen` может быть только вызван жестом пользователя. Указание `userGesture` как `true` снимает это ограничение.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (опиционально) - по умолчанию `false`.
* `callback` Function (опционально) - вызывается после выполнения сценария. 
  * `result` Any

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.getResourceUsage()`

Возвращает `Object`:

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
  cssStyleSheets: { /* то же самое с "images" */ },
  xslStyleSheets: { /* то же самое с "images" */ },
  fonts: { /* то же самое с "images" */ },
  other: { /* то же самое с "images" */ }
}
```

### `webFrame.clearCache()`

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).