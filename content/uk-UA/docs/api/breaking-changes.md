# Важливі Зміни

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](../tutorial/electron-versioning.md#semver) до змін.

## Коментарі `FIXME`

Стрічки `FIXME` використовуються в коментарях коду для маркування речей, які мають бути виправлені для майбутній релізів. Дивіться https://github.com/electron/electron/search?q=fixme

## Заплановані Зміни API (8.0)

### Values sent over IPC are now serialized with Structured Clone Algorithm

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

* Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
* Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
* `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
* `BigInt` values will be correctly serialized, instead of being converted to `null`.
* Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
* `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
* Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
* Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

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

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Заплановані Зміни API (7.0)

### URL Node Заголовків

Це URL визначені як `disturl` в `.npmrc` файлі чи прапорець `--dist-url` командного рядку, коли будуються нативні модулі Node. Both will be supported for the foreseeable future but it is recommended that you switch.

Припиняється підтримка: https://atom.io/download/electron

Замінити на: https://electronjs.org/headers

### `session.clearAuthCache(options)`

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### `powerMonitor.querySystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = getSystemIdleTime()
```

### webFrame Isolated World APIs

```js
// Removed in Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Removal of deprecated `marked` property on getBlinkMemoryInfo

This property was removed in Chromium 77, and as such is no longer available.

### `webkitdirectory` attribute for `<input type="file"/>`

￼ The `webkitdirectory` property on HTML file inputs allows them to select folders. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder. ￼ As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)). ￼ As an illustration, take a folder with this structure:

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

￼ Note that `webkitdirectory` no longer exposes the path to the selected folder. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Заплановані Зміни API (6.0)

### `win.setMenu(null)`

```js
// Не підтримується
win.setMenu(null)
// Замініть на
win.removeMenu()
```

### `contentTracing.getTraceBufferUsage()`

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

### `electron.screen` в процесі рендеру

```js
// Не підтримується
require('electron').screen
// замініть на
require('electron').remote.screen
```

### `require` в рендерензі пісочниці

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

### `powerMonitor.querySystemIdleState`

```js
// Не підтримується
powerMonitor.querySystemIdleState(threshold, callback)
// Замініть на синхронний API
const idleState = getSystemIdleState(threshold)
```

### `powerMonitor.querySystemIdleTime`

```js
// Не підтримується
powerMonitor.querySystemIdleTime(callback)
// Замініть на синхронний API
const idleTime = getSystemIdleTime()
```

### `app.enableMixedSandbox`

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### `Tray`

На macOS Catalina наша колишня імплементація Tray ламається. Нативна заміна Apple не підтримує зміни поведінки підсвітки.

```js
// Не підтримується
tray.setHighlightMode(mode)
// API буде видалено у версії v7.0 без заміни.
```

## Заплановані Зміни API (5.0)

### `new BrowserWindow({ webPreferences })`

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

### Реєстрація Привілейованих Схем

Були видалені API процесу рендерингу `webFrame.setRegisterURLSchemeAsPrivileged` і `webFrame.registerURLSchemeAsBypassingCSP` так само як API процесу браузера `protocol.registerStandardSchemes`. Новий API, `protocol.registerSchemesAsPrivileged` були додані і мають використовуватися для реєстрації користувацьких схем з необхідними привілегіями. Користувацькі схеми є обов'язковими для реєстрації перед готовністю застосунку.

### webFrame Isolated World APIs

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

## `webFrame.setSpellCheckProvider`

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Заплановані Зміни API (4.0)

Даний список містить API зміни зроблені для Electron 4.0.

### `app.makeSingleInstance`

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

### `app.releaseSingleInstance`

```js
// Припиняється підтримка
app.releaseSingleInstance()
// Замінити на
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Тепер поводиться як `basic` на macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

Коли пишуться нативні модулі для Windows, змінна `win_delay_load_hook` в `binding.gyp` модуля має бути true (значення за замовчуванням). Якщо цей хук не присутній, то нативний модуль не буде завантажуватися на Windows, з повідомленням про помилку вигляду `Cannot find module`. Дивіться [інструкцію про нативні модулі](/docs/tutorial/using-native-node-modules.md) для деталей.

## Зміни API (3.0)

Даний список містить API зміни для Electron 3.0.

### `app`

```js
// Припиняється підтримка
app.getAppMemoryInfo()
// Змініть на
app.getAppMetrics()

// Припиняється підтримка
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Припиняється підтримка властивості
```

### `BrowserWindow`

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

### `clipboard`

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

### `crashReporter`

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

### `nativeImage`

```js
// Припиняється підтримка
nativeImage.createFromBuffer(buffer, 1.0)
// Замінити
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `процес`

```js
// Припиняється підтримка
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Припиняється підтримка
screen.getMenuBarHeight()
// Замінити на
screen.getPrimaryDisplay().workArea
```

### `session`

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

### `Tray`

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

### `webContents`

```js
// Припиняється підтримка
webContents.openDevTools({ detach: true })
// Замінити на
webContents.openDevTools({ mode: 'detach' })

// Видалено
webContents.setSize(options)
// Для цього API заміни немає
```

### `webFrame`

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

### `<webview>`

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

### URL Node Заголовків

Це URL визначені як `disturl` в `.npmrc` файлі чи прапорець `--dist-url` командного рядку, коли будуються нативні модулі Node.

Припиняється підтримка: https://atom.io/download/atom-shell

Замінити на: https://atom.io/download/electron

## Зміни API (2.0)

Даний список містить API зміни зроблені для Electron 2.0.

### `BrowserWindow`

```js
// Припиняється підтримка
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Замінити на
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Видалено
menu.popup(browserWindow, 100, 200, 2)
// Замінити на
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

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

### `процес`

* `process.versions.electron` та `process.version.chrome` будуть зроблені властивостями тільки для читання для сумусності з іншими `process.versions` властивостями встановленими Node.

### `webContents`

```js
// Видалено
webContents.setZoomLevelLimits(1, 2)
// Замінити на
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Видалено
webFrame.setZoomLevelLimits(1, 2)
// Замінити на
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Видалено
webview.setZoomLevelLimits(1, 2)
// Замінити на
webview.setVisualZoomLevelLimits(1, 2)
```

### Дублікати ARM Файлів

Кожен реліз Electron містить дві ідентичні ARM збірки з трохи різними назвами файлів, наприклад `electron-v1.7.3-linux-arm.zip` та `electron-v1.7.3-linux-armv7l.zip`. Файли з префіксом `v7l` були додані для ясності яку версію ARM вони підтримують, та відрізнити їх від майбутніх armv6l та arm64 файлів, які можуть з'явитися.

Файл *без префікса* все ще публікується, щоб уникнути поломки будь-яких налаштувань, які можуть використовувати їх. Starting at 2.0, the unprefixed file will no longer be published.

Детальніше дивіться [6986](https://github.com/electron/electron/pull/6986) та [7189](https://github.com/electron/electron/pull/7189).