# shell

> 使用默认应用程序管理文件和 url。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

` shell ` 模块提供与桌面集成相关的功能。

在用户的默认浏览器中打开 URL 的示例:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## 方法

` shell ` 模块具有以下方法:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` String

返回 `Boolean` - 文件是否成功打开

以桌面的默认方式打开给定的文件。

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

**过时的**

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

返回 `Boolean` - 该对象是否成功移至垃圾箱。

将给定的文件移动到垃圾箱，并返回操作的布尔状态。

### `shell.beep()`

播放哔哔的声音.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - 创建一个新的快捷方式, 如有必要可以覆盖。
  * `update` - 仅更新现有快捷方式上的指定属性。
  * `replace` - 覆盖现有快捷方式, 如果快捷方式不存在将会失败。
* `options` [ShortcutDetails](structures/shortcut-details.md)

返回 `Boolean` - 快捷方式是否被成功创建。

在`shortcutPath`位置创建或更新一个快捷连接

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

返回 [`ShortcutDetails`](structures/shortcut-details.md)

解析`shortcutPath`中的快捷链接。

发生任何错误时将引发异常。
