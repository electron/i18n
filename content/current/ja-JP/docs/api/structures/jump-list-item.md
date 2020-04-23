# JumpListItem オブジェクト

* `type` String (optional) - One of the following:
  * `task` - 指定された引数でアプリを起動するタスク。
  * `separator` - 標準の `タスク` カテゴリ内で項目を分けるために使用されます。
  * `file` - ジャンプリストを作成したアプリを使ってファイルを開くファイルリンク。これを動作させるには、アプリがファイルタイプのハンドラ (既定のハンドラでなくても構いません) として登録されていなければなりません。
* `path` String (任意) - 開くファイルのパス。`type` が `file` の場合だけ、設定してください。
* `program` String (任意) - 実行するプログラムのパス。通常は現在のプログラムを開く `process.execPath` を指定する必要があります。 `type` が `task` の場合だけ、設定する必要があります。
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (任意) - ジャンプリストに表示されるアイコンの絶対パスで、アイコンを含む任意のリソースファイル (例えば、`.ico`、`.exe`、`.dll`) を指定できます。 通常、プログラムのアイコンを表示するために、`process.execPath` を指定します。
* `iconIndex` Number (任意) - リソースファイル内のアイコンのインデックス。 リソースファイルに複数のアイコンが含まれている場合、この値はこのタスクに表示されるべきアイコンのゼロ始まりのインデックスを指定するために使われます。 リソースファイルに1つだけのアイコンしか含まれていない場合、このプロパティは0を指定する必要があります。
* `workingDirectory` String (optional) - The working directory. Default is empty.
