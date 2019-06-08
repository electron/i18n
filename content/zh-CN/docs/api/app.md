# app

> 控制你的应用程序的事件生命周期。

进程：[主进程](../glossary.md#main-process)

下面的这个例子将会展示如何在最后一个窗口被关闭时退出应用：

```javascript
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## 事件

`app` 对象会发出以下事件:

### 事件: 'will-finish-launching'

当应用程序完成基础的启动的时候被触发。 在 Windows 和 Linux 中, `will-finish-launching` 事件与 `ready` 事件是相同的; 在 macOS 中，这个事件相当于 `NSApplication` 中的 `applicationWillFinishLaunching` 提示。 通常会在这里为 `open-file` 和 `open-url` 设置监听器，并启动崩溃报告和自动更新。

绝大部分情况下，你必须在`ready`事件句柄中处理所有事务。

### 事件: 'ready'

返回:

* `launchInfo` Object *macOS*

当 Electron 完成初始化时被触发。 在 macOS 中, 如果从通知中心中启动，那么 `launchInfo` 中的 `userInfo` 包含用来打开应用程序的 `NSUserNotification` 信息。 你可以通过调用 `app.isReady()` 方法来检查此事件是否已触发。

### 事件: 'window-all-closed'

当所有的窗口都被关闭时触发。

如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果你监听了此事件，你可以控制是否退出程序。 如果用户按下了 `Cmd + Q`，或者开发者调用了 `app.quit()`，Electron 会首先关闭所有的窗口然后触发 `will-quit` 事件，在这种情况下 `window-all-closed` 事件不会被触发。

### 事件：'before-quit'

返回:

* `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behavior, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()`, then `before-quit` is emitted *after* emitting `close` event on all windows and closing them.

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'will-quit'

返回:

* `event` Event

当所有窗口都已关闭并且应用程序将退出时发出。调用 ` event. preventDefault () ` 将阻止终止应用程序的默认行为。

关于 ` window-all-closed` 和 ` will-quit ` 事件之间的差异, 请参见 `window-all-closed ` 事件的说明。

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'quit'

返回:

* `event` Event
* `exitCode` Integer

在应用程序退出时发出。

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'open-file' *macOS*

返回:

* `event` Event
* `path` String

当用户想要在应用中打开一个文件时发出。 `open-file` 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 `open-file`也会在一个文件被拖到 dock 并且还没有运行的时候发出。 请确认在应用启动的时候(甚至在 `ready` 事件发出前) 就对 `open-file` 事件进行监听。

如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

在 Windows 系统中，你需要解析 `process.argv` (在主进程中) 来获取文件路径

### 事件: 'open-url' *macOS*

返回:

* `event` Event
* `url` String

当用户想要在应用中打开一个 URL 时发出。 应用程序的 ` Info. plist ` 文件必须在 ` CFBundleURLTypes ` 项中定义 url 方案, 并将 ` NSPrincipalClass ` 设置为 ` AtomApplication `。

如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'activate' *macOS*

返回:

* `event` Event
* `hasVisibleWindows` Boolean

当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。

### 事件: 'continue-activity' *macOS*

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-包含由其他设备上的活动存储的应用程序特定状态。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 想要恢复时触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

只有具有支持相应的活动类型并且相同的开发团队 ID 作为启动程序时，用户行为才会进行。 所支持活动类型已在应用的 `Info.plist` 中的 `NSUserActivityTypes` 里明确定义。

### 事件: 'will-continue-activity' *macOS*

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 恢复之前触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'continue-activity-error' *macOS*

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `error` String - 详细的错误信息

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 恢复失败时触发。

### 事件: 'activity-was-continued' *macOS*

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-存储的应用程序特定状态。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 成功恢复后触发。

### 事件: 'update-activity-state' *macOS*

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-存储的应用程序特定状态。

当 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 即将通过另一个设备恢复时触发。 如果需要更新要传输的状态, 应立即调用 ` 事件. preventDefault () `, 构造新的 ` 用户信息 ` 字典, 并及时调用 ` 应用程序 updateCurrentActiviy () `。 Otherwise, the operation will fail and `continue-activity-error` will be called.

### 事件: 'new-window-for-tab' *macOS*

返回:

* `event` Event

当用户单击 macOS 新选项卡按钮时发出。仅当当前 ` BrowserWindow ` 具有 ` tabbingIdentifier ` 时, 才会显示新的选项卡按钮

### 事件: 'browser-window-blur'

返回:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

在 [ browserWindow ](browser-window.md) 失去焦点时发出。

### 事件: 'browser-window-focus'

返回:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

在 [ browserWindow ](browser-window.md) 获得焦点时发出。

### 事件: 'browser-window-created'

返回:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

在创建新的 [ browserWindow ](browser-window.md) 时发出。

### 事件: 'web-contents-created'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

在创建新的 [ webContents ](web-contents.md) 时发出。

### 事件: 'certificate-error'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - 错误码
* `certificate` [证书](structures/certificate.md)
* `callback` Function 
  * ` isTrusted `Boolean-是否将证书视为可信的

当对 `url` 的 `certificate` 证书验证失败的时候发出。如果需要信任这个证书，你需要阻止默认行为 `event.preventDefault()` 并且调用 `callback(true)`。

```javascript
const { app } = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // Verification logic.
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### 事件: 'select-client-certificate'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [证书[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [证书](structures/certificate.md) (可选)

当一个客户证书被请求的时候发出。

`url` 指的是请求客户端认证的网页地址，调用 `callback` 时需要传入一个证书列表中的证书。 需要通过调用 `event.preventDefault()` 来防止应用自动使用第一个证书进行验证。

```javascript
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### 事件: "login"

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

当 ` webContents ` 要进行基本身份验证时触发。

The default behavior is to cancel all authentications. To override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### Event: 'gpu-process-crashed'

返回:

* `event` Event
* `killed` Boolean

当 gpu 进程崩溃或被杀时触发。

### 事件: "accessibility-support-changed" * macOS * * Windows *

返回:

* `event` Event
* ` accessibilitySupportEnabled `当启用了 Chrome 的辅助功能时为 ` true `, 其他情况为 ` false `。

当 Chrome 的辅助功能状态改变时触发。 当启用或禁用辅助技术时将触发此事件，例如屏幕阅读器 。 查看更多详情 https://www.chromium.org/developers/design-documents/accessibility

### 事件:'session-created'

返回:

* `session` [Session](session.md)

当 Electron创建了一个新的 `session`后被触发.

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### 事件: 'second-instance'

返回:

* `event` Event
* `argv` String[] - 第二个实例的命令行参数数组
* `workingDirectory` String - 第二个实例的工作目录

This event will be emitted inside the primary instance of your application when a second instance has been executed and calls `app.requestSingleInstanceLock()`.

`argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

**Note:** Extra command line arguments might be added by Chromium, such as `--original-process-start-time`.

### Event: 'desktop-capturer-get-sources'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### 事件: 'remote-require'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-global'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止全局返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-builtin'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-current-window'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-current-web-contents'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-guest-web-contents'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

## 方法

The `app` object has the following methods:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

### `app.quit()`

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### `app.exit([exitCode])`

* `exitCode` Integer (可选)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking the user, and the `before-quit` and `will-quit` events will not be emitted.

### `app.relaunch([options])`

* `options` Object (可选) 
  * `args` String[] (可选)
  * `execPath` String (可选)

Relaunches the app when current instance exits.

By default, the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### `app.whenReady()`

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` *macOS*

Hides all application windows without minimizing them.

### `app.show()` *macOS*

Shows application windows after they were hidden. Does not automatically focus them.

### `app.getAppPath()`

Returns `String` - The current application directory.

### `app.getPath(name)`

* `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

You can request the following paths by the name:

* `home` 用户的 home 文件夹（主目录）
* `appData` 当前用户的应用数据文件夹，默认对应： 
  * `%APPDATA%` Windows 中
  * `$XDG_CONFIG_HOME` or `~/.config` Linux 中
  * `~/Library/Application Support` macOS 中
* `userData` 储存你应用程序设置文件的文件夹，默认是 `appData` 文件夹附加应用的名称
* `temp` 临时文件夹
* ` exe `当前的可执行文件
* `module` The `libchromiumcontent` 库
* `desktop` 当前用户的桌面文件夹
* `documents` 用户文档目录的路径
* `downloads` 用户下载目录的路径
* `music` 用户音乐目录的路径
* `pictures` 用户图片目录的路径
* `videos` 用户视频目录的路径
* ` logs `应用程序的日志文件夹
* `pepperFlashSystemPlugin` Pepper Flash 插件的系统版本的完成路径。

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (可选) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - *Linux*上是 48x48, *Windows* 上是 32x32, *macOS* 中无效
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

**[Deprecated Soon](promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (可选) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - *Linux*上是 48x48, *Windows* 上是 32x32, *macOS* 中无效

Returns `Promise<NativeImage>` - fulfilled with the app's icon, which is a [NativeImage](native-image.md).

Fetches a path's associated icon.

On *Windows*, there a 2 kinds of icons:

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

On *Linux* and *macOS*, icons depend on the application associated with file mime type.

### `app.setPath(name, path)`

* `name` String
* `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### `app.getVersion()`

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### `app.getName()`

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### `app.setName(name)`

* `name` String

Overrides the current application's name.

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows, you have to call it after the `ready` events gets emitted.

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**Note:** When unable to detect locale country code, it returns empty string.

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` *macOS* *Windows*

Clears the recent documents list.

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。 如果您希望应用程序处理 `electron://` 的链接, 请将 ` electron ` 作为该方法的参数.
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

Returns `Boolean` - Whether the call succeeded.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows, you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - 由 `Task` 对象组成的数组

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](structures/task.md) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### `app.getJumpListSettings()` *Windows*

返回 ` Object `:

* `minItems` Integer - 将在跳转列表中显示项目的最小数量(有关此值的更详细描述，请参阅 [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - `JumpListItem` 对象组成的数组，对应用户在跳转列表中明确删除的项目。 这些项目不能在 **next** 调用 `app.setJumpList()` 时重新添加到跳转列表中, Windows不会显示任何包含已删除项目的自定义类别.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - `JumpListCategory` 对象组成的数组

Sets or removes a custom Jump List for the application, and returns one of the following strings:

* `ok` - 没有出现错误
* `error` - 发生一个或多个错误，启用运行日志记录找出可能的原因。
* `invalidSeparatorError` - 尝试向跳转列表中的自定义跳转列表添加分隔符。 分隔符只允许在标准的 `Tasks` 类别中。
* `fileTypeRegistrationError` -尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
* `customCategoryAccessDeniedError` - 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**注意:** 如果 `JumpListCategory` 对象没有设置 `type` 和 `name` 属性， name `type`默认为 `tasks`。 如果设置了 `name` 属性，省略了 `type` 属性，那么 `type` 默认为 `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // 已经有一个名字所以 `type` 被认为是 "custom"
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { //这里没有设置名字 所以 `type` 被认为是 "tasks"
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

Returns `Boolean`

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock, you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS, the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line, the system's single instance mechanism will be bypassed, and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

Returns `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用
* `webpageURL` String (可选) - 如果在恢复设备上未安装合适的应用程序，则会在浏览器中加载网页。 该格式必须是 `http` 或 `https`。

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - pkcs12 文件的路径
  * `password` String - 证书的密码
* `callback` Function 
  * `result` Integer - 导入结果

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.getGPUInfo(infoType)`

* `infoType` String - 值可以是基本信息的`basic`，也可以是完整信息的`complete`

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src.git/+/69.0.3497.106/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:

```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (可选) 
  * ` path `String (可选) * Windows *-要比较的可执行文件路径。默认为 ` process. execPath `。
  * ` 参数 `String [] (可选) * Windows *-要比较的命令行参数。默认为空数组。

If you provided `path` and `args` options to `app.setLoginItemSettings`, then you need to pass the same arguments here for `openAtLogin` to be set correctly.

返回 ` Object `:

* `openAtLogin` Boolean - `true` 如果应用程序设置为在登录时打开, 则为 <0>true</0>
* `openAsHidden` Boolean *macOS* - `true` 表示应用在登录时以隐藏的方式启动。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `wasOpenedAtLogin` Boolean *macOS* - `true` 表示应用在自动登录后已经启动。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* ` wasOpenedAsHidden `Boolean *macOS* - 如果应用在登录时已经隐藏启动, 则为 ` true `。 这表示应用程序在启动时不应打开任何窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `restoreState` Boolean *macOS* - `true` 表示应用作为登录启动项并且需要恢复之前的会话状态。 这表示程序应该还原上次关闭时打开的窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (可选) - `true`在登录时启动应用，`false` 移除应用作为登录启动项 。默认为 `false`.
  * `openAsHidden` Boolean (可选) *macOS* - `true` 表示以隐藏的方式启动应用。 默认为`false`。 用户可以从系统首选项中编辑此设置, 以便在打开应用程序时检查 `app.getLoginItemSettings().wasOpenedAsHidden` 以了解当前值。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
  * `path` String (可选) *Windows* - 在登录时启动的可执行文件。默认为 `process.execPath`.
  * `args` String[] (可选) *Windows* - 要传递给可执行文件的命令行参数。默认为空数组。注意用引号将路径换行。

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. 例如：

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enable` 逻辑值 - 启用或禁用[访问权限树](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)视图。

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.showAboutPanel` *macOS* *Linux*

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Object 
  * `applicationName` String (可选) - 应用程序的名字
  * `applicationVersion` String (可选) - 应用程序版本
  * `copyright` String (可选) - 版权信息
  * `version` String (optional) - The app's build version number. *macOS*
  * `credits` String (optional) - Credit information. *macOS*
  * `website` String (optional) - The app's website. *Linux*
  * `iconPath` String (optional) - Path to the app's icon. *Linux*

Set the about panel options. This will override the values defined in the app's `.plist` file on MacOS. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details. On Linux, values must be set in order to be shown; there are no defaults.

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - base64 编码的安全作用域的书签数据(bookmark data) ，通过 `dialog.showOpenDialog` 或者 `dialog.showSaveDialog` 方法获取。

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
//开始读取文件
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - 命令行开关
* `value` String (optional) - 给开关设置的值

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* ` value `String - 要追加到命令行的参数

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.commandLine.hasSwitch(switch)`

* `switch` String - 命令行开关

Returns `Boolean` - Whether the command-line switch is present.

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - 命令行开关

Returns `String` - The command-line switch value.

**Note:** When the switch is not present, it returns empty string.

### `app.enableSandbox()` *Experimental* *macOS* *Windows*

Enables full sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog, this method returns false. If we fail to perform the copy, then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (可选) - 可以为`critical` 或 `informational`. 默认值为 `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

Hides the dock icon.

### `app.dock.show()` *macOS*

Shows the dock icon.

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.

## 属性

### `app.isPackaged`

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.