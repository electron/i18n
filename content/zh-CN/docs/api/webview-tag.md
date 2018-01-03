# `<webview>`标签

> 在一个独立的 frame 和进程里显示外部 web 内容。

Process: [Renderer](../tutorial/quick-start.md#renderer-process)

使用 ` webview ` 标签在Electron 应用中嵌入 "外来" 内容 (如 网页)。外来"内容包含在 ` webview ` 容器中。 应用中的嵌入页面可以控制外来内容的布局和重绘。

与 ` iframe ` 不同, ` webview ` 在与应用程序不同的进程中运行。它与您的网页没有相同的权限, 应用程序和嵌入内容之间的所有交互都将是异步的。 这将保证你的应用对于嵌入的内容的安全性。 ** 注意: **从宿主页上调用 webview 的方法大多数都需要对主进程进行同步调用。

## 例子

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

## CSS 样式说明

请注意，`webview` 标签的样式使用 `display:flex;` 来确保 ` 子元素 `在传统和弹性盒布局（自v0.36.11以来）一起使用的情况下填充其webview容器的全部高度和宽度。 请不要覆盖重写默认的 `display:flex;` CSS 样式，除了用` display:inline-flex; ` 来做内联布局

`webview` 在使用 `hidden`或`display: none;` 来做隐藏时会出现一些问题。 它会引起其子 ` browserplugin ` 对象的一些异常渲染，即当 `webview` 回到非隐藏状态（un-hidden）时，网页将被重新加载。 建议的方法是使用 ` visibility: hidden ` 来隐藏 ` webview `。

```html
<style>
  webview {
    display:inline-flex;
    width:640px;
    height:480px;
  }
  webview.hide {
    visibility: hidden;
  }
</style>
```

## 标签属性

`webview` 标签有一下属性：

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
<webview src="https://electron.atom.io" partition="electron"></webview>
```

Sets the session used by the page. 如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 通过分配相同的 ` partition `, 多个页可以共享同一会话。 如果没有设置`partition`，app 将会使用默认的session。

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

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. The full list of supported preference strings can be found in [BrowserWindow](browser-window.md#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `` are interpreted as `false`.

### `blinkfeatures`

```html
<webview src="https://www.github.com/" blinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.

### `disableblinkfeatures`

```html
<webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>
```

A list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/platform/RuntimeEnabledFeatures.json5?l=62) file.

### `guestinstance`

```html
<webview src="https://www.github.com/" guestinstance="3"></webview>
```

A value that links the webview to a specific webContents. When a webview first loads a new webContents is created and this attribute is set to its instance identifier. Setting this attribute on a new or existing webview connects it to the existing webContents that currently renders in a different webview.

The existing webview will see the `destroy` event and will then create a new webContents when a new url is loaded.

### `disableguestresize`

```html
<webview src="https://www.github.com/" disableguestresize></webview>
```

When this attribute is present the `webview` contents will be prevented from resizing when the `webview` element itself is resized.

This can be used in combination with [`webContents.setSize`](web-contents.md#contentssetsizeoptions) to manually resize the webview contents in reaction to a window size change. This can make resizing faster compared to relying on the webview element bounds to automatically resize the contents.

```javascript
const {webContents} = require('electron')

// We assume that `win` points to a `BrowserWindow` instance containing a
// `<webview>` with `disableguestresize`.

win.on('resize', () => {
  const [width, height] = win.getContentSize()
  for (let wc of webContents.getAllWebContents()) {
    // Check if `wc` belongs to a webview in the `win` window.
    if (wc.hostWebContents &&
        wc.hostWebContents.id === win.webContents.id) {
      wc.setSize({
        normal: {
          width: width,
          height: height
        }
      })
    }
  }
})
```

## 方法

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**例子**

```javascript
const webview = document.querySelector('webview')
webview.addEventListener('dom-ready', () => {
  webview.openDevTools()
})
```

### `<webview>.loadURL(url[, options])`

* `url` URL
* `options` Object (可选) 
  * `httpReferrer` String (optional) - A HTTP Referrer url.
  * `userAgent` String (optional) - A user agent originating the request.
  * `extraHeaders` String (optional) - Extra headers separated by "\n"
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadFileSystem[]](structures/upload-file-system.md) | [UploadBlob[]](structures/upload-blob.md)) - (optional)
  * `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### `<webview>.getURL()`

Returns `String` - The URL of guest page.

### `<webview>.getTitle()`

Returns `String` - The title of guest page.

### `<webview>.isLoading()`

Returns `Boolean` - Whether guest page is still loading resources.

### `<webview>.isWaitingForResponse()`

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### `<webview>.stop()`

Stops any pending navigation.

### `<webview>.reload()`

Reloads the guest page.

### `<webview>.reloadIgnoringCache()`

Reloads the guest page and ignores cache.

### `<webview>.canGoBack()`

Returns `Boolean` - Whether the guest page can go back.

### `<webview>.canGoForward()`

Returns `Boolean` - Whether the guest page can go forward.

### `<webview>.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### `<webview>.clearHistory()`

Clears the navigation history.

### `<webview>.goBack()`

Makes the guest page go back.

### `<webview>.goForward()`

Makes the guest page go forward.

### `<webview>.goToIndex(index)`

* `index` Integer

Navigates to the specified absolute index.

### `<webview>.goToOffset(offset)`

* `offset` Integer

Navigates to the specified offset from the "current entry".

### `<webview>.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

### `<webview>.setUserAgent(userAgent)`

* `userAgent` String

Overrides the user agent for the guest page.

### `<webview>.getUserAgent()`

Returns `String` - The user agent for guest page.

### `<webview>.insertCSS(css)`

* `css` String

Injects CSS into the guest page.

### `<webview>.executeJavaScript(code, userGesture, callback)`

* `code` String
* `userGesture` Boolean - Default `false`.
* `callback` Function (optional) - Called after script has been executed. 
  * `result` Any

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

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

Set guest page muted.

### `<webview>.isAudioMuted()`

Returns `Boolean` - Whether guest page has been muted.

### `<webview>.undo()`

Executes editing command `undo` in page.

### `<webview>.redo()`

Executes editing command `redo` in page.

### `<webview>.cut()`

Executes editing command `cut` in page.

### `<webview>.copy()`

Executes editing command `copy` in page.

### `<webview>.paste()`

Executes editing command `paste` in page.

### `<webview>.pasteAndMatchStyle()`

Executes editing command `pasteAndMatchStyle` in page.

### `<webview>.delete()`

Executes editing command `delete` in page.

### `<webview>.selectAll()`

Executes editing command `selectAll` in page.

### `<webview>.unselect()`

Executes editing command `unselect` in page.

### `<webview>.replace(text)`

* `text` String

Executes editing command `replace` in page.

### `<webview>.replaceMisspelling(text)`

* `text` String

Executes editing command `replaceMisspelling` in page.

### `<webview>.insertText(text)`

* `text` String

Inserts `text` to the focused element.

### `<webview>.findInPage(text[, options])`

* `text` String - Content to be searched, must not be empty.
* `options` Object (可选) 
  * `forward` Boolean - (optional) Whether to search forward or backward, defaults to `true`.
  * `findNext` Boolean - (optional) Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean - (optional) Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean - (optional) Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean - (optional) When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Starts a request to find all matches for the `text` in the web page and returns an `Integer` representing the request id used for the request. The result of the request can be obtained by subscribing to [`found-in-page`](webview-tag.md#event-found-in-page) event.

### `<webview>.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](webview-tag.md#webviewtagfindinpage) request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### `<webview>.print([options])`

* `options` Object (可选) 
  * `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### `<webview>.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer - (optional) Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String - (optional) Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean - (optional) Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean - (optional) Whether to print selection only.
  * `landscape` Boolean - (optional) `true` for landscape, `false` for portrait.
* `callback` Function 
  * `error` Error
  * `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### `<webview>.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured
* `callback` Function 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### `<webview>.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the `ipcRenderer` module.

See [webContents.send](web-contents.md#webcontentssendchannel-args) for examples.

### `<webview>.sendInputEvent(event)`

* `event` Object

Sends an input `event` to the page.

See [webContents.sendInputEvent](web-contents.md#webcontentssendinputeventevent) for detailed description of `event` object.

### `<webview>.setZoomFactor(factor)`

* `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### `<webview>.setZoomLevel(level)`

* `level` Number - Zoom level

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### `<webview>.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

### `<webview>.getWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents associated with this `webview`.

## DOM events

The following DOM events are available to the `webview` tag:

### Event: 'load-commit'

返回:

* `url` String
* `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### Event: 'did-finish-load'

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### Event: 'did-fail-load'

返回:

* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

返回:

* `isMainFrame` Boolean

Fired when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'did-get-response-details'

返回:

* `status` Boolean
* `newURL` String
* `originalURL` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String
* `headers` Object
* `resourceType` String

Fired when details regarding a requested resource is available. `status` indicates socket connection to download the resource.

### Event: 'did-get-redirect-request'

返回:

* `oldURL` String
* `newURL` String
* `isMainFrame` Boolean

Fired when a redirect was received while requesting a resource.

### Event: 'dom-ready'

Fired when document in the given frame is loaded.

### 事件： 'page-title-updated'

返回:

* `title` String
* `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### Event: 'page-favicon-updated'

返回:

* `favicons` String[] - Array of URLs.

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
  * `activeMatchOrdinal` Integer - Position of the active match.
  * `matches` Integer - Number of Matches.
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](webview-tag.md#webviewtagfindinpage) request.

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
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
* `options` Object - The options which should be used for creating the new `BrowserWindow`.

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

```javascript
const {shell} = require('electron')
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

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

### 事件：close

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

With `sendToHost` method and `ipc-message` event you can easily communicate between guest page and embedder page:

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
const {ipcRenderer} = require('electron')
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

Emitted when media starts playing.

### Event: 'media-paused'

Emitted when media is paused or done playing.

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

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### Event: 'devtools-opened'

Emitted when DevTools is opened.

### Event: 'devtools-closed'

Emitted when DevTools is closed.

### Event: 'devtools-focused'

Emitted when DevTools is focused / opened.