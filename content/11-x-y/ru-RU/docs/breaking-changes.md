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

### Default Changed: `contextIsolation` defaults to `true`

` `  ` `

Мы [рекомендуем включить contextIsolation](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) для безопасности вашего приложения.

Дополнительную информацию см. в https://github.com/electron/electron/issues/23506

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `Отчет об ошибке.старте`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `вылетать Reporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### По умолчанию изменено: `crashReporter.start({ compress: true })`

Значение по умолчанию для опции `сжимать` на `аварийныйReporter.start` изменил с `false` на `true`. Это означает, что дампы сбоев будут загружены на сервер сбоев с помощью `Content-Encoding: gzip` заголовок, и тело будет сжато.

Если ваш сервер отладки не поддерживает сжатые полезные нагрузки, вы можете выключить сжатие, указав `{ compress: false }` в параметрах репортера сбоев.

## Запланированные критические изменения API (11.0)

Не запланировано никаких изменений для 11.0.

## Запланированные критические изменения API (10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Obsoleto: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

- `Отчет об ошибке.старте`
- `crashReporter.getLastCrashReport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `вылетать Reporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Устарело: `crashReporter.start({ compress: false })`

Установка `{ compress: false }` в `об ошибке.start` является устаревшим. Почти все серверы сбоя поддерживают сжатие gzip. Эта опция будет удалена в будущей версии Electron.

### Удалено: Совместимость окна браузера

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

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

API теперь синхронизируются, и необязательный обратный вызов больше не требуется.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`
### `protocol.registerBufferProtocol`
### `protocol.registerStringProtocol`
### `protocol.registerHttpProtocol`
### `protocol.registerStreamProtocol`
### `protocol.interceptFileProtocol`
### `protocol.interceptStringProtocol`
### `protocol.interceptBufferProtocol`
### `protocol.interceptHttpProtocol`
### `protocol.interceptStreamProtocol`

API теперь синхронизируются, и необязательный обратный вызов больше не требуется.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

Зарегистрированный или перехваченный протокол не влияет на текущую страницу до тех пор, пока не произойдет навигация.

### `protocol.isProtocolHandled`

Этот API является устаревшим, пользователи должны использовать `protocol.isProtocolRegistered` и `protocol.isProtocolIntercepted`.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Запланированные критические изменения API (9.0)

### По умолчанию изменено: Загрузка неконтекстных собственных модулей в процессе визуализации по умолчанию отключена

Начиная с 9 Electron мы не разрешаем загрузку неконтекстных родных модулей в процессе визуализации.  Это должно улучшить безопасность, производительность и сопровождаемость Electron в качестве проекта.

Если это повлияет, вы можете временно установить `app.allowRendererProcessReuse` в `false` , чтобы вернуться к старому поведению.  Этот флаг будет только опцией до тех пор, пока Electron 11 поэтому вы должны планировать обновить свои родные модули, чтобы они были понятными в контекстах.

Для подробностей см. [#18397](https://github.com/electron/electron/issues/18397).

### Deprecated: `BrowserWindow` extension APIs

The following extension APIs have been deprecated:
* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:
* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Deprecated in Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Deprecated in Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Deprecated in Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### Удалено: `<webview>.getWebContents()`

Удален этот API, устаревший в Electron 8.0.

```js
// Удален в Electron 9.0
webview.getWebContents()
// Замена на
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Удалено: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function was deprecated in Electron 8.x, and has been removed in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Изменено поведение: Отправка не JS объектов поверх IPC теперь выводит исключение

В Electron 8.0 IPC была изменена на использование алгоритма структурированного клонирования , что принесло существенные улучшения производительности. Чтобы облегчить переход, старый алгоритм сериализации IPC был сохранен и использован для некоторых объектов, которые не сериализуются с Structured Clone. В частности, DOM объекты (например, `Element`, `Location` и `DOMMatrix`), Node. с объектами, поддерживаемыми классами С++ (напр., `процесс). nv`, некоторые участники `Stream`), и объекты Electron с поддержкой C++ классов (например, `Содержимое WebContents`, `Окно браузера` и `WebFrame`) не сериализуется с Структурированным Клоном. Whenever the old algorithm was invoked, a deprecation warning was printed.

В Electron 9. , старый сериализационный алгоритм был удален, и отправка таких несериализуемых объектов теперь вызовет ошибку "объект не может быть клонирован" .

### API изменен: `shell.openItem` теперь `shell.openPath`

API `shell.openItem` был заменен асинхронной командой `shell.openPath` API. Вы можете увидеть оригинальное предложение API и рассуждения [здесь](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Запланированные критические изменения API (8.0)

### Изменено поведение: Значения, отправленные над IPC, теперь сериализированы с структурированным алгоритмом клонирования

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

### Устарело: `<webview>.getWebContents()`

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
// основной
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContents. romId(webContentsId)
  если (! uest) {
    выбросить новую ошибку(`Invalid webContentsId: ${webContentsId}`)
  }
  if (guest. ostWebContents ! = contents) {
    throw new Error('Access denied to webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  guest. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Устарело: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Deprecated events in `systemPreferences`

The following `systemPreferences` events have been deprecated:
* `inverted-color-scheme-changed`
* `high-contrast-color-scheme-changed`

Use the new `updated` event on the `nativeTheme` module instead.

```js
// Deprecated
systemPreferences.on('inverted-color-scheme-changed', () => { /* ... */ })
systemPreferences.on('high-contrast-color-scheme-changed', () => { /* ... */ })

// Replace with
nativeTheme.on('updated', () => { /* ... */ })
```

### Deprecated: methods in `systemPreferences`

The following `systemPreferences` methods have been deprecated:
* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:
* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Deprecated
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Deprecated
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

## Запланированные критические изменения API (7.0)

### Устаревший: URL заголовков Atom.io

Это URL, указанный как `disturl` в файле `.npmrc` или как `--dist-url` флаг командной строки, при сборке нативных модулей Node.  Оба будут поддерживаться в обозримом будущем, но рекомендуется переключиться.

Устарело: https://atom.io/download/electron

Заменено на: https://electronjs.org/headers

### Изменен API: `session.clearAuthCache()` больше не принимает параметры

`session.clearAuthCache` API больше не принимает параметры для очистки, а вместо этого безоговорочно очищает весь кэш.

```js
// Устарело
session.clearAuthCache({ type: 'password' })
// Заменить на
session.clearAuthCache()
```

### API изменен: `powerMonitor.querySystemIdleState` теперь `powerMonitor.getSystemIdleState`

```js
// Удален в Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Замена синхронным API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### API изменен: `powerMonitor.querySystemIdleTime` теперь `powerMonitor.getSystemIdleTime`

```js
// Удален в Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Замена синхронным API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Изменен API: `webFrame.setIsolatedWorldInfo` заменяет отдельные методы

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

### Удалено: `помечено свойством` на `getBlinkMemoryInfo`

Это свойство было удалено в Chromium 77, и как таковое больше не доступно.

### Изменено поведение: `атрибут webkitdirectory` для `<input type="file"/>` теперь отображает содержимое каталога

Свойство `webkitdirectory` на входах файла HTML позволяет им выбрать папки. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Начиная с Electron 7, этот `FileList` теперь список всех файлов, содержащихся в папке, подобно Chrome, Firefox и Edge ([ссылка на документацию MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

В качестве примера возьмите папку с этой структурой:
```console
folder
├── file1
├── file2
└── file3
```

В Electron <=6, это возвращает `FileList` с объектом `File` для:
```console
path/to/folder
```

В Electron 7 теперь возвращает `FileList` с объектом `File` для:
```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Обратите внимание, что `webkitdirectory` больше не открывает путь к выбранной папке. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### API Changed: Callback-based versions of promisified APIs

Electron 5 and Electron 6 introduced Promise-based versions of existing asynchronous APIs and deprecated their older, callback-based counterparts. In Electron 7, all deprecated callback-based APIs are now removed.

These functions now only return Promises:

* `app.getFileIcon()` [#15742](https://github.com/electron/electron/pull/15742)
* `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)
* `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
* `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
* `contentTracing.startRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contentTracing.stopRecording()` [#16584](https://github.com/electron/electron/pull/16584)
* `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
* `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
* `debugger.sendCommand()` [#16861](https://github.com/electron/electron/pull/16861)
* `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
* `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
* `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
* `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
* `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
* `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
* `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
* `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
* `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
* `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
* `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
* `shell.openExternal()` [#16176](https://github.com/electron/electron/pull/16176)
* `webContents.loadFile()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.loadURL()` [#15855](https://github.com/electron/electron/pull/15855)
* `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
* `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
* `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
* `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `webFrame.executeJavaScriptInIsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
* `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
* `win.capturePage()` [#15743](https://github.com/electron/electron/pull/15743)

Теперь эти функции имеют две формы: синхронный и асинхронный:

* `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
* `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
* `dialog.showSaveDialog()`/`диалог.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

## Запланированные критические изменения API (6.0)

### Изменен API: `win.setMenu(null)` теперь `win.removeMenu()`

```js
// Устаревшее
win.setMenu(null)
// Заменено на
win.removeMenu()
```

### Изменен API: `electron.screen` в процессе визуализатора должен быть доступен через `удаленный`

```js
// Устаревшее
require('electron').screen
// Заменено на
require('electron').remote.screen
```

### API изменен: `require()`и встроенные узлы в "песочницах" рендеринговых серверах больше не загружает удаленную версию ``

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

### Устарело: `powerMonitor.querySystemIdleState` заменен на `powerMonitor.getSystemIdleState`

```js
// Устаревший
powerMonitor.querySystemIdleState(threshold, callback)
// Замена с синхронным API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Устарело: `powerMonitor.querySystemIdleTime` заменен на `powerMonitor.getSystemIdleTime`

```js
// Устаревший
powerMonitor.querySystemIdleTime(callback)
// Замена синхронным API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Устарело: `app.enableMixedSandbox()` больше не требуется

```js
// Устарело
app.enableMixedSandbox()
```

Режим смешанной песочницы теперь включен по умолчанию.

### Устарело: `Tray.setHighlightMode`

Под macOS Catalina наша прежняя реализация Tray нарушена. Нативная замена Apple не поддерживает изменение поведения подсветки.

```js
// Устарело
tray.setHighlightMode(mode)
// Метод будет удален в v7.0 без альтернатив.
```

## Запланированные критические изменения API (5.0)

### По умолчанию: `nodeIntegration` и `webviewTag` по умолчанию false, `contextIsolation` по умолчанию true

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

### Изменено поведение: `nodeIntegration` в дочерних окнах, открытых через `родной WindowOpen`

Дочерние окна, открытые с параметром `nativeWindowOpen` , всегда будут иметь интеграцию Node.js отключена, если `nodeIntegrationInSubFrames` не будет `true`.

### Изменен API: Регистрация привилегированных схем должна быть выполнена до того, как приложение будет готово

Удалены API процессов Renderer `webFrame.registerURLSchemeAsPrivileged` и `webFrame.registerURLSchemeAsBypassingCSP` , а также API процесса браузера `protocol.registerStandardSchemes`. Новый API `protocol.registerSchemesAsPrivileged` был добавлен и должен использоваться для регистрации пользовательских схем с необходимыми привилегиями. Пользовательские схемы должны быть зарегистрированы до готовности приложения.

### Устарело: `webFrame.setIsolatedWorld*` заменен на `webFrame.setIsolatedWorldInfo`

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

### API изменен: `webFrame.setSpellCheckProvider` теперь принимает асинхронный обратный вызов
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

### API Changed: `webContents.getZoomLevel` and `webContents.getZoomFactor` are now synchronous

`webContents.getZoomLevel` and `webContents.getZoomFactor` no longer take callback parameters, instead directly returning their number values.

```js
// Deprecated
webContents.getZoomLevel((level) => {
  console.log(level)
})
// Replace with
const level = webContents.getZoomLevel()
console.log(level)
```

```js
// Deprecated
webContents.getZoomFactor((factor) => {
  console.log(factor)
})
// Replace with
const factor = webContents.getZoomFactor()
console.log(factor)
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
// Deprecated
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Replace with
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

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
// Устаревший
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Заменить
optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
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
