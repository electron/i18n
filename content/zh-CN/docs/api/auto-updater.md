# autoUpdater

> 使应用程序能够自动更新

线程：[主线程](../glossary.md#main-process)

**您可以在 [这里](../tutorial/updates.md) 找到一个详细的指南，介绍如何将更新应用到您的应用程序。**

## 跨平台提醒

目前，只有 macOS 和 Window 支持该功能。在 Linux 上没有对自动更新程序的内置支持，因此建议使用发行版的包管理器来更新您的应用程序。

此外，每个平台都有一些细微的差别:

### macOS

在macOS上, `autoUpdater`模块建立在 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac)上,这意味着你不需要任何特殊的设置来使它工作。 对于服务器端要求, 你可以阅读 [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). 注意[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) 适用于所有请求作为更新过程的一部分。</0> 如需禁用ATS的应用程序可以在其应用程序的plist中添加 `NSAllowsArbitraryLoads`属性。

**注意:** 你的应用程序必须签署 macOS 自动更新。 这是 `Squirrel.Mac` 的要求。

### Windows

在 Windows 上, 你必须使用安装程序将你的应用装到用户的计算机上才能使用`autoUpdater`, 所以比较推荐的方法是用 [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge)或 [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) 模块来生成Windows安装程序。

当使用 [electron-winstaller](https://github.com/electron/windows-installer) 或 [electron-forge](https://github.com/electron-userland/electron-forge) 时，确保不要在[第一次运行](https://github.com/electron/windows-installer#handling-squirrel-events)时更新你的应用程序 (详情参阅 [这个问题的更多信息](https://github.com/electron/electron/issues/7155)). 还建议使用 [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 来创建应用程序的桌面快捷方式。

使用Squirrel生成的安装程序将以`com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`,的格式创建一个带有[Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) 的快捷图标,例子是 `com.squirrel.slack.Slack` 和 `com.squirrel.code.Code`.。 你应该在自己的应用中使用 `app.setAppUserModelId` API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。

与 Squirrel.Mac 不同，Windows 版可以将更新文件放在 S3 或者其他静态主机上。 你可以阅读 [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows)的文档来获得更多详细信息。

## 事件

`autoUpdater` 对象会触发以下的事件:

### Event: 'error'

返回:

* `error` Error

当更新发生错误的时候触发。

### Event: 'checking-for-update'

当开始检查更新的时候触发。

### Event: 'update-available'

当发现一个可用更新的时候触发，更新包下载会自动开始。

### Event: 'update-not-available'

当没有可用更新的时候触发。

### Event: 'update-downloaded'

返回:

* `event` Event
* `releaseNotes` String
* `releaseName` String
* `releaseDate` Date
* `updateURL` String

在更新下载完成的时候触发。

在 Windows 上只有 `releaseName` 是有效的。

## 方法

`autoUpdater` 对象具有以下方法:

### `autoUpdater.setFeedURL(选项)`

* `选项` Object 
  * `url` String
  * `headers` Object (可选) *macOS* - HTTP 请求头。
  * `serverType` String (可选) *macOS* - `json` 或者 `default`, 有关更多信息，请参考 [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) 的自述文件(README)。

设置检查更新的 `url`，并且初始化自动更新。

### `autoUpdater.getFeedURL()`

返回 `String` - 获取当前更新的 Feed 链接.

### `autoUpdater.checkForUpdates()`

向服务端查询现在是否有可用的更新。在调用这个方法之前，必须要先调用 `setFeedURL`。

### `autoUpdater.quitAndInstall()`

在下载完成后，重启当前的应用并且安装更新。这个方法应该仅在 `update-downloaded` 事件触发后被调用。

在此机制下，调用 `autoUpdater.quitAndInstall()` 将首先关闭所有应用程序窗口，并且在所有窗口都关闭之后自动调用 `app.quit()`

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.