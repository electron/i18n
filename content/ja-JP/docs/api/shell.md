# shell

> デフォルトのアプリケーションを使用してファイルと URL を管理します。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

`shell` モジュールは、デスクトップの統合に関する機能を提供します。

以下はユーザの既定のブラウザで URL を開く例です。

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## メソッド

`shell` モジュールには以下のメソッドがあります。

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常に表示されているかどうか.

指定したファイルをファイルマネージャに表示します。可能であれば、ファイルを選択します。

### `shell.openItem(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常に開かれているかどうか.

指定したファイルをデスクトップの既定の方法で開きます。

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Object (任意) 
  * `activate` Boolean (任意) - `true` で開いたアプリケーションを前面に表示します。省略値は `true` です。*macOS*
  * `workingDirectory` String (任意) - 作業ディレクトリ。*Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (任意) 
  * `activate` Boolean (任意) - `true` で開いたアプリケーションを前面に表示します。省略値は `true` です。*macOS*
  * `workingDirectory` String (任意) - 作業ディレクトリ。*Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常にゴミ箱に移動されたかどうか.

指定されたファイルをゴミ箱に移動し、操作の状態の Boolean を返します。

### `shell.beep()`

通知音を再生します。

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operation` String (任意) - 省略値は `create`。以下のいずれかにできます。 
  * `create` - 新しいショートカットを作成し、必要であれば上書きします。
  * `update` - 既にあるショートカットのみを、指定したプロパティで更新します。
  * `replace` - 既にあるショートカットを上書きし、存在しなければ失敗します。
* `options` [ShortcutDetails](structures/shortcut-details.md)

戻り値 `Boolean` - ショートカットが正常に作成されたかどうか.

`shortcutPath` のショートカットリンクを作成か更新します。

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

戻り値 [`ShortcutDetails`](structures/shortcut-details.md)

`shortcutPath` のショートカットリンクを解決します。

エラーが発生すると、例外がスローされます。