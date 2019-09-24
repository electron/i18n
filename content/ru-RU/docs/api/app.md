# app

> Контролируйте жизненный цикл Вашего приложения.

Процесс: [Основной](../glossary.md#main-process)

Этот пример показывает, как закрыть приложение, когда последнее окно будет закрыто:

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## События

Объект `app` имеет следующие события:

### Событие: 'will-finish-launching'

Происходит, когда приложение заканчивает основной запуск. На Windows и Linux событие `will-finish-launching` подобно событию `ready`; на macOS это событие представляет собой уведомление `applicationWillFinishLaunching` объекта `NSApplication`. Обычно настраивают слушателей для `open-file` и `open-url` событий, и запускают репортер сбоев и автоматическое обновление.

В большинстве случаев, Вы должны выполнять всё в обработчике события `ready`.

### Событие: 'ready'

Возвращает:

* `launchInfo` Object *macOS*

Происходит при завершении инициализации Electron. На macOS `launchInfo` содержит `userInfo` из `NSUserNotification`, которое было использовано для открытия приложения, если оно было запущено из центра уведомлений. Вы можете вызвать `app.isReady()` для того, чтобы проверить, произошло ли данное событие.

### Событие: 'window-all-closed'

Происходит при закрытии всех окон.

Если Вы не подпишитесь на это событие, и все окна будут закрыты, поведением по умолчанию является выход из приложения; Однако, если Вы подпишитесь, то Вы определяете, будет ли приложение закрыто или нет. Если пользователь нажал `Cmd + Q` или разработчик вызвал `app.quit()`, Electron сначала попытается закрыть все окна, а затем происходит событие `will-quit`, и в этом случае событие `window-all-closed` не будет происходить.

### Событие: 'before-quit'

Возвращает:

* `event` Event

Происходит перед тем, как приложение начнет закрывать окна. Вызывая `event.preventDefault()`, будет предотвращено поведение по умолчанию, которое завершает приложение.

**Примечание:** Если выход приложения было инициировано `autoUpdater.quitAndInstall()`, тогда `before-quit` происходит *после* того, как происходит событие `close` на всех окнах и закрывает их.

**Примечание:** На Windows это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'will-quit'

Возвращает:

* `event` Event

Происходит когда все окна были закрыты и приложение прекращает работу. Вызов `event.preventDefault()` предотвратит поведение по умолчанию, которое завершает приложение.

Смотрите описание события `window-all-closed` для различий между событиями `will-quit` и `window-all-closed`.

**Примечание:** На Windows это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'quit'

Возвращает:

* `event` Event
* `exitCode` Integer

Происходит при выходе из приложения.

**Примечание:** На Windows это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'open-file' *macOS*

Возвращает:

* `event` Event
* `path` String

Происходит, когда пользователь хочет открыть файл. Событие `open-file` обычно происходит, когда приложение уже открыто и ОС хочет переиспользовать приложение, чтобы открыть файл. `open-file` также происходит, когда файл уже находится на Dock панели, но приложение еще не запущено. Убедитесь, что обработчик события `open-file` в самом начале запуска Вашего приложения обрабатывает этот случай (даже прежде, чем происходит событие ` ready`).

Вы должны вызвать `event.preventDefault()`, если хотите обработать это событие.

На Windows Вам необходимо распарсить `process.argv` (в основном процессе), чтобы получить путь к файлу.

### Событие: 'open-url' *macOS*

Возвращает:

* `event` Event
* `url` String

Происходит, когда пользователь хочет открыть URL-адрес из приложения. Файл Вашего приложения `Info.plist` должен определять URL-схему в ключе `CFBundleURLTypes` и устанавливать `NSPrincipalClass` в значение `AtomApplication`.

Вы должны вызвать `event.preventDefault()`, если хотите обработать это событие.

### Событие: 'activate' *macOS*

Возвращает:

* `event` Event
* `hasVisibleWindows` Boolean

Происходит при активации приложения. Различные действия могут запускать это событие, например, запуск приложения в первый раз, попытка перезапустить приложение, когда оно уже запущено, или клик на иконку приложения на панели dock или панели задач.

### Событие: 'continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфическое для приложения состояние, сохраненное на другом устройстве.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когда активность с другого устройства хочет возобновиться. Если Вы хотите обработать это событие, следует вызвать `event.preventDefault()`.

Активность пользователя может быть продолжена только в приложении, которое имеет тот же ID команды разработчика, что и активность исходного приложения, и поддерживает тип активности. Поддерживаемые типы активности, указаны в `Info.plist` приложения под ключом `NSUserActivityTypes`.

### Событие: 'will-continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) до того, как активность с другого устройства хочет возобновиться. Если Вы хотите обработать это событие, следует вызвать `event.preventDefault()`.

### Событие: 'continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - cтрока с локализованным описанием ошибки.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), при ошибочном возобновлении активности на различных устройствах.

### Событие: 'activity-was-continued' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфичное, для приложения, состояние, сохраненное в хранилище по активности.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), после удачного возобновления на другом устройстве.

### Событие: 'update-activity-state' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфичное, для приложения, состояние, сохраняющееся в хранилище по активности.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когда вот-вот возобновится на другом устройстве. Если Вы хотите обновить состояние, которое будет передано, Вам необходимо вызвать `event.preventDefault()` немедленно, собрать новый словарь `userInfo` и вызвать `app.updateCurrentActivity()` своевременно. Иначе, операция завершится ошибкой и будет вызвано `continue-activity-error`.

### Событие: 'new-window-for-tab' *macOS*

Возвращает:

* `event` Event

Возникает, когда пользователь нажимает нативную macOS кнопку новой вкладки. Кнопка новой вкладки доступна только в том случае, если текущий `BrowserWindow` имеет `tabbingIdentifier`

### Событие: 'browser-window-blur'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда [browserWindow](browser-window.md) теряет фокус.

### Событие: 'browser-window-focus'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда [browserWindow](browser-window.md) получает фокус.

### Событие: 'browser-window-created'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда создался новый [browserWindow](browser-window.md).

### Событие: 'web-contents-created'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Происходит, когда создался новый [webContents](web-contents.md).

### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - код ошибки
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - учитывать ли сертификат, как надёжный

Происходит, когда не удалось проверить `certificate` для `url`, чтобы доверять сертификату, Вы должны предотвратить поведение по умолчанию с помощью `event.preventDefault()` и вызвать `callback(true)`.

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Сверка логики.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### Событие: 'select-client-certificate'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) (опционально)

Происходит, когда запрошен сертификат клиента.

`url` соответствует записи навигации, запрашивающей сертификат клиента, а `callback` можно вызвать с записью, отфильтрованной из списка. `event.preventDefault()` предотвращает использование первого сертификата из хранилища.

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### Событие: 'login'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

Происходит, когда `webContents` выполняет базовую аутентификацию.

Поведение по умолчанию - отмена всех аутентификаций. Чтобы переопределить это, Вы должны предотвратить поведение по умолчанию с помощью `event.preventDefault()` и вызвать `callback(username, password)` с учетными данными.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Событие: 'gpu-process-crashed'

Возвращает:

* `event` Event
* `killed` Boolean

Происходит, когда gpu процесс аварийно завершает работу или является убитым.

### Событие: 'renderer-process-crashed'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Происходит, когда графический процесс `webContents` аварийно завершает работу или является убитым.

### Событие: 'accessibility-support-changed' *macOS* *Windows*

Возвращает:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true`, когда поддержка доступности Chrome включена, иначе `false`.

Возникает при изменении Chrome поддержки специальных возможностей. Это событие срабатывает, когда вспомогательные технологии, такие как устройства чтения с экрана, включены или отключены. См. https://www.chromium.org/developers/design-documents/accessibility для подробностей.

### Событие: 'session-created'

Возвращает:

* `session` [Session](session.md)

Происходит, когда Electron создал новый объект `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Событие: 'second-instance'

Возвращает:

* `event` Event
* `argv` String [] - массив аргументов командной строки вторичных экземпляров
* `workingDirectory` String - рабочий каталог вторичных экземпляров

Это событие произойдет внутри главного экземпляра Вашего приложения, когда второй экземпляр был запущен и вызывает `app.requestSingleInstanceLock()`.

`argv` это массив аргументов командной строки второго экземпляра, а `workingDirectory` это текущий рабочий каталог. Обычно приложения реагируют на это, делая их основное окно сфокусированным и не свернутым.

Это событие гарантировано происходит после события `ready` в `app`.

**Примечание:** Дополнительные аргументы командной строки могут быть добавлены Chromium, такие как `--original-process-start-time`.

### Событие: 'desktop-capturer-get-sources'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Происходит, когда `desktopCapturer.getSources()` вызвано в графическом процессе `webContents`. Вызов `event.preventDefault()` вернет пустые источники.

### Событие: 'remote-require'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Происходит, когда функция `remote.require()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат модуля. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

### Событие: 'remote-get-global'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Происходит, когда функция `remote.getGlobal()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат глобального значения. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

### Событие: 'remote-get-builtin'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Происходит, когда функция `remote.getBuiltin()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат модуля. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

### Событие: 'remote-get-current-window'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Происходит, когда функция `remote.getCurrentWindow()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

### Событие: 'remote-get-current-web-contents'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Происходит, когда функция `remote.getCurrentWebContents()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

### Событие: 'remote-get-current-web-contents'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Происходит, когда функция `<webview>.getWebContents()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

## Методы

Объект `app` имеет следующие методы:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

### `app.quit()`

Попытка закрыть все окна. Сначала возникнет событие `before-quit`. Если все окна успешно закрыты, событие `will-quit` возникнет и по умолчанию приложение будет завершено.

Этот метод гарантирует, что все обработчики событий `beforeunload` и `unload` выполнятся корректно. Вполне возможно, что окно отменит выход, возвращая `false` в обработчике событий `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (опционально)

Немедленно выходит с `exitCode`. `exitCode` по умолчанию 0.

Все окна будут закрыты немедленно, без разрешения пользователя, а также события `before-quit` и `will-quit` не будут происходить.

### `app.relaunch([options])`

* `options` Object (опционально) 
  * `args` String[] (опционально)
  * `execPath` String (опиционально)

Перезапускает приложение, когда существует текущий экземпляр.

По умолчанию, новый экземпляр будет использовать ту же самую рабочий каталог и аргументы командной строки, что и текущий экземпляр. Когда `args` указан, `args` передаются как аргументы командной строки. Когда задано значение `execPath`, `execPath` будет выполняться для перезапуска, вместо текущего приложения.

Обратите внимание, что этот метод не завершает приложение при выполнении, Вам нужно вызвать `app.quit` или `app.exit` после вызова `app.relaunch`, чтобы перезапустить приложение.

Когда `app.relaunch` вызывается несколько раз, несколько экземпляров будет запущено, после выхода из текущего экземпляра.

Пример немедленного перезапуска текущего экземпляра и добавления нового аргумента командной строки в новый экземпляр:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Возвращает `Boolean` - `true`, если Electron завершил инициализацию, иначе `false`.

### `app.whenReady()`

Возвращает `Promise<void>` - выполняется, когда Electron инициализирован. Может быть использован в качестве удобной альтернативы проверки `app.isReady()` и подписывания на событие `ready`, если приложение еще не готово.

### `app.focus()`

На Linux перемещает фокус на первое видимое окно. На macOS делает приложение активным. На Windows перемещает фокус на первое окно приложения.

### `app.hide()` *macOS*

Скрывает все окна приложения, не минимизируя их.

### `app.show()` *macOS*

Показывает окна приложения, после того как они были скрыты. Фокус не будет перемещён автоматически.

### `app.setAppLogsPath(path)`

* `path` String (опционально) - пользовательский путь для Ваших логов. Должен быть абсолютным.

Устанавливает или создает каталог логов Вашего приложения, которые затем могут быть обработаны с помощью `app.getPath()` или `app.setPath(pathName, newPath)`.

Вызывая `app.setAppLogsPath()` без параметра `path` приведет к тому, что эта директория будет установлена на `/Library/Logs/YourAppName` на *macOS*, и внутри директории `userData` на *Linux* и *Windows*.

### `app.getAppPath()`

Возвращает `String` - текущий каталог приложения.

### `app.getPath(name)`

* `name` String

Возвращает `String` - путь в специальный каталог или файл, ассоциированный с `name`. В случае неудачи возникает `Error`.

Вы можете запросить следующие пути по их имени:

* `home` домашний каталог пользователя.
* `appData` каталог данных приложений для каждого пользователя, который по умолчанию указывает на: 
  * `%APPDATA%` на Windows
  * `$XDG_CONFIG_HOME` или `~/.config` на Linux
  * `~/Library/Application Support` на macOS
* `userData` каталог для хранения файлов конфигурации Вашего приложения, который по умолчанию является каталогом `appData` с именем Вашего приложения в конце.
* `temp` временный каталог.
* `exe` текущий исполняемый файл.
* `module` библиотека `libchromiumcontent`.
* `desktop` каталог рабочего стола текущего пользователя.
* `documents` каталог пользователя для документов.
* `downloads` каталог пользователя для загрузок.
* `music` каталог пользователя для музыки.
* `pictures` каталог пользователя для фотографии.
* `videos` каталог пользователя для видео.
* `logs` каталог для логов Вашего приложения.
* `pepperFlashSystemPlugin` путь к плагину Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (опционально) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не поддерживается на *macOS*.
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Извлекает значок, ассоциированный с путем.

На *Window*, есть 2 типа иконок:

* Иконки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Иконки внутри файла, таких как `.exe`, `.dll` и `.ico`.

На *Linux* и *macOS* иконки зависят от приложения, ассоциируемого с mime-типом файла.

**[Скоро устареет](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (опционально) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не поддерживается на *macOS*.

Возвращает `Promise<NativeImage>` - содержащий иконку приложения, которая является [NativeImage](native-image.md).

Извлекает значок, ассоциируемый с путем.

На *Windows*, есть 2 вида значков:

* Значки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Значки внутри файла, таких как `.exe`, `.dll`, `.ico`.

На *Linux* и *macOS* иконки зависят от приложения, ассоциируемого с mime-типом файла.

### `app.setPath(name, path)`

* `name` String
* `path` String

Переопределяет `path` в специальный каталог или файл, связанный с `name`. Если путь задает каталог, который не существует, то при вызове выбросится `Error`. В этом случае каталог должен быть создан с помощью `fs.mkdirSync` или аналогичным способом.

Можно переопределять только пути `name`, определенные в `app.getPath`.

По умолчанию cookies и кэш веб-страницы будут храниться в каталоге `userData`. Если Вы хотите изменить это расположение, Вам необходимо переопределить путь `userData` прежде, чем событие `ready` модуля `app` возникнет.

### `app.getVersion()`

Возвращает `String` - версия загруженного приложения. Если версия не найдена в файле приложения `package.json`, возвращается версия текущего пакета или исполняемого файла.

### `app.getName()`

Возвращает `String` - имя текущего приложения, которое является именем в файле приложения `package.json`.

Обычно поле `name` в `package.json` является коротким именем в нижнем регистре, согласно спецификации модулей npm. Обычно Вы должны также указать поле `productName`, которое пишется заглавными буквами - имя Вашего приложения, и которое будет предпочтительнее `name` для Electron.

### `app.setName(name)`

* `name` String

Переопределяет имя текущего приложения.

### `app.getLocale()`

Возвращает `String` - текущий языка приложения. [Здесь](locales.md) описаны возможные возвращаемые значения.

Для установки языка Вам потребуется использовать переключатель командной строки во время запуска приложения, который можно найти [здесь](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Примечание:** При распространении упакованного приложения, нужно также добавить папку `locales`.

**Примечание** На Windows Вы должны вызывать этот метод после того, как событие `ready` произойдет.

### `app.getLocaleCountryCode()`

Возвращает `String` - локализацию операционной системы пользователя в формате двух-символьного кода страны [ISO 3166](https://www.iso.org/iso-3166-country-codes.html). Значение взято из нативных API ОС.

**Примечание:** Когда невозможно определить код страны языка, возвращает пустую строку.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавляет `path` к списку последних документов.

Этот список управляется ОС. На Windows Вы можете увидеть список на панели задач, а на macOS Вы можете увидеть список в меню dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Очищает список последних документов.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя Вашего протокола, без `://`. Если Вы хотите, чтобы Ваше приложение обрабатывала ссылки `electron://`, вызовите этот метод с `electron` в качестве параметра.
* `path` String (опционально) *Windows* - по умолчанию `process.execPath`
* `args` String[] (опционально) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод устанавливает текущий исполняемый файл в качестве обработчика по умолчанию для протокола (так называемая схема URI). Это позволяет Вам интегрировать приложение глубже в операционную систему. После регистрации, все ссылки с `ваш_протокол://` будут открываться текущим исполняемым файлом. Вся ссылка, включая протокол, будет передаваться в Ваше приложение в качестве параметра.

На Windows Вы можете предоставить дополнительные параметры: path - путь до Вашего исполняемого файла, и args - массив аргументов, который будет передан Вашему исполняемому файлу при его запуске.

**Примечание:** На macOS Вы можете регистрировать только те протоколы, которые были добавлены в `info.plist` Вашего приложения, которое не может быть модифицирована во время выполнения. Однако Вы можете изменить файл с помощью простого текстового редактора или скрипта во время сборки. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

**Примечание:** В окружении Windows Store (когда упаковано как `appx`) этот метод вернет `true` для всех вызовов, но ключ реестра, который он устанавливает, не будет доступен другим приложениям. Чтобы зарегистрировать Ваше приложения в Windows Store как обработчик протокола по умолчанию, Вы должны [объявить протокол в Вашем манифесте](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

Метод использует внутренний реестр Windows и LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - имя Вашего протокола, без `://`.
* `path` String (опционально) *Windows* - по умолчанию `process.execPath`
* `args` String[] (опционально) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так называемая схема URI). Если является, то убирает приложение, как обработчик по умолчанию.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя Вашего протокола, без `://`.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean`

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так называемая схема URI). Если является, то возвращает true. Иначе возвращает false.

**Примечание:** На macOS можно использовать этот метод для проверки, если приложение было зарегистрировано в качестве обработчика протокола по умолчанию для протокола. Вы также можете проверить это, проверив `~/Library/Preferences/com.apple.LaunchServices.plist` на машине macOS. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme).

Метод использует внутренний реестр Windows и LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - массив объектов `Task`

Добавляет `tasks` к категории [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) в списке переходов на Windows.

`tasks` - массив объектов [`Task`](structures/task.md).

Возвращает `Boolean` - был ли вызов успешным.

**Примечание:** Если Вы хотите настроить список переходов еще больше, используйте `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Возвращает `Object`:

* `minItems` Integer - минимальное количество элементов, которые будут показаны в списке переходов (для более подробного описания этого значение см. [документацию MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - массив объектов `JumpListItem`, которые соответствуют элементам, которые пользователь явно удалил из пользовательских категорий в списке переходов. Эти элементы не должны быть снова добавлены в список переходов, при **следующем** вызове `app.setJumpList()`, Windows не будет отображать любую пользовательскую категорию, содержащую любой из удаленных пунктов.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) или `null` - массив объектов `JumpListCategory`.

Задает или удаляет настраиваемый список переходов для приложения и возвращает одну из следующих строк:

* `ok` - ничего не случилось.
* `error` - произошла одна или несколько ошибок, включите ведение журнала выполнения, чтобы выяснить возможную ошибку.
* `invalidSeparatorError` - была сделана попытка добавить разделитель в пользовательскую категорию в списке переходов. Разделители разрешены только в стандартной категории `Tasks`.
* `fileTypeRegistrationError` - была сделана попытка добавить ссылку на файл в список переходов для типа файла, который в приложении не зарегистрирован для обработки.
* `customCategoryAccessDeniedError` - пользовательские категории не могут быть добавлены в список переходов из-за ограничений конфиденциальности пользователей или групповой политики.

Если `categories` - `null`, то ранее установленный пользовательский список переходов (если таковой имеется) будет заменён стандартным списком переходов для приложения (управляется Windows).

**Примечание:** Если объект `JumpListCategory` не имеет ни `type`, ни `name` свойств, тогда `type` считается `tasks`. Если свойство `name` установлено, но свойство `type` опущено, тогда `type` считается `custom`.

**Примечание:** Пользователи могут удалять элементы из пользовательских категорий, но Windows не будет позволять возвращать удаленный элемент в пользовательскую категорию до **последующего** удачного вызова `app.setJumpList(categories)`. Любая попытка вновь добавить удаленный элемент в пользовательскую категорию раньше, чем это приведёт к созданию всей пользовательской категории, исключается из списка переходов. Список удаленных элементов можно получить с помощью `app.getJumpListSetting()`.

Вот очень простой способ, как создать пользовательский список переходов:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Недавние проекты',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // Есть имя, так что под `type` подразумевается "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Инструмент А',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запустить инструмент A'
      },
      {
        type: 'task',
        title: 'Инструмент Б',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запустить инструмент Б'
      }
    ]
  },
  { type: 'frequent' },
  { // Нет имени и типа, так что под `type` подразумевается "tasks"
    items: [
      {
        type: 'task',
        title: 'Новый проект',
        program: process.execPath,
        args: '--new-project',
        description: 'Создать новый проект.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Восстановить проект',
        program: process.execPath,
        args: '--recover-project',
        description: 'Восстановить проект'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Возвращает `Boolean`

Значение, которое возвращает этот метод, указывает, успешно или нет экземпляр Вашего приложения получило блокировку. Если не удалось получить блокировку, можно предположить, что другой экземпляр Вашего приложения уже запущен с блокировкой и немедленно выходит.

Т.е. этот метод возвращает `true`, если Ваш процесс является основным экземпляром Вашего приложения, а Ваше приложение должно продолжать загружаться. Возвращает `false`, если Ваш процесс должен немедленно завершиться, так как он отправил свои параметры другому экземпляру, который уже приобрел блокировку.

На macOS система автоматически обеспечивает единственный экземпляр, когда пользователи пытаются открыть второй экземпляра Вашего приложения в Finder, для этого будут происходить события `open-file` и `open-url`. Так или иначе, когда пользователи запустят Ваше приложение через командную строку, системный механизм единственного экземпляра будет обойден, и Вы должны использовать этот метод, чтобы обеспечить единственный экземпляр.

Пример активации окна первичного экземпляра, при запуске второго экземпляра:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Кто-то пытался запустить второй экземпляр, мы должны сфокусировать наше окно.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Создать myWindow, загрузить остальную часть приложения, и т.д.
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Возвращает `Boolean`

Этот метод возвращает состояние, является или нет экземпляр Вашего приложения в данный момент, удерживающим блокировку единственного экземпляра. Вы можете запросить блокировку с помощью `app.requestSingleInstanceLock()` и освободить с помощью `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Освобождает все блокировки, которые были созданы при помощи `requestSingleInstanceLock`. Это позволит нескольким экземплярам приложения снова работать бок о бок.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - уникально определяет действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - специфичное, для приложения, состояние для использования на других устройствах.
* `webpageURL` String (опционально) - веб-страница для загрузки в браузере, если нет подходящего приложения, установленного на проснувшемся устройстве. Схема должна быть `http` или `https`.

Создает `NSUserActivity` и задает её в качестве текущей активности. Активность позже имеет право для [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) на другом устройстве.

### `app.getCurrentActivityType()` *macOS*

Возвращает `String` - тип текущей выполняемой активности.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - уникально идентифицирует действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Аннулирует текущую [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) активность пользователя.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - уникально идентифицирует действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - специфичное, для приложения, состояние для использование другими устройствами.

Обновляет текущую активность, если его тип совпадает с `type`, объединяет записи из `userInfo` в его текущем словаре `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Изменяет [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - путь к pkcs12 файлу.
  * `password` String - парольная фраза для сертификата.
* `callback` Function 
  * `result` Integer - результат импорта.

Импортирует сертификат в формате pkcs12 в хранилище сертификатов платформы. `callback` вызывается с `result` - результат операции импорта, значение `0` указывает на успех, все другие значения указывают на ошибку в соответствии со списком [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) в Chromium.

### `app.disableHardwareAcceleration()`

Отключает аппаратное ускорение для текущего приложения.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.disableDomainBlockingFor3DAPIs()`

По умолчанию Chromium отключает 3D интерфейсы API (например, WebGL) до перезагрузки на основе домена, если GPU обрабатывает сбои слишком часто. Эта функция отключает поведение.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.getAppMetrics()`

Возвращает [`ProcessMetric[]`](structures/process-metric.md): массив объектов `ProcessMetric`, которые соответствует статистике использования памяти всех процессов, связанных с приложением.

### `app.getGPUFeatureStatus()`

Возвращает [`GPUFeatureStatus`](structures/gpu-feature-status.md) - статус функции графики из `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - значения могут быть либо `basic`, для базовой информации, либо `complete`, для полной информации.

Возвращает `Promise`

Для `infoType` равным `complete`: Промис выполняется с `объектом`, содержащий всю GPU информацию как в [объекте GPUInfo в chromium](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). Это включает информацию о версии и драйвере, показанную на странице `chrome://gpu`.

Для `infoType` равным `basic`: Промис выполняется с `объектом`, содержащий меньшее количество атрибутов, чем когда запрашивается с `complete`. Вот пример базового ответа:

```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```

Использование `basics` должно быть предпочтительным, если требуется только основная информация, такая как `vendorId` или `driverId`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Возвращает `Boolean` - был ли вызов успешным.

Задает счетчик-значок для текущего приложения. При значении счетчика `0` значок будет скрыт.

На macOS показывается на иконке в dock. На Linux только работает для лаунчера Unity.

**Примечание:** Лаунчер Unity требует существование файла `.desktop` для работы, для большей информации, пожалуйста, прочитайте [интеграцию окружения рабочего стола](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Возвращает `Integer` - текущее значение, отображаемое в значке-счетчика.

### `app.isUnityRunning()` *Linux*

Возвращает `Boolean` - является ли текущее окружение рабочего стола лаунчером Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (опционально) 
  * `path` String (опционально) *Windows* - исполняемый путь для сравнения. По умолчанию `process.execPath`.
  * `args` String [] (опционально) *Windows* - аргументы командной строки для сравнения. По умолчанию пустой массив.

Если Вы предоставили параметры `path` и `args` в `app.setLoginItemSettings`, тогда Вам необходимо передать те же аргументы сюда, чтобы `openAtLogin` установилось корректно.

Возвращает `Object`:

* `openAtLogin` Boolean - `true`, если приложение открывается при входе в систему.
* `openAsHidden` Boolean *macOS* - `true`, если приложение должно запускаться скрытым при входе в систему. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true`, если приложение было открыто автоматически при входе в систему. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true`, если приложение было запущено в качестве скрытого элемента при входе в систему. Это означает, что приложению не следует открывать любое окно при запуске. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true`, если приложение было открыто как элемент входа, который должен восстановить состояние с предыдущего сеанса. Это означает, что приложение должно восстановить окна, которые были открыты в последний раз, когда приложение было закрыто. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (опционально) - `true`, чтобы открыть приложение при входе в систему, `false`, чтобы удалить приложение в качестве элемента входа. По умолчанию `false`.
  * `openAsHidden` Boolean (опционально) *macOS* - `true`, чтобы открыть приложение как скрытое. Значение по умолчанию: `false`. Пользователь может редактировать этот параметр в системных настройках, так что `app.getLoginItemSettings().wasOpenedAsHidden` должно быть проверено, когда приложение открыто, чтобы узнать текущее значение. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (опционально) *Windows* - исполняемый файл для запуска при входе в систему. По умолчанию `process.execPath`.
  * `args` String[] (опционально) *Windows* - аргументы командной строки для передачи исполняемому файлу. По умолчанию пустой массив. Позаботьтесь обернуть путь кавычками.

Установите приложению параметры при входе в систему.

Для работы с Electron `autoUpdater` на Windows, который использует [Squirrel](https://github.com/Squirrel/Squirrel.Windows), Вы можете задать путь запуска Update.exe и передать аргументы, которые указывают на имя приложения. Например:

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Возвращает `Boolean` - `true`, если включена поддержка специальных возможностей Chrome, иначе `false`. Этот метод будет возвращать `true`, если обнаружено использование вспомогательных технологий, таких как средства чтения с экрана. См. https://www.chromium.org/developers/design-documents/accessibility для подробностей.

**[Скоро устареет](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - включить или отключить отображение [древа специальных возможностей](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Вручную включает поддержку специальных возможностей от Chrome, позволяя пользователям открывать специальные возможности в настройках приложения. См. [документацию специальных возможностей Chromium](https://www.chromium.org/developers/design-documents/accessibility) для подробной информации. Отключено по умолчанию.

Этот метод должен вызываться после того, как произошло событие `ready`.

**Примечание:** Отображение древа специальных возможностей может повлиять на производительность Вашего приложения. Не должно быть включенным по умолчанию.

**[Скоро устареет](modernization/property-updates.md)**

### `app.showAboutPanel` *macOS* *Linux*

Показывает параметры панели о приложении. Эти параметры могут быть переопределены с помощью `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Object 
  * `applicationName` String (опционально) - имя приложения.
  * `applicationVersion` String (опционально) - версия приложения.
  * `copyright` String (опционально) - информация авторских прав.
  * `version` String (опционально) - номер версии сборки приложения. *macOS*
  * `credits` String (опционально) - информация об авторах. *macOS*
  * `website` String (опционально) - веб-сайт приложения. *Linux*
  * `iconPath` String (опционально) - путь до иконки приложения. Будет показано как 64x64 пикселей с сохранением пропорций. *Linux*

Устанавливает параметры панели о приложении. Это переопределит значения, определенные в файле приложения `.plist` на macOS. См. [документацию Apple](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) для подробной информации. На Linux необходимо устанавливать все значения; по умолчанию значений нет.

### `app.isEmojiPanelSupported`

Возвращает `Boolean` - позволяет или нет текущая версия ОС выбирать нативные эмодзи.

### `app.showEmojiPanel` *macOS* *Windows*

Показывает нативный выбор эмодзи.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - закодированные base64 данные закладки области безопасности, возвращаемые `dialog.showOpenDialog` или `dialog.showSaveDialog`.

Возвращает `Function`. Эта функция **должна** быть вызвана после того, как Вы завершили использовать файл области безопасности. Если Вы забыли запретить доступ к закладке, [возможно утечка ресурсов ядра](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) и Ваше приложение потеряет свою способность выйти за пределы песочницы, пока не будет перезапущено.

```js
// Получение доступа к файлу.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// Теперь у Вас есть доступ к файлу вне песочницы 
stopAccessingSecurityScopedResource()
```

Начинает доступ в область безопасности ресурса. С помощью этого метода Electron приложения, которые упакованы для Mac App Store, могут выходить за пределы их песочницы, чтобы получить файлы, выбранные пользователем. Описание того, как работает эта система, см. в [документации Apple](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16).

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - переключатель командной строки, без ведущего `--`
* `value` String (опционально) - значение для данного переключателя

Добавляет переключатель (с опциональным значением `value`) в командную строку Chromium.

**Примечание:** Это не повлияет на `process.argv`. Предназначенное использование этой функции - контролирование поведения Chromium.

### `app.commandLine.appendArgument(value)`

* `value` String - аргумент для добавления в командную строку

Добавляет аргумент в командную строку Chromium. Аргумент будет правильно заключен в кавычки. Переключатели будут предшествовать аргументам, независимо от порядка добавления.

Если Вы добавляете аргумент, такой как `--switch=value`, вместо этого рассмотрите использование `appendSwitch('switch', 'value')`.

**Примечание:** Это не повлияет на `process.argv`. Предназначенное использование этой функции - контролирование поведения Chromium.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - переключатель командной строки

Возвращает `Boolean` - есть или нет переключатель командной строки.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - переключатель командной строки

Возвращает `String` - значение переключателя командной строки.

**Примечание:** Когда переключатель не присутствует или не имеет значения, возвращает пустую строку.

### `app.enableSandbox()` *Experimental*

Включает полноценный режим песочницы в приложении.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.isInApplicationsFolder()` *macOS*

Возвращает `Boolean` - выполняется ли приложение сейчас из системной папки Application. Используется совместно с `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Возвращает `Boolean` - было ли перемещение удачным. Пожалуйста, обратите внимание, что если перемещение было успешным, то Ваше приложение будет закрыто и перезапущено.

Диалог подтверждения не будет представлен по умолчанию. Если Вы хотите позволить пользователям подтверждать операцию, Вы можете сделать это, используя API [`dialog`](dialog.md).

**Примечание:** Этот метод вызывает ошибки, если что-нибудь, кроме пользователя, приводит к сбою перемещения. Например, если пользователь отменяет диалоговое окно авторизации, этот метод возвращает false. Если нам не удастся выполнить копирование, этот метод вызовет ошибку. Сообщение об ошибке должно быть информативным и скажет Вам, что действительно пошло не так

### `app.dock.bounce([type])` *macOS*

* `type` String (опционально) - может быть `critical` или `informational`. По умолчанию `informational`

Когда передается `critical`, значок dock будет отскакивать, пока приложение не станет активным или запрос отменился.

Когда передается `informational`, значок dock будет отскакивать в течение одной секунды. Однако запрос остается до тех пор, пока приложение не станет активным или запрос отменился.

Возвращает `Integer` - ID, представляющий запрос.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Отменить отскок по `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Отскакивает от загрузок, если путь к файлу находится в папке загрузок.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Устанавливает строку для отображения в зоне значка панели dock.

### `app.dock.getBadge()` *macOS*

Возвращает `String` - строка значка в dock.

### `app.dock.hide()` *macOS*

Скрывает значок в dock.

### `app.dock.show()` *macOS*

Возвращает `Promise<void>` - выполняется, когда показан значок dock.

### `app.dock.isVisible()` *macOS*

Возвращает `Boolean` - виден или нет значок dock.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Устанавливает [dock-меню](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) приложения.

### `app.dock.getMenu()` *macOS*

Возвращает `Menu | null` - [dock-меню](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) приложения.

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image`, ассоциируемый со значком в dock.

## Свойства

### `app.applicationMenu`

Свойство `Menu`, которое возвращает [`Menu`](menu.md), если было установлено, иначе `null`. Пользователи могут передать [Menu](menu.md), чтобы установить это свойство.

### `app.accessibilitySupportEnabled` *macOS* *Windows*

`Boolean` свойство, которое `true`, если поддержка специальных возможностей Chrome включена, иначе `false`. Это свойство будет `true`, если использование вспомогательных технологий, таких как средства чтения с экрана, были обнаружены. Устанавливая это свойство на `true`, вручную включает поддержку специальных возможностей Chrome, позволяя разработчикам показать пользователю переключатели специальных возможностей в настройках приложения.

См. [документацию специальных возможностей Chromium](https://www.chromium.org/developers/design-documents/accessibility) для подробностей. Отключено по умолчанию.

Этот метод должен вызываться после того, как произошло событие `ready`.

**Примечание:** Отображение древа специальных возможностей может повлиять на производительность Вашего приложения. Не должно быть включенным по умолчанию.

### `app.userAgentFallback`

`Строка`, которая является строкой агента пользователя, которую Electron будет использовать в качестве глобального запаса.

Это агент пользователя, который будет использоваться, если ни один агент пользователя не установлен на уровнях `webContents` или `session`. Полезно для обеспечения всему Вашему приложению иметь один и тот же пользовательский агент. Установите пользовательское значение как можно раньше в инициализации Ваших приложений, чтобы убедиться, что используется переопределенное значение.

### `app.isPackaged`

`Boolean` свойство, которое возвращает `true`, если приложение упаковано, иначе `false`. Для многих приложений это свойство может использоваться для отличия среды разработки и продакшна.

### `app.allowRendererProcessReuse`

`Boolean`, которое, когда `true`, отключает переопределения, которые Electron имеет на месте, чтобы убедиться, что графические процессы перезапускаются при каждой навигации. Текущее значение по умолчанию для этого свойства - `false`.

Цель заключается в том, чтобы эти переопределения были отключены по умолчанию, а затем, в некоторой точке в будущем, это свойство будет удалено. Это свойство влияет на то, какие нативные модули можно использовать в графическом процессе. Для большей информации о том, как Electron перезапускает графический процесс и использует нативные модули в графическом процессе, пожалуйста, проверьте этот [отслеживаемый вопрос](https://github.com/electron/electron/issues/18397).