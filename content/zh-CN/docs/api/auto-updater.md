# autoUpdater

> 使应用程序能够自动更新

线程：[主线程](../glossary.md#main-process)

` autoUpdater`模块提供一个接口给[ Squirrel](https://github.com/Squirrel)框架

你可以使用这些项目之一进行快速启动多平台发布服务器以分发应用程序:

* [nuts](https://github.com/GitbookIO/nuts): *为你的应用程序提供智能版本服务器, 使用GitHub作为后端。使用Squirrel(Mac和Windows) 自动更新*
* [electron-release-server](https://github.com/ArekSredzki/electron-release-server): *功能齐全, 自主托管的electron应用程序的发布服务器, 兼容自动更新器*
* [squirrel-updates-server](https://github.com/Aluxian/squirrel-updates-server): *对于使用 GitHub 版本的 Squirrel.Mac 和 Squirrel.Windows 的一个简单的 node.js 服务器*
* [squirrel-release-server](https://github.com/Arcath/squirrel-release-server): *一个简单的 Squirrel.Windows 的 PHP 应用程序，它从文件夹读取更新。并支持增量更新</1> *

## 平台相关的提示

虽然 `autoUpdater` 模块提供了一套各平台通用的接口，但是在每个平台间依然会有一些微小的差异。

### macOS

在macOS上, `autoUpdater`模块建立在 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac)上,这意味着你不需要任何特殊的设置来使它工作。 对于服务器端要求, 你可以阅读 [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). 注意[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) 适用于所有请求作为更新过程的一部分。</0> 如需禁用ATS的应用程序可以在其应用程序的plist中添加 `NSAllowsArbitraryLoads`属性。

**注意:** 你的应用程序必须签署 macOS 自动更新。 这是 `Squirrel.Mac` 的要求。

### Windows

在 Windows 上, 你必须使用安装程序将你的应用装到用户的计算机上才能使用`autoUpdater`, 所以比较推荐的方法是用 [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge)或 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) 模块来生成Windows安装程序。

当使用 [electron-winstaller](https://github.com/electron/windows-installer) 或 [electron-forge](https://github.com/electron-userland/electron-forge) 时，确保你不要尝试更新你的应用程序[第一次运行](https://github.com/electron/windows-installer#handling-squirrel-events) (详情参阅 [这个问题的更多信息](https://github.com/electron/electron/issues/7155)). 还建议使用 [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 来创建应用程序的桌面快捷方式。

使用Squirrel生成的安装程序将以`com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`,的格式创建一个带有[Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) 的快捷图标,例子是 `com.squirrel.slack.Slack` 和 `com.squirrel.code.Code`.。 你应该在自己的应用中使用 `app.setAppUserModelId` API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。

与 Squirrel.Mac 不同，Windows 版可以将更新文件放在 S3 或者其他静态主机上。 你可以阅读 [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows)的文档来获得更多详细信息。

### Linux

There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

## 事件

The `autoUpdater` object emits the following events:

### Event: 'error'

返回:

* `error` Error

Emitted when there is an error while updating.

### Event: 'checking-for-update'

Emitted when checking if an update has started.

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

### Event: 'update-not-available'

Emitted when there is no available update.

### Event: 'update-downloaded'

返回:

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