# autoUpdater

> Включает в приложении автоматическое самообновление.

Процесс: [Main](../glossary.md#main-process)

`autoUpdater` модуль предоставляющий интерфейс для [Squirrel](https://github.com/Squirrel) фреймфорка.

Вы можете быстро запустить серверный релиз мульти-платформы для распространения вашего приложения используя один из проектов:

* [nuts](https://github.com/GitbookIO/nuts): * Смарт-релиз сервера для ваших приложений, используя GitHub как бэкэнд. Авто обновления с Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): * Полнофункциональный, резидентный серверный релиз для приложения Electron, совместимый с auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *Простой node.js сервер для Squirrel.Mac и Squirrel.Windows с использованием GitHub релизов*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *Простое PHP приложение для Squirrel.Windows, которая читает обновления из папки. Поддержка дельта обновлений</li> </ul> 
    
    ## Платформа заметок
    
    Хотя `autoUpdater` предоставляет единый API для разных платформ, есть еще некоторые тонкие различия на каждой платформе.
    
    ### macOS
    
    На macOS `autoUpdater` модуль построен на [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), что означает, что вам не нужно каких-либо специальных настроек, чтобы сделать его работу. For server-side requirements, you can read [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.
    
    **Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.
    
    ### Windows
    
    On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) package to generate a Windows installer.
    
    When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.
    
    The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.
    
    Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.
    
    ### Linux
    
    There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.
    
    ## Events
    
    The `autoUpdater` object emits the following events:
    
    ### Event: 'error'
    
    Возвращает:
    
    * `error` Error
    
    Emitted when there is an error while updating.
    
    ### Event: 'checking-for-update'
    
    Emitted when checking if an update has started.
    
    ### Event: 'update-available'
    
    Emitted when there is an available update. The update is downloaded automatically.
    
    ### Event: 'update-not-available'
    
    Emitted when there is no available update.
    
    ### Event: 'update-downloaded'
    
    Возвращает:
    
    * `event` Event
    * `releaseNotes` String
    * `releaseName` String
    * `releaseDate` Date
    * `updateURL` String
    
    Emitted when an update has been downloaded.
    
    On Windows only `releaseName` is available.
    
    ## Методы
    
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