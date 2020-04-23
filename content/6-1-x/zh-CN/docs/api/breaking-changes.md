# 重大更改

这里将记录重大更改,并在可能的情况下向JS代码添加弃用警告,在这更改之前至少会有[一个重要版本](../tutorial/electron-versioning.md#semver).

# `FIXME` 注释

代码注释中添加的`FIXME`字符来表示以后的版本应该被修复的问题. 参考 https://github.com/electron/electron/search?q=fixme

# 计划重写的 API (7.0)

## `shell.openExternalSync(url[, options])`

```js
// Deprecated
shell.openExternalSync(url)
// Replace with
async function openThing (url) {
  await shell.openExternal(url)
}
```

# 计划重写的 API (6.0)

## `win.setMenu(null)`

```js
// 不推荐
win.setMenu(null)
// 替换为
win.removeMenu()
```

## `contentTracing.getTraceBufferUsage()`

```js
// Deprecated
contentTracing.getTraceBufferUsage((percentage, value) => {
  // do something
})
// Replace with
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject has percentage and value fields
})
```

## 渲染进程中的 `electron.screen`

```js
// 不推荐
require('electron').screen
// 替换为
require('electron').remote.screen
```

## 沙盒渲染器中的`require`

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

## `powerMonitor.querySystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

## `Tray`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

# 计划重写的 API (5.0)

## `new BrowserWindow({ webPreferences })`

不推荐使用以下 `webPreferences` 选项默认值，以支持下面列出的新默认值。

| 属性                 | 不推荐使用的默认值                       | 新的默认值   |
| ------------------ | ------------------------------- | ------- |
| `contextIsolation` | `false`                         | `true`  |
| `nodeIntegration`  | `true`                          | `false` |
| `webviewTag`       | `nodeIntegration` 未设置过则是 `true` | `false` |

例如，重新启用 webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true.

## 带权限的 Scheme 注册

移除 Renderer process APIs `webFrame.setLSSemeAsPrivieged` 和 `webFrame.registerURLLSQUIseAswersegCSP` 以及浏览器 process API `protocol.registerStardsSchemes`. 新的 API `protocol.registerSchemeasviliged` 已被添加，并用于注册具有必要权限的自定义 scheme。 自定义 scheme 需要在 app 触发 ready 事件之前注册。

## webFrame Isolated World APIs

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

# 计划重写的 API (4.0)

以下包含了Electron 4.0中重大的API更新

## `app.makeSingleInstance`

```js
// 弃用
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// 替换为
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

## `app.releaseSingleInstance`

```js
// 废弃
app.releaseSingleInstance()
// 替换为
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// 现在的行为将与macOS下的`basic`设置一样
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

在为 Windows 构建本机模块时，将使 `win_delay_load_hook` 变量值 位于 `binding.gyp` 模块，必须为 true (这是默认值)。 如果这个钩子 不存在，那么本机模块将无法在 Windows 上加载，并出现错误 消息如 `无法找到模块`。 查看 [原生模块指南](/docs/tutorial/using-native-node-modules.md) 以获取更多信息.

# 重大的API更新 (3.0)

以下包含了Electron 3.0中重大的API更新

## `app`

```js
// 弃用
app.getAppMemoryInfo()
// 替换为
app.getAppMetrics()

// 弃用
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // 弃用的属性
```

## `BrowserWindow`

```js
// 弃用
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// 替换为
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// 弃用
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // do something
  }
})
// 替换为
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // do something
  }
})
```

## `clipboard`

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

## `crashReporter`

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

## `nativeImage`

```js
// 弃用
nativeImage.createFromBuffer(buffer, 1.0)
// 替换为
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// 弃用
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// 弃用
screen.getMenuBarHeight()
// 替换为
screen.getPrimaryDisplay().workArea
```

## `session`

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

## `Tray`

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

## `webContents`

```js
// 弃用
webContents.openDevTools({ detach: true })
// 替换为
webContents.openDevTools({ mode: 'detach' })

// 移除
webContents.setSize(options)
// 没有该API的替代
```

## `webFrame`

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

## `<webview>`

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

## Node Headers URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.

过时的: https://atom.io/download/atom-shell

替换为: https://atom.io/download/electron


# 重大的API更新 (2.0)

以下包含了Electron 2.0中重大的API更新

## `BrowserWindow`

```js
// 弃用
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// 替换为
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// 移除
menu.popup(browserWindow, 100, 200, 2)
// 替换为
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

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

## `process`

* ` process.versions.electron ` 和 ` process.version.chrome ` 将成为只读属性, 以便与其他 ` process.versions ` 属性由Node设置。

## `webContents`

```js
// 移除
webContents.setZoomLevelLimits(1, 2)
// 替换为
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// 移除
webFrame.setZoomLevelLimits(1, 2)
// 替换为
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// 移除
webview.setZoomLevelLimits(1, 2)
// 替换为
webview.setVisualZoomLevelLimits(1, 2)
```

## 重复的 ARM 资源

每个 Electron 发布版本包含两个相同的ARM版本，文件名略有不同，如`electron-v1.7.3-linux-arm.zip` 和 `electron-v1.7.3-linux-armv7l.zip` 添加包含`v7l`前缀的资源向用户明确其支持的ARM版本，并消除由未来armv6l 和 arm64 资源可能产生的歧义。

为了防止可能导致安装器毁坏的中断，_不带前缀_的文件仍然将被发布。 从2.0版本起，不带前缀的文件将不再发布。

更多详细情况，查看 [6986](https://github.com/electron/electron/pull/6986) 和 [7189](https://github.com/electron/electron/pull/7189)。
