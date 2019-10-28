# 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框。

线程：[主线程](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

这个对话框是从Electron的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用remote来获得:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## 方法

` dialog ` 模块具有以下方法:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

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
    * ` noResolveAliases `* macOS *-禁用自动别名 (symlink) 路径解析。 选定的别名现在将返回别名路径而不是其目标路径。
    * ` treatPackageAsDirectory `* macOS *-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
  * `message` String (可选) * macOS *-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。例如:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

` extensions ` 数组应为没有通配符或点的扩展名 (例如, ` "png" ` 是正确的, 而 ` ".png" ` 和 ` *. png "` 就是错误的)。 若要显示所有文件, 请使用 ` "*" ` 通配符 (不支持其他通配符)。

** 注意: **在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 ` properties ` 设置为`["openFile"、"openDirectory"]`, 则将显示为目录选择器。

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

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
    * ` noResolveAliases `* macOS *-禁用自动别名 (symlink) 路径解析。 选定的别名现在将返回别名路径而不是其目标路径。
    * ` treatPackageAsDirectory `* macOS *-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
  * `message` String (可选) * macOS *-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` 必须启用才能捕获数据。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。例如:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

` extensions ` 数组应为没有通配符或点的扩展名 (例如, ` "png" ` 是正确的, 而 ` ".png" ` 和 ` *. png "` 就是错误的)。 若要显示所有文件, 请使用 ` "*" ` 通配符 (不支持其他通配符)。

** 注意: **在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 ` properties ` 设置为`["openFile"、"openDirectory"]`, 则将显示为目录选择器。

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object 
  * `title` String (可选)
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) * macOS *-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) * macOS * - 文件名输入框对应的自定义标签名。
  * ` showsTagField ` Boolean (可选) * macOS *-显示标记输入框, 默认为 ` true `。
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` Object 
  * `title` String (可选)
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) * macOS *-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) * macOS * - 文件名输入框对应的自定义标签名。
  * ` showsTagField ` Boolean (可选) * macOS *-显示标记输入框, 默认为 ` true `。
  * `securityScopedBookmarks` Boolean (optional) *macOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

Returns `Promise<Object>` - Resolve with an object containing the following:

    * `canceled` Boolean - whether or not the dialog was canceled.
    * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
    * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.
    

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object 
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[] (可选) - 按钮的文本数组。在 Windows 上, 空数组在按钮上会显示 "OK".
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `message` String - message box 的内容.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值，默认值为 `false`.
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

Returns `Integer` - the index of the clicked button.

显示消息框时，它将阻止进程直到消息框被关闭。返回点击按钮的索引。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object 
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[] (可选) - 按钮的文本数组。在 Windows 上, 空数组在按钮上会显示 "OK".
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `message` String - message box 的内容.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值，默认值为 `false`.
  * `icon` [NativeImage](native-image.md) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

Returns `Promise<Object>` - resolves with a promise containing the following properties:

    * `response` Number - The index of the clicked button.
    * `checkboxChecked` Boolean - The checked state of the checkbox if
    `checkboxLabel` was set. Otherwise `false`.
    

Shows a message box, it will block the process until the message box is closed.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

### `dialog.showErrorBox(title, content)`

* `title` String - 显示在错误框中的标题.
* `content` String - 显示在错误框中的文本内容.

显示一个显示错误消息的模态对话框。

这个API可以在 `app` 模块触发 `ready` 事件之前被安全地调用，它通常用在启动时报告错误。 在 Linux 上, `ready` 事件之前调用这个API, 消息将被发送到stderr, 并且不会出现GUI对话框。

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - 信任/导入的证书
  * `message` String - 要向用户显示的消息

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

在macOS中, 将弹出一个用于展示消息与证书信息并向用户提供信任/导入证书的选项的模态对话框。 如果提供 ` browserWindow ` 参数, 则该对话框将附加到父窗口, 使其成模态框。

在Windows中, 受限于Win32 API，可选项变得更为有限:

* `message` 参数无效，因为操作系统提供了自身的确认对话框。
* `browserWindow` 参数被忽略，因此无法成为模态对话框。

## 工作表

在[`MaCOS`](browser-window.md)中，如果在<0>browserWindow</0>的参数中提供<0>BrowerWindow</0>这一参数，或者在非<0>browserWindow</0>中未提供<0>modals</0>参数，则将对附加到<0>window</0>中的<0>sheet</0>的形式呈现。

您可以调用 `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` 来更改附加工作表的窗口框架的偏移量。