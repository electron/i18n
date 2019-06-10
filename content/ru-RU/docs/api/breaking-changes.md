# Breaking Chnages

Критические изменения будут описаны здесь, а также будут добавлены предупреждения об устаревших функциях в JS код, где это возможно, нужна, по крайней мере, [одна мажорная версия](../tutorial/electron-versioning.md#semver) перед тем, как изменения будут сделаны.

# Комментарии `FIXME`

Строка `FIXME` используется в комментариях к коду для обозначения вещей, которые должны быть исправлены в будущих релизах. Смотрите https://github.com/electron/electron/search?q=fixme

# Запланированные критические изменения API (6.0)

## `win.setMenu(null)`

```js
// Устаревшее
win.setMenu(null)
// Заменено на
win.removeMenu()
```

## `electron.screen` в графическом процессе

```js
// Устаревшее
require('electron').screen
// Заменено на
require('electron').remote.screen
```

## `require` в песочнице графических процессов

```js
// Устаревшее
require('child_process')
// Заменено на
require('electron').remote.require('child_process')

// Устаревшее
require('fs')
// Заменено на
require('electron').remote.require('fs')

// Устаревшее
require('os')
// Заменено на
require('electron').remote.require('os')

// Устаревшее
require('path')
// Заменено на
require('electron').remote.require('path')
```

# Запланированные критические изменения API (5.0)

## `new BrowserWindow({ webPreferences })`

Следующие значения по умолчанию для параметра `webPreferences` устарели в пользу новых значений по умолчанию, перечисленных ниже.

| Свойство           | Устаревшее                                        | Новое   |
| ------------------ | ------------------------------------------------- | ------- |
| `contextIsolation` | `false`                                           | `true`  |
| `nodeIntegration`  | `true`                                            | `false` |
| `webviewTag`       | `nodeIntegration`, если установлено, иначе `true` | `false` |

## `nativeWindowOpen`

В дочерних окнах открытых с параметром `nativeWindowOpen` интеграция с Node.js всегда будет отключена.

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
// Теперь ведет себя так же, как `basic` на macOS
app.getGPUInfo('basic')
```

## `win_delay_load_hook`

При создании нативных модулей для Windows переменная `win_delay_load_hook` в `binding.gyp` модуля должна быть true (это значение по умолчанию). Если этот хук отсутствует, то нативный модуль на Windows неудачно загрузится, с сообщением об ошибке, например `Cannot find module`. См. [руководство по нативным модулям](/docs/tutorial/using-native-node-modules.md) для получения дополнительной информации.

# Критические изменения API (3.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 3.0.

## `app`

```js
// Устарело
app.getAppMemoryInfo()
// Заменено на
app.getAppMetrics()

// Устарело
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Свойство устарело
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
    // делаем что-нибудь
  }
})
// Заменено на
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
// Заменено на
clipboard.readRTF()

// Устарело
clipboard.writeRtf()
// Заменено на
clipboard.writeRTF()

// Устарело
clipboard.readHtml()
// Заменено на
clipboard.readHTML()

// Устарело
clipboard.writeHtml()
// Заменено на
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
// Заменено на
tray.setHighlightMode('on')

// Устарело
tray.setHighlightMode(false)
// Заменено на
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
// Нет замены для этого API
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
// Нет замены для этого API

// Удалено
webview.setAttribute('guestinstance', instanceId)
// Нет замены для этого API

// Слушатели клавиатуры больше не работают в теге webview
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
// Заменено на
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

## Двойные ресурсы ARM

Каждый выпуск Electron включает в себя две идентичные сборки ARM с немного разными имена файлов, такие как `electron-v1.7.3-linux-arm.zip` и `electron-v1.7.3-linux-armv7l.zip`. Ресурсы с префиксом `v7l` были добавлены, чтобы уточнить для пользователей, какую версию ARM они поддерживают, и чтобы исключить их в будущих ресурсах armv6l и arm64, которые могут быть произведены.

Файл *без префикса* по-прежнему публикуется, чтобы избежать нарушения любых настроек, которые могут его использовать. Начиная с версии 2.0, файл без префикса более не будет публиковаться.

Для подробностей см. [6986](https://github.com/electron/electron/pull/6986) и [7189](https://github.com/electron/electron/pull/7189).