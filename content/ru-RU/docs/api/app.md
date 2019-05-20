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

**Примечание:** На Windows, это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'will-quit'

Возвращает:

* `event` Event

Происходит когда все окна были закрыты и приложение прекращает работу. Вызов `event.preventDefault()` предотвратит поведение по умолчанию, которое завершает приложение.

Смотрите описание события `window-all-closed` для различий между событиями `will-quit` и `window-all-closed`.

**Примечание:** На Windows, это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'quit'

Возвращает:

* `event` Event
* `exitCode` Integer

Происходит при выходе из приложения.

**Примечание:** На Windows, это событие не произойдет, если приложение закрылось из-за выключения/перезагрузки системы или выхода пользователя из системы.

### Событие: 'open-file' *macOS*

Возвращает:

* `event` Event
* `path` String

Происходит, когда пользователь хочет открыть файл. Событие `open-file` обычно происходит, когда приложение уже открыто и ОС хочет переиспользовать приложение, чтобы открыть файл. `open-file` также происходит, когда файл уже находится на Dock панели, но приложение еще не запущено. Убедитесь, что обработчик события `open-file` в самом начале запуска Вашего приложения обрабатывает этот случай (даже прежде, чем происходит событие ` ready`).

Вы должны вызвать `event.preventDefault()`, если хотите обработать это событие.

На Windows, Вам необходимо распарсить `process.argv` (в основном процессе), чтобы получить путь к файлу.

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

### Событие: 'accessibility-support-changed' *macOS* *Windows*

Возвращает:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true`, когда включена поддержка специальных возможностей от Chrome, иначе `false`.

Происходит, когда поддержка доступности от Chrome изменяется. Это событие срабатывает, когда вспомогательные технологии, такие как устройства чтения с экрана, включены или отключены. Смотрите https://www.chromium.org/developers/design-documents/accessibility для подробностей.

### Событие: 'session-created'

Возвращает:

* `session` [Session](session.md)

Происходит после создания новой сессии `session`.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### Событие: 'second-instance'

Возвращает:

* `event` Event
* `argv` String [] - массив аргументов командной строки второго экземпляра
* `workingDirectory` String - рабочий каталог второго экземпляра

Это событие произойдет в основном экземпляре приложения, когда второй экземпляр будет выполнен. `argv` является массивом аргументов командной строки второго экземпляра приложения, а `workingDirectory` является его текущим рабочим каталогом. Обычно приложения реагируют на это, делая их основное окно сфокусированным и развернутым.

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

### Событие: 'remote-get-guest-web-contents'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Происходит, когда функция `<webview>.getWebContents()` вызвана в графическом процессе `webContents`. Вызов `event.preventDefault()` предотвращает возврат объекта. Пользовательское значение может быть возвращено, если установить его в `event.returnValue`.

## Методы

Объект `app` имеет следующие методы:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

### `app.quit()`

Попытка закрыть все окна. Сначала произойдет событие `before-quit`. Если все окна успешно закрыты, событие `will-quit` возникнет и по умолчанию приложение будет завершено.

Этот метод гарантирует, что все обработчики событий `beforeunload` и `unload` выполнятся корректно. Вполне возможно, что окно отменит выход, возвращая `false` в обработчике событий `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (опционально)

Выйти немедленно с `exitCode`. `exitCode` по умолчанию 0.

Все окна будут закрыты немедленно, без разрешения пользователя, а также события `before-quit` и `will-quit` не будут происходить.

### `app.relaunch([options])`

* `options` Object (опционально) 
  * `args` String[] (опционально)
  * `execPath` String (опционально)

Перезапускает приложение, когда существует текущий экземпляр.

По умолчанию, новый экземпляр будет использовать ту же самую рабочую директорию и аргументы командной строки, что и текущий экземпляр. Когда `args` указаны, `args` передадутся как аргументы командной строки. Когда `execPath` задан, вместо текущего приложения будет выполнен `execPath` для перезапуска.

Обратите внимание, что этот метод не завершает приложение при выполнении, Вам нужно вызвать `app.quit` или `app.exit` после вызова `app.relaunch`, чтобы перезапустить приложение.

Когда `app.relaunch` вызывается несколько раз, несколько экземпляров будет запущено после выхода из текущего экземпляра.

Пример немедленного перезапуска текущего экземпляра и добавления нового аргумента в командную строку нового экземпляра:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Возвращает `Boolean` - `true,` если Electron завершил инициализацию, иначе `false`.

### `app.whenReady()`

Возвращает `Promise<void>` - выполняется при инициализации Electron. Может быть использован в качестве удобной альтернативы проверки `app.isReady()` и подписывания на событие `ready`, если приложение еще не готово.

### `app.focus()`

На Linux, фокусируется на первое видимое окно. На macOS, делает приложение активным. На Windows, фокусируется на первое окно приложения.

### `app.hide()` *macOS*

Скрывает все окна приложения, не минимизируя их.

### `app.show()` *macOS*

Показывает окна приложения, после того как они были скрыты. Не фокусирует их автоматически.

### `app.getAppPath()`

Возвращает `String` - текущая директория приложения.

### `app.getPath(name)`

* `name` String

Возвращает `String` - путь в специальную директорию или файл, ассоциированный с `name`. В случае неудачи возникает `Error`.

Вы можете запросить следующие пути по имени:

* `home` домашняя директория пользователя.
* `appData` директория данных приложения для каждого пользователя, которая по умолчанию указывает на: 
  * `%APPDATA%` на Windows
  * `$XDG_CONFIG_HOME` или `~/.config` на Linux
  * `~/Library/Application Support` на macOS
* `userData` директория для хранения файлов конфигурации Вашего приложения, которая по умолчанию является директорией `appData` с названием Вашего приложения в конце.
* ` temp ` временная директория.
* `exe` текущий исполняемый файл.
* `module` библиотека `libchromiumcontent`.
* `desktop` директория рабочего стола, для текущего пользователя.
* `documents` директория пользователя "My Documents".
* `downloads` директория пользователя "Downloads".
* `music` директория пользователя "Music".
* `pictures` директория пользователя для фотографий.
* `videos` директория пользователя для видео.
* `logs` директория для логов Вашего приложения.
* `pepperFlashSystemPlugin` полный путь к системной версии плагина Pepper Flash.

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

Извлекает иконку, связанную с путем.

На *Windows*, есть 2 вида иконок:

* Иконки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Иконки внутри файла, таких как `.exe`, `.dll` и `.ico`.

На *Linux* и *macOS*, иконки зависят от приложения, ассоциируемого с mime-типом файла.

**[Скоро устареет](promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (опционально) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 на *Linux*, 32x32 на *Windows*, не поддерживается на *macOS*.

Возвращает `Promise<NativeImage>` - содержащий иконку приложения, которая является [NativeImage](native-image.md).

Извлекает иконку, связанную с путем.

На *Windows*, есть 2 вида иконок:

* Иконки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Иконки внутри файла, таких как `.exe`, `.dll` и `.ico`.

На *Linux* и *macOS*, иконки зависят от приложения, ассоциируемого с mime-типом файла.

### `app.setPath(name, path)`

* `name` String
* `path` String

Переопределяет `path` в специальную директорию или файл, связанный с `name`. Если путь указывает на директорию, которая не существует, этот метод создаст ее. В случае неудачи возникнет `Error`.

Можно переопределять только пути `name`, определенное в `app.getPath`.

По умолчанию cookies и кэш веб-страницы будут храниться в каталоге `userData`. Если вы хотите изменить это расположение, вам необходимо переопределить путь `userData` прежде, чем событие `ready` модуля `app` возникнет.

### `app.getVersion()`

Возвращает `String` - версии загруженного приложения. Если версия не найдена в файле `package.json` приложения, возвращается версия текущего пакета или исполняемого файла.

### `app.getName()`

Возвращает `String` - имя текущего приложения, который является именем в файле приложения `package.json`.

Обычно поле `name` в `package.json` является коротким именем строчных букв, согласно спецификации модулей npm. Обычно Вы должны также указать поле `productName`, которое пишется заглавными буквами - имя вашего приложения, и которое будет предпочтительнее `name` для Electron.

### `app.setName(name)`

* `name` String

Переопределяет имя текущего приложения.

### `app.getLocale()`

Возвращает `String` - текущего языка приложения. Описаны возможные возвращаемые значения [здесь](locales.md).

Для установки языка вам потребуется использовать переключатель командной строки во время запуска приложения, который можно найти [здесь](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Примечание:** При распространении упакованного приложения, нужно также добавить папку `locales`.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавляет `path` к списку последних документов.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Очищает список последних документов.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя вашего протокола, без `://`. Если вы хотите, чтобы ваше приложение обрабатывала `electron://` ссылки, вызовите этот метод из `electron` в качестве параметра.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод устанавливает текущий исполняемый файл в качестве обработчика по умолчанию для протокола (так называемая схема URI). Это позволяет Вам интегрировать приложение глубже в операционную систему. После регистрации, все ссылки с `ваш_протокол://` будут открываться текущим исполняемым файлом. Вся ссылка, включая протокол, будет передаваться в Ваше приложение в качестве параметра.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Примечание:** На macOS Вы можете регистрировать только те протоколы, которые были добавлены в `info.plist` Вашего приложения, которое не может быть модифицирована во время выполнения. Однако Вы можете изменить файл с помощью простого текстового редактора или скрипта во время сборки. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

API использует внутренний реестр Windows и LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - имя вашего протокола, без `://`.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так называемая схема URI). Если является, то убирает приложение, как обработчик по умолчанию.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя вашего протокола, без `://`.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean`

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так называемая схема URI). Если является, то возвращает true. Иначе, возвращает false.

**Примечание:** На macOS можно использовать этот метод для проверки, если приложение было зарегистрировано в качестве обработчика протокола по умолчанию для протокола. Вы также можете проверить это, установив `~/Library/Preferences/com.apple.LaunchServices.plist` на машине macOS. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme).

API использует внутренний реестр Windows и LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - массив объектов `Task`

Добавляет `tasks` к категории [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) в JumpList на Windows.

`tasks` массив объектов [`Task`](structures/task.md).

Возвращает `Boolean` - был ли вызов успешным.

**Примечание:** Если вы хотите настроить Jump List еще больше используйте `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Возвращает `Object`:

* `minItems` Integer - минимальное количество элементов, которые будут показаны в Jump List (для более подробного описания этого значение см. [документация MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem []](structures/jump-list-item.md) - массив объектов `JumpListItem`, которые соответствуют элементам, которые пользователь явно удалил из настраиваемых категорий в Jump List. Эти элементы не должны быть снова добавлены в Jump List, при **следующем** вызове `app.setJumpList()`, Windows не будет отображать любую настраиваемую категорию, содержащую любой из удаленных пунктов.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) или `null` - массив типа `JumpListCategory`, состоящий из объектов.

Задает или удаляет настраиваемый Jump List для приложения и возвращает одну из следующих строк:

* `ok` - ничего не случилось.
* `error` - произошла одна или несколько ошибок, включите ведение журнала выполнения, чтобы выяснить возможную ошибку.
* `invalidSeparatorError` - была сделана попытка добавить разделитель в настраиваемую категорию в Jump List. Разделители разрешены только в стандартной категории `Tasks`.
* `fileTypeRegistrationError` - была сделана попытка добавить ссылку на файл в Jump List для типа файла, который в приложении не зарегистрирован для обработки.
* `customCategoryAccessDeniedError` - настраиваемые категории не могут быть добавлены в Jump List из-за ограничений конфиденциальности пользователей или групповой политики.

Если `categories` - `null`, то ранее установленный настраиваемый Jump List (если таковой имеется) будет заменён стандартным Jump List для приложения (управляется Windows).

**Примечание:** Если объект `JumpListCategory` не имеет ни `type`, ни `name` свойства, тогда `type` считается `tasks`. Если свойство `name` установлено, но свойство `type` опущено, тогда `type` считается `custom`.

**Примечание:** Пользователи могут удалять элементы из настраиваемых категорий, но Windows не будет позволять возвращать удаленный элемент в настраиваемую категорию до **последующего** удачного вызова `app.setJumpList(categories)`. Любая попытка вновь добавить удаленный элемент в настраиваемую категорию раньше, чем это приведёт к созданию всей настраиваемой категории, исключается из Jump List. Список удаленных элементов можно получить с помощью `app.getJumpListSetting()`.

Вот очень простой способ, как создать настраиваемый Jump List:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // has a name so `type` is assumed to be "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // has no name and no type so `type` is assumed to be "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Возвращает `Boolean`

Этот метод делает ваше приложение одним экземпляром приложения, и не позволяет запускать несколько экземпляров вашего приложения, это гарантирует, что только один экземпляр вашего приложения запущен, а другие экземпляры сигнализируют об этом и завершаются.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

Пример активации окна первичного экземпляра, при запуске второго экземпляра:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Возвращает `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - уникально идентифицирует действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - специфичное для приложение состояние для использование других устроиств.
* `webpageURL` String (опиционально) - веб-страница для загрузки в браузере, если нет подходящего приложения, установленного на проснувшемся устройстве. Схема должна быть `http` или `https`.

Создает `NSUserActivity` и задает её в качестве текущей активности. Активность позже имеет право для [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) на другом устройстве.

### `app.getCurrentActivityType()` *macOS*

Возвращает `String` - тип текущей выполняемой активности.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - уникально идентифицирует действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Аннулирует текущую [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) активность пользователя.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - уникально идентифицирует действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - специфичное для приложение состояние для использование других устроиств.

Обновляет текущую активность, если его тип совпадает `type` слияния записей из `userInfo` в его текущем словаре `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Изменяет [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - путь к pkcs12 файлу.
  * `password` String - парольная фраза для сертификата.
* `callback` Function 
  * `result` Integer - результат импорта.

Импорт сертификата в формате pkcs12 из платформы хранилища сертификатов. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Отключает аппаратное ускорение для текущего приложения.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.disableDomainBlockingFor3DAPIs()`

По умолчанию Chromium отключает 3D интерфейсы API (например, WebGL) до перезагрузки на основе домена, если GPU обрабатывает сбои слишком часто. Эта функция отключает поведение.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.getAppMetrics()`

Возвращает [`ProcessMetric[]`](structures/process-metric.md): массив объектов `ProcessMetric`, которые соответствует статистике использования памяти всех process, связанных с app.

### `app.getGPUFeatureStatus()`

Возвращает [`GPUFeatureStatus`](structures/gpu-feature-status.md) - статус функции графики из `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src.git/+/69.0.3497.106/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:

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

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Возвращает `Boolean` - был ли вызов успешным.

Задает счетчик-значок для текущего приложения. При значении счетчика `0` будет скрыть значок.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Возвращает `Integer` - текущее значение, отображаемое в значке счётчика.

### `app.isUnityRunning()` *Linux*

Возвращает `Boolean` - является ли текущее окружение рабочего стола Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (опционально) 
  * `path` String (опиционально) *Windows* - исполняемый путь для сравнения. По умолчанию `process.execPath`.
  * `args` String [] (опционально) *Windows* - аргументы командной строки для сравнения. По умолчанию пустой массив.

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Возвращает `Object`:

* `openAtLogin` Boolean - `true` если приложение планируется открыть при входе в систему.
* `openAsHidden` Boolean *macOS* - `true` если приложение должно запускаться скрытым при входе в систему. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` если приложение было открыто автоматически при входе в систему. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` если приложение было запущено в качестве скрытого элемента при входе в систему. Это означает, что приложению не следует открывать любое окно при запуске. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` если приложение было открыто как элемент входа, который должен восстановить состояние с предыдущего сеанса. Это означает, что приложение должно восстановить окна, которые были открыты в последний раз, когда приложение было закрыто. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (опиционально) - `true` открыть приложение при входе в систему, `false` удалять приложение в качестве элемента входа. По умолчанию `false`.
  * `openAsHidden` Boolean (опиционально) *macOS* - `true` открыть приложение как скрытое. Значение по умолчанию: `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
  * `path` String (опиционально) *Windows* - исполняемый файл запускается при входе в систему. По умолчанию `process.execPath`.
  * `args` String[] (опиционально) *Windows* - аргументы командной строки для передачи исполняемого файла. По умолчанию пустой массив. Позаботесь обернуть путь кавычками.

Установите приложению параметры при входе в систему.

Для работы с Electron `autoUpdater` на Windows, который использует [Squirrel](https://github.com/Squirrel/Squirrel.Windows), вы можете задать путь запуска Update.exe и передавать аргументы, которые указывают на имя приложения. Например:

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

Возвращает `Boolean` - `true` если включена поддержка специальных возможностей Chrome, и `false` в противном случае. Этот API будет возвращать `true`, если обнаружено использование вспомогательных технологий, таких как средства чтения с экрана. Смотрите https://www.chromium.org/developers/design-documents/accessibility для подробностей.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - включить или отключить рендеринг древа [специальных возможностей](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)

Вручную включает поддержку специальных возможностей от Chrome, позволяя пользователям открывать специальные возможности в настройках приложения. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Отключено по умолчанию.

This API must be called after the `ready` event is emitted.

**Примечание:** Рендеринг древа специальных возможностей может повлиять на производительность Вашего приложения. Не должно быть включенным по умолчанию.

### `app.showAboutPanel` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Object 
  * `applicationName` String (опиционально) - имя приложения.
  * `applicationVersion` String (опиционально) - версия приложения.
  * `copyright` String (опиционально) - copyright информация.
  * `version` String (optional) - The app's build version number. *macOS*
  * `credits` String (optional) - Credit information. *macOS*
  * `website` String (optional) - The app's website. *Linux*
  * `iconPath` String (optional) - Path to the app's icon. *Linux*

Установите описание панели опций. This will override the values defined in the app's `.plist` file on MacOS. Смотрите [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) для получения более подробной информации. On Linux, values must be set in order to be shown; there are no defaults.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - Закодированные base64 данные закладки области безопасности, возвращаемые `dialog.showOpenDialog` или `dialog.showSaveDialog`.

Возвращает `Function`. Эта функция **должна** быть вызвана после того как вы have finished accessing the security scoped file. Если Вы забыли, запретить доступ к закладке, [возможно утечка ресурсов ядра](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) и ваше приложение потеряет свою способность выйти за пределы песочницы, пока не будет перезапущено.

```js
// Начало доступа к файлу.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Начать доступ в области безопасности ресурса. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. Подробное описание как работает эта система, смотри [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16).

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - переключатель командной строки
* `value` String (опиционально) - значение для данного переключателя

Добавьте переключатель (с опциональным значением `value`) Chromium в командной строке.

**Примечание:** Это не влияет на `process.argv` и главным образом используется разработчиками для контроля поведения некоторых низкоуровневых поведений Chromium.

### `app.commandLine.appendArgument(value)`

* `value` String - аргумент для добавления в командную строку

Добавляет аргумент к Chromium в командной строке. Аргумент будет указан правильно.

**Примечание:** Это не повлияет на `process.argv`.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - переключатель командной строки

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - переключатель командной строки

Returns `String` - The command-line switch value.

**Note:** When the switch is not present, it returns empty string.

### `app.enableSandbox()` *Experimental* *macOS* *Windows*

Enables full sandbox mode on the app.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.isInApplicationsFolder()` *macOS*

Возвращает `Boolean` - выполняется ли приложение сейчас из systems Application папки. Используется совместно с `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**Примечание:** Этот метод вызывает ошибки, если что-нибудь, кроме пользователя, приводит к сбою перемещения. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. Сообщение об ошибке должно быть информативным и скажет Вам, что действительно пошло не так

### `app.dock.bounce([type])` *macOS*

* `type` String (опиционально) - может быть `critical` или `informational`. По умолчанию `informational`

Когда `critical` передается, значок dock будет отскакивать, пока приложение не станет активным или запрос отменяется.

Когда `informational` передается, значок dock будет отскакивать в течение одной секунды. Однако запрос остается до тех пор, пока приложение не станет активным или запрос отменяется.

Возвращает `Integer` ID, представляющий запрос.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Отменить отскок по `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Отскакивает от "Downloads", если путь к файлу находится в папке "Downloads".

### `app.dock.setBadge(text)` *macOS*

* `text` String

Устанавливает строку для отображения в панели dock запирающими областями.

### `app.dock.getBadge()` *macOS*

Возвращает `String` - строки значка в dock.

### `app.dock.hide()` *macOS*

Скрыть значок в dock.

### `app.dock.show()` *macOS*

Показать значок в dock.

### `app.dock.isVisible()` *macOS*

Возвращает `Boolean` - является ли значок в dock видимым. Вызов `app.dock.show ()` является асинхронным, поэтому этот метод не может вернуть true сразу после этого вызова.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Устанавливает [Dock меню](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) приложения.

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Задает `image`, связывает со значком в dock.

## Свойства

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.