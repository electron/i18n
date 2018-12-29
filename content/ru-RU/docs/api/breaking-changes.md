# API Contract

Критические изменения будут описаны здесь, а также будут добавлены предупреждения об устаревших функциях в код JS, где это возможно, нужна, по крайней мере, [одна мажорная версия](../tutorial/electron-versioning.md#semver) перед тем, как изменения будут сделаны.

# Комментарии `FIXME`

Строка `FIXME` используется в комментариях к коду для обозначения вещей, которые должны быть исправлены в будущих релизах. Смотрите https://github.com/electron/electron/search?q=fixme

# Запланированные критические изменения API (5.0)

## `new BrowserWindow({ webPreferences })`

Следующие значения по умолчанию для параметра `webPreferences` устарели в пользу новых значений по умолчанию, перечисленных ниже.

| Свойство           | Устаревшее                                      | Новое   |
| ------------------ | ----------------------------------------------- | ------- |
| `contextIsolation` | `false`                                         | `true`  |
| `nodeIntegration`  | `true`                                          | `false` |
| `webviewTag`       | `nodeIntegration` если установлено иначе `true` | `false` |

## `nativeWindowOpen`

В дочерних окнах открытых с параметром `nativeWindowOpen` интеграция с Node.js всегда будет отключена.

## `webContents.findInPage(text[, options])`

`wordStart` и `medialCapitalAsWordStart` парметры были удалены.

# Запланированные критические изменения API (4.0)

Данный список включает в себя критические изменения в API, запланированные для Electron 4.0.

## `app.makeSingleInstance`

```js
// Устарело
app.makeSingleInstance(function (argv, cwd) {

})
// Заменить на
app.requestSingleInstanceLock()
app.on('second-instance', function (event, argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Устарело
app.releaseSingleInstance()
// Заменить на
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Теперь ведет себя так же с `basic` в macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# Критические изменения API (3.0)

Данный список включает в себя критические изменения в API для Electron 3.0.

## `app`

```js
// Устарело
app.getAppMemoryInfo()
// Заменить на
app.getAppMetrics()

// Устарело
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // свойство устарело
```

## `BrowserWindow`

```js
// Устарело
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Заменить на
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Устарело
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // делаем что-нибудь
  }
})
// Заменить на
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // делаем что-нибудь
  }
})
```

## `clipboard`

```js
// Устарело
clipboard.readRtf()
// Заменить на
clipboard.readRTF()

// Устарело
clipboard.writeRtf()
// Заменить на
clipboard.writeRTF()

// Устарело
clipboard.readHtml()
// Заменить на
clipboard.readHTML()

// Устарело
clipboard.writeHtml()
// Заменить на
clipboard.writeHTML()
```

## `crashReporter`

```js
// Устарело
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Заменить на
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `nativeImage`

```js
// Устарело
nativeImage.createFromBuffer(buffer, 1.0)
// Заменить на
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `process`

```js
// Устарело
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// Устарело
screen.getMenuBarHeight()
// Заменить на
screen.getPrimaryDisplay().workArea
```

## `session`

```js
// Устарело
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Заменить на
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

```js
// Устарело
tray.setHighlightMode(true)
// Заменить на
tray.setHighlightMode('on')

// Устарело
tray.setHighlightMode(false)
// Заменить на
tray.setHighlightMode('off')
```

## `webContents`

```js
// Устарело
webContents.openDevTools({ detach: true })
// Заменить на
webContents.openDevTools({ mode: 'detach' })

// Удалено
webContents.setSize(options)
// Нет замены для этого API
```

## `webFrame`

```js
// Устарело
webFrame.registerURLSchemeAsSecure('app')
// Заменить на
protocol.registerStandardSchemes(['app'], { secure: true })

// Устарело
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Заменить на
protocol.registerStandardSchemes(['app'], { secure: true })
```

## `<webview>`

```js
// Удалено
webview.setAttribute('disableguestresize', '')
// Нет замены для этого API

// Удалено
webview.setAttribute('guestinstance', instanceId)
// Нет замены для этого API

// Слушатели клавиатуры больше не работают в webview теге
webview.onkeydown&nbsp;= () => { /* обработчик */ }
webview.onkeyup&nbsp;= () => { /* обработчик */ }
```

## Node Headers URL

Это URL, указанный как `disturl` в файле `.npmrc` или как `--dist-url` флаг командной строки при сборке собственных модулей Node.

Устарело: https://atom.io/download/atom-shell

Заменить на: https://atom.io/download/electron

# Критические изменения API (2.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 2.0.

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

## `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

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
// Removed
webview.setZoomLevelLimits(1, 2)
// Replaced with
webview.setVisualZoomLevelLimits(1, 2)
```

## Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).