# app

> 控制你的应用程序的事件生命周期。

线程：[主线程](../glossary.md#main-process)

下面的这个例子将会展示如何在最后一个窗口被关闭时退出应用：

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## 事件

`app` 对象会发出以下事件:

### 事件: 'will-finish-launching'

当应用程序完成基础的启动的时候被触发。 在 Windows 和 Linux 中, `will-finish-launching` 事件与 `ready` 事件是相同的; 在 macOS 中，这个事件相当于 `NSApplication` 中的 `applicationWillFinishLaunching` 提示。 通常会在这里为 `open-file` 和 `open-url` 设置监听器，并启动崩溃报告和自动更新。

在大多数的情况下，你应该只在 `ready` 事件中完成所有的业务。

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

在应用程序开始关闭窗口之前触发。 调用 `event.preventDefault()` 会阻止默认的行为。默认的行为是终结应用程序。

** 注意: **如果应用程序退出是因调用了` autoUpdater. quitAndInstall () `, 所有窗口都会发出` close ` Event *然后* ` before-quit ` Event 并关闭所有窗口。

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

当 [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 即将通过另一个设备恢复时触发。 如果需要更新要传输的状态, 应立即调用 ` 事件. preventDefault () `, 构造新的 ` 用户信息 ` 字典, 并及时调用 ` 应用程序 updateCurrentActiviy () `。 否则, 操作将失败, 并且将调用 ` 继续-活动-错误 `。

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
const {app} = require('electron')

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
* `callback` Function - 回调函数 
  * `certificate` [证书](structures/certificate.md) (可选)

当一个客户证书被请求的时候发出。

`url` 指的是请求客户端认证的网页地址，调用 `callback` 时需要传入一个证书列表中的证书。 需要通过调用 `event.preventDefault()` 来防止应用自动使用第一个证书进行验证。

```javascript
const {app} = require('electron')

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
* `callback` Function - 回调函数 
  * `username` String
  * `password` String

当 ` webContents ` 要进行基本身份验证时触发。

默认行为是取消所有的验证行为，如果需要重写这个行为，你需要用 `event.preventDefault()` 来阻止默认行为，并且使用 `callback(username, password)` 来验证。

```javascript
const {app} = require('electron')

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

## 方法

` app ` 对象具有以下方法:

** 注意: **某些方法仅在特定的操作系统上可用, 这些方法会被标记出来。

### `app.quit()`

尝试关闭所有窗口 将首先发出 ` before-quit ` 事件。 如果所有窗口都已成功关闭, 则将发出 ` will-quit` 事件, 并且默认情况下应用程序将终止。

此方法会确保执行所有` beforeunload ` 和 `unload`事件处理程序。 可以在退出窗口之前的` beforeunload `事件处理程序中返回` false `取消退出。

### `app.exit([exitCode])`

* `exitCode` Integer (可选)

立即退出程序并返回 `exitCode`。`exitCode` 的默认值是 0。

所有窗口都将立即被关闭（不会弹出询问提示），而且 `before-quit` 和 `will-quit` 事件也不会被触发

### `app.relaunch([options])`

* `选项` Object (可选) 
  * `args` String[] (可选)
  * `execPath` String (可选)

从当前实例退出，重启应用。

默认情况下，新的实例会和当前实例使用相同的工作目录以及命令行参数。 当设置了 `args` 参数时， `args` 将作为命令行参数传递。 当设置了 `execPath` ，`execPath` 将被执行以重新启动，而不是当前的应用程序。

请注意, 此方法在执行时不会退出当前的应用程序, 你需要在调用 `app.relaunch` 方法后再执行 ` app. quit` 或者 ` app.exit ` 来让应用重启。

当 `app.relaunch` 被多次调用时,多个实例将在当前实例退出后启动。

立即重启当前实例并向新的实例添加新的命令行参数的示例：

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

返回 `Boolean` 类型 - 如果 Electron 已经完成初始化，则返回 `true`, 其他情况为 `false`

### `app.focus()`

在 Linux 系统中, 使第一个可见窗口获取焦点。在 macOS 上, 让该应用成为活动应用程序。在 Windows 上, 使应用的第一个窗口获取焦点。

### `app.hide()` *macOS*

隐藏所有的应用窗口，不是最小化.

### `app.show()` *macOS*

显示所有被隐藏的应用窗口。需要注意的是，这些窗口不会自动获取焦点。

### `app.getAppPath()`

返回 `String` 类型 - 当前应用程序所在目录

### `app.getPath(name)`

* `name` String

返回 `String` -与 `name` 参数相关的特殊文件夹或文件路径。当失败时抛出 `Error` 。

你可以通过名称请求以下的路径:

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
* `选项` Object (可选) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - *Linux*上是 48x48, *Windows* 上是 32x32, *macOS* 中无效
* `callback` Function - 回调函数 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

读取文件的关联图标。

在 *Windows* 上, 会有两种图标：

* 与某些文件扩展名相关联的图标, 比如 `. mp3 ` ，`. png ` 等。
* 文件本身就带图标，像是 `.exe`, `.dll`, `.ico`

在 *Linux* 和 *macOS* 系统中，图标取决于应用程序相关文件的 mime 类型

### `app.setPath(name, path)`

* `name` String
* `path` String

重写 `name` 的路径为 `path`，一个特定的文件夹或者文件。 如果路径指定的目录不存在, 则该目录将由此方法创建。 如果发生错误会抛出 `Error`

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

### `app.getLocale()`

返回 `string`——当前应用程序的语言环境。可能的返回值被记录在[这里](locales.md)。

要设置区域，则需要在应用启动时使用命令行时打开开关，你可以在[这里](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md)找到。

** 注意: **分发打包的应用程序时, 你必须指定 ` locales ` 文件夹。

**注意：** 在 Windows 上，你必须得等 `ready` 事件触发之后，才能调用该方法

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

将此 `path` 添加到最近打开的文件列表中

这个列表由操作系统进行管理。在 Windows 中从任务栏访问列表, 在 macOS 中通过 dock 菜单进行访问。

### `app.clearRecentDocuments()` *macOS* *Windows*

清空最近打开的文档列表

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - 协议的名称, 不包含 `://`。 如果您希望应用程序处理 `electron://` 的链接, 请将 ` electron ` 作为该方法的参数.
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

返回 ` Boolean `-是否成功调用。

此方法将当前可执行文件设置为协议(也称为URI方案) 的默认处理程序。 它允许您将应用程序更深入地集成到操作系统中。 一旦注册成功, 所有 `your-protocol://` 格式的链接都会使用你的程序打开。 整个链接 (包括协议) 将作为参数传递给您的应用程序。

在 Windows 系统中，你可以提供可选参数 path，可执行文件的路径和 args (在启动时传递给可执行文件的参数数组)

** 注意: **在 macOS 上, 您只能注册已添加到应用程序的 ` info. plist ` 中的协议, 在运行时不能对其进行修改。 但是，您可以在构建时使用简单的文本编辑器或脚本更改文件。 有关详细信息，请参阅 [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115)

API 在内部使用 Windows 注册表和 LSSetDefaultHandlerForURLScheme。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

返回 ` Boolean `-是否成功调用。

此方法检查当前程序是否为协议（也称为URI scheme）的默认处理程序。 如果是，它会删除应用程序作为默认处理程序。

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - 协议的名称, 不包含 `://`。
* ` path `String (可选) * Windows *-默认为 ` process.execPath `
* `args` String[] (可选) *Windows* - 默认为空数组

返回 `Boolean`

此方法检查当前可执行文件是否是协议(也称为URI方案) 的默认处理程序。如果是, 它将返回true。否则, 它将返回false。

** 注意: **在macOS上, 您可以使用此方法检查应用程序是否已注册为协议的默认协议处理程序。 同时可以通过查看 `~/Library/Preferences/com.apple.LaunchServices.plist` 来确认。 有关详细信息，请参阅 [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme)

该API在内部使用 Windows 注册表和 LSCopyDefaultHandlerForURLScheme。

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - 由 `Task` 对象组成的数组

将 `tasks` 添加到 Windows 中 JumpList 功能的 [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) 分类中。

`tasks` 是 [`Task`](structures/task.md) 对象组成的数组

返回 ` Boolean `-是否成功调用。

** 注意: **如果您想自定义跳转列表, 请使用 ` aapp.setJumpList(categories) ` 来代替。

### `app.getJumpListSettings()` *Windows*

返回 ` Object `:

* `minItems` Integer - 将在跳转列表中显示项目的最小数量(有关此值的更详细描述，请参阅 [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - `JumpListItem` 对象组成的数组，对应用户在跳转列表中明确删除的项目。 这些项目不能在 **next** 调用 `app.setJumpList()` 时重新添加到跳转列表中, Windows不会显示任何包含已删除项目的自定义类别.

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) or `null` - `JumpListCategory` 对象组成的数组

设置或删除应用程序的自定义跳转列表，并返回以下字符串之一：

* `ok` - 没有出现错误
* `error` - 发生一个或多个错误，启用运行日志记录找出可能的原因。
* `invalidSeparatorError` - 尝试向跳转列表中的自定义跳转列表添加分隔符。 分隔符只允许在标准的 `Tasks` 类别中。
* `fileTypeRegistrationError` -尝试向自定义跳转列表添加一个文件链接，但是该应用未注册处理该应用类型
* `customCategoryAccessDeniedError` - 由于用户隐私或策略组设置，自定义类别无法添加到跳转列表。

如果 `categories` 的值为 `null`， 之前设定的自定义跳转列表(如果存在) 将被替换为标准的应用跳转列表(由windows生成)

** 注意: **如果 ` JumpListCategory ` 对象既没有 ` type `, 也没有 ` name ` 属性设置, 则其 ` type ` 被假定为 ` tasks `。 如果设置了 ` name ` 属性, 但省略了 ` type ` 属性, 则假定 ` type ` 为 ` custom`。

**注意:** 用户可以从自定义类别中移除项目， **after** 调用 `app.setJumpList(categories)` 方法之前， Windows不允许删除的项目添加回自定义类别。 尝试提前将删除的项目重新添加 到自定义类别中，将导致整个自定义类别被隐藏。 删除的项目可以使用 `app.getJumpListSettings()` 获取。

下面是创建自定义跳转列表的一个非常简单的示例:

```javascript
const {app} = require('electron')

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

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - 第二个实例的命令行参数数组
  * `workingDirectory` String - 第二个实例的工作目录

返回 `Boolean`.

此方法使应用程序成为单个实例应用程序, 而不是允许应用程序的多个实例运行, 这将确保只有一个应用程序的实例正在运行, 其余的实例全部会被终止并退出。

当执行第二个实例时, 第一个实例将使用 ` callback (argv, workingDirectory) ` 调用 ` callback`。 ` argv ` 是第二个实例的命令行参数的数组, ` workingDirectory ` 是这个实例当前工作目录。 通常, 应用程序会激活窗口并且取消最小化来响应。

在 `app` 的 `ready` 事件后，`callback` 才会被调用。

如果进程是应用程序的第一个实例, 则此方法返回 ` false `，并且应用程序会继续加载。 如果您的进程已将其参数发送到另一个实例, 则会立即退出, 并返回 ` true `。

在 macOS 上, 当用户尝试在 Finder 中打开您的应用程序的第二个实例时, 系统会自动强制执行单个实例, 并且发出 ` open-file ` 和 ` open-url ` 事件。 但是当用户在命令行中启动应用程序时, 系统的单实例机制将被绕过, 您必须使用此方法来确保单实例。

在第二个实例启动时激活主实例窗口的示例:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

释放所有由 `makeSingleInstance` 创建的限制. 这将允许应用程序的多个实例依次运行.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用
* `webpageURL` String (可选) - 如果在恢复设备上未安装合适的应用程序，则会在浏览器中加载网页。 该格式必须是 `http` 或 `https`。

创建一个 ` NSUserActivity ` 并将其设置为当前活动。 该活动之后可以[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)到另一个设备。

### `app.getCurrentActivityType()` *macOS*

返回 `String` - 正在运行的 activity 的类型

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。

使当前的[Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)用户活动无效。

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - 活动的唯一标识。 映射到 [` NSUserActivity. activityType `](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType)。
* `userInfo` Object - 应用程序特定状态，供其他设备使用

当其类型与 ` type ` 匹配时更新当前活动, 将项目从 ` 用户信息 ` 合并到其当前 ` 用户信息 ` 字典中。

### `app.setAppUserModelId(id)` *Windows*

* `id` String

改变当前应用的 [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) 为 `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `选项` Object 
  * `certificate` String - pkcs12 文件的路径
  * `password` String - 证书的密码
* `callback` Function - 回调函数 
  * `result` Integer - 导入结果

将 pkcs12 格式的证书导入到平台证书库。 ` callback ` 使用导入操作的 ` result ` 调用, ` 0 ` 的表示成功, 其他值标识失败，参照 [ net_error_list ](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) 。

### `app.disableHardwareAcceleration()`

禁用当前应用程序的硬件加速。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.disableDomainBlockingFor3DAPIs()`

默认情况下, 如果 GPU 进程频繁崩溃, Chromium 会禁用 3D api (例如 WebGL) 直到每个域重新启动。此函数禁用该行为。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.getAppMetrics()`

返回 [`ProcessMetric[]`](structures/process-metric.md): 包含所有与应用相关的进程的内存和CPU的使用统计的 `ProcessMetric` 对象的数组。

### `app.getGPUFeatureStatus()`

返回 [` GPUFeatureStatus `](structures/gpu-feature-status.md)-来自 ` chrome://gpu/` 的图形功能状态。

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

返回 ` Boolean `-是否成功调用。

设置当前应用程序的计数器标记. 将计数设置为 ` 0 ` 将隐藏该标记。

在macOS系统中, 它展示在dock图标上。在Linux系统中, 它只适用于Unity启动器.

** 注意: **Unity 启动器依赖于 `.desktop ` 文件, 获取更多信息, 请阅读 [ 桌面环境集成 ](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux)。

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - 获取计数器提醒(badge) 中显示的当前值

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - 当前桌面环境是否为 Unity 启动器

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `选项` Object (可选) 
  * ` path `String (可选) * Windows *-要比较的可执行文件路径。默认为 ` process. execPath `。
  * ` 参数 `String [] (可选) * Windows *-要比较的命令行参数。默认为空数组。

如果你为 ` app. setLoginItemSettings ` 提供` path ` 和 ` args ` 选项，那么你需要在这里为 ` openAtLogin ` 设置正确的参数。

返回 ` Object `:

* `openAtLogin` Boolean - `true` 如果应用程序设置为在登录时打开, 则为 <0>true</0>
* `openAsHidden` Boolean *macOS* - `true` 表示应用在登录时以隐藏的方式启动。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `wasOpenedAtLogin` Boolean *macOS* - `true` 表示应用在自动登录后已经启动。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* ` wasOpenedAsHidden `Boolean *macOS* - 如果应用在登录时已经隐藏启动, 则为 ` true `。 这表示应用程序在启动时不应打开任何窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
* `restoreState` Boolean *macOS* - `true` 表示应用作为登录启动项并且需要恢复之前的会话状态。 这表示程序应该还原上次关闭时打开的窗口。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (可选) - `true`在登录时启动应用，`false` 移除应用作为登录启动项 。默认为 `false`.
  * `openAsHidden` Boolean (可选) *macOS* - `true` 表示以隐藏的方式启动应用。 默认为`false`。 用户可以从系统首选项中编辑此设置, 以便在打开应用程序时检查 ` app. getLoginItemStatus (). wasOpenedAsHidden ` 以了解当前值。 该配置在 [ MAS 构建 ](../tutorial/mac-app-store-submission-guide.md)时不可用。
  * `path` String (可选) *Windows* - 在登录时启动的可执行文件。默认为 `process.execPath`.
  * `args` String[] (可选) *Windows* - 要传递给可执行文件的命令行参数。默认为空数组。注意用引号将路径换行。

设置应用程序的登录项设置。

如果需要在使用[Squirrel](https://github.com/Squirrel/Squirrel.Windows)的 Windows 上使用 Electron 的 `autoUpdater` ，你需要将启动路径设置为 Update.exe，并传递指定应用程序名称的参数。 例如：

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

Returns `Boolean` - 如果开启了Chrome的辅助功能, 则返回 `true`，其他情况返`false`。 如果使用了辅助技术（例如屏幕阅读），该 API 将返回 `true</0。 查看更多细节，请查阅
https://www.chromium.org/developers/design-documents/accessibility</p>

<h3><code>app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*</h3> 

* `enable` 逻辑值 - 启用或禁用[访问权限树](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)视图。

手动启用 Chrome 的辅助功能的支持, 允许在应用程序中设置是否开启辅助功能。 查看更多信息，请查阅 https://www.chromium.org/developers/design-documents/accessibility 默认为禁用

**注意:** 渲染进程树会明显的影响应用的性能。默认情况下不应该启用。

### `app.setAboutPanelOptions(options)` *macOS*

* `选项` Object 
  * `applicationName` String (可选) - 应用程序的名字
  * `applicationVersion` String (可选) - 应用程序版本
  * `copyright` String (可选) - 版权信息
  * `credits` String (可选) - 信用信息.
  * `version` String (可选) - 应用程序版本号

设置 "关于" 面板选项。 这将覆盖应用程序的 `.plist ` 文件中定义的值。 更多详细信息, 请查阅 [ Apple 文档 ](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc)。

### `app.startAccessingSecurityScopedResource(bookmarkData)` *macOS (mas)*

* `bookmarkData` String - base64 编码的安全作用域的书签数据(bookmark data) ，通过 `dialog.showOpenDialog` 或者 `dialog.showSaveDialog` 方法获取。

返回 `Function` - 该函数 **必须** 在你完成访问安全作用域文件后调用一次。 If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

```js
//开始读取文件
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

开始访问安全范围内的资源。 With this method electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. 关于系统工作原理，请查阅[Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - 命令行开关
* `value` String (optional) - 给开关设置的值

通过可选的参数 `value` 给 Chromium 中添加一个命令行开关。

** 注意: **该方法不会影响 ` process. argv `, 我们通常用这个方法控制一些底层的 Chromium 行为。

### `app.commandLine.appendArgument(value)`

* ` value `String - 要追加到命令行的参数

给 Chromium 中直接添加一个命令行参数，该参数的引号和格式必须正确。

** 注意: **该方法不会影响 ` process. argv `

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

在应用程序上启用混合沙盒模式。

这个方法只能在应用程序准备就绪（ready）之前调用。

### `app.isInApplicationsFolder()` *macOS*

返回 ` Boolean `- 应用程序当前是否在系统应用程序文件夹运行。 可以搭配 ` app. moveToApplicationsFolder () `使用

### `app.moveToApplicationsFolder()` *macOS*

返回 ` Boolean `-移动是否成功。 请注意, 当您的应用程序移动成功, 它将退出并重新启动。

默认情况下这个操作将不会显示任何确认对话框, 如果您希望让用户来确认操作，你可能需要使用 [` dialog `](dialog.md) API

**注意:**如果并非是用户造成操作失败，这个方法会抛出错误。 例如，如果用户取消了授权会话，这个方法将返回false。 如果无法执行复制操作, 则此方法将引发错误。 错误中的信息应该是信息性的，并告知具体问题。

### `app.dock.bounce([type])` *macOS*

* `type` String (可选) - 可以为`critical` 或 `informational`. 默认值为 `informational`

当传入的是 `critical` 时, dock 中的应用将会开始弹跳, 直到这个应用被激活或者这个请求被取消。

当传入的是 `informational` 时, dock 中的图标只会弹跳一秒钟。但是, 这个请求仍然会激活, 直到应用被激活或者请求被取消。

返回 `Integer` 这个请求的 ID

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

取消这个 ` id ` 对应的请求。

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

如果 filePath 位于 Downloads 文件夹中，则弹出下载队列。

### `app.dock.setBadge(text)` *macOS*

* `text` String

设置应用在 dock 中显示的字符串。

### `app.dock.getBadge()` *macOS*

返回 `String` - 应用在 dock 中显示的字符串。

### `app.dock.hide()` *macOS*

隐藏 dock 中的图标。

### `app.dock.show()` *macOS*

显示 dock 图标

### `app.dock.isVisible()` *macOS*

返回 ` Boolean `-表示 dock 图标当前是否可见。` app.dock.show () ` 是异步调用的，因此此方法可能无法在调用之后立即返回true.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

设置该应用程序的 [dock 菜单](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为应用在 dock 中显示的图标