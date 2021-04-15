# webContents

> 渲染以及控制 web 页面

进程：[主进程](../glossary.md#main-process)

`webContents` 是一个 [事件][event-emitter]。 负责渲染和控制网页, 是 [` BrowserWindow `](browser-window.md) 对象的一个属性。 这是一个访问 `webContents` 对象的例子:

```javascript
康斯特 { BrowserWindow } = 要求 （'电子'）

缺点赢 = 新的浏览器窗口 （{ width: 800, height: 1500 }）
赢. loadurl （'http：/ / github .com'）

续内容 = win. web 控制台
控制台.log （内容）
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

返回 `WebContents` |未定义 - 带有给定 ID 的 Web 内容实例，或如果没有与给定 ID 关联的 Web 内容，则 `undefined` 。

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
* `frameProcessId` 整数
* `frameRoutingId` 整数

这个事件类似于 `did-finish-load` ，只不过是在加载失败之后触发。 完整的错误码列表以及含义，[请看这](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h)

#### 事件："失败-临时加载"

返回:

* `event` Event
* `errorCode` Integer
* `errorDescription` String
* `validatedURL` String
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

这个事件类似于 `did-finish-load`，只不过是在加载失败或取消加载之后触发，例如调用 `window.stop()` 。

#### Event: 'did-frame-finish-load'

返回:

* `event` Event
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

当框架完成导航（navigation）时触发

#### Event: 'did-start-loading'

当tab中的旋转指针（spinner）开始旋转时，就会触发该事件。

#### Event: 'did-stop-loading'

当tab中的旋转指针（spinner）结束旋转时，就会触发该事件。

#### 事件: 'dom-ready'

返回:

* `event` Event

一个框架中的文本加载完成后触发该事件。

#### 事件： 'page-title-updated'

返回:

* `event` Event
* `title` String
* `explicitSet` Boolean

在导航过程中设置页面标题时激发。 当 标题从文件网址合成时，`explicitSet` 是错误的。

#### 事件: 'page-favicon-updated'

返回:

* `event` Event
* `favicons` String[] - 由连接组成的数组。

当页面获取到favicon的连接时，触发该事件。

#### 事件： "新窗口" _弃用_

返回:

* `event` 新窗口网络康滕茨事件
* `url` String
* `frameName` String
* `disposition` String - 可以被设置为 `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` 及 `other`.
* `options` BrowserWindowConstructorOptions - 用于创建新的 [`BrowserWindow`](browser-window.md).
* `additionalFeatures` String[] - 非标准功能(非标准功能是指这些功能不是由Chromium或Electron处理的功能)，这些功能默认指向`window.open()`.
* `referrer` [参考](structures/referrer.md) - 将 传递到新窗口的引用者。 可能会或可能不会导致 `Referer` 标题被 发送，具体取决于引用人策略。
* `postBody` [后身体](structures/post-body.md) （可选） - 的帖子数据将发送到新的窗口，以及适当的标题，将 设置。 如果没有发送任何帖子数据，则值将 `null`。 只有当窗口由设置 `target=_blank`的表单创建时，才定义 。

已弃用：[`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)。

当页面请求为 `url`打开新窗口时发出。 它可以 `window.open` 或外部链接，如 `<a target='_blank'>`的要求。

默认情况下, 将为 ` url ` 创建新的 ` BrowserWindow `。

调用`event.preventDefault()`事件，可以阻止Electron自动创建新的[`BrowserWindow`](browser-window.md)实例。 调用`event.preventDefault()` 事件后，你还可以手动创建新的[`BrowserWindow`](browser-window.md)实例，不过接下来你必须用`event.newGuest`方法来引用[`BrowserWindow`](browser-window.md)实例，如果你不这样做，则可能会产生异常。 例如：

```javascript
我的浏览器窗口.网络控制（"新窗口"，（事件，网址，帧名，处置，选项， 附加功能，引用者，后身体）=> {
  事件。防止默认（）
  持续赢=新浏览器窗口（{
    网络内容：选项。webContents，//如果提供
    显示：虚假
  }）
  赢。 显示'，（）=> win.show（）
  如果（！选项.webContents）{
    续加载选项= {
      httpReferrer: referrer
    }
    如果（后身体！=空）{
      康斯特 { data, contentType, boundary } =后身体
      负载选项。后数据=后身体。 数据
      负载选择。外标题="内容类型： ${contentType}：边界=${boundary}"
    =

    赢

  
  。
```

#### 活动："创建窗口"

返回:
* `window` BrowserWindow
* `details` 对象
    * `url` 字符串 - 创建窗口的网址。
    * `frameName` 字符串 - `window.open()` 呼叫中创建的窗口的名称。
    * `options` 浏览器窗口构建选项 - 用于创建 浏览器窗口的选项。 它们被合并在越来越多的优先级：从父继承 的选项，从 `window.open()``features` 字符串解析选项，以及 [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)给出的选项。 未识别的选项不会被过滤掉。
    * `additionalFeatures` 字符串[]- 非标准功能（不 处理铬或电子功能） _废弃_
    * `referrer` [参考](structures/referrer.md) - 将 传递到新窗口的引用者。 可能会或可能不会导致发送 `Referer` 标题 ，具体取决于引用人策略。
    * `postBody` [后身体](structures/post-body.md) （可选） - 将发送到新窗口的帖子数据 ，以及将设置的相应标题 。 如果没有发送任何帖子数据，则值将 `null`。 仅在窗口由设置 `target=_blank`的表单创建时定义。
    * `disposition` 弦-可以 `default`， `foreground-tab`， `background-tab`， `new-window`， `save-to-disk` 和 `other`。

通过渲染器中的 `window.open` 成功创建窗口后，</em> 发出 _。 如果窗口的创建从 [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)中取消，则不会发出。</p>

有关更多详细信息以及如何与 `webContents.setWindowOpenHandler`一起使用此信息，请参阅 [`window.open()`](window-open.md) 。

#### Event: 'will-navigate'

返回:

* `event` Event
* `url` String

当用户或页面想要开始导航时发出。 当 `window.location` 对象更改或用户单击页面中的链接时，可能会发生这种情况。

当使用 `webContents.loadURL` 和 `webContents.back`等 ABI 进行程序化导航时，此事件不会发出。

它也不会发出页面导航，如点击锚链接 或更新 `window.location.hash`。 为此目的使用 `did-navigate-in-page` 活动 。

调用`event.preventDefault()`将阻止导航。

#### 活动："启动导航"

返回:

* `event` Event
* `url` String
* `isInPlace` ·布尔
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

当任何帧（包括主框）开始导航时发出。 `isInPlace` 将 `true` 用于页面导航。

#### 活动："将重定向"

返回:

* `event` Event
* `url` String
* `isInPlace` ·布尔
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

当服务器侧重定向时，在导航过程中会发出。  例如，302 重定向。

此事件将在 `did-start-navigation` 后发出，并且始终在 `did-redirect-navigation` 事件之前发出以进行相同的导航。

呼叫 `event.preventDefault()` 将阻止导航（不仅仅是 重定向）。

#### 事件："重定向导航"

返回:

* `event` Event
* `url` String
* `isInPlace` ·布尔
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

服务器端重定向在导航过程中发生后发出。  例如，302 重定向。

此事件是无法阻止的，如果您想要防止重定向，您应该 结帐上述 `will-redirect` 事件。

#### Event: 'did-navigate'

返回:

* `event` Event
* `url` String
* `httpResponseCode` 整数 --1 用于非 HTTP 导航
* `httpStatusText` 字符串 - 非 HTTP 导航的空

完成主帧导航时发出。

此事件不用于页面导航，例如单击锚链接 或更新 `window.location.hash`。 为此目的使用 `did-navigate-in-page` 活动 。

#### 事件："做帧导航"

返回:

* `event` Event
* `url` String
* `httpResponseCode` 整数 --1 用于非 HTTP 导航
* `httpStatusText` 字符串 - 非 HTTP 导航的空字符串，
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

完成任何帧导航时发出。

此事件不用于页面导航，例如单击锚链接 或更新 `window.location.hash`。 为此目的使用 `did-navigate-in-page` 活动 。

#### Event: 'did-navigate-in-page'

返回:

* `event` Event
* `url` String
* `isMainFrame` Boolean
* `frameProcessId` 整数
* `frameRoutingId` 整数

在任何帧中发生页面导航时发出。

当发生页内导航时，虽然页面地址发生变化，但它并没有导航到其它页面。 例如，点击锚点链接，或者DOM的 `hashchange`事件被触发时，都会触发该事件。

#### Event: 'will-prevent-unload'

返回:

* `event` Event

当 `beforeunload` 事件处理程序尝试取消页面卸载时发出。

呼叫 `event.preventDefault()` 将忽略 `beforeunload` 事件处理程序 ，并允许卸载页面。

```javascript
const { BrowserWindow, dialog } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600 })
win.webContents.on('will-prevent-unload', (event) => {
  const choice = dialog.showMessageBoxSync(win, {
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

#### 事件： "崩溃" _弃用_

返回:

* `event` Event
* `killed` Boolean

当渲染进程崩溃或被结束时触发

**已废弃：** 此事件被包含更多关于渲染过程为何消失的信息的 `render-process-gone` 事件替代了 它 并不总是因为它坠毁了。  当您切换到该事件时， 检查 `reason === 'killed'` 可以替换 `killed` 布尔。

#### 事件: 'render-process-gone'

返回:

* `event` Event
* `details` 对象
  * `reason` 字符串 - 渲染过程消失的原因。  可选值：
    * `clean-exit` - 以零退出代码退出的过程
    * `abnormal-exit` - 以非零退出代码退出的过程
    * `killed` - 进程被发送一个西格特姆或以其他方式在外部杀死
    * `crashed` - 过程崩溃
    * `oom` - 过程内存耗尽
    * `launch-failed` - 过程从未成功启动
    * `integrity-failure` - 窗口代码完整性检查失败
  * `exitCode` 整数 - 退出代码的过程，除非 `reason` `launch-failed`，在这种情况下， `exitCode` 将是一个平台特定的 发射失败错误代码。

当渲染器过程意外消失时发出。  这通常是 ，因为它是坠毁或死亡。

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
* `input` 对象 - 输入属性。
  * `type` String - 可以是 `keyUp` ，或者 `keyDown`.
  * `key` String - 等同于 [KeyboardEvent.key][keyboardevent].
  * ` code ` String - 等同于 [KeyboardEvent. code ][keyboardevent].
  * ` isAutoRepeat ` String - 等同于 [KeyboardEvent. repeat ][keyboardevent].
  * `isComposing` 布尔 - 相当于 [键盘事件. 是][keyboardevent]。
  * ` shift ` String - 等同于 [KeyboardEvent.shiftKey ][keyboardevent].
  * ` control ` String - 等同于 [KeyboardEvent. controlKey ][keyboardevent].
  * ` alt ` String - 等同于 [KeyboardEvent. altKey ][keyboardevent].
  * ` meta ` String - 等同于 [KeyboardEvent. metaKey ][keyboardevent].

在发送页面中的 `keydown` 和 `keyup` 事件之前发出。 呼叫 `event.preventDefault` 将阻止页面 `keydown`/`keyup` 事件 和菜单快捷方式。

要只防止菜单快捷方式，请使用 [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore)：

```javascript
const { BrowserWindow } = 要求 （"电子"）

持续赢 = 新浏览器窗口 （{ width: 800, height: 600 }）

win.web Contents.on （"输入事件前"， （事件， 输入） => {
  // 例如，仅在
  // Ctrl/Cmd 关闭时启用应用程序菜单键盘快捷方式。
  win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
})
```

#### 事件: 'enter-html-full-screen'

窗口进入由HTML API 触发的全屏状态时触发

#### 事件: 'leave-html-full-screen'

窗口离开由HTML API触发的全屏状态时触发

#### 活动："缩放更改"

返回:

* `event` Event
* `zoomDirection` 字符串 - 可以 `in` 或 `out`。

当用户请求使用鼠标轮更改变焦级别时发出。

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
  * `certificate` [证书](structures/certificate.md) - 必须是给定列表中的证书。

当一个客户证书被请求的时候发出。

使用方式与[`app`的`select-client-certificate`](app.md#event-select-client-certificate)的事件相同。

#### 事件: "login"

返回:

* `event` Event
* `authenticationResponseDetails` 对象
  * `url` URL
* `authInfo` 对象
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` 字符串（可选）
  * `password` 字符串（可选）

当 ` webContents ` 要进行基本身份验证时触发。

使用方式与[`app`的`login`](app.md#event-login)的事件相同。

#### Event: 'found-in-page'

返回:

* `event` Event
* `result` 对象
  * `requestId` Integer
  * `activeMatchOrdinal` Integer - 当前匹配位置。
  * `matches` Integer - 符合匹配条件的元素个数。
  * `selectionArea` 矩形 - 第一个匹配区域的坐标。
  * `finalUpdate` Boolean

如果调用[`webContents.findInPage`]有返回时，会触发这一事件。

#### Event: 'media-started-playing'

多媒体开始播放时，触发该事件。

#### Event: 'media-paused'

当媒体文件暂停或播放完成的时候触发

#### Event: 'did-change-theme-color'

返回:

* `event` Event
* `color` （字符串|无效） - 主题颜色为"#rrggbb"。 当没有设置主题颜色时，它是 `null` 的。

当页面的主题颜色发生变化时发出。 这通常是由于遇到元标签 ：

```html
<meta name='theme-color' content='#ff0000'>
```

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
* `scale` 浮动（可选） - 自定义光标的缩放因子。
* `size` [Size](structures/size.md) (可选) - `image`大小。
* `hotspot` [点](structures/point.md) （可选） - 自定义光标的热点坐标。

当鼠标指针改变的时候触发。 Type参数值包含：`default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` 或 `custom`.

如果 `type` 参数 `custom`， `image` 参数将在 [`NativeImage`](native-image.md)中保留自定义 光标图像， `scale`、 `size` 和 `hotspot` 将保留有关自定义光标的 附加信息。

#### Event: 'context-menu'

返回:

* `event` Event
* `params` 对象
  * `x` Integer - x 坐标。
  * `y` Integer - y 坐标。
  * `linkURL` 字符串 - 连接上下文菜单节点的链接的 URL 被调用。
  * `linkText` 字符串 - 与链接关联的文本。 如果链接的内容为图像，则可能是一个空 字符串。
  * `pageURL` 字符串 - 上下文菜单 调用的顶层页面的 URL。
  * `frameURL` 字符串 - 上下文菜单 调用的子帧的 URL。
  * `srcURL` 字符串 - 上下文菜单 引用的元素的源 URL。 带有源网址的元素包括图像、音频和视频。
  * `mediaType` 字符串 - 上下文菜单被调用的节点类型。 可以 `none`、 `image`、 `audio`、 `video`、 `canvas`、 `file` 或 `plugin`。
  * `hasImageContents` Boolean - 上下文菜单是否被调用在具有非空内容的图像 。
  * `isEditable` 布尔 - 上下文是否可编辑。
  * `selectionText` 字符串 - 上下文菜单 引用的选集文本。
  * `titleText` 字符串 - 上下文 引用的选集的标题或 alt 文本。
  * `misspelledWord` 字符串 - 光标下拼错的单词，如果有的话。
  * `dictionarySuggestions` 字符串[]- 一系列建议的单词，以显示 用户，以取代 `misspelledWord`。  仅在启用拼写错误的 单词和拼写检查器时可用。
  * `frameCharset` 字符串 - 引用 菜单的框架的字符编码。
  * `inputFieldType` 字符串 - 如果上下文菜单被调用在字段 输入中，该字段的类型。 可能的价值是 `none`， `plainText`， `password`， `other`。
  * `menuSourceType` 字符串 - 引用上下文菜单的输入源。 可以是 `none`、 `mouse`、 `keyboard`、 `touch` 或 `touchMenu`。
  * `mediaFlags` 对象 - 上下文菜单的媒体元素的标记 调用。
    * `inError` 布尔 - 媒体元素是否崩溃。
    * `isPaused` 布尔 - 媒体元素是否暂停。
    * `isMuted` 布尔 - 媒体元素是否静音。
    * `hasAudio` 布尔 - 媒体元素是否有音频。
    * `isLooping` 布尔 - 媒体元素是否循环。
    * `isControlsVisible` 布尔 - 媒体元素的控制是否 可见。
    * `canToggleControls` 布尔 - 媒体元素的控制是否 可切换。
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
* `callback` Function
  * `deviceId` String 设备Id

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-experimental-web-platform-features')

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault()
    const result = deviceList.find((device) => {
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

const win = new BrowserWindow({ webPreferences: { offscreen: true } })
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
* `webPreferences` WebPreferences - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
* `params` Record<string, string> - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### Event: 'did-attach-webview'

返回:

* `event` Event
* `webContents` WebContents - The guest web contents that is used by the `<webview>`.

当`<webview>`被挂载到页面内容中时，触发该事件。

#### Event: 'console-message'

返回:

* `event` Event
* `level` Integer - The log level, from 0 to 3. 为了它匹配 `verbose`， `info`， `warning` 和 `error`。
* `message` 字符串 - 实际控制台消息
* `line` Integer - The line number of the source that triggered this console message
* `sourceId` String

Emitted when the associated window logs a console message.

#### Event: 'preload-error'

返回:

* `event` Event
* `preloadPath` String
* `error` Error

Emitted when the preload script `preloadPath` throws an unhandled exception `error`.

#### Event: 'ipc-message'

返回:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends an asynchronous message via `ipcRenderer.send()`.

#### Event: 'ipc-message-sync'

返回:

* `event` Event
* `channel` String
* `...args` any[]

Emitted when the renderer process sends a synchronous message via `ipcRenderer.sendSync()`.

#### 事件: 'desktop-capturer-get-sources'

返回:

* `event` Event

Emitted when `desktopCapturer.getSources()` is called in the renderer process. 呼叫 `event.preventDefault()` 将使其返回空源。

#### 事件： "remote-require" _弃用_

返回:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "remote-get-global" _弃用_

返回:

* `event` IpcMainEvent
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止全局返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "remote-get-builtin" _弃用_

返回:

* `event` IpcMainEvent
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "remote-get-current-window" _弃用_

返回:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWindow()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "remote-get-current-web-contents" _弃用_

返回:

* `event` IpcMainEvent

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

#### Event: 'preferred-size-changed'

返回:

* `event` Event
* `preferredSize` [Size](structures/size.md) - The minimum size needed to contain the layout of the document—without requiring scrolling.

Emitted when the `WebContents` preferred size has changed.

This event will only be emitted when `enablePreferredSizeMode` is set to `true` in `webPreferences`.

### 实例方法

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (可选)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - 一个 HTTP Referrer url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` String (optional) - Extra headers separated by "\n".
  * `postData` （[上传数据]](structures/upload-raw-data.md) | [上传文件[]](structures/upload-file.md)）（可选）
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

Returns `Promise<void>` - the promise will resolve when the page has finished loading (see [`did-finish-load`](web-contents.md#event-did-finish-load)), and rejects if the page fails to load (see [`did-fail-load`](web-contents.md#event-did-fail-load)). A noop rejection handler is already attached, which avoids unhandled rejection errors.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

```javascript
const { webContents } = require('electron')
const options = { extraHeaders: 'pragma: no-cache\n' }
webContents.loadURL('https://github.com', options)
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (可选)
  * `query` 记录<String, String> （可选） - 传递给 `url.format()`。
  * `search` String (可选) - 传递给 `url.format()`.
  * `hash` String (可选) - 传递给 `url.format()`.

返回 `Promise<void>` - 当页面完成加载 时，承诺将解决（见 [`did-finish-load`](web-contents.md#event-did-finish-load)），如果页面无法加载，则拒绝 （见 [`did-fail-load`](web-contents.md#event-did-fail-load)）。

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application.  For instance an app structure like this:

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
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com').then(() => {
  const currentURL = win.webContents.getURL()
  console.log(currentURL)
})
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

Clears the navigation history.

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

#### `contents.forcefullyCrashRenderer()`

Forcefully terminates the renderer process that is currently hosting this `webContents`. This will cause the `render-process-gone` event to be emitted with the `reason=killed || reason=crashed`. Please note that some webContents share renderer processes and therefore calling this method may also crash the host process for other webContents as well.

Calling `reload()` immediately after calling this method will force the reload to occur in a new process. This should be used when this process is unstable or unusable, for instance in order to recover from the `unresponsive` event.

```js
contents.on('unresponsive', async () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading the app?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    contents.forcefullyCrashRenderer()
    contents.reload()
  }
})
```

#### `contents.setUserAgent(userAgent)`

* `userAgent` String

重写该页面的user agent

#### `contents.getUserAgent()`

返回 `String` - 当前页面的user agent.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (可选)
  * `cssOrigin` String (optional) - Can be either 'user' or 'author'; Specifying 'user' enables you to prevent websites from overriding the CSS you insert. Default is 'author'.

Returns `Promise<String>` - A promise that resolves with a key for the inserted CSS that can later be used to remove the CSS via `contents.removeInsertedCSS(key)`.

Injects CSS into the current web page and returns a unique key for the inserted stylesheet.

```js
contents.on('did-finish-load', () => {
  contents.insertCSS('html, body { background-color: #f00; }')
})
```

#### `contents.removeInsertedCSS(key)`

* `key` String

Returns `Promise<void>` - Resolves if the removal was successful.

Removes the inserted CSS from the current web page. The stylesheet is identified by its key, which is returned from `contents.insertCSS(css)`.

```js
contents.on('did-finish-load', async () => {
  const key = await contents.insertCSS('html, body { background-color: #f00; }')
  contents.removeInsertedCSS(key)
})
```

#### `contents.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

Code execution will be suspended until web page stop loading.

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])`

* `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electron's `contextIsolation` feature.  You can provide any integer here.
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (optional) - Default is `false`.

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Works like `executeJavaScript` but evaluates `scripts` in an isolated context.

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### `contents.setWindowOpenHandler(handler)`

* `handler` Function<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` 对象
    * `url` String - The _resolved_ version of the URL passed to `window.open()`. e.g. opening a window with `window.open('foo')` will yield something like `https://the-origin/the/current/path/foo`.
    * `frameName` String - Name of the window provided in `window.open()`
    * `features` String - Comma separated list of window features provided to `window.open()`.

  Returns `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` cancels the creation of the new window. `allow` will allow the new window to be created. Specifying `overrideBrowserWindowOptions` allows customization of the created window. Returning an unrecognized value such as a null, undefined, or an object without a recognized 'action' value will result in a console error and have the same effect as returning `{action: 'deny'}`.

Called before creating a window when `window.open()` is called from the renderer. See [`window.open()`](window-open.md) for more details and how to use this in conjunction with `did-create-window`.

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

使当前页面音频静音

#### `contents.isAudioMuted()`

返回 `Boolean` -判断页面是否被静音

#### `contents.isCurrentlyAudible()`

Returns `Boolean` - Whether audio is currently playing.

#### `contents.setZoomFactor(factor)`

* `factor` Double - Zoom factor; default is 1.0.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

The factor must be greater than 0.0.

#### `contents.getZoomFactor()`

Returns `Number` - the current zoom factor.

#### `contents.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

> **NOTE**: The zoom policy at the Chromium level is same-origin, meaning that the zoom level for a specific domain propagates across all instances of windows with the same domain. Differentiating the window URLs will make zoom work per-window.

#### `contents.getZoomLevel()`

Returns `Number` - the current zoom level.

#### `contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `minimumLevel` Number
* `maximumLevel` Number

返回 `Promise<void>`

设置最大和最小缩放级别。

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
> ```js
contents.setVisualZoomLevelLimits(1, 3)
```

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

返回 `Promise<void>`

插入`text` 到焦点元素

#### `contents.findInPage(text[, options])`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选)
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
  * `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.

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

#### `contents.capturePage([rect])`

* `rect` [Rectangle](structures/rectangle.md) (optional) - The area of the page to be captured.

返回 `Promise<NativeImage>` - 解决与 [原生图像](native-image.md)

在 `rect`内捕获页面的快照。 省略 `rect` 将捕获整个可见页面。

#### `contents.isBeingCaptured()`

Returns `Boolean` - Whether this page is being captured. It returns true when the capturer count is large then 0.

#### `contents.incrementCapturerCount([size, stayHidden])`

* `size` [Size](structures/size.md) (optional) - The preferred size for the capturer.
* `stayHidden` Boolean (optional) -  Keep the page hidden instead of visible.

Increase the capturer count by one. The page is considered visible when its browser window is hidden and the capturer count is non-zero. If you would like the page to stay hidden, you should ensure that `stayHidden` is set to true.

This also affects the Page Visibility API.

#### `contents.decrementCapturerCount([stayHidden])`

* `stayHidden` Boolean (optional) -  Keep the page in hidden state instead of visible.

Decrease the capturer count by one. The page will be set to hidden or occluded state when its browser window is hidden or occluded and the capturer count reaches zero. If you want to decrease the hidden capturer count instead you should set `stayHidden` to true.

#### `contents.getPrinters()`

获取系统打印机列表

返回 [`PrinterInfo[]`](structures/printer-info.md)

#### `contents.print([options], [callback])`

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
  * `pageRanges` Object[]  (optional) - The page range to print. On macOS, only one range is honored.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `duplexMode` String (optional) - Set the duplex mode of the printed web page. Can be `simplex`, `shortEdge`, or `longEdge`.
  * `dpi` Record<string, number> (optional)
    * `horizontal` Number (optional) - The horizontal dpi.
    * `vertical` Number (optional) - The vertical dpi.
  * `header` String (optional) - String to be printed as page header.
  * `footer` String (optional) - String to be printed as page footer.
  * `pageSize` String | Size (optional) - Specify page size of the printed document. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height`.
* `callback` Function (可选)
  * `success` Boolean - Indicates success of the print call.
  * `failureReason` String - Error description called back if the print fails.

When a custom `pageSize` is passed, Chromium attempts to validate platform specific minimum values for `width_microns` and `height_microns`. Width and height must both be minimum 353 microns but may be higher on some operating systems.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Use `page-break-before: always;` CSS style to force to print to a new page.

示例用法：

```js
const options = {
  silent: true,
  deviceName: 'My-Printer',
  pageRanges: [{
    from: 0,
    to: 1
  }]
}
win.webContents.print(options, (success, errorType) => {
  if (!success) console.log(errorType)
})
```

#### `contents.printToPDF(options)`

* `选项` 对象
  * `headerFooter` Record<string, string> (optional) - the header and footer for the PDF.
    * `title` String - The title for the PDF header.
    * `url` String - the url for the PDF footer.
  * `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
  * `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
  * `scaleFactor` Number (optional) - The scale factor of the web page. Can range from 0 to 100.
  * `pageRanges` Record<string, number> (optional) - The page range to print.
    * `from` Number - Index of the first page to print (0-based).
    * `to` Number - Index of the last page to print (inclusive) (0-based).
  * `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
  * `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
  * `printSelectionOnly` Boolean (optional) - Whether to print selection only.

Returns `Promise<Buffer>` - Resolves with the generated PDF data.

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

```javascript
{
  marginsType: 0,
  printBackground: false,
  printSelectionOnly: false,
  landscape: false,
  pageSize: 'A4',
  scaleFactor: 100
}
```

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

```javascript
const { BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const os = require('os')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

win.webContents.on('did-finish-load', () => {
  // Use default printing options
  win.webContents.printToPDF({}).then(data => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
    fs.writeFile(pdfPath, data, (error) => {
      if (error) throw error
      console.log(`Wrote PDF successfully to ${pdfPath}`)
    })
  }).catch(error => {
    console.log(`Failed to write PDF to ${pdfPath}: `, error)
  })
})
```

#### `contents.addWorkSpace(path)`

* `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
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
  <webview id="devtools" src="about:blank"></webview>
  <script>
    const { ipcRenderer } = require('electron')
    const emittedOnce = (element, eventName) => new Promise(resolve => {
      element.addEventListener(eventName, event => resolve(event), { once: true })
    })
    const browserView = document.getElementById('browser')
    const devtoolsView = document.getElementById('devtools')
    const browserReady = emittedOnce(browserView, 'dom-ready')
    const devtoolsReady = emittedOnce(devtoolsView, 'dom-ready')
    Promise.all([browserReady, devtoolsReady]).then(() => {
      const targetId = browserView.getWebContentsId()
      const devtoolsId = devtoolsView.getWebContentsId()
      ipcRenderer.send('open-devtools', targetId, devtoolsId)
    })
  </script>
</body>
</html>
```

```js
// Main process
const { ipcMain, webContents } = require('electron')
ipcMain.on('open-devtools', (event, targetContentsId, devtoolsContentsId) => {
  const target = webContents.fromId(targetContentsId)
  const devtools = webContents.fromId(devtoolsContentsId)
  target.setDevToolsWebContents(devtools)
  target.openDevTools()
})
```

An example of showing devtools in a `BrowserWindow`:

```js
const { app, BrowserWindow } = require('electron')

let win = null
let devtools = null

app.whenReady().then(() => {
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
  * `activate` Boolean (optional) - Whether to bring the opened devtools window to the foreground. 默认值为 `true`。

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

#### `contents.inspectSharedWorker()`

Opens the developer tools for the shared worker context.

#### `contents.inspectSharedWorkerById(workerId)`

* `workerId` String

Inspects the shared worker based on its ID.

#### `contents.getAllSharedWorkers()`

Returns [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - Information about all Shared Workers.

#### `contents.inspectServiceWorker()`

Opens the developer tools for the service worker context.

#### `contents.send(channel, ...args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

> **NOTE**: Sending non-standard JavaScript types such as DOM objects or special Electron objects will throw an exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

An example of sending messages from the main process to the renderer process:

```javascript
// 在主进程中.
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
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

#### `contents.sendToFrame(frameId, channel, ...args)`

* `frameId` Integer | [number, number] - the ID of the frame to send to, or a pair of `[processId, frameId]` if the frame is in a different process to the main frame.
* `channel` String
* `...args` any[]

Send an asynchronous message to a specific frame in a renderer process via `channel`, along with arguments. Arguments will be serialized with the [Structured Clone Algorithm][SCA], just like [`postMessage`][], so prototype chains will not be included. Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.

> **注：** 发送非标准的 JavaScript 类型（如 DOM 对象或 特殊电子对象）将抛出一个例外。

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

If you want to get the `frameId` of a given renderer context you should use the `webFrame.routingId` value.  如下:

```js
// In a renderer process
console.log('My frameId is:', require('electron').webFrame.routingId)
```

You can also read `frameId` from all incoming IPC messages in the main process.

```js
// In the main process
ipcMain.on('ping', (event) => {
  console.info('Message came from frameId:', event.frameId)
})
```

#### `contents.postMessage(channel, message, [transfer])`

* `channel` String
* `message` 任何
* `transfer` 消息端口[]（可选）

Send a message to the renderer process, optionally transferring ownership of zero or more [`MessagePortMain`][] objects.

The transferred `MessagePortMain` objects will be available in the renderer process by accessing the `ports` property of the emitted event. When they arrive in the renderer, they will be native DOM `MessagePort` objects.

例如：

```js
// Main process
const { port1, port2 } = new MessageChannelMain()
webContents.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
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

#### `contents.sendInputEvent(inputEvent)`

* `inputEvent` [MouseInputEvent](structures/mouse-input-event.md) | [MouseWheelInputEvent](structures/mouse-wheel-input-event.md) | [KeyboardInputEvent](structures/keyboard-input-event.md)

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](browser-window.md) containing the contents needs to be focused for `sendInputEvent()` to work.

#### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* ` onlyDirty ` Boolean (可选) - 默认值为 ` false `.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](native-image.md) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

#### `contents.startDrag(item)`

* `item` Object
  * `file` String[] | String - The path(s) to the file(s) being dragged.
  * `icon` [NativeImage](native-image.md) | String - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### `contents.savePage(fullPath, saveType)`

* `fullPath` String - The full file path.
* `saveType` String - Specify the save type.
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents.savePage('/tmp/test.html', 'HTMLComplete').then(() => {
    console.log('Page was saved successfully.')
  }).catch(err => {
    console.log(err)
  })
})
```

#### `contents.showDefinitionForSelection()` _macOS_

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

If *offscreen rendering* is enabled sets the frame rate to the specified number. Only values between 1 and 240 are accepted.

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

采取V8堆快照，并保存到 `filePath`。

#### `contents.getBackgroundThrottling()`

Returns `Boolean` - whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.setBackgroundThrottling(allowed)`

* `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.getType()`

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### 实例属性

#### `contents.audioMuted`

A `Boolean` property that determines whether this page is muted.

#### `contents.userAgent`

A `String` property that determines the user agent for this web page.

#### `contents.zoomLevel`

A `Number` property that determines the zoom level for this web contents.

The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### `contents.zoomFactor`

A `Number` property that determines the zoom factor for this web contents.

The zoom factor is the zoom percent divided by 100, so 300% = 3.0.

#### `contents.frameRate`

An `Integer` property that sets the frame rate of the web contents to the specified number. Only values between 1 and 240 are accepted.

Only applicable if *offscreen rendering* is enabled.

#### `contents.id` _Readonly_

`Integer`类型，代表WebContents的唯一标识（unique ID）。 Each ID is unique among all `WebContents` instances of the entire Electron application.

#### `contents.session` _Readonly_

A [`Session`](session.md) used by this webContents.

#### `contents.hostWebContents` _Readonly_

A [`WebContents`](web-contents.md) instance that might own this `WebContents`.

#### `contents.devToolsWebContents` _Readonly_

A `WebContents | null` property that represents the of DevTools `WebContents` associated with a given `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### `contents.debugger` _Readonly_

A [`Debugger`](debugger.md) instance for this webContents.

#### `contents.backgroundThrottling`

A `Boolean` property that determines whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### `contents.mainFrame` _Readonly_

A [`WebFrameMain`](web-frame-main.md) property that represents the top frame of the page's frame hierarchy.

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent

[keyboardevent]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
