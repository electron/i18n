# 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框。

线程：[主线程](../glossary.md#main-process)

显示用于选择多个文件和目录的对话框的示例:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

这个对话框是从Electron的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用remote来获得:

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## 方法

` dialog ` 模块具有以下方法:

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` Object 
  * `title` String (可选)
  * `defaultPath` String (可选)
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[] (可选) -包含对话框应用的功能。支持以下值: 
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` *macOS* -允许你通过对话框的形式创建新的目录。
    * ` promptToCreate ` *Windows*-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` *macOS* - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` *macOS* - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `message` String (可选) * macOS *-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Function (可选) 
  * ` filePaths ` String[] - 用户选择的文件路径的数组
  * `bookmarks` String[] *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

返回 `String[]` 用户选择的文件路径数组，如果用户定义了callback ，则返回`undefined`。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。例如:

```javascript
{
  filters: [
    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
    {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Custom File Type', extensions: ['as']},
    {name: 'All Files', extensions: ['*']}
  ]
}
```

` extensions ` 数组应为没有通配符或点的扩展名 (例如, ` "png" ` 是正确的, 而 ` ".png" ` 和 ` *. png "` 就是错误的)。 若要显示所有文件, 请使用 ` "*" ` 通配符 (不支持其他通配符)。

如果定义了 ` callback `, 则 API 调用将是异步的, 结果将通过 ` callback(filenames)`返回.

** 注意: **在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 ` properties ` 设置为`["openFile"、"openDirectory"]`, 则将显示为目录选择器。

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` Object 
  * `title` String (可选)
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) * macOS *-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) * macOS * - 文件名输入框对应的自定义标签名。
  * ` showsTagField ` Boolean (可选) * macOS *-显示标记输入框, 默认为 ` true `。
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `callback` Function (可选) 
  * `filename` String
  * `bookmark` String *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

返回 `String[]` 用户选择的文件路径数组，如果用户定义了callback ，则返回`undefined`。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

如果传递了 `callback `, 则 API 调用将是异步的, 结果将通过 ` callback (filename)`传递.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` Object 
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[] (可选) - 按钮的文本数组。在 Windows 上, 空数组在按钮上会显示 "OK".
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `message` String - message box 的内容.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (可选) - 如果提供了If provided, 消息框将包含带有给定标签的复选框。 只有使用 `callback` 时，才能检查复选框的状态。
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值，默认值为 `false`.
  * `icon` [NativeImage](native-image.md) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在这样的标记按钮，并且该选项没有设置，那么 `0` 将用作返回值或回调响应。 该选项在 Windows 上会被忽略.
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。
* `callback` Function (可选) 
  * `response` Number - 被点击按钮的索引.
  * `checkboxChecked` Boolean - 如果设置了 `checkboxLabel`，返回复选框是否被选中的状态。否则为`false`.

返回 `Integer`, 即被点击按钮的索引, 如果提供回调方法, 它返回 undefined

显示消息框时，它将阻止进程直到消息框被关闭。返回点击按钮的索引。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

如果传递了 `callback`，窗口将不会阻断进程。该API 将异步调用，并将结果通过 `callback(response)` 传递

### `dialog.showErrorBox(title, content)`

* `title` String - 显示在错误框中的标题.
* `content` String - 显示在错误框中的文本内容.

显示一个显示错误消息的模态对话框。

这个API可以在 `app` 模块触发 `ready` 事件之前被安全地调用，它通常用在启动时报告错误。 在 Linux 上, `ready` 事件之前调用这个API, 消息将被发送到stderr, 并且不会出现GUI对话框。

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` Object 
  * `certificate` [Certificate](structures/certificate.md) - 信任/导入的证书
  * `message` String - 要向用户显示的消息
* `callback` Function

在macOS中, 将弹出一个用于展示消息与证书信息并向用户提供信任/导入证书的选项的模态对话框。 如果提供 ` browserWindow ` 参数, 则该对话框将附加到父窗口, 使其成模态框。

在Windows中, 受限于Win32 API，可选项变得更为有限:

* `message` 参数无效，因为操作系统提供了自身的确认对话框。
* `browserWindow` 参数被忽略，因此无法成为模态对话框。

## 工作表

在[`MaCOS`](browser-window.md)中，如果在<0>browserWindow</0>的参数中提供<0>BrowerWindow</0>这一参数，或者在非<0>browserWindow</0>中未提供<0>modals</0>参数，则将对附加到<0>window</0>中的<0>sheet</0>的形式呈现。

您可以调用 `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` 来更改附加工作表的窗口框架的偏移量。