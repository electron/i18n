# app

> 控制应用程序的事件生命周期。

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

* `launchInfo` Object _macOS_

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

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

关于 ` window-all-closed` 和 ` will-quit ` 事件之间的差异, 请参见 `window-all-closed ` 事件的说明。

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'quit'

返回:

* `event` Event
* `exitCode` Integer

在应用程序退出时发出。

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'open-file' _macOS_

返回:

* `event` Event
* `path` String

当用户想要在应用中打开一个文件时发出。 `open-file` 事件通常在应用已经打开，并且系统要再次使用该应用打开文件时发出。 `open-file`也会在一个文件被拖到 dock 并且还没有运行的时候发出。 请确认在应用启动的时候(甚至在 `ready` 事件发出前) 就对 `open-file` 事件进行监听。

如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

在 Windows 系统中，你需要解析 `process.argv` (在主进程中) 来获取文件路径

### 事件: 'open-url' _macOS_

返回:

* `event` Event
* `url` String

当用户想要在应用中打开一个 URL 时发出。 应用程序的 ` Info. plist ` 文件必须在 ` CFBundleURLTypes ` 项中定义 url 方案, 并将 ` NSPrincipalClass ` 设置为 ` AtomApplication `。

如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'activate' _macOS_

返回:

* `event` Event
* `hasVisibleWindows` Boolean

当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。

### 事件: 'continue-activity' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-包含由其他设备上的活动存储的应用程序特定状态。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 想要恢复时触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

只有具有支持相应的活动类型并且相同的开发团队 ID 作为启动程序时，用户行为才会进行。 所支持活动类型已在应用的 `Info.plist` 中的 `NSUserActivityTypes` 里明确定义。

### 事件: 'will-continue-activity' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 恢复之前触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'continue-activity-error' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `error` String - 详细的错误信息

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 恢复失败时触发。

### 事件: 'activity-was-continued' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-存储的应用程序特定状态。

当来自不同设备的活动通过 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 成功恢复后触发。

### 事件: 'update-activity-state' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* ` userInfo `Object-存储的应用程序特定状态。

当 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 即将通过另一个设备恢复时触发。 如果需要更新要传输的状态, 应立即调用 ` 事件. preventDefault () `, 构造新的 ` 用户信息 ` 字典, 并及时调用 ` 应用程序 updateCurrentActiviy () `。 否则，操作会失败，并且触发 `continue-activity-error`

### 事件: 'new-window-for-tab' _macOS_

返回:

* `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

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

默认行为是取消所有身份验证。 默认行为是取消所有的验证行为，如果需要重写这个行为，你需要用 `event.preventDefault()` 来阻止默认行为，并且使用 `callback(username, password)` 来验证。

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

### Event: 'renderer-process-crashed'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

Emitted when the renderer process of `webContents` crashes or is killed.

### 事件: "accessibility-support-changed" _ macOS _ _ Windows _

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

当第二个实例被执行并且调用 `app.requestSingleInstanceLock()` 时，这个事件将在你的应用程序的首个实例中触发

` argv ` 是第二个实例的命令行参数的数组, ` workingDirectory ` 是这个实例当前工作目录。 通常, 应用程序会激活窗口并且取消最小化来响应。

保证在 `app` 的 `ready` 事件发出后发出此事件。

**注意：** 额外命令行参数可能由 Chromium 添加， ，例如 `--original-process-start-time`。

### 事件: 'desktop-capturer-get-sources'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

Emitted when `desktopCapturer.getSources()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will make it return empty sources.

### 事件: 'remote-require'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

在 `webContents` 的渲染器进程中调用 `remote.require()` 时发出。 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-global'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

在 `webContents` 的渲染器进程中调用 `remote.getGlobal()` 时发出。 调用 `event.preventDefault()` 将阻止全局返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-builtin'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `moduleName` String

在 `webContents` 的渲染器进程中调用 `remote.getBuiltin()` 时发出。 调用 `event.preventDefault()` 将阻止模块返回。 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-current-window'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

在 `webContents` 的渲染器进程中调用 `remote.getCurrentWindow()` 时发出。 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-current-web-contents'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

在 `webContents` 的渲染器进程中调用 `remote.getCurrentWebContents()` 时发出。 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

### 事件: 'remote-get-guest-web-contents'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

在`webContents`的渲染进程中调用`getWebContents`时触发 调用 `event.preventDefault()` 将阻止对象返回 可以通过设置 `event.returnValue` 返回自定义值。

## 方法

` app ` 对象具有以下方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

### `app.quit()`

尝试关闭所有窗口 将首先发出 ` before-quit ` 事件。 如果所有窗口都已成功关闭, 则将发出 ` will-quit` 事件, 并且默认情况下应用程序将终止。

此方法会确保执行所有` beforeunload ` 和 `unload`事件处理程序。 可以在退出窗口之前的` beforeunload `事件处理程序中返回` false `取消退出。

### `app.exit([exitCode])`

* `exitCode` Integer (可选)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

所有窗口都将立即被关闭，而不询问用户，而且 `before-quit` 和 `will-quit` 事件也不会被触发。

### `app.relaunch([options])`

* `options` Object (optional)
  * `args` String[] (可选)
  * `execPath` String (可选)

从当前实例退出，重启应用。

默认情况下，新的实例将会使用和当前实例相同的工作目录以及命令行参数。 当设置了 `args` 参数时， `args` 将作为命令行参数传递。 当设置了 `execPath` ，`execPath` 将被执行以重新启动，而不是当前的应用程序。

请注意, 此方法在执行时不会退出当前的应用程序, 你需要在调用 `app.relaunch` 方法后再执行 ` app. quit` 或者 ` app.exit ` 来让应用重启。

当 `app.relaunch` 被多次调用时,多个实例将在当前实例退出后启动。

立即重启当前实例并向新的实例添加新的命令行参数的示例：

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

返回 `Boolean` 类型 - 如果 Electron 已经完成初始化，则返回 `true`, 其他情况为 `false`

### `app.whenReady()`

返回 `Promise<void>` - 当Electron 初始化完成。 可用作检查 `app.isReady()` 的方便选择，假如应用程序尚未就绪，则订阅`ready`事件。

### `app.focus()`

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### `app.hide()` _macOS_

隐藏所有的应用窗口，不是最小化.

### `app.show()` _macOS_

Shows application windows after they were hidden. Does not automatically focus them.

### `app.setAppLogsPath(path)`

* `path` String (optional) - A custom path for your logs. Must be absolute.

Sets or creates a directory your app's logs which can then be manipulated with `app.getPath()` or `app.setPath(pathName, newPath)`.

Calling `app.setAppLogsPath()` without a `path` parameter will result in this directory being set to `/Library/Logs/YourAppName` on _macOS_, and inside the `userData` directory on _Linux_ and _Windows_.

### `app.getAppPath()`

返回 `String` 类型 - 当前应用程序所在目录

### `app.getPath(name)`

* `name` 字符串

Returns `String` - A path to a special directory or file associated with `name`. On failure, an `Error` is thrown.

你可以通过名称请求以下的路径:

* `home` 用户的 home 文件夹（主目录）
* `appData` Per-user application data directory, which by default points to:
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
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

读取文件的关联图标。

On _Windows_, there are 2 kinds of icons:

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

在 _Linux_ 和 _macOS_ 系统中，图标取决于和应用程序绑定的 文件 mime 类型

**[即将弃用](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (optional)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.

返回 `Promise<NativeImage>` - 完成后返回当前应用的图标, 类型是 [NativeImage](native-image.md).

读取文件的关联图标。

在 _Windows_ 上, 会有两种图标：

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

在 _Linux_ 和 _macOS_ 系统中，图标取决于和应用程序绑定的 文件 mime 类型

### `app.setPath(name, path)`

* `name` 字符串
* `path` String

重写 `name` 的路径为 `path`，一个特定的文件夹或者文件。 If the path specifies a directory that does not exist, an `Error` is thrown. In that case, the directory should be created with `fs.mkdirSync` or similar.

`name` 参数只能使用 `app.getPath` 定义过的 name

默认情况下, 网页的 cookie 和缓存将存储在 ` userData ` 目录下。 如果要更改这个位置, 你需要在 ` app ` 模块中的 ` ready` 事件被触发之前重写 ` userData ` 的路径。

### `app.getVersion()`

返回 ` String `-加载的应用程序的版本。 如果应用程序的 ` package. json ` 文件中找不到版本号, 则返回当前包或者可执行文件的版本。

### `app.getName()`

返回 ` String `-当前应用程序的名称, 它是应用程序的 ` package. json ` 文件中的名称。

根据 npm 的命名规则, 通常 `package.json` 中的 `name` 字段是一个短的小写字符串。 通常还应该指定一个 ` productName ` 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。

### `app.setName(name)`

* `name` 字符串

设置当前应用程序的名字

### `app.getLocale()`

Returns `String` - The current application locale. Possible return values are documented [here](locales.md).

要设置区域，则需要在应用启动时使用命令行时打开开关，你可以在[这里](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md)找到。

** 注意: **分发打包的应用程序时, 你必须指定 ` locales ` 文件夹。

**注意：** 在 Windows 上，你必须得等 `ready` 事件触发之后，才能调用该方法

### `app.getLocaleCountryCode()`

Returns `string` - User operating system's locale two-letter [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country code. The value is taken from native OS APIs.

**注意：** 当无法检测本地国家代码时，它返回空字符串。

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

将此 `path` 添加到最近打开的文件列表中

This list is managed by the OS. On Windows, you can visit the list from the task bar, and on macOS, you can visit it from dock menu.

### `app.clearRecentDocuments()` _macOS_ _Windows_

清空最近打开的文档列表

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。 如果您希望应用程序处理 `electron://` 的链接, 请将 ` electron ` 作为该方法的参数.
* ` path `String (可选) _ Windows _-默认为 ` process.execPath `
* `args` String[] (可选) _Windows_ - 默认为空数组

返回 ` Boolean `-是否成功调用。

此方法将当前可执行文件设置为协议(也称为URI方案) 的默认处理程序。 它允许您将应用程序更深入地集成到操作系统中。 一旦注册成功, 所有 `your-protocol://` 格式的链接都会使用你的程序打开。 整个链接 (包括协议) 将作为参数传递给您的应用程序。

在 Windows 系统中，你可以提供可选参数 path（可执行文件的路径）和 args（在启动时传递给可执行文件的参数数组）

** 注意: **在 macOS 上, 您只能注册已添加到应用程序的 ` info. plist ` 中的协议, 在运行时不能对其进行修改。 但是，您可以在构建时使用简单的文本编辑器或脚本更改文件。 有关详细信息，请参阅 [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115)

**Note:** In a Windows Store environment (when packaged as an `appx`) this API will return `true` for all calls but the registry key it sets won't be accessible by other applications.  In order to register your Windows Store application as a default protocol handler you must [declare the protocol in your manifest](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol).

API 在内部使用 Windows 注册表和 LSSetDefaultHandlerForURLScheme。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) _ Windows _-默认为 ` process.execPath `
* `args` String[] (可选) _Windows_ - 默认为空数组

返回 ` Boolean `-是否成功调用。

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) _ Windows _-默认为 ` process.execPath `
* `args` String[] (可选) _Windows_ - 默认为空数组

返回 `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

** 注意: **在macOS上, 您可以使用此方法检查应用程序是否已注册为协议的默认协议处理程序。 同时可以通过查看 `~/Library/Preferences/com.apple.LaunchServices.plist` 来确认。 有关详细信息，请参阅 [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme)

该API在内部使用 Windows 注册表和 LSCopyDefaultHandlerForURLScheme。

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - 由 `Task` 对象组成的数组

将 `tasks` 添加到 Windows 中 JumpList 功能的 [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) 分类中。

`tasks` 是 [`Task`](structures/task.md) 对象组成的数组

返回 ` Boolean `-是否成功调用。

** 注意: **如果您想自定义跳转列表, 请使用 ` aapp.setJumpList(categories) ` 来代替。

### `app.getJumpListSettings()` _Windows_

返回 ` Object `:

* `minItems` Integer - 将在跳转列表中显示项目的最小数量(有关此值的更详细描述，请参阅 [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - `JumpListItem` 对象组成的数组，对应用户在跳转列表中明确删除的项目。 这些项目不能在 **next** 调用 `app.setJumpList()` 时重新添加到跳转列表中, Windows不会显示任何包含已删除项目的自定义类别.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - `JumpListCategory` 对象组成的数组

设置或删除应用程序的自定义跳转列表，并返回以下字符串之一：

* `ok` - 没有出现错误
* `error` - 发生一个或多个错误，启用运行日志记录找出可能的原因。
* `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
* `fileTypeRegistrationError` -尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
* `customCategoryAccessDeniedError` - 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。

如果 `categories` 的值为 `null`， 之前设定的自定义跳转列表(如果存在) 将被替换为标准的应用跳转列表(由windows生成)

** 注意: **如果 ` JumpListCategory ` 对象既没有 ` type `, 也没有 ` name ` 属性设置, 则其 ` type ` 被假定为 ` tasks `。 如果设置了 ` name ` 属性, 但省略了 ` type ` 属性, 则假定 ` type ` 为 ` custom`。

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. 尝试提前将删除的项目重新添加 到自定义类别中，将导致整个自定义类别被隐藏。 删除的项目可以使用 `app.getJumpListSettings()` 获取。

下面是创建自定义跳转列表的一个非常简单的示例:

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

返回 `Boolean`

此方法的返回值表示你的应用程序实例是否成功取得了锁。  如果它取得锁失败，你可以假设另一个应用实例已经取得了锁并且仍旧在运行，并立即退出。

例如：如果你的程序是应用的主要实例并且当这个方法返回 `true`时，你应该继续让你的程序运行。  如果当它返回 `false`如果你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。

在 macOS 上, 当用户尝试在 Finder 中打开您的应用程序的第二个实例时, 系统会通过发出 ` open-file ` 和 ` open-url ` 事件来自动强制执行单个实例,。 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 您必须手动调用此方法来确保单实例。

在第二个实例启动时激活主实例窗口的示例:

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

返回 `Boolean`

此方法返回你的应用实例当前是否持有单例锁。  你可以通过 `app.requestSingleInstanceLock()`请求锁，并且通过 `app.releaseSingleInstanceLock()` 释放锁。

### `app.releaseSingleInstanceLock()`

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

创建一个 ` NSUserActivity ` 并将其设置为当前活动。 该活动之后可以[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)到另一个设备。

### `app.getCurrentActivityType()` _macOS_

返回 `String` - 正在运行的 activity 的类型

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。

使当前的[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)用户活动无效。

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用

当其类型与 ` type ` 匹配时更新当前活动, 将项目从 ` 用户信息 ` 合并到其当前 ` 用户信息 ` 字典中。

### `app.setAppUserModelId(id)` _Windows_

* `id` String

改变当前应用的 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) 为 `id`.

### `app.importCertificate(options, callback)` _LINUX_

* `options` Object
  * `certificate` String - pkcs12 文件的路径
  * `password` String - 证书的密码
* `callback` Function
  * `result` Integer - 导入结果

将 pkcs12 格式的证书导入到平台证书库。 使用导入操作的 `callback` 调用返回 `result` ，值 `0` 表示成功，而任何其他值表示失败，根据Chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) 。

### `app.disableHardwareAcceleration()`

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.getAppMetrics()`

返回 [`ProcessMetric[]`](structures/process-metric.md): 包含所有与应用相关的进程的内存和CPU的使用统计的 `ProcessMetric` 对象的数组。

### `app.getGPUFeatureStatus()`

返回 [` GPUFeatureStatus `](structures/gpu-feature-status.md)-来自 ` chrome://gpu/` 的图形功能状态。

### `app.getGPUInfo(infoType)`

* `infoType` String - 值可以是基本信息的`basic`，也可以是完整信息的`complete`

返回 ` Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc). 这包括 `chrome://gpu` 页面上显示的版本和驱动程序信息。

对于` infoType `等于` basic `： Promise 至少包含当请求`complete`时的属性`Object`。 下面是一个基础响应示例：
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
如果只需要基本信息，如` vendorId `或` driverId `，则应优先使用` basic `。

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

返回 ` Boolean `-是否成功调用。

设置当前应用程序的计数器标记. 将计数设置为 ` 0 ` 将隐藏该标记。

On macOS, it shows on the dock icon. On Linux, it only works for Unity launcher.

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher).

### `app.getBadgeCount()` _Linux_ _macOS_

Returns `Integer` - 获取计数器提醒(badge) 中显示的当前值

### `app.isUnityRunning()` _Linux_

Returns `Boolean` - 当前桌面环境是否为 Unity 启动器

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (optional)
  * `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

如果你为 ` app. setLoginItemSettings ` 提供` path ` 和 ` args ` 选项，那么你需要在这里为 ` openAtLogin ` 设置相同的参数已确保正确的设置。

返回 `Object`:

* `openAtLogin` Boolean - `true` 如果应用程序设置为在登录时打开, 则为 <0>true</0>
* `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. 这表示应用程序在启动时不应打开任何窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. 这表示程序应该还原上次关闭时打开的窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. 默认值为 `false`.
  * `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. 默认为`false`。 用户可以从系统首选项中编辑此设置, 以便在打开应用程序时检查 `app.getLoginItemSettings().wasOpenedAsHidden` 以了解当前值。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
  * `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

设置应用程序的登录项设置。

如果需要在使用[Squirrel](https://github.com/Squirrel/Squirrel.Windows)的 Windows 上使用 Electron 的 `autoUpdater` ，你需要将启动路径设置为 Update.exe，并传递指定应用程序名称的参数。 例如：

``` javascript
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

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

Returns `Boolean` - 如果开启了Chrome的辅助功能, 则返回 `true`，其他情况返`false`。 如果使用了辅助技术（例如屏幕阅读），该 API 将返回 `true</0。 查看更多细节，请查阅
https://www.chromium.org/developers/design-documents/accessibility</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">即将弃用</a></strong></p>

<h3 spaces-before="0"><code>app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_</h3>

* `enable` 逻辑值 - 启用或禁用[访问权限树](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)视图。

手动启用 Chrome 的辅助功能的支持, 允许在应用程序中设置是否开启辅助功能。 在[Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility)查看更多的细节 默认为禁用

此 API 必须在 `ready` 事件触发后调用

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

**[即将弃用](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

Show the app's about panel options. These options can be overridden with `app.setAboutPanelOptions(options)`.

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (可选) - 应用程序的名字
  * `applicationVersion` String (可选) - 应用程序版本
  * `copyright` String (可选) - 版权信息
  * `version` String (可选) - 应用程序版本号 _macOS_
  * `credits` String (可选) - 信用信息. _macOS_
  * `website` String (optional) - The app's website. _Linux_
  * `iconPath` String (optional) - Path to the app's icon. Will be shown as 64x64 pixels while retaining aspect ratio. _Linux_

设置 "关于" 面板选项。 This will override the values defined in the app's `.plist` file on MacOS. 更多详细信息, 请查阅 [ Apple 文档 ](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc)。 在 Linux 上，没有默认值，所以必须设置值才能显示。

If you do not set `credits` but still wish to surface them in your app, AppKit will look for a file named "Credits.html", "Credits.rtf", and "Credits.rtfd", in that order, in the bundle returned by the NSBundle class method main. The first file found is used, and if none is found, the info area is left blank. See Apple [documentation](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) for more information.

### `app.isEmojiPanelSupported`

Returns `Boolean` - whether or not the current OS version allows for native emoji pickers.

### `app.showEmojiPanel` _macOS_ _Windows_

Show the platform's native emoji picker.

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - base64 编码的安全作用域的书签数据(bookmark data) ，通过 `dialog.showOpenDialog` 或者 `dialog.showSaveDialog` 方法获取。

返回 `Function` - 该函数 **必须** 在你完成访问安全作用域文件后调用一次。 如果你忘记停止访问书签，[内核资源将会泄漏](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc)，并且你的应用将失去完全到达沙盒之外的能力，直到应用重启。

```js
//开始读取文件
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 🎉

// Remember to stop accessing the file once you've finished with it.
stopAccessingSecurityScopedResource()
```

开始访问安全范围内的资源。 通过这个方法，Electron 应用被打包为可到达Mac App Store沙箱之外访问用户选择的文件。 关于系统工作原理，请查阅[Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - 命令行开关，不包含前边的-- `--`
* `value` String (optional) - 给开关设置的值

通过可选的参数 `value` 给 Chromium 中添加一个命令行开关。

** 注意: **该方法不会影响 ` process. argv ` 该功能是为控制Chromium行为设计的。

### `app.commandLine.appendArgument(value)`

* ` value `String - 要追加到命令行的参数

在Chromium的命令行中附加一个参数。 The argument will be quoted correctly. 无论附加顺序如何，切换将在参数之前进行。

如果你正在追加一个参数，如`--switch=value`, 请考虑使用`appendSwitch('switch', 'value')`

** 注意: **该方法不会影响 ` process. argv ` 该功能是为控制Chromium行为设计的。

### `app.commandLine.hasSwitch(switch)`

* `switch` String - 命令行开关

返回`Boolean` - 命令行开关是否打开。

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - 命令行开关

返回 `String` - 命令行开关值。

**注意：** 当开关不存在或没有值时，它返回空字符串。

### `app.enableSandbox()` _实验功能_

在应用程序上启用完全沙盒模式。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.isInApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` _macOS_

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful, your application will quit and relaunch.

No confirmation dialog will be presented by default. If you wish to allow the user to confirm the operation, you may do so using the [`dialog`](dialog.md) API.

**注意:**如果并非是用户造成操作失败，这个方法会抛出错误。 例如，如果用户取消了授权会话，这个方法将返回false。 如果无法执行复制操作, 则此方法将抛出错误。 错误中的信息应该是信息性的，并告知具体问题。

### `app.dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

返回 `Integer` 这个请求的 ID

当传入的是 `critical` 时, dock 中的应用将会开始弹跳, 直到这个应用被激活或者这个请求被取消。

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

取消这个 ` id ` 对应的请求。

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

如果 filePath 位于 Downloads 文件夹中，则弹出下载队列。

### `app.dock.setBadge(text)` _macOS_

* `text` String

设置应用在 dock 中显示的字符串。

### `app.dock.getBadge()` _macOS_

返回 `String` - 应用在 dock 中显示的字符串。

### `app.dock.hide()` _macOS_

隐藏 dock 中的图标。

### `app.dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

设置应用程序的[Dock 菜单](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/)。

### `app.dock.getMenu()` _macOS_

Returns `Menu | null` - The application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为应用在 dock 中显示的图标

## 属性

### `app.applicationMenu`

A `Menu` property that return [`Menu`](menu.md) if one has been set and `null` otherwise. Users can pass a [Menu](menu.md) to set this property.

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

A `Boolean` property that's `true` if Chrome's accessibility support is enabled, `false` otherwise. This property will be `true` if the use of assistive technologies, such as screen readers, has been detected. Setting this property to `true` manually enables Chrome's accessibility support, allowing developers to expose accessibility switch to users in application settings.

See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. 默认为禁用

此 API 必须在 `ready` 事件触发后调用

**注意:** 渲染进程树会明显的影响应用的性能。默认情况下不应该启用。

### `app.userAgentFallback`

A `String` which is the user agent string Electron will use as a global fallback.

This is the user agent that will be used when no user agent is set at the `webContents` or `session` level.  Useful for ensuring your entire app has the same user agent.  Set to a custom value as early as possible in your apps initialization to ensure that your overridden value is used.

### `app.isPackaged`

返回一个`Boolean`值，如果应用已经打包，返回`true` ，否则返回`false` 。 对于大多数应用程序，此属性可用于区分开发和生产环境。

### `app.allowRendererProcessReuse`

A `Boolean` which when `true` disables the overrides that Electron has in place to ensure renderer processes are restarted on every navigation.  The current default value for this property is `false`.

The intention is for these overrides to become disabled by default and then at some point in the future this property will be removed.  This property impacts which native modules you can use in the renderer process.  For more information on the direction Electron is going with renderer process restarts and usage of native modules in the renderer process please check out this [Tracking Issue](https://github.com/electron/electron/issues/18397).
