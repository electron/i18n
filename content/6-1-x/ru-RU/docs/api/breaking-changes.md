# Критические изменения

Здесь будут описаны критические изменения, а также будут добавлены предупреждения об устаревших функциях в JS коде, где это возможно, по крайней мере перед тем, как изменения будут сделаны в [одной мажорной версии](../tutorial/electron-versioning.md#semver).

# Комментарии `FIXME`

Строка `FIXME` используется в комментариях к коду для обозначения вещей, которые должны быть исправлены в будущих релизах. Смотрите https://github.com/electron/electron/search?q=fixme

# Запланированные критические изменения API (7.0)

## `shell.openExternalSync(url[, options])`

```js
// Устарело
shell.openExternalSync(url)
// Заменено на
async function openThing (url) {
  await shell.openExternal(url)
}
```

# Запланированные критические изменения API (6.0)

## `win.setMenu(null)`

```js
// Устарело
win.setMenu(null)
// Заменено на
win.removeMenu()
```

## `contentTracing.getTraceBufferUsage()`

```js
// Устарело
contentTracing.getTraceBufferUsage((percentage, value) => {
  // сделать что-нибудь
})
// Заменено на
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject имеет поля percentage и value
})
```

## `electron.screen` в графическом процессе

```js
// Устарело
require('electron').screen
// Заменено на
require('electron').remote.screen
```

## `require` в песочнице графических процессов

```js
// Устарело
require('child_process')
// Заменено на
require('electron').remote.require('child_process')

// Устарело
require('fs')
// Заменено на
require('electron').remote.require('fs')

// Устарело
require('os')
// Заменено на
require('electron').remote.require('os')

// Устарело
require('path')
// Заменено на
require('electron').remote.require('path')
```

## `powerMonitor.querySystemIdleState`

```js
// Устарело
powerMonitor.querySystemIdleState(threshold, callback)
// Заменено на синхронный метод
const idleState = getSystemIdleState(threshold)
```

## `powerMonitor.querySystemIdleTime`

```js
// Устарело
powerMonitor.querySystemIdleTime(callback)
// Заменено на синхронный метод
const idleTime = getSystemIdleTime()
```

## `Tray`

Под macOS Catalina наша прежняя реализация Tray нарушена. Нативная замена Apple не поддерживает изменение поведения подсветки.

```js
// Устарело
tray.setHighlightMode(mode)
// Метод будет удален в v7.0 без альтернатив.
```

# Запланированные критические изменения API (5.0)

## `new BrowserWindow({ webPreferences })`

Следующие значения по умолчанию для параметра `webPreferences` устарели в пользу новых значений по умолчанию, перечисленных ниже.

| Свойство           | Устаревшее                                        | Новое   |
| ------------------ | ------------------------------------------------- | ------- |
| `contextIsolation` | `false`                                           | `true`  |
| `nodeIntegration`  | `true`                                            | `false` |
| `webviewTag`       | `nodeIntegration`, если установлено, иначе `true` | `false` |

Например, повторное включение webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### `nativeWindowOpen`

У дочерних окон, открытых с опцией `nativeWindowOpen`, всегда будет отключена интеграция Node.JS, если `nodeIntegrationInSubFrames` не true.

## Регистрация привилегированных схем

API графического процесса `webFrame.setRegisterURLSchemeAsPrivileged` и `webFrame.registerURLSchemeAsBypassingCSP`, а также API процесса браузера `protocol.registerStandardSchemes` были удалены. Новый API `protocol.registerSchemesAsPrivileged` был добавлен и должен использоваться для регистрации пользовательских схем с необходимыми привилегиями. Пользовательские схемы должны быть зарегистрированы до готовности приложения.

## API webFrame изолированных миров

```js
// Устарело
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Заменено на
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

# Запланированные критические изменения API (4.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 4.0.

## `app.makeSingleInstance`

```js
// Устарело
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Заменено на
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

## `app.releaseSingleInstance`

```js
// Устарело
app.releaseSingleInstance()
// Заменено на
app.releaseSingleInstanceLock()
```

## `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Теперь ведет себя так же с `basic` в macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

При создании нативных модулей для Windows, переменная `win_delay_load_hook` в `binding.gyp` модуля должна быть true (это значение по умолчанию). Если этот хук отсутствует, то нативный модуль на Windows неудачно загрузится, с сообщением об ошибке, например `Cannot find module`. См. [руководство по нативным модулям](/docs/tutorial/using-native-node-modules.md) для информации.

# Критические изменения API (3.0)

Данный список включает в себя критические изменения в API для Electron 3.0.

## `app`

```js
// Устарело
app.getAppMemoryInfo()
// Заменено на
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
// Заменено на
let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
let windowB = new BrowserWindow(optionsB)

// Устарело
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // сделать что-нибудь
  }
})
// Заменено на
window.on('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // сделать что-нибудь
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
// Заменено на
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
// Заменено на
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
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Заменено на
ses.setCertificateVerifyProc((request, callback) => {
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
// Заменено на
webContents.openDevTools({ mode: 'detach' })

// Удалено
webContents.setSize(options)
// Нет замены для этого метода
```

## `webFrame`

```js
// Устарело
webFrame.registerURLSchemeAsSecure('app')
// Заменено на
protocol.registerStandardSchemes(['app'], { secure: true })

// Устарело
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Заменено на
protocol.registerStandardSchemes(['app'], { secure: true })
```

## `<webview>`

```js
// Удалено
webview.setAttribute('disableguestresize', '')
// Нет замены для этого метода

// Удалено
webview.setAttribute('guestinstance', instanceId)
// Нет замены для этого метода

// Слушатели клавиатуры больше не работают в webview теге
webview.onkeydown&nbsp;= () => { /* обработчик */ }
webview.onkeyup&nbsp;= () => { /* обработчик */ }
```

## URL заголовков Node

Это URL, указанный как `disturl` в файле `.npmrc` или как `--dist-url` флаг командной строки, при сборке нативных модулей Node.

Устарело: https://atom.io/download/atom-shell

Заменено на: https://atom.io/download/electron


# Критические изменения API (2.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 2.0.

## `BrowserWindow`

```js
// Устарело
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Заменено на
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Удалено
menu.popup(browserWindow, 100, 200, 2)
// Заменено на
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

```js
// Удалено
nativeImage.toPng()
// Заменено на
nativeImage.toPNG()

// Удалено
nativeImage.toJpeg()
// Заменено на
nativeImage.toJPEG()
```

## `process`

* `process.versions.electron` и `process.version.chrome` будут доступны только для чтения, для согласованности с другими свойствами `process.versions`, установленными в Node.

## `webContents`

```js
// Удалено
webContents.setZoomLevelLimits(1, 2)
// Заменить на
webContents.setVisualZoomLevelLimits(1, 2)
```

## `webFrame`

```js
// Удалено
webFrame.setZoomLevelLimits(1, 2)
// Заменено на
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Удалено
webview.setZoomLevelLimits(1, 2)
// Заменено на
webview.setVisualZoomLevelLimits(1, 2)
```

## Дублированные ARM ресурсы

Каждый выпуск Electron включает в себя две идентичные сборки ARM с немного разными именами файлов, такие как `electron-v1.7.3-linux-arm.zip` и `electron-v1.7.3-linux-armv7l.zip`. Ресурс с префиксом `v7l` был добавлен, чтобы уточнить для пользователей, какую версию ARM он поддерживает, и чтобы исключить их в будущих ресурсах armv6l и arm64, которые могут быть произведены.

Файл _без префикса_ по-прежнему публикуется, чтобы избежать нарушения любых настроек, которые могут его использовать. Начиная с версии 2.0, файл без префикса более не будет публиковаться.

Для подробностей см. [6986](https://github.com/electron/electron/pull/6986) и [7189](https://github.com/electron/electron/pull/7189).
