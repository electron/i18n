## クラス: TouchBarLabel

> ネイティブ macOS アプリケーション用のタッチバー内にラベルを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - 表示するテキスト。
  * `textColor` String (任意) - 16進数形式、即ち `#ABCDEF` のテキスト色。

### インスタンスプロパティ

`TouchBarLabel` のインスタンスには以下のプロパティがあります。

#### `touchBarLabel.label`

ラベルの現在のテキストを表す `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。

#### `touchBarLabel.textColor`

ラベルの現在のテキスト色の16進数コードの `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。