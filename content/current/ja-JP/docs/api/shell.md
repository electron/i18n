# shell

> デフォルトのアプリケーションを使用してファイルと URL を管理します。

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) (non-sandboxed only)

`shell` モジュールは、デスクトップの統合に関する機能を提供します。

以下はユーザの既定のブラウザで URL を開く例です。

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**Note:** While the `shell` module can be used in the renderer process, it will not function in a sandboxed renderer.

## メソッド

`shell` モジュールには以下のメソッドがあります。

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

指定したファイルをファイルマネージャに表示します。 可能であれば、ファイルを選択します。

### `shell.openPath(path)`

* `path` String

Returns `Promise<String>` - Resolves with an string containing the error message corresponding to the failure if a failure occurred, otherwise "".

指定したファイルをデスクトップの既定の方法で開きます。

### `shell.openExternal(url[, options])`

* `url` String - Windows では最大2081文字です。
* `options` Object (任意)
  * `activate` Boolean (任意) _macOS_ - `true` で開いたアプリケーションを前面に表示します。 省略値は `true` です。
  * `workingDirectory` String (任意) _Windows_ - 作業ディレクトリ。

戻り値 `Promise<void>`

指定した外部プロトコルの URL をデスクトップ既定の方法で開きます。 (例えば、mailto: の URL はユーザのデフォルトのメールエージェントになります)。

### `shell.moveItemToTrash(fullPath[, deleteOnFail])`

* `fullPath` String
* `deleteOnFail` Boolean (optional) - Whether or not to unilaterally remove the item if the Trash is disabled or unsupported on the volume. _macOS_

戻り値 `Boolean` - その項目が正常にゴミ箱に移動されたかどうか.

指定されたファイルをゴミ箱に移動し、操作の状態の Boolean を返します。

### `shell.beep()`

通知音を再生します。

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` String
* `operation` String (任意) - 省略値は `create` で、以下の値のいずれかにできます。
  * `create` - 新しいショートカットを作成し、必要であれば上書きします。
  * `update` - 既にあるショートカットのみを、指定したプロパティで更新します。
  * `replace` - 既にあるショートカットを上書きし、存在しなければ失敗します。
* `options` [ShortcutDetails](structures/shortcut-details.md)

戻り値 `Boolean` - ショートカットが正常に作成されたかどうか.

`shortcutPath` のショートカットリンクを作成か更新します。

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` String

戻り値 [`ShortcutDetails`](structures/shortcut-details.md)

`shortcutPath` のショートカットリンクを解決します。

エラーが発生すると、例外がスローされます。
