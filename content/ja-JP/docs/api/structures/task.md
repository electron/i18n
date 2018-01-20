# Task オブジェクト

* `program` String - 実行するプログラムのパス。通常は `process.execPath` を指定すると、現在のプログラムが開きます。
* `arguments` String - `program` が実行される時のコマンドラインの引数。
* `title` String - JumpListに表示される文字列。
* `description` String - このタスクの説明。
* `iconPath` String - JumpListで表示するアイコンへの絶対パス。アイコンを含む任意のリソースファイルである必要性があります。 通常、`process.execPath` を指定すると、プログラムのアイコンが表示されます。
* `iconIndex` Number - アイコンファイル内のアイコンインデックス。 アイコンファイルが2つ以上のアイコンで構成されている場合は、この値を設定してアイコンを識別します。 アイコンファイルが1つのアイコンで構成されている場合、この値は0です。