# Критические изменения

Здесь будут описаны критические изменения, а также будут добавлены предупреждения об устаревших функциях в JS коде, где это возможно, по крайней мере перед тем, как изменения будут сделаны в [одной мажорной версии](tutorial/electron-versioning.md#semver).

### Типы критических изменений

В этом документе используется следующее соглашение для классификации критических изменений:

- **Изменение API:** API был изменен таким образом, что код, который не был обновлен, гарантировано бросит исключение.
- **Изменение поведения:** Поведение Electron было изменено, но не обязательно появление исключений.
- **Изменено значение по-умолчанию:** Код, работа которого зависит от старого значения по-умолчанию, может сломаться, не обязательно кидая исключение. Старое поведение можно восстановить, если явно указать значение.
- **Устарело:** API был помечен как устаревший. API продолжит функционировать, но будет появляться предупреждающее сообщение о том, что API будет удален в будущем релизе.
- **Удалено:** API или функция была удалена и больше не поддерживается Electron.

## Запланированные критические изменения API (12.0)

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

## Запланированные критические изменения API (11.0)

## Запланированные критические изменения API (10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

- `crashReporter.start`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Removed: Browser Window Affinity

Параметр `affinity` при создании нового `BrowserWindow` будет удален в рамках нашего плана для более тесной связи с моделью процесса Chrome в целях безопасности, производительность и лучшей поддержки.

Для подробностей см. [#18397](https://github.com/electron/electron/issues/18397).

### Изменение значения по-умолчанию: `enableRemoteModule` изменено на `false`

In Electron 9, using the remote module without explicitly enabling it via the `enableRemoteModule` WebPreferences option began emitting a warning. In Electron 10, the remote module is now disabled by default. To use the remote module, `enableRemoteModule: true` must be specified in WebPreferences:

```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

We [recommend moving away from the remote module](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

## Запланированные критические изменения API (9.0)

### Default Changed: Loading non-context-aware native modules in the renderer process is disabled by default

As of Electron 9 we do not allow loading of non-context-aware native modules in the renderer process.  This is to improve security, performance and maintainability of Electron as a project.

If this impacts you, you can temporarily set `app.allowRendererProcessReuse` to `false` to revert to the old behavior.  This flag will only be an option until Electron 11 so you should plan to update your native modules to be context aware.

Для подробностей см. [#18397](https://github.com/electron/electron/issues/18397).

### Removed: `<webview>.getWebContents()`

Удален этот API, устаревший в Electron 8.0.

```js
// Удален в Electron 9.0
webview.getWebContents()
// Замена на
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Removed: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Behavior Changed: Sending non-JS objects over IPC now throws an exception

In Electron 8.0, IPC was changed to use the Structured Clone Algorithm, bringing significant performance improvements. To help ease the transition, the old IPC serialization algorithm was kept and used for some objects that aren't serializable with Structured Clone. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Whenever the old algorithm was invoked, a deprecation warning was printed.

In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.

### API Changed: `shell.openItem` is now `shell.openPath`

The `shell.openItem` API has been replaced with an asynchronous `shell.openPath` API. You can see the original API proposal and reasoning [here](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Запланированные критические изменения API (8.0)

### Behavior Changed: Values sent over IPC are now serialized with Structured Clone Algorithm

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm][SCA], the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.
```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```
- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
- `BigInt` values will be correctly serialized, instead of being converted to `null`.
- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:
```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### Deprecated: `<webview>.getWebContents()`

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

const getGuestForWebContents = (webContentsId, contents) => {
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

### Deprecated: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Запланированные критические изменения API (7.0)

### Deprecated: Atom.io Node Headers URL

Это URL, указанный как `disturl` в файле `.npmrc` или как `--dist-url` флаг командной строки, при сборке нативных модулей Node.  Оба будут поддерживаться в обозримом будущем, но рекомендуется переключиться.

Устарело: https://atom.io/download/electron

Заменено на: https://electronjs.org/headers

### API Changed: `session.clearAuthCache()` no longer accepts options

`session.clearAuthCache` API больше не принимает параметры для очистки, а вместо этого безоговорочно очищает весь кэш.

```js
// Устарело
session.clearAuthCache({ type: 'password' })
// Заменить на
session.clearAuthCache()
```

### API Changed: `powerMonitor.querySystemIdleState` is now `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API Changed: `powerMonitor.querySystemIdleTime` is now `powerMonitor.getSystemIdleState`

```js
// Removed in Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API Changed: `webFrame.setIsolatedWorldInfo` replaces separate methods

```js
// Удалено в Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Заменить на
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### Removed: `marked` property on `getBlinkMemoryInfo`

Это свойство было удалено в Chromium 77, и как таковое больше не доступно.

### Behavior Changed: `webkitdirectory` attribute for `<input type="file"/>` now lists directory contents

The `webkitdirectory` property on HTML file inputs allows them to select folders. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

As of Electron 7, that `FileList` is now list of all files contained within the folder, similarly to Chrome, Firefox, and Edge ([link to MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

As an illustration, take a folder with this structure:
```console
folder
├── file1
├── file2
└── file3
```

In Electron <=6, this would return a `FileList` with a `File` object for:
```console
path/to/folder
```

В Electron 7, теперь он вернет `FileList` с объектом `File` для:
```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Обратите внимание, что `webkitdirectory` больше не возвращает путь к выбранной папке. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Запланированные критические изменения API (6.0)

### API Changed: `win.setMenu(null)` is now `win.removeMenu()`

```js
// Устаревшее
win.setMenu(null)
// Заменено на
win.removeMenu()
```

### API Changed: `contentTracing.getTraceBufferUsage()` is now a promise

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

### API Changed: `electron.screen` in the renderer process should be accessed via `remote`

```js
// Устаревшее
require('electron').screen
// Заменено на
require('electron').remote.screen
```

### API Changed: `require()`ing node builtins in sandboxed renderers no longer implicitly loads the `remote` version

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

### Deprecated: `powerMonitor.querySystemIdleState` replaced with `powerMonitor.getSystemIdleState`

```js
// Deprecated
powerMonitor.querySystemIdleState(threshold, callback)
// Replace with synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Deprecated: `powerMonitor.querySystemIdleTime` replaced with `powerMonitor.getSystemIdleTime`

```js
// Deprecated
powerMonitor.querySystemIdleTime(callback)
// Replace with synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Deprecated: `app.enableMixedSandbox()` is no longer needed

```js
// Устарело
app.enableMixedSandbox()
```

Режим смешанной песочницы теперь включен по умолчанию.

### Deprecated: `Tray.setHighlightMode`

Под macOS Catalina наша прежняя реализация Tray нарушена. Нативная замена Apple не поддерживает изменение поведения подсветки.

```js
// Устарело
tray.setHighlightMode(mode)
// Метод будет удален в v7.0 без альтернатив.
```

## Запланированные критические изменения API (5.0)

### Default Changed: `nodeIntegration` and `webviewTag` default to false, `contextIsolation` defaults to true

Следующие значения по умолчанию для параметра `webPreferences` устарели в пользу новых значений по умолчанию, перечисленных ниже.

| Свойство           | Устаревшее                                        | Новое   |
| ------------------ | ------------------------------------------------- | ------- |
| `contextIsolation` | `false`                                           | `true`  |
| `nodeIntegration`  | `true`                                            | `false` |
| `webviewTag`       | `nodeIntegration`, если установлено, иначе `true` | `false` |

Например, Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### Behavior Changed: `nodeIntegration` in child windows opened via `nativeWindowOpen`

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled, unless `nodeIntegrationInSubFrames` is `true`.

### API Changed: Registering privileged schemes must now be done before app ready

Renderer process APIs `webFrame.registerURLSchemeAsPrivileged` and `webFrame.registerURLSchemeAsBypassingCSP` as well as browser process API `protocol.registerStandardSchemes` have been removed. Новый API `protocol.registerSchemesAsPrivileged` был добавлен и должен использоваться для регистрации пользовательских схем с необходимыми привилегиями. Пользовательские схемы должны быть зарегистрированы до готовности приложения.

### Deprecated: `webFrame.setIsolatedWorld*` replaced with `webFrame.setIsolatedWorldInfo`

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

### API Changed: `webFrame.setSpellCheckProvider` now takes an asynchronous callback
Параметр `spellCheck` теперь асинхронный, а параметр `autoCorrectWord` был удален.
```js
// Устаревшее
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker. sMisspelled(text)
  }
})
// Заменить на
webFrame. etSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(слова. ilter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Запланированные критические изменения API (4.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 4.0.

### `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

### `app.releaseSingleInstance`

```js
// Устарело
app.releaseSingleInstance()
// Заменено на
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Теперь ведет себя так же, как `basic` на macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

При создании нативных модулей для Windows, переменная `win_delay_load_hook` в `binding.gyp` модуля должна быть true (это значение по умолчанию). Если этот хук отсутствует, то нативный модуль на Windows неудачно загрузится, с сообщением об ошибке, например `Cannot find module`. См. [руководство по нативным модулям](/docs/tutorial/using-native-node-modules.md) для получения дополнительной информации.

## Критические изменения API (3.0)

Данный список включает в себя критические изменения в API для Electron 3.0.

### `app`

```js
// Устарело
app.getAppMemoryInfo()
// Заменить на
app.getAppMetrics()

// Устарело
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // свойство устарело
```

### `BrowserWindow`

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

### `clipboard`

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

### `crashReporter`

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

### `nativeImage`

```js
// Устарело
nativeImage.createFromBuffer(buffer, 1.0)
// Заменить на
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Устарело
const info = process.getProcessMemoryInfo()
```

### `screen`

```js
// Устарело
screen.getMenuBarHeight()
// Заменить на
screen.getPrimaryDisplay().workArea
```

### `session`

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

### `Tray`

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

### `webContents`

```js
// Устарело
webContents.openDevTools({ detach: true })
// Заменить на
webContents.openDevTools({ mode: 'detach' })

// Удалено
webContents.setSize(options)
// Нет замены для этого API
```

### `webFrame`

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

### `<webview>`

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

### Node Headers URL

Это URL, указанный как `disturl` в файле `.npmrc` или как `--dist-url` флаг командной строки, при сборке нативных модулей Node.

Устарело: https://atom.io/download/atom-shell

Заменено на: https://atom.io/download/electron

## Критические изменения API (2.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 2.0.

### `BrowserWindow`

```js
// Устарело
let optionsA = { titleBarStyle: 'hidden-inset' }
let windowA = new BrowserWindow(optionsA)
// Заменить на
let optionsB = { titleBarStyle: 'hiddenInset' }
let windowB = new BrowserWindow(optionsB)
```

### `menu`

```js
// Удалено
menu.popup(browserWindow, 100, 200, 2)
// Заменить на
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

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

### `process`

* `process.versions.electron` и `process.version.chrome` будут доступны только для чтения, для согласованности с другими свойствами `process.versions`, установленными в Node.

### `webContents`

```js
// Удалено
webContents.setZoomLevelLimits(1, 2)
// Заменить на
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Удалено
webFrame.setZoomLevelLimits(1, 2)
// Заменено на
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Удалено
webview.setZoomLevelLimits(1, 2)
// Заменить на
webview.setVisualZoomLevelLimits(1, 2)
```

### Двойные ARM ресурсы

Каждый выпуск Electron включает в себя две идентичные сборки ARM с немного разными имена файлов, такие как `electron-v1.7.3-linux-arm.zip` и `electron-v1.7.3-linux-armv7l.zip`. Ресурс с префиксом `v7l` был добавлен, чтобы уточнить для пользователей, какую версию ARM он поддерживает, и чтобы исключить их в будущих ресурсах armv6l и arm64, которые могут быть произведены.

Файл _без префикса_ по-прежнему публикуется, чтобы избежать нарушения любых настроек, которые могут его использовать. Начиная с версии 2.0, файл без префикса более не будет публиковаться.

Для подробностей см. [6986](https://github.com/electron/electron/pull/6986) и [7189](https://github.com/electron/electron/pull/7189).

[SCA]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
