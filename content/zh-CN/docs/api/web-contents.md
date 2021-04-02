# 网络控制

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

#### 事件： "渲染过程消失"

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
    * `canRotate` 布尔 - 媒体元素是否可以旋转。
  * `editFlags` 对象 - 这些标志指示渲染器是否认为它 能够执行相应的操作。
    * `canUndo` 布尔 - 渲染者是否相信它可以撤消。
    * `canRedo` 布尔 - 渲染器是否相信它可以重道。
    * `canCut` 布尔 - 渲染器是否相信它可以切割。
    * `canCopy` 布尔 - 渲染器是否相信它可以复制
    * `canPaste` 布尔 - 渲染器是否相信它可以粘贴。
    * `canDelete` 布尔 - 渲染器是否相信它可以删除。
    * `canSelectAll` 布尔 - 渲染器是否相信它可以选择所有。

当需要处理新的上下文菜单时发出。

#### 事件: 'select-bluetooth-device'

返回:

* `event` Event
* `devices` [蓝牙德维奇[]](structures/bluetooth-device.md)
* `callback` Function
  * `deviceId` String 设备Id

当蓝牙设备需要随叫随到地选择 `navigator.bluetooth.requestDevice`时发出。 要使用 `navigator.bluetooth` 应启用 api `webBluetooth` 。 如果不调用 `event.preventDefault` ，将选择 第一个可用的设备。 应使用要选择的 `deviceId` 呼叫`callback` ，将空字符串传递给 `callback` 将 取消请求。

```javascript
康斯特 { app, BrowserWindow } =要求（'电子'）

让赢=空
应用程序.命令线.附录开关（'启用-实验-Web平台-功能'）

应用程序。当阅读 然后=> {
  赢=新浏览器窗口（{ width: 800, height: 600 }）
  赢。 设备列表，回调）=> {
    事件。防止故障（）
    结果=设备列表。find（设备）=> {
      返回设备。设备名== ="测试"
    }）
    如果（！结果）{
      回调（'）
    }否则{
      回调（结果。设备）
    }
  } ）
}）
```

#### Event: 'paint'

返回:

* `event` Event
* `dirtyRect` [Rectangle](structures/rectangle.md)
* `image` [原生图像](native-image.md) - 整个帧的图像数据。

生成新帧时发出。 只有脏区域在 缓冲区通过。

```javascript
康斯特 { BrowserWindow } =要求（"电子"）

持续赢=新的浏览器窗口（{webPrefers： { offscreen: true } }）
赢。 （事件，肮脏，图像）=> =
  //更新比特图（脏，图像。获取比特图）
}）
赢.com。
```

#### Event: 'devtools-reload-page'

当在开发者工具中命令webContents重新加载时，触发该事件。

#### Event: 'will-attach-webview'

返回:

* `event` Event
* `webPreferences` WebPrefers - 访客 页面使用的 Web 首选项。 可以修改此对象以调整客人 页面的首选项。
* `params` 记录<string, string> - 其他 `<webview>` 参数，如 `src` URL。 可以修改此对象以调整访客页面的参数。

当 `<webview>`的web内容附加到此web 内容时发出。 呼叫 `event.preventDefault()` 将破坏访客页面。

此事件可用于在加载之前为 `<webview>` `webContents` 配置 `webPreferences` ，并提供设置无法通过 `<webview>` 属性设置的设置 的能力。

**注：** 指定的 `preload` 脚本选项将显示为 `preloadURL` （不是 `preload`）在 `webPreferences` 对象中发出此事件。

#### Event: 'did-attach-webview'

返回:

* `event` Event
* `webContents` 网络内容 - `<webview>`使用的嘉宾网络内容。

当`<webview>`被挂载到页面内容中时，触发该事件。

#### Event: 'console-message'

返回:

* `event` Event
* `level` 整数 - 日志级别，从 0 到 3。 为了它匹配 `verbose`， `info`， `warning` 和 `error`。
* `message` 字符串 - 实际控制台消息
* `line` 整数 - 触发此控制台消息的源的行数
* `sourceId` String

当关联窗口记录控制台消息时发出。

#### 事件："预加载错误"

返回:

* `event` Event
* `preloadPath` 字符串
* `error` Error

当预加载脚本 `preloadPath` 抛出一个未处理的异常 `error`时发出。

#### 活动： "ipc 消息"

返回:

* `event` Event
* `channel` String
* `...args` any[]

当渲染器过程通过 `ipcRenderer.send()`发送异步消息时发出。

#### 活动："ipc-消息同步"

返回:

* `event` Event
* `channel` String
* `...args` any[]

当渲染器过程通过 `ipcRenderer.sendSync()`发送同步消息时发出。

#### 事件: 'desktop-capturer-get-sources'

返回:

* `event` Event

在渲染器过程中调用 `desktopCapturer.getSources()` 时发出。 呼叫 `event.preventDefault()` 将使其返回空源。

#### 事件： "远程要求" _弃用_

返回:

* `event` 伊普克梅因事件
* `moduleName` String

在渲染器过程中调用 `remote.require()` 时发出。 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "远程全球" _弃用_

返回:

* `event` 伊普克梅因事件
* `globalName` String

在渲染器过程中调用 `remote.getGlobal()` 时发出。 调用 `event.preventDefault()` 将阻止全局返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "远程构建" _弃用_

返回:

* `event` 伊普克梅因事件
* `moduleName` String

在渲染器过程中调用 `remote.getBuiltin()` 时发出。 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "远程获取电流窗口" _弃用_

返回:

* `event` 伊普克梅因事件

在渲染器过程中调用 `remote.getCurrentWindow()` 时发出。 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

#### 事件： "远程获取当前网络内容" _弃用_

返回:

* `event` 伊普克梅因事件

在渲染器过程中调用 `remote.getCurrentWebContents()` 时发出。 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

#### 活动："首选尺寸更改"

返回:

* `event` Event
* `preferredSize` [大小](structures/size.md) - 包含文档布局所需的最小尺寸-无需滚动。

当 `WebContents` 首选尺寸发生变化时发出。

只有当 `enablePreferredSizeMode` 定于 `webPreferences`年 `true` 时，才会发出这一事件。

### 实例方法

#### `contents.loadURL(url[, options])`

* `url` String
* `options` Object (可选)
  * `httpReferrer` (String | [Referrer](structures/referrer.md)) (可选) - 一个 HTTP Referrer url。
  * `userAgent` String (可选) - 发起请求的 userAgent.
  * `extraHeaders` 字符串（可选） - 由"\n"分开的额外标题。
  * `postData` （[上传数据]](structures/upload-raw-data.md) | [上传文件[]](structures/upload-file.md)）（可选）
  * `baseURLForDataURL` String (可选) - 要加载的数据文件的根 url(带有路径分隔符). 只有当指定的 `url`是一个数据 url 并需要加载其他文件时，才需要这样做。

返回 `Promise<void>` - 当页面完成加载 时，承诺将解决（见 [`did-finish-load`](web-contents.md#event-did-finish-load)），如果页面无法加载，则拒绝 （见 [`did-fail-load`](web-contents.md#event-did-fail-load)）。 已经附加了noop拒绝处理程序，从而避免了未处理的拒绝错误。

在窗口中加载 `url` 。 `url` 必须包含协议前缀， 例如 `http://` 或 `file://`。 如果负载应绕过http缓存，则 使用 `pragma` 头来实现它。

```javascript
康斯特 { webContents } = 需要 （"电子"）
缺点选项 = { 额外标题： "普拉格玛： 无缓存\n" =
网络康滕茨. loadurl （"# "# / github .com"， 选项）
```

#### `contents.loadFile(filePath[, options])`

* `filePath` String
* `options` Object (可选)
  * `query` 记录<String, String> （可选） - 传递给 `url.format()`。
  * `search` String (可选) - 传递给 `url.format()`.
  * `hash` String (可选) - 传递给 `url.format()`.

返回 `Promise<void>` - 当页面完成加载 时，承诺将解决（见 [`did-finish-load`](web-contents.md#event-did-finish-load)），如果页面无法加载，则拒绝 （见 [`did-fail-load`](web-contents.md#event-did-fail-load)）。

在窗口中加载给定文件， `filePath` 应该是一个路径，以 一个HTML文件相对于您的应用程序的根源。  例如， 这样的应用结构：

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

无需导航即可在 `url` 启动资源下载。 将触发 `session` 的 `will-download` 事件。

#### `contents.getURL()`

Returns `String` - 当前页面的URL.

```javascript
康斯特 { BrowserWindow } =要求（"电子"）
赢=新浏览器窗口（{ width: 800, height: 600 }
.log
  ）
赢
  > .com。
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

返回 `Boolean` - 主帧（而不仅仅是内框或帧）是否 仍在加载。

#### `contents.isWaitingForResponse()`

返回 `Boolean` - 网页是否在等待页面主 资源的第一反应。

#### `contents.stop()`

停止任何待定导航。

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

返回 `Boolean` - 网页是否可以转到 `offset`。

#### `contents.clearHistory()`

Clears the navigation history.

#### `contents.goBack()`

使浏览器回退到上一个页面。

#### `contents.goForward()`

使浏览器前进到下一个页面。

#### `contents.goToIndex(index)`

* `index` Integer

将浏览器导航到指定的绝对网页索引。

#### `contents.goToOffset(offset)`

* `offset` Integer

定位到相对于“当前入口”的指定的偏移。

#### `内容。`

返回 `Boolean` - 渲染器过程是否崩溃。

#### `内容。`

强制终止当前托管此 `webContents`的渲染器过程。 这将导致 `render-process-gone` 事件与 `reason=killed || reason=crashed` 一起发出。 请注意，某些 WebContents 共享渲染器 过程，因此调用此方法也可能使其他 WebContent 的主机进程 崩溃。

调用此 方法后立即调用 `reload()` 将强制重新加载在新的过程中发生。 例如，当此过程不稳定或无法使用时，应 使用此程序，以便从 `unresponsive` 事件中恢复 。

```js
内容。on（"无响应"，不对称（）=> {
 { response } ）等待对话
    。
    标题：'你想尝试强制重新加载应用程序吗？'，
    按钮：[确定'，'取消'，
    取消Id：1
  }）
  （响应==0）{
    内容

  
    。
```

#### `内容。集用户代理（用户代理）`

* `userAgent` String

重写该页面的user agent

#### `内容。获取使用者代理（）`

返回 `String` - 当前页面的user agent.

#### `contents.insertCSS(css[, options])`

* `css` String
* `options` Object (可选)
  * `cssOrigin` 字符串（可选） - 可以是"用户"或"作者"：指定"用户"可防止网站凌驾于您插入的CSS之后。 默认值为"作者"。

返回 `Promise<String>` - 承诺，解决插入CSS的密钥，以后可用于删除CSS通过 `contents.removeInsertedCSS(key)`。

将 CSS 注入当前网页，并返回插入的 样式表的独特密钥。

```js
内容。on（"完成加载"，（）=> {
  内容。 插入CSS（'html，身体{背景颜色：#f00：}）
}）
```

#### `内容。删除内插CSS（密钥）`

* `key` String

返回 `Promise<void>` - 如果删除成功，则解决。

从当前网页中删除插入的CSS。 样式表由其密钥 识别，该密钥从 `contents.insertCSS(css)`返回。

```js
内容。on（"完成加载"，不对称（）=> =
  const键=等待内容。插入CSS（'html，身体{背景颜色：#f00：}'）
  内容
。
```

#### `内容。执行贾瓦脚本（代码[，用户图]）`

* `code` String
* `userGesture` 布尔（可选） - 默认是 `false`。

返回 `Promise<any>` - 承诺会随着执行代码的结果 或被拒绝，如果代码的结果是被拒绝的承诺。

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如` requestFullScreen `）只能是 由来自用户的手势调用。 将 ` userGesture ` 设置为 ` true ` 将删除此限制。

代码执行将暂停，直到网页停止加载。

```js
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```

#### `内容。执行贾瓦脚本独立世界（世界ID，脚本[，用户图片]）`

* `worldId` 整数 - 运行javascript的世界ID， `0` 是默认的世界， `999` 是电子 `contextIsolation` 功能使用的世界。  您可以在此处提供任何整数。
* `scripts` [网络来源[]](structures/web-source.md)
* `userGesture` 布尔（可选） - 默认是 `false`。

返回 `Promise<any>` - 承诺会随着执行代码的结果 或被拒绝，如果代码的结果是被拒绝的承诺。

工作原理像 `executeJavaScript` ，但在一个孤立的上下文中评估 `scripts` 。

#### `contents.setIgnoreMenuShortcuts(ignore)`

* `ignore` Boolean

在集中使用此 Web 内容时忽略应用菜单快捷方式。

#### `contents.setWindowOpenHandler(handler)`

* `handler` 功能<{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}>
  * `details` 对象
    * `url` 字符串 - _解决_ 版本的URL传递到 `window.open()`。 例如，打开一个窗口与 `window.open('foo')` 将产生类似 `https://the-origin/the/current/path/foo`的东西。
    * `frameName` 字符串 - `window.open()`中提供的窗口名称
    * `features` 字符串 - 逗号分离的窗口功能列表提供给 `window.open()`。 返回 `{action: 'deny'} | {action: 'allow', overrideBrowserWindowOptions?: BrowserWindowConstructorOptions}` - `deny` 取消新 窗口的创建。 `allow` 将允许创建新窗口。 指定 `overrideBrowserWindowOptions` 允许自定义创建的窗口。 返回未识别的值（如空值、未定义值或对象 而未识别的"操作"值）将导致控制台错误，并 具有与返回 `{action: 'deny'}`相同的效果。

从 渲染器调用 `window.open()` 时，在创建窗口之前调用。 有关更多详细信息以及如何与 `did-create-window`一起使用此信息，请参阅 [`window.open()`](window-open.md) 。

#### `contents.setAudioMuted(muted)`

* `muted` Boolean

使当前页面音频静音

#### `contents.isAudioMuted()`

返回 `Boolean` -判断页面是否被静音

#### `内容。目前可听（）`

返回 `Boolean` - 音频当前是否正在播放。

#### `contents.setZoomFactor(factor)`

* `factor` 双 - 缩放因子：默认值为1.0。

将缩放因子更改为指定因子。 缩放因子 缩放百分比除以 100，因此 300% = 3.0。

该系数必须大于 0.0。

#### `内容。获取僵尸因子（）`

返回 `Number` - 当前变焦因子。

#### `contents.setZoomLevel(level)`

* `level` Number - 缩放等级。

更改缩放等级。 原始大小为 0，高于或低于每个 增量表示放大 20% 或更小，默认 限制分别为原始大小的 300% 和 50%。 这样做的公式是 `scale := 1.2 ^ level`。

> **注**：Chromium 级别的缩放策略是同源的，这意味着特定域的 缩放级别在所有具有 同一域名的窗口实例中传播。 区分窗口网址将使每个窗口的缩放工作。

#### `内容。获取僵尸级别（）`

返回 `Number` - 当前缩放级别。

#### `内容。设置视觉Zoom级别限制（最小级别、最大级别）`

* `minimumLevel` Number
* `maximumLevel` Number

返回 `Promise<void>`

设置最大和最小缩放级别。

> **注意**：电子中默认禁用视觉变焦。 要重新启用它，请致电：
> 
> ```js
内容。设置视觉祖姆级别限制（1，3）
```

#### `内容。撤消（）`

在页面中执行`undo`编辑命令。

#### `内容。`

在页面中执行` redo `编辑命令。

#### `内容。`

在页面中执行` cut `编辑命令。

#### `内容。复制（）`

在页面中执行` copy `编辑命令。

#### `内容。复制图像（x，y）`

* `x` Integer
* `y` Integer

将给定位置的图像复制到剪贴板上。

#### `内容。粘贴（）`

在页面中执行` paste `编辑命令。

#### `内容。粘贴和匹配样式（）`

在页面中执行` pasteAndMatchStyle `编辑命令。

#### `内容。删除（）`

在页面中执行` delete `编辑命令。

#### `内容。选择全部（）`

在页面中执行` selectAll `编辑命令。

#### `内容。取消选择（）`

在页面中执行` unselect `编辑命令。

#### `内容。替换（文本）`

* `text` String

在页面中执行` replace `编辑命令。

#### `内容。替换拼写（文本）`

* `text` String

在页面中执行` replaceMisspelling `编辑命令。

#### `内容。插入文本（文本）`

* `text` String

返回 `Promise<void>`

插入`text` 到焦点元素

#### `内容.查找页面（文本[，选项]）`

* `text` String - 要搜索的内容，必须非空。
* `options` Object (可选)
  * `forward` Boolean (可选) -向前或向后搜索，默认为 `true`。
  * `findNext` 布尔（可选） - 无论是第一次请求还是跟进， 默认 `false`。
  * `matchCase` 布尔（可选） - 搜索是否应对案件敏感， 默认 `false`。

返回 `Integer` - 用于请求的请求 ID。

开始请求查找网页中 `text` 的所有匹配项。 请求的结果 可以通过订阅 [`found-in-page`](web-contents.md#event-found-in-page) 活动来获得。

#### `内容。停止定义页面（行动）`

* `action` 字符串 - 指定在结束 [ `webContents.findInPage`] 请求时发生的操作。
  * `clearSelection` - 清除选择。
  * `keepSelection` - 将选择转换为正常选择。
  * `activateSelection` - 聚焦并单击选择节点。

以所提供的 `action`停止任何 `findInPage` `webContents` 请求。

```javascript
康斯特 { webContents } =要求（"电子"）
网络内容。 （事件，结果）=> =
  如果（结果.最终更新）网络内容。停止查找页面（"清除选择"）
}）

持续请求Id=网络Contents.findInPage（"api"）
控制台.log（请求）
```

#### `内容。捕获页面（[rect]）`

* `rect` [矩形](structures/rectangle.md) （可选） - 要捕获的页面区域。

返回 `Promise<NativeImage>` - 解决与 [原生图像](native-image.md)

在 `rect`内捕获页面的快照。 省略 `rect` 将捕获整个可见页面。

#### `内容。被捕获（）`

返回 `Boolean` - 此页面是否被捕获。 当捕获器计数 大到 0 时，它返回为真。

#### `内容。增量捕获器计数（[大小，停留希登]）`

* `size` [尺寸](structures/size.md) （可选） - 捕获器的首选尺寸。
* `stayHidden` 布尔（可选） - 隐藏页面，而不是可见。

将捕获器计数增加一个。 当浏览器窗口 隐藏，捕获器计数为非零时，该页面被视为可见。 如果您希望页面保持隐藏状态，则应确保 `stayHidden` 设置为真实。

这也会影响页面可见度 API。

#### `内容。减少捕获计数（[stayHidden]）`

* `stayHidden` 布尔（可选） - 保持页面处于隐藏状态，而不是可见。

将捕获器计数减少一个。 当 浏览器窗口被隐藏或遮挡，捕获器计数达到零时，该页面将被设置为隐藏或遮挡状态。 如果你想 减少隐藏的捕获器计数，而不是你应该设置 `stayHidden` 的真实。

#### `内容。获取打印机（）`

获取系统打印机列表

返回 [`PrinterInfo[]`](structures/printer-info.md)

#### `内容。打印（[options]， [callback]）`

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
  * `pageRanges` 对象[]（可选） - 要打印的页面范围。 在 macOS 上，只有一个范围是荣誉的。
    * `from` 编号 - 打印第一页的索引（0 基于）。
    * `to` 编号 - 打印最后一页的索引（含） （0 基于）。
  * `duplexMode` 字符串（可选） - 设置打印网页的复式模式。 可以 `simplex`， `shortEdge`，或 `longEdge`。
  * `dpi` 记录<string, number> （可选）
    * `horizontal` 编号（可选） - 水平dpi。
    * `vertical` 编号（可选） - 垂直dpi。
  * `header` 字符串（可选） - 要打印为页页头的字符串。
  * `footer` 字符串（可选） - 字符串要打印为页页页脚。
  * `pageSize` 字符串|大小（可选） - 指定打印文档的页面大小。 可以是 `A3`、 `A4`、 `A5`、 `Legal`、 `Letter`、 `Tabloid` 或含有 `height`的物体。
* `callback` Function (可选)
  * `success` 布尔 - 表示打印呼叫的成功。
  * `failureReason` 字符串 -如果打印失败，会调用错误描述。

当自定义 `pageSize` 通过时，Chromium 尝试验证平台中 `width_microns` 和 `height_microns`的特定最低值。 宽度和高度必须都至少为 353 微米，但在某些操作系统上可能更高。

打印窗口的网页。 当 `silent` 设置为 `true`时，如果 `deviceName` 是空的，并且打印的默认设置为 ，Electron 将选择系统默认打印机。

使用 `page-break-before: always;` CSS样式强制打印到新的页面。

示例用法：

```js
const选项={
  无声：真实、
  的设备名称：'我的打印机'，
  页面语言：[{
    from: 0,
    to: 1
  }]
=
win.webContents.打印（选项，（成功，错误类型）=> =
  如果（！成功）控制台.log（错误类型）
}）
```

#### `contents.printToPDF(options)`

* `选项` 对象
  * `headerFooter` 记录<string, string> （可选） - PDF 的标题和脚。
    * `title` 字符串 - PDF 标题的标题。
    * `url` 字符串- PDF脚的网址。
  * `landscape` 布尔（可选） - `true` 景观， `false` 肖像。
  * `marginsType` 整数（可选） - 指定要使用的边距类型。 使用 0 表示 默认保证金，1 表示无保证金，2 表示最低保证金。
  * `scaleFactor` 编号（可选） - 网页的刻度因子。 范围从0到100。
  * `pageRanges` 记录<string, number> （可选） - 要打印的页面范围。
    * `from` 编号 - 打印第一页的索引（0 基于）。
    * `to` 编号 - 打印最后一页的索引（含） （0 基于）。
  * `pageSize` 字符串|大小（可选） - 指定生成的PDF的页面大小。 可以是 `A3`、 `A4`、 `A5`、 `Legal`、 `Letter`、 `Tabloid` 或含有微米 `height` 和 `width` 的物体。
  * `printBackground` 布尔（可选） - 是否打印CSS背景。
  * `printSelectionOnly` 布尔（可选） - 是否只打印选择。

返回 `Promise<Buffer>` - 使用生成的 PDF 数据解决。

将窗口的网页打印为 PDF，并带有 Chromium 的预览打印自定义 设置。

如果在网页中使用 `@page` CSS 规则，则将忽略 `landscape` 。

默认情况下，空 `options` 将被视为：

```javascript
•
  页页距类型：0、
  打印背景：虚假、
  打印选择只：虚假、
  图景：虚假、
  页大小：'A4'、
  缩放因子：100
}
```

使用 `page-break-before: always;` CSS样式强制打印到新的页面。

`webContents.printToPDF`的例子：

```javascript
康斯特 { BrowserWindow } =要求（'电子'）
const fs=要求（'fs'）
锥路径=要求（'路径'）
const os=要求（'os'）

缺点赢=新浏览器窗口（{ width: 800, height: 600 }）
赢。 .com'）

win.webContents.on（"完成加载"，（）=> {
  //使用默认打印选项

    > 赢。 "临时.pdf"）
    fs. 写文件 （pdfPath， 数据，（错误）=> {如果（错误）在控制台
      抛出错误
      .log（"成功将PDF写入 ${pdfPath}"）
    }）
  [）。catch（错误=> {
    控制台.log（"未能将PDF写入 ${pdfPath}：'，错误）
  }）
}）
```

#### `contents.addWorkSpace(path)`

* `path` String

将指定的路径添加到DevTools工作空间。 必须在DevTools 创建后使用：

```javascript
康斯特 { BrowserWindow } =要求（'电子'）
持续赢=新浏览器窗口（）
赢。网络控制。on（'开发打开'，（）=> =
  赢。web康滕茨.addWorkSpace（__dirname）
}）
```

#### `contents.removeWorkSpace(path)`

* `path` String

从 DevTools 工作空间中删除指定的路径。

#### `内容。集德夫图尔斯网络控制器（开发图文并网）`

* `devToolsWebContents` 网络会议

使用 `devToolsWebContents` 作为目标 `WebContents` 显示开发工具。

`devToolsWebContents` 不得进行任何导航，也不应在通话后将其 用于其他目的。

默认情况下，Electron 通过创建具有本机视图的内部 `WebContents` 来管理开发人员，而开发人员对该 的控制非常有限。 使用 `setDevToolsWebContents` 方法，开发人员可以使用任何 `WebContents` 来显示其中 的开发人员，包括 `BrowserWindow`、 `BrowserView` 和 `<webview>` 标签。

请注意，关闭开发人员不会破坏 `devToolsWebContents`，它 是呼叫者的责任，摧毁 `devToolsWebContents`。

在 `<webview>` 标签中显示开发人员的示例：

```html
<html>
<head>
  <style type="text/css">
    *{保证金：0：}
    #browser+高度：70%;}
    #devtools+高度：30%;=
  </style>
</head>
<body>
  <webview id="browser" src="https://github.com"></webview>
  <webview id="devtools" src="about:blank"></webview>
  <script>
    康斯特 { ipcRenderer } =需要（'电子'）
    一次发出=（元素，事件名称）=> 新的承诺（解决=> {
      元素。 事件=> 解决（事件）， { once: true }）
    }）
    浏览器浏览器查看=文档。getEementById（"浏览器"）
    const开发人员视图=文档
    。，"多姆准备"）
    联体开发人员已准备好=发出一次（开发图视图，"多姆就绪"）
    承诺。 然后）=> {
      站目标Id=浏览器视图。getWeb康滕茨id（）
      联排版toolsId=开发图景。getWeb康滕茨id（）
      ipcRenders.发送（'开放式开发人员'，目标ID，开发人员）
    }）
  </script>
</body>
</html>
```

```js
主要过程
康斯特 { ipcMain, webContents } =要求（"电子"）
ipcMain.on（"开放式开发"，（事件，目标康滕茨， 德沃尔斯康滕茨id）=> +
  站目标=webContents.来自ID（目标控制）
  联名开发人员=webContents.来自ID（开发人员）
  目标。setdevTools网络控制（开发人员）
  目标
。
```

在 `BrowserWindow`中显示开发人员的示例：

```js
康斯特 { app, BrowserWindow } =要求（'电子'）

让赢=空
让devtools=空

应用程序。当准备好。然后）=> {
  赢=新的浏览器窗口（）
  开发人员窗口=新的浏览器窗口（）
  .com
  赢.  赢. setdevtools 网络康滕茨 （devtools. web 康滕茨）
  赢. web 康滕茨. 打开德夫图尔斯 （{ mode: 'detach' }）
[）
```

#### `contents.openDevTools([options])`

* `options` Object (可选)
  * `mode` 弦 - 打开具有指定码头状态的开发人员，可 `right`、 `bottom`、 `undocked`、 `detach`。 默认为最后使用过的基座状态。 在 `undocked` 模式下，可以停靠回来。 在 `detach` 模式下，它不是。
  * `activate` 布尔（可选） - 是否将打开的开发窗口 前景。 默认值为 `true`。

打开开发人员。

当 `contents` 是 `<webview>` 标签时，默认情况下， `mode` 将被 `detach` ， 明确通过空 `mode` 可以强制使用上次使用的基座状态。

#### `内容。关闭二元图（）`

关闭开发者工具。

#### `内容。是德夫图打开（）`

返回`Boolean` - 开发者工具是否处于开启状态。

#### `内容。`

返回`Boolean` - 开发者工具是否处于当前执行状态。

#### `内容。切换器图（）`

切换开发工具

#### `内容。检查（x，y）`

* `x` Integer
* `y` Integer

开始检查位于(`x`, `y`) 的元素。

#### `内容。检查共享工人（）`

为共享的工人上下文打开开发人员工具。

#### `内容。检查共享工人比德（工人ID）`

* `workerId` 字符串

根据共享工作人员的 ID 进行检查。

#### `内容。获取所有共享工人（）`

返回 [`SharedWorkerInfo[]`](structures/shared-worker-info.md) - 有关所有共享员工的信息。

#### `内容。检查服务人员（）`

为服务人员上下文打开开发人员工具。

#### `内容。发送（频道，阿格斯）`

* `channel` String
* `...args` any[]

通过 `channel`向渲染器进程发送异步消息，以及 参数。 参数将与 [结构克隆 算法][SCA]串行，就像 [`postMessage`][]一样，因此原型链不会 包括在内。 发送函数、承诺、符号、弱图或弱集 抛出一个例外。

> **注意**：发送非标准的 JavaScript 类型，如 DOM 对象或 特殊电子对象将抛出一个例外。

渲染器过程可以通过与 [`ipcRenderer`](ipc-renderer.md) 模块一起收听 `channel` 来处理消息。

从主过程向渲染器流程发送消息的示例：

```javascript
// 在主进程中.
康斯特 { app, BrowserWindow } =要求（'电子'）
让赢=空

应用程序。然后（）=> {
  赢=新浏览器窗口（{ width: 800, height: 600 }）
  赢
  .html${__dirname}。 （）=> {
    赢。
  })
})
```

```html
<!--索引.html ->
<html>
<body>
  <script>
    需要 （'电子'）. ipcRenderer. on （'平'， （事件， 消息） => {
      控制台.log （消息） / / 打印 "哇！
    [）
  </script>
</body>
</html>
```

#### `内容。发送到框架（帧ID，通道，。。。阿格斯）`

* `frameId` 整数|[数字，数字] - 要发送到的帧的 ID，或 对 `[processId, frameId]` ，如果框架处于与 主帧不同的过程。
* `channel` String
* `...args` any[]

通过 `channel`向渲染器过程中的特定帧发送异步消息，以及参数。 参数将与 [结构克隆算法][SCA]串行，就像 [`postMessage`][]一样，因此原型 链将不包括在内。 发送函数、承诺、符号、弱图或 弱集将抛出一个例外。

> **注：** 发送非标准的 JavaScript 类型（如 DOM 对象或 特殊电子对象）将抛出一个例外。

渲染器过程可以通过与 [`ipcRenderer`](ipc-renderer.md) 模块一起收听 `channel` 来处理消息。

如果您想要获得给定渲染器上下文的 `frameId` ，您应该 `webFrame.routingId` 值使用。  如下:

```js
在
控制台的渲染器过程中.log（"我的相框ID是：'，需要（'电子'）。webFrame.路由Id）
```

您还可以在主要过程中阅读所有传入 IPC 消息的 `frameId` 。

```js
在主要过程中
ipcMain.on（'ping'，（事件）=> {
  console.info（"消息来自相框ID：'，事件。帧id）
}）
```

#### `内容。邮资信息（频道、留言、 [transfer]）`

* `channel` String
* `message` 任何
* `transfer` 消息端口[]（可选）

向渲染器进程发送消息，可选地转移 零或更多 [`MessagePortMain`] 对象的所有权。

传输 `MessagePortMain` 对象将通过访问发射事件的 `ports` 属性，在渲染器 过程中提供。 当他们 到达渲染器时，它们将是原生 DOM `MessagePort` 对象。

例如：

```js
主要过程
 { port1, port2 } =新的消息通道主要（）
网络信箱（"端口"， { message: 'hello' }， [port1]）

//渲染器过程
ipcRenderer.on（"端口"，（e，msg）=> {
 [port] =电子端口
  //
})
```

#### `内容。启用设备（参数）`

* `parameters` 对象
  * `screenPosition` 字符串 - 指定屏幕类型以模拟 （默认值： `desktop`）：
    * `desktop` - 桌面屏幕类型。
    * `mobile` - 移动屏幕类型。
  * `screenSize` [大小](structures/size.md) - 设置模拟屏幕大小（屏幕位置==移动）。
  * `viewPosition` [点](structures/point.md) - 将视图放在屏幕上 （屏幕位置==移动）（默认： `{ x: 0, y: 0 }`）。
  * `deviceScaleFactor` 整数 - 设置设备刻度因子（如果零违约 原始设备刻度因子）（默认： `0`）。
  * `viewSize` [大小](structures/size.md) - 设置模拟视图大小（空表示无覆盖）
  * `scale` 浮动 - 可用空间内模拟视图的缩放（不适合 视图模式）（默认： `1`）。

允许设备模拟给定参数。

#### `内容。禁用设备（）`

禁止`webContents.enableDeviceEmulation`允许的模拟设备

#### `内容。发送无名事件（输入事件）`

* `inputEvent` [鼠标无名小](structures/mouse-input-event.md) | [鼠标轮无](structures/mouse-wheel-input-event.md) | [键盘因特](structures/keyboard-input-event.md)

向页面发送输入 `event` 。 **注意：** 包含内容的 [`BrowserWindow`](browser-window.md) 需要集中 `sendInputEvent()` 工作。

#### `内容。开始框架订阅（[仅迪尔蒂，]回拨）`

* ` onlyDirty ` Boolean (可选) - 默认值为 ` false `.
* `callback` Function
  * `image` [NativeImage](native-image.md)
  * `dirtyRect` [Rectangle](structures/rectangle.md)

开始订阅演示活动和捕获的帧，当有演示文稿 活动时，将用 `callback(image, dirtyRect)` 调用 `callback` 。

`image` 是存储 捕获帧的 [原生图像](native-image.md) 实例。

`dirtyRect` 是具有 `x, y, width, height` 属性的对象， 描述页面的哪个部分被重新粉刷。 如果 `onlyDirty` 设置为 `true`， `image` 将只包含重新粉刷的区域。 `onlyDirty` 默认为 `false`。

#### `内容。结束框架订阅（）`

结束订阅框架演示活动。

#### `内容。启动（项目）`

* `item` 对象
  * `file` 字符串[]|字符串 - 被拖到文件的路径。
  * `icon` [原生图像](native-image.md) |字符串 - 图像必须在 macOS 上 非空图像。

将 `item` 设置为当前拖放操作的拖动项， `file` 是要拖动的文件的 绝对路径， `icon` 是拖动时 光标下显示的图像。

#### `内容。保存页面（全路径，保存类型）`

* `fullPath` 字符串 - 完整的文件路径。
* `saveType` 字符串 - 指定保存类型。
  * `HTMLOnly` - 仅保存页面的 HTML。
  * `HTMLComplete` -保存完整html页面。
  * `MHTML` -将完整html页面保存为MHTML。

返回 `Promise<void>` - 如果页面已保存，则解析。

```javascript
康斯特 { BrowserWindow } = 要求 （'电子'）
缺点赢 = 新的浏览器窗口 （）

赢. loadurl （'https：// github .com'）

赢。 不对称 （） => =
  赢. web 康滕茨. 保存页面 （'/ tmp / 测试.html'， 'HTML 完成'.log
    > ） 。
  [）。catch（呃=> {
    控制台.log（呃）
  }）
}）
```

#### `contents.showDefinitionForSelection()` _macOS_

显示在页面上搜索所选单词的弹出字典。

#### `内容。屏幕外（）`

返回 `Boolean` - 指示是否启用屏幕外渲染</em> *。</p>

#### `内容。开始着色（）`

如果 *屏幕外渲染* 启用，而不是绘画，开始绘画。

#### `内容。停止涂漆（）`

如果 *屏幕外渲染* 启用并绘制，请停止绘画。

#### `内容。`

返回 `Boolean` - 如果 *屏幕外渲染* 启用返回，无论它当前是否正在绘画。

#### `内容。设置帧（fps）`

* `fps` 整数

如果启用 *屏幕外渲染* 则将帧速率设置为指定数字。 仅接受 1 到 240 之间的值。

#### `内容。获取帧率（）`

返回 `Integer` - 如果启用 *屏幕外渲染* 返回当前帧速率。

#### `内容。无效（）`

计划此 Web 内容所处于的窗口的完整重新绘入。

如果启用 *屏幕外渲染* 会使帧失效，并通过 `'paint'` 事件生成新的 。

#### `内容。获取网络处理政策（）`

返回 `String` - 返回 WebRTC IP 处理策略。

#### `内容。设置网络处理政策（政策）`

* `policy` 字符串 - 指定 WebRTC IP 处理策略。
  * `default` - 曝光用户的公共和本地 IPs。 这是默认 行为。 使用此策略时，WebRTC 有权列举所有 界面并将其绑定以发现公共接口。
  * `default_public_interface_only` - 暴露用户的公共 IP，但不 暴露用户的本地 IP。 使用此策略时，WebRTC 应仅使用 http 使用的 默认路由。 这不会暴露任何本地地址。
  * `default_public_and_private_interfaces` - 曝光用户的公共和本地 IPs。 使用此策略时，WebRTC 应仅使用 http 使用的默认路由。 这也暴露了相关的默认专用地址。 默认 路由是操作系统在多主机上选择的路由。
  * `disable_non_proxied_udp` - 不暴露公共或本地 IP。 使用此 策略时，WebRTC 应仅使用 TCP 联系同行或服务器，除非代理服务器 支持 UDP。

设置 WebRTC IP 处理策略允许您通过 WebRTC 控制哪些 IP 暴露。 有关更多详细信息，请参阅 [浏览器泄漏](https://browserleaks.com/webrtc) 。

#### `内容。获取过程ID（）`

返回 `Integer` - 相关渲染器的操作系统 `pid` 过程。

#### `内容。获取处理ID（）`

返回 `Integer` - 相关渲染器的铬内部 `pid` 。 是否可以将 与框架特定导航事件 传递的 `frameProcessId` 进行比较（例如 `did-frame-navigate`）

#### `contents.takeHeapSnapshot(filePath)`

* `filePath` 字符串 - 输出文件的路径。

返回 `Promise<void>` - 指示快照是否已成功创建。

采取V8堆快照，并保存到 `filePath`。

#### `内容。`

返回 `Boolean` - 当页面成为背景时，此 WebContents 是否会限制动画和定时器 。 这也会影响页面可见度 API。

#### `内容。设置背景（允许）`

* `allowed` ·布尔

控制此 Web 内容是否会限制当页面成为背景时 的动画和定时器。 这也会影响页面可见度 API。

#### `内容。获取类型（）`

返回 `String` - 网络内容的类型。 可 `backgroundPage`、 `window`、 `browserView`、 `remote`、 `webview` 或 `offscreen`。

### 实例属性

#### `内容。音频已变`

决定此页面是否静音的 `Boolean` 属性。

#### `内容。用户代理`

确定此网页用户代理的 `String` 属性。

#### `内容。缩放级别`

确定此 Web 内容的缩放级别的 `Number` 属性。

原始大小为 0，高于或低于每个增量表示放大或缩小 20%，默认限制分别为原始大小的 300% 和 50%。 这样做的公式是 `scale := 1.2 ^ level`。

#### `内容。缩放因子`

确定此 Web 内容的缩放因子的 `Number` 属性。

缩放系数是放大百分比除以 100，因此 300% = 3.0。

#### `内容。帧速率`

将 Web 内容的帧速率设置为指定编号的 `Integer` 属性。 仅接受 1 到 240 之间的值。

仅适用于启用屏幕外渲染 ** 。

#### `contents.id` _·里德利·_

`Integer`类型，代表WebContents的唯一标识（unique ID）。 在整个电子应用程序的所有 `WebContents` 实例中，每个 ID 都是独一无二的。

#### `contents.session` _·里德利·_

此网络内容使用的 [`Session`](session.md) 。

#### `contents.hostWebContents` _·里德利·_

可能拥有这种 `WebContents`的 [`WebContents`](web-contents.md) 实例。

#### `contents.devToolsWebContents` _·里德利·_

代表 DevTools `WebContents` 与给定 `WebContents`相关的 `WebContents | null` 属性。

**注意：** 用户不应存储此对象，因为当 DevTool 关闭时，它可能会变得 `null` 。

#### `contents.debugger` _·里德利·_

此网络内容的 [`Debugger`](debugger.md) 实例。

#### `内容。背景`

`Boolean` 属性，决定此 WebContents 是否会在页面成为背景时限制动画和定时器 。 这也会影响页面可见度 API。

#### `contents.mainFrame` _·里德利·_

[`WebFrameMain`](web-frame-main.md) 属性，表示页面框架层次结构的顶部框架。

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
[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
[`postMessage`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
