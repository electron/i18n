# autoUpdater

> 讓應用程式能自動更新版本。

處理序: [主處理序](../glossary.md#main-process)

**You can find a detailed guide about how to implement updates into your application [here](../tutorial/updates.md).**

## Platform Notices

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### macOS

在 macOS 上，`autoUpdater` 模組是架構在 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) 上，這代表你不能特別設定就能直接用。 伺服器端的需求，你可以查看[伺服器支援](https://github.com/Squirrel/Squirrel.Mac#server-support)。 Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

在 Windows 上，你必須先將先將應用程式安裝進使用者的電腦，才能使用 `autoUpdater`。因此建議你使用 [electron-winstaller ](https://github.com/electron/windows-installer)、[electron-forge](https://github.com/electron-userland/electron-forge) 或是 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) 等套件產出 Windows 安裝程式。

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

跟 Squirrel.Mac 不一樣，Windows 版可以將更新檔放在 S3 或任何靜態檔案主機上。 You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

## 事件

The `autoUpdater` object emits the following events:

### 事件: 'error'

回傳:

* `error` Error

Emitted when there is an error while updating.

### 事件: 'checking-for-update'

Emitted when checking if an update has started.

### 事件: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### 事件: 'update-not-available'

Emitted when there is no available update.

### 事件: 'update-downloaded'

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

### `autoUpdater.setFeedURL(options)`

* `options` Object 
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