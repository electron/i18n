# autoUpdater

> Позвольте приложениям автоматически обновляться.

Процесс: [Главный](../glossary.md#main-process)

**См. также: [Подробное руководство о том, как внедрять обновления в Ваше приложение](../tutorial/updates.md).**

## Платформа заметок

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

Кроме того есть некоторые тонкие различия на каждой платформе:

### macOS

На macOS модуль `autoUpdater` построен на [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), что означает, что Вам не нужно делать каких-либо специальных настроек, чтобы заставить его работать. Для серверных условий, Вы можете прочитать [Поддержку сервера](https://github.com/Squirrel/Squirrel.Mac#server-support). Заметьте, что [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) применяется ко всем запросам, сделанным как часть процесса обновления. Приложению, у которого требуется отключить ATS, можно добавить ключ `NSAllowsArbitraryLoads` в список свойств приложения (plist).

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

На Windows Вам придется установить приложение на компьютер пользователя, прежде чем Вы сможете использовать `autoUpdater`, поэтому рекомендуется использовать пакет [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) или [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) для создания установщика Windows.

При использовании [electron-winstaller](https://github.com/electron/windows-installer) или [electron-forge](https://github.com/electron-userland/electron-forge) убедитесь, что Вы не пытаетесь обновить ваше приложение [при первом запуске](https://github.com/electron/windows-installer#handling-squirrel-events) (также см. [этот вопрос для получения дополнительной информации](https://github.com/electron/electron/issues/7155)). Также рекомендуется использовать [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup), для получения ярлыка Вашего приложения на рабочем столе.

Установщик, сгенерированный с помощью Squirrel, создаст ярлык с [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) в формате `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, `com.squirrel.slack.Slack` и `com.squirrel.code.Code`. Вы должны использовать тот же ID для Вашего приложения в `app.setAppUserModelId` API, иначе Windows не сможет должным образом закрепить приложение в панели задач.

В отличие от Squirrel.Mac, обновления для Windows можно размещать на S3 или любом другом хостинге статических файлов. Вы можете прочитать документацию о [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows), для получения более подробной информации о том, как работает Squirrel.Windows.

## События

Объект `autoUpdater` имеет следующие события:

### Событие: 'error'

Возвращает:

* `error` Error

Происходит, когда возникает ошибка во время обновления.

### Событие: 'checking-for-update'

Происходит во время проверки, если обновление началось.

### Событие: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Событие: 'update-not-available'

Происходит, когда нет доступных обновлений.

### Событие: 'update-downloaded'

Возвращает:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Происходит, когда обновление было загружено.

На Windows доступен только `releaseName`.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Событие: 'before-quit-for-update'

Это событие происходит после вызова `quitAndInstall()`.

Когда это API вызывается, событие `before-quit` не будет происходить, до тех пор, пока все окна не будут закрыты. В результате Вы должны прослушивать это событие, если хотите выполнить действия до закрытия окон, во время завершения процесса, а также прослушивать `before-quit`.

## Методы

Объект `autoUpdater` имеет следующие методы:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Object (опционально) _macOS_ - заголовки HTTP-запроса.
  * `serverType` String (опционально) _macOS_ - либо `json`, либо `default`, смотрите README [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), для подробной информации.

Задает `url` и инициализирует автоматическое обновление.

### `autoUpdater.getFeedURL()`

Возвращает `String` - URL текущего канала обновления.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Внутри, вызов `autoUpdater.quitAndInstall()` сначала закроет все окна приложения, и автоматически вызовет `app.quit()`, после того, как все окна будут закрыты.

**Примечание:** Не обязательно вызывать эту функцию, чтобы применить обновление, успешно загруженное обновление будет применено в следующий раз, когда приложение запустится.
