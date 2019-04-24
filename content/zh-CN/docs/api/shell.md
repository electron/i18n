# shell

> 使用默认应用程序管理文件和 url。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

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

返回 `Boolean` - 文件是否成功显示.

在文件管理器中显示给定的文件。如果可以, 选中该文件。

### `shell.openItem(fullPath)`

* `fullPath` String

返回 `Boolean` - 文件是否成功打开

以桌面的默认方式打开给定的文件。

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `选项` Object (可选) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `参数` Object (可选) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash.

Move the given file to trash and returns a boolean status for the operation.

### `shell.beep()`

Play the beep sound.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (optional) - Default is `create`, can be one of following: 
  * `create` - Creates a new shortcut, overwriting if necessary.
  * `update` - Updates specified properties only on an existing shortcut.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

Returns `Boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.