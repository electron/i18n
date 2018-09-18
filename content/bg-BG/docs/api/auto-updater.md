# autoUpdater

> Позволява на приложения да се обновяват автоматично.

Процеса: [Main](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

## Известия от платформата

В момента се поддържат само macOS и Windows. Няма вградена поддръжка за auto-updater на Linux, така че е препоръчително да се използва мениджъра на доставения пакет, за да актуализирате вашето приложение.

В допълнение има някои фините разлики за всяка платформа:

### macOS

На macOS `autoUpdater` модула е изграден върху [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) т.е. нямате нужда от специални настройки за да работи. За изисквания, от страна на сървъра можете да прочетете [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Обърнете внимание, че [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (АТС) се прилага за всички искания, направени като част от процеса на актуализиране. Приложения, за които трябва да изключите ATS може да добавите `NSAllowsArbitraryLoads` ключ към тяхното plist на приложението.

**Забележка:** Вашето приложение трябва да бъде подписано за автоматични актуализации на macOS. Това е изискване на `Squirrel.Mac`.

### Windows

На Windows, трябва да инсталирате приложението си в машината на потребителя, преди да използвате `autoUpdater`, така че е препоръчително да използвате [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) или пакета [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) за генериране на Windows installer.

Когато използвате [electron-winstaller](https://github.com/electron/windows-installer) или [electron-forge](https://github.com/electron-userland/electron-forge) се уверете, че не се опитвате да актуализирате вашето приложение [първият път, когато стартира](https://github.com/electron/windows-installer#handling-squirrel-events) (също виж [този въпрос за повече информация](https://github.com/electron/electron/issues/7155)). Препоръчително е още да използвате [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup), за да имате кратки пътища от работния плот към вашето приложение.

Инсталаторът, генериран с Squirrel ще създаде кратък път с [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)във формат `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, примери са `com.squirrel.slack.Slack` и `com.squirrel.code.Code`. Трябва да използвате същото ID на вашето приложение с `app.setAppUserModelId` API, в противен случай Windows няма да може да постави вашето приложение коректно в линията на задачите.

За разлика от Squirrel.Mac, Windows може да поддържа обновявания на S3 или всеки друг статичен файл. Можете да прочетете документа [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows), за да получите повече детайли относно как Squirrel.Windows работи.

## Събития

Обектът `autoUpdater` излъчва следните събития:

### Събитие: 'error'

Връща:

* `error` Error

Излъчено, когато има грешка при обновяване.

### Събитие: 'checking-for-update'

Излъчено, при проверка на стартирало обновяване на приложението.

### Събитие: 'update-available'

Излъчено, когато има достъпно обновяване. Обновяването бива свалено автоматично.

### Събитие: 'update-not-available'

Излъчено, когато няма достъпно обновяване.

### Събитие: 'update-downloaded'

Връща:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Излъчено, когато обновяването е свалено.

Само на Windows е налично `releaseName`.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Методи

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(options)`

* `опции` Object 
  * `url` String
  * `headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.