# 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框。

进程：[主进程](../glossary.md#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## 方法

` dialog ` 模块具有以下方法:

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `title` String (可选)
  * `defaultPath` String (可选)
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 例如：

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

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `title` String (可选)
  * `defaultPath` String (可选)
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `dontAddToRecent` _Windows_ - Do not add the item being opened to the recent documents list.
  * `message` String (optional) _macOS_ - Message to display above input boxes.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `Promise<Object>` - Resolve with an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` 必须启用才能捕获数据。 (For return values, see [table here](#bookmarks-array).)

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 例如：

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

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

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
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `title` String (可选)
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (optional) _macOS_ - Message to display above text fields.
  * `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
  * `properties` String[] (optional)
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    * `showOverwriteConfirmation` _Linux_ - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
    * `dontAddToRecent` _Windows_ - Do not add the item being saved to the recent documents list.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `canceled` Boolean - whether or not the dialog was canceled.
  * `filePath` String (optional) - If the dialog is canceled, this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present. (For return values, see [table here](#bookmarks-array).)

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `message` String - message box 的内容.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。 If `browserWindow` is not shown dialog will not be attached to it. In such case It will be displayed as independed window.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `message` String - message box 的内容.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 If no such labeled buttons exist and this option is not set, `0` will be used as the return value.
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

Returns `Promise<Object>` - resolves with a promise containing the following properties:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box, it will block the process until the message box is closed.

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

### `dialog.showErrorBox(title, content)`

* `title` String - 显示在错误框中的标题.
* `content` String - 显示在错误框中的文本内容.

显示一个显示错误消息的模态对话框。

这个API可以在 `app` 模块触发 `ready` 事件之前被安全地调用，它通常用在启动时报告错误。 在 Linux 上, `ready` 事件之前调用这个API, 消息将被发送到stderr, 并且不会出现GUI对话框。

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - 信任/导入的证书
  * `message` String - 要向用户显示的消息

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

在macOS中, 将弹出一个用于展示消息与证书信息并向用户提供信任/导入证书的选项的模态对话框。 如果提供 ` browserWindow ` 参数, 则该对话框将附加到父窗口, 使其成模态框。

在Windows中, 受限于Win32 API，可选项变得更为有限:

* `message` 参数无效，因为操作系统提供了自身的确认对话框。
* `browserWindow` 参数被忽略，因此无法成为模态对话框。

## Bookmarks array

`showOpenDialog`, `showOpenDialogSync`, `showSaveDialog`, and `showSaveDialogSync` will return a `bookmarks` array.

| Build Type | securityScopedBookmarks boolean | Return Type | Return Value                   |
| ---------- | ------------------------------- |:-----------:| ------------------------------ |
| macOS mas  | True                            |   Success   | `['LONGBOOKMARKSTRING']`       |
| macOS mas  | True                            |    Error    | `['']` (array of empty string) |
| macOS mas  | False                           |     NA      | `[]` (empty array)             |
| non mas    | any                             |     NA      | `[]` (empty array)             |

## 工作表

在[`MaCOS`](browser-window.md)中，如果在<0>browserWindow</0>的参数中提供<0>BrowerWindow</0>这一参数，或者在非<0>browserWindow</0>中未提供<0>modals</0>参数，则将对附加到<0>window</0>中的<0>sheet</0>的形式呈现。

您可以调用 `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` 来更改附加工作表的窗口框架的偏移量。
