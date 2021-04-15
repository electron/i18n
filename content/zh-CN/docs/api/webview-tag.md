# `<webview>`标签

## 警告

Electron的  `webview` 标签基于 [Chromium </code>webview </0> ][chrome-webview]，后者正在经历巨大的架构变化。 这将影响 `webview` 的稳定性，包括呈现、导航和事件路由。 我们目前建议不使用 `webview` 标签，并考虑其他替代方案，如 `iframe` 、Electron的 `BrowserView` 或完全避免嵌入内容的体系结构。

## 使

默认情况下，电子 >=5中禁用 `webview` 标记。  在构造 `BrowserWindow` 时，需要通过设置 `webviewTag` webPreferences选项来启用标签。 更多信息请参看 [BrowserWindows 的构造器文档](browser-window.md)。

## 概览

> 在一个独立的 frame 和进程里显示外部 web 内容。

进程: [渲染进程](../glossary.md#renderer-process)

使用 `webview` 标签将"客人"内容（如网页）嵌入到您的 电子应用中。 客人内容包含在 `webview` 容器中。 应用中的嵌入页面可以控制外来内容的布局和重绘。

与 `iframe`不同， `webview` 运行过程比您的 应用更独立。 它与您的网页没有相同的权限，应用和嵌入式内容之间 的所有交互都是异步的。 这将保证你的应用对于嵌入的内容的安全性。 ** 注意: **从宿主页上调用 webview 的方法大多数都需要对主进程进行同步调用。

## 示例

若要在应用程序中嵌入网页, 请将 ` webview ` 标签添加到应用程序的被嵌入页面中 (这是将显示外来内容的应用程序页)。 在最简单的例子中, ` webview ` 标签包括网页的 ` src ` 和控制 ` webview ` 容器外观的 css 样式:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

如果要以任何方式控制外来内容, 则可以写用于侦听 ` webview ` 事件的 JavaScript, 并使用 ` webview ` 方法响应这些事件。 下面是包含两个事件侦听器的示例代码: 一个侦听网页开始加载, 另一个用于网页停止加载, 并在加载时显示 "loading..." 消息:

```html
<script>
  加载=（）=> =
    联网查看=文档。查询器（"Webview"）
    连续指示器=文档。查询器（"指示器"）

    收缩加载启动器=（）=> {
      指示器。
    [

    联机负载停止=（）=> {
      指示器。内文本="
    "

    webview.add事件听者（"已启动加载"，加载启动）
    webview.add事件列表（"已停止加载"，加载端）
  }
</script>
```

## 内部实施

在引擎盖下， `webview` 实施与 [出过程的iframes（OOPIF）](https://www.chromium.org/developers/design-documents/oop-iframes)。 `webview` 标签本质上是使用阴影 DOM 将 `iframe` 元素包裹在里面的自定义元素。

因此， `webview` 的行为非常类似于跨领域 `iframe`，例如 例子：

* 当单击到 `webview`时，页面焦点将从嵌入器 帧移动到 `webview`。
* 您无法将键盘、鼠标和滚动事件侦听器添加到 `webview`。
* 嵌入器框架和 `webview` 之间的所有反应都是异步的。

## CSS 样式说明

请注意， `webview` 标签的风格在内部使用 `display:flex;` ， 以确保儿童 `iframe` 元素在使用传统和柔性盒布局时，能够填充其 `webview` 容器的全部高度和宽度。 请不要 覆盖 CSS 属性的默认 `display:flex;` ，除非指定内联布局的 `display:inline-flex;` 。

## 标签属性

`webview` 标签具有以下属性：

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

代表可见网址的 `String` 。 编写此属性会启动顶级 导航。

分配 `src` 自己的值将重新加载当前页面。

` src ` 属性还可以接受数据 url, 如 ` data:text/plain, Hellp,world! `。

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

一 `Boolean`。 当有此属性时, ` webview ` 中的访客页（guest page）将具有Node集成, 并且可以使用像 ` require ` 和 ` process ` 这样的node APIs 去访问低层系统资源。 Node 集成在访客页中默认是禁用的。

### `节点整合下框`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

在 `webview`内 等子帧中启用节点JS支持的实验选项 `Boolean` 。 您的所有预加载将加载每个 iframe，您可以 使用 `process.isMainFrame` 来确定您是否在主帧中。 此选项默认在访客页面中被禁用。

### `启用模式`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

一 `Boolean`。 当此属性 `false` 时， `webview` 中的访客页面将无法访问 [`remote`](remote.md) 模块。 默认情况下，远程模块不可用。

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

一 `Boolean`。 当此属性出现时， `webview` 中的访客页面将能够使用 浏览器插件。 默认情况下，插件已禁用。

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

指定在客人 页面中运行其他脚本之前加载的脚本的 `String` 。 该脚本的URL的协议必须是 `file:`  `asar:`二者之一，因为在访客页中，它是通过“内部”的 `require` 去加载的

当访客页没有 node integration ，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过Node 注入的全局对象（global objects）将会被删除。

**注意：** 此选项将显示为 `preloadURL` （不是 `preload`）， 指定给 `will-attach-webview` 事件的 `webPreferences` 。

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

为访客页面设置引用者 URL 的 `String` 。

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

在页面导航到之前为访客页面设置用户代理的 `String` 。 加载 页面后，使用 `setUserAgent` 方法更改用户代理。

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

一 `Boolean`。 当此属性出现时，访客页面将禁用 Web 安全。 默认情况下启用了 Web 安全。

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

设置页面使用的会话的 `String` 。 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 如果没有设置`partition`，app 将会使用默认的session。

此值只能在第一次导航之前进行修改，因为活动渲染器过程的会话 不能更改。 随后修改 值的尝试将失败，但 DOM 例外。

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

一 `Boolean`。 当此属性出现时，客人页面将被允许打开新的 窗口。 默认情况下，弹出窗口已禁用。

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

`String` ，这是一个逗号分离的字符串列表，其中指定在 Webview 上设置的 Web 首选项。 支持的首选项字符串的完整列表，请查看 [BrowserWindow](browser-window.md#new-browserwindowoptions)。

该字符串的格式与 ` window.open ` 中的功能字符串( the features string )相同。 只有自己名字的将被赋予 `true` 布尔值。 可以通过 `=` 来赋予其他值。 `yes` 和 `1` 会被解析成 `true`，而 `no` 和 `0` 解析为 `false`。

### `启用链接字体`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

`String` ，这是一个字符串列表，其中指定由 `,`启用的闪烁功能。 支持的功能字符串的完整列表可以在 [运行时间可受功能. json5][runtime-enabled-features] 文件中找到。

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

`String` ，这是一个字符串列表，其中指定闪烁功能由 `,`分开。 支持的功能字符串的完整列表可以在 [运行时间可受功能. json5][runtime-enabled-features] 文件中找到。

## 方法

`webview` 标签具有以下方法：

** 注意: **使用方法之前 <0>webview</0> 元素必须已被加载。

**示例**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (可选)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - 一个 HTTP Referrer url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` （[上传数据]](structures/upload-raw-data.md) | [上传文件[]](structures/upload-file.md)）（可选）
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

返回 `Promise<void>` - 当页面完成加载 时，承诺将解决（见 [`did-finish-load`](webview-tag.md#event-did-finish-load)），如果页面无法加载，则拒绝 （见 [`did-fail-load`](webview-tag.md#event-did-fail-load)）。

`webview` 中加载目标 url，url 地址必须包含协议前缀，例如：`http://` 或 `file://`。

### `<webview>.下载（网址）`

* `url` String

无需导航即可在 `url` 启动资源下载。

### `<webview>.getURL()`

返回 `String` - 访客页的URL。

### `<webview>.getTitle()`

返回 `String` - 访客页的标题。

### `<webview>.isLoading()`

返回 `Boolean` - 访客页是否仍然在加载资源。

### `<webview>.是加载大框架（）`

返回 `Boolean` - 主帧（而不仅仅是内框或帧）是否 仍在加载。

### `<webview>.isWaitingForResponse()`

返回 `Boolean` - 访客页面是否正在等待页面主资源的第一响应。

### `<webview>.stop()`

停止任何待定导航。

### `<webview>.reload()`

刷新访客页。

### `<webview>.reloadIgnoringCache()`

刷新访客页并忽略缓存。

### `<webview>.canGoBack()`

返回 `Boolean` - 访客页能否后退。

### `<webview>.canGoForward()`

返回 `Boolean` - 访客页能否前进。

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

返回 `Boolean` - 访客页能否前进到 `offset`。

### `<webview>.clearHistory()`

Clears the navigation history.

### `<webview>.goBack()`

使访客页后退。

### `<webview>.goForward()`

使访客页前进。

### `<webview>.goToIndex(index)`

* `index` Integer

定位到指定的绝对索引。

### `<webview>.goToOffset(offset)`

* `offset` Integer

定位到相对于“当前入口”的指定的偏移。

### `<webview>.isCrashed()`

返回 `Boolean` - 渲染器过程是否崩溃。

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

覆盖访客页的用户代理。

### `<webview>.getUserAgent()`

返回 `String` - 访客页的用户代理。

### `<webview>.insertCSS(css)`

* `css` String

返回 `Promise<String>` - 承诺，解决插入的 CSS的密钥，以后可用于通过 `<webview>.removeInsertedCSS(key)`删除CSS。

将 CSS 注入当前网页，并返回插入的 样式表的独特密钥。

### `<webview>.删除插电CSS（密钥）`

* `key` String

返回 `Promise<void>` - 如果删除成功，则解决。

从当前网页中删除插入的CSS。 样式表由其密钥 识别，该密钥从 `<webview>.insertCSS(css)`返回。

### `<webview>.执行贾瓦脚本（代码[，用户图]）`

* `code` String
* `userGesture` Boolean (可选) - 默认为 `false`。

返回 `Promise<any>` - 承诺会随着执行代码的结果 或被拒绝，如果代码的结果是被拒绝的承诺。

在页面中执行 `code`。 如果设置了`userGesture`，它将在页面中创建用户手势上下文。 像 `requestFullScreen` 这样的需要用户操作的HTML API可以利用这个选项来实现自动化。

### `<webview>.openDevTools()`

为访客页面打开一个开发窗口。

### `<webview>.closeDevTools()`

关闭访客页面的开发窗口。

### `<webview>.isDevToolsOpened()`

返回 `Boolean` - 是否附有一个DevTools窗口。

### `<webview>.isDevToolsFocused()`

返回 `Boolean` - 是否将DevTools窗口的客座页面集中。

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

开始检查客人页面位置（`x`， `y`）的元素。

### `<webview>。检查共享工人（）`

打开 DevTool，用于客座页面中所展示的共享员工上下文。

### `<webview>.inspectServiceWorker()`

为来宾页面中的服务人员上下文打开 DevTool。

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

设置访客页是否静音。

### `<webview>.isAudioMuted()`

返回 `Boolean` - 访客页是否被静音。

### `<webview>.是目前可听的（）`

返回 `Boolean` - 音频当前是否正在播放。

### `<webview>.undo()`

在页面中执行编辑命令 `undo`。

### `<webview>.redo()`

在页面中执行编辑命令 `redo`。

### `<webview>.cut()`

在页面中执行编辑命令 `cut`。

### `<webview>.copy()`

在页面中执行编辑命令 `copy`。

### `<webview>.paste()`

在页面中执行编辑命令 `paste`。

### `<webview>.pasteAndMatchStyle()`

在页面中执行编辑命令 `pasteAndMatchStyle`。

### `<webview>.delete()`

在页面中执行编辑命令 `delete`。

### `<webview>.selectAll()`

在页面中执行编辑命令 `selectAll`。

### `<webview>.unselect()`

在页面中执行编辑命令 `unselect`。

### `<webview>.replace(text)`

* `text` String

在页面中执行编辑命令 `replace`。

### `<webview>.replaceMisspelling(text)`

* `text` String

在页面中执行编辑命令 `replaceMisspelling`。

### `<webview>.insertText(text)`

* `text` String

返回 `Promise<void>`

插入`text` 到焦点元素

### `<webview>.findInPage(text[, options])`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选)
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` 布尔（可选） - 无论是第一次请求还是跟进， 默认 `false`。
  * `matchCase` 布尔（可选） - 搜索是否应对案件敏感， 默认 `false`。

返回 `Integer` - 用于请求的请求 ID。

开始请求查找网页中 `text` 的所有匹配项。 请求的结果 可以通过订阅 [`found-in-page`](webview-tag.md#event-found-in-page) 活动来获得。

### `<webview>.stopFindInPage(action)`

* `action` 字符串 - 指定在结束 [`<webview>.findInPage`](#webviewfindinpagetext-options) 请求时要执行的操作。
  * `clearSelection` - 清除选择。
  * `keepSelection` - 将选择转换为正常选择。
  * `activateSelection` - 聚焦并单击选择节点。

以所提供的 `action`停止任何 `findInPage` `webview` 请求。

### `<webview>.print([options])`

* `options` Object (可选)
  * `silent` 布尔（可选） - 不要向用户索要打印设置。 默认值为 `false`.
  * `printBackground` 布尔（可选） - 在网页上打印 背景颜色和图像。 默认值为 `false`.
  * `deviceName` 字符串（可选） - 设置打印机设备名称以使用。 必须是系统定义的名称，而不是"友好"名称，例如"Brother_QL_820NWB"，而不是"兄弟QL-820NWB"。
  * `color` 布尔（可选） - 设置印刷网页是彩色还是灰度。 默认值为 `true`。
  * `margins` 对象（可选）
    * `marginType` 字符串（可选） - 可以 `default`， `none`， `printableArea`，或 `custom`。 如果选择 `custom` ，您还需要指定 `top`、 `bottom`、 `left`和 `right`。
    * `top` 编号（可选） - 打印网页的最高边距，以像素表示。
    * `bottom` 编号（可选） - 打印网页的底边距，以像素表示。
    * `left` 编号（可选） - 打印网页的左边缘，以像素表示。
    * `right` 编号（可选） - 打印网页的右边缘，以像素表示。
  * `landscape` 布尔（可选） - 网页是否应该以横向模式打印。 默认值为 `false`.
  * `scaleFactor` 编号（可选） - 网页的刻度因子。
  * `pagesPerSheet` 编号（可选） - 每页打印页数。
  * `collate` 布尔（可选） - 是否应该整理网页。
  * `copies` 编号（可选） - 要打印的网页副本数。
  * `pageRanges` 对象[]（可选） - 要打印的页面范围。
    * `from` 编号 - 打印第一页的索引（0 基于）。
    * `to` 编号 - 打印最后一页的索引（含） （0 基于）。
  * `duplexMode` 字符串（可选） - 设置打印网页的复式模式。 可以 `simplex`， `shortEdge`，或 `longEdge`。
  * `dpi` 记录<string, number> （可选）
    * `horizontal` 编号（可选） - 水平dpi。
    * `vertical` 编号（可选） - 垂直dpi。
  * `header` 字符串（可选） - 要打印为页页头的字符串。
  * `footer` 字符串（可选） - 字符串要打印为页页页脚。
  * `pageSize` 字符串|大小（可选） - 指定打印文档的页面大小。 可以是 `A3`、 `A4`、 `A5`、 `Legal`、 `Letter`、 `Tabloid` 或含有 `height`的物体。

返回 `Promise<void>`

打印 `webview`的网页。 和 `webContents.print([options])`一样

### `<webview>.打印托普DF（选项）`

* `选项` 对象
  * `headerFooter` 记录<string, string> （可选） - PDF 的标题和脚。
    * `title` 字符串 - PDF 标题的标题。
    * `url` 字符串- PDF脚的网址。
  * `landscape` 布尔（可选） - `true` 景观， `false` 肖像。
  * `marginsType` 整数（可选） - 指定要使用的边距类型。 使用 0 表示 默认保证金，1 表示无保证金，2 表示最低保证金。 和微米 `width` 。
  * `scaleFactor` 编号（可选） - 网页的刻度因子。 范围从0到100。
  * `pageRanges` 记录<string, number> （可选） - 要打印的页面范围。 在macOS上，只有数组的第一个值被信任。
    * `from` 编号 - 打印第一页的索引（0 基于）。
    * `to` 编号 - 打印最后一页的索引（含） （0 基于）。
  * `pageSize` 字符串|大小（可选） - 指定生成的PDF的页面大小。 可 `A3`、 `A4`、 `A5`、 `Legal`、 `Letter`、 `Tabloid` 或含有 `height`
  * `printBackground` 布尔（可选） - 是否打印CSS背景。
  * `printSelectionOnly` 布尔（可选） - 是否只打印选择。

返回 `Promise<Uint8Array>` - 使用生成的 PDF 数据解决。

将 `webview`的网页打印为PDF，与 `webContents.printToPDF(options)`相同。

### `<webview>.捕获页（[rect]）`

* `rect` [矩形](structures/rectangle.md) （可选） - 要捕获的页面区域。

返回 `Promise<NativeImage>` - 解决与 [原生图像](native-image.md)

在 `rect`内捕获页面的快照。 省略 `rect` 将捕获整个可见页面。

### `<webview>.发送（频道，阿格斯）`

* `channel` String
* `...args` any[]

返回 `Promise<void>`

通过` channel `向渲染器进程发送异步消息，可以发送任意参数。 渲染器过程可以通过 [`ipcRenderer`](ipc-renderer.md) 模块收听 `channel` 事件来处理消息。

示例请进传送门： [webContents.send](web-contents.md#contentssendchannel-args)

### `<webview>.sendInputEvent(event)`

* `event`  [鼠标无名小](structures/mouse-input-event.md) | [鼠标轮无](structures/mouse-wheel-input-event.md) | [键盘因特](structures/keyboard-input-event.md)

返回 `Promise<void>`

向页面发送输入 `event` 。

有关 `event` 对象的详细描述，请参阅 [webContents.发送"事件](web-contents.md#contentssendinputeventinputevent) 。

### `<webview>.setZoomFactor(factor)`

* `factor` Number - 缩放比例

将缩放因子更改为指定因子。 缩放因子 缩放百分比除以 100，因此 300% = 3.0。

### `<webview>.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 原始大小为 0，高于或低于每个 增量表示放大 20% 或更小，默认 限制分别为原始大小的 300% 和 50%。 这样做的公式是 `scale := 1.2 ^ level`。

> **注**：Chromium 级别的缩放策略是同源的，这意味着特定域的 缩放级别在所有具有 同一域名的窗口实例中传播。 区分窗口网址将使每个窗口的缩放工作。

### `<webview>.获取僵尸因子（）`

返回 `Number` - 当前变焦因子。

### `<webview>.获取僵尸级别（）`

返回 `Number` - 当前缩放级别。

### `<webview>.设置视觉祖姆级别限制（最低级别、最大级别）`

* `minimumLevel` Number
* `maximumLevel` Number

返回 `Promise<void>`

设置最大和最小缩放级别。

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.获取网络控制（）`

返回 `Number` - 此 `webview`的网络内容 ID 。

## 多姆事件

`webview` 标签具有以下有效的 DOM 事件：

### Event: 'load-commit'

返回:

* `url` String
* `isMainFrame` Boolean

负载已提交时已激发。 这包括当前 文档内的导航以及子帧文档级负载，但不包括 异步资源负载。

### Event: 'did-finish-load'

导航完成时触发，即选项卡的旋转器将停止旋转，并指派` onload `事件后。（译者：网页加载的过程中，并不是所有的浏览器都是转圈圈，而且浏览器版本不同，加载效果也有可能不一样。其中 ie 和 chrome 是转圈圈，safari 是进度条，firefox是一个小点左右来回移动--20180103）

### Event: 'did-fail-load'

返回:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

这个事件类似于 `did-finish-load`, 不过是在加载失败或取消后触发，例如调用了 `window.stop()`

### Event: 'did-frame-finish-load'

返回:

* `isMainFrame` Boolean

当框架完成导航时发射。

### Event: 'did-start-loading'

对应于选项卡的微调器开始旋转的时间点。

### Event: 'did-stop-loading'

对应于选项卡的微调器停止旋转时的点。

### 事件: 'dom-ready'

加载给定帧中的文档时发射。

### 事件： 'page-title-updated'

返回:

* `title` String
* `explicitSet` Boolean

在导航过程中设置页面标题时激发。 当 标题从文件网址合成时，`explicitSet` 是错误的。

### 事件: 'page-favicon-updated'

返回:

* `favicons` String[] - 由连接组成的数组。

当页面收到法维肯网址时，就会被激发。

### 事件: 'enter-html-full-screen'

当页面进入由 HTML API 触发的全屏时触发。

### 事件: 'leave-html-full-screen'

当页面离开由HTML API触发的全屏时触发。

### Event: 'console-message'

返回:

* `level` 整数 - 日志级别，从 0 到 3。 为了它匹配 `verbose`， `info`， `warning` 和 `error`。
* `message` 字符串 - 实际控制台消息
* `line` 整数 - 触发此控制台消息的源的行数
* `sourceId` String

当访客窗口记录控制台消息时，已激发。

下示例代码将所有日志消息转发到嵌入器的主机 而不顾日志级别或其他属性。

```javascript
续网查看=文档。查询器（"Webview"）
网络视图。addVentlister（"控制台消息"，（e）=> •
  控制台.log（"访客页面记录了消息：'，e.消息）
}）
```

### Event: 'found-in-page'

返回:

* `result` 对象
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - 当前匹配位置。
  * `matches` Integer - 符合匹配条件的元素个数。
  * `selectionArea` 矩形 - 第一个匹配区域的坐标。
  * `finalUpdate` Boolean

当结果可用于 [`webview.findInPage`](#webviewfindinpagetext-options) 请求时，则激发。

```javascript
续网查看=文档.查询器（"webview"）
网页浏览。add事件列表（"在页面中找到"，（e）=> {
  网页浏览。停止查找页面（"保留选择"）
}）

最热烈的请求id=Webview.findInPage（"测试"）
控制台.log（请求）
```

### Event: 'new-window'

返回:

* `url` String
* `frameName` String
* `disposition` String - 可以被设置为 `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` 及 `other`.
* `options` 浏览器窗口构建选项 - 应用于创建新 [`BrowserWindow`](browser-window.md)的选项。

当访客页面尝试打开新的浏览器窗口时，该窗口被激发。

以下示例代码在系统默认浏览器中打开新 url。

```javascript
康斯特 { shell } =要求（"电子"）
联网查看=文档。查询器（"Webview"）

网络视图。 不对称 （e） => =
  const 协议 = （新 URL （e. url）. 协议
  如果 （协议 = "http：" ||协议 = "https："） {
    等待壳体。 打开外部 （e. url）
  [
]
```

### Event: 'will-navigate'

返回:

* `url` String

当用户或页面想要开始导航时发出。 当 `window.location` 对象更改或用户单击页面中的链接时，可能会发生这种情况。

当使用 `<webview>.loadURL` 和 `<webview>.back`等 ABI 进行程序化导航时，此事件不会发出。

它也不会在页面导航期间发出，例如单击锚链接 或更新 `window.location.hash`。 为此目的使用 `did-navigate-in-page` 活动 。

打电话给 `event.preventDefault()` ____ 没有任何效果。

### Event: 'did-navigate'

返回:

* `url` String

导航完成后发出。

此事件不用于页面导航，例如单击锚链接 或更新 `window.location.hash`。 为此目的使用 `did-navigate-in-page` 活动 。

### Event: 'did-navigate-in-page'

返回:

* `isMainFrame` Boolean
* `url` String

当发生页内导航时，触发该事件。

当发生页内导航时，虽然页面地址发生变化，但它并没有导航到其它页面。 例如，点击锚点链接，或者DOM的 `hashchange`事件被触发时，都会触发该事件。

### 事件： 'close'

当访客页面尝试关闭自己时，已激发。

当 客人试图关闭时，以下示例代码在 `webview` 中导航到 `about:blank` 。

```javascript
康斯特网络视图=文档。查询器（"Webview"）
网络视图。add事件听者（"关闭"，（）=> {
  网络视图。src="关于：空白"
}）
```

### 活动： "ipc 消息"

返回:

* `channel` String
* `args` 任何[]

当访客页面向嵌入器页面发送异步消息时，就会被激发。

使用 `sendToHost` 方法和 `ipc-message` 活动，您可以在访客页面和嵌入页之间 进行通信：

```javascript
在嵌入页中。
续网查看 = 文档. 查询器 （"webview"）
webview. add 事件听者 （"ipc 消息"， （事件） => {
  控制台.log （事件. 频道）
  // 打印 "pong"
}）
webview.
```

```javascript
在来宾页面。
康斯特 { ipcRenderer } =要求（'电子'）
ipcRenderer.on（'平'，（）=> {
  ipcRenderer.发送到（'乒乓'）
}）
```

### Event: 'crashed'

当渲染器进程崩溃时，已激发。

### Event: 'plugin-crashed'

返回:

* `name` String
* `version` String

当插件进程崩溃时，已激发。

### Event: 'destroyed'

当网络内容被销毁时，就会被激发。

### Event: 'media-started-playing'

多媒体开始播放时，触发该事件。

### Event: 'media-paused'

当媒体文件暂停或播放完成的时候触发

### Event: 'did-change-theme-color'

返回:

* `themeColor` String

当页面的主题颜色发生变化时发出。 这通常是由于遇到元标记：

```html
<meta name='theme-color' content='#ff0000'>
```

### Event: 'update-target-url'

返回:

* `url` String

当鼠标滑到，或者键盘切换到a连接时，触发该事件。

### Event: 'devtools-opened'

当开发者工具被打开时，触发该事件。

### Event: 'devtools-closed'

当开发者工具被关闭时，触发该事件。

### Event: 'devtools-focused'

当开发者工具被选中/打开时，触发该事件。

[runtime-enabled-features]: https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70
[chrome-webview]: https://developer.chrome.com/docs/extensions/reference/webviewTag/
