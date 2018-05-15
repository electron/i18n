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

* `level` Number - уровень увеличения.

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
  * `spellCheck` Function - возвращает `Boolean`. 
    * `text` String

Задает поставщика для проверки орфографии в полях ввода и текстовых областях.

`provider` должен быть объект, имеющий `spellCheck` метод, возвращающий, результат правильного написания слова.

Пример использования [node-spellchecker](https://github.com/atom/node-spellchecker) как поставщик:

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

Регистрирует `scheme` как безопасную схему.

Безопасные схемы не допускают смешанного контента предупреждений. Например `https` и `data` являются безопасными схемами, потому что они не могут быть повреждены активными сетевыми атаками.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

Ресурсы будут загружены из этой `scheme` независимо от текущей страницы и политики безопасности контента.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (опционально) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Регистрирует `scheme` как безопасную, обходит политику безопасности контента для ресурсов, позволяет регистрировать ServiceWorker и поддерживает получение API.

Указав параметр со значением `false` - исключит его из регистрации. Пример регистрации привилегированной схемы, без обхода политики безопасности контента:

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

Возвращает объект, описывающий сведения об использовании Blink внутренней памяти кэшей.

```javascript
const {webFrame} = require('electron')
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