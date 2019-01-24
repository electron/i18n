# `<webview>`标签

## Warning

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

## Overview

> 在一个独立的 frame 和进程里显示外部 web 内容。

进程: [ Renderer](../glossary.md#renderer-process)

使用 ` webview ` 标签在Electron 应用中嵌入 "外来" 内容 (如 网页)。外来"内容包含在 ` webview ` 容器中。 应用中的嵌入页面可以控制外来内容的布局和重绘。

与 ` iframe ` 不同, ` webview ` 在与应用程序不同的进程中运行。它与您的网页没有相同的权限, 应用程序和嵌入内容之间的所有交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。 ** 注意: **从宿主页上调用 webview 的方法大多数都需要对主进程进行同步调用。

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

## Internal implementation

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

## CSS 样式说明

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## 标签属性

`webview` 标签具有以下属性：

### `src`

```html
<webview src="https://www.github.com/"></webview>
```

Returns the visible URL. Writing to this attribute initiates top-level navigation.

Assigning `src` its own value will reload the current page.

` src ` 属性还可以接受数据 url, 如 ` data:text/plain, Hellp,world! `。

### `autosize`

```html
<webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>
```

当此属性存在时, ` webview ` 容器将在属性指定的范围内自动调整大小, 其范围为 ` minwidth `、` minheight `、` maxwidth ` 和 ` maxheight `。 除非启用 ` autosize `, 否则这些约束不会影响 ` webview `。 当启用 ` autosize ` 时, ` webview ` 容器的大小不能小于最小值或大于最大。

### `nodeintegration`

```html
<webview src="http://www.google.com/" nodeintegration></webview>
```

当有此属性时, ` webview ` 中的访客页（guest page）将具有Node集成, 并且可以使用像 ` require ` 和 ` process ` 这样的node APIs 去访问低层系统资源。 Node 集成在访客页中默认是禁用的。

### `enableremotemodule`

```html
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](remote.md) module. The remote module is avaiable by default.

### `plugins`

```html
<webview src="https://www.github.com/" plugins></webview>
```

当有此属性时， `webview`中的访客页将有能力去使用浏览器的插件，Plugins 默认是禁用的。

### `preload`

```html
<webview src="https://www.github.com/" preload="./test.js"></webview>
```

指定一个脚本在访客页中其他脚本执行之前先加载。 该脚本的URL的协议必须是 `file:` `asar:`二者之一，因为在访客页中，它是通过“内部”的 `require` 去加载的

当访客页没有 node integration ，这个脚本仍然有能力去访问所有的 Node APIs, 但是当这个脚本执行执行完成之后，通过Node 注入的全局对象（global objects）将会被删除。

**注意:** 在为 `will-attach-webview` 事件指定 `webPreferences` 时，这个选项将作为 `preloadURL` 出现，而不是 `preload`。

### `httpreferrer`

```html
<webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>
```

为访客页设置 referrer URL

### `useragent`

```html
<webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>
```

在访客页被导航（navigated）之前，为它设置 user agent，一旦这个页面加载之后，使用 `setUserAgent` 方法去改变这个页面的 user agent。

### `disablewebsecurity`

```html
<webview src="https://www.github.com/" disablewebsecurity></webview>
```

当有这个属性时，访客页的 web安全将被禁用，web安全默认是启用

### `partition`

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://electronjs.org" partition="electron"></webview>
```

设置页面使用的会话。 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 如果没有设置`partition`，app 将会使用默认的session。

此值只能在第一次导航之前修改, 因为活动的渲染进程的会话无法更改。尝试修改该值将会失败, 并会出现一个 DOM 异常。

### `allowpopups`

```html
<webview src="https://www.github.com/" allowpopups></webview>
```

当出现此属性时, 访客页将被允许打开新窗口。Popups 默认禁用。

### `webpreferences`

```html
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
```

一个设置在 webview 上的 web 首选项的字符串列表，通过 `,` 号分割。 支持的首选项字符串的完整列表，请查看 [BrowserWindow](browser-window.md#new-browserwindowoptions)。

该字符串的格式与 ` window.open ` 中的功能字符串( the features string )相同。 只有自己名字的将被赋予 `true` 布尔值。 可以通过 `=` 来赋予其他值。 `yes` 和 `1` 会被解析成 `true`，而 `no` 和 `0` 解析为 `false`。

### `enableblinkfeatures`

```html
<webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

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
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (可选) - 用 "\n" 分割的额外标题
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

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

向访客页注入CSS。

### `<webview>.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (可选) - 默认为 `false`。
* `callback` Function (可选) - 在脚本被执行后被调用。 
  * `result` Any

在页面中执行 `code`。 如果设置了`userGesture`，它将在页面中创建用户手势上下文。 像 `requestFullScreen` 这样的需要用户操作的HTML API可以利用这个选项来实现自动化。

### `<webview>.openDevTools()`

Opens a DevTools window for guest page.

### `<webview>.closeDevTools()`

Closes the DevTools window of guest page.

### `<webview>.isDevToolsOpened()`

Returns `Boolean` - Whether guest page has a DevTools window attached.

### `<webview>.isDevToolsFocused()`

Returns `Boolean` - Whether DevTools window of guest page is focused.

### `<webview>.inspectElement(x, y)`

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

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

插入`text` 到焦点元素

### `<webview>.findInPage(text[, options])`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选) 
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

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
  * `silent` Boolean (可选) - 不询问用户打印信息，默认为 `false`。
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function - 回调函数 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.
* `callback` Function - 回调函数 
  * `image` [NativeImage](native-image.md)

捕获 `requestFullScreen` 的页面的一个快照，类似于 `webContents.capturePage([rect, ]callback)`。

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

通过` channel `向渲染器进程发送异步消息，可以发送任意参数。 The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](ipc-renderer.md) module.

示例请进传送门： [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) 

### `<webview>.sendInputEvent(event)`

* `event` Object

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#contentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - 缩放比例

更改缩放比例。缩放比例是缩放百分比除以 100，如 300% = 3.0。

### `<webview>.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

### `<webview>.getZoomFactor(callback)`

* `callback` Function - 回调函数 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

### `<webview>.getZoomLevel(callback)`

* `callback` Function - 回调函数 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

### `<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小缩放级别。

### `<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小基于布局(例如非图像)的缩放级别。

### `<webview>.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

It depends on the [`remote`](remote.md) module, it is therefore not available when this module is disabled.

## DOM 事件

`webview` 标签具有以下有效的 DOM 事件：

### Event: 'load-commit'

返回:

* `url` String
* `isMainFrame` Boolean

发生load 加载时触发。 这包括当前文档中的导航以及子框架文档级加载(subframe document-level loads)，但不包括异步资源加载。

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

* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

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
  * `selectionArea` Object - Coordinates of first match region.
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
* `options` Object - The options which should be used for creating the new [`BrowserWindow`](browser-window.md).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const { shell } = require('electron')
const webview = document.querySelector('webview')

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    shell.openExternal(e.url)
  }
})
```

### Event: 'will-navigate'

返回:

* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### Event: 'did-navigate'

返回:

* `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

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
* `args` Array

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
// 在访客页。
const { ipcRenderer } = require('electron')
ipcRenderer.on('ping', () => {
  ipcRenderer.sendToHost('pong')
})
```

### Event: 'crashed'

Fired when the renderer process is crashed.

### Event: 'gpu-crashed'

Fired when the gpu process is crashed.

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