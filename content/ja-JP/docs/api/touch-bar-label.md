## クラス: TouchBarLabel

> ネイティブ macOS アプリケーション用のタッチバー内にラベルを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - 表示するテキスト。
  * `accessibilityLabel` String (任意) - VoiceOver などのスクリーンリーダーが使用するボタンの簡単な説明文。
  * `textColor` String (任意) - 16進数形式、即ち `#ABCDEF` のテキスト色。

`accessibilityLabel` を定義するときは、macOS [ベストプラクティス](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) を満たしていることを確認してください。

### インスタンスプロパティ

`TouchBarLabel` のインスタンスには以下のプロパティがあります。

#### `touchBarLabel.label`

ラベルの現在のテキストを表す `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。

#### `touchBarLabel.accessibilityLabel`

スクリーンリーダーが読み上げるラベルの説明文を表す `String`。

#### `touchBarLabel.textColor`

ラベルの現在のテキスト色の16進数コードの `String`。この値を変更すると、タッチバーのラベルがすぐに更新されます。