# shell

> デフォルトのアプリケーションを使用してファイルと URL を管理します。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

`shell` モジュールは、デスクトップの統合に関する機能を提供します。

以下はユーザの既定のブラウザで URL を開く例です。

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## メソッド

`shell` モジュールには以下のメソッドがあります。

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常に表示されているかどうか

指定したファイルをファイルマネージャに表示します。可能であれば、ファイルを選択します。

### `shell.openItem(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常に開かれているかどうか.

指定したファイルをデスクトップの既定の方法で開きます。

### `shell.openExternal(url[, options, callback])`

* `url` String - Windows では最大2081文字で、そうでないと関数は false を返します。
* `options` Object (任意) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `callback` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash

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

Returns `Boolean` - Whether the shortcut was created successfully

Creates or updates a shortcut link at `shortcutPath`.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

Returns [`ShortcutDetails`](structures/shortcut-details.md)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.