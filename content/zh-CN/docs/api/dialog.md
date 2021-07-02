# 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框。

进程：[主进程](../glossary.md#main-process)

下面是一个选择多个文件的对话框示例：

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

## 方法

` dialog ` 模块具有以下方法:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 对话框的默认展示路径
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[]&#32;(optional) - Contains which features the dialog should use. 支持以下属性值:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` promptToCreate ` _Windows_-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_-禁用自动的别名路径(符号链接) 解析。 所选别名现在将会返回别名路径而非其目标路径。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `dontAddToRecent` _Windows_ - 不要将正在打开的项目添加到最近的文档列表中。
  * `message` String (可选) _ macOS _-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

返回 `String[] | undefined`, 用户选择的文件路径，如果对话框被取消了 ，则返回`undefined`。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。 例如：

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
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 对话框的默认展示路径
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[]&#32;(optional) - Contains which features the dialog should use. 支持以下属性值:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` promptToCreate ` _Windows_-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_-禁用自动的别名路径(符号链接) 解析。 所选别名现在将会返回别名路径而非其目标路径。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `dontAddToRecent` _Windows_ - 不要将正在打开的项目添加到最近的文档列表中。
  * `message` String (可选) _ macOS _-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

返回 `Promise<Object>` - resolve包含以下内容的object：

* `canceled` Boolean - 对话框是否被取消。
* ` filePaths ` String[] - 用户选择的文件路径的数组. 如果对话框被取消，这将是一个空的数组。
* `bookmarks` String[]&#32;(optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` 必须启用才能捕获数据。 (返回值见 [这里的表格](#bookmarks-array)。)

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。 例如：

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
* `选项` 对象
  * `title` String (可选) - 对话框标题。 无法在一些 _Linux_ 桌面环境中显示。
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) _ macOS _-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) _ macOS _ - 文件名输入框对应的自定义标签名。
  * ` showsTagField ` Boolean (可选) _ macOS _-显示标记输入框, 默认为 ` true `。
  * `properties` String[]&#32;(optional)
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `showOverwriteConfirmation` _Linux_ - 设置如果用户输入了已存在的文件名，是否会向用户显示确认对话框。
    * `dontAddToRecent` _Windows_ - 不要将正在保存的项目添加到最近的文档列表中。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

返回 `String | undefined`, 用户选择的文件路径，如果对话框被取消了 ，则返回`undefined`。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框标题。 无法在一些 _Linux_ 桌面环境中显示。
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) _ macOS _-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) _ macOS _ - 文件名输入框对应的自定义标签名。
  * `showsTagField` Boolean (可选) _macOS_ - 显示标签输入框，默认为 `true`。
  * `properties` String[]&#32;(optional)
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `showOverwriteConfirmation` _Linux_ - 设置如果用户输入了已存在的文件名，是否会向用户显示确认对话框。
    * `dontAddToRecent` _Windows_ - 不要将正在保存的项目添加到最近的文档列表中。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

返回 `Promise<Object>` - resolve包含以下内容的object：

* `canceled` Boolean - 对话框是否被取消。
* `filePath` String (可选) - 如果对话框被取消，该值为 `undefined`。
* `bookmark` String(optional) _macOS_ _mas_ - 包含了安全作用域的书签数据 Base64 编码的字符串来保存文件。 `securityScopedBookmarks` 必须启用才有效。 (返回值见 [这里的表格](#bookmarks-array)。)

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

**注意：** 在macOS上，建议使用异步版本，以避免展开和折叠对话框时出现问题。

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `message` String - message box 的内容.
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[]&#32;(optional) - Array of texts for buttons. 在 Windows上，一个空数组将导致按钮被标为“OK”。
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (可选) - 如果使用了，消息框将包含带有给定标签的复选框。
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值。 默认值为 `false`
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在这个标签的按钮，同时该选项又未设置，返回值为`0`。
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

返回 `Integer` - 点击的按钮的索引。

显示一个消息框，它将阻塞进程直到消息框关闭。 它返回点击的按钮的索引。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。 如果 `浏览器窗口` 没有显示，则对话框不会附属于它。 在这种情况想，它将作为一个独立的窗口显示。

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `message` String - message box 的内容.
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[]&#32;(optional) - Array of texts for buttons. 在 Windows上，一个空数组将导致按钮被标为“OK”。
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (可选) - 如果使用了，消息框将包含带有给定标签的复选框。
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值。 默认值为 `false`
  * `icon` [NativeImage](native-image.md) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在这个标签的按钮，同时该选项又未设置，返回值为`0`。
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

返回 `Promise<Object>` - resolve包含以下属性的promise：

* `response` Number - 点击的按钮的索引。
* `checkboxChecked` Boolean - 如果设置了 `checkboxLabel`，返回复选框是否被选中的状态。 否则，返回 `false`。

显示一个消息框

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

### `dialog.showErrorBox(title, content)`

* `title` String - 显示在错误框中的标题.
* `content` String - 显示在错误框中的文本内容.

显示一个显示错误消息的模态对话框。

这个API可以在 `app` 模块触发 `ready` 事件之前被安全地调用，它通常用在启动时报告错误。 在 Linux 上, `ready` 事件之前调用这个API, 消息将被发送到stderr, 并且不会出现GUI对话框。

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `certificate` [Certificate](structures/certificate.md) - 信任/导入的证书
  * `message` String - 要向用户显示的消息

返回 `Promise<void>` - 当显示信任证书对话框时resolve。

在macOS中, 将弹出一个用于展示消息与证书信息并向用户提供信任/导入证书的选项的模态对话框。 如果提供 ` browserWindow ` 参数, 则该对话框将附加到父窗口, 使其成模态框。

在Windows中, 受限于Win32 API，可选项变得更为有限:

* `message` 参数无效，因为操作系统提供了自身的确认对话框。
* `browserWindow` 参数被忽略，因此无法成为模态对话框。

## Bookmarks 数组

`showOpenDialog`、 `showOpenDialogSync`、 `showSaveDialog`和 `showSaveDialogSync` 将返回一个 `bookmarks` 数组。

| 构建类型      | securityScopedBookmarks boolean | 返回类型  | 返回值                      |
| --------- | ------------------------------- |:-----:| ------------------------ |
| macOS mas | True                            |  成功   | `['LONGBOOKMARKSTRING']` |
| macOS mas | True                            | Error | `['']` (空字符串数组)          |
| macOS mas | False                           |  NA   | `[]` (空数组)               |
| non mas   | any                             |  NA   | `[]` (空数组)               |

## 工作表

在[`MaCOS`](browser-window.md)中，如果在<0>browserWindow</0>的参数中提供<0>BrowerWindow</0>这一参数，或者在非<0>browserWindow</0>中未提供<0>modals</0>参数，则将对附加到<0>window</0>中的<0>sheet</0>的形式呈现。

您可以调用 `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` 来更改附加工作表的窗口框架的偏移量。
