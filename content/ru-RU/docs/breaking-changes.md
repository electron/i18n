# Критические изменения

Здесь будут описаны критические изменения, а также будут добавлены предупреждения об устаревших функциях в JS коде, где это возможно, по крайней мере перед тем, как изменения будут сделаны в [одной мажорной версии](tutorial/electron-versioning.md#semver).

### Типы критических изменений

В этом документе используется следующее соглашение для классификации критических изменений:

* **Изменение API:** API был изменен таким образом, что код, который не был обновлен, гарантировано бросит исключение.
* **Изменение поведения:** Поведение Electron было изменено, но не обязательно появление исключений.
* **Изменено значение по-умолчанию:** Код, работа которого зависит от старого значения по-умолчанию, может сломаться, не обязательно кидая исключение. Старое поведение можно восстановить, если явно указать значение.
* **Устарело:** API был помечен как устаревший. API продолжит функционировать, но будет появляться предупреждающее сообщение о том, что API будет удален в будущем релизе.
* **Удалено:** API или функция была удалена и больше не поддерживается Electron.

## Запланированные критические изменения API (14.0)

### API Изменено: `window.(open)`

Дополнительный параметр `frameName` больше не будет устанавливать название окна. Теперь это следует спецификации, описанной [документации](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#parameters) соответствии с соответствующим параметром `windowName`.

Если вы использовали этот параметр, чтобы установить название окна, вы можете вместо этого использовать [win.setTitle (название)](https://www.electronjs.org/docs/api/browser-window#winsettitletitle).

### Удалено: `worldSafeExecuteJavaScript`

В Electron 14 `worldSafeExecuteJavaScript` будут удалены.  Альтернативы нет, пожалуйста, убедитесь ваш код работает с включенным свойством.  Он был включен по умолчанию, так как Electron
12.

Это изменение повлияет на вас, если вы используете `webFrame.executeJavaScript` или `webFrame.executeJavaScriptInIsolatedWorld`. Необходимо убедиться, что значения, возвращенные одним из этих методов, поддерживаются API [Context Bridge](api/context-bridge.md#parameter--error--return-type-support) поскольку эти методы используют ту же семантику прохождения значения.

## Запланированные критические изменения API (13.0)

### API Изменено: `session.setPermissionCheckHandler(handler)`

Методы `handler` первого параметра раньше всегда были `webContents`, теперь его иногда можно `null`.  Вы должны использовать `requestingOrigin`, `embeddingOrigin` и `securityOrigin` свойства, чтобы правильно реагировать на проверку разрешения.  Поскольку `webContents` можно `null` на это уже нельзя положиться.

```js
Старый код
session.setPermissionCheckHandler ((webContents, разрешение) ->
  если (webContents.getURL().startsWith ('https://google.com/') && разрешение на "уведомление") {
    return true
  }
  возвращение ложных
евро)

// Заменить
session.setPermissionCheckHandler ((webContents, разрешение, запрашиваяОригина)
{
    return true
  }
  && -> -
  если (новый URL (запросОригина google.com).
```

### Удалено: `shell.moveItemToTrash()`

Удален синхронный `shell.moveItemToTrash()` API. Используйте асинхронный `shell.trashItem()` вместо этого.

```js
Удален в Electron 13
shell.moveItemToTrash (путь)
// Заменить
shell.trashItem (путь)....
```

### Удалено: `BrowserWindow` API расширения

Увеханые API расширения были удалены:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Вместо этого используйте API сеанса:

* `ses.loadExtension(path)`
* `ses.removeExtension (extension_id)`
* `ses.getAllExtensions()`

```js
Удален в Electron 13
BrowserWindow.addExtension (путь)
BrowserWindow.addDevToolsExtension (путь)
// Заменить
session.defaultSession.loadExtension (путь)
```

```js
Удален в Electron 13
BrowserWindow.removeExtension (имя)
BrowserWindow.removeDevToolsExtension (имя)
// Заменить
session.defaultSession.removeExtension (extension_id)
```

```js
Удален в Electron 13
BrowserWindow.getExtensions ()
BrowserWindow.getDevToolsExtensions ()
// Заменить
session.defaultSession.getAllExtensions ()
```

### Удалено: методы в `systemPreferences`

Следующие `systemPreferences` были уветаны:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Вместо этого используйте `nativeTheme` свойства:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Удален в electron 13
systemPreferences.isDarkMode ()
// Заменить на
nativeTheme.shouldUseDarkColors

// Удалено в системе Electron 13
Preferences.isInvertedColorScheme()
// Заменить
nativeTheme.shouldUseInvertedColorScheme

// Удалено в Electron 13
systemPreferences.isHighContrastColorScheme()
// Заменить на
nativeTheme.shouldUseHighContrastColors
```

## Запланированные критические изменения API (12.0)

### Удалено: Поддержка Pepper Flash

Chromium удалил поддержку Flash, и поэтому мы должны следовать этому примеру. Смотрите Chromium [Flash Roadmap](https://www.chromium.org/flash-roadmap) для получения более подробной информации.

### Значение по умолчанию изменено: `worldSafeExecuteJavaScript` по умолчанию `true`

В Electron 12 `worldSafeExecuteJavaScript` включен по умолчанию.  Чтобы восстановить предыдущее поведение, `worldSafeExecuteJavaScript: false` должны быть указаны в WebPreferences. Пожалуйста, обратите внимание, что установка этой `false` для **является**.

Эта опция будет удалена в Electron 14, поэтому, пожалуйста, перемитите код для поддержки значения значения.

### Default Changed: `contextIsolation` defaults to `true`

` `  ` `

Мы [рекомендуем включить contextIsolation](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) для безопасности вашего приложения.

Другим следствием является то, `require()` не могут быть использованы в процессе рендерера, `nodeIntegration` если `true` не `contextIsolation` и `false`.

Дополнительную информацию см. в https://github.com/electron/electron/issues/23506

### Удалено: `crashReporter.getCrashesDirectory()`

Метод `crashReporter.getCrashesDirectory` был удален. Использование должно быть заменено `app.getPath('crashDumps')`.

```js
Удален в Electron 12
crashReporter.getCrashesDirectory ()
// Заменить
app.getPath ('crashDumps')
```

### Удалено: `crashReporter` методы в процессе рендерера

Следующие `crashReporter` больше не доступны в процессе рендеров:

* `Отчет об ошибке.старте`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `вылетать Reporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Их следует называть только из основного процесса.

Подробности [#23265](https://github.com/electron/electron/pull/23265) подробнее.

### По умолчанию изменено: `crashReporter.start({ compress: true })`

Значение по умолчанию для опции `сжимать` на `аварийныйReporter.start` изменил с `false` на `true`. Это означает, что дампы сбоев будут загружены на сервер сбоев с помощью `Content-Encoding: gzip` заголовок, и тело будет сжато.

Если ваш сервер отладки не поддерживает сжатые полезные нагрузки, вы можете выключить сжатие, указав `{ compress: false }` в параметрах репортера сбоев.

### Устарело: `удалённый` модуль

Удаленный модуль `` устарел в Electron 12, и будет удален в Electron 14. Он заменяется модулем [`@electron/remote`](https://github.com/electron/remote).

```js
// Устарел в Electron 12:
const { BrowserWindow } = require('electron').remote
```

```js
// Заменить на:
const { BrowserWindow } = require('@electron/remote')

// В главном процессе:
require('@electron/remote/main').initialize()
```

### Устарело: `shell.moveItemToTrash()`

Синхронный `shell.moveItemToTrash()` был заменен новым, асинхронным `shell.trashItem()`.

```js
Deprecated в Electron 12
shell.moveItemToTrash (путь)
// Заменить
shell.trashItem (путь)....
```

## Запланированные критические изменения API (11.0)

### Удалено: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` и `id` имущество `BrowserView`

Экспериментальные API `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` уже удалены. Кроме того, `id` также `BrowserView` имущество компании.

Более подробную информацию можно получить в [#23578](https://github.com/electron/electron/pull/23578).

## Запланированные критические изменения API (10.0)

### Deprecated: `companyName` аргумент для `crashReporter.start()`

Аргумент `companyName` в `crashReporter.start()`, который ранее был , теперь не является обязательным, и далее, является депрекации. Чтобы получить тот же поведение в неуничижительной образом, вы можете пройти `companyName` значение в `globalExtra`.

```js
Deprecated в Electron 10
crashReporter.start ({ companyName: 'Umbrella Corporation' })
// Заменить
crashReporter.start (является globalExtra: { _companyName: 'Umbrella Corporation' } )
```

### Obsoleto: `crashReporter.getCrashesDirectory()`

Метод `crashReporter.getCrashesDirectory` был увеял. Использование должно быть заменено `app.getPath('crashDumps')`.

```js
Deprecated в Electron 10
crashReporter.getCrashesDirectory ()
// Заменить
app.getPath ('crashDumps')
```

### Deprecated: `crashReporter` методы в процессе рендерера

Вызов следующих `crashReporter` из процесса рендерера депретирован:

* `Отчет об ошибке.старте`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `вылетать Reporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

Единственными неуничиженными методами, оставшимися в `crashReporter` в , являются `addExtraParameter`, `removeExtraParameter` и `getParameters`.

Все вышеперечисленные методы остаются неуничиженными при призвании из основного процесса.

Подробности [#23265](https://github.com/electron/electron/pull/23265) подробнее.

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
Deprecated
protocol.unregisterProtocol (схема, () -> .

.
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
Deprecated
protocol.registerFileProtocol (схема, обработчик, () -> -
/)  // Заменить
protocol.registerFileProtocol (схема, обработчик)
```

Зарегистрированный или перехваченный протокол не влияет на текущую страницу до тех пор, пока не произойдет навигация.

### `protocol.isProtocolHandled`

Этот API является устаревшим, пользователи должны использовать `protocol.isProtocolRegistered` и `protocol.isProtocolIntercepted`.

```javascript
Deprecated
protocol.isProtocolHandled (схема


> ).
```

## Запланированные API изменения (9.0)

### По умолчанию изменено: Загрузка неконтекстных собственных модулей в процессе визуализации по умолчанию отключена

Начиная с 9 Electron мы не разрешаем загрузку неконтекстных родных модулей в процессе визуализации.  Это должно улучшить безопасность, производительность и сопровождаемость Electron в качестве проекта.

Если это повлияет, вы можете временно установить `app.allowRendererProcessReuse` в `false` , чтобы вернуться к старому поведению.  Этот флаг будет только опцией до тех пор, пока Electron 11 поэтому вы должны планировать обновить свои родные модули, чтобы они были понятными в контекстах.

Для подробностей см. [#18397](https://github.com/electron/electron/issues/18397).

### Deprecated: `BrowserWindow` api расширения

Следующие API-расширения были уветаны:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Вместо этого используйте API сеанса:

* `ses.loadExtension(path)`
* `ses.removeExtension (extension_id)`
* `ses.getAllExtensions()`

```js
Deprecated в Electron 9
BrowserWindow.addExtension (путь)
BrowserWindow.addDevToolsExtension (путь)
// Заменить на
session.defaultSession.loadExtension (путь)
```

```js
Deprecated в Electron 9
BrowserWindow.removeExtension (имя)
BrowserWindow.removeDevToolsExtension (имя)
// Заменить
session.defaultSession.removeExtension (extension_id)
```

```js
Deprecated в Electron 9
BrowserWindow.getExtensions ()
BrowserWindow.getDevToolsExtensions ()
// Заменить
session.defaultSession.getAllExtensions ()
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

Chromium убрал поддержку для изменения пределов уровня масштабирования макета, и это выходит за рамки возможностей Electron для его поддержания. Функция была увесервной в Electron 8.x, и была удалена в Electron 9.x. Пределы уровня масштабирования макета теперь фиксируются на уровне минимум 0,25 и максимум 5,0, как определено [здесь](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Изменено поведение: Отправка не JS объектов поверх IPC теперь выводит исключение

В Electron 8.0 IPC была изменена на использование алгоритма структурированного клонирования , что принесло существенные улучшения производительности. Чтобы облегчить переход, старый алгоритм сериализации IPC был сохранен и использован для некоторых объектов, которые не сериализуются с Structured Clone. В частности, DOM объекты (например, `Element`, `Location` и `DOMMatrix`), Node. с объектами, поддерживаемыми классами С++ (напр., `процесс). nv`, некоторые участники `Stream`), и объекты Electron с поддержкой C++ классов (например, `Содержимое WebContents`, `Окно браузера` и `WebFrame`) не сериализуется с Структурированным Клоном. Всякий раз, когда старый алгоритм был вызван, предупреждение об износе было напечатано.

В Electron 9. , старый сериализационный алгоритм был удален, и отправка таких несериализуемых объектов теперь вызовет ошибку "объект не может быть клонирован" .

### API изменен: `shell.openItem` теперь `shell.openPath`

API `shell.openItem` был заменен асинхронной командой `shell.openPath` API. Вы можете увидеть оригинальное предложение API и рассуждения [здесь](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Запланированные критические изменения API (8.0)

### Изменено поведение: Значения, отправленные над IPC, теперь сериализированы с структурированным алгоритмом клонирования

Алгоритм, используемый для сериализации объектов, отправленных по IPC (через `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` и связанные с ними методы ), был переключен с пользовательского алгоритма на встроенный V8 [Structured Clone Algorithm][SCA], тот же алгоритм, используемый для сериализации сообщений для `postMessage`. Это приводит к 2x улучшению производительности для больших сообщений, но и приносит некоторые изменения в поведении.

* Отправка функций, обещаний, WeakMaps, WeakSets или объектов, содержащих любые такие значения, над IPC теперь будет бросать исключение, а не молча преобразование функций в `undefined`.

```js
Ранее:
ipcRenderer.send ('канал', значение: 3, someFunction: () -> евро)
//> приводит к { value: 3 } прибытию в основной процесс

// От Electron 8:
ipcRenderer.send ('channel', Значение: 3, некоторыеФункция: ()> ))
//> бросает Ошибка ("()> не может быть клонирована.")
```

* `NaN`, `Infinity` и `-Infinity` теперь будут правильно сериализованы, а быть преобразованы в `null`.
* Объекты, содержащие циклические ссылки, теперь будут правильно сериализованы, вместо того, чтобы быть преобразованы `null`.
* `Set`, `Map`, `Error` и `RegExp` значения будут правильно сериализированы, вместо того, чтобы быть преобразованы в `{}`.
* `BigInt` значения будут правильно сериализованы, а не преобразованы в `null`.
* Редкие массивы будут сериализованы как таковые, вместо того, чтобы быть преобразованы в плотные массивы с `null`s.
* `Date` объекты будут передаваться в качестве `Date` объектов, вместо того, преобразуется в их представление строки ISO.
* Типированные массивы (такие как `Uint8Array`, `Uint16Array`, `Uint32Array` и так далее) будут переданы как таковые, вместо того, чтобы быть преобразованы в узел.js `Buffer`.
* Объекты .js `Buffer` будут передаваться в `Uint8Array`с. Вы преобразовать `Uint8Array` обратно в узел.js `Buffer` обернув основной `ArrayBuffer`:

```js
Buffer.from (value.buffer, value.byteOffset, value.byteLength)
```

Отправка любых объектов, которые не являются родными типами JS, таких как объекты DOM (например, `Element`, `Location`, `DOMMatrix`), узел.js объекты (например. `process.env`, `Stream`), или Электронные объекты (например. `WebContents`, `BrowserWindow`, `WebFrame`) является deprecated. В Electron 8 эти объекты будут сериализованы как раньше с сообщением DeprecationWarning, но, начиная с Electron 9, посылая такого рода объекты будут бросать 'не может быть клонирован' ошибка.

### Устарело: `<webview>.getWebContents()`

Этот API реализован с использованием модуля `remote` , который имеет как показатели производительности, так и последствия для безопасности. Поэтому его использование должно быть явным.

```js
Deprecated
webview.getWebContents ()
// Заменить
const { remote } - требуют ('электрон')
remote.webContents.fromId (webview.getWebContentsId())
```

Тем не менее, рекомендуется избегать использования модуля `remote` вообще.

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

Chromium убрал поддержку для изменения пределов уровня масштабирования макета, и это выходит за рамки возможностей Electron для его поддержания. Функция будет излучать предупреждающие в Electron 8.x, и прекратит свое существование в Electron 9.x. Уровень масштабирования макета ограничения теперь фиксируются как минимум на 0,25 и максимум 5,0, как определено [здесь](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### Deprecated события в `systemPreferences`

Следующие `systemPreferences` были увястаны:

* `перевернутый цвет-схема-изменена`
* `высоко контрастная цветовая схема-изменена`

Вместо этого используйте `updated` событие на `nativeTheme` модуле.

```js
Deprecated
systemPreferences.on ('перевернутый цвет-схема-изменен', () -> -
...  systemPreferences.on ('high-contrast-color-scheme-changed', () ->> 
( .

.
```

### Deprecated: методы в `systemPreferences`

Следующие `systemPreferences` были уветаны:

* `systemPreferences.isDarkMode()`
* `systemPreferences.isInvertedColorScheme()`
* `systemPreferences.isHighContrastColorScheme()`

Вместо этого используйте `nativeTheme` свойства:

* `nativeTheme.shouldUseDarkColors`
* `nativeTheme.shouldUseInvertedColorScheme`
* `nativeTheme.shouldUseHighContrastColors`

```js
Deprecated
systemPreferences.isDarkMode ()
// Заменить на
nativeTheme.shouldUseDarkColors

// Deprecated
systemPreferences.isInvertedColorScheme()
// Заменить
nativeTheme.shouldUseInvertedColorScheme

// Deprecated
systemPreferences.isHighContrastColorScheme()
// Заменить на
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

Свойство `webkitdirectory` на входах файла HTML позволяет им выбрать папки. Предыдущие версии Electron имели неправильную реализацию, `event.target.files` часть ввода возвращала `FileList` , который возвращал `File` соответствующий выбранной папке.

Начиная с Electron 7, этот `FileList` теперь список всех файлов, содержащихся в папке, подобно Chrome, Firefox и Edge ([ссылка на документацию MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

В качестве примера возьмите папку с этой структурой:

```console
папка
├» файл1
├ » файл2
└» файл3
```

В Electron <=6, это возвращает `FileList` с объектом `File` для:

```console
путь/к/папке
```

В Electron 7 теперь возвращает `FileList` с объектом `File` для:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

Обратите внимание, что `webkitdirectory` больше не открывает путь к выбранной папке. Если вам требуется путь к выбранной папке, а не содержимое папки, смотрите `dialog.showOpenDialog` API ([ссылку](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

### ИЗМЕНЕН API: Обратные версии непроверенных API

Electron 5 и Electron 6 представили версии существующих асинхронных API и обесчестили их старые, основанные на обратных вызовах аналоги. В Electron 7 все депрофилированные API на основе обратного вызова теперь удаляются.

Эти функции теперь возвращают только обещания:

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

Например, Повторное включение webviewTag

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

### API Изменено: `webContents.getZoomLevel` и `webContents.getZoomFactor` теперь синхронизированы

`webContents.getZoomLevel` и `webContents.getZoomFactor` больше не принимают параметры обратного вызова, вместо этого непосредственно возвращают значения их числа.

```js
Deprecated
webContents.get'oomLevel (((уровень) -> - консоль
  .log (уровень)
q)
// Заменить на
конст-уровня - webContents.get'oomLevel()
консоли.log (уровень)
```

```js
Deprecated
webContents.get'omFactor ((фактор) -> -
  консоль.log (фактор)
г.
// Заменить коэффициентом
const - webContents.get'omFactor ()
консоли.log (фактор)
```

## Запланированные критические изменения API (4.0)

Следующий список включает в себя критические изменения API, сделанные в Electron 4.0.

### `app.makeSingleInstance`

```js
Deprecated
app.makeSingleInstance ((argv, cwd)>
  /)
)/
// Заменить
app.requestSingleInstanceLock ()
app.on ('второй экземпляр', (событие, argv, cwd) -> -
  /
...
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
Deprecated
const optionsA - webPreferences: { blinkFeatures: '' } -
const windowA - новый BrowserWindow (optionsA)
// Заменить
const вариантами ВебПредсысов: { enableBlinkFeatures: '' }
const windowB - новый BrowserWindow (optionsB)

// Deprecated
window.on ('app-command', (e, cmd) ->
  если (cmd - 'media-play_pause') -
    // сделай что-нибудь

)
// Заменить
window.on ('app-command', (e, cmd) ->
  если (cmd - 'media-play-pause') -
    // сделать что-

)
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
