# autoUpdater

> 使应用程序能够自动更新

进程：[主进程](../glossary.md#main-process)

**请参阅：在应用程序中如何实现更新的详细指南。**

`autoUpdater`是一个[EventEmitter][event-emitter].

## 跨平台提醒

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

此外，每个平台都有一些细微的差别:

### macOS

在macOS上, `autoUpdater`模块建立在 [Squirrel.Mac][squirrel-mac]上,这意味着你不需要任何特殊的设置来使它工作。 对于服务器端要求, 你可以阅读 [Server Support][server-support]. 注意[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) 适用于所有请求作为更新过程的一部分。</0> 如需禁用ATS的应用程序可以在其应用程序的plist中添加 `NSAllowsArbitraryLoads`属性。

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### Windows

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller][installer-lib], [electron-forge][electron-forge-lib] or the [grunt-electron-installer][installer] package to generate a Windows installer.

When using [electron-winstaller][installer-lib] or [electron-forge][electron-forge-lib] make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). 还建议使用 [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) 来创建应用程序的桌面快捷方式。

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID][app-user-model-id] in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. 你应该在自己的应用中使用 `app.setAppUserModelId` API 方法设置相同的 API和ID，不然 Windows 将不能正确地把你的应用固定在任务栏上。

与 Squirrel.Mac 不同，Windows 版可以将更新文件放在 S3 或者其他静态主机上。 You can read the documents of [Squirrel.Windows][squirrel-windows] to get more details about how Squirrel.Windows works.

## 事件

`autoUpdater` 对象会触发以下的事件:

### 事件: 'error'

返回:

* `error` Error

当更新发生错误的时候触发。

### Event: 'checking-for-update'

当开始检查更新的时候触发。

### Event: 'update-available'

Emitted when there is an available update. The update is downloaded automatically.

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

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### Event:  'before-quit-for-update'

此事件是在用户调用`quitAndInstall()`之后发出的。

当此API被调用时，会在所有窗口关闭之前发出 `before-quit` 事件。 因此，如果您希望在关闭窗口进程退出之前执行操作，则应该侦听此事件，以及侦听 `before-quit`。

## 方法

`autoUpdater` 对象具有以下方法:

### `autoUpdater.setFeedURL(选项)`

* `options` Object
  * `url` String
  * `headers` Record<String, String> (可选) _macOS_ - HTTP 请求头。
  * `serverType` String (optional) _macOS_ - Can be `json` or `default`, see the [Squirrel.Mac][squirrel-mac] README for more information.

设置检查更新的 `url`，并且初始化自动更新。

### `autoUpdater.getFeedURL()`

返回 `String` - 获取当前更新的 Feed 链接.

### `autoUpdater.checkForUpdates()`

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### `autoUpdater.quitAndInstall()`

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

在此机制下，调用 `autoUpdater.quitAndInstall()` 将首先关闭所有应用程序窗口，并且在所有窗口都关闭之后自动调用 `app.quit()`

**注意:** 严格来讲，执行一次自动更新不一定要调用此方法。因为下载更新文件成功之后，下次应用启动的时候会强制更新。

[squirrel-mac]: https://github.com/Squirrel/Squirrel.Mac
[server-support]: https://github.com/Squirrel/Squirrel.Mac#server-support
[squirrel-windows]: https://github.com/Squirrel/Squirrel.Windows
[installer]: https://github.com/electron/grunt-electron-installer
[installer-lib]: https://github.com/electron/windows-installer
[electron-forge-lib]: https://github.com/electron-userland/electron-forge
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
