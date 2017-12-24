# autoUpdater

> Дозволяє застосункам автоматично оновлювати себе.

Процес: [Main](../glossary.md#main-process)

Модуль `autoUpdater` надає інтерфейс для фреймворку [Squirrel](https://github.com/Squirrel).

Ви можете швидко запускати мультиплатформенні релізи для поширення вашого застосунку з використанням одного з цих проектів:

* [nuts](https://github.com/GitbookIO/nuts): *Розумний реліз сервер для ваших застосунків, використовує GitHub як серверну частину. Автооновлюння за допомогою Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *Повнофункціональний, резидентний реліз сервер для застосунків electron, сумісний з auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *Простий сервер node.js для Squirrel.Mac та Squirrel.Windows, який використовує GitHub релізи*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *Простий PHP застосунок для Squirrel.Windows, який читає оновлення з папки. Підтримка дельта оновлень.*

## Зауваження

Хоча `autoUpdater` надає однозначне API для різних платформ, є деякі тонкі відмінності на різних платформах.

### macOS

On macOS, the `autoUpdater` module is built upon [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), meaning you don't need any special setup to make it work. For server-side requirements, you can read [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) package to generate a Windows installer.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

### Linux

Немає вбудованої підтримки для автооновлення на Linux, тому рекомендовано використовувати наданий пакетний менеджер для оновлення вашого застосунку.

## Події (Events)

Об'єкт `autoUpdater` викликає наступні події:

### Подія: 'error'

Повертає:

* `error` Error

Відбувається коли виникає помилка при оновленні.

### Подія: 'checking-for-update'

Відбувається при перевірці чи стартувало оновлення.

### Подія: 'update-available'

Відбуваєтсья коли доступне оновлення. Воно завантажується автоматично.

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

## Методи

Об'єкт `autoUpdater` має наступні методи:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (опціонально) - хедери HTTP запиту.

Встановлює `url` та ініціалізує автоновлення.

### `autoUpdater.getFeedURL()`

Повертає `String` - Поточна URL для оновлення.

### `autoUpdater.checkForUpdates()`

Запитує сервер чи доступні оновлення. Потрібно викликати `setFeedURL` перед використанням цього API.

### `autoUpdater.quitAndInstall()`

Перезавантажує застосунок та встановлює оновлення після їх завантаження. Має викликатися тільки після події `update-downloaded`.

**Примітка:** `autoUpdater.quitAndInstall()` закриє всі вікна застосунку і викличе тільки подію `before-quit`. Це відмінність від нормальної послідовності подій виходу.