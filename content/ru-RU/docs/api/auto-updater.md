# autoUpdater

> Включает в приложении автоматическое самообновление.

Процесс: [Main](../glossary.md#main-process)

`autoUpdater` модуль предоставляющий интерфейс для [Squirrel](https://github.com/Squirrel) фреймворка.

Вы можете быстро запустить серверный релиз мульти-платформы для распространения вашего приложения используя один из проектов:

* [nuts](https://github.com/GitbookIO/nuts): * Смарт-релиз сервера для ваших приложений, используя GitHub как бэкэнд. Авто обновления с Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *Полнофункциональный, резидентный серверный релиз для приложения Electron, совместимый с auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *Простой node.js сервер для Squirrel.Mac и Squirrel.Windows с использованием GitHub релизов*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *Простое PHP приложение для Squirrel.Windows, которая читает обновления из папки. Поддержка дельта обновлений.*

## Платформа заметок

Хотя `autoUpdater` предоставляет единый API для разных платформ, есть еще некоторые тонкие различия на каждой платформе.

### macOS

На macOS `autoUpdater` модуль построен на [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), что означает, что вам не нужно каких-либо специальных настроек, чтобы сделать его работу. Для серверной стороны вы можете прочитать требования [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Заметьте, что [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) применяется ко всем запросам, как часть процесса обновления. Приложению, что нужно отключить ATS, добавте ключ `NSAllowsArbitraryLoads` в plist приложения.

**Примечание:** Ваше приложение должно быть подписано для автоматического обновления на macOS. Это требование `Squirrel.Mac`.

### Windows

На Windows, вам придется установить приложение на компьютер пользователя, прежде чем вы можете использовать `autoUpdater`, поэтому рекомендуется использовать [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) или [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) пакет для создания установщика Windows.

При использовании [electron-winstaller](https://github.com/electron/windows-installer) или [electron-forge](https://github.com/electron-userland/electron-forge) убедитесь, что вы не пытаетесь обновить ваше приложение [при первом запуске](https://github.com/electron/windows-installer#handling-squirrel-events) (также см. [этот вопрос для получения дополнительной информации](https://github.com/electron/electron/issues/7155)). Также рекомендуется использовать [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) для получения ярлыка рабочего стола для вашего приложения.

Установщик сгенерирует Squirrel создаст ярлык с [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) в формате `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, `com.squirrel.slack.Slack` и `com.squirrel.code.Code`. Вы должны использовать тот же ID для вашего приложения с `app.setAppUserModelId` API, в противном случае Windows не сможет должным образом закрепить приложение в панели задач.

В отличие от Squirrel.Mac, Windows обновления можно размещать на S3 или любом другом хостинге статических файлов. Вы можете прочитать документы [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) для получения более подробной информации о том, как работает Squirrel.Windows.

### Linux

Не существует встроенной поддержки для автоматического обновления на Linux, поэтому рекомендуется использовать дистрибутив пакетного менеджера для обновления вашего приложения.

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

## Методы

Объект `autoUpdater` имеет следующие методы:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (опиционально) - http-header запроса.

Задает `url` и инициализирует автоматическое обновление.

### `autoUpdater.getFeedURL()`

`String` - возвращает URL текущей подписки обновления.

### `autoUpdater.checkForUpdates()`

Запрашивает сервер на наличие обновлений. Перед использованием этого API-интерфейса, необходимо вызвать `setFeedURL`.

### `autoUpdater.quitAndInstall()`

Перезапускает приложение и устанавливает обновления после того как скачает. Должен вызываться только после того, как возникнет событие `update-downloaded`.

**Примечание:** `autoUpdater.quitAndInstall()` сначала закроет все окна приложения и только потом возникнет событие `before-quit` на `app`. Это отличается от нормальной последовательности события выход.