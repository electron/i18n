# autoUpdater

> Paganahin ang app na awtomatikong mag-update ang kanilang sarili.

Proseso:[Pangunahi](../glossary.md#main-process)

**See also: [A detailed guide about how to implement updates in your application](../tutorial/updates.md).**

`autoUpdater` is an [EventEmitter][event-emitter].

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### macOS

Sa macOS, ang `autoUpdater` na modyul ay ginawa [sa Squirrel.Mac][squirrel-mac], ibig sabihin hindi mo kailangan ng kahit anong espesyal na set-up para mapagana ito. Para sa mga kinakailangan ng panig ng server, maari mong basahin ang [Server Support][server-support]. Tandaan lamang na ang [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35)(ATS) ay nalalapat sa lahat ng mga kahilingan na ginawa bilang bahagi ng proseso ng pag-update. Ang mga apps na kailangan hindi isama sa ATS ay maaaring idadag sa susi ng `NSAllowsArbitraryLoads` para sa kanilang app plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). Inirerekomenda rin naming gumamit ng [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup)para makakuha ng shortcut sa desktop para sa iyong app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. Kailangan mong gamitin ang parehong ID para sa iyong app sa `app.setAppUserModelId` API, kung hindi ang Windows ay hindi magagawang ilagay ang iyong app ng wasto sa iyong task bar.

Hindi gaya ng sa Squirrel.Mac, ang Windows ay kayang mag-host ng update sa S3 o sa kahit anong static file ng host. You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## Pangyayari

Ang `autoUpdater` maglalabas ng mga ganitong pangyayari:

### Pangyayari: 'error'

Pagbabalik:

* `error` Error

Lumabas kapag mayroong mali habang ina-update.

### Pangyayari:'checking-for-update'

Lumalabas kapag sinusuri kung ang update ay nagsimula na.

### Pangyayari: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Pangyayari: 'update-not-available'

Napalabas kapag walang available na pag-update.

### Pangyayari: 'update-downloaded'

Pagbabalik:

* `event` na Kaganapan
* `releaseNotes` Lupid
* `releaseNotes` Lubid
* `releaseDate` Petsa
* `updateURL` Lubid

Lumalabas kung ang update ay nadownload na.

Tanging Windows lamang`releaseName` is available.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## Mga Paraan

Ang `autoUpdater` na gamit ay mayroong ibat-ibang pamamaraan:

### `autoUpdater.setFeedURL(options)`

* `options` Object
  * `url` Tali
  * `headers` Record<String, String> (optional) _macOS_ - HTTP request headers.
  * `serverType` String (optional) _macOS_ - Can be `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

Tinatakda ang `url` at nagpapasimula ng auto-updater.

### `autoUpdater.getFeedURL()`

Bumalik `String` - Ang kasalukuyang update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
