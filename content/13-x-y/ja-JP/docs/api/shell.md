# shell

> デフォルトのアプリケーションを使用してファイルと URL を管理します。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process) (非サンドボックス時のみ)

`shell` モジュールは、デスクトップの統合に関する機能を提供します。

以下はユーザの既定のブラウザで URL を開く例です。

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

**注:** `shell` モジュールはレンダラープロセスで使用できますが、サンドボックス化されたレンダラーでは機能しません。

## メソッド

`shell` モジュールには以下のメソッドがあります。

### `shell.showItemInFolder(fullPath)`

* `fullPath` String

指定したファイルをファイルマネージャに表示します。 可能であれば、ファイルを選択します。

### `shell.openPath(path)`

* `path` String

戻り値 `Promise<String>` - 障害が発生した場合、その障害に対応するエラーメッセージを含む文字列で解決します。それ以外では "" になります。

指定したファイルをデスクトップの既定の方法で開きます。

### `shell.openExternal(url[, options])`

* `url` String - Windows では最大2081文字です。
* `options` Object (任意)
  * `activate` Boolean (任意) _macOS_ - `true` で開いたアプリケーションを前面に表示します。 省略値は `true` です。
  * `workingDirectory` String (任意) _Windows_ - 作業ディレクトリ。

戻り値 `Promise<void>`

指定した外部プロトコルの URL をデスクトップ既定の方法で開きます。 (例えば、mailto: の URL はユーザのデフォルトのメールエージェントになります)。

### `shell.trashItem(path)`

* `path` String - ゴミ箱へ送るアイテムのパス。

戻り値 `Promise<void>` - 操作が完了したときに解決します。 要求されたアイテムの削除中にエラーが発生した場合に拒否します。

これにより、パスのものを OS 固有のゴミ箱の場所 (macOS ではゴミ箱、Windows ではごみ箱、Linux ではデスクトップ環境固有の場所) へ移動させます。

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
