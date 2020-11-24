# autoUpdater

> Enable apps to automatically update themselves.

Процес: [Main](../glossary.md#main-process)

**Дивіться також: [Детальна інструкція як налаштувати процес оновлення вашого застосунку](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Зауваження

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Крім того, є деякі тонкі відмінності на кожноій платформі:

### macOS

На macOS, модуль `autoUpdater` вбудований в [Squirrel.Mac][squirrel-mac], мається на увазі, що не потрібно додаткових налаштувань для його роботи. Щоб дізнатися потреби серверної частини, можете прочитати [Підтримку Серверу][server-support]. Зауважте що [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) застосовується для всіх запитів зроблених при процесі оновлення. Застосунки, яким потрібно вимкнути ATS можуть додати ключ `NSAllowsArbitraryLoads` до свого plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). Також рекомендується використовувати [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) для отримання піктограм вашого застосунку на робочому столі.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Ви маєте використовувати однакове ID для вашого застосунку з `app.setAppUserModelId` API, в іншому випадку Windows не зможе правильно закріпити ваш застосунок в панелі завдань.

На відміну від Squirrel.Mac, Windows може тримати оновлення на S3 чи будь-якому іншому файловому сховищі. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

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
  * `serverType` String (optional) _macOS_ - Can be `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Встановлює `url` та ініціалізує автоновлення.

### `autoUpdater.getFeedURL()`

Повертає `String` - Поточна URL для оновлення.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Під капотом виклик `autoUpdater.quitAndInstall()` спочатку закриє всі вікна застосунку та автоматично викличе `app.quit()` після закриття всіх вікон.

**Примітка:** Не обов'язково викликати дану функцію, щоб застосувати оновлення, тому що успішно завантажене оновлення завжди застосується при наступному старті застосунку.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
