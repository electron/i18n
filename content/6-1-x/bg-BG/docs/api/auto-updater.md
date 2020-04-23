# autoUpdater

> Позволява на приложения да се обновяват автоматично.

Процеса: [Main](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

## Известия от платформата

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

В допълнение има някои фините разлики за всяка платформа:

### macOS

На macOS `autoUpdater` модула е изграден върху [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) т.е. нямате нужда от специални настройки за да работи. За изисквания, от страна на сървъра можете да прочетете [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Обърнете внимание, че [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (АТС) се прилага за всички искания, направени като част от процеса на актуализиране. Приложения, за които трябва да изключите ATS може да добавите `NSAllowsArbitraryLoads` ключ към тяхното plist на приложението.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

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

Emitted when there is an available update. The update is downloaded automatically.

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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Методи

Обектът `autoUpdater` има следните методи:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` String
  * `headers` Object (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Поставя `url` и инициализира автоматичното обновяване.

### `autoUpdater.getFeedURL()`

Връща `String` - Текущият URL на обновяването.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.
