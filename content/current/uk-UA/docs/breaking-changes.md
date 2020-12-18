# Важливі Зміни

Зміни, які ламають роботу застосунку, будуть документуватися тут, також попередження про припинення підримки по можливості додано в JS код, як мінімум за [одне велике оновлення](tutorial/electron-versioning.md#semver) до змін.

### Види змін для порушення

Цей документ використовує наступне правило для поділу змін:

* **API змінено** API був змінений таким чином, що код, який не було оновлено, гарантовано кидає виняток.
* **Поведінка змінилася:** Поведінка Electron змінилася, але не таким чином, щоб виняток обов'язково був кинутий.
* **Змінено за замовчуванням:** код в залежності від старого за замовчуванням може зламатися, не обов'язково кидати виключення. Стара поведінка може бути відновлена шляхом явного вказування значення.
* **Припиняється підтримка:** API було позначено як застаріле. API буде продовжувати функціонувати, але зробить попередження про застаріле, і буде видалено в майбутньому релізі.
* **Видалено:** API або функція були видалені, і тому він більше не підтримується Electron.

## Заплановані Зміни API (13.0)

### API Changed: `session.setPermissionCheckHandler(handler)`

The `handler` methods first parameter was previously always a `webContents`, it can now sometimes be `null`.  You should use the `requestingOrigin`, `embeddingOrigin` and `securityOrigin` properties to respond to the permission check correctly.  As the `webContents` can be `null` it can no longer be relied on.

```js
// Old code
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// Replace with
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### Видалено: `shell.moveItemToTrash()`

Застаріле `shell.moveItemToTrash()` було видалено. Використовуйте асинхронний `shell.trashItem()`.

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

### Removed: `BrowserWindow` extension APIs

The deprecated extension APIs have been removed:

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
// Removed in Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Removed in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Removed in Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### Removed: methods in `systemPreferences`

The following `systemPreferences` methods have been deprecated:
* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Use the following `nativeTheme` properties instead:
* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
// Removed in Electron 13
systemPreferences.isDarkMode()
// Replace with
nativeTheme.shouldUseDarkColors

// Removed in Electron 13
systemPreferences.isInvertedColorScheme()
// Replace with
nativeTheme.shouldUseInvertedColorScheme

// Removed in Electron 13
systemPreferences.isHighContrastColorScheme()
// Replace with
nativeTheme.shouldUseHighContrastColors
```

## Заплановані Зміни API (12.0)

### Видалено: Підтримка Pepper Flash

Chromium видалив підтримку для Flash, і ми повинні слідувати за ним його допомогою. Дивіться Chromium [Flash Roadmap](https://www.chromium.org/flash-roadmap) щоб дізнатися більше .

### Типово змінено: `contextIsolation` за замовчуванням `true`

У Electron 12, `contextIsolation` буде включено за замовчуванням.  Щоб відновити попередню поведінку `, контекстна ізоляція: false` має бути вказано в Веб-налаштуваннях.

Ми [рекомендуємо увімкнути contextIsolation](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) для безпеки вашого застосунку.

Для детальнішої інформації бачити: https://github.com/electron/electron/issues/23506

### Removed: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been removed. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Removed in Electron 12
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

* `аварійний репортер`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Стандартне значення: `збій репортер.початок({ compress: true })`

Значення за замовчуванням `стискання` на `crashReporter.start` змінилося from `false` to `true`. Це означає, що аварія вивантажуватиметься на сервер аварійного завершення роботи за допомогою `contentent-Encoding: gzip` header, і тіло буде стискатися.

If your crash ingestion server does not support compressed payloads, you can turn off compression by specifying `{ compress: false }` in the crash reporter options.

### Застаріло: `віддалений` модуль

Модуль `віддалений` застарілий в Electron 12, і буде видалений з Electron 14. Його замінює модуль [`@electron/remote`](https://github.com/electron/remote).

```js
// Припиняється в Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Замініть на:
const { BrowserWindow } = require('@electron/remote')

// В головному процесі:
require('@electron/remote/main').initialize()
```

### Припиняється підтримка: `shell.moveItemToTrash()`

Синхронізований `shell.moveItemToTrash()` замінений на новий, asynchron `shell.trashItem()`.

```js
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Заплановані Зміни API (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## Заплановані Зміни API (10.0)

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

* `аварійний репортер`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### Припинено припинення: `збій репортер.start({ compress: false })`

Встановлення `{ compress: false }` в `аварійному режимі .start` є застарілим. Майже всі сервери реєстрації аварій підтримують стиснення gzip. Ця опція буде видалена у наступній версії Electron.

### Видалено: Відповідність вікна браузера

Параметр `спорідненість` при створенні нового `BrowserWindow` буде видалено як частину нашого плану тісніше відповідно до моделі процесів Chromium для безпеки, продуктивність і обслуговування.

Для більш детальної інформації дивіться [#18397](https://github.com/electron/electron/issues/18397).

### Типово змінено: `enableRemoteModule` default `false`

У Electron 9, використовуючи віддалений модуль без явного дозволу його за допомогою `дозволити на RemoteModule` WebPreferences параметр випромінює попередження. В Electron 10, віддалений модуль тепер відключений за замовчуванням. Щоб використовувати модуль віддалений , `enableRemoteModule: true` повинен бути вказаний в WebPreference:

```js
const w = new BrowserWindow({
  веб-налаштування: {
    enableRemoteModule: true
  }
})
```

Ми [рекомендуємо відійти від модуля ](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

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

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## Заплановані Зміни API (9.0)

### Стандартно змінено: завантаження неконтекстно-резонансних модулів у процесі рендерингу вимкнено за замовчуванням

Починаючи з Electron 9 ми не дозволяємо завантажувати не-контекстні модулі, відомі через процес рендеринга.  Це для підвищення безпеки, продуктивності та супроводу проекту Electron.

Якщо це вас впливає, ви можете тимчасово встановити `app.allowRenderProcessReuse` to `false` , щоб повернутися до старої поведінки.  Цей прапорець буде опцією лише до тих пір, поки Electron 11, так що ви повинні планувати оновити власні модулі для отримання контекстної полумінних модулів.

Для більш детальної інформації дивіться [#18397](https://github.com/electron/electron/issues/18397).

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

### Видалено: `<webview>.getWebContents()`

Цей API, який був застарілий в Electron 8.0, тепер видалено.

```js
// Видалено в Electron 9.0
webview.getWebContents()
// Замінити на
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### Видалено: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. Функція була застаріла в Electron 8.x, і була вилучена з Electron 9.x. Обмеження масштабування макета тепер фіксуються як мінімум 0. 5 і максимум від 5.0, як визначено [тут](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Поведінка змінена: відправлення не-JS об'єктів над IPC тепер викликає виняток

У Electron 8.0, IPC було змінено, щоб використовувати алгоритм структурного клонування досягнення значної продуктивності. Для полегшення переходу, старий алгоритм серіалізації IPC був збережений і використаний для деяких об'єктів, які не серіалізуються з конструктивним клоном. Зокрема, об’єкти DOM (напр. `елемент`, `Місцезнаходження` і `DOMMatrix`), Node. s - об'єкти для C++ класів (наприклад, `процес. nv`, деякі учасники `Потоку`, а Electron - об'єкти C++ класи (напр. `WebContents`, `BrowserWindow` та `WebFrame`) не серіалізується за допомогою структурного клона. Коли викликався старий алгоритм попередження про застаріле.

В Electron 9. , старий алгоритм серіалізації був видалений, і відправлення таких несеріалізованих об'єктів тепер буде кидати "об'єкт не вдалося клонувати" помилку.

### API змінено: `shell.openItem` тепер `shell.openPath`

`shell.openItem` API замінено на асинхронний `shell.openPath` API. Ви можете побачити оригінальну пропозицію API і міркування [тут](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Заплановані Зміни API (8.0)

### Поведінка змінена: значення, що відправляються по IPC тепер серіалізовані з структурованим Клоном Алгоритмом

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

### Припиняється підтримка: `<webview>.getWebContents()`

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
// головний
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId, contents) => {
  const guest = webContent. romId(webContentsId)
  якщо (! uest) {
    кинути нову помилку (`Неприпустимий webContentsId: ${webContentsId}`)
  }
  якщо (гість. вміст! = contents) {
    throw new Error('Доступ відхилено до webContents')
  }
  гостя
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  гостей. penDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### Припиняється підтримка: `webFrame.setLayoutZoomLevelLimits()`

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

## Заплановані Зміни API (7.0)

### Не сприймається: Atom.io Node Headers

Це URL визначені як `disturl` в `.npmrc` файлі чи прапорець `--dist-url` командного рядку, коли будуються нативні модулі Node.  Both will be supported for the foreseeable future but it is recommended that you switch.

Припиняється підтримка: https://atom.io/download/electron

Замінити на: https://electronjs.org/headers

### API змінено: `session.clearAuthCache()` більше не приймає параметри

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### API змінено: `powerMonitor.querySystemIdleState` тепер `powerMonitor.getSystemIdleState`

```js
// Видалено в Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Замініть синхронним API
const idleState = poweritor.getSystemIdleState(threshold)
```

### API змінено: `powerMonitor.querySystemIdleTime` тепер `powerMonitor.getSystemIdleTime`

```js
// Видалено в Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Замінити на синхронний API
const idleTime = powerMonitor.getSystemIdleTime()
```

### API змінено: `webFrame.setIsolatedWorldInfo` замінює окремі методи

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

### Видалено властивість `позначка` на `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### Поведінка змінена: `атрибут webkitdirectory` для `<input type="file"/>` тепер перелічує вміст теки

Властивість `webkitdirectory` на вводі HTML файлу дозволяє їм обирати папки. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Починаючи з Electron 7, що `Список файлів` тепер є списком всіх файлів, що містяться в цій теці аналогічно до Chrome, Firefox, та Edge ([посилання на MDN документації](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Як ілюстрація, взяти папку з цією структурою:

```console
folder
├── file1
├── file2
└── file3
```

В Electron <=6, це поверне `файл` з `об’єктом` для:

```console
path/to/folder
```

У Electron 7 це тепер повертає `файл` з об’єктом `файлу` для:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Зверніть увагу, що `webkitdirectory` більше не відкриває шлях до вибраної папки. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Заплановані Зміни API (6.0)

### API змінено: `win.setMenu(null)` тепер `win.removeMenu()`

```js
// Не підтримується
win.setMenu(null)
// Замініть на
win.removeMenu()
```

### API змінено: `contentTracing.getTraceBufferUsage()` тепер є промісом

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

### API змінено: `electron.screen` в процесі рендерингу має бути доступний через `пульт`

```js
// Не підтримується
require('electron').screen
// замініть на
require('electron').remote.screen
```

### API змінено: `require()`ing node builtins в режимі sandboxed більше не завантажує `віддалену` версію

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

### Припиняється підтримка: `powerMonitor.querySystemIdleState` замінено на `powerMonitor.getSystemIdleState`

```js
// Припиняється підтримка
powerMonitor.querySystemIdleState(threshold, callback)
// Замініть на синхронний API
const idleState = powerMonitor.getSystemIdleState(threshold)
```

### Припиняється підтримка: `powerMonitor.querySystemIdleTime` замінено на `powerMonitor.getSystemIdleTime`

```js
// Припиняється підтримка
powerMonitor.querySystemIdleTime(callback)
// Замініть на синхронний API
const idleTime = powerMonitor.getSystemIdleTime()
```

### Припиняється підтримка: `app.enableMixedSandbox()` більше не потрібно

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### Припинено припинення: `Tray.setHighlightMode`

На macOS Catalina наша колишня імплементація Tray ламається. Нативна заміна Apple не підтримує зміни поведінки підсвітки.

```js
// Не підтримується
tray.setHighlightMode(mode)
// API буде видалено у версії v7.0 без заміни.
```

## Заплановані Зміни API (5.0)

### Типово змінено: `nodeIntegration` and `webviewTag` за замовчуванням false, `contextIsolation` за замовчуванням true

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

### Поведінка змінена: `nodeIntegration` у дочірніх вікнах відкрито через `nativeWindowOpen`

Дочірнє вікно з опцією `nativeWindowOpen` завжди буде мати відімкнену інтеграцію з Node.js, якщо `nodeIntegrationInSubFrame` є `true`.

### API змінено: для реєстрації привілейованих схем необхідно зробити це перед готовим додатком

Були видалені API процесу рендерингу `webFrame.registerURLSchemeAsPrivileged` і `webFrame.registerURLSchemeAsBypassingCSP` , а також API процесу браузера `protocol.registerStandardSchemes`. Новий API, `protocol.registerSchemesAsPrivileged` були додані і мають використовуватися для реєстрації користувацьких схем з необхідними привілегіями. Користувацькі схеми є обов'язковими для реєстрації перед готовністю застосунку.

### Припиняється підтримка: `webFrame.setIsolatedWorld*` замінено на `webFrame.setIsolatedWorldInfo`

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

### API змінено: `webFrame.setSpellCheckProvider` тепер приймає асинхронний зворотний виклик

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
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Замініть на
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// застаріле вікно
. n('app-command', (e, cmd) => {
  якщо (cmd === 'media-play_pause') {
    // зробити щось
  }
})
// Замінити на
вікно. n('app-command', (e, cmd) => {
  якщо (cmd === 'media-play-pause') {
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
const optionsA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Замінити на
const optionsB = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
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

Файл _без префікса_ все ще публікується, щоб уникнути поломки будь-яких налаштувань, які можуть використовувати їх. Starting at 2.0, the unprefixed file will no longer be published.

Детальніше дивіться [6986](https://github.com/electron/electron/pull/6986) та [7189](https://github.com/electron/electron/pull/7189).
