# autoUpdater

> Mở ứng dụng để tự động cập nhật.

Quá trình: [Main](../glossary.md#main-process)

**Bạn có thể tìm một hướng dẫn chi tiết về cách triển khai tính năng cập nhật vào trong ứng dụng [tại đây](../tutorial/updates.md).**

## Platform Notices

Hiện tại, chỉ macOS và Windows được hỗ trợ. Chưa có bản built-in hỗ trợ auto-updater trên Linux, nên chỉ có khuyến cáo sử dụng các distribution's package manager để cập nhật ứng dụng của bạn.

In addition, there are some subtle differences on each platform:

### macOS

On macOS, the `autoUpdater` module is built upon [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), meaning you don't need any special setup to make it work. For server-side requirements, you can read [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) package to generate a Windows installer.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

## Các sự kiện

The `autoUpdater` object emits the following events:

### Event: 'error'

Trả về:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

Trả về:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

## Các phương thức

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