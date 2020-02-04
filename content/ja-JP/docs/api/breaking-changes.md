# 破壊的変更

破壊的な変更は変更の [一つ前のメジャーバージョン](../tutorial/electron-versioning.md#semver) についてここに文書化され、可能であれば非推奨の警告を JS コードに加えます。

## `FIXME` コメント

`FIXME` 文字列は将来のリリースで修正されるべきであることを意味するコードのコメントに用いられます。 （参照： https://github.com/electron/electron/search?q=fixme ）

## 予定されている破壊的なAPIの変更 (8.0)

### IPC を介して送信される値が構造化複製アルゴリズムでシリアライズされるように

IPC を介して (`ipcRenderer.send`、`ipcRenderer.sendSync`、`WebContents.send` 及び関連メソッドから) オブジェクトを送信できます。このオブジェクトのシリアライズに使用されるアルゴリズムが、カスタムアルゴリズムから V8 組み込みの [構造化複製アルゴリズム](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) に切り替わります。これは `postMessage` のメッセージのシリアライズに使用されるものと同じアルゴリズムです。 これにより、大きなメッセージに対するパフォーマンスが 2 倍向上しますが、動作に重大な変更が加えられます。

* 関数、Promise、WeakMap、WeakSet、これらの値を含むオブジェクトを IPC 経由で送信すると、関数らを暗黙的に `undefined` に変換していましたが、代わりに例外が送出されるようになります。

```js
// 以前:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => メインプロセスに { value: 3 } が着く

// Electron 8 から:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => Error("() => {} could not be cloned.") を投げる
```

* `NaN`、`Infinity`、`-Infinity` は、`null` に変換するのではなく、正しくシリアライズします。
* 循環参照を含むオブジェクトは、`null` に変換するのではなく、正しくシリアライズします。
* `Set`、`Map`、`Error`、`RegExp` の値は、`{}` に変換するのではなく、正しくシリアライズします。
* `BigInt` の値は、`null` に変換するのではなく、正しくシリアライズします。
* 疎配列は、`null` の密配列に変換するのではなく、そのままシリアライズします。
* `Date` オブジェクトは、ISO 文字列表現に変換するのではなく、`Date` オブジェクトとして転送します。
* 型付き配列 (`Uint8Array`、`Uint16Array`、`Uint32Array` など) は、Node.js の `Buffer` に変換するのではなく、そのまま転送します。
* Node.js の `Buffer` オブジェクトは、`Uint8Array` として転送します。 基底となる `ArrayBuffer` をラップすることで、`Uint8Array` を Node.js の `Buffer` に変換できます。

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

ネイティブな JS 型ではないオブジェクト、すなわち DOM オブジェクト (`Element`、`Location`、`DOMMatrix` など)、Node.js オブジェクト (`process.env`、`Stream` のいくつかのメンバーなど)、Electron オブジェクト (`WebContents`、`BrowserWindow`、`WebFrame` など) のようなものは非推奨です。 Electron 8 では、これらのオブジェクトは DeprecationWarning メッセージで以前と同様にシリアライズされます。しかし、Electron 9 以降でこういった類のオブジェクトを送信すると "could not be cloned" エラーが送出されます。

### `<webview>.getWebContents()`

この API は、パフォーマンスとセキュリティの両方に影響する `remote` モジュールを使用して実装されます。 したがって、その用途がはっきりとしている必要があります。

```js
// 非推奨
webview.getWebContents()
// こちらに置換
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

ただし、`remote` モジュールをできる限り使用しないことを推奨します。

```js
// main
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = function (webContentsId, contents) {
  const guest = webContents.fromId(webContentsId)
  if (!guest) {
    throw new Error(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest.hostWebContents !== contents) {
    throw new Error(`Access denied to webContents`)
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

### `webFrame.setLayoutZoomLevelLimits()`

Chromium は、レイアウトのズームレベル制限を変更するサポートを削除しました。そのうえ、これは Elcetron でメンテナンスできるものではありません。 この関数は、Electron 8.x では警告を発し、Electron 9.x では存在しなくなります。レイアウトのズームレベル制限は、[こちら](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11) で定義されているように、最小 0.25 から最大 5.0 に固定されました。

## 予定されている破壊的なAPIの変更 (7.0)

### Node Headers URL

これは `.npmrc` ファイル内の `disturl` か、ネイティブ Node モジュールをビルドするときの `--dist-url` コマンドライン引数で指定する URL です。 両方とも近い将来サポートされますが、切り替えることを推奨します。

非推奨: https://atom.io/download/electron

こちらに置換: https://electronjs.org/headers

### `session.clearAuthCache(options)`

`session.clearAuthCache` API は、消去対象のオプションを受け入れなくなり、代わりにキャッシュ全体を無条件に消去します。

```js
// 非推奨
session.clearAuthCache({ type: 'password' })
// こちらに置換
session.clearAuthCache()
```

### `powerMonitor.querySystemIdleState`

```js
// Electron 7.0 で削除
powerMonitor.querySystemIdleState(threshold, callback)
// こちらの非同期 API に置換
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Electron 7.0 で削除
powerMonitor.querySystemIdleTime(callback)
// こちらの非同期 API に置換
const idleTime = getSystemIdleTime()
```

### webFrame Isolated World APIs

```js
// Electron 7.0 で削除
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

### 非推奨だった getBlinkMemoryInfo の `marked` プロパティの削除

このプロパティは Chromium 77 で削除されたため、利用できなくなりました。

### `<input type="file"/>` の `webkitdirectory` 属性

￼ The `webkitdirectory` property on HTML file inputs allows them to select folders. 以前の Electron のバージョンでは、input の `event.target.files` において、選択したフォルダーに対応する 1 つの `File` が入った `FileList` を返すという誤った実装がありました。 ￼ As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)). ￼ As an illustration, take a folder with this structure:

```console
folder
├── file1
├── file2
└── file3
```

￼ In Electron <=6, this would return a `FileList` with a `File` object for:

```console
path/to/folder
```

￼ In Electron 7, this now returns a `FileList` with a `File` object for:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

￼ Note that `webkitdirectory` no longer exposes the path to the selected folder. フォルダーの内容ではなく選択したフォルダーへのパスが必要な場合は、`dialog.showOpenDialog` API ([リンク](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)) を参照してください。

## 予定されている破壊的なAPIの変更 (6.0)

### `win.setMenu(null)`

```js
// 非推奨
win.setMenu(null)
// こちらに置換
win.removeMenu()
```

### `contentTracing.getTraceBufferUsage()`

```js
// 非推奨
contentTracing.getTraceBufferUsage((percentage, value) => {
  // なにかする
})
// こちらに置換
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject に percentage と value のフィールドがあります
})
```

### レンダラープロセスの `electron.screen`

```js
// 非推奨
require('electron').screen
// こちらに置換
require('electron').remote.screen
```

### サンドボックス化したレンダラーの `require`

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

### `powerMonitor.querySystemIdleState`

```js
// 非推奨
powerMonitor.querySystemIdleState(threshold, callback)
// こちらの非同期 API に置換
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// 非推奨
powerMonitor.querySystemIdleTime(callback)
// こちらの非同期 API に置換
const idleTime = getSystemIdleTime()
```

### `app.enableMixedSandbox`

```js
// 非推奨
app.enableMixedSandbox()
```

混合サンドボックスモードはデフォルトで有効になりました。

### `Tray`

macOS Catalina 下では、以前の Tray 実装は破壊されています。 Apple のネイティブの代替実装は、強調表示動作の変更をサポートしていません。

```js
// 非推奨
tray.setHighlightMode(mode)
// API は v7.0 で削除され、置換はできません
```

## 予定されている破壊的なAPIの変更 (5.0)

### `new BrowserWindow({ webPreferences })`

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

`nativeWindowOpen` オプションで開かれる子ウインドウは、`nodeIntegrationInSubFrames` が true でなければ Node.js integration が無効化されます。

### 特権スキームレジストレーション

レンダラプロセス API `webFrame.setRegisterURLSchemeAsPrivileged` および `webFrame.registerURLSchemeAsBypassingCSP`、ならびにブラウザプロセス API `protocol.registerStandardSchemes` は削除されました 新しい API `protocol.registerSchemesAsPrivileged` が追加されました。これらは、必要な権限でカスタムスキームを登録するために使用する必要があります。 カスタムスキームは、アプリの準備が整う前に登録する必要があります。

### webFrame Isolated World APIs

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

## `webFrame.setSpellCheckProvider`

`spellCheck` コールバックは非同期になり、`autoCorrectWord` パラメーターは削除されました。

```js
// 非推奨
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// こちらに置換
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## 予定されている破壊的なAPIの変更 (4.0)

以下のリストには Electron 4.0 でなされた破壊的な API の変更が含まれています。

### `app.makeSingleInstance`

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

### `app.releaseSingleInstance`

```js
// 非推奨
app.releaseSingleInstance()
// こちらに置換
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// macOS 上では `basic` と同様に振る舞う
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

Windows でネイティブモジュールをビルドするとき、モジュールの `binding.gyp` 内の `win_delay_load_hook` 変数は true (これが初期値) にならなければいけません。 このフックが存在しない場合ネイティブモジュールは Windows 上でロードできず、`モジュールが見つかりません` のようなエラーメッセージが表示されます。 より詳しくは [ネイティブモジュールガイド](/docs/tutorial/using-native-node-modules.md) を参照してください。

## 破壊的な API の変更 (3.0)

以下のリストには Electron 3.0 での破壊的な API の変更が含まれています。

### `app`

```js
// 非推奨
app.getAppMemoryInfo()
// こちらに置換
app.getAppMetrics()

// 非推奨
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // 非推奨なプロパティ
```

### `BrowserWindow`

```js
// 非推奨
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// こちらに置換
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// 非推奨
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // なにかする
  }
})
// こちらに置換
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // なにかする
  }
})
```

### `clipboard
`

```js
// 非推奨
clipboard.readRtf()
// こちらに置換
clipboard.readRTF()

// 非推奨
clipboard.writeRtf()
// こちらに置換
clipboard.writeRTF()

// 非推奨
clipboard.readHtml()
// こちらに置換
clipboard.readHTML()

// 非推奨
clipboard.writeHtml()
// こちらに置換
clipboard.writeHTML()
```

### `crashReporter`

```js
// 非推奨
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// こちらに置換
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// 非推奨
nativeImage.createFromBuffer(buffer, 1.0)
// こちらに置換
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `プロセス`

```js
// 非推奨
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// 非推奨
screen.getMenuBarHeight()
// こちらに置換
screen.getPrimaryDisplay().workArea
```

### `session`

```js
// 非推奨
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// こちらに置換
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

### `Tray`

```js
// 非推奨
tray.setHighlightMode(true)
// こちらに置換
tray.setHighlightMode('on')

// 非推奨
tray.setHighlightMode(false)
// こちらに置換
tray.setHighlightMode('off')
```

### `webContents`

```js
// 非推奨
webContents.openDevTools({ detach: true })
// こちらに置換
webContents.openDevTools({ mode: 'detach' })

// 削除されました
webContents.setSize(options)
// この API は置換できません
```

### `webFrame`

```js
// 非推奨
webFrame.registerURLSchemeAsSecure('app')
// こちらに置換
protocol.registerStandardSchemes(['app'], { secure: true })

// 非推奨
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// こちらに置換
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// 削除されました
webview.setAttribute('disableguestresize', '')
// この API は置換できません

// 削除されました
webview.setAttribute('guestinstance', instanceId)
// この API は置換できません

// webview タグ上ではキーボードリスナは動作しなくなります
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

これは `.npmrc` ファイル内の `disturl` か、ネイティブ Node モジュールをビルドするときの `--dist-url` コマンドライン引数で指定する URL です。

非推奨: https://atom.io/download/atom-shell

こちらに置換: https://atom.io/download/electron

## 破壊的な API の変更 (2.0)

以下のリストには Electron 2.0 でなされた破壊的な API の変更が含まれています。

### `BrowserWindow`

```js
// 非推奨
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// こちらに置換
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// 削除されました
menu.popup(browserWindow, 100, 200, 2)
// こちらに置換
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// 削除されました
nativeImage.toPng()
// こちらに置換
nativeImage.toPNG()

// 削除されました
nativeImage.toJpeg()
// こちらに置換
nativeImage.toJPEG()
```

### `プロセス`

* `process.versions.electron` と `process.version.chrome` は、Node によって定められた他の `process.versions` プロパティと一貫性を持つために読み取り専用プロパティになりました。

### `webContents`

```js
// 削除されました
webContents.setZoomLevelLimits(1, 2)
// こちらに置換
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// 削除されました
webFrame.setZoomLevelLimits(1, 2)
// こちらに置換
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// 削除されました
webview.setZoomLevelLimits(1, 2)
// こちらに置換
webview.setVisualZoomLevelLimits(1, 2)
```

### 重複する ARM アセット

どの Electron リリースにも、`electron-v1.7.3-linux-arm.zip` や `electron-v1.7.3-linux-armv7l.zip` のような少しファイル名が異なる2つの同一な ARM ビルドが含まれます。 サポートされている ARM バージョンをユーザに明確にし、将来作成される armv6l および arm64 アセットらと明確にするために、`v7l` という接頭子を持つアセットが追加されました。

*接頭子が付いていない*ファイルは、まだそれを使用している可能性がある設定を破壊しないようにするために公開されています。 2.0 からは、接頭子のないファイルは公開されなくなりました。

詳細は、[6986](https://github.com/electron/electron/pull/6986) と [7189](https://github.com/electron/electron/pull/7189) を参照してください。