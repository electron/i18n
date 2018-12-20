# Угода API

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](../tutorial/electron-versioning.md#semver) до змін.

# Коментарі `FIXME`

Стрічки `FIXME` використовуються в коментарях коду для маркування речей, які мають бути виправлені для майбутній релізів. Дивіться https://github.com/electron/electron/search?q=fixme

# Заплановані Зміни API (5.0)

## `new BrowserWindow({ webPreferences })`

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

| Property           | Deprecated Default                   | New Default |
| ------------------ | ------------------------------------ | ----------- |
| `contextIsolation` | `false`                              | `true`      |
| `nodeIntegration`  | `true`                               | `false`     |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`     |

## `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled.

## `webContents.findInPage(text[, options])`

`wordStart` and `medialCapitalAsWordStart` options are removed.

# Заплановані Зміни API (4.0)

Даний список містить заплановані API зміни для Electron 4.0.

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
// Припиняється підтримка
app.releaseSingleInstance()
// Замінити на
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

# Зміни API (3.0)

Даний список містить API зміни для Electron 3.0.

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
// Припиняється підтримка
clipboard.readRtf()
// Замінити на
clipboard.readRTF()

// Припиняється підтримка
clipboard.writeRtf()
// Замінити на
clipboard.writeRTF()

// Припиняється підтримка
clipboard.readHtml()
// Замінити на
clipboard.readHTML()

// Припиняється підтримка
clipboard.writeHtml()
// Замінити на
clipboard.writeHTML()
```

## `crashReporter`

```js
// Припиняється підтримка
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Замінити на
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

## `nativeImage`

```js
// Припиняється підтримка
nativeImage.createFromBuffer(buffer, 1.0)
// Замінити
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

## `процес`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

## `screen`

```js
// Припиняється підтримка
screen.getMenuBarHeight()
// Замінити на
screen.getPrimaryDisplay().workArea
```

## `session`

```js
// Припиняється підтримка
ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
  callback(true)
})
// Замінити на
ses.setCertificateVerifyProc(function (request, callback) {
  callback(0)
})
```

## `Tray`

```js
// Припиняється підтримка
tray.setHighlightMode(true)
// Замінити на
tray.setHighlightMode('on')

// Припиняється підтримка
tray.setHighlightMode(false)
// Замінити на
tray.setHighlightMode('off')
```

## `webContents`

```js
// Припиняється підтримка
webContents.openDevTools({ detach: true })
// Замінити на
webContents.openDevTools({ mode: 'detach' })

// Видалено
webContents.setSize(options)
// Для цього API заміни немає
```

## `webFrame`

```js
// Припиняється підтримка
webFrame.registerURLSchemeAsSecure('app')
// Замінити на
protocol.registerStandardSchemes(['app'], { secure: true })

// Припиняється підтримка
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Замінити на
protocol.registerStandardSchemes(['app'], { secure: true })
```

## `<webview>`

```js
// Видалено
webview.setAttribute('disableguestresize', '')
// Для цього API заміни немає

// Видалено
webview.setAttribute('guestinstance', instanceId)
// TДля цього API заміни немає

// Слухачі клавіатури більше не працюють з тегом webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

## URL Node Заголовків

Це URL визначені як `disturl` в `.npmrc` файлі чи прапорець `--dist-url` командного рядку, коли будуються нативні модулі Node.

Припиняється підтримка: https://atom.io/download/atom-shell

Замінити на: https://atom.io/download/electron

# Зміни API (2.0)

Даний список містить API зміни зроблені для Electron 2.0.

## `BrowserWindow`

```js
// Припиняється підтримка
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Замінити на
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Видалено
menu.popup(browserWindow, 100, 200, 2)
// Замінити на
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

```js
// Видалено
nativeImage.toPng()
// Замінити на
nativeImage.toPNG()

// Видалено
nativeImage.toJpeg()
// Замінити на
nativeImage.toJPEG()
```

## `процес`

* `process.versions.electron` та `process.version.chrome` будуть зроблені властивостями тільки для читання для сумусності з іншими `process.versions` властивостями встановленими Node.

## `webContents`

```js
// Видалено
webContents.setZoomLevelLimits(1, 2)
// Замінити на
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Видалено
webFrame.setZoomLevelLimits(1, 2)
// Замінити на
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Видалено
webview.setZoomLevelLimits(1, 2)
// Замінити на
webview.setVisualZoomLevelLimits(1, 2)
```

## Дублікати ARM Файлів

Кожен реліз Electron містить дві ідентичні ARM збірки з трохи різними назвами файлів, наприклад `electron-v1.7.3-linux-arm.zip` та `electron-v1.7.3-linux-armv7l.zip`. Файли з префіксом `v7l` були додані для ясності яку версію ARM вони підтримують, та відрізнити їх від майбутніх armv6l та arm64 файлів, які можуть з'явитися.

Файл *без префікса* все ще публікується, щоб уникнути поломки будь-яких налаштувань, які можуть використовувати їх. Починаючи з 2.0, файли без префікса перестануть публікуватися.

Детальніше дивіться [6986](https://github.com/electron/electron/pull/6986) та [7189](https://github.com/electron/electron/pull/7189).