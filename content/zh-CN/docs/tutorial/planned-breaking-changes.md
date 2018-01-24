# 计划中的 API 更改

以下列表包括将在Electron 2.0中删除的API

对于这个版本的发布没有时间表，但是弃用警告将被至少预先90天添加

## `app`

```js
// 过时的
app.getAppMemoryInfo()
// 替换为
app.getAppMetrics()
```

## `BrowserWindow`

```js
//过时的
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
//替换为
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)
```

```js
// 过时的
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
//替换为
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
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

## `menu`

```js
// 过时的
menu.popup(browserWindow, 100, 200, 2)
// 替换为
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
// 过时的
nativeImage.toPng()
// 替换为
nativeImage.toPNG()

// 过时的
nativeImage.toJpeg()
// 替换为
nativeImage.toJPEG()

// 过时的
nativeImage.createFromBuffer(buffer, 1.0)
// 替换为
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// 过时的
process.versions['atom-shell']
// 替换为
process.versions.electron
```

* ` process.versions.electron ` 和 ` process.version.chrome ` 将成为只读属性, 以便与其他 ` process.versions ` 属性由Node设置。

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
// 过时的
webContents.openDevTools({detach: true})
// 替换为
webContents.openDevTools({mode: 'detach'})
```

```js
// 过时的
webContents.setZoomLevelLimits(1, 2)
// 替换为
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// 过时的
webFrame.setZoomLevelLimits(1, 2)
// 替换为
webFrame.setVisualZoomLevelLimits(1, 2)

// 过时的
webFrame.registerURLSchemeAsSecure('app')
// 替换为
protocol.registerStandardSchemes(['app'], {secure: true})

// 过时的
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// 替换为
protocol.registerStandardSchemes(['app'], {secure: true})
```

## `<webview>`

```js
// 过时的
webview.setZoomLevelLimits(1, 2)
// 替换为
webview.setVisualZoomLevelLimits(1, 2)
```

## Node Headers URL

这是在构建原生 node 模块时在 `.npmrc` 文件中指定为 `disturl` 的 url 或是 `--dist-url` 命令行标志.

过时的: https://atom.io/download/atom-shell

替换为: https://atom.io/download/electron

## 重复的 ARM 资源

每个 Electron 版本包含两个相同的 ARM 版本, 但是文件名略有不同, 比如 `electron-v1.7.3-linux-arm.zip` 和 `electron-v1.7.3-linux-armv7l.zip`. 带有 `v7l` 前缀的资源被添加 以向用户阐明其支持的 ARM 版本, 并且将其从将来可能产生的 armv6l 和 arm64 资源中消除.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

更多详情, 参考 [6986](https://github.com/electron/electron/pull/6986) 和 [7189](https://github.com/electron/electron/pull/7189).

## `FIXME` 注释

代码注释中使用 `FIXME` 字符串 来表示 2.0 版本 应该解决的问题. 参考 https://github.com/electron/electron/search?q=fixme