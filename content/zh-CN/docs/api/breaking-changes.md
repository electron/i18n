# API协议

这里将记录重大更改,并在可能的情况下向JS代码添加弃用警告,在这更改之前至少会有[一个重要版本](../tutorial/electron-versioning.md#semver).

# `FIXME` 注释

代码注释中添加的`FIXME`字符来表示以后的版本应该被修复的问题. 参考 https://github.com/electron/electron/search?q=fixme

# 计划重写的 API (5.0)

## `new BrowserWindow({ webPreferences })`

不推荐使用以下 `webPreferences` 选项默认值，以支持下面列出的新默认值。

| 属性                 | 不推荐使用的默认值                            | 新的默认值   |
| ------------------ | ------------------------------------ | ------- |
| `contextIsolation` | `false`                              | `true`  |
| `nodeIntegration`  | `true`                               | `false` |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false` |

## `nativeWindowOpen`

使用 `nativeWindowOpen` 选项打开的子窗口将始终禁用 Node.js 集成。

## `webContents.findInPage(text[, options])`

`wordStart` 和 `medialCapitalAsWordStart` 选项被删除。

# 计划重写的 API (4.0)

以下列表包含了Electron4.0计划重写的API

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (event, argv, cwd) {

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
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

在为 Windows 构建本机模块时，将使 `win_delay_load_hook` 变量值 位于 `binding.gyp` 模块，必须为 true (这是默认值)。 如果这个钩子 不存在，那么本机模块将无法在 Windows 上加载，并出现错误 消息如 `无法找到模块`。 See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# 重大的API更新 (3.0)

以下包含了Electron 3.0中重大的API更新

## `app`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

## `BrowserWindow`

```js
// Deprecated
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

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

## `clipboard`

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

## `crashReporter`

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
// Deprecated
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
// 过时的
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// 替换为
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

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
// 过时的
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
//替换为
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

为了防止可能导致安装器毁坏的中断，*不带前缀*的文件仍然将被发布。 从2.0版本起，不带前缀的文件将不再发布。

更多详细情况，查看 [6986](https://github.com/electron/electron/pull/6986) 和 [7189](https://github.com/electron/electron/pull/7189)。