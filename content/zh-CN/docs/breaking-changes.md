# 重大更改

这里将记录重大更改,并在可能的情况下向JS代码添加弃用警告,在这更改之前至少会有[一个重要版本](tutorial/electron-versioning.md#semver).

### 打破更改类型

本文件利用以下公约对重大变化进行分类：

* **API 更改：** 一个 API 更改的方式使得尚未更新的代码保证会丢弃异常。
* **行为有所改变：** Electron的行为已经改变，但并不是一定会抛出例外情况。
* **默认更改：** 代码取决于旧的默认情况可能会中断，不一定会抛出例外。 可以通过明确指定值来恢复旧行为。
* **已废弃：** 一个 API 被标记为过时状态。 API将继续运行，但将发出一个废弃警告，并将在未来的发布中删除。
* **已移除：** 一个 API 或功能已被删除，不再被 Electron 支持。

## 计划重写的 API (14.0)

### API 更改： `window.(open)`

可选参数 `frameName` 将不再设置窗口的标题。 现在，这遵循了 [本地文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) 根据相应的参数 `windowName`所描述的规范。

如果您使用此参数来设置窗口的标题，则可以改为使用 [](https://www.electronjs.org/docs/api/browser-window#winsettitletitle)赢。

### 已移除： `worldSafeExecuteJavaScript`

在 Electron 14, `worldSafeExecuteJavaScript` 将被移除。  没有其他选择，请 确保您的代码适用于启用此属性。  自电子以来，它已默认启用
12.

如果您使用 `webFrame.executeJavaScript` 或 `webFrame.executeJavaScriptInIsolatedWorld`，您将受到此更改的影响。 您需要确保这些方法返回的值由 [上下文桥 API](api/context-bridge.md#parameter--error--return-type-support) 支持，因为这些方法使用相同的值传递语义。

## 计划重写的 API (13.0)

### API 更改： `session.setPermissionCheckHandler(handler)`

`handler` 方法第一参数以前总是一个 `webContents`，现在有时可以 `null`。  您应该使用 `requestingOrigin`、 `embeddingOrigin` 和 `securityOrigin` 属性来正确响应权限检查。  由于 `webContents` 可以 `null` 它不能再依赖。

```js
旧代码
会话。 设置"检查汉德勒"（网络控制器， 权限） => =
  如果 （webContents. geturl）. 开始使用 （"https：// google.com/"） && 权限 === "通知"） {
    return true
  }
  返回虚假
[）

// 替换为
会话。 权限，请求原始）=> {
  如果（新URL（请求原始）。主机名称=="google.com" && 权限=="通知"） {
    return true
  }
  返回虚假
}）
```

### 已移除： `shell.moveItemToTrash()`

废弃的同步 `shell.moveItemToTrash()` API 已被删除。 使用 异步 `shell.trashItem()` 代替。

```js
在电子13
外壳中取出。移动电击（路径）
//替换为
壳。
```

### 已移除： `BrowserWindow` 扩展 API

移除已弃用的扩展 API：

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

改为使用会话 ABI：

* `ses.loadExtension(path)`
* `除去扩展（extension_id）`
* `ses.获取所有扩展（）`

```js
在电子13
浏览器窗口.添加扩展（路径）
浏览器窗口.添加DevTools扩展（路径）
//替换为
会话。
```

```js
删除电子13
浏览器窗口。删除扩展（名称）
浏览器窗口。删除DevTools扩展（名称）
//替换为
会话 extension_id。
```

```js
在电子13
浏览器窗口中删除。获取扩展（）
浏览器窗口。getDevTools扩展（）
//替换为
会话。
```

### 已移除： `systemPreferences` 中的方法

以下 `systemPreferences` 方法已被弃用：

* `系统预演。是黑暗模具（）`
* `系统预置。是倒色化学（）`
* `系统预演。是高康斯特彩色化学（）`

改为使用以下 `nativeTheme` 属性：

* `本地主题。应该使用黑暗颜色`
* `原生主题。应该使用倒色化学`
* `原生主题。应该使用高反色`

```js
在电子13
系统中删除预置。isDarkMode（）
//替换为
原生主题。应使用电子13
系统
中删除的暗色

// /替换为
原生主题。应使用电子13
系统中删除的倒色

//删除。高反色化学（）
//替换为
原生主题。
```

## 计划重写的 API (12.0)

### 已删除：Pepper Flash 支持

Chromium已经取消了对Flash的支持，因此我们必须效仿。 更多 详情请参阅 Chromium的 [Flash Roadmap](https://www.chromium.org/flash-roadmap)

### 默认更改： `worldSafeExecuteJavaScript` 默认为 `true`

在 Electron 12, `worldSafeExecuteJavaScript` 将默认启用。  要恢复 以前的行为，必须在 WebPrefers 中指定 `worldSafeExecuteJavaScript: false` 。 请注意，设置此选项为 `false` 是**不安全**的。

此选项将在 Electron 14 中删除，因此请迁移您的代码以支持默认 值。

### 默认更改： `上下文隔离` 默认为 `true`

在 Electron 12, `上下文隔离` 默认情况下将被启用。  若要恢复 上一个行为， `上下文孤立：false` 必须在 Web 首选项中指定。

我们 [建议为您的应用程序的安全性启用上下文隔离](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) 。

另一个含义是，除非 `true` `nodeIntegration` ， `false``contextIsolation` ，否则无法在渲染过程中使用 `require()` 。

详情见：https://github.com/electron/electron/issues/23506

### 已删除： `crashReporter.getCrashesDirectory()`

`crashReporter.getCrashesDirectory` 方法已被删除。 使用 应改为 `app.getPath('crashDumps')`。

```js
在电子12
崩溃报告器中删除。获取崩溃编导（）
//替换为
应用程序。
```

### 已删除：渲染器过程中的 `crashReporter` 方法

渲染器 过程中不再提供以下 `crashReporter` 方法：

* `开始`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

它们只能从主要过程调用。

有关详细信息，请参阅 [#23265](https://github.com/electron/electron/pull/23265) 。

### 默认更改： `crashReporter.start({ compress: true })`

`压缩` 选项的默认值为 `crashReporter.start` 已将 从 `false` 更改为 `true` 这意味着崩溃转储将被上传到 崩溃摄取服务器与 `Content-Encoding: gzip` head, 和正文 将被压缩。

如果您的崩溃摄入服务器不支持压缩的有效载荷，您可以 通过在崩溃报告器中指定 `{ compress: false }` 选项来关闭压缩。

### 废弃： `远程` 模块

`远程` 模块在 Electron 12 中被废弃，并将在 Electron 14 中被删除。 由 [`@electronic /远程`](https://github.com/electron/remote) 模块替代。

```js
// Electron 12废弃：
const { BrowserWindow } = require('electron').远程
```

```js
// 替换为：
const { BrowserWindow } = require('@electron/remote')

// 在主进程中：
require('@electron/remote/main').initialize()
```

### 已废弃： `shell.moveItemToTrash()`

同步 `shell.moveItemToTrash()` 已被新的 异步 `shell.trashItem()` 替换。

```js
在电子 12
壳中弃用。 移动触手可走 （路径）
/ / 替换为
壳。
```

## 计划重写的 API (11.0)

### 已删除： `BrowserView`的 `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` 和 `id` 财产

实验性API `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` 现已被移除。 此外， `BrowserView` 的 `id` 财产也被移除。

有关详细信息，请参阅 [#23578](https://github.com/electron/electron/pull/23578)。

## 计划破解API更改(10.0)

### 弃用： `companyName` `crashReporter.start()`的论点

以前 要求 `crashReporter.start()`的 `companyName` 论点现在是可选的，而且进一步被弃用了。 要以非贬低的方式获得相同的 行为，您可以在 `globalExtra`中传递 `companyName` 值。

```js
在电子10
崩溃报告器中弃用。开始（{ companyName: 'Umbrella Corporation' }）
//替换为
碰撞报告器。开始（{全球extra： { _companyName: 'Umbrella Corporation' } }）
```

### 弃用： `crashReporter.getCrashesDirectory()`

`crashReporter.getCrashesDirectory` 方法已被弃用。 使用 应改为 `app.getPath('crashDumps')`。

```js
在电子10中弃用
崩溃报告器。获取崩溃编译器（）
//替换为
应用程序。getPath（"崩溃"）
```

### 弃用：渲染过程中 `crashReporter` 方法

从渲染器过程中调用以下 `crashReporter` 方法 被弃用：

* `开始`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

渲染器 `crashReporter` 模块中唯一未弃用的方法是 `addExtraParameter`、 `removeExtraParameter` 和 `getParameters`。

当从主过程调用时，上述所有方法均未被弃用。

有关详细信息，请参阅 [#23265](https://github.com/electron/electron/pull/23265) 。

### 已废弃： `crashReporter.start({ compress: false })`

设置 `{ compress: false }` 在 `crashReporter.start` 已废弃。 几乎 所有崩溃摄取服务器都支持 gzip 压缩。 此选项将在未来版本的 Electron 中删除 。

### 移除：浏览器窗口关联性

在构建新的 `Browserwindow` 时， `相关` 选项将被删除 作为我们计划的一部分，以更密切地与 Chromium 的安全进程模型匹配。 性能和可维护性。

详情见 [#18397](https://github.com/electron/electron/issues/18397)。

### 默认更改： `启用远程模块` 默认为 `false`

在 Electron 9，使用远程模块但不通过 `启用远程模块` Web首选项开始发出警告。 在 Electron 10, 远程模块现在默认被禁用。 若要使用远程 模块， `启用远程模块：true` 必须在 Web 首选项中指定：

```js
const w = new BrowserWindow(format@@
  webPreferences: {
    enableRemoteModule: true
  }
})
```

我们 [推荐离开远程 模块](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)。

### `协议。未注册普罗托科尔`

### `协议。不间断普罗托科尔`

ABI 现在是同步的，不再需要可选回调。

```javascript
弃用
协议。未注册的Protocol（计划，（）=> {/******/}）
//替换为
协议。
```

### `协议.注册文件`

### `协议。注册布弗普罗托科尔`

### `协议。注册斯特林普罗托科尔`

### `协议。注册普罗托科尔`

### `协议.注册流普罗托科尔`

### `协议。拦截文件普罗托科尔`

### `协议。拦截串普罗托科尔`

### `协议。拦截布弗普罗托科尔`

### `协议。拦截普罗托科尔`

### `协议。拦截流普罗托科尔`

ABI 现在是同步的，不再需要可选回调。

```javascript
弃用
协议。注册文件（方案、处理程序、（）=> [/*][/]）
//替换为
协议。
```

在导航发生之前，已注册或截获的协议不会对当前页面 产生影响。

### `协议。是普罗托科尔处理`

此 API 被弃用，用户应该使用 `protocol.isProtocolRegistered` ，改为 `protocol.isProtocolIntercepted` 。

```javascript
已弃用
协议。是Protocol处理（方案）。然后（）=> {/****/}）
//替换为
const已注册=协议
。
```

## 计划破解API更改(9.0)

### 默认更改：默认禁用在渲染器进程中加载不了解上下文的本地模块

在 Electron 9 中，我们不允许在渲染器进程 中加载不具上下文意义的本机模块。  这是为了提高Electron的安全性、性能和维护性 作为一个项目。

如果这影响到您，您可以临时将 `app.allowRenderProcessReuse` 设置为 `false` 设置为旧的行为。  在Electron 11之前，此标志将只是一个选项，因此 您应该计划更新您的原生模块以便了解上下文情况。

详情见 [#18397](https://github.com/electron/electron/issues/18397)。

### 弃用： `BrowserWindow` 扩展API

以下扩展 ABI 已被弃用：

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

改为使用会话 ABI：

* `ses.loadExtension(path)`
* `除去扩展（extension_id）`
* `ses.获取所有扩展（）`

```js
在电子9
浏览器窗口中弃用。添加扩展（路径）
浏览器窗口。添加DevTools扩展（路径）
//替换为
会话。
```

```js
在电子9
浏览器窗口中弃用。删除扩展（名称）
浏览器窗口。删除DevTools扩展（名称）
//替换为
会话 extension_id。
```

```js
在电子9
浏览器窗口中弃用。获取扩展（）
浏览器窗口。getDevTools扩展（）
//替换为
会话。
```

### 已移除： `<webview>.getWebContents()`

此API在 Electron 8.0中被废弃，现已删除。

```js
// 在 Electron 9.0
webview.getWebContents()
// 替换为
const { remote } = require('electron')
remote.webContents.from(webview.getWebContentsId())
```

### 已删除： `webFrame.setLayoutZoomLevelLimits()`

Chromium 已取消对更改布局缩放级别限制的支持，并且它 超出了 Electron 维护它的能力。 该函数在 电子 8.x 中被弃用，并在电子 9.x 中删除。 布局缩放级别限制 现在固定在最低 0.25 和最大 5.0，</a>此处定义

。</p> 



### 行为改变：现在在 IPC 上发送非JS 对象给异常。

在 Electron 8.0 中，IPC 被更改为使用结构性克隆算法， 显著提高性能。 为了帮助缓解过渡， 旧的 IPC 序列化算法被保留并用于一些无法与结构克隆 串行的对象。 特别是DOM对象 (例如， `元素`, `位置` 和 `DOMMatrix`), 节点 s 由 C++ 类支持的对象(例如， `进程)。 nv`, 一些成员 `串流`, 和 Electron 对象由 C++ 类支持 (例如) `Webcontent`, `BrowserWindow` and `WebFrame`() 不是 序列化的结构克隆。 每当调用旧算法时，都会打印 弃置警告。

在 Electron 9中。 , 旧的序列化算法已被删除, 发送 这种不可序列化的对象现在会抛出一个“对象无法被克隆” 错误。



### API 更改： `shell.openitem` 现在是 `shell.openPath`

`shell.openitem` API 已被异步 `shell.openPath` API替换。 您可以在这里查看 API 的原始建议和理由 [](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)。



## 计划重写的 API (8.0)



### 行为改变：通过 IPC 发送的值现在被结构化的克隆算法序列化

用于串行通过 IPC 发送的对象（通过 `ipcRenderer.send`、 `ipcRenderer.sendSync`、 `WebContents.send` 和相关 方法）的算法已从自定义算法切换到 V8 的内置 [结构化 克隆算法][SCA]，该算法用于为 `postMessage`序列化消息。 这带来了大型 消息的 2 倍性能改进，但也带来了一些行为的突破性变化。

* 通过 IPC 发送函数、承诺、弱图、弱集或包含任何 此类值的对象，现在将抛出一个例外，而不是默默地 将函数转换为 `undefined`。



```js
以前：
ipcRenderer.发送（"通道"，{值：3，一些功能：（）=> {}）
//=> 导致 { value: 3 } 到达主过程

//从电子8：
ipcRenderer.发送（"通道"， {值：3，一些功能：（）=> [}}）
//=> 抛出错误（"）=> {}无法克隆。
```


* `NaN`， `Infinity` 和 `-Infinity` 现在将正确序列化，而不是 转换为 `null`。

* 包含循环引用的对象现在将被正确地序列化， 而不是转换为 `null`。

* `Set`、 `Map`、 `Error` 和 `RegExp` 值将正确序列化， 而不是转换为 `{}`。

* `BigInt` 值将正确序列化，而不是转换为 `null`。

* 稀疏阵列将因此进行序列化，而不是转换为具有 `null`的密集 阵列。

* `Date` 对象将作为 `Date` 对象传输，而不是 转换为其 ISO 字符串表示。

* 打字阵列（如 `Uint8Array`、 `Uint16Array`、 `Uint32Array` 等） 将因此转移，而不是转换为节点.js `Buffer`。

* 节点.js `Buffer` 对象将作为 `Uint8Array`转移。 您可以 通过包装底层 `ArrayBuffer`将 `Uint8Array` 转换回节点.js `Buffer` ：



```js
缓冲区。从（值.缓冲区，值。比特设置，值。按下长）
```


发送任何非本机 JS 类型的对象，如 DOM 对象（如 `Element`、 `Location`、 `DOMMatrix`）、节点.js对象（例如 `process.env`， `Stream`），或电子物体（例如 `WebContents`， `BrowserWindow`， `WebFrame`）被弃用。 在 Electron 8 中，这些对象将序列化为 之前与弃用警告消息，但从电子 9 开始，发送 这些类型的对象将抛出一个"无法克隆"的错误。



### 已废弃： `<webview>.getWebContents()`

此 API 使用 `remote` 模块实现，该模块具有性能 和安全性。 因此，它的使用应该是明确的。



```js
弃用
网络视图。getWeb康滕茨（）
//替换为
续 { remote } =需要（"电子"）
远程。webContents.从ID（webview.获取Web康滕茨id（））
```


但是，建议完全避免使用 `remote` 模块。



```js
主
康斯特 { ipcMain, webContents } =要求（"电子"）

续取"为网站提供信息"=（WebContentsId，内容）=> •
  续客=webContents.来自ID（webContentsId）
  （！客人）{
    抛出新的错误（"无效" webContentsid： ${webContentsId}'）
  =
  如果（guest.host.主机网站内容）{
    抛出新的错误（"访问拒绝网络内容"）
  }
  返回访客
]

ipcMain.handle（"打开的DevTools"， （事件， webContentsId）=> {
  站客人=获取"网络客人"（WebContentsId，活动。发送者）
  客人
。

//渲染器
锥 { ipcRenderer } =需要（"电子"）

ipcRenderer.调用（"打开的DevTools"，网络视图。获取网络控制器）
```




### 已废弃： `webFrame.setLayoutZoomLevelLimits()`

Chromium 已取消对更改布局缩放级别限制的支持，并且它 超出了 Electron 维护它的能力。 该函数将在电子 8.x 中发出警告 ，并且不再存在于电子 9.x 中。 布局缩放级别 限制现在固定在最低 0.25 和最大 5.0， [此处定义](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11)。



### `systemPreferences`中废弃的事件

以下 `systemPreferences` 事件已被弃用：

* `倒色方案更改`
* `高对比度配色方案更改`

改为在 `nativeTheme` 模块上使用新的 `updated` 事件。



```js
弃用
系统Prepreence.on（"倒色方案更改"， （）=> [/][/]）
系统prefers.on（"高对比度配色方案更改"，（）=> {/*[/]）

//替换为
本机主题。on（"更新"，（）=> [/]。。。[/]）
```




### 弃用： `systemPreferences`的方法

以下 `systemPreferences` 方法已被弃用：

* `系统预演。是黑暗模具（）`
* `系统预置。是倒色化学（）`
* `系统预演。是高康斯特彩色化学（）`

改为使用以下 `nativeTheme` 属性：

* `本地主题。应该使用黑暗颜色`
* `原生主题。应该使用倒色化学`
* `原生主题。应该使用高反色`



```js
废弃的
系统预置。isdarkMode（）
//替换为
原生主题。应使用Dark颜色

//弃用
系统预推。倒色化学（）
// 替换为
原生主题。应使用倒色化学

//废弃
系统预置。是高contrast彩色化学（）
//替换为
原生主题。
```




## 计划重写的 API (7.0)



### 已弃用: Atom.io 节点头URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.  在可预见的未来 两者都将得到支持，但建议您切换。

过时的: https://atom.io/download/electron

替换为: https://electronjs.org/headers



### API 更改： `session.clearAuthCache()` 不再接受选项

`session.clearAuthCache` API 不再接受清除哪些选项，而是无条件地清除整个缓存。



```js
弃
会话。清除自动缓存（{ type: 'password' }）
//替换为
会话。
```




### API 更改： `powerMonitor.querySystemIdleState` 现在是 `powerMonitor.getSystemIdleState`



```js
// 在 Electron 7.0
powerMonitor.querySystemIdleState(阈值，回调)
// 替换为同步 API
contst idleState = powerMonitor.getSystemIdleState(阈值)
```




### API 更改： `powerMonitor.querySystemIdletime` 现在是 `powerMonitor.getSystemIdletime`



```js
// 在 Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// 替换为同步API
const idleTime = powerMonitor.getSystemIdleTime()
```




### API 更改： `webFramework.setatedWorldInfo` 替换单独的方法



```js
在电子 7.0
网络框架中删除。 csp）
webFrame.set孤立的世界人类可读名称（世界ID，名称）
webFrame.集孤立的世界安全原始（世界Id，安全原始）
//替换为
webFrame.set孤立的世界信息（
  世界ID，
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  }）
```




### 已移除： `在 <code>getBlinkMemoryInfo 中标记` 属性</code>

此属性在铬 77 中删除，因此不再可用。



### 行为改变： `webkitdirectory` 属性 `<input type="file"/>` 现在列出目录内容

HTML 文件输入上的 `webkitdirectory` 属性允许他们选择文件夹。 以前版本的 Electron 具有不正确的实现，其中输入的 `event.target.files` 返回了返回与所选文件夹对应的一个 `File` 的 `FileList` 。

在 Electron 7 中， `FileList` 现在是包含在 文件夹中的所有文件的列表， 类似于Chrome、Firefox和边缘 ([链接到 MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory))。

作为示例，在这个结构中占用一个文件夹：



```console
文件夹
├---文件1
├--文件2
└--文件3
```


在 Electron <=6, 这将返回一个 `文件列表` 带有一个 `文件` 对象：



```console
路径/到/文件夹
```


在 Electron 7 中，现在返回一个 `FileList` 带有 `文件` 对象：



```console
/路径/到/文件/文件3
/路径/文件/文件2
/路径/到/文件夹1
```


请注意， `webkitdirectory` 不再显示选中文件夹的路径。 如果您需要指向所选文件夹的路径，而不是文件夹内容， 查看 `dialog.showOpenDialog` API（[链接](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)）。



### API 已更改：基于回调的乱交 API 版本

Electron 5 和 Electron 6 引入了基于承诺的现有 异步 ABI 版本，并弃用了旧的基于回调的对应器。 在 Electron 7 中，所有废弃的基于回调的 ABI 现已删除。

这些功能现在只返回承诺：

* `app.getFileIcon()` [#15742](https://github.com/electron/electron/pull/15742)
* `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)
* `contentTracking.getcategories()` [#16583](https://github.com/electron/electron/pull/16583)
* `contentTracking.getTraceBufferUs()` [#16600](https://github.com/electron/electron/pull/16600)
* `contentTracing.startRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contentTracing.stopRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
* `debugger.sendCommand()` [#16861](https://github.com/electron/electron/pull/16861)
* `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
* `inAppAppase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
* `inAppAppase.handeProduct()`[#17355](https://github.com/electron/electron/pull/17355)
* `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
* `session.clear. AuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
* `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.clearhostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
* `session.clearclearStorageData` [#17249](https://github.com/electron/electron/pull/17249)
* `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
* `session.getCacheSize()`  </code>  [#17185](https://github.com/electron/electron/pull/17185)
* `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
* `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
* `shell.openExternal()` [#16176](https://github.com/electron/electron/pull/16176)
* `webContents.loadFile()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.loadURL()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
* `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
* `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
* `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
* `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `win.capturePage()` [#15743](https://github.com/electron/electron/pull/15743)

这些功能现在有两种形式，即同步和基于允诺的异步：

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)



## 计划重写的 API (6.0)



### API 更改： `win.setMenu(null)` 现在是 `win.remenu()`



```js
// 不推荐
win.setMenu(null)
// 替换为
win.removeMenu()
```




### API 更改： `电子.screen` 渲染过程中应通过 `远程` 访问



```js
// 不推荐
require('electron').screen
// 替换为
require('electron').remote.screen
```




### API 更改： `需要`在沙盒渲染器中生成节点。不再含蓄地加载 `远程` 版本



```js
// 不推荐
require('child_process')
// 替换为
require('electron').remote.require('child_process')

// 不推荐
require('fs')
// 替换为
require('electron').remote.require('fs')

// 不推荐
require('os')
// 替换为
require('electron').remote.require('os')

// 不推荐
require('path')
// 替换为
require('electron').remote.require('path')
```




### 已废弃： `powerMonitor.querySystemIdleState` 已替换为 `powerMonitor.getSystemIdleState`



```js
// 已弃用
powerMonitor.querySystemIdleState(阈值，回调)
// 替换为同步 API
const idleState = powerMonitor.getSystemIdleState(阈值)
```




### 已废弃： `powerMonitor.querySystemIdleTime` 被替换为 `powerMonitor.getSystemIdleTime`



```js
// 已弃用
powerMonitor.querySystemIdleTime(callback)
// 用同步API替换
const idleTime = powerMonitor.getSystemIdleTime()
```




### 已废弃： `app.enableMixedSandbox()` 不再需要



```js
弃用
应用程序。启用混合和框（）
```


默认情况下，现在启用了混合砂盒模式。



### 已废弃： `Tray.setHighlightmode`

根据马科斯卡塔利娜我们以前的托盘实施中断。 苹果的原生替代品不支持改变突出显示的行为。



```js
弃用
托盘。设置高光模式（模式）
//API将在v7.0中删除，无需更换。
```




## 计划重写的 API (5.0)



### 默认更改： `节点集成` and `webviewTag` 默认为 false， `上下文隔离` 默认为 true

不推荐使用以下 `webPreferences` 选项默认值，以支持下面列出的新默认值。

| 属性                 | 不推荐使用的默认值                       | 新的默认值   |
| ------------------ | ------------------------------- | ------- |
| `contextIsolation` | `false`                         | `true`  |
| `nodeIntegration`  | `true`                          | `false` |
| `webviewTag`       | `nodeIntegration` 未设置过则是 `true` | `false` |


如下: 重新启用网络视图标签



```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```




### 行为改变： `节点集成` 在子窗口通过 `本地窗口打开`

使用 `原生窗口打开` 选项打开的子窗口将总是禁用 Node.js 集成，除非 `nodeIntegrationInSubFrames` 是 `true`



### API 更改：在应用程序准备就绪之前必须完成注册特权计划

渲染进程 API `webFramework.registerURLSchemeAss特权` and `webFrame.registerURLSchemeAsBypassingCSP` 以及浏览器进程 API `protocol.registerStandardSchemes` 已被删除。 新的 API `protocol.registerSchemeasviliged` 已被添加，并用于注册具有必要权限的自定义 scheme。 自定义 scheme 需要在 app 触发 ready 事件之前注册。



### 已废弃： `webFramework.setIsolatedWorld*` 替换为 `webFrame.setIsolatedWorldInfo`



```js
// 弃用
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// 替换为
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```




### API 更改： `webFrame.setSpellCheckProvider` 现在需要异步回调

`spellCheck` 回调现在是异步的， `autoCorrectWord` 参数已被删除。



```js
已弃用
webFrame.setSpell检查提供器（"在美国"，真实，{
  拼写检查：（文本）=> =
    返回！拼写检查器.拼写检查器.拼写错误（文本）
  [
}）
//替换为
webFrame.set"拼写检查提供器"（"en-US"， {拼写检查
  ：（单词，回调）=> {
    回调（单词。过滤器（文本=拼写检查器> ）
  }
}）
```




### API 更改： `webContents.getZoomLevel` 和 `webContents.getZoomFactor` 现在同步

`webContents.getZoomLevel` 和 `webContents.getZoomFactor` 不再采取回调参数，而是 直接返回其号码值。



```js
弃用
网络控制器。getZoom级别（级别）=> {
  控制台.log（级别）
}）
//替换为
续级=WebContents.getZoom级别（）
控制台.log（级别）
```




```js
废弃的
网络控制器。getZoom因子（（因子）=> {
  控制台.log（因子）
}）
//替换为
连续因子=webContents.getZoom因子（）
控制台.log（因子）
```




## 计划重写的 API (4.0)

以下包含了Electron 4.0中重大的API更新



### `app.makeSingleInstance`



```js
弃用
应用程序。 cwd）=> {
  /*[/
]）
//替换为
应用程序。请求单项登录锁（）
应用程序。on（"二审"，（事件，argv，cwd）=> {
  /*。。。//

```




### `app.releaseSingleInstance`



```js
// 废弃
app.releaseSingleInstance()
// 替换为
app.releaseSingleInstanceLock()
```




### `app.getGPUInfo`



```js
app.getGPUInfo('complete')
// 现在的行为将与macOS下的`basic`设置一样
app.getGPUInfo('basic')
```




### `win_delay_load_hook`

在为 Windows 构建本机模块时，将使 `win_delay_load_hook` 变量值 位于 `binding.gyp` 模块，必须为 true (这是默认值)。 如果这个钩子 不存在，那么本机模块将无法在 Windows 上加载，并出现错误 消息如 `无法找到模块`。 查看 [原生模块指南](/docs/tutorial/using-native-node-modules.md) 以获取更多信息.



## 重大的API更新 (3.0)

以下包含了Electron 3.0中重大的API更新



### `app`



```js
// 弃用
app.getAppMemoryInfo()
// 替换为
app.getAppMetrics()

// 弃用
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // 弃用的属性
```




### `BrowserWindow`



```js
弃用
const选项A={WebPrefers： { blinkFeatures: '' } =
窗口A=新的浏览器窗口（选项A）
//替换为
const选项 B={WebPrefers： { enableBlinkFeatures: '' } =
窗口B=新的浏览器窗口（选项B）

//弃用
窗口。 cmd）=> {
  如果（cmd==="媒体play_pause"）{
    //做一些
  }
}）
//替换
窗口。 （e，cmd） => {
  如果 （cmd == "媒体播放暂停"） [
    / / 做一些
  }
} ）
```




### `剪贴板`



```js
// 弃用
clipboard.readRtf()
// 替换为
clipboard.readRTF()

// 弃用
clipboard.writeRtf()
// 替换为
clipboard.writeRTF()

// 弃用
clipboard.readHtml()
// 替换为
clipboard.readHTML()

// 弃用
clipboard.writeHtml()
// 替换为
clipboard.writeHTML()
```




### `crashReporter`



```js
// 弃用
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// 替换为
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```




### `nativeImage`



```js
// 弃用
nativeImage.createFromBuffer(buffer, 1.0)
// 替换为
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```




### `进程`



```js
// 弃用
const info = process.getProcessMemoryInfo()
```




### `screen`



```js
// 弃用
screen.getMenuBarHeight()
// 替换为
screen.getPrimaryDisplay().workArea
```




### `session`



```js
// 弃用
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// 替换为
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```




### `Tray`



```js
// 弃用
tray.setHighlightMode(true)
// 替换为
tray.setHighlightMode('on')

// 弃用
tray.setHighlightMode(false)
// 替换为
tray.setHighlightMode('off')
```




### `网络控制`



```js
// 弃用
webContents.openDevTools({ detach: true })
// 替换为
webContents.openDevTools({ mode: 'detach' })

// 移除
webContents.setSize(options)
// 没有该API的替代
```




### `webFrame`



```js
// 弃用
webFrame.registerURLSchemeAsSecure('app')
// 替换为
protocol.registerStandardSchemes(['app'], { secure: true })

// 弃用
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// 替换为
protocol.registerStandardSchemes(['app'], { secure: true })
```




### `<webview>`



```js
// 移除
webview.setAttribute('disableguestresize', '')
// 没有该API的替代

// 移除
webview.setAttribute('guestinstance', instanceId)
// 没有该API的替代

// 键盘监听器在webview标签中不再起效
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```




### Node Headers URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.

过时的: https://atom.io/download/atom-shell

替换为: https://atom.io/download/electron



## 重大的API更新 (2.0)

以下包含了Electron 2.0中重大的API更新



### `BrowserWindow`



```js
// 已废弃的
const optionsA = { titleBarStyle: 'hidden-inset' }
const window A = new BrowserWindow(optionsA)
// 替换为
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```




### `menu`



```js
// 移除
menu.popup(browserWindow, 100, 200, 2)
// 替换为
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```




### `nativeImage`



```js
// 移除
nativeImage.toPng()
// 替换为
nativeImage.toPNG()

// 移除
nativeImage.toJpeg()
// 替换为
nativeImage.toJPEG()
```




### `进程`

* ` process.versions.electron ` 和 ` process.version.chrome ` 将成为只读属性, 以便与其他 ` process.versions ` 属性由Node设置。



### `网络控制`



```js
// 移除
webContents.setZoomLevelLimits(1, 2)
// 替换为
webContents.setVisualZoomLevelLimits(1, 2)
```




### `webFrame`



```js
// 移除
webFrame.setZoomLevelLimits(1, 2)
// 替换为
webFrame.setVisualZoomLevelLimits(1, 2)
```




### `<webview>`



```js
// 移除
webview.setZoomLevelLimits(1, 2)
// 替换为
webview.setVisualZoomLevelLimits(1, 2)
```




### 重复的 ARM 资源

每个 Electron 发布版本包含两个相同的ARM版本，文件名略有不同，如`electron-v1.7.3-linux-arm.zip` 和 `electron-v1.7.3-linux-armv7l.zip` 添加包含`v7l`前缀的资源向用户明确其支持的ARM版本，并消除由未来armv6l 和 arm64 资源可能产生的歧义。

为了防止可能导致安装器毁坏的中断，_不带前缀_的文件仍然将被发布。 从 2.0 开始，未预修复的文件将 不再发布。

更多详细情况，查看 [6986](https://github.com/electron/electron/pull/6986) 和 [7189](https://github.com/electron/electron/pull/7189)。

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
