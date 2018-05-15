# shell

> 使用默认应用程序管理文件和 url。

进程： [Main](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) 进程

` shell ` 模块提供与桌面集成相关的功能。

在用户的默认浏览器中打开 URL 的示例:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## 方法

` shell ` 模块具有以下方法:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully shown.

在文件管理器中显示给定的文件。如果可以, 选中该文件。

### `shell.openItem(fullPath)`

* `fullPath` String

返回 `Boolean` - 文件是否成功打开

以桌面的默认方式打开给定的文件。

### `shell.openExternal(url[, options, callback])`

* `url` String - max 2081 characters on windows, or the function returns false.
* `选项` Object (可选) *macOS* 
  * `activate` Boolean - ` true `将打开的应用程序置于前台. 默认值为 `true`.
* `callback` Function (可选) *macOS* - If specified will perform the open asynchronously. 
  * `error` Error

返回 `Boolean`类型 - 不管一个应用是否可以访问到URL，是否制定了回调，总是返回true

以桌面的默认方式打开给定的外部协议URL。 （例如，在用户的默认邮件代理中打开 mailto: URLs）。

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash.

将给定的文件移动到垃圾箱，并返回操作的布尔状态。

### `shell.beep()`

播放哔哔的声音.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) - 默认值为 `create`可为下列之一： 
  * `create` - 创建一个新的快捷方式, 如有必要可以覆盖。
  * `update` - 仅更新现有快捷方式上的指定属性。
  * `replace` - 覆盖现有快捷方式, 如果快捷方式不存在将会失败。
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully.

在`shortcutPath`位置创建或更新一个快捷连接

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

返回 [`ShortcutDetails`](structures/shortcut-details.md)

解析`shortcutPath`中的快捷链接。

发生任何错误时将引发异常。