# webFrame

> 自定义渲染当前网页

进程: [渲染进程](../glossary.md#renderer-process)

将当前页缩放到200% 的示例。

```javascript
const {webFrame} = require('electron')
webFrame.setZoomFactor(2)
```

## 方法

`webFrame`模块包含以下方法：

### `webFrame.setZoomFactor(factor)`

* `factor` Number - 缩放比例

更改缩放比例。缩放比例是缩放百分比除以 100，如 300% = 3.0。

### `webFrame.getZoomFactor()`

Returns `Number` - 当前的缩放比例。

### `webFrame.setZoomLevel(level)`

* `level` Number - Zoom level

更改缩放等级。 The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### `webFrame.getZoomLevel()`

Returns `Number` - The current zoom level.

### `webFrame.setZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

** 已弃用: **请调用 ` setVisualZoomLevelLimits ` 来设置可视化缩放级别限制。此方法将在Electron 2.0 中删除。

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小缩放级别。

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

Sets the maximum and minimum layout-based (i.e. non-visual) zoom level.

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Object 
  * `spellCheck` Function - Returns `Boolean` 
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

安全方案不会触发混合内容警告。 例如，`https` 和 `data`是安全的方案，因为它们不能被活跃的网络攻击者破坏。

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` String

无论当前页的内容安全策略如何, 都将从该 ` scheme ` 中加载资源。

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` String
* `options` Object (可选) 
  * `secure` Boolean - (optional) Default true.
  * `bypassCSP` Boolean - (optional) Default true.
  * `allowServiceWorkers` Boolean - (optional) Default true.
  * `supportFetchAPI` Boolean - (optional) Default true.
  * `corsEnabled` Boolean - (optional) Default true.

将 ` scheme ` 注册为安全, 绕过资源的内容安全策略, 允许注册 ServiceWorker 并支持获取 API。

指定一个值为 ` false ` 的选项, 将其从注册中省略。在不绕过内容安全策略的情况下注册特权方案的示例:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

插入`text` 到焦点元素

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Returns `Promise` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

### `webFrame.getResourceUsage()`

返回 ` Object `:

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

尝试释放不再使用的内存 (如以前导航中的图像)。

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).