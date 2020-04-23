# Task オブジェクト

* `program` String - 実行するプログラムパスで、通常は現在のプログラムを開く `process.execPath` を指定すべきです。
* `arguments` String - `program` が実行される時のコマンドライン引数。
* `title` String - ジャンプリストに表示される文字列。
* `description` String - このタスクの説明。
* `iconPath` String - ジャンプリストに表示されるアイコンの絶対パスで、アイコンを含む任意のリソースファイルを指定できます。 通常、プログラムのアイコンを表示するために、`process.execPath` を指定します。
* `iconIndex` Number - アイコンファイル内のアイコンインデックス。 アイコンファイルが2つ以上のアイコンで構成されている場合は、アイコンを識別するためにこの値を設定します。 アイコンファイルが1つのアイコンで構成されている場合、この値は0です。
* `workingDirectory` String (任意) - 作業ディレクトリ。 省略値は空文字列です。
