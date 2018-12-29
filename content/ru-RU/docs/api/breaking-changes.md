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

При создании собственных модулей для Windows переменная `win_delay_load_hook` в модулях `binding.gyp` должен быть true (это значение по умолчанию). Если этот хук отсутствует, то нативный модуль не будет загружаться в Windows с сообщением об ошибке, например `Cannot find module`. См. [руководство по нативным модулям](/docs/tutorial/using-native-node-modules.md) для получения дополнительной информации.

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
// Устарело
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Заменить на
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

## `menu`

```js
// Удалено
menu.popup(browserWindow, 100, 200, 2)
// Заменить на
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

## `nativeImage`

```js
// Удалено
nativeImage.toPng()
// Заменить на
nativeImage.toPNG()

// Удалено
nativeImage.toJpeg()
// Заменить на
nativeImage.toJPEG()
```

## `process`

* `process.versions.electron` и `process.version.chrome` будет доступно только для чтения для согласованности с другими `process.versions` свойствами установленными в Node.

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
// Заменить на
webFrame.setVisualZoomLevelLimits(1, 2)
```

## `<webview>`

```js
// Удалено
webview.setZoomLevelLimits(1, 2)
// Заменить на
webview.setVisualZoomLevelLimits(1, 2)
```

## Двойные ARM ресурсы

Каждый выпуск Electron включает в себя две идентичные сборки ARM с немного разными имена файлов, такие как `electron-v1.7.3-linux-arm.zip` и `electron-v1.7.3-linux-armv7l.zip`. Ресурсы с префиксом `v7l` были добавлены, чтобы уточнить для пользователей, какую версию ARM он поддерживает, и избавиться от него из будущих ресурсов armv6l и arm64, которые могут быть произведены.

Файл *без префикса* по-прежнему публикуется, чтобы избежать нарушения любых настроек, которые могут его использовать. Начиная с версии 2.0, файл без префикса будет более не доступен для публикации.

Более детально смотреть [6986](https://github.com/electron/electron/pull/6986) и [7189](https://github.com/electron/electron/pull/7189).