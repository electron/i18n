# awtoUpdeyter

> Paganahin ang app na awtomatikong mag-update ang kanilang sarili.

Proseso:[Pangunahi](../glossary.md#main-process)

The `autoUpdater` module provides an interface for the [Squirrel](https://github.com/Squirrel) framework.

You can quickly launch a multi-platform release server for distributing your application by using one of these projects:

* [nuts](https://github.com/GitbookIO/nuts): *A smart release server for your applications, using GitHub as a backend. Auto-updates with Squirrel (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *A fully featured, self-hosted release server for electron applications, compatible with auto-updater*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *A simple node.js server for Squirrel.Mac and Squirrel.Windows which uses GitHub releases*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *A simple PHP application for Squirrel.Windows which reads updates from a folder. Supports delta updates.*

## Babala sa plataporma

Though `autoUpdater` provides a uniform API for different platforms, there are still some subtle differences on each platform.

### macOS

Sa macOS, ang `autoUpdater` na modyul ay ginawa [sa Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), ibig sabihin hindi mo kailangan ng kahit anong espesyal na set-up para mapagana ito. Para sa mga kinakailangan ng panig ng server, maari mong basahin ang [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Tandaan lamang na ang [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35)(ATS) ay nalalapat sa lahat ng mga kahilingan na ginawa bilang bahagi ng proseso ng pag-update. Ang mga apps na kailangan hindi isama sa ATS ay maaaring idadag sa susi ng `NSAllowsArbitraryLoads` para sa kanilang app plist.

**Tandaan:** Ang iyong applikasyon at dapat nakalagda para sa awtomatikong pag-aupdate ng macOS. Ito ay kinakailangan ng `Squirrel.Mac`.

### Windows

Sa Windows, ay kailangan mong ilagay ang iyong app sa makina ng gagamit bago mo magamamit ang `autoUpdater`, kaya't inirerekomenda na iyong gamitin ang [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) na pakete para mabuo ang Windows installer.

Kapag ginagamit ang [electron-winstaller](https://github.com/electron/windows-installer) o ang [electron-forge](https://github.com/electron-userland/electron-forge) siguraduhing hindi mo subukan mag-update ng iyong app[ sa unang pagkakataon na ito ay tumatakbo](https://github.com/electron/windows-installer#handling-squirrel-events)(Mangyari ring tignan [ang isyung ito para sa karagdagang impormasyon](https://github.com/electron/electron/issues/7155)). Inirerekomenda rin naming gumamit ng [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup)para makakuha ng shortcut sa desktop para sa iyong app.

Ang installer na nabuo gamit ang Squirrel ay lilikha ng isang shortcut icon na mayroong[Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) sa format ng `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`,halimbawa nito ay `com.squirrel.slack.Slack` at `com.squirrel.code.Code`. Kailangan mong gamitin ang parehong ID para sa iyong app sa `app.setAppUserModelId` API, kung hindi ang Windows ay hindi magagawang ilagay ang iyong app ng wasto sa iyong task bar.

Hindi gaya ng sa Squirrel.Mac, ang Windows ay kayang mag-host ng update sa S3 o sa kahit anong static file ng host. Maari mong basahin ang dokumento ng [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows)para makakuha pa ng higat pang detalye tungkol sa kung paano gumagana ang Squirrel.Windows.

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## Pangyayari

The `autoUpdater` object emits the following events:

### Event: 'error'

Pagbabalik:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Pagbabalik:

* `event` na Kaganapan
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Pamamaraan

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(url[, requestHeaders])`

* `url` Tali
* `requestHeaders` Object *macOS* (optional) - HTTP request headers.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

**Note:** `autoUpdater.quitAndInstall()` will close all application windows first and only emit `before-quit` event on `app` after that. This is different from the normal quit event sequence.