# webFrame

> Настройка отображения текущей веб-страницы.

Процесс: [Renderer](../glossary.md#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

Пример масштабирования текущей страницы до 200%.

```javascript
const { webFrame } = require('electron')

webFrame.setZoomFactor(2)
```

## Методы

The `WebFrame` class has the following instance methods:

### `webFrame.setZoomFactor(factor)`

* `factor` Number - фактор увилечения.

Изменяет указанный масштаб. Коэффициент масштабирования является процент масштабирования, делится на 100, поэтому 300% = 3.0.

### `webFrame.getZoomFactor()`

Возвращает `Number` - текущего маштаба.

### `webFrame.setZoomLevel(level)`

* `level` Number - уровень увеличения.

Изменяет уровень масштаба на указанный уровень. Оригинальный размер 0 и каждое приращение выше или ниже представляет масштабирование 20% больше или меньше, по умолчанию ограничение на 300% и 50% от исходного размера, соответственно.

### `webFrame.getZoomLevel()`

Возвращает `Number` - текущего уровня маштаба.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Устанавливает максимальный и минимальный уровень пинч-маштабирования.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
webFrame.setVisualZoomLevelLimits(1, 3)
```

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Устанавливает максимальный и минимальный на основе слоя (т.е. невизуальный) уровень масштаба.

### `webFrame.setSpellCheckProvider(language, provider)`

* `language` String
* `provider` Object 
  * `spellCheck` Function. 
    * `words` String[]
    * `callback` Function 
      * `misspeltWords` String[]

Задает поставщика для проверки орфографии в полях ввода и текстовых областях.

The `provider` must be an object that has a `spellCheck` method that accepts an array of individual words for spellchecking. The `spellCheck` function runs asynchronously and calls the `callback` function with an array of misspelt words when complete.

Пример использования [node-spellchecker](https://github.com/atom/node-spellchecker) как поставщик:

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

### `webFrame.insertText(text)`

* `text` String

Вставляет `text` в элемент с фокусом.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (опиционально) - по умолчанию `false`.
* `callback` Function (опционально) - вызывается после выполнения сценария. 
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Вычисляет `code` на странице.

В окне браузера некоторые HTML API как `requestFullScreen` может быть только вызван жестом пользователя. Указание `userGesture` как `true` снимает это ограничение.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (опиционально) - по умолчанию `false`.
* `callback` Function (опционально) - вызывается после выполнения сценария. 
  * `result` Any

Work like `executeJavaScript` but evaluates `scripts` in an isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)` *(Deprecated)*

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.setIsolatedWorldInfo(worldId, info)`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
* `info` Object 
  * `securityOrigin` String (optional) - Security origin for the isolated world.
  * `csp` String (optional) - Content Security Policy for the isolated world.
  * `name` String (optional) - Name for isolated world. Useful in devtools.

Set the security origin, content security policy and name of the isolated world. Note: If the `csp` is specified, then the `securityOrigin` also has to be specified.

### `webFrame.getResourceUsage()`

Возвращает `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `scripts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Возвращает объект, описывающий сведения об использовании Blink внутренней памяти кэшей.

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

Это будет генерировать:

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

Пытается освободить память, которая больше не используется (например, изображения из предыдущей навигации).

Обратите внимание, что безрассудный вызов этого метода вероятно замедлит Electron, поскольку ему придется чистить кэши даже если они уже пустые, так что этот метод следует вызывать только в случае, когда вы уверены, что страница стала использовать меньше памяти (например, произошел переход с супер-тяжёлой страницы на лёгкую без ожидаемого возврата обратно на тяжёлую).

### `webFrame.getFrameForSelector(selector)`

* `selector` String - CSS selector for a frame element.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByName(name)`

* `name` String

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### `webFrame.findFrameByRoutingId(routingId)`

* `routingId` Integer - An `Integer` representing the unique frame id in the current renderer process. Routing IDs can be retrieved from `WebFrame` instances (`webFrame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

## Свойства

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