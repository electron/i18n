# autoUpdater

> 讓應用程式能自動更新版本。

處理序: [主處理序](../glossary.md#main-process)

**另請參閱：[有關如何在應用程序中實施更新的詳細指南](../tutorial/updates.md)**

`autoUpdater` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

## Platform Notices

目前僅支援macOS和Windows。 目前內建更新並沒有支援 linux，因此建議使用 發行版的軟體包管理器來更新您的應用。

此外，每個平台還存在一些細微的差異：

### macOS

在 macOS 上，`autoUpdater` 模組是架構在 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) 上，這代表你不能特別設定就能直接用。 伺服器端的需求，你可以查看[伺服器支援](https://github.com/Squirrel/Squirrel.Mac#server-support)。 Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**注意：**您的應用程序必須經過簽名才能在macOS上自動更新。 這是` Squirrel.Mac `的要求。

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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event: 'before-quit-for-update'

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

## 方法

The `autoUpdater` object has the following methods:

### `autoUpdater.setFeedURL(options)`

* `options` Object 
  * `url` String
  * `headers` Record<String, String> (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Sets the `url` and initialize the auto updater.

### `autoUpdater.getFeedURL()`

Returns `String` - The current update feed URL.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.