# autoUpdater

> Позвольте приложениям автоматически обновляться.

Процесс: [Основной](../glossary.md#main-process)

**См. также: [Подробное руководство о том, как внедрять обновления в Ваше приложение](../tutorial/updates.md).**

`autoUpdater` это [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Платформа заметок

На текущий момент поддерживается только macOS и Windows. Не существует встроенной поддержки для автоматического обновления на Linux, поэтому рекомендуется использовать менеджер пакетов дистрибутива, для обновления Вашего приложения.

Кроме того есть некоторые тонкие различия на каждой платформе:

### macOS

На macOS модуль `autoUpdater` построен на [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), что означает, что Вам не нужно делать каких-либо специальных настроек, чтобы заставить его работать. Для серверных условий, Вы можете прочитать [Поддержку сервера](https://github.com/Squirrel/Squirrel.Mac#server-support). Заметьте, что [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) применяется ко всем запросам, сделанным как часть процесса обновления. Приложению, у которого требуется отключить ATS, можно добавить ключ `NSAllowsArbitraryLoads` в список свойств приложения (plist).

**Примечание:** Ваше приложение должно быть подписано для автоматического обновления на macOS. Это требование `Squirrel.Mac`.

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

Возникает когда происходит ошибка при обновлении.

### Событие: 'checking-for-update'

Возникает при проверке, если обновление началось.

### Событие: 'update-available'

Возникает при наличии доступных обновлений. Обновление загружается автоматически.

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

**Примечание:** Не обязательно обрабатывать это событие. Успешно загруженное обновление будет применено в следующий раз, когда приложение запустится.

### Событие: 'before-quit-for-update'

Это событие происходит после вызова `quitAndInstall()`.

Когда это API вызывается, событие `before-quit` не будет происходить, до тех пор, пока все окна не будут закрыты. В результате Вы должны прослушивать это событие, если хотите выполнить действия до закрытия окон, во время завершения процесса, а также прослушивать `before-quit`.

## Методы

Объект `autoUpdater` имеет следующие методы:

### `autoUpdater.setFeedURL(options)`

* `options` Object 
  * `url` String
  * `headers` Record<String, String> (optional) *macOS* - HTTP request headers.
  * `serverType` String (опционально) *macOS* - либо `json`, либо `default`, смотрите README [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), для подробной информации.

Задает `url` и инициализирует автоматическое обновление.

### `autoUpdater.getFeedURL()`

`String` - возвращает URL текущей подписки обновления.

### `autoUpdater.checkForUpdates()`

Запрашивает сервер на наличие обновлений. Перед использованием этого API-интерфейса, необходимо вызвать `setFeedURL`.

### `autoUpdater.quitAndInstall()`

Перезапускает приложение и устанавливает обновления после того как скачает. Должен вызываться только после того, как возникнет событие `update-downloaded`.

Внутри, вызов `autoUpdater.quitAndInstall()` сначала закроет все окна приложения, и автоматически вызовет `app.quit()`, после того, как все окна будут закрыты.

**Примечание:** Не обязательно вызывать эту функцию, чтобы применить обновление, успешно загруженное обновление будет применено в следующий раз, когда приложение запустится.