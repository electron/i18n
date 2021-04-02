# shell

> 使用默认应用程序管理文件和 url。

流程： [主](../glossary.md#main-process)、 [渲染器](../glossary.md#renderer-process) （仅限非沙盒）

` shell ` 模块提供与桌面集成相关的功能。

在用户的默认浏览器中打开 URL 的示例:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**注意：** 虽然 `shell` 模块可用于渲染器过程，但它不会在沙盒渲染器中工作。

## 方法

` shell ` 模块具有以下方法:

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

在文件管理器中显示给定文件。 如果可能，请选择该文件。

### `shell.openPath(path)`

* `path` String

返回 `Promise<String>` - 如果发生故障，则用包含与故障对应的错误消息的字符串解决，否则""。

以桌面的默认方式打开给定的文件。

### `shell.openExternal(url[, options])`

* `url` 字符串 - 窗口上的最大 2081 个字符。
* `options` Object (可选)
  * `activate` 布尔（可选） _macOS_ - `true` 将打开的应用程序推向前景。 默认值为 `true`。
  * `workingDirectory`字符串 (可选的) _Windows_ - 工作目录

返回 `Promise<void>`

以桌面的默认方式打开给定的外部协议 URL。 （例如，邮件托：用户默认邮件代理中的网址）。

### `shell.moveItemToTrash(fullPath[, deleteOnFail])` _废弃_

* `fullPath` String
* `deleteOnFail` Boolean （可选） - 如果垃圾被禁用或在音量上不受支持，是否单方面删除物品。 _macOS_

退货 `Boolean` - 物品是否成功移入垃圾桶或以其他方式删除。

> 注意：此方法已废弃。 使用 `shell.trashitem` 代替。

将给定的文件移动到垃圾箱，并返回操作的布尔状态。

### `shell.trashItem(path)`

* `path` 字符串 - 要移动到垃圾的物品的路径。

返回 `Promise<void>` - 操作完成后解决。 删除所要求的项目时出现错误时拒绝。

这将路径移动到操作系统特定的垃圾位置（macOS 上的垃圾、Windows 上的回收 箱以及 Linux 上的桌面环境特定位置）。

### `shell.beep()`

播放哔哔的声音.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` 字符串（可选） - 默认值为 `create`，可如下：
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
