# 对话框

> 显示用于打开和保存文件、警报等的本机系统对话框。

进程：[主进程](../glossary.md#main-process)

下面是一个选择多个文件的对话框示例：

```javascript
续 { dialog } =需要（"电子"）
控制台.log（对话。显示开放对话（{属性：['打开文件'，'多选']}）
```

## 方法

` dialog ` 模块具有以下方法:

### `对话。显示打开对话同步（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 对话框的默认展示路径
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[](可选)-包括对话框应当使用的特性。 支持以下属性值:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` promptToCreate ` _Windows_-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_-禁用自动的别名路径(符号链接) 解析。 所选别名现在将会返回别名路径而非其目标路径。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `dontAddToRecent` _视窗_ - 不要将打开的项目添加到最近的文档列表中。
  * `message` String (可选) _ macOS _-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

返回 `String[] | undefined`，用户选择的文件路径：如果对话被取消，它会 `undefined`返回。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。 例如：

```javascript
•
  过滤器：[
    {名称："图像"， 扩展：['jpg'，'png'，'gif']，
    \名称：'电影'，扩展：[mkv'，'avi'，'mp4']，
    +名称：'自定义文件类型'，扩展：['as]，
    {名称：'所有文件'，扩展：[***][
  ]]

```

` extensions ` 数组应为没有通配符或点的扩展名 (例如, ` "png" ` 是正确的, 而 ` ".png" ` 和 ` *. png "` 就是错误的)。 若要显示所有文件, 请使用 ` "*" ` 通配符 (不支持其他通配符)。

** 注意: **在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 ` properties ` 设置为`["openFile"、"openDirectory"]`, 则将显示为目录选择器。

```js
对话。显示打开对话同步（主窗口，{
  属性：['打开文件'，'打开目录']
}）
```

### `对话。显示打开对话（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 对话框的默认展示路径
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `properties` String[](可选)-包括对话框应当使用的特性。 支持以下属性值:
    * `openFile` - 允许选择文件
    * `openDirectory` - 允许选择文件夹
    * ` multiSelections `-允许多选。
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` promptToCreate ` _Windows_-如果输入的文件路径在对话框中不存在, 则提示创建。 这并不是真的在路径上创建一个文件，而是允许返回一些不存在的地址交由应用程序去创建。
    * `noResolveAliases` _macOS_-禁用自动的别名路径(符号链接) 解析。 所选别名现在将会返回别名路径而非其目标路径。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `dontAddToRecent` _视窗_ - 不要将打开的项目添加到最近的文档列表中。
  * `message` String (可选) _ macOS _-显示在输入框上方的消息。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16)

返回 `Promise<Object>` - 用包含以下内容的对象解决：

* `canceled` 布尔 - 对话是否被取消。
* ` filePaths ` String[] - 用户选择的文件路径的数组. 如果对话框被取消，这将是一个空的数组。
* `bookmarks` String[] (optional) _macOS_ _mas_ - 一个 `filePaths` 数组符合 base64 编码的安全作用域的书签数据。 `securityScopedBookmarks` 必须启用才能捕获数据。 （有关返回值，请参阅此处 [表](#bookmarks-array)。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

` filters ` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。 例如：

```javascript
•
  过滤器：[
    {名称："图像"， 扩展：['jpg'，'png'，'gif']，
    \名称：'电影'，扩展：[mkv'，'avi'，'mp4']，
    +名称：'自定义文件类型'，扩展：['as]，
    {名称：'所有文件'，扩展：[***][
  ]]

```

` extensions ` 数组应为没有通配符或点的扩展名 (例如, ` "png" ` 是正确的, 而 ` ".png" ` 和 ` *. png "` 就是错误的)。 若要显示所有文件, 请使用 ` "*" ` 通配符 (不支持其他通配符)。

** 注意: **在 Windows 和 Linux 上, 打开对话框不能同时是文件选择器和目录选择器, 因此如果在这些平台上将 ` properties ` 设置为`["openFile"、"openDirectory"]`, 则将显示为目录选择器。

```js
对话。显示开放对话（主窗口， {
  属性：[打开文件'，"打开标题"]
[）。然后（结果=> {
  控制台.log（结果.取消）
  控制台.log（结果。文件路径）
}）
.log
  > 。
```

### `对话。显示保存对话同步（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) _ macOS _-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) _ macOS _ - 文件名输入框对应的自定义标签名。
  * ` showsTagField ` Boolean (可选) _ macOS _-显示标记输入框, 默认为 ` true `。
  * `properties` 字符串[]（可选）
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `showOverwriteConfirmation` _Linux_ - 设置如果用户键入已存在的文件名，是否会向用户提供确认对话。
    * `dontAddToRecent` _Windows_ - 不要将保存的项目添加到最近的文档列表中。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

返回 `String | undefined`，用户选择的文件的路径：如果对话被取消，它会 `undefined`返回。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

### `对话。显示保存对话（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `title` String (可选) - 对话框窗口的标题
  * `defaultPath` String (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  * ` buttonLabel ` String (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  * `filters` [FileFilter[]](structures/file-filter.md) (可选)
  * `message` String (可选) _ macOS _-显示在对话框上的消息。
  * ` nameFieldLabel ` String (可选) _ macOS _ - 文件名输入框对应的自定义标签名。
  * `showsTagField` 布尔（可选） _macOS_ - 显示标签输入框，默认为 `true`。
  * `properties` 字符串[]（可选）
    * ` showHiddenFiles `-显示对话框中的隐藏文件。
    * `createDirectory` _macOS_ -允许你通过对话框的形式创建新的目录。
    * ` treatPackageAsDirectory `_ macOS _-将包 (如 `.app ` 文件夹) 视为目录而不是文件。
    * `showOverwriteConfirmation` _Linux_ - 设置如果用户键入已存在的文件名，是否会向用户提供确认对话。
    * `dontAddToRecent` _Windows_ - 不要将保存的项目添加到最近的文档列表中。
  * `securityScopedBookmarks` Boolean (可选) _macOS_ _mas_ - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

返回 `Promise<Object>` - 用包含以下内容的对象解决：

* `canceled` 布尔 - 对话是否被取消。
* `filePath` 字符串（可选） - 如果对话被取消，这将是 `undefined`。
* `bookmark` String(optional) _macOS_ _mas_ - 包含了安全作用域的书签数据 Base64 编码的字符串来保存文件。 `securityScopedBookmarks` 必须启用才有效。 （有关返回值，请参阅此处 [表](#bookmarks-array)。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。

`filters` 可以指定可显示文件的数组类型，详见 `dialog.showOpenDialog` 事例

**注意：** macOS 上，建议使用异步版本以避免 扩展和折叠对话时出现问题。

### `对话。显示信息盒同步（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `message` String - message box 的内容.
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` 字符串[]（可选） - 按钮的文本阵列。 在 Windows 上， 的空阵列将导致一个标记为"确定"的按钮。
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` 字符串（可选） - 如果提供，消息框将 包括带有给定标签的复选框。
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值。 默认值为 `false`
  * `icon` ([NativeImage](native-image.md) | String) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在此类标记按钮且未设置此选项，则 `0` 将用作 返回值。
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

返回 `Integer` - 单击按钮的索引。

显示一个消息框，它将阻止过程，直到消息框关闭。 它返回单击按钮的索引。

` browserWindow ` 参数允许该对话框将自身附加到父窗口, 作为父窗口的模态框。 如果不显示 `browserWindow` 对话将不附加到它。 在这种情况想，它将作为一个独立的窗口显示。

### `对话。显示信息框（[浏览器窗口，]选项）`

* `browserWindow` [BrowserWindow](browser-window.md) (可选)
* `选项` 对象
  * `message` String - message box 的内容.
  * `type` String (可选) - 可以为 `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`. 在 Windows 上, `"question"` 与`"info"`显示相同的图标, 除非你使用了 `"icon"` 选项设置图标。 在 macOS 上, `"warning"` 和 `"error"` 显示相同的警告图标
  * `buttons` 字符串[]（可选） - 按钮的文本阵列。 在 Windows 上， 的空阵列将导致一个标记为"确定"的按钮。
  * `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  * `title` String (可选) - message box 的标题，一些平台不显示.
  * `detail` String (可选) - 额外信息.
  * `checkboxLabel` 字符串（可选） - 如果提供，消息框将 包括带有给定标签的复选框。
  * `checkboxChecked` Boolean (可选) - checkbox 的初始值。 默认值为 `false`
  * `icon` [NativeImage](native-image.md) (可选)
  * `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. By default this is assigned to the first button with "cancel" or "no" as the label. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在此类标记按钮且未设置此选项，则 `0` 将用作 返回值。
  * `noLink` Boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  * `normalizeAccessKeys` Boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

返回 `Promise<Object>` - 承诺包含以下属性的解析：

* `response` 编号 - 点击按钮的索引。
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

返回 `Promise<void>` - 显示证书信任对话时解析。

在macOS中, 将弹出一个用于展示消息与证书信息并向用户提供信任/导入证书的选项的模态对话框。 如果提供 ` browserWindow ` 参数, 则该对话框将附加到父窗口, 使其成模态框。

在Windows中, 受限于Win32 API，可选项变得更为有限:

* `message` 参数无效，因为操作系统提供了自身的确认对话框。
* `browserWindow` 参数被忽略，因此无法成为模态对话框。

## 书签阵列

`showOpenDialog`、 `showOpenDialogSync`、 `showSaveDialog`和 `showSaveDialogSync` 将返回一个 `bookmarks` 阵列。

| 构建类型  | 安全范围书签布尔 | 返回类型 | 回报值             |
| ----- | -------- |:----:| --------------- |
| 马科斯马斯 | 真        |  成功  | `['长手册标记]]`     |
| 马科斯马斯 | 真        |  错误  | `['']` （空字符串阵列） |
| 马科斯马斯 | False    |  那   | `[]` （空阵列）      |
| 非马斯   | 任何       |  那   | `[]` （空阵列）      |

## 工作表

在[`MaCOS`](browser-window.md)中，如果在<0>browserWindow</0>的参数中提供<0>BrowerWindow</0>这一参数，或者在非<0>browserWindow</0>中未提供<0>modals</0>参数，则将对附加到<0>window</0>中的<0>sheet</0>的形式呈现。

您可以调用 `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` 来更改附加工作表的窗口框架的偏移量。
