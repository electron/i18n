# `<webview>`标签

## 警告

Electron的  `webview` 标签基于 [Chromium </code>webview </0> ][chrome-webview]，后者正在经历巨大的架构变化。 这将影响 `webview` 的稳定性，包括呈现、导航和事件路由。 我们目前建议不使用 `webview` 标签，并考虑其他替代方案，如 `iframe` ，[Electron的 `BrowserView`](browser-view.md) 或完全避免嵌入内容的架构。

## 启用

默认情况下，Electron >= 5禁用 `webview` 标签。  在构造 `BrowserWindow` 时，需要通过设置 `webviewTag` webPreferences选项来启用标签。 更多信息请参看 [BrowserWindows 的构造器文档](browser-window.md)。

## 概览

> 在一个独立的 frame 和进程里显示外部 web 内容。

进程: [渲染进程](../glossary.md#renderer-process)

使用 `webview` 标签将'guest'内容 (例如网页) 嵌入到您的 Electron 应用中。 Guest 内容包含在 `webview` 容器内。 应用中的嵌入页面可以控制外来内容的布局和重绘。

与 `iframe`不同， `webview` 独立于您的应用程序运行。 它拥有和你的页面不一样的权限并且所嵌入的内容和你应用之间的交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。 ** 注意: **从宿主页上调用 webview 的方法大多数都需要对主进程进行同步调用。

## 示例

若要在应用程序中嵌入网页, 请将 ` webview ` 标签添加到应用程序的被嵌入页面中 (这是将显示外来内容的应用程序页)。 在最简单的例子中, ` webview ` 标签包括网页的 ` src ` 和控制 ` webview ` 容器外观的 css 样式:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

如果要以任何方式控制外来内容, 则可以写用于侦听 ` webview ` 事件的 JavaScript, 并使用 ` webview ` 方法响应这些事件。 下面是包含两个事件侦听器的示例代码: 一个侦听网页开始加载, 另一个用于网页停止加载, 并在加载时显示 "loading..." 消息:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

## 内部实现

在内部  `webview` 与 [过程外 iframes（OOPIF）](https://www.chromium.org/developers/design-documents/oop-iframes)一起实施。 `webview` 标签本质上是一个自定义元素，使用 shadow DOM 将 `iframe` 元素包裹在里面。

因此， `webview` 的行为与跨域 `iframe` 非常相似，例如：

* 在 `webview` 中单击时，页面焦点将从嵌入器移动到 `webview`。
* 您无法将键盘、鼠标和滚动事件侦听器添加到 `webview`。
* 嵌入器框架和 `webview` 之间的所有反应都是异步的。

## CSS 样式说明

请注意，`webview` 标签的样式使用 `display:flex;` 来确保 ` iframe `在传统和 flex 布局一起使用的情况下填充其 `webview` 容器的全部高度和宽度。 除非指定内联布局的 `display:inline-flex;` ，否则请不要 覆盖默认 `display:flex;` CSS属性。

## 标签属性

`webview` 标签具有以下属性：

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

表示可见网址的 `String` 。 Writing to this attribute initiates top-level navigation.

更改 `src` 的值将重新加载当前页面。

` src ` 属性还可以接受数据 URL, 如 ` data:text/plain, Hello, world! `。

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

一个 `Boolean`。 当有此属性时, ` webview ` 中的访客页（guest page）将具有Node集成, 并且可以使用像 ` require ` 和 ` process ` 这样的node APIs 去访问低层系统资源。 Node 集成在访客页中默认是禁用的。

### `nodeintegrationinsubframes`

```html
<webview src="http://www.google.com/" nodeintegrationinsubframes></webview>
```

A `Boolean` for the experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. Node 集成在访客页中默认是禁用的。

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

一个 `Boolean`。 When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is unavailable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

一个 `Boolean`。 When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

A `String` that specifies a script that will be loaded before other scripts run in the guest page. 该脚本的URL的协议必须是 `file:`  `asar:`二者之一，因为在访客页中，它是通过“内部”的 `require` 去加载的

当访客页没有 node integration ，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过Node 注入的全局对象（global objects）将会被删除。

**Note:** This option will appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

A `String` that sets the referrer URL for the guest page.

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

A `String` that sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

一个 `Boolean`。 When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

A `String` that sets the session used by the page. 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 如果没有设置`partition`，app 将会使用默认的session。

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

一个 `Boolean`。 When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

`String` 是一个由逗号分割的字符串列表，其中指定了要设置在 webview 上的 Web 首选项。 支持的首选项字符串的完整列表，请查看 [BrowserWindow](browser-window.md#new-browserwindowoptions)。

该字符串的格式与 ` window.open ` 中的功能字符串( the features string )相同。 只有自己名字的将被赋予 `true` 布尔值。 可以通过 `=` 来赋予其他值。 `yes` 和 `1` 会被解析成 `true`，而 `no` 和 `0` 解析为 `false`。

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A `String` which is a list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5][runtime-enabled-features] file.

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
  * `postData` ([UploadRawData](structures/upload-raw-data.md) | [UploadFile](structures/upload-file.md))[] (optional)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

Returns `Promise<void>` - The promise will resolve when the page has finished loading (see [`did-finish-load`](webview-tag.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](webview-tag.md#event-did-fail-load)).

`webview` 中加载目标 url，url 地址必须包含协议前缀，例如：`http://` 或 `file://`。

### `<webview>.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating.

### `<webview>.getURL()`

返回 `String` - 访客页的URL。

### `<webview>.getTitle()`

返回 `String` - 访客页的标题。

### `<webview>.isLoading()`

返回 `Boolean` - 访客页是否仍然在加载资源。

### `<webview>.isLoadingMainFrame()`

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

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `<webview>.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

### `<webview>.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `<webview>.insertCSS(css)`.

### `<webview>.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (可选) - 默认为 `false`。

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

在页面中执行 `code`。 如果设置了`userGesture`，它将在页面中创建用户手势上下文。 像 `requestFullScreen` 这样的需要用户操作的HTML API可以利用这个选项来实现自动化。

### `<webview>.openDevTools()`

打开 guest 页面的 DevTools 窗口。

### `<webview>.closeDevTools()`

关闭 guest 页面的 DevTools 窗口。

### `<webview>.isDevToolsOpened()`

返回 `Boolean` - guest 页面是否打开了 Devtools。

### `<webview>.isDevToolsFocused()`

返回 `Boolean` - guest 页面的 DevTools 窗口是否聚焦。

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### `<webview>.inspectSharedWorker()`

Opens the DevTools for the shared worker context present in the guest page.

### `<webview>.inspectServiceWorker()`

Opens the DevTools for the service worker context present in the guest page.

### `<webview>.setAudioMuted(muted)`

* `muted` Boolean

设置访客页是否静音。

### `<webview>.isAudioMuted()`

返回 `Boolean` - 访客页是否被静音。

### `<webview>.isCurrentlyAudible()`

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

Returns `Promise<void>`

插入`text` 到焦点元素

### `<webview>.findInPage(text[, options])`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选)
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` Boolean (可选) - 是否使用此请求开始一个新的文本查找会话。 对于初始请求应该为 `true` ，对后续请求为 `false` 。 默认值为 `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
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
  * `margins` Object (可选)
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
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. 可以是 `simplex`、`shortEdge` 或 `longEdge`。
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.

Returns `Promise<void>`

Prints `webview`'s web page. 与 `webContents.print([options])` 相同.

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

返回 `Promise<NativeImage>` - 完成后返回一个[NativeImage](native-image.md)

在 `rect`内捕获页面的快照。 省略 `rect` 将捕获整个可见页面。

### `<webview>.send(channel, ...args)`

* `channel` String
* `...args` any[]

Returns `Promise<void>`

通过` channel `向渲染器进程发送异步消息，可以发送任意参数。 The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

示例请进传送门： [webContents.send](web-contents.md#contentssendchannel-args)

### `<webview>.sendInputEvent(event)`

* `event`  [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Returns `Promise<void>`

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

Returns `Promise<void>`

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

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

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

* `result` 对象
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

### 事件: 'new-window'

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

### 事件: 'crashed'

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
