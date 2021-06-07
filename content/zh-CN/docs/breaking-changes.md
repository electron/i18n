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

可选参数 `frameName` 将不再设置窗口的标题。 This now follows the specification described by the [native documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) under the corresponding parameter `windowName`.

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

### Deprecated: WebContents `new-window` event

The `new-window` event of WebContents has been deprecated. It is replaced by [`webContents.setWindowOpenHandler()`](api/web-contents.md#contentssetwindowopenhandlerhandler).

```js
// Deprecated in Electron 13
webContents.on('new-window', (event) => {
  event.preventDefault()
})

// Replace with
webContents.setWindowOpenHandler((details) => {
  return { action: 'deny' }
})
```

## 计划重写的 API (12.0)

### Removed: Pepper Flash support

Chromium has removed support for Flash, and so we must follow suit. See Chromium's [Flash Roadmap](https://www.chromium.org/flash-roadmap) for more details.

### 默认更改： `worldSafeExecuteJavaScript` 默认为 `true`

在 Electron 12, `worldSafeExecuteJavaScript` 将默认启用。  To restore the previous behavior, `worldSafeExecuteJavaScript: false` must be specified in WebPreferences. 请注意，设置此选项为 `false` 是**不安全**的。

This option will be removed in Electron 14 so please migrate your code to support the default value.

### 默认更改： `contextIsolation` 默认为 `true`

在 Electron 12, `contextIsolation` 将默认启用。  To restore the previous behavior, `contextIsolation: false` must be specified in WebPreferences.

We [recommend having contextIsolation enabled](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) for the security of your application.

Another implication is that `require()` cannot be used in the renderer process unless `nodeIntegration` is `true` and `contextIsolation` is `false`.

For more details see: https://github.com/electron/electron/issues/23506

### 已移除： `crashReporter.getCrashesDirectory()`

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

### Default Changed: `crashReporter.start({ compress: true })`

The default value of the `compress` option to `crashReporter.start` has changed from `false` to `true`. This means that crash dumps will be uploaded to the crash ingestion server with the `Content-Encoding: gzip` header, and the body will be compressed.

If your crash ingestion server does not support compressed payloads, you can turn off compression by specifying `{ compress: false }` in the crash reporter options.

### Deprecated: `remote` module

The `remote` module is deprecated in Electron 12, and will be removed in Electron 14. It is replaced by the [`@electron/remote`](https://github.com/electron/remote) module.

```js
// Deprecated in Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Replace with:
const { BrowserWindow } = require('@electron/remote')

// In the main process:
require('@electron/remote/main').initialize()
```

### Deprecated: `shell.moveItemToTrash()`

The synchronous `shell.moveItemToTrash()` has been replaced by the new, asynchronous `shell.trashItem()`.

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

### Deprecated: `crashReporter.start({ compress: false })`

Setting `{ compress: false }` in `crashReporter.start` is deprecated. Nearly all crash ingestion servers support gzip compression. This option will be removed in a future version of Electron.

### Removed: Browser Window Affinity

The `affinity` option when constructing a new `BrowserWindow` will be removed as part of our plan to more closely align with Chromium's process model for security, performance and maintainability.

For more detailed information see [#18397](https://github.com/electron/electron/issues/18397).

### 默认更改： `enableRemoteModule` 默认为 `false`

In Electron 9, using the remote module without explicitly enabling it via the `enableRemoteModule` WebPreferences option began emitting a warning. In Electron 10, the remote module is now disabled by default. To use the remote module, `enableRemoteModule: true` must be specified in WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

We [recommend moving away from the remote module](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

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

### Default Changed: Loading non-context-aware native modules in the renderer process is disabled by default

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  This is to improve security, performance and maintainability of Electron as a project.

If this impacts you, you can temporarily set `app.allowRendererProcessReuse` to `false` to revert to the old behavior.  This flag will only be an option until Electron 11 so you should plan to update your native modules to be context aware.

For more detailed information see [#18397](https://github.com/electron/electron/issues/18397).

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

### Removed: `<webview>.getWebContents()`

This API, which was deprecated in Electron 8.0, is now removed.

```js
// Removed in Electron 9.0
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### 已移除： `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Behavior Changed: Sending non-JS objects over IPC now throws an exception

In Electron 8.0, IPC was changed to use the Structured Clone Algorithm, bringing significant performance improvements. To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Whenever the old algorithm was invoked, a deprecation warning was printed.

In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.

### API Changed: `shell.openItem` is now `shell.openPath`

The `shell.openItem` API has been replaced with an asynchronous `shell.openPath` API. You can see the original API proposal and reasoning [here](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## 计划重写的 API (8.0)

### Behavior Changed: Values sent over IPC are now serialized with Structured Clone Algorithm

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

### Deprecated: `<webview>.getWebContents()`

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

### Deprecated: `webFrame.setLayoutZoomLevelLimits()`

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

### Deprecated: Atom.io Node Headers URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### API Changed: `session.clearAuthCache()` no longer accepts options

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API Changed: `powerMonitor.querySystemIdleState` is now `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API Changed: `powerMonitor.querySystemIdleTime` is now `powerMonitor.getSystemIdleTime`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API Changed: `webFrame.setIsolatedWorldInfo` replaces separate methods

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

### Removed: `marked` property on `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Behavior Changed: `webkitdirectory` attribute for `<input type="file"/>` now lists directory contents

The `webkitdirectory` property on HTML file inputs allows them to select folders. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

As an illustration, take a folder with this structure:

```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6, this would return a `FileList` with a `File` object for:

```console
path/to/folder
```

In Electron 7, this now returns a `FileList` with a `File` object for:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Note that `webkitdirectory` no longer exposes the path to the selected folder. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

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

### API Changed: `win.setMenu(null)` is now `win.removeMenu()`

```js
// 不推荐
win.setMenu(null)
// 替换为
win.removeMenu()
```

### API Changed: `electron.screen` in the renderer process should be accessed via `remote`

```js
// 不推荐
require('electron').screen
// 替换为
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers no longer implicitly loads the `remote` version

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

### Deprecated: `powerMonitor.querySystemIdleState` replaced with `powerMonitor.getSystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Deprecated: `powerMonitor.querySystemIdleTime` replaced with `powerMonitor.getSystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Deprecated: `app.enableMixedSandbox()` is no longer needed

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Deprecated: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## 计划重写的 API (5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` defaults to true

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

### Behavior Changed: `nodeIntegration` in child windows opened via `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API Changed: Registering privileged schemes must now be done before app ready

Renderer process APIs `webFrame.registerURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. 新的 API `protocol.registerSchemeasviliged` 已被添加，并用于注册具有必要权限的自定义 scheme。 自定义 scheme 需要在 app 触发 ready 事件之前注册。

### Deprecated: `webFrame.setIsolatedWorld*` replaced with `webFrame.setIsolatedWorldInfo`

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

### API Changed: `webFrame.setSpellCheckProvider` now takes an asynchronous callback

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
// 过时的
clipboard.readRtf()
// 替换为
clipboard.readRTF()

// 过时的
clipboard.writeRtf()
// 替换为
clipboard.writeRTF()

// 过时的
clipboard.readHtml()
// 替换为
clipboard.readHTML()

// 过时的
clipboard.writeHtml()
//替换为
clipboard.writeHTML()
```

### `crashReporter`

```js
// 过时的
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
// 过时的
tray.setHighlightMode(true)
// 替换为
tray.setHighlightMode('on')

// 过时的
tray.setHighlightMode(false)
// 替换为
tray.setHighlightMode('off')
```

### `webContents`

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
// Deprecated
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Replace with
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

### `webContents`

```js
// 移除
webContents.setZoomLevelLimits(1, 2)
// 替换为
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// 被废弃
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
