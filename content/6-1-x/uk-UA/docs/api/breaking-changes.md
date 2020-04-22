# Важливі Зміни

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](../tutorial/electron-versioning.md#semver) до змін.

# Коментарі `FIXME`

Стрічки `FIXME` використовуються в коментарях коду для маркування речей, які мають бути виправлені для майбутній релізів. Дивіться https://github.com/electron/electron/search?q=fixme

# Заплановані Зміни API (7.0)

## `shell.openExternalSync(url[, options])`

```js
// Не підтримується
shell.openExternalSync(url)
// Замініть на
async function openThing (url) {
  await shell.openExternal(url)
}
```

# Заплановані Зміни API (6.0)

## `win.setMenu(null)`

```js
// Не підтримується
win.setMenu(null)
// Замініть на
win.removeMenu()
```

## `contentTracing.getTraceBufferUsage()`

```js
// Не пітримується
contentTracing.getTraceBufferUsage((percentage, value) => {
  // зробити щось
})
// Замініть на
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject має відсоток і поля значень
})
```

## `electron.screen` в процесі рендеру

```js
// Не підтримується
require('electron').screen
// замініть на
require('electron').remote.screen
```

## `require` в рендерензі пісочниці

```js
// Не підтримується
require('child_process')
// Замініть на
require('electron').remote.require('child_process')

// Не підтримується
require('fs')
// Замініть на
require('electron').remote.require('fs')

// Не підтримується
require('os')
// Замініть на
require('electron').remote.require('os')

// Не підтримується
require('path')
// Замініть на
require('electron').remote.require('path')
```

## `powerMonitor.querySystemIdleState`

```js
// Не підтримується
powerMonitor.querySystemIdleState(threshold, callback)
// Замініть на синхронний API
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
// Не підтримується
powerMonitor.querySystemIdleTime(callback)
// Замініть на синхронний API
const idleTime = getSystemIdleTime()
```

## `Tray`

На macOS Catalina наша колишня імплементація Tray ламається. Нативна заміна Apple не підтримує зміни поведінки підсвітки.

```js
// Не підтримується
tray.setHighlightMode(mode)
// API буде видалено у версії v7.0 без заміни.
```

# Заплановані Зміни API (5.0)

## `new BrowserWindow({ webPreferences })`

Припиняється підтримка наступних значень за замовчуванням опцій `webPreferences` на користь нових значень.

| Властивість        | Старе Значення                                    | Нове Значення |
| ------------------ | ------------------------------------------------- | ------------- |
| `contextIsolation` | `false`                                           | `true`        |
| `nodeIntegration`  | `true`                                            | `false`       |
| `webviewTag`       | `nodeIntegration` якщо встановлено, інакше `true` | `false`       |

Наприклад, повторне вмикання webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

Дочірнє вікно з опцією `nativeWindowOpen` завжди буде мати відімкнену інтеграцію з Node.js, хіба `nodeIntegrationInSubFrames` є `true.

## Реєстрація Привілейованих Схем

Були видалені API процесу рендерингу `webFrame.setRegisterURLSchemeAsPrivileged` і `webFrame.registerURLSchemeAsBypassingCSP` так само як API процесу браузера `protocol.registerStandardSchemes`. Новий API, `protocol.registerSchemesAsPrivileged` були додані і мають використовуватися для реєстрації користувацьких схем з необхідними привілегіями. Користувацькі схеми є обов'язковими для реєстрації перед готовністю застосунку.

## webFrame Isolated World APIs

```js
// Припиняється підтримка
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Замініть на
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

# Заплановані Зміни API (4.0)

Даний список містить API зміни зроблені для Electron 4.0.

## `app.makeSingleInstance`

```js
// Припиняється підтримка
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Замініть на
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
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
// Тепер поводиться як `basic` на macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

Коли пишуться нативні модулі для Windows, змінна `win_delay_load_hook` в `binding.gyp` модуля має бути true (значення за замовчуванням). Якщо цей хук не присутній, то нативний модуль не буде завантажуватися на Windows, з повідомленням про помилку вигляду `Cannot find module`. Дивіться [інструкцію про нативні модулі](/docs/tutorial/using-native-node-modules.md) для деталей.

# Зміни API (3.0)

Даний список містить API зміни для Electron 3.0.

## `app`

```js
// Припиняється підтримка
app.getAppMemoryInfo()
// Змініть на
app.getAppMetrics()

// Припиняється підтримка
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Припиняється підтримка властивості
```

## `BrowserWindow`

```js
// Припиняється підтримка
let optionsA = { webPreferences: { blinkFeatures: '' } }
let windowA = new BrowserWindow(optionsA)
// Замініть на
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Припиняється підтримка
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // зробити щось
  }
})
// Замініть на
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
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Замініть на
ses.setCertificateVerifyProc((request, callback) => {
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

Файл _без префікса_ все ще публікується, щоб уникнути поломки будь-яких налаштувань, які можуть використовувати їх. Починаючи з 2.0, файли без префікса перестануть публікуватися.

Детальніше дивіться [6986](https://github.com/electron/electron/pull/6986) та [7189](https://github.com/electron/electron/pull/7189).
