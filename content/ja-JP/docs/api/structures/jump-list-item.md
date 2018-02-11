# JumpListItem オブジェクト

* `type` String (任意) - 以下のいずれか: 
  * `task` - タスクは、指定された引数でアプリを起動します。
  * `separator` - 標準の `Tasks` カテゴリの中で項目を区切るのに使用されます。
  * `file` - ジャンプリストを作成したアプリを使ってファイルを開くファイルリンク。これを動作させるには、アプリがファイルタイプのハンドラ (ただし、既定のハンドラでなくても構いません) として登録されていなければなりません。
* `path` String (任意) - 開くファイルのパス。`type` が `file` の場合だけ、設定してください。
* `program` String (任意) - 実行するプログラムのパス。通常は現在のプログラムを開く `process.execPath` を指定する必要があります。 `type` が `task` の場合だけ、設定する必要があります。
* `args` String (任意) - `program` 実行時のコマンドライン引数。`type` が `task` の場合だけ、設定する必要があります。
* `title` String (任意) - ジャンプリストの項目に表示されるテキスト。 `type` が `task` の場合だけ、設定する必要があります。
* `description` String (任意) - タスクの説明 (ツールチップで表示されます) 。 `type` が `task` の場合だけ、設定する必要があります。
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.