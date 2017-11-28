# autoUpdater

> 讓應用程式能自動更新版本。

處理序: [主處理序](../glossary.md#main-process)

`autoUpdater` 模組提供介面，將 [Squirrel](https://github.com/Squirrel) 框架封裝起來。

透過下列任一專案，你就能快速建出跨平台的發行伺服器，將你的應用程式發佈出去:

* [nuts](https://github.com/GitbookIO/nuts): *智慧型應用程式發行伺服器，直接拿 GitHub 當後端。透過 Squirrel 自動更新 (Mac & Windows)*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *功能完備，需要自己架設的 Electron 應用程式發行伺服器，相容自動更新機制*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *支援 Squirrel.Mac 及 Squirrel.Windows 的簡易型 node.js 伺服器，使用 GitHub 的 Releases 功能*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *支援 Squirrel.Windows 的簡易型 PHP 應用程式，由資料夾讀取更新內容。 支援差異更新。*

## 平臺注意事項

雖然 `autoUpdater` 為不同的平臺提供了統一的 API，但在每個平臺上仍有一些細微差異。

### macOS

在 macOS 上，`autoUpdater` 模組是架構在 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) 上，這代表你不能特別設定就能直接用。 伺服器端的需求，你可以查看[伺服器支援](https://github.com/Squirrel/Squirrel.Mac#server-support)。 Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

在 Windows 上，你必須先將先將應用程式安裝進使用者的電腦，才能使用 `autoUpdater`。因此建議你使用 [electron-winstaller ](https://github.com/electron/windows-installer)、[electron-forge](https://github.com/electron-userland/electron-forge) 或是 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) 等套件產出 Windows 安裝程式。

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

跟 Squirrel.Mac 不一樣，Windows 版可以將更新檔放在 S3 或任何靜態檔案主機上。 You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

### Linux

自動更新功能並不支援 Linux，建議你使用各發行版本的套件管理機制來更新你的應用程式。

## 事件

The `autoUpdater` object emits the following events:

### Event: 'error'

回傳:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

回傳:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## 方法

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