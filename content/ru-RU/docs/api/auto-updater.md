# autoUpdater

> Позвольте приложениям автоматически обновляться.

Процесс: [Основной](../glossary.md#main-process)

**См. также: [Подробное руководство о том, как внедрять обновления в Ваше приложение](../tutorial/updates.md).**

`autoUpdater` это [EventEmitter][event-emitter].

## Платформа заметок

В настоящее время поддерживаются только macOS и Windows. На Linux нет встроенной поддержи автоматического обновление, поэтому рекомендуется использовать менеджер пакетов для обновления вашего приложения.

Кроме того есть некоторые тонкие различия на каждой платформе:

### macOS

На macOS модуль `autoUpdater` построен на [Squirrel.Mac][squirrel-mac], что означает, что Вам не нужно делать каких-либо специальных настроек, чтобы заставить его работать. Для серверных условий, Вы можете прочитать [Поддержку сервера][server-support]. Заметьте, что [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) применяется ко всем запросам, сделанным как часть процесса обновления. Приложению, у которого требуется отключить ATS, можно добавить ключ `NSAllowsArbitraryLoads` в список свойств приложения (plist).

**Примечание:** Ваше приложение должно быть подписано для автоматических обновлений на macOS. Это требование `Squirrel.Mac`.

### Windows

На Windows, вы должны установить ваше приложение в машину пользователя, прежде чем вы сможете использовать `autoUpdater`, поэтому рекомендуется использовать [электрон-winstaller][installer-lib], [электронной кузницы][electron-forge-lib] или [хрюканье электрон-установщик][installer] пакет для создания установки Windows.

При использовании [электронного winstaller][installer-lib] или [электронной кузницы][electron-forge-lib] убедитесь, что вы не пытаетесь обновить приложение [в первый раз он работает](https://github.com/electron/windows-installer#handling-squirrel-events) (Также см. [этот вопрос для получения дополнительной информации](https://github.com/electron/electron/issues/7155)). Также рекомендуется использовать [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup), для получения ярлыка Вашего приложения на рабочем столе.

Установщик, генерируемый с Белка создаст значок ярлыка с [приложение Пользователь Модель ID][app-user-model-id] в формате `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, примеры `com.squirrel.slack.Slack` и `com.squirrel.code.Code`. Вы должны использовать тот же ID для Вашего приложения в `app.setAppUserModelId` API, иначе Windows не сможет должным образом закрепить приложение в панели задач.

В отличие от Squirrel.Mac, обновления для Windows можно размещать на S3 или любом другом хостинге статических файлов. Вы можете прочитать документы [Squirrel.Windows,][squirrel-windows] получить более подробную информацию о том как работает Squirrel.Windows.

## События

Объект `autoUpdater` имеет следующие события:

### Событие: 'error'

Возвращает:

* `error` Error

Возникает когда происходит ошибка при обновлении.

### Событие: 'checking-for-update'

Возникает при проверке, если обновление началось.

### Событие: 'update-available'

Происходит при наличии доступного обновления. Обновление загружается автоматически.

### Событие: 'update-not-available'

Возникает, когда нет доступных обновлений.

### Событие: 'update-downloaded'

Возвращает:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Возникает при загрузке обновления.

На Windows доступен только `releaseName`.

**Примечание:** Не обязательно обрабатывать это событие. Успешно загруженное обновление будет применено при следующем запуске приложения.

### Событие: 'before-quit-for-update'

Это событие происходит после вызова `quitAndInstall()`.

Когда это API вызывается, событие `before-quit` не будет происходить, до тех пор, пока все окна не будут закрыты. В результате Вы должны прослушивать это событие, если хотите выполнить действия до закрытия окон, во время завершения процесса, а также прослушивать `before-quit`.

## Методы

Объект `autoUpdater` имеет следующие методы:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (опционально) _macOS_ - заголовки HTTP-запроса.
  * `serverType` String (опционально) _macOS_ - может быть `json`, либо `default`, смотрите README [Squirrel.Mac][squirrel-mac] для подробной информации.

Задает `url` и инициализирует автоматическое обновление.

### `autoUpdater.getFeedURL()`

`String` - возвращает URL текущей подписки обновления.

### `autoUpdater.checkForUpdates()`

Спрашивает сервер, есть ли обновление. Вы должны вызвать `setFeedURL` перед использованием API.

### `autoUpdater.quitAndInstall()`

Перезапускает приложение и устанавливает обновление после его загрузки. Следует вызывать только после произошедшего `update-downloaded`.

Внутри, вызов `autoUpdater.quitAndInstall()` сначала закроет все окна приложения, и автоматически вызовет `app.quit()`, после того, как все окна будут закрыты.

**Примечание:** Не обязательно вызывать эту функцию, чтобы применить обновление, успешно загруженное обновление будет применено в следующий раз, когда приложение запустится.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
