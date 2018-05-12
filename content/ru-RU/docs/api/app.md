# app

> Контролируйте жизненный цикл Вашего приложения.

Процесс: [Main](../glossary.md#main-process)

Этот пример показывает, как закрыть приложение, когда последнее окно будет закрыто:

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## События

Объект `app` имеет следующие события:

### Событие: 'will-finish-launching'

Происходит когда приложение заканчивает основной запуск. На Windows и Linux событие `will-finish-launching` подобно событию `ready`; на macOS это событие представляет собой уведомление `applicationWillFinishLaunching` объекта `NSApplication`. Обычно настраивают слушателей для `open-file` и `open-url` событий, и запускают репортер сбоев и автообновления.

В большинстве случаев вы просто должны сделать все в обработчике событий `ready`.

### Событие: 'ready'

Возвращает:

* `launchInfo` Object *macOS*

Происходит при завершении инициализации Electron. На macOS `launchInfo` содержит `userInfo` из `NSUserNotification`, которое было использовано для открытия приложения, если оно было запущено из центра уведомлений. Вы можете вызвать `app.isReady()` для того, чтобы проверить, произошло ли данное событие.

### Событие: 'window-all-closed'

Происходит при закрытии всех окон.

Если Вы не подпишитесь на это событие, и все окна будут закрыты, поведением по умолчанию является выход из приложения; Однако, если Вы подпишитесь, то Вы определяете, будет ли приложение закрыто или нет. Если пользователь нажал `Cmd + Q` или разработчик вызвал `app.quit ()`, Electron сначала попытается закрыть все окна, а затем происходит событие `will-quit`, и в этом случае событие `window-all-closed` не будет возникать.

### Событие: 'before-quit'

Возвращает:

* `event` Event

Происходит перед тем как запущенное приложение закрывает окна. Вызов `event.preventDefault()` предотвращает поведение по умолчанию, которое завершает работу приложения.

**Примечание:** Если выход приложения был инициирован `autoUpdater.quitAndInstall()` затем `before-quit` возникает *после* возникновения события `close` на всех окнах и закрывает их.

### Событие: 'will-quit'

Возвращает:

* `event` Event

Происходит когда все окна были закрыты и приложение прекратит работу. Вызов `event.preventDefault()` предотвратит поведение по умолчанию, которое завершает приложение.

Смотрите описание события `window-all-closed` для различий между событием `will-quit` и `window-all-closed`.

### Событие: 'quit'

Возвращает:

* `event` Event
* `exitCode` Integer

Происходит при выходе из приложения.

### Событие: 'open-file' *macOS*

Возвращает:

* `event` Event
* `path` String

Происходит, когда пользователь хочет открыть файл. Событие `open-file` обычно происходит, когда приложение уже открыто и хочет использовать ОС, чтобы открыть файл. `open-file` также происходит, когда файл удаляется на dock, а приложение еще не запущено. Убедитесь, что обработчик события `open-file` в самом начале запуска вашего приложения обрабатывает этот случай (даже прежде, чем происходит событие ` ready`).

Вы должны вызвать `event.preventDefault()`, если хотите обработать это событие.

В Windows Вам необходимо распарсить `process.argv` (в главном процессе), чтобы получить путь к файлу.

### Событие: 'open-file' *macOS*

Возвращает:

* `event` Event
* `url` String

Происходит, когда пользователь хочет открыть URL-адрес из приложения. Файл Вашего приложения `Info.plist` должнен определять схему URL в ключе `CFBundleURLTypes` и установить `NSPrincipalClass` в `AtomApplication`.

Вы должны вызвать `event.preventDefault()`, если Вы хотите обработать это событие.

### Событие: 'activate' *macOS*

Возвращает:

* `event` Event
* `hasVisibleWindows` Boolean

Происходит при активации приложения. Различные действия могут запускать это событие, например, запуск приложения в первый раз, попытка перезапустить приложение, когда оно уже запущено, или щелкнуть значок приложения в dock или панели задач.

### Событие: 'continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфическое для приложения состояние, сохраненное на другом устройстве.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когда активность с другого устройства хочет возобновиться. Если вы хотите обработать это событие следует вызвать `event.preventDefault()`.

Активность пользователя может быть продолжена только в приложении, которое имеет тот же ID команды разработчика, что и исходное приложение, и поддерживает тип активности. Поддерживаемые типы активности, указаны в `Info.plist` приложения под ключом `NSUserActivityTypes`.

### Событие: 'will-continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) до того, как активность с другого устройства хочет возобновиться. Если вы хотите обработать это событие следует вызвать `event.preventDefault()`.

### Событие: 'continue-activity' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `error` String - cтрока с локализованным описанием ошибки.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) при ошибочном возобновлении активности на различных устройствах.

### Событие: 'activity-was-continued' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфичное для приложения состояние, сохраненное в хранилище по активности.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) после удачного возобновления на другом устройстве.

### Событие: 'update-activity-state' *macOS*

Возвращает:

* `event` Event
* `type` String - строка идентифицирует активность. Карты для [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
* `userInfo` Object - содержит специфичное для приложения состояние, сохраняющееся в хранилище по активности.

Происходит во время [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html), когда вот-вот возобновится на другом устройстве. Если вы хотите обновить состояние, которое будет передано, Вам необходимо вызвать `event.preventDefault()` немедленно, собрать новый словарь `userInfo` и вызвать `app.updateCurrentActivity()` своевременно. Иначе операция завершится ошибкой и будет вызвано `continue-activity-error`.

### Событие: 'new-window-for-tab' *macOS*

Возвращает:

* `event` Event

Происходит, когда пользователь нажимает нативную кнопку новая вкладка на macOS. Кнопка новая вкладка доступна только в том случае, если текущий `BrowserWindow` имеет `tabbingIdentifier`

### Событие: 'browser-window-blur'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда [browserWindow](browser-window.md) теряет фокус.

### Событие: 'browser-window-focus'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда [browserWindow](browser-window.md) сфокусировано.

### Событие: 'browser-window-created'

Возвращает:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

Происходит, когда создается новый [browserWindow](browser-window.md).

### Событие: 'web-contents-created'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Происходит, когда создан новый [webContents](web-contents.md).

### Событие: 'certificate-error'

Возвращает:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - код ошибки
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - учитывать ли сертификат как надёжный

Происходит, когда не удалось проверить `certificate` для `url`, чтобы доверять сертификату, вы должны предотвратить поведение по умолчанию с `event.preventDefault()` и вызвать `callback(true)`.

```javascript
const {app} = require('electron')

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
  * `certificate` [Certificate](structures/certificate.md) (опиционально)

Происходит при запросе сертификата клиента.

`url` соответствует записи навигации, запрашивающей сертификат клиента и `callback` может быть вызван с записью, отфильтрованной из списка. `event.preventDefault()` предотвращает от использования приложением первого сертификата из хранилища.

```javascript
const {app} = require('electron')

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

Происходит, когда `webContents` хочет сделать базовую аутентификацию.

Поведением по умолчанию является отмена всех аутентификаций, чтобы переопределить это Вы должны предотвратить поведение по умолчанию при помощи `event.preventDefault()` и вызвать `callback(username, password)` с учётными данными.

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Событие: 'gpu-process-crashed'

Возвращает:

* `event` Event
* `killed` Boolean

Происходит, когда процесс gpu аварийно завершает работу или был убит.

### Событие: 'accessibility-support-changed' *macOS* *Windows*

Возвращает:

* `event` Event
* `accessibilitySupportEnabled` Boolean - `true` когда поддержка специальных возможностей от Chrome включена, `false` в противном случае.

Происходит при изменении поддержки специальных возможностей от Chrome. Это событие срабатывает, когда вспомогательные технологии, такие как чтения с экрана, включены или отключены. См. https://www.chromium.org/developers/design-documents/accessibility для подробностей.

## Методы

Объект `app` имеет следующие методы:

**Примечание:** Некоторые методы доступны только в определенных операционных системах и помечены как таковые.

### `app.quit()`

Попробуйте закрыть все окна. Сначала возникнет событие `before-quit`. Если все окна успешно закрыты, событие `will-quit` возникнет и по умолчанию приложение будет завершено.

Этот метод гарантирует, что все обработчики событий `beforeunload` и ` unload` выполнятся корректно. Вполне возможно, что окно отменит выход, возвращая `false` в обработчике событий `beforeunload`.

### `app.exit([exitCode])`

* `exitCode` Integer (опиционально)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

Все окна будут закрыты сразу без запросов пользователя и `before-quit` и `will-quit` события не будут возникать.

### `app.relaunch([options])`

* `options` Object (опционально) 
  * `args` String[] (опционально)
  * `execPath` String (опиционально)

Перезапуск приложения когда существует текущий экземпляр.

По умолчанию новый экземпляр будет использовать тот же рабочий каталог и аргументы командной строки с текущим экземпляром. Когда `args` указан, `args` передаются как аргументы командной строки. Когда задано значение `execPath`, `execPath` будет выполняться для перезапуска вместо текущего приложения.

Обратите внимание, что этот метод не завершает приложение при выполнении, вам нужно вызвать `app.quit` или `app.exit` после вызова `app.relaunch` чтобы перезапустить приложение.

Когда `app.relaunch` вызывается несколько раз, несколько экземпляров будет запущено после выхода из текущего экземпляра.

Пример перезапуска немедленно текущего экземпляра и добавив новый аргумент командной строки в новый экземпляр:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

Возвращает `Boolean` - `true,` если Electron завершил инициализацию, `false` в противном случае.

### `app.focus()`

На Linux перемещает фокус на первое видимое окно. В macOS делает приложение активным. На Windows перемещает фокус на первое окно приложения.

### `app.hide()` *macOS*

Скрывает все окна приложения, не минимизируя их.

### `app.show()` *macOS*

Показывает окна приложения, после того как они были скрыты. Фокус не будет перемещён автоматически.

### `app.getAppPath()`

Возвращает `String` - текущего каталога приложения.

### `app.getPath(name)`

* `name` String

Возвращает `String` - путь в специальный каталог или файл, связанный с `name`. В случае неудачи возникает `Error`.

Вы можете запросить следующие пути по их имени:

* `home` домашний каталог пользователя.
* `appData` каталог данных приложений для каждого пользователя, который по умолчанию указывает на: 
  * `%APPDATA%` на Windows
  * `$XDG_CONFIG_HOME` или `~/.config` на Linux
  * `~/Library/Application Support` на macOS
* `userData` каталог для хранения файлов конфигурации вашего приложения, которые по умолчанию является `appData` добавляется с именем вашего приложения.
* ` temp ` временный каталог.
* `exe` текущий исполняемый файл.
* `module` библиотека `libchromiumcontent`.
* `desktop` каталог рабочего стола, текущего пользователя.
* `documents` каталог пользователя "My Documents".
* `downloads` Каталог пользователя "Downloads".
* `music` каталог пользователя "Music".
* `pictures` каталог пользователя для фотографии.
* `videos` каталог пользователя для видео.
* `logs` директория для логов вашего приложения.
* `pepperFlashSystemPlugin` путь к плагину Pepper Flash.

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (опционально) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on *Linux*, 32x32 on *Windows*, не поддерживается на *macOS*.
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Извлекает путь значка.

На *Windows*, там 2 вида значков:

* Значки, связанные с определенными расширениями, как `.mp3`, `.png`, и т.д.
* Значки внутри файла, как `.exe`, `.dll`, `.ico`.

На *Linux* и *macOS* значки зависят от приложения, связанного с типом mime файла.

### `app.setPath(name, path)`

* `name` String
* `path` String

Переопределяет `path` в специальный каталог или файл, связанный с `name`. Если путь указывает каталог, который не существует, этот метод создаст его. В случае неудачи возникнет `Error`.

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

**Примечание:** При распространении упакованного приложения, нужно также добавить папку `locales`.

**Примечание:** В Windows вы должны назвать его после получения события `ready`.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Добавляет `path` к списку последних документов.

Этот список управляется операционной системой. В Windows вы можете посетить список из панели задач, и на macOS вы можете посетить его из меню dock.

### `app.clearRecentDocuments()` *macOS* *Windows*

Очищает список последних документов.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - имя вашего протокола, без `://`. Если вы хотите, чтобы ваше приложение обрабатывала `electron://` ссылки, вызовите этот метод из `electron` в качестве параметра.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод устанавливает текущий исполняемый файл в качестве обработчика по умолчанию для протокола (так называемая схема URI). Это позволяет Вам интегрировать приложение глубже в операционную систему. После регистрации, все ссылки с `ваш_протокол://` будут открываться текущим исполняемым файлом. Вся ссылка, включая протокол, будет передаваться в Ваше приложение в качестве параметра.

На Windows Вы можете предоставить дополнительные параметры: path - путь до Вашего исполняемого файла и args - массив аргументов, который будет передан Вашему исполняемому файлу при его запуске.

**Примечание:** На macOS Вы можете регистрировать только те протоколы, которые были добавлены в `info.plist` Вашего приложения, которое не может быть модифицирована во время выполнения. Однако Вы можете изменить файл с помощью простого текстового редактора или скрипта во время сборки. За подробными сведениями обращайтесь к [документации компании Apple](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115).

API использует внутренний реестр Windows и LSSetDefaultHandlerForURLScheme.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - имя вашего протокола, без `://`.
* `path` String (optional) *Windows* - по умолчанию `process.execPath`
* `args` String[] (optional) *Windows* - по умолчанию пустой массив

Возвращает `Boolean` - был ли вызов успешным.

Этот метод проверяет, является ли текущий исполняемый файл, как обработчик протокола по умолчанию (так называемая схема URI). Если является, то убирает приложение, как обработчик по умолчанию.

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

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
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // имеет имя, поэтому `type` считается "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запустить инструмент A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Запустить инструмент B'
      }
    ]
  },
  { type: 'frequent' },
  { // не имеет имени и никакого типа, поэтому `type` считается "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Создать новый проект.'
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

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String [] - массив аргументов командной строки вторичных экземпляров
  * `workingDirectory` String - рабочий каталог вторичных экземпляров

Возвращает `Boolean`.

Этот метод делает ваше приложение одним экземпляром приложения, и не позволяет запускать несколько экземпляров вашего приложения, это гарантирует, что только один экземпляр вашего приложения запущен, а другие экземпляры сигнализируют об этом и завершаются.

`callback` будет вызван первым экземпляром из `callback(argv, workingDirectory)`, когда второй экземпляр выполнен. `argv` является массивом аргументов командной строки вторичных экземпляров, а `workingDirectory` является его текущим рабочим каталогом. Обычно приложения реагируют на это, делая их основное окно сфокусированным и не свернутым.

`callback` гарантированно выполняется после события `ready` получаемое из `app`.

Этот метод возвращает `false`, если Ваш процесс является основным экземпляром приложения и Вашему приложению следует продолжить загрузку. И возвращает `true`, если Ваш процесс направил свои параметры в другой экземпляр, и вы должны немедленно выйти.

На macOS система обеспечивает один экземпляр автоматически, когда пользователи пытаются открыть второй экземпляр приложения в Finder, для этого будут выделяться события `open-file` и `open-url`. Однако при запуске Вашего приложения в командной строке, системный механизм одного экземпляра будет обойден, и Вы должны использовать этот метод для обеспечения одного экземпляра.

Пример активации окна первичного экземпляра, при запуске второго экземпляра:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
// Кто-то пытался запустить второй экземпляр, мы должны сфокусироваться на нашем окне.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Создать myWindow, загрузить rest из app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Освобождает все блокировки, которые были созданы `makeSingleInstance`. Это позволит нескольким экземплярам приложения снова работать бок о бок.

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

Импорт сертификата в формате pkcs12 из платформы хранилища сертификатов. `callback` вызывает `result` импорт операции, значение `` указывает на успех в то время как любое другое значение указывает на ошибку в соответствии с Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

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

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Возвращает `Boolean` - был ли вызов успешным.

Задает счетчик-значок для текущего приложения. При значении счетчика `` будет скрыть значок.

В macOS показывает на значке в dock. На Linux это работает только для Unity.

**Примечание:** Unity требует существования файла `.desktop` для работы, для получения дополнительной информации, пожалуйста, прочитайте [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Возвращает `Integer` - текущее значение, отображаемое в значке счётчика.

### `app.isUnityRunning()` *Linux*

Возвращает `Boolean` - является ли текущее окружение рабочего стола Unity.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (опционально) 
  * `path` String (опиционально) *Windows* - исполняемый путь для сравнения. По умолчанию `process.execPath`.
  * `args` String [] (опционально) *Windows* - аргументы командной строки для сравнения. По умолчанию пустой массив.

Если вы указали `path` и `args` параметры в `app.setLoginItemSettings`, вам нужно правильно задать те же аргументы для `openAtLogin`.

Возвращает `Object`:

* `openAtLogin` Boolean - `true` если приложение планируется открыть при входе в систему.
* `openAsHidden` Boolean *macOS* - `true` если приложение должно запускаться закрытым при входе в систему. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAtLogin` Boolean *macOS* - `true` if the app was opened at login automatically. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `wasOpenedAsHidden` Boolean *macOS* - `true` if the app was opened as a hidden login item. Это означает, что приложению не следует открывать любое окно при запуске. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
* `restoreState` Boolean *macOS* - `true` if the app was opened as a login item that should restore the state from the previous session. Это означает, что приложение должно восстановить окна, которые были открыты в последний раз, когда приложение было закрыто. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (опиционально) - `true` открыть приложение при входе в систему, `false` удалять приложение в качестве элемента входа. По умолчанию `false`.
  * `openAsHidden` Boolean (optional) *macOS* - `true` to open the app as hidden. Значение по умолчанию: `false`. Пользователь может редактировать этот параметр из системных настроек, так `.wasOpenedAsHidden app.getLoginItemStatus ()` должен быть проверен при открытии приложения и знать текущее значение. Эта настройка недоступна в [сборках MAS](../tutorial/mac-app-store-submission-guide.md).
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

Вручную включает поддержку специальных возможностей от Chrome, позволяя пользователям открывать специальные возможности в настройках приложения. См. https://www.chromium.org/developers/design-documents/accessibility для подробностей. Отключено по умолчанию.

**Примечание:** Рендеринг древа специальных возможностей может повлиять на производительность Вашего приложения. Не должно быть включенным по умолчанию.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Object 
  * `applicationName` String (опиционально) - имя приложения.
  * `applicationVersion` String (опиционально) - версия приложения.
  * `copyright` String (опиционально) - copyright информация.
  * `credits` String (опиционально) - сredit информация.
  * `version` String (опиционально) - номер версии сборки приложения.

Установите описание панели опций. Это переопределит значения, определенные в файле `.plist` приложения. Смотрите [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) для получения более подробной информации.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
// Start accessing the file.
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - переключатель командной строки
* `value` String (опиционально) - значение для данного переключателя

Добавьте переключатель (с опциональным значением `value`) Chromium в командной строке.

**Примечание:** Это не влияет на `process.argv` и главным образом используется разработчиками для контроля поведения некоторых низкоуровневых поведений Chromium.

### `app.commandLine.appendArgument(value)`

* `value` String - аргумент для добавления в командную строку

Добавляет аргумент к Chromium в командной строке. Аргумент будет указан правильно.

**Примечание:** Это не повлияет на `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Включение смешанного изолированного режима в приложении.

Этот метод может быть вызван только до того, как приложение будет готово.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

Диалог подтверждения не будет представлен по умолчанию, если Вы хотите позволить пользователю подтвердить операцию, Вы можете сделать это с помощью API [`диалогового окна`](dialog.md).

**Примечание:** Этот метод вызывает ошибки, если что-нибудь, кроме пользователя, приводит к сбою перемещения. Например, если пользователь отменяет диалоговое окно авторизации, этот метод возвращает false. Если нам не удастся выполнить копирование, этот метод вызовет ошибку. Сообщение об ошибке должно быть информативным и скажет Вам, что действительно пошло не так

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

Задает приложению [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Задает `image`, связывает со значком в dock.