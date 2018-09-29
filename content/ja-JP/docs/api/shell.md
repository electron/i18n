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

戻り値 `Boolean` - アイテムが正常に表示されているかどうか.

指定したファイルをファイルマネージャに表示します。可能であれば、ファイルを選択します。

### `shell.openItem(fullPath)`

* `fullPath` String

戻り値 `Boolean` - アイテムが正常に開かれているかどうか.

指定したファイルをデスクトップの既定の方法で開きます。

### `shell.openExternal(url[, options, callback])`

* `url` String - Windows では最大2081文字で、そうでないと関数は false を返します。
* `options` Object (任意) *macOS* 
  * `activate` Boolean - `true` で開いたアプリケーションを前面に表示します。省略値は `true` です。
* `callback` Function (任意) *macOS* - 指定されている場合は、非同期で開く処理を実行します。 
  * `error` Error

戻り値 `Boolean` - アプリケーションが URL を開けたかどうか。callback が指定されている場合、常に true を返します。

指定された外部プロトコル URL をデスクトップの既定の方法で開きます (たとえば、ユーザのデフォルトメールエージェントの mailto: URL)。

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