# autoUpdater

> Позволява на приложения да се обновяват автоматично.

Процеса: [Main](../glossary.md#main-process)

**Може да намерите подробно ръководство, за това как да добавите обновявания във вашето приложение [here](../tutorial/updates.md).**

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

### Event: 'update-downloaded'

Връща:

* `event` Сътитие
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Методи

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` String
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.