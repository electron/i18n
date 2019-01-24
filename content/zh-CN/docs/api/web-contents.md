# webContents

> 渲染以及控制 web 页面

进程：[主进程](../glossary.md#main-process)

` webContents ` 是 [ EventEmitter ](https://nodejs.org/api/events.html#events_class_eventemitter)的实例， 负责渲染和控制网页, 是 [` BrowserWindow `](browser-window.md) 对象的一个属性。 这是一个访问 `webContents` 对象的例子:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('http://github.com')

let contents = win.webContents
console.log(contents)
```

## 方法

通过`webContents`模块可以访问以下方法：

```javascript
const { webContents } = require('electron')
console.log(webContents)
```

### `webContents.getAllWebContents()`

返回 `WebContents[]` - 所有 `WebContents` 实例的数组。 包含所有Windows，webviews，opened devtools 和 devtools 扩展背景页的 web 内容

### `webContents.getFocusedWebContents()`

Returns `WebContents` - 此 app 中焦点的 web 内容，否则返回 `null`。

### `webContents.fromId(id)`

* `id` Integer

Returns `WebContents` - 给定 id 的 WebContents 实例。

## 类: WebContents

> 渲染和控制 BrowserWindow 实例的内容。

进程：[主进程](../glossary.md#main-process)

### 实例事件

#### Event: 'did-finish-load'

导航完成时触发，即选项卡的旋转器将停止旋转，并指派` onload `事件后。

#### Event: 'did-fail-load'

返回:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

这个事件类似于 `did-finish-load`, 不过是在加载失败或取消后触发，例如调用了 `window.stop()` 。 完整的错误码列表以及含义，[请看这](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h)

#### Event: 'did-frame-finish-load'

返回:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

当框架完成导航（navigation）时触发

#### Event: 'did-start-loading'

当tab中的旋转指针（spinner）开始旋转时，就会触发该事件。

#### Event: 'did-stop-loading'

当tab中的旋转指针（spinner）结束旋转时，就会触发该事件。

#### 事件: 'dom-ready'

返回:

* `event` Event

一个框架中的文本加载完成后触发该事件。

#### 事件: 'page-favicon-updated'

返回:

* `event` Event
* `favicons` String[] - 由连接组成的数组。

当页面获取到favicon的连接时，触发该事件。

#### Event: 'new-window'

返回:

* `event` Event
* `url` String
* `frameName` String
* `disposition` String - 可以被设置为 `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` 及 `other`.
* `options` Object - 用于创建新的 [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - 非标准功能(非标准功能是指这些功能不是由Chromium或Electron处理的功能)，这些功能默认指向`window.open()`.
* `referrer` [Referrer](structures/referrer.md) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

当页面请求打开地址为 ` url ` 的新窗口时触发。可以通过 ` window.open ` 或外部链接 (如 `<a target='_blank'>`) 触发。

默认情况下, 将为 ` url ` 创建新的 ` BrowserWindow `。

调用`event.preventDefault()`事件，可以阻止Electron自动创建新的[`BrowserWindow`](browser-window.md)实例。 调用`event.preventDefault()` 事件后，你还可以手动创建新的[`BrowserWindow`](browser-window.md)实例，不过接下来你必须用`event.newGuest`方法来引用[`BrowserWindow`](browser-window.md)实例，如果你不这样做，则可能会产生异常。 例如：

```javascript
myBrowserWindow.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  const win = new BrowserWindow({ show: false })
  win.once('ready-to-show', () => win.show())
  win.loadURL(url)
  event.newGuest = win
})
```

#### Event: 'will-navigate'

返回:

* `event` Event
* `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

调用`event.preventDefault()`将阻止导航。

#### Event: 'did-start-navigation'

返回:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### Event: 'will-redirect'

返回:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation. For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### Event: 'did-redirect-navigation'

返回:

* `event` Event
* `url` String
* `isInPlace` Boolean
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### Event: 'did-navigate'

返回:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-frame-navigate'

返回:

* `event` Event
* `url` String
* `httpResponseCode` Integer - -1 for non HTTP navigations
* `httpStatusText` String - empty for non HTTP navigations,
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### Event: 'did-navigate-in-page'

返回:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` Integer
* `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

当发生页内导航时，虽然页面地址发生变化，但它并没有导航到其它页面。 例如，点击锚点链接，或者DOM的 `hashchange`事件被触发时，都会触发该事件。

#### Event: 'will-prevent-unload'

返回:

* `event` Event

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBox(win, {
    type: 'question',
    buttons: ['Leave', 'Stay'],
    title: 'Do you want to leave this site?',
    message: 'Changes you made may not be saved.',
    defaultId: 0,
    cancelId: 1
  })
  const leave = (choice === 0)
  if (leave) {
    event.preventDefault()
  }
})
```

#### Event: 'crashed'

返回:

* `event` Event
* `killed` Boolean

当渲染进程崩溃或被结束时触发

#### 事件: 'unresponsive'

网页变得未响应时触发

#### 事件: 'responsive'

未响应的页面变成响应时触发

#### Event: 'plugin-crashed'

返回:

* `event` Event
* `name` String
* `version` String

当有插件进程崩溃时触发

#### Event: 'destroyed'

当`webContents`被销毁时，触发该事件。

#### Event: 'before-input-event'

返回:

* `event` Event
* `input` Object - Input属性. 
  * `type` String - 可以是 `keyUp` ，或者 `keyDown`.
  * `key` String - 等同于 [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` code ` String - 等同于 [KeyboardEvent. code ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` isAutoRepeat ` String - 等同于 [KeyboardEvent. repeat ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` shift ` String - 等同于 [KeyboardEvent.shiftKey ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` control ` String - 等同于 [KeyboardEvent. controlKey ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` alt ` String - 等同于 [KeyboardEvent. altKey ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
  * ` meta ` String - 等同于 [KeyboardEvent. metaKey ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })

win.webContents.on('before-input-event', (event, input) => {
  // For example, only enable application menu keyboard shortcuts when
  // Ctrl/Cmd are down.
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### Event: 'devtools-opened'

当开发者工具被打开时，触发该事件。

#### Event: 'devtools-closed'

当开发者工具被关闭时，触发该事件。

#### Event: 'devtools-focused'

当开发者工具被选中/打开时，触发该事件。

#### 事件: 'certificate-error'

返回:

* `event` Event
* `url` String
* `error` String - 错误码.
* `certificate` [证书](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - 用于显示证书是否可信。

`证书`的`链接`验证失败时，触发该事件。

使用方式与[`app`的`certificate-error`](app.md#event-certificate-error)的事件相同。

#### 事件: 'select-client-certificate'

返回:

* `event` Event
* `url` URL
* `certificateList` [证书[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) - Must be a certificate from the given list.

当一个客户证书被请求的时候发出。

使用方式与[`app`的`select-client-certificate`](app.md#event-select-client-certificate)的事件相同。

#### 事件: "login"

返回:

* `event` Event
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function - 回调函数 
  * `username` String
  * `password` String

当 ` webContents ` 要进行基本身份验证时触发。

使用方式与[`app`的`login`](app.md#event-login)的事件相同。

#### Event: 'found-in-page'

返回:

* `event` Event
* `result` Object 
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - 当前匹配位置。
  * `matches` Integer - 符合匹配条件的元素个数。
  * `selectionArea` Object - Coordinates of first match region.
  * `finalUpdate` Boolean

如果调用[`webContents.findInPage`]有返回时，会触发这一事件。

#### Event: 'media-started-playing'

多媒体开始播放时，触发该事件。

#### Event: 'media-paused'

当媒体文件暂停或播放完成的时候触发

#### Event: 'did-change-theme-color'

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

```html
<meta name='theme-color' content='#ff0000'>
```

返回:

* `event` Event
* `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

#### Event: 'update-target-url'

返回:

* `event` Event
* `url` String

当鼠标滑到，或者键盘切换到a连接时，触发该事件。

#### Event: 'cursor-changed'

返回:

* `event` Event
* `type` String
* `image` [NativeImage](native-image.md) (可选)
* `scale` Float (optional) - scaling factor for the custom cursor.
* `size` [Size](structures/size.md) (可选) - `image`大小。
* `hotspot` [Point](structures/point.md) (optional) - coordinates of the custom cursor's hotspot.

当鼠标指针改变的时候触发。 Type参数值包含：`default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` 或 `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](native-image.md), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### Event: 'context-menu'

返回:

* `event` Event
* `params` Object 
  * `x` Integer - x 坐标。
  * `y` Integer - y 坐标。
  * `linkURL` String - URL of the link that encloses the node the context menu was invoked on.
  * `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
  * `pageURL` String - URL of the top level page that the context menu was invoked on.
  * `frameURL` String - URL of the subframe that the context menu was invoked on.
  * `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
  * `mediaType` String - Type of the node the context menu was invoked on. Can be `none`, `image`, `audio`, `video`, `canvas`, `file` or `plugin`.
  * `hasImageContents` Boolean - Whether the context menu was invoked on an image which has non-empty contents.
  * `isEditable` Boolean - Whether the context is editable.
  * `selectionText` String - Text of the selection that the context menu was invoked on.
  * `titleText` String - Title or alt text of the selection that the context was invoked on.
  * `misspelledWord` String - The misspelled word under the cursor, if any.
  * `frameCharset` String - The character encoding of the frame on which the menu was invoked.
  * `inputFieldType` String - If the context menu was invoked on an input field, the type of that field. Possible values are `none`, `plainText`, `password`, `other`.
  * `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
  * `mediaFlags` Object - The flags for the media element the context menu was invoked on. 
    * `inError` Boolean - Whether the media element has crashed.
    * `isPaused` Boolean - Whether the media element is paused.
    * `isMuted` Boolean - Whether the media element is muted.
    * `hasAudio` Boolean - Whether the media element has audio.
    * `isLooping` Boolean - Whether the media element is looping.
    * `isControlsVisible` Boolean - Whether the media element's controls are visible.
    * `canToggleControls` Boolean - Whether the media element's controls are toggleable.
    * `canRotate` Boolean - Whether the media element can be rotated.
  * `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action. 
    * `canUndo` Boolean - Whether the renderer believes it can undo.
    * `canRedo` Boolean - Whether the renderer believes it can redo.
    * `canCut` Boolean - Whether the renderer believes it can cut.
    * `canCopy` Boolean - Whether the renderer believes it can copy
    * `canPaste` Boolean - Whether the renderer believes it can paste.
    * `canDelete` Boolean - Whether the renderer believes it can delete.
    * `canSelectAll` Boolean - Whether the renderer believes it can select all.

Emitted when there is a new context menu that needs to be handled.

#### 事件: 'select-bluetooth-device'

返回:

* `event` Event
* `devices` [BluetoothDevice[]](structures/bluetooth-device.md)
* `callback` Function - 回调函数 
  * `deviceId` String 设备Id

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    let result = deviceList.find((device) => {
      return device.deviceName === 'test'
    })
    if (!result) {
      callback('')
    } else {
      callback(result.deviceId)
    }
  })
})
```

#### Event: 'paint'

返回:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [NativeImage](native-image.md) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ webPreferences: { offscreen: true } })
win.webContents.on('paint', (event, dirty, image) => {
  // updateBitmap(dirty, image.getBitmap())
})
win.loadURL('http://github.com')
```

#### Event: 'devtools-reload-page'

当在开发者工具中命令webContents重新加载时，触发该事件。

#### Event: 'will-attach-webview'

返回:

* `event` Event
* `webPreferences` Object - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Object - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

返回:

* `event` Event
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

当`<webview>`被挂载到页面内容中时，触发该事件。

#### Event: 'console-message'

返回:

* `event` Event
* `level` Integer
* `message` String
* `line` Integer
* `sourceId` String

Emitted when the associated window logs a console message. Will not be emitted for windows with *offscreen rendering* enabled.

#### 事件: 'remote-require'

返回:

* `event` Event
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件: 'remote-get-global'

返回:

* `event` Event
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止全局返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 实例方法

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (可选) 
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (optional) - An HTTP Referrer url.
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` ([UploadRawData[]](structures/upload-raw-data.md) | [UploadFile[]](structures/upload-file.md) | [UploadBlob[]](structures/upload-blob.md)) (optional)
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (可选) 
  * `query` Object (optional) - Passed to `url.format()`.
  * `search` String (optional) - Passed to `url.format()`.
  * `hash` String (optional) - Passed to `url.format()`.

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

```sh
| root
| - package.json
| - src
|   - main.js
|   - index.html
```

需要运行以下代码：

```js
win.loadFile('src/index.html')
```

#### `contents.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### `contents.getURL()`

Returns `String` - 当前页面的URL.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

let currentURL = win.webContents.getURL()
console.log(currentURL)
```

#### `contents.getTitle()`

返回 `String` - 当前页面的标题.

#### `contents.isDestroyed()`

返回 `Boolean` -判断页面是否被销毁

#### `contents.focus()`

页面聚焦

#### `contents.isFocused()`

返回 `Boolean` - 判断页面是否聚焦

#### `contents.isLoading()`

返回 `Boolean` - 判断页面是否正在加载资源

#### `contents.isLoadingMainFrame()`

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

#### `contents.isWaitingForResponse()`

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### `contents.stop()`

Stops any pending navigation.

#### `contents.reload()`

刷新当前页面

#### `contents.reloadIgnoringCache()`

忽略缓存强制刷新页面

#### `contents.canGoBack()`

返回`Boolean`，是否可以返回到上一个页面

#### `contents.canGoForward()`

返回`Boolean` ，是否可以进入下一个页面

#### `contents.canGoToOffset(offset)`

* `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### `contents.clearHistory()`

清除定位历史。

#### `contents.goBack()`

使浏览器回退到上一个页面。

#### `contents.goForward()`

使浏览器前进到下一个页面。

#### `contents.goToIndex(index)`

* `index` Integer

Navigates browser to the specified absolute web page index.

#### `contents.goToOffset(offset)`

* `offset` Integer

定位到相对于“当前入口”的指定的偏移。

#### `contents.isCrashed()`

Returns `Boolean` - Whether the renderer process has crashed.

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

重写该页面的user agent

#### `contents.getUserAgent()`

返回 `String` - 当前页面的user agent.

#### `contents.insertCSS(css)`

* `css` String

为当前页面注入样式

#### `contents.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.
* `callback` Function (可选) - 在脚本被执行后被调用。 
  * `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.setIgnoreMenuShortcuts(ignore)` *实验功能*

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

使当前页面音频静音

#### `contents.isAudioMuted()`

返回 `Boolean` -判断页面是否被静音

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Number - 缩放比例

更改缩放比例。缩放比例是缩放百分比除以 100，如 300% = 3.0。

#### `contents.getZoomFactor(callback)`

* `callback` Function - 回调函数 
  * `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### `contents.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.getZoomLevel(callback)`

* `callback` Function 
  * `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小缩放级别。

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

#### `contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

设置最大和最小基于布局(例如非图像)的缩放级别。

#### `contents.undo()`

在页面中执行`undo`编辑命令。

#### `contents.redo()`

在页面中执行` redo `编辑命令。

#### `contents.cut()`

在页面中执行` cut `编辑命令。

#### `contents.copy()`

在页面中执行` copy `编辑命令。

#### `contents.copyImageAt(x, y)`

* `x` Integer
* `y` Integer

Copy the image at the given position to the clipboard.

#### `contents.paste()`

在页面中执行` paste `编辑命令。

#### `contents.pasteAndMatchStyle()`

在页面中执行` pasteAndMatchStyle `编辑命令。

#### `contents.delete()`

在页面中执行` delete `编辑命令。

#### `contents.selectAll()`

在页面中执行` selectAll `编辑命令。

#### `contents.unselect()`

在页面中执行` unselect `编辑命令。

#### `contents.replace(text)`

* `text` String

在页面中执行` replace `编辑命令。

#### `contents.replaceMisspelling(text)`

* `text` String

在页面中执行` replaceMisspelling `编辑命令。

#### `contents.insertText(text)`

* `text` String

插入`text` 到焦点元素

#### `contents.findInPage(text[, options])`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选) 
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
  * `wordStart` Boolean (optional) (Deprecated) - Whether to look only at the start of words. defaults to `false`.
  * `medialCapitalAsWordStart` Boolean (optional) (Deprecated) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](web-contents.md#event-found-in-page) event.

#### `contents.stopFindInPage(action)`

* `action` String - Specifies the action to take place when ending [`webContents.findInPage`] request. 
  * `clearSelection` - Clear the selection.
  * `keepSelection` - Translate the selection into a normal selection.
  * `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

```javascript
const { webContents } = require('electron')
webContents.on('found-in-page', (event, result) => {
  if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
})

const requestId = webContents.findInPage('api')
console.log(requestId)
```

#### `contents.capturePage([rect, ]callback)`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.
* `callback` Function - 回调函数 
  * `image` [NativeImage](native-image.md)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](native-image.md) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### `contents.hasServiceWorker(callback)`

* `callback` Function 
  * `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### `contents.unregisterServiceWorker(callback)`

* `callback` Function 
  * `success` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### `contents.getPrinters()`

获取系统打印机列表

返回 [`PrinterInfo[]`](structures/printer-info.md).

#### `contents.print([options], [callback])`

* `options` Object (可选) 
  * `silent` Boolean (可选) - 不询问用户打印信息，默认为 `false`。
  * `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
  * `deviceName` String (optional) - Set the printer device name to use. Default is `''`.
* `callback` Function (可选) 
  * `success` Boolean - Indicates success of the print call.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({ silent: false, printBackground: false, deviceName: '' })`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### `contents.printToPDF(options, callback)`

* `options` Object 
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
* `callback` Function - 回调函数 
  * `error` Error
  * `data` Buffer

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile('/tmp/print.pdf', data, (error) => {
      if (error) throw error
      console.log('Write PDF successfully.')
    })
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.on('devtools-opened', () => {
  win.webContents.addWorkSpace(__dirname)
})
```

#### `contents.removeWorkSpace(path)`

* `path` String

Removes the specified path from DevTools workspace.

#### `contents.setDevToolsWebContents(devToolsWebContents)`

* `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

```html
<html>
<head>
  <style type="text/css">

    * { margin: 0; }
    #browser { height: 70%; }
    #devtools { height: 30%; }
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools"></webview>
  <script>
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    browserView.addEventListener('dom-ready', () => {
      const browser = browserView.getWebContents()
      browser.setDevToolsWebContents(devtoolsView.getWebContents())
      browser.openDevTools()
    })
  </script>
</body>
</html>
```

An example of showing devtools in a `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.once('ready', () => {
  win = new BrowserWindow()
  devtools = new BrowserWindow()
  win.loadURL('https://github.com')
  win.webContents.setDevToolsWebContents(devtools.webContents)
  win.webContents.openDevTools({ mode: 'detach' })
})
```

#### `contents.openDevTools([options])`

* `options` Object (可选) 
  * `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### `contents.closeDevTools()`

关闭开发者工具。

#### `contents.isDevToolsOpened()`

返回`Boolean` - 开发者工具是否处于开启状态。

#### `contents.isDevToolsFocused()`

返回`Boolean` - 开发者工具是否处于当前执行状态。

#### `contents.toggleDevTools()`

切换开发工具

#### `contents.inspectElement(x, y)`

* `x` Integer
* `y` Integer

开始检查位于(`x`, `y`) 的元素。

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel[, arg1][, arg2][, ...])`

* `channel` String
* `...args` any[]

通过` channel `向渲染器进程发送异步消息，可以发送任意参数。 在内部，参数会被序列化为 JSON，因此参数对象上的函数和原型链不会被发送。

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// 在主进程中.
const { app, BrowserWindow } = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('ping', 'whoooooooh!')
  })
})
```

```html
<!-- index.html -->
<html>
<body>
  <script>
    require('electron').ipcRenderer.on('ping', (event, message) => {
      console.log(message) // Prints 'whoooooooh!'
    })
  </script>
</body>
</html>
```

#### `contents.enableDeviceEmulation(parameters)`

* `parameters` Object 
  * `screenPosition` String - Specify the screen type to emulate (default: `desktop`): 
    * `desktop` - Desktop screen type.
    * `mobile` - Mobile screen type.
  * `screenSize` [Size](structures/size.md) - Set the emulated screen size (screenPosition == mobile).
  * `viewPosition` [Point](structures/point.md) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
  * `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
  * `viewSize` [Size](structures/size.md) - Set the emulated view size (empty means no override)
  * `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

允许设备模拟给定参数。

#### `contents.disableDeviceEmulation()`

禁止`webContents.enableDeviceEmulation`允许的模拟设备

#### `contents.sendInputEvent(event)`

* `event` Object 
  * `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
  * `modifiers` String[] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

* `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](accelerator.md).

For mouse events, the `event` object also have following properties:

* `x` Integer (**required**)
* `y` Integer (**required**)
* `button` String - The button pressed, can be `left`, `middle`, `right`.
* `globalX` Integer
* `globalY` Integer
* `movementX` Integer
* `movementY` Integer
* `clickCount` Integer

`mouseWheel`事件的`event`对象还有下列属性：

* `deltaX` Integer
* `deltaY` Integer
* `wheelTicksX` Integer
* `wheelTicksY` Integer
* `accelerationRatioX` Integer
* `accelerationRatioY` Integer
* `hasPreciseScrollingDeltas` Boolean
* `canScroll` Boolean

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* ` onlyDirty ` Boolean (可选) - 默认值为 ` false `.
* `callback` Function - 回调函数 
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object 
  * `file` String or `files` Array - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType, callback)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type. 
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.
* `callback` Function - 回调函数 - `(error) => {}`. 
  * `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
    if (!error) console.log('Save page successfully')
  })
})
```

#### `contents.showDefinitionForSelection()` *macOS*

Shows pop-up dictionary that searches the selected word on the page.

#### `contents.isOffscreen()`

Returns `Boolean` - Indicates whether *offscreen rendering* is enabled.

#### `contents.startPainting()`

If *offscreen rendering* is enabled and not painting, start painting.

#### `contents.stopPainting()`

If *offscreen rendering* is enabled and painting, stop painting.

#### `contents.isPainting()`

Returns `Boolean` - If *offscreen rendering* is enabled returns whether it is currently painting.

#### `contents.setFrameRate(fps)`

* `fps` Integer

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

#### `contents.getFrameRate()`

Returns `Integer` - If *offscreen rendering* is enabled returns the current frame rate.

#### `contents.invalidate()`

Schedules a full repaint of the window this web contents is in.

If *offscreen rendering* is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `String` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` String - Specify the WebRTC IP Handling Policy. 
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

### 实例属性

#### `contents.id`

`Integer`类型，代表WebContents的唯一标识（unique ID）。

#### `contents.session`

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents`

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents`

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger`

WebContents的 [Debugger](debugger.md)实例。