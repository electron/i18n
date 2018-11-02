# Угода API

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](../tutorial/electron-versioning.md#semver) до змін.

# Коментарі `FIXME`

Стрічки `FIXME` використовуються в коментарях коду для маркування речей, які мають бути виправлені для майбутній релізів. Дивіться https://github.com/electron/electron/search?q=fixme

# Заплановані Зміни API (4.0)

Даний список містить заплановані API зміни для Electron 4.0.

## `app.makeSingleInstance`

```js
// Припиняється підтримка
app.makeSingleInstance(function (argv, cwd) {

})
// Замінити на
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Припиняється підтримка
app.releaseSingleInstance()
// Замінити на
app.releaseSingleInstanceLock()
```

# Зміни API (3.0)

Даний список містить API зміни для Electron 3.0.

## `app`

```js
// Припиняється підтримка
app.getAppMemoryInfo()
// Замінити на
app.getAppMetrics()

// Припиняється підтримка
const metrics = app.getAppMetrics()
const {memory} = metrics[0]
memory.privateBytes  // припиняється підтримка властивості
memory.sharedBytes  // припиняється підтримка властивості
```

## `BrowserWindow`

```js
// Припиняється підтримка
let optionsA = {webPreferences: {blinkFeatures: ''}}
let windowA = new BrowserWindow(optionsA)
// Замінити на
let optionsB = {webPreferences: {enableBlinkFeatures: ''}}
let windowB = new BrowserWindow(optionsB)

// Припиняється підтримка
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // зробити щось
  }
})
// Замінити на
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // зробити щось
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
// Припиняється підтримка
const info = process.getProcessMemoryInfo()
const privateBytes = info.privateBytes // припиняється підтримка властивості
const sharedBytes = info.sharedBytes // припиняється підтримка властивості
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
webContents.openDevTools({detach: true})
// Замінити на
webContents.openDevTools({mode: 'detach'})

// Видалено
webContents.setSize(options)
// Для цього API заміни немає
```

## `webFrame`

```js
// Припиняється підтримка
webFrame.registerURLSchemeAsSecure('app')
// Замінити на
protocol.registerStandardSchemes(['app'], {secure: true})

// Припиняється підтримка
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Замінити на
protocol.registerStandardSchemes(['app'], {secure: true})
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
let optionsA = {titleBarStyle: 'hidden-inset'}
let windowA = new BrowserWindow(optionsA)
// Замінити на
let optionsB = {titleBarStyle: 'hiddenInset'}
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Видалено
menu.popup(browserWindow, 100, 200, 2)
// Замінити на
menu.popup(browserWindow, {x: 100, y: 200, positioningItem: 2})
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

## `process`

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

The file *without the prefix* is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

Детальніше дивіться [6986](https://github.com/electron/electron/pull/6986) та [7189](https://github.com/electron/electron/pull/7189).