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

### API Changed: `window.(open)`

The optional parameter `frameName` will no longer set the title of the window. This now follows the specification described by the [native documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) under the corresponding parameter `windowName`.

If you were using this parameter to set the title of a window, you can instead use [win.setTitle(title)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle).

### 已移除： `worldSafeExecuteJavaScript`

在 Electron 14, `worldSafeExecuteJavaScript` 将被移除。  There is no alternative, please ensure your code works with this property enabled.  It has been enabled by default since Electron
12.

You will be affected by this change if you use either `webFrame.executeJavaScript` or `webFrame.executeJavaScriptInIsolatedWorld`. You will need to ensure that values returned by either of those methods are supported by the [Context Bridge API](api/context-bridge.md#parameter--error--return-type-support) as these methods use the same value passing semantics.

## 计划重写的 API (13.0)

### API 更改： `session.setPermissionCheckHandler(handler)`

The `handler` methods first parameter was previously always a `webContents`, it can now sometimes be `null`.  You should use the `requestingOrigin`, `embeddingOrigin` and `securityOrigin` properties to respond to the permission check correctly.  As the `webContents` can be `null` it can no longer be relied on.

```js
// Old code
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// Replace with
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### 已移除： `shell.moveItemToTrash()`

废弃的同步 `shell.moveItemToTrash()` API 已被删除。 使用 异步 `shell.trashItem()` 代替。

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

### 已移除： `BrowserWindow` 扩展 API

移除已弃用的扩展 API：

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Removed in Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Removed in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Removed in Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### 已移除： `systemPreferences` 中的方法

The following `systemPreferences` methods have been deprecated:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Removed in Electron 13
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Removed in Electron 13
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Removed in Electron 13
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

## 计划重写的 API (12.0)

### 已删除：Pepper Flash 支持

Chromium已经取消了对Flash的支持，因此我们必须效仿。 更多 详情请参阅 Chromium的 [Flash Roadmap](https://www.chromium.org/flash-roadmap)

### 默认更改： `worldSafeExecuteJavaScript` 默认为 `true`

在 Electron 12, `worldSafeExecuteJavaScript` 将默认启用。  To restore the previous behavior, `worldSafeExecuteJavaScript: false` must be specified in WebPreferences. 请注意，设置此选项为 `false` 是**不安全**的。

This option will be removed in Electron 14 so please migrate your code to support the default value.

### 默认更改： `上下文隔离` 默认为 `true`

在 Electron 12, `上下文隔离` 默认情况下将被启用。  若要恢复 上一个行为， `上下文孤立：false` 必须在 Web 首选项中指定。

We [recommend having contextIsolation enabled](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) for the security of your application.

详情见：https://github.com/electron/electron/issues/23506

### Removed: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been removed. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Removed in Electron 12
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

* `开始`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### 默认更改： `crashReporter.start({ compress: true })`

`压缩` 选项的默认值为 `crashReporter.start` 已将 从 `false` 更改为 `true` 这意味着崩溃转储将被上传到 崩溃摄取服务器与 `Content-Encoding: gzip` head, 和正文 将被压缩。

If your crash ingestion server does not support compressed payloads, you can turn off compression by specifying `{ compress: false }` in the crash reporter options.

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
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## 计划重写的 API (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## 计划破解API更改(10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

* `开始`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

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

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`

### `protocol.registerBufferProtocol`

### `protocol.registerStringProtocol`

### `protocol.registerHttpProtocol`

### `protocol.registerStreamProtocol`

### `protocol.interceptFileProtocol`

### `protocol.interceptStringProtocol`

### `protocol.interceptBufferProtocol`

### `protocol.interceptHttpProtocol`

### `protocol.interceptStreamProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## 计划破解API更改(9.0)

### 默认更改：默认禁用在渲染器进程中加载不了解上下文的本地模块

在 Electron 9 中，我们不允许在渲染器进程 中加载不具上下文意义的本机模块。  这是为了提高Electron的安全性、性能和维护性 作为一个项目。

如果这影响到您，您可以临时将 `app.allowRenderProcessReuse` 设置为 `false` 设置为旧的行为。  在Electron 11之前，此标志将只是一个选项，因此 您应该计划更新您的原生模块以便了解上下文情况。

详情见 [#18397](https://github.com/electron/electron/issues/18397)。

### Deprecated: `BrowserWindow` extension APIs

The following extension APIs have been deprecated:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Deprecated in Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Deprecated in Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Deprecated in Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
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

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### 行为改变：现在在 IPC 上发送非JS 对象给异常。

在 Electron 8.0 中，IPC 被更改为使用结构性克隆算法， 显著提高性能。 To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. 特别是DOM对象 (例如， `元素`, `位置` 和 `DOMMatrix`), 节点 s 由 C++ 类支持的对象(例如， `进程)。 nv`, 一些成员 `串流`, 和 Electron 对象由 C++ 类支持 (例如) `Webcontent`, `BrowserWindow` and `WebFrame`() 不是 序列化的结构克隆。 每当调用旧算法时，都会打印 弃置警告。

在 Electron 9中。 , 旧的序列化算法已被删除, 发送 这种不可序列化的对象现在会抛出一个“对象无法被克隆” 错误。

### API 更改： `shell.openitem` 现在是 `shell.openPath`

`shell.openitem` API 已被异步 `shell.openPath` API替换。 您可以在这里查看 API 的原始建议和理由 [](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)。

## 计划重写的 API (8.0)

### 行为改变：通过 IPC 发送的值现在被结构化的克隆算法序列化

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm][SCA], the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

* Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
* Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
* `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
* `BigInt` values will be correctly serialized, instead of being converted to `null`.
* Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
* `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
* Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
* Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### 已废弃： `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents.fromId(webContentsId)
  if (!guest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest.hostWebContents !== contents) {
    throw new Error('Access denied to webContents')
  }
  return guest
}

ipcMain.handle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  guest.openDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### 已废弃： `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Deprecated events in `systemPreferences`

The following `systemPreferences` events have been deprecated:

* `inverted-color-scheme-changed`
* `high-contrast-color-scheme-changed`

Use the new `updated` event on the `nativeTheme` module instead.

```js
// Deprecated
systemPreferences.on('inverted-color-scheme-changed', () => { /* ... */ })
systemPreferences.on('high-contrast-color-scheme-changed', () => { /* ... */ })

// Replace with
nativeTheme.on('updated', () => { /* ... */ })
```

### Deprecated: methods in `systemPreferences`

The following `systemPreferences` methods have been deprecated:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Deprecated
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Deprecated
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

## 计划重写的 API (7.0)

### 已弃用: Atom.io 节点头URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.  Both will be supported for the foreseeable future but it is recommended that you switch.

过时的: https://atom.io/download/electron

替换为: https://electronjs.org/headers

### API 更改： `session.clearAuthCache()` 不再接受选项

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
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
// Removed in Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### 已移除： `在 <code>getBlinkMemoryInfo 中标记` 属性</code>

This property was removed in Chromium 77, and as such is no longer available.

### 行为改变： `webkitdirectory` 属性 `<input type="file"/>` 现在列出目录内容

HTML 文件输入上的 `webkitdirectory` 属性允许他们选择文件夹。 Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

在 Electron 7 中， `FileList` 现在是包含在 文件夹中的所有文件的列表， 类似于Chrome、Firefox和边缘 ([链接到 MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory))。

作为示例，在这个结构中占用一个文件夹：

```console
folder
├── file1
├── file2
└── file3
```

在 Electron <=6, 这将返回一个 `文件列表` 带有一个 `文件` 对象：

```console
path/to/folder
```

在 Electron 7 中，现在返回一个 `FileList` 带有 `文件` 对象：

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

请注意， `webkitdirectory` 不再显示选中文件夹的路径。 If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### API Changed: Callback-based versions of promisified APIs

Electron 5 and Electron 6 introduced Promise-based versions of existing asynchronous APIs and deprecated their older, callback-based counterparts. In Electron 7, all deprecated callback-based APIs are now removed.

These functions now only return Promises:

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
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### 已废弃： `Tray.setHighlightmode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## 计划重写的 API (5.0)

### 默认更改： `节点集成` and `webviewTag` 默认为 false， `上下文隔离` 默认为 true

不推荐使用以下 `webPreferences` 选项默认值，以支持下面列出的新默认值。

| 属性                 | 不推荐使用的默认值                       | 新的默认值   |
| ------------------ | ------------------------------- | ------- |
| `contextIsolation` | `false`                         | `true`  |
| `nodeIntegration`  | `true`                          | `false` |
| `webviewTag`       | `nodeIntegration` 未设置过则是 `true` | `false` |

如下: Re-enabling the webviewTag

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

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

### API Changed: `webContents.getZoomLevel` and `webContents.getZoomFactor` are now synchronous

`webContents.getZoomLevel` and `webContents.getZoomFactor` no longer take callback parameters, instead directly returning their number values.

```js
// Deprecated
webContents.getZoomLevel((level) => {
  console.log(level)
})
// Replace with
const level = webContents.getZoomLevel()
console.log(level)
```

```js
// Deprecated
webContents.getZoomFactor((factor) => {
  console.log(factor)
})
// Replace with
const factor = webContents.getZoomFactor()
console.log(factor)
```

## 计划重写的 API (4.0)

以下包含了Electron 4.0中重大的API更新

### `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
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
// Deprecated
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Replace with
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Deprecated
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// Replace with
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
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

为了防止可能导致安装器毁坏的中断，_不带前缀_的文件仍然将被发布。 Starting at 2.0, the unprefixed file will no longer be published.

更多详细情况，查看 [6986](https://github.com/electron/electron/pull/6986) 和 [7189](https://github.com/electron/electron/pull/7189)。

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
