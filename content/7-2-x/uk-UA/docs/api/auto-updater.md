# autoUpdater

> Enable apps to automatically update themselves.

Процес: [Main](../glossary.md#main-process)

**Дивіться також: [Детальна інструкція як налаштувати процес оновлення вашого застосунку](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Зауваження

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Крім того, є деякі тонкі відмінності на кожноій платформі:

### macOS

На macOS, модуль `autoUpdater` вбудований в [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), мається на увазі, що не потрібно додаткових налаштувань для його роботи. Щоб дізнатися потреби серверної частини, можете прочитати [Підтримку Серверу](https://github.com/Squirrel/Squirrel.Mac#server-support). Зауважте що [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) застосовується для всіх запитів зроблених при процесі оновлення. Застосунки, яким потрібно вимкнути ATS можуть додати ключ `NSAllowsArbitraryLoads` до свого plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

На Windows, ви маєте встановлювати свій застосунок на машину користувача перед тим, як зможете використовувати `autoUpdater`, тому рекомедовано використовувати [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) чи [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) пакети для генерації встановника Windows.

При використанні [electron-winstaller](https://github.com/electron/windows-installer) чи [electron-forge](https://github.com/electron-userland/electron-forge) переконайтеся що ви не намагаєтеся оновити застосунок [при першому запуску](https://github.com/electron/windows-installer#handling-squirrel-events) (Дивіться також [ці випадки для детільної інформації](https://github.com/electron/electron/issues/7155)). Також рекомендується використовувати [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) для отримання піктограм вашого застосунку на робочому столі.

Встановник згенерований Squirrel створить піктограму з [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) у форматі `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, наприклад, `com.squirrel.slack.Slack` чи `com.squirrel.code.Code`. Ви маєте використовувати однакове ID для вашого застосунку з `app.setAppUserModelId` API, в іншому випадку Windows не зможе правильно закріпити ваш застосунок в панелі завдань.

На відміну від Squirrel.Mac, Windows може тримати оновлення на S3 чи будь-якому іншому файловому сховищі. Ви можете прочитати документацію [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) для детальнішої інформації як Squirrel.Windows працює.

## Події (Events)

Об'єкт `autoUpdater` викликає наступні події:

### Подія: 'error'

Повертає:

* `error` Error

Відбувається коли виникає помилка при оновленні.

### Подія: 'checking-for-update'

Відбувається при перевірці чи стартувало оновлення.

### Подія: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Подія: 'update-not-available'

Відбувається коли нема доступних оновлень.

### Подія: 'update-downloaded'

Повертає:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Вібдувається коли оновлення завантажено.

На Windows доступне тільки `releaseName`.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Подія: 'before-quit-for-update'

Ця подія викликається після того як користувач викликав `quitAndInstall()`.

Коли викликається цей API, подія `before-quit` не виконується перед закриттям всіх вікон. Як результат ви маєте очікувати цю подію, якщо хочете виконати дії перед закриттям всіх вікон, так само як і `before-quit`.

## Методи

Об'єкт `autoUpdater` має наступні методи:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (опціонально) _macOS_ - `json` чи `default`, дивись [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README для детальнішої інформації.

Встановлює `url` та ініціалізує автоновлення.

### `autoUpdater.getFeedURL()`

Повертає `String` - Поточна URL для оновлення.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Під капотом виклик `autoUpdater.quitAndInstall()` спочатку закриє всі вікна застосунку та автоматично викличе `app.quit()` після закриття всіх вікон.

**Примітка:** Не обов'язково викликати дану функцію, щоб застосувати оновлення, тому що успішно завантажене оновлення завжди застосується при наступному старті застосунку.
