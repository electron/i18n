# webFrame

> 自定义渲染当前网页

进程: [渲染进程](../glossary.md#renderer-process)

`webFrame` 电子模块的导出是代表当前 `BrowserWindow`顶部框架的 `WebFrame` 类的实例。 子帧可以 某些属性和方法检索（例如 `webFrame.firstChild`）。

将当前页缩放到200% 的示例。

```javascript
const { webFrame } = require('electron')
webFrame.setZoomFactor(2)
```

## 方法

`WebFrame` 类有以下实例方法：

### `webFrame.setZoomFactor(factor)`

* `factor` 双 - 缩放因子：默认值为1.0。

将缩放因子更改为指定因子。 缩放因子 缩放百分比除以 100，因此 300% = 3.0。

该系数必须大于 0.0。

### `webFrame.getZoomFactor()`

Returns `Number` - 当前的缩放比例。

### `webFrame.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 原始大小为 0，高于或低于每个 增量表示放大 20% 或更小，默认 限制分别为原始大小的 300% 和 50%。

> **注**：Chromium 级别的缩放策略是同源的，这意味着特定域的 缩放级别在所有具有 同一域名的窗口实例中传播。 区分窗口网址将使每个窗口的缩放工作。

### `网络框架。获取僵尸级别（）`

返回 `Number` - 当前缩放级别。

### `webFrame.设置视觉祖姆级别限制（最低级别、最大级别）`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小缩放级别。

> **注意**：电子中默认禁用视觉变焦。 要重新启用它，请致电：
> 
> ```js
网络框架. 设置视觉僵尸级别限制 （1， 3）
```

### `网络框架. 设置斯佩尔检查提供者 （语言， 提供商）`

* `language` 字符串
* `provider` 对象
  * `spellCheck` 功能
    * `words` 字符串[]
    * `callback` Function
      * `misspeltWords` 字符串[]

设置输入字段和文本区域的拼写检查提供商。

如果你想使用这种方法，你必须禁用内置拼写检查器，当你 构建窗口。

```js
主窗口=新浏览器窗口（{
  网络预测： {
    spellcheck: false
  }
}）
```

`provider` 必须是具有 `spellCheck` 方法的对象，接受 一系列单独的单词进行拼写检查。 `spellCheck` 功能同步运行，完成后用一系列拼写错误的单词调用 `callback` 函数 。

使用 [节点拼写检查器][spellchecker] 作为提供商的示例：

```javascript
康斯特 { webFrame } =要求（"电子"）
咒语检查器=要求（"拼写检查器"）
网络框架。 {
  拼写检查（单词，回调）{
    设置超时（）=> =
      const拼写检查器=要求（"拼写检查器"）
      连续拼写错误=单词。 过滤器（x => 拼写检查器。拼写错误（x）
      回调（拼写错误）
    }，0）
  }
}）
```

### `网络框架。插入CSS（cs）`

* `css` 字符串-CSS源代码。

返回 `String` - 插入的CSS的密钥，以后可用于通过 `webFrame.removeInsertedCSS(key)` CSS中删除。

将 CSS 注入当前网页，并返回插入的 样式表的独特密钥。

### `网络框架。删除插电CSS（密钥）`

* `key` String

从当前网页中删除插入的CSS。 样式表由其密钥 识别，该密钥从 `webFrame.insertCSS(css)`返回。

### `网络框架。插入文本（文本）`

* `text` String

插入`text` 到焦点元素

### `Web框架。执行贾瓦脚本（代码[，用户图片，回调]）`

* `code` String
* `userGesture` 布尔（可选） - 默认是 `false`。
* `callback` 函数（可选） - 执行脚本后调用。 除非 帧被暂停（例如显示模式警报），否则执行将同步 ，并在方法返回之前调用回调。 对于与旧版本此方法的 兼容性，误差参数 秒。
  * `result` Any
  * `error` Error

返回 `Promise<any>` - 承诺，解决与执行的 代码的结果，或被拒绝，如果执行抛出或导致拒绝的承诺。

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

### `webFrame.执行贾瓦脚本独立世界（世界ID，脚本[，用户图片，回调]）`

* `worldId` 整数 - 运行 javascript 的世界 ID， `0` 是默认的主要世界（内容运行的地方）， `999` 是电子 `contextIsolation` 功能使用 世界。 接受 1.536870911 范围内的 值。
* `scripts` [网络来源[]](structures/web-source.md)
* `userGesture` 布尔（可选） - 默认是 `false`。
* `callback` 函数（可选） - 执行脚本后调用。 除非 帧被暂停（例如显示模式警报），否则执行将同步 ，并在方法返回之前调用回调。  对于与旧版本此方法的 兼容性，误差参数 秒。
  * `result` Any
  * `error` Error

返回 `Promise<any>` - 承诺，通过执行 代码的结果解决，或在执行无法启动时被拒绝。

工作原理像 `executeJavaScript` ，但在一个孤立的上下文中评估 `scripts` 。

请注意，当脚本执行失败时，返回的承诺不会 拒绝， `result` 将 `undefined`。 这是因为铬不 向外国世界发送孤立世界的错误。

### `网络框架.集孤立的世界信息（世界ID，信息）`

* `worldId` 整数 - 运行javascript的世界ID， `0` 是默认的世界， `999` 是电子 `contextIsolation` 功能使用的世界。 铬扩展保留 `[1 << 20, 1 << 29)`中的 ID 范围。 您可以在此处提供任何整数。
* `info` 对象
  * `securityOrigin` 字符串（可选） - 孤立世界的安全来源。
  * `csp` 字符串（可选） - 孤立世界的内容安全策略。
  * `name` 字符串（可选） - 孤立世界的名称。 在开发人员中很有用。

设置孤立世界的安全源、内容安全政策和名称。 注意：如果指定了 `csp` ，则还必须指定 `securityOrigin` 。

### `网络框架。获取资源使用（）`

返回 ` Object `:

* `images` [记忆使用尾声](structures/memory-usage-details.md)
* `scripts` [记忆使用尾声](structures/memory-usage-details.md)
* `cssStyleSheets` [记忆使用尾声](structures/memory-usage-details.md)
* `xslStyleSheets` [记忆使用尾声](structures/memory-usage-details.md)
* `fonts` [记忆使用尾声](structures/memory-usage-details.md)
* `other` [记忆使用尾声](structures/memory-usage-details.md)

返回描述 Blink 内部内存使用信息的对象 缓存。

```javascript
const { webFrame } = require('electron')
console.log(webFrame.getResourceUsage())
```

这将生成：

```javascript
[
  图像： {
    count: 22,
    size: 2549,
    liveSize: 2542
  }，
  csstylesheets： [/] 与 "图像" 相同 */ [，
  xsl样式表： [/] 与 "图像" 相同 [/]
  字体： [/] 与 "图像" 相同 [/]
  其他： [/] 与 "图像" 相同 [/ ]
]
```

### `网络框架。清除缓存（）`

尝试释放不再使用的内存 (如以前导航中的图像)。

请注意, 盲目调用此方法可能使Electron较慢, 因为它将不得不重新填充这些清空的缓存。你应该只在这种情况下调用它, 就是当你的应用程序发生的一个事件, 使你认为你的网页实际只使用了较少的内存 (例如你从一个超级重页跳转到一个基本为空的页面, 并打算留在那)。

### `网络框架.获取框架为电子（选择器）`

* `selector` 字符串 - 帧元素的CSS选择器。

返回 `WebFrame` - `selector`选择的 `webFrame's` 文档中的帧元素，如果 `selector` 不选择帧或 如果框架不在当前渲染器过程中，则会返回 `null` 。

### `网络框架。查找框架名称（名称）`

* `name` String

返回 `WebFrame` - `webFrame` 的孩子与提供的 `name`， `null` 将返回，如果没有这样的框架，或者如果框架不在目前的 渲染器过程中。

### `网络框架.查找框架通过路由ID（路由ID）`

* `routingId` 整数 - 表示当前渲染器过程中 唯一帧 ID 的 `Integer` 。 路由 ID 可以从 `WebFrame` 实例（`webFrame.routingId`）中检索，也可以通过框架 特定 `WebContents` 导航事件（例如 `did-frame-navigate`）

返回 `WebFrame` - 已提供 `routingId`， `null` ，如果没有找到。

### `网络框架。是单词拼写（单词）`

* `word` 字符串 - 要拼写检查的单词。

返回 `Boolean` - 如果单词根据内置的拼写检查器拼错， 则返回 - 否则是虚假的。 如果没有加载字典，请始终返回错误。

### `网络框架。获取单词（单词）`

* `word` 字符串 - 拼写错误的单词。

返回 `String[]` - 给定单词的建议单词列表。 如果 单词拼写正确，结果将是空的。

## Properties

### `webFrame.top` _·里德利·_

`WebFrame | null` 表示 `webFrame` 所属的帧层次结构中的顶框，如果顶帧不在当前 渲染器过程中，则属性将 `null` 。

### `webFrame.opener` _·里德利·_

代表 `webFrame`打开的框架的 `WebFrame | null` ，如果没有开瓶器或开瓶器不在当前渲染器过程中，则该属性 `null` 。

### `webFrame.parent` _·里德利·_

代表 `webFrame`父框架的 `WebFrame | null` ，如果 `webFrame` 处于顶部或父不在当前渲染器过程中，则该属性将被 `null` 。

### `webFrame.firstChild` _·里德利·_

作为代表 `webFrame`第一个儿童框架的 `WebFrame | null` ，如果 `webFrame` 没有孩子，或者如果第一个孩子不在目前的渲染过程中，财产 将 `null` 。

### `webFrame.nextSibling` _·里德利·_

`WebFrame | null` 代表下一个兄弟姐妹框架，如果 `webFrame` 是其父中的最后一帧，或者如果下一个兄弟姐妹不在当前渲染器 过程中，则该属性将被 `null` 。

### `webFrame.routingId` _·里德利·_

表示当前渲染器过程中唯一帧 ID 的 `Integer` 。 指同一底层框架的不同 WebFrame 实例将具有相同的 `routingId` 。

[spellchecker]: https://github.com/atom/node-spellchecker
