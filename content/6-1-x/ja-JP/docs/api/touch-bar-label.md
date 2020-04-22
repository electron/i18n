## クラス: TouchBarLabel

> ネイティブ macOS アプリケーション用のタッチバー内にラベルを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _実験的_

* `options` Object
  * `label` String (任意) - 表示するテキスト。
  * `textColor` String (任意) - 16進数形式、即ち `#ABCDEF` のテキスト色。

### インスタンスプロパティ

`TouchBarLabel` のインスタンスには以下のプロパティがあります。

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
