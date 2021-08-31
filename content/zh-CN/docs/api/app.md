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

* `event` Event
* `launchInfo` Record<string, any> | [NotificationResponse](structures/notification-response.md) _macOS_

当 Electron 完成初始化时，发出一次。 在 macOS 上，如果从通知中心启动， `launchInfo` 内含有用于打开应用程序的 `NSUserNotification` 或来自 [`UNNotificationResponse`](structures/notification-response.md) 的 `userInfo` 信息。 你也可以通过调用 `app.isReady()` 来检查该事件是否已被触发，以及通过 `app.whenReady()` 得到一个当Electron已初始化后fulfill 的 Promise。

### 事件: 'window-all-closed'

当所有的窗口都被关闭时触发。

如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序；但如果你监听了此事件，你可以控制是否退出程序。 如果用户按下了 `Cmd + Q`，或者开发者调用了 `app.quit()`，Electron 会首先关闭所有的窗口然后触发 `will-quit` 事件，在这种情况下 `window-all-closed` 事件不会被触发。

### 事件：'before-quit'

返回:

* `event` Event

在程序关闭窗口前发信号。 调用 `event.preventDefault()` 将阻止终止应用程序的默认行为。

**注意：** 如果由 `autoUpdater.quitAndInstal()` 退出应用程序 ，那么在所有窗口触发 `close` *之后* 才会触发 `before-quit` 并关闭所有窗口。

**注:**在 Windows 系统中，如果应用程序因系统关机/重启或用户注销而关闭，那么这个事件不会被触发。

### 事件: 'will-quit'

返回:

* `event` Event

当所有窗口被关闭后触发，同时应用程序将退出。 调用 `event.preventDefault()` 将阻止终止应用程序的默认行为。

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

当用户想要在应用中打开一个 URL 时发出。 你的应用程序的 ` Info. plist ` 文件必须在 ` CFBundleURLTypes ` 这个key中定义 url scheme, 并将 ` NSPrincipalClass ` 设置为 ` AtomApplication `。

如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'activate' _macOS_

返回:

* `event` Event
* `hasVisibleWindows` Boolean

当应用被激活时发出。 各种操作都可以触发此事件, 例如首次启动应用程序、尝试在应用程序已运行时或单击应用程序的坞站或任务栏图标时重新激活它。

### 事件: 'did-groupe-active' _macOS_

返回:

* `event` Event

当应用被激活时发出。 与 `activate` 事件的不同是应用，程序激活时都会触发 `did-become-active` ，而不仅仅在 Dock 图标被点击或应用程序被重新启动的时候。

### 事件: 'continue-activity' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `][activity-type]。
* `userInfo` unknown - 包含另一个设备上activity存储的应用特定状态。

当来自不同设备的活动通过 [Handoff][handoff] 想要恢复时触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

只有具有支持相应的活动类型并且相同的开发团队 ID 作为启动程序时，用户行为才会进行。 所支持活动类型已在应用的 `Info.plist` 中的 `NSUserActivityTypes` 里明确定义。

### 事件: 'will-continue-activity' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `][activity-type]。

当来自不同设备的活动通过 [Handoff][handoff] 恢复之前触发。 如果你想处理这个事件，你应该调用 `event.preventDefault()` 。

### 事件: 'continue-activity-error' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `][activity-type]。
* `error` String - 详细的错误信息

当来自不同设备的活动通过 [Handoff][handoff] 恢复失败时触发。

### 事件: 'activity-was-continued' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `][activity-type]。
* ` userInfo ` unknown - 包含activity存储的应用特定状态。

当来自不同设备的活动通过 [Handoff][handoff] 成功恢复后触发。

### 事件: 'update-activity-state' _macOS_

返回:

* `event` Event
* ` type `String-标识活动的字符串。 映射到 [` NSUserActivity. activityType `][activity-type]。
* ` userInfo ` unknown - 包含activity存储的应用特定状态。

当 [Handoff][handoff] 即将通过另一个设备恢复时触发。 如果需要更新要传输的状态，你应该立即调用 ` event.preventDefault() `, 构造新的 ` userInfo ` 字典，并及时调用 ` app.updateCurrentActiviy() `。 否则，操作会失败，并且触发 `continue-activity-error`

### 事件: 'new-window-for-tab' _macOS_

返回:

* `event` Event

当用户点击原生的macOS新标签按钮时触发。 只有在当前 `BrowserWindow` 有 `tabbingIdentifier` 时，新建tab按钮才可见。

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
* `authenticationResponseDetails` Object
  * `url` URL
* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String (可选)
  * `password` String (可选)

当 ` webContents ` 要进行基本身份验证时触发。

默认行为是取消所有身份验证。 默认行为是取消所有的验证行为，如果需要重写这个行为，你需要用 `event.preventDefault()` 来阻止默认行为，并且使用 `callback(username, password)` 来验证。

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

当 `callback` 在缺少用户名和密码的时候被调用，身份验证请求将被取消，同时将返回身份验证错误到页面。

### 事件: 'gpu-info-update'

每当有 GPU 信息更新时触发。

### 事件: 'gpu-process-crashed' _已废弃_

返回:

* `event` Event
* `killed` Boolean

当gpu进程崩溃或关闭（杀死）时触发

**已废弃：**这个事件被包含更多子进程退出信息原因的`child-process-gone`事件取代了。 并不总是因为崩溃而触发。 当你换用child-process-gone事件时，原事件的 `killed` 布尔值可以被 `reason === 'killed'` 取代。

### 事件: 'renderer-process-crashed' _已废弃_

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

当渲染器进程`webContents`崩溃或关闭（杀死）时触发。

**已废弃：** 此事件被包含更多关于渲染过程为何消失的信息的 `render-process-gone` 事件替代了 并不总是因为崩溃而触发。  当你换用child-process-gone事件时，原事件的 `killed` 布尔值可以被 `reason === 'killed'` 取代。

### 事件: 'render-process-gone'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `details` Object
  * `reason` String - 渲染进程消失的原因。  可选值：
    * `clean-exit` - 以零为退出代码退出的进程
    * `abnormal-exit` - 以非零退出代码退出的进程
    * `killed` - 进程发送一个SIGTERM，否则是被外部杀死的。
    * `crashed` - 进程崩溃
    * `oom` - 进程内存不足
    * `launch-failed` - 进程从未成功启动
    * `integrity-failure` - 窗口代码完整性检查失败
  * `exitCode` Integer - 进程的退出代码，除非在 `reason` 是 `launch-failed` 的情况下， `exitCode` 将是一个平台特定的启动失败错误代码。

渲染器进程意外消失时触发。  这种情况通常因为进程崩溃或被杀死。

### 事件: 'child-process-gone'

返回:

* `event` Event
* `details` Object
  * `type` String - 进程类型。 以下值之一：
    * `Utility`
    * `Zygote`
    * `Sandbox helper`
    * `GPU`
    * `Pepper Plugin`
    * `Pepper Plugin Broker`
    * `Unknown`
  * `reason` String - 子进程消失的原因。 可选值：
    * `clean-exit` - 以零为退出代码退出的进程
    * `abnormal-exit` - 以非零退出代码退出的进程
    * `killed` - 进程发送一个SIGTERM，否则是被外部杀死的。
    * `crashed` - 进程崩溃
    * `oom` - 进程内存不足
    * `launch-failed` - 进程从未成功启动
    * `integrity-failure` - 窗口代码完整性检查失败
  * `exitCode` Number - 进程的退出代码 (例如，在posix上，来自waitpid的状态；在Windows上则来自 GetExitCodeProcess)。
  * `serviceName` String (可选) - 进程的非本地化名称。
  * `name` String (可选) - 进程的名称。 功能性示例： `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, 等等。

子进程意外消失时触发。 这种情况通常因为进程崩溃或被杀死。 子进程不包括渲染器进程。

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

app.on('session-created', (session) => {
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

**注意：** 如果第二个实例是由不同于第一个实例的用户启动的。 `argv` 数组不包含参数。

保证在 `app` 的 `ready` 事件发出后发出此事件。

**注意：** 额外命令行参数可能由 Chromium 添加， ，例如 `--original-process-start-time`。

### 事件: 'desktop-capturer-get-sources'

返回:

* `event` Event
* `webContents` [WebContents](web-contents.md)

在 `webContents` 的渲染器进程中调用 `desktopCapturer.getSources()` 时触发。 调用 `event.preventDefault()` 将使它返回空的sources。

## 方法

` app ` 对象具有以下方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

### `app.quit()`

尝试关闭所有窗口 将首先发出 ` before-quit ` 事件。 如果所有窗口都已成功关闭, 则将发出 ` will-quit` 事件, 并且默认情况下应用程序将终止。

此方法会确保执行所有` beforeunload ` 和 `unload`事件处理程序。 可以在退出窗口之前的` beforeunload `事件处理程序中返回` false `取消退出。

### `app.exit([exitCode])`

* `exitCode` Integer (可选)

使用 `exitCode` 立即退出。 `exitCode` 默认为0。

所有窗口都将立即被关闭，而不询问用户，而且 `before-quit` 和 `will-quit` 事件也不会被触发。

### `app.relaunch([options])`

* `options` Object (可选)
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

返回 `Boolean` 类型 - 如果 Electron 已经完成初始化，则返回 `true`, 其他情况为 `false` 另见 `app.whenReady()`。

### `app.whenReady()`

返回 `Promise&lt;void&gt;` - 当Electron 初始化完成。 可用作检查 `app.isReady()` 的方便选择，假如应用程序尚未就绪，则订阅`ready`事件。

### `app.focus([options])`

* `options` Object (可选)
  * `steal` Boolean _macOS_ - 使接收器成为激活的应用程序，即使另一个应用程序当前处于激活状态。

在 Linux 上，使第一个可见窗口获得焦点。 在 macOS上，将应用程序变成激活的app。 在 Windows上，使应用程序的第一个窗口获得焦点。

你应该尽可能少地使用 `steal` 选项。

### `app.hide()` _macOS_

隐藏所有的应用窗口，不是最小化.

### `app.show()` _macOS_

显示隐藏后的应用程序窗口。 不会使它们自动获得焦点。

### `app.setAppLogsPath([path])`

* `path` String (可选) - 日志存放的自定义路径。 必须是绝对路径。

设置或创建一个您的应用程序日志目录，然后可以通过 `app.getPath()` 或 `app.setPath(pathName, newPath)` 进行操作。

调用 `app.setAppLogsPath()` 却没有指定 `path` 参数将导致此目录在 _macOS_ 下被设置为 `~/Library/Logs/YourAppName`；在 _Linux_ 和_Windows_ 下将被设置到 `userData` 目录中。

### `app.getAppPath()`

返回 `String` 类型 - 当前应用程序所在目录

### `app.getPath(name)`

* `name` String - 你可以通过这些名称请求下列路径：
  * `home` 用户的 home 文件夹（主目录）
  * `appData` 每个用户的应用程序数据目录，默认情况下指向：
    * `%APPDATA%` Windows 中
    * `$XDG_CONFIG_HOME` or `~/.config` Linux 中
    * `~/Library/Application Support` macOS 中
  * `userData` 储存你应用程序设置文件的文件夹，默认是 `appData` 文件夹附加应用的名称
  * `缓存`
  * `temp` 临时文件夹
  * ` exe `当前的可执行文件
  * `module` The `libchromiumcontent` 库
  * `desktop` 当前用户的桌面文件夹
  * `documents` 用户文档目录的路径
  * `downloads` 用户下载目录的路径
  * `music` 用户音乐目录的路径
  * `pictures` 用户图片目录的路径
  * `videos` 用户视频目录的路径
  * `recent` 用户最近文件的目录 (仅限 Windows)。
  * ` logs `应用程序的日志文件夹
  * `crashDumps` 崩溃转储文件存储的目录。

返回 `String` - 一个与 `name`相关的特殊目录或文件的路径。 失败会抛出一个`Error`。

如果 `app.getPath('logs')` 被调用前没有先调用 `app.setAppLogsPath()` ，将创建一个相当于调用 `app.setAppLogsPath()` 却没有 `path` 参数的默认日志目录。

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (可选)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - _Linux_上是 48x48, _Windows_ 上是 32x32, _macOS_ 中无效

返回 `Promise<NativeImage>` - 完成后返回当前应用的图标, 类型是 [NativeImage](native-image.md).

读取文件的关联图标。

在 _Windows_ 上, 会有两种图标：

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

在 _Linux_ 和 _macOS_ 系统中，图标取决于和应用程序绑定的 文件 mime 类型

### `app.setPath(name, path)`

* `name` String
* `path` String

重写 `name` 的路径为 `path`，一个特定的文件夹或者文件。 如果路径指向一个不存在的目录，则抛出一个 `Error`。 在这种情况下，目录应该以 `fs.mkdirSync` 或类似的方式创建。

`name` 参数只能使用 `app.getPath` 定义过的 name

默认情况下, 网页的 cookie 和缓存将存储在 ` userData ` 目录下。 如果要更改这个位置, 你需要在 ` app ` 模块中的 ` ready` 事件被触发之前重写 ` userData ` 的路径。

### `app.getVersion()`

返回 ` String `-加载的应用程序的版本。 如果应用程序的 ` package. json ` 文件中找不到版本号, 则返回当前包或者可执行文件的版本。

### `app.getName()`

返回 ` String `-当前应用程序的名称, 它是应用程序的 ` package. json ` 文件中的名称。

根据 npm 的命名规则, 通常 `package.json` 中的 `name` 字段是一个短的小写字符串。 通常还应该指定一个 ` productName ` 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。

### `app.setName(name)`

* `name` String

设置当前应用程序的名字

**注意：** 此函数会覆盖Electron内部使用的名称；它不会影响操作系统使用的名称。

### `app.getLocale()`

返回 `String` - 当前应用程序区域，使用Chromium的 `l10n_util` 库获取。 可能的返回值记录在[这里](https://source.chromium.org/chromium/chromium/src/+/master:ui/base/l10n/l10n_util.cc)。

要设置区域，则需要在应用启动时使用命令行时打开开关，你可以在[这里](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md)找到。

** 注意: **分发打包的应用程序时, 你必须指定 ` locales ` 文件夹。

**注意：** 在 Windows 上，你必须得等 `ready` 事件触发之后，才能调用该方法

### `app.getLocaleCountryCode()`

返回 `String` - 用户操作系统区域设置的双字母 [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) 国家代码。 该值取自本地操作系统 API。

**注意：** 当无法检测本地国家代码时，它返回空字符串。

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

将此 `path` 添加到最近打开的文件列表中

此列表由操作系统管理。 在Windows上，您可以从任务栏访问此列表，在macOS上，您可以从dock菜单访问。

### `app.clearRecentDocuments()` _macOS_ _Windows_

清空最近打开的文档列表

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。 例如，如果你希望应用处理 `electron://` 链接，请以`electron` 为参数调用此方法。
* `path` String (可选) _Windows_ - Electron可执行文件路径。 默认为 `process.execPath`
* `args` String[] (可选) _Windows_ - 传递给可执行文件的参数。 默认为空数组。

返回 ` Boolean `-是否成功调用。

将当前可执行文件的设置为协议(也就是 URI scheme) 的默认处理程序。 该方法允许你将应用更深入地集成到操作系统中。 一旦注册了，所有 `your-protocol://` 开头的链接将使用当前可执行文件打开。 整个链接，包括协议部分，将作为参数传递给你的应用程序。

** 注意: **在 macOS 上，您只能注册已添加到应用程序的 `info.plist` 中的协议，这个列表在运行时不能修改。 然而，你可以在构建时通过 [Electron Forge][electron-forge], [Electron Packager][electron-packager], 或通过文本编辑器编辑`info.plist`文件的方式修改。 有关详细信息，请参阅 [Apple's documentation][CFBundleURLTypes]

**注意：** 在 Windows Store 环境下(当打包为 `appx`)，此 API 对所有调用都返回 `true`，但它设置的注册表项将无法通过其他应用程序访问。  为了注册你的 Windows Store 应用程序作为默认的协议处理程序，你必须 [在你的清单中声明协议](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol)。

API 在内部使用 Windows 注册表和 `LSSetDefaultHandlerForURLScheme`。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) _ Windows _-默认为 ` process.execPath `
* `args` String[] (可选) _Windows_ - 默认为空数组

返回 ` Boolean `-是否成功调用。

此方法检查当前可执行程序是否是协议(也就是URI scheme) 的默认处理程序。 如果是，则会将应用移除默认处理器。

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) _ Windows _-默认为 ` process.execPath `
* `args` String[] (可选) _Windows_ - 默认为空数组

返回 `Boolean` - 当前可执行程序是否是协议(也就是URI scheme) 的默认处理程序。

** 注意: **在macOS上, 您可以使用此方法检查应用程序是否已注册为协议的默认协议处理程序。 同时可以通过查看 `~/Library/Preferences/com.apple.LaunchServices.plist` 来确认。 有关详细信息，请参阅 [Apple's documentation][LSCopyDefaultHandlerForURLScheme]

API 在内部使用 Windows 注册表和 `LSCopyDefaultHandlerForURLScheme`。

### `app.getApplicationNameForProtocol(url)`

* `url` String - 要检查的协议名称的 URL。 不同于家族中的其他方法，该方法接收至少包含 `://` (例如：`https://`)的完整URL。

返回 `String` - 处理协议的应用程序名称，或如果没有处理程序的空 字符串。 例如，如果Electron 是这个URL的默认 处理程序，那么在 Windows 和 Mac 上，这个返回值可以是 `Electron`。 然而，不要依赖于无法保证保持不变的精确格式。 Linux 上期望不同格式，可能带有 `.desktop` 后缀。

此方法返回URL协议(也就是URI scheme) 的默认处理器的应用程序名称。

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - 要检查的协议名称的 URL。 不同于家族中的其他方法，该方法接收至少包含 `://` (例如：`https://`)的完整URL。

返回 `Promise<Object>` - resolve包含以下内容的object：

* `icon` NativeImage - 处理协议的应用程序的显示图标。
* `path` String - 处理协议的应用程序的安装路径。
* `name` String - 处理协议的应用程序的显示名称。

此方法返回包含应用程序名称，图标和默认协议处理器路径(也就是URI scheme) 的Promise。

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - 由 `Task` 对象组成的数组

Windows上添加 `tasks` 到 Jump List的 [Tasks][tasks] 类别。

`tasks` 是 [`Task`](structures/task.md) 对象组成的数组

返回 ` Boolean `-是否成功调用。

** 注意: **如果您想自定义跳转列表, 请使用 ` aapp.setJumpList(categories) ` 来代替。

### `app.getJumpListSettings()` _Windows_

返回 ` Object `:

* `minItems` Integer - 将在跳转列表中显示项目的最小数量(有关此值的更详细描述，请参阅 [MSDN docs][JumpListBeginListMSDN]).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - 用户已明确从Jump List自定义类别中删除的项对应的 `JumpListItem` 对象数组。 这些项目不能在 **next** 调用 `app.setJumpList()` 时重新添加到跳转列表中, Windows不会显示任何包含已删除项目的自定义类别.

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - `JumpListCategory` 对象数组。

设置或删除应用程序的自定义跳转列表，并返回以下字符串之一：

* `ok` - 没有出现错误
* `error` - 发生一个或多个错误，启用运行日志记录找出可能的原因。
* `invalidSeparatorError` - 已尝试在跳转列表中向自定义类别添加分隔符。 分隔符只允许在标准 `Tasks` 类别下出现。
* `fileTypeRegistrationError` -尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
* `customCategoryAccessDeniedError` - 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。

如果 `categories` 的值为 `null`， 之前设定的自定义跳转列表(如果存在) 将被替换为标准的应用跳转列表(由windows生成)

**注意：** 如果一个 `JumpListCategory` 对象既没有设置 `type` 属性，也没有设置 `name` 属性，则假设其 `type` 是 `tasks`。 如果设置了 ` name ` 属性, 但省略了 ` type ` 属性, 则假定 ` type ` 为 ` custom`。

**注意:** 用户可以从自定义类别中移除项目， **after** 调用 `app.setJumpList(categories)` 方法之前， Windows不允许删除的项目添加回自定义类别。 尝试提前将删除的项目重新添加 到自定义类别中，将导致整个自定义类别被隐藏。 删除的项目可以使用 `app.getJumpListSettings()` 获取。

**注意：** 跳列表项目 `description` 属性的最大长度为 260 个字符。 超过这个限制，当前项将不会被添加到跳转列表，也不会被展示。

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
  { // has a name so `type` is assumed to be "custom"
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
  { // has no name and no type so `type` is assumed to be "tasks"
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

I.e. 如果当前进程是应用程序的主要实例，则此方法返回`true`，同时你的应用会继续运行。  如果当它返回 `false`如果你的程序没有取得锁，它应该立刻退出，并且将参数发送给那个已经取到锁的进程。

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
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

返回 `Boolean`

此方法返回你的应用实例当前是否持有单例锁。  你可以通过 `app.requestSingleInstanceLock()`请求锁，并且通过 `app.releaseSingleInstanceLock()` 释放锁。

### `app.releaseSingleInstanceLock()`

释放所有由 `requestSingleInstanceLock` 创建的锁。 该方法将允许应用程序的多个实例再次并行运行。

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `][activity-type]。
* `userInfo` any - 存储供其他设备使用的特定应用状态。
* `webpageURL` String (可选) - 如果在返回的设备上没有安装合适的应用，要在浏览器中加载的网页。 协议必须是 `http` 或 `https`。

创建一个 ` NSUserActivity ` 并将其设置为当前活动。 该活动之后可以[Handoff][handoff]到另一个设备。

### `app.getCurrentActivityType()` _macOS_

返回 `String` - 正在运行的 activity 的类型

### `app.invalidateCurrentActivity()` _macOS_

使当前的[Handoff][handoff]用户活动无效。

### `app.resignCurrentActivity()` _macOS_

将当前 [Handoff][handoff] 用户活动标记为非活动，但不使其失效。

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `][activity-type]。
* `userInfo` any - 存储供其他设备使用的特定应用状态。

当其类型与 ` type ` 匹配时更新当前活动, 将项目从 ` 用户信息 ` 合并到其当前 ` 用户信息 ` 字典中。

### `app.setAppUserModelId(id)` _Windows_

* `id` String

改变当前应用的 [Application User Model ID][app-user-model-id] 为 `id`.

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - 可以是'regular', 'accessory', 或 'prohibited'。

为给定应用设置激活策略。

激活策略类型：

* 'regulatory ' - 应用程序以普通应用出现在 Dock 中，可能有一个用户界面。
* 'accessory' - 应用程序不会出现在 Dock 中，没有菜单栏， 但它可能会被程序或在点击其某个窗口时激活。
* 'prohibited' - 应用程序不会出现在 Dock 中，可能无法创建窗口或被激活。

### `app.importCertificate(options, callback)` _Linux_

* `选项` 对象
  * `certificate` String - pkcs12 文件的路径
  * `password` String - 证书的密码
* `callback` Function
  * `result` Integer - 导入结果

将 pkcs12 格式的证书导入到平台证书库。 使用导入操作的 `callback` 调用返回 `result` ，值 `0` 表示成功，而任何其他值表示失败，根据Chromium [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) 。

### `app.disableHardwareAcceleration()`

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.disableDomainBlockingFor3DAPIs()`

默认情况下, 如果 GPU 进程频繁崩溃, Chromium 会禁用 3D API (例如 WebGL) 直到在每个域的基础上重新启动。 这个函数会禁用该行为。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.getAppMetrics()`

返回 [`ProcessMetric[]`](structures/process-metric.md): 包含所有与应用相关的进程的内存和CPU的使用统计的 `ProcessMetric` 对象的数组。

### `app.getGPUFeatureStatus()`

返回 [` GPUFeatureStatus `](structures/gpu-feature-status.md)-来自 ` chrome://gpu/` 的图形功能状态。

**注意：** 此信息仅在 `gpu-info-update` 事件触发后才可用。

### `app.getGPUInfo(infoType)`

* `infoType` String - 可以是 `basic` 或 `complete`。

返回 ` Promise<unknown>`

对于` infoType `等于` complete `： Promise 将包含所有GPU信息的` Object `正如 [ chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc)。 这包括 `chrome://gpu` 页面上显示的版本和驱动程序信息。

对于` infoType `等于` basic `： Promise 至少包含当请求`complete`时的属性`Object`。 下面是一个基础响应示例：

```js
{
  auxAttributes:
   {
     amdSwitchable: true,
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
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

如果只需要基本信息，如` vendorId `或` driverId `，则应优先使用` basic `。

### `app.setBadgeCount([count])` _Linux_ _macOS_

* `count` Integer (可选) - 如果传入值，则将角标设置为所传入值，否则，在 macOS 上显示一个普通的白点(例如：通知数量未知)。 在 Linux 上，如果没有传入值，角标将不会显示。

返回 ` Boolean `-是否成功调用。

为当前应用设置计数器角标。 将计数设置为 `0` 将隐藏角标。

在 macOS 上，它会在dock 图标上显示。 在 Linux 上，它只适用于 Unity 启动器。

**注意：** Unity 启动器需要一个 `.desktop` 文件才能工作。 欲了解更多信息， 请阅读 [Unity integration 文档][unity-requirement]。

### `app.getBadgeCount()` _Linux_ _macOS_

Returns `Integer` - 获取计数器提醒(badge) 中显示的当前值

### `app.isUnityRunning()` _Linux_

Returns `Boolean` - 当前桌面环境是否为 Unity 启动器

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (可选)
  * `path` String (可选) _Windows_ - 要比较的可执行路径。 默认为 `process.execPath`。
  * `args` String[] (可选) _Windows_ - 要比较的命令行参数。 默认为空数组。

如果你为 ` app. setLoginItemSettings ` 提供` path ` 和 ` args ` 选项，那么你需要在这里为 ` openAtLogin ` 设置相同的参数已确保正确的设置。

返回 ` Object `:

* `openAtLogin` Boolean - `true` 如果应用程序设置为在登录时打开, 则为 <0>true</0>
* `openAsHidden` Boolean _macOS_ - 当应用程序设置为在登录时隐藏打开为`true`。 此设置在 [MAS 构建][mas-builds] 上不可用。
* `wasOpenedAtLogin` Boolean _macOS_ - 当应用程序在登录时自动运行为`true`。 此设置在 [MAS 构建][mas-builds] 上不可用。
* `wasOpenedAsHidden` Boolean _macOS_ - 当应用程序作为一个隐藏的登录项运行时为 `true` 。 这表示应用程序在启动时不应打开任何窗口。 此设置在 [MAS 构建][mas-builds] 上不可用。
* `restoreState` Boolean _macOS_ - `true` 如果应用程序作为登录项打开， 应该还原上一个会话状态。 这表示程序应该还原上次关闭时打开的窗口。 此设置在 [MAS 构建][mas-builds] 上不可用。
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` 应用程序被设置为在登录时打开，并且其启动项未停用。 该属性与 `openAtLogin` 不同，因为它忽略了 `args` 选项，如果给定的可执行程序在登录时启动并带有 **任意** 参数，此属性将为true。
* `launchItems` Object[] _Windows_
  * `name` String _Windows_ - 注册表项的名称值。
  * `path` String _Windows_ - 与注册表条目相对应的应用可执行程序。
  * `args` String[] _Windows_ - 传递到可执行文件的命令行参数。
  * `scope` String _Windows_ - `user` 或 `machine`之一。 指示注册表条目是否处于 `HKEY_CURRENT USER` 或 `HKEY_LOCAL_MACHINE`下。
  * `enabled` Boolean _Windows_ - `true` 如果应用注册表项已获得启动批准，此时在任务管理器和 Windows 设置中显示为 `enabled` 。

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (可选) - `true` 登录时打开应用程序， `false` 将应用从登录启动项中删除。 默认值为 `false`.
  * `openAsHidden` Boolean (可选) _macOS_ - `true` 以隐藏方式打开应用程序。 默认为`false`。 用户可以从系统首选项中编辑此设置, 以便在打开应用程序时检查 `app.getLoginItemSettings().wasOpenedAsHidden` 以了解当前值。 此设置在 [MAS 构建][mas-builds] 上不可用。
  * `path` String (可选) _Windows_ - 登录时运行的可执行文件。 默认为 `process.execPath`。
  * `args` String[] (可选) _Windows_ - 传递给可执行文件的控制台参数。 默认为空数组。 注意用引号包裹路径。
  * `enabled` Boolean (可选) _Windows_ - `true` 将更改已启用的启动注册表项，并在任务管理器和 Windows 设置中 `启用 / 禁用` 应用程序。 默认值为 `true`。
  * `name` String (可选) _Windows_ - 要写入注册表的值名称。 默认为应用的 AppUserModelId()。 设置应用程序的登录项设置。

如果需要在 Windows 上使用[Squirrel][Squirrel-Windows]的 `autoUpdater` ，你需要将启动路径设置为 Update.exe，并传递指定应用程序名称的参数。 例如：

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

<h3 spaces-before="0"><code>app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_</h3>

* `enable` 逻辑值 - 启用或禁用[访问权限树](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)视图。

手动启用 Chrome 的辅助功能的支持, 允许在应用程序中设置是否开启辅助功能。 在[Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility)查看更多的细节 默认为禁用

此 API 必须在 `ready` 事件触发后调用

**注意：** 渲染访问权限树可能会严重影响您应用的性能。 默认情况下不应启用该功能。

### `app.showAboutPanel()`

显示应用程序的"关于"面板选项。 这些选项可以被 `app.setAboutPanelOptions(可选)` 所覆盖。

### `app.setAboutPanelOptions(options)`

* `选项` 对象
  * `applicationName` String (可选) - 应用程序的名字
  * `applicationVersion` String (可选) - 应用程序版本
  * `copyright` String (可选) - 版权信息
  * `version` String (可选) _macOS_ - 应用程序版本号
  * `credits` String (可选) _macOS_ _Windows_ - 信用信息。
  * `authors` String[] (可选) _Linux_ - 应用程序作者列表。
  * `website` String (可选) _Linux_ - 应用程序的网站。
  * `iconPath` String (可选) _Linux_ _Windows_ - 以JPEG 或 PNG 文件格式为应用程序图标路径。 在 Linux 上，将显示为 64x64 像素，同时保留纵横比。

设置 "关于" 面板选项。 这将覆盖应用程序在 macOS 上的 `.plist` 文件中定义的值。 详细信息请查阅 [ Apple 文档 ][about-panel-options]。 在 Linux 上，没有默认值，所以必须设置值才能显示。

如果您没有设置 `credits` 但仍希望在应用中显示它们，AppKit 将在 NSBundle 类的main方法返回的捆绑包中按顺序查找名为"Credits.html", "Credits.rtf"和"Credits.rtfd"的文件。 先找到的文件将被使用，如果未找到，则信息区域将留空。 有关更多信息，请参阅 Apple [文档](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) 。

### `app.isEmojiPanelSupported()`

返回 `布尔值` - 当前操作系统版本是否允许使用本机emoji选取器。

### `app.showEmojiPanel()` _macOS_ _Windows_

打开系统自身的emjio选取器。

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS_

* `bookmarkData` String - base64 编码的安全作用域的书签数据(bookmark data) ，通过 `dialog.showOpenDialog` 或者 `dialog.showSaveDialog` 方法获取。

返回 `Function` - 该函数 **必须** 在你完成访问安全作用域文件后调用一次。 如果你忘记停止访问书签，[内核资源将会泄漏](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc)，并且你的应用将失去完全到达沙盒之外的能力，直到应用重启。

```js
//开始读取文件
const stopAcessingSecurityScopedResource = app。 tartAccessingSecurityScopedResource(数据)
// 您现在可以在 sandbox:party_popper 之外访问文件🎉

// 记住在文件完成后停止访问
stopAccessingSecurityScopedResource()
```

开始访问安全范围内的资源。 通过这个方法，Electron 应用被打包为可到达Mac App Store沙箱之外访问用户选择的文件。 关于系统工作原理，请查阅[Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

### `app.enableSandbox()`

在应用程序上启用完全沙盒模式。 这意味着所有渲染器都将以沙盒的方式运行，无论 WebPreence 中 `sandbox` 标志的值是什么。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.isInApplicationsFolder()` _macOS_

返回 `Boolean` - 应用程序当前是否从系统应用程序文件夹运行。 与 `app.moveToApplicationsFolder()`一起使用

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (可选)
  * `conflictHandler` Function<Boolean> (可选) - 处理移动失败的潜在冲突。
    * `conflictType` String - 处理器遇到移动冲突的类型； 可以是 `exists` 或 `existsAndRunning`, `exists` 意味着应用程序目录中存在相同名称的应用， `existsAndRunning` 表示存在并且正在运行。

返回 `Boolean` - 移动是否成功。 请注意，如果移动成功，您的应用程序将退出并重新启动。

默认情况下不会显示确认对话框。 如果您希望允许用户确认操作，您可以使用[`dialog`](dialog.md) API 进行确认。

**注意：**如果并非是用户造成操作失败，这个方法会抛出错误。 例如，如果用户取消了授权会话，这个方法将返回false。 如果无法执行复制操作, 则此方法将抛出错误。 错误中的信息应该是翔实的，并告诉你到底是哪里出了问题。

默认情况下，如果应用程序目录中存在与被移动的应用同名的应用，并且 _未_ 运行，则已有应用将被丢弃，被移动的应用将顶替其位置。 如果它 _正在_ 运行，预先存在的运行应用程序将承担焦点，以前活动的应用程序将退出自己。 此行为可以通过提供可选的冲突处理器来更改，处理器返回的 boolean 将决定移动冲突是否通过默认行为得到解决。  即：返回 `false` 将确保不采取进一步行动，返回 `true` 将导致默认行为同时方法继续执行。

例如：

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Halt Move', 'Continue Move'],
        defaultId: 0,
        message: 'An app of this name already exists'
      }) === 1
    }
  }
})
```

这意味着，如果应用已经存在于用户目录中，如果用户选择 '继续移动'，则该功能将继续其默认行为，现有应用将被丢弃，当前应用将移动到其位置。

### `app.isSecureKeyboardEntryEnabled()` _macOS_

返回 `Boolean` - 是否启用 `Secure Keyboard Entry` 。

默认情况下，此 API 将返回 `false`。

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - 启用或禁用 `Secure Keyboard Entry`

在应用中启用 `Secure Keyboard Entry` 。

通过使用此 API，可以防止密码和其他敏感信息等重要信息被其他进程截获。

有关更多详细信息，请参阅[ apple 文档 ](https://developer.apple.com/library/archive/technotes/tn2150/_index.html)。

**注意：** 仅在需要时启用 `Secure Keyboard Entry` ，并在不再需要时禁用。

## 属性

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

`Boolean`属性 - 如果开启了Chrome的辅助功能，则返回 `true`，否则返回`false`。 如果使用了辅助功能（例如屏幕阅读），该 API 将返回 `true`。 手动将此属性设置为 `true` 可启用 Chrome 的辅助功能支持，允许开发人员在应用程序设置中向用户开放无障碍切换。

有关详细信息，请参阅[ chromium 的无障碍文档 ](https://www.chromium.org/developers/design-documents/accessibility)。 默认为禁用

此 API 必须在 `ready` 事件触发后调用

**注意：** 渲染访问权限树可能会严重影响您应用的性能。 默认情况下不应启用该功能。

### `app.applicationMenu`

`Menu | null` 属性，如果设置 [`Menu`](menu.md) ，则返回，否则返回 `null` 。 用户可以传递 [Menu](menu.md) 来给此属性赋值。

### `app.badgeCount` _Linux_ _macOS_

返回当前应用角标计数的 `Integer` 属性。 将计数设置为 `0` 将隐藏角标。

在 macOS 上，为该属性设置任何非零整数，会显示在dock 图标上。 在 Linux 上，这个属性只适用于 Unity 启动器。

**注意：** Unity 启动器需要一个 `.desktop` 文件才能工作。 欲了解更多信息， 请阅读 [Unity integration 文档][unity-requirement]。

**注意：** 在 macOS 上，为了使该属性生效，您需要确保您的应用程序具有显示通知的权限。

### `app.commandLine` _只读_

[`CommandLine`](./command-line.md) 对象，允许您读取和操作 Chromium 使用的命令行参数。

### `app.dock` _macOS_ _只读_

[`Dock`](./dock.md) `| undefined` 对象，允许您在 macOS 上的用户dock中对应用图标进行操作。

### `app.isPackaged` _只读_

返回一个`Boolean`值，如果应用已经打包，返回`true` ，否则返回`false` 。 对于大多数应用程序，此属性可用于区分开发和生产环境。

### `app.name`

`String` 属性，指明当前应用程序的名称，即应用程序 `package.json` 文件中的名称。

根据 npm 的命名规则, 通常 `package.json` 中的 `name` 字段是一个短的小写字符串。 通常还应该指定一个 ` productName ` 字段, 是首字母大写的完整名称，用于表示应用程序的名称。Electron 会优先使用这个字段作为应用名。

### `app.userAgentFallback`

`String` Electron 用于全局回退的用户代理字符串。

当用户代理在`webContents` 或 `session` 级别没有被设置时，将使用此用户代理。  有助于确保您的整个应用程序具有相同的用户代理。  在应用初始化中尽早设置为自定义值，以确保使用的是您覆盖的值。

### `app.runningUnderRosettaTranslation` _macOS_ _只读_

`Boolean` ，为 `true` 表明该应用程序目前正在运行在[转译环境](https://en.wikipedia.org/wiki/Rosetta_(software))下。

您可以使用此属性来提示用户下载应用程序的 arm64 版本，当用户错误地在转译环境下运行 x64 版本。

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
