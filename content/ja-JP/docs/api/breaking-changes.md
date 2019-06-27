# 破壊的変更

破壊的な変更は変更の [一つ前のメジャーバージョン](../tutorial/electron-versioning.md#semver) についてここに文書化され、可能であれば非推奨の警告を JS コードに加えます。

# `FIXME` コメント

`FIXME` 文字列は将来のリリースで修正されるべきであることを意味するコードのコメントに用いられます。 （参照： https://github.com/electron/electron/search?q=fixme ）

# 予定されている破壊的なAPIの変更 (6.0)

## `win.setMenu(null)`

```js
// 非推奨
win.setMenu(null)
// こちらに置換
win.removeMenu()
```

## レンダラープロセスの `electron.screen`

```js
// 非推奨
require('electron').screen
// こちらに置換
require('electron').remote.screen
```

## サンドボックス化したレンダラーの `require`

```js
// 非推奨
require('child_process')
// こちらに置換
require('electron').remote.require('child_process')

// 非推奨
require('fs')
// こちらに置換
require('electron').remote.require('fs')

// 非推奨
require('os')
// こちらに置換
require('electron').remote.require('os')

// 非推奨
require('path')
// こちらに置換
require('electron').remote.require('path')
```

# 予定されている破壊的なAPIの変更 (5.0)

## `new BrowserWindow({ webPreferences })`

以下の `webPreferences` オプションの初期値は、以下の記載された新しい初期値のために非推奨になっています。

| 属性                 | 非推奨の初期値                           | 新しい初期値  |
| ------------------ | --------------------------------- | ------- |
| `contextIsolation` | `false`                           | `true`  |
| `nodeIntegration`  | `true`                            | `false` |
| `webviewTag`       | `nodeIntegration` を設定しなければ `true` | `false` |

webviewTag を再び有効にする例

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

`nativeWindowOpen` オプションで開かれる子ウインドウは Node.js integration が無効化されます。

## 特権スキームレジストレーション

レンダラプロセス API `webFrame.setRegisterURLSchemeAsPrivileged` および `webFrame.registerURLSchemeAsBypassingCSP`、ならびにブラウザプロセス API `protocol.registerStandardSchemes` は削除されました。 新しい API、`protocol.registerSchemesAsPrivileged` が追加されました。これは、必要な権限でカスタムスキームを登録するために使用する必要があります。 カスタムスキームは、app の ready より前に登録する必要があります。

## webFrame Isolated World API

```js
// 非推奨
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// こちらに置換
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

# 予定されている破壊的なAPIの変更 (4.0)

以下のリストには Electron 4.0 でなされた破壊的な API の変更が含まれています。

## `app.makeSingleInstance`

```js
// 非推奨
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// こちらに置換
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

## `app.releaseSingleInstance`

```js
// 非推奨
app.releaseSingleInstance()
// こちらに置換
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// macOS 上では `basic` と同様に振る舞う
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

Windows 向けにネイティブモジュールをビルドするとき、モジュールの `binding.gyp` 内の `win_delay_load_hook` 変数は true (これが初期値) にならなければいけません。 If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# 破壊的な API の変更 (3.0)

The following list includes the breaking API changes in Electron 3.0.

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

## `clipboard
`

```js
// Deprecated
clipboard.readRtf()
// Replace with
clipboard.readRTF()

// Deprecated
clipboard.writeRtf()
// Replace with
clipboard.writeRTF()

// Deprecated
clipboard.readHtml()
// Replace with
clipboard.readHTML()

// Deprecated
clipboard.writeHtml()
// Replace with
clipboard.writeHTML()
```

## `crashReporter`

```js
// Deprecated
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Replace with
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `nativeImage`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `プロセス`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

## `session`

```js
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

## `Tray`

```js
// Deprecated
tray.setHighlightMode(true)
// Replace with
tray.setHighlightMode('on')

// Deprecated
tray.setHighlightMode(false)
// Replace with
tray.setHighlightMode('off')
```

## `webContents`

```js
// Deprecated
webContents.openDevTools({ detach: true })
// Replace with
webContents.openDevTools({ mode: 'detach' })

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })
```

## `<webview>`

```js
// Removed
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Removed
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Keyboard listeners no longer work on webview tag
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

# 破壊的な API の変更 (2.0)

The following list includes the breaking API changes made in Electron 2.0.

## `BrowserWindow`

```js
// Deprecated
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Replace with
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

```js
// Removed
nativeImage.toPng()
// Replaced with
nativeImage.toPNG()

// Removed
nativeImage.toJpeg()
// Replaced with
nativeImage.toJPEG()
```

## `プロセス`

* `process.versions.electron` と `process.version.chrome` は、Node によって定められた他の `process.versions` プロパティと一貫性を持つために読み取り専用プロパティになりました。

## `webContents`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Removed
webFrame.setZoomLevelLimits(1, 2)
// Replaced with
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// 削除されました
webview.setZoomLevelLimits(1, 2)
// こちらに置換
webview.setVisualZoomLevelLimits(1, 2)
```

## 重複する ARM アセット

どの Electron リリースにも、`electron-v1.7.3-linux-arm.zip` や `electron-v1.7.3-linux-armv7l.zip` のような少しファイル名が異なる 2 つの同様な ARM ビルドが含まれます。 サポートされている ARM バージョンをユーザに明確にし、将来作成される armv6l および arm64 アセットらと明確にするために、`v7l` という接頭子を持つアセットが追加されました。

*接頭子が付いていない* ファイルは、まだそれを使用している可能性がある設定を破壊しないようにするために公開されています。 2.0 からは、接頭子のないファイルは公開されなくなりました。

詳細は、[6986](https://github.com/electron/electron/pull/6986) と [7189](https://github.com/electron/electron/pull/7189) を参照してください。