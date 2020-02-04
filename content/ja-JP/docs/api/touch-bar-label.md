## クラス: TouchBarLabel

> ネイティブ macOS アプリケーション用のタッチバー内にラベルを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - 表示するテキスト。
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `textColor` String (任意) - 16進数形式、即ち `#ABCDEF` のテキスト色。

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### インスタンスプロパティ

`TouchBarLabel` のインスタンスには以下のプロパティがあります。

#### `touchBarLabel.label`

ラベルの現在のテキストを表す `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。

#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.

#### `touchBarLabel.textColor`

ラベルの現在のテキスト色の16進数コードの `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。