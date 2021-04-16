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
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md)) (optional)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

返回 `Promise<void>` - 当页面完成加载 时，承诺将解决（见 [`did-finish-load`](webview-tag.md#event-did-finish-load)），如果页面无法加载，则拒绝 （见 [`did-fail-load`](webview-tag.md#event-did-fail-load)）。

`webview` 中加载目标 url，url 地址必须包含协议前缀，例如：`http://` 或 `file://`。

### `<webview>.下载（网址）`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

返回 `String` - 访客页的URL。

### `<webview>.getTitle()`

返回 `String` - 访客页的标题。

### `<webview>.isLoading()`

返回 `Boolean` - 访客页是否仍然在加载资源。

### `<webview>.是加载大框架（）`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

### `<webview>.isWaitingForResponse()`

返回 `Boolean` - 访客页面是否正在等待页面主资源的第一响应。

### `<webview>.stop()`

Stops any pending navigation.

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

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

覆盖访客页的用户代理。

### `<webview>.getUserAgent()`

返回 `String` - 访客页的用户代理。

### `<webview>.insertCSS(css)`

* `css` String

返回 `Promise<String>` - 承诺，解决插入的 CSS的密钥，以后可用于通过 `<webview>.removeInsertedCSS(key)`删除CSS。

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.删除插电CSS（密钥）`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. 样式表由其密钥 识别，该密钥从 `<webview>.insertCSS(css)`返回。

### `<webview>.执行贾瓦脚本（代码[，用户图]）`

* `code` String
* `userGesture` Boolean (可选) - 默认为 `false`。

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

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

Returns `Boolean` - Whether audio is currently playing.

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
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. 请求的结果 可以通过订阅 [`found-in-page`](webview-tag.md#event-found-in-page) 活动来获得。

### `<webview>.stopFindInPage(action)`

* `action` 字符串 - 指定在结束 [`<webview>.findInPage`](#webviewfindinpagetext-options) 请求时要执行的操作。
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Object (可选)
  * `silent` Boolean (optional) - Don't ask user for print settings. 默认值为 `false`.
  * `printBackground` Boolean (optional) - Prints the background color and image of the web page. 默认值为 `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Must be the system-defined name and not the 'friendly' name, e.g 'Brother_QL_820NWB' and not 'Brother QL-820NWB'.
  * `color` Boolean (optional) - Set whether the printed web page will be in color or grayscale. 默认值为 `true`。
  * `margins` Object (optional)
    * `marginType` String (optional) - Can be `default`, `none`, `printableArea`, or `custom`. If `custom` is chosen, you will also need to specify `top`, `bottom`, `left`, and `right`.
    * `top` Number (optional) - The top margin of the printed web page, in pixels.
    * `bottom` Number (optional) - The bottom margin of the printed web page, in pixels.
    * `left` Number (optional) - The left margin of the printed web page, in pixels.
    * `right` Number (optional) - The right margin of the printed web page, in pixels.
  * `landscape` Boolean (optional) - Whether the web page should be printed in landscape mode. 默认值为 `false`.
  * `scaleFactor` Number (optional) - The scale factor of the web page.
  * `pagesPerSheet` Number (optional) - The number of pages to print per page sheet.
  * `collate` Boolean (optional) - Whether the web page should be collated.
  * `copies` Number (optional) - The number of copies of the web page to print.
  * `pageRanges` Object[] (optional) - The page range to print.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.

返回 `Promise<void>`

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options)`

* `选项` 对象
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and `width` in microns.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print. 在macOS上，只有数组的第一个值被信任。
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Uint8Array>` - Resolves with the generated PDF data.

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options)`.

### `<webview>.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

Returns `Promise<NativeImage>` - Resolves with a [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Omitting `rect` will capture the whole visible page.

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` any[]

返回 `Promise<void>`

通过` channel `向渲染器进程发送异步消息，可以发送任意参数。 The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

示例请进传送门： [webContents.send](web-contents.md#contentssendchannel-args)

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

返回 `Promise<void>`

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventinputevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - 缩放比例

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

### `<webview>.getZoomFactor()`

Returns `Number` - the current zoom factor.

### `<webview>.getZoomLevel()`

Returns `Number` - the current zoom level.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

返回 `Promise<void>`

设置最大和最小缩放级别。

### `<webview>.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContentsId()`

Returns `Number` - The WebContents ID of this `webview`.

## DOM Events

`webview` 标签具有以下有效的 DOM 事件：

### Event: 'load-commit'

返回:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

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

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### 事件: 'dom-ready'

Fired when document in the given frame is loaded.

### 事件： 'page-title-updated'

返回:

* `title` String
* `explicitSet` Boolean

在导航过程中设置页面标题时激发。 当 标题从文件网址合成时，`explicitSet` 是错误的。

### 事件: 'page-favicon-updated'

返回:

* `favicons` String[] - 由连接组成的数组。

Fired when page receives favicon urls.

### 事件: 'enter-html-full-screen'

Fired when page enters fullscreen triggered by HTML API.

### 事件: 'leave-html-full-screen'

Fired when page leaves fullscreen triggered by HTML API.

### Event: 'console-message'

返回:

* `level` Integer - The log level, from 0 to 3. In order it matches `verbose`, `info`, `warning` and `error`.
* `message` String - The actual console message
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Fired when the guest window logs a console message.

下示例代码将所有日志消息转发到嵌入器的主机 而不顾日志级别或其他属性。

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('console-message', (e) => {
  console.log('Guest page logged a message:', e.message)
})
```

### Event: 'found-in-page'

返回:

* `result` Object
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - 当前匹配位置。
  * `matches` Integer - 符合匹配条件的元素个数。
  * `selectionArea` Rectangle - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('found-in-page', (e) => {
  webview.stopFindInPage('keepSelection')
})

const requestId = webview.findInPage('test')
console.log(requestId)
```

### Event: 'new-window'

返回:

* `url` String
* `frameName` String
* `disposition` String - 可以被设置为 `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` 及 `other`.
* `options` BrowserWindowConstructorOptions - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', async (e) => {
  const protocol = (new URL(e.url)).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    await shell.openExternal(e.url)
  }
})
```

### Event: 'will-navigate'

返回:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does __NOT__ have any effect.

### Event: 'did-navigate'

返回:

* `url` String

Emitted when a navigation is done.

此事件不用于页面导航，例如单击锚链接 或更新 `window.location.hash`。 Use `did-navigate-in-page` event for this purpose.

### Event: 'did-navigate-in-page'

返回:

* `isMainFrame` Boolean
* `url` String

当发生页内导航时，触发该事件。

当发生页内导航时，虽然页面地址发生变化，但它并没有导航到其它页面。 例如，点击锚点链接，或者DOM的 `hashchange`事件被触发时，都会触发该事件。

### 事件： 'close'

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('close', () => {
  webview.src = 'about:blank'
})
```

### Event: 'ipc-message'

返回:

* `channel` String
* `args` any[]

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

```javascript
// In embedder page.
const webview = document.querySelector('webview')
webview.addEventListener('ipc-message', (event) => {
  console.log(event.channel)
  // Prints "pong"
})
webview.send('ping')
```

```javascript
// In guest page.
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

Fired when the renderer process is crashed.

### Event: 'plugin-crashed'

返回:

* `name` String
* `version` String

Fired when a plugin process is crashed.

### Event: 'destroyed'

Fired when the WebContents is destroyed.

### Event: 'media-started-playing'

多媒体开始播放时，触发该事件。

### Event: 'media-paused'

当媒体文件暂停或播放完成的时候触发

### Event: 'did-change-theme-color'

返回:

* `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

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
