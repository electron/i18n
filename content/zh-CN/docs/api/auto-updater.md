# autoUpdater

> 启用自动更新来更新程序自己

进程：[主进程](../glossary.md#main-process)

**请参阅：在应用程序中如何实现更新的详细指南。**

`autoUpdater`是一个[EventEmitter][event-emitter].

## 跨平台提醒

目前只支持 macOS 和 Windows 版本。 在 Linux 上没有内置的自动更新程序，因此建议使用发行版包管理器来更新您的应用程序。

此外，每个平台都有一些细微的差别:

### macOS

在macOS上, `autoUpdater`模块建立在 [Squirrel.Mac][squirrel-mac]上,这意味着你不需要任何特殊的设置来使它工作。 对于服务器端要求, 你可以阅读 [Server Support][server-support]. 注意[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) 适用于所有请求作为更新过程的一部分。</0> 如需禁用ATS的应用程序可以在其应用程序的plist中添加 `NSAllowsArbitraryLoads`属性。

**注意：** 在 macOS 上，您的应用程序必须得到签名后方可自动更新。 这是 `Squirrel.Mac` 的要求。

### Windows

在 Windows 上，您必须将应用安装到用户的机器中，然后才能 使用 `autoUpdater`，因此建议您使用 [电子胜利器][installer-lib]、 [电子锻造][electron-forge-lib] 或 [咕噜电子安装器][installer] 包来生成 Windows 安装程序。

当使用 [电子胜利者][installer-lib] 或 [电子锻造][electron-forge-lib] 确保您不会尝试更新您的应用程序 [它第一次运行](https://github.com/electron/windows-installer#handling-squirrel-events) （也请参阅 [这个问题的更多信息](https://github.com/electron/electron/issues/7155)）。 还建议使用 [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 来创建应用程序的桌面快捷方式。

与松鼠生成的安装程序将创建一个快捷方式图标与 [应用程序用户模型ID][app-user-model-id] `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`的格式，示例 `com.squirrel.slack.Slack` 和 `com.squirrel.code.Code`。 你应该在自己的应用中使用 `app.setAppUserModelId` API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。

与 Squirrel.Mac 不同，Windows 版可以将更新文件放在 S3 或者其他静态主机上。 你可以阅读松鼠 [文档。视窗][squirrel-windows] 了解松鼠的更多细节。

## 事件

`autoUpdater` 对象会触发以下的事件:

### 事件: 'error'

返回:

* `error` Error

当更新发生错误的时候触发。

### Event: 'checking-for-update'

当开始检查更新的时候触发。

### Event: 'update-available'

当有可用更新的时候触发。 更新将自动下载。

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

**注意：** 此事件并不一定需要处理。 成功下载的更新仍将在应用程序下次启动时应用。

### Event:  'before-quit-for-update'

此事件是在用户调用`quitAndInstall()`之后发出的。

当此API被调用时，会在所有窗口关闭之前发出 `before-quit` 事件。 因此，如果您希望在关闭窗口进程退出之前执行操作，则应该侦听此事件，以及侦听 `before-quit`。

## 方法

`autoUpdater` 对象具有以下方法:

### `autoUpdater.setFeedURL(选项)`

* `选项` 对象
  * `url` String
  * `headers` Record<String, String> (可选) _macOS_ - HTTP 请求头。
  * `serverType` String(可选) _macOS_ - 可以是`json` 或者 `default`,查看 [Squirrel.Mac][squirrel-mac] 的README文件获取更多详细信息。

设置检查更新的 `url`，并且初始化自动更新。

### `autoUpdater.getFeedURL()`

返回 `String` - 获取当前更新的 Feed 链接.

### `autoUpdater.checkForUpdates()`

询问服务器是否有更新。 在使用此 API 之前，您必须调用`setFeedURL` 。

### `autoUpdater.quitAndInstall()`

重启应用并在下载后安装更新。 它只应在发出 `update-downloaded` 后方可被调用。

在此机制下，调用 `autoUpdater.quitAndInstall()` 将首先关闭所有应用程序窗口，并且在所有窗口都关闭之后自动调用 `app.quit()`

**注意:** 严格来讲，执行一次自动更新不一定要调用此方法。因为下载更新文件成功之后，下次应用启动的时候会强制更新。

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
