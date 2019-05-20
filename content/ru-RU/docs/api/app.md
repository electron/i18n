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

На Linux фокусируется на первое видимое окно. На macOS делает приложение активным. На Windows фокусируется на первое окно приложения.

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

На *Windows* есть 2 вида иконок:

* Иконки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Иконки внутри файла, таких как `.exe`, `.dll` и `.ico`.

На *Linux* и *macOS* иконки зависят от приложения, ассоциируемого с mime-типом файла.

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

На *Windows* есть 2 вида иконок:

* Иконки, связанные с определенными расширениями, такими как `.mp3`, `.png`, и т.д.
* Иконки внутри файла, таких как `.exe`, `.dll` и `.ico`.

На *Linux* и *macOS* иконки зависят от приложения, ассоциируемого с mime-типом файла.

### `app.setPath(name, path)`

* `name` String
* `path` String

Переопределяет `path` в специальную директорию или файл, связанный с `name`. Если путь указывает на директорию, которая не существует, этот метод создаст ее. В случае неудачи возникнет `Error`.

Можно переопределять только пути `name`, определенные в `app.getPath`.

По умолчанию cookies и кэш веб-страницы будут храниться в директории `userData`. Если Вы хотите изменить это расположение, Вам необходимо переопределить путь `userData` прежде, чем событие `ready` модуля `app` произойдет.

### `app.getVersion()`

Возвращает `String` - версию загруженного приложения. Если версия не найдена в файле приложения `package.json`, возвращается версия текущего пакета или исполняемого файла.

### `app.getName()`

Возвращает `String` - имя текущего приложения, которое является именем в файле приложения `package.json`.

Обычно поле `name` в `package.json` является коротким именем в нижнем регистре, согласно спецификации модулей npm. Обычно Вы должны также указать поле `productName`, которое пишется заглавными буквами - имя Вашего приложения, и которое будет предпочтительнее `name` для Electron.

### `app.setName(name)`

* `name` String

Переопределяет имя текущего приложения.

### `app.getLocale()`

Возвращает `String` - текущий язык приложения. [Здесь](locales.md) описаны возможные возвращаемые значения.

Для установки языка Вам потребуется использовать переключатель командной строки во время запуска приложения, который можно найти [здесь](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Примечание:** При распространении упакованного приложения, нужно также добавить папку `locales`.

**Примечание** На Windows Вы должны вызывать этот метод после того, как событие `ready` произойдет.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Примечание:** Когда невозможно определить код страны языка, возвращает пустую строку.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавляет `path` к списку последних документов.

Этот список управляется ОС. На Windows Вы можете увидеть список на панели задач, а на macOS Вы можете увидеть список в меню dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Очищает список последних документов.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя Вашего протокола, без `://`. Если Вы хотите, чтобы Ваше приложение обрабатывало `electron://` ссылки, вызовите этот метод из `electron` в качестве параметра.
* `path` String (опционально) *Windows* - по умолчанию `process.execPath`
* `args` String[] (опционально) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод устанавливает текущий исполняемый файл в качестве обработчика по умолчанию для протокола (так же известного, как схема URI). Это позволяет Вам интегрировать приложение глубже в операционную систему. После регистрации, все ссылки с `ваш_протокол://` будут открываться текущим исполняемым файлом. Вся ссылка, включая протокол, будет передаваться в Ваше приложение в качестве параметра.

На Windows Вы можете предоставить дополнительные параметры: path - путь до Вашего исполняемого файла и args - массив аргументов, который будет передан Вашему исполняемому файлу при его запуске.

**Примечание:** На macOS Вы можете регистрировать только те протоколы, которые были добавлены в `info.plist` Вашего приложения, которое не может быть модифицировано во время выполнения. Однако Вы можете изменить файл с помощью простого текстового редактора или скрипта во время сборки. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

API использует внутренний реестр Windows и LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - имя Вашего протокола, без `://`.
* `path` String (опционально) *Windows* - по умолчанию `process.execPath`
* `args` String[] (опционально) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так же известного, как схема URI). Если является, то убирает приложение, как обработчик по умолчанию.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя Вашего протокола, без `://`.
* `path` String (опционально) *Windows* - по умолчанию `process.execPath`
* `args` String[] (опционально) *Windows* - по умолчанию пустой массив

Возвращает `Boolean`

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так же известного, как схема URI). Если является, то возвращает true. Иначе, возвращает false.

**Примечание:** На macOS можно использовать этот метод для проверки, если приложение было зарегистрировано в качестве обработчика протокола по умолчанию для протокола. Вы также можете проверить это, проверив `~/Library/Preferences/com.apple.LaunchServices.plist` на машине macOS. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme).

API использует внутренний реестр Windows и LSCopyDefaultHandlerForURLScheme.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - массив объектов `Task`

Добавляет `tasks` к категории [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) в списке переходов на Windows.

`tasks` - массив объектов [`Task`](structures/task.md).

Возвращает `Boolean` - был ли вызов успешным.

**Примечание:** Если Вы хотите настроить список переходов еще больше - используйте `app.setJumpList(categories)`.

### `app.getJumpListSettings()` *Windows*

Возвращает `Object`:

* `minItems` Integer - минимальное количество элементов, которые будут показаны в списке переходов (для более подробного описания этого значения, см. [документацию MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem []](structures/jump-list-item.md) - массив объектов `JumpListItem`, которые соответствуют элементам, которые пользователь явно удалил из пользовательских категорий в списке переходов. Эти элементы не должны быть снова добавлены в список переходов, при **следующем** вызове `app.setJumpList()`, Windows не будет отображать любую пользовательскую категорию, содержащую любой из удаленных пунктов.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) или `null` - массив объектов `JumpListCategory`.

Задает или удаляет пользовательский список переходов для приложения и возвращает одну из следующих строк:

* `ok` - ничего не случилось.
* `error` - произошла одна или несколько ошибок, включите ведение журнала выполнения, чтобы выяснить возможную ошибку.
* `invalidSeparatorError` - была сделана попытка добавить разделитель в пользовательскую категорию в список переходов. Разделители разрешены только в стандартной категории `Tasks`.
* `fileTypeRegistrationError` - была сделана попытка добавить ссылку на файл в список переходов для типа файла, который в приложении не зарегистрирован для обработки.
* `customCategoryAccessDeniedError` - пользовательские категории не могут быть добавлены в список переходов из-за ограничений конфиденциальности пользователей или групповой политики.

Если `categories` - `null`, то ранее установленный пользовательский список переходов (если таковой имеется) будет заменён стандартным списком переходов для приложения (управляется Windows).

**Примечание:** Если объект `JumpListCategory` не имеет ни `type`, ни `name` свойства, тогда `type` считается `tasks`. Если свойство `name` установлено, но свойство `type` опущено, тогда `type` считается `custom`.

**Примечание:** Пользователи могут удалять элементы из пользовательских категорий, но Windows не будет позволять возвращать удаленный элемент в пользовательскую категорию до **следующего** удачного вызова `app.setJumpList(categories)`. Любая попытка вновь добавить удаленный элемент в пользовательскую категорию перед тем, как метод выполнится, приведёт к исключению всей категории из списка переходов. Список удаленных элементов можно получить с помощью `app.getJumpListSetting()`.

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

Этот метод делает Ваше приложение единственным экземпляром приложения, и не позволяет запускать несколько экземпляров Вашего приложения, это гарантирует, что только один экземпляр Вашего приложения запущен, а другие экземпляры сигнализируют об этом и завершаются.

Значение, которое возвращает этот метод, указывает, успешно или нет экземпляр Вашего приложения получило блокировку. Если не удалось получить блокировку, можно предположить, что другой экземпляр Вашего приложения уже запущен с блокировкой и немедленно выходит.

Т.е. этот метод возвращает `true`, если Ваш процесс является основным экземпляром Вашего приложения, а Ваше приложение должно продолжать загружаться. Возвращает `false`, если Ваш процесс должен немедленно завершиться, так как он отправил свои параметры другому экземпляру, которые уже приобрел блокировку.

На macOS система автоматически обеспечивает единственный экземпляр, когда пользователи пытаются открыть второй экземпляра Вашего приложения в Finder, для этого будут происходить `open-file` и `open-url` события. Так или иначе, когда пользователи запустят Ваше приложение через командную строку, системный механизм единственного экземпляра будет обойден, и Вы должны использовать этот метод, чтобы обеспечить единственный экземпляр.

Пример активации окна единственного экземпляра, при запуске второго экземпляра:

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
* `webpageURL` String (опционально) - веб-страница для загрузки в браузере, если не установлено подходящего приложения, на проснувшемся устройстве. Схема должна быть `http` или `https`.

Создает `NSUserActivity` и задает ее в качестве текущей активности. Активность имеет право для [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) на другом устройстве после этого.

### `app.getCurrentActivityType()` *macOS*

Возвращает `String` - тип текущей выполняемой активности.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - уникально определяет действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Аннулирует текущую [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) активность пользователя.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - уникально определяет действие. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - специфичное, для приложения, состояние для использования на других устройствах.

Обновляет текущую активность, если ее тип соответствует `type`, объединяя записи с `userInfo` в свой текущий словарь `userInfo`.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Изменяет [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) на `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - путь к pkcs12 файлу.
  * `password` String - парольная фраза для сертификата.
* `callback` Function 
  * `result` Integer - результат импорта.

Импортирует сертификат в формате pkcs12 из платформы хранилища сертификатов. `callback` вызывается с `result` - результат операции импорта, значение `0` указывает на успех, все другие значения указывают на ошибку в соответствии со списком [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) в Chromium.

### `app.disableHardwareAcceleration()`

Отключает аппаратное ускорение для текущего приложения.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.disableDomainBlockingFor3DAPIs()`

По умолчанию Chromium отключает 3D API (например, WebGL) до тех пор, пока не перезапустится на основе домена, если процесс GPU слишком часто крашится. Эта функция отключает это поведение.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.getAppMetrics()`

Возвращает [`ProcessMetric[]`](structures/process-metric.md): массив объектов `ProcessMetric`, которые соответствует статистике использования памяти и cpu всех процессов, связанных с приложением.

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