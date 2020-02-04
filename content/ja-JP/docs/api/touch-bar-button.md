## クラス: TouchBarButton

> ネイティブ macOS アプリケーション用のタッチバー内にボタンを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - ボタンのテキスト。
  * `accessibilityLabel` String (任意) - VoiceOver などのスクリーンリーダーが使用するボタンの簡単な説明文。
  * `backgroundColor` String (任意) - 16進数形式、即ち `#ABCDEF` のボタンの背景色。
  * `icon` [NativeImage](native-image.md) | String (任意) - ボタンのアイコン。
  * `iconPosition` String (任意) - `left`、`right`、`overlay` のいずれかにできます。省略値は `overlay` です。
  * `click` Function (任意) - ボタンがクリックされたときに呼ぶ関数。

`accessibilityLabel` を定義するときは、macOS [ベストプラクティス](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) を満たしていることを確認してください。

### インスタンスプロパティ

`TouchBarButton` のインスタンスには以下のプロパティがあります。

#### `touchBarButton.accessibilityLabel`

スクリーンリーダーが読み上げるボタンの説明文を表す `String`。ラベルが設定されていない場合のみ、スクリーンリーダーが読み上げます。

#### `touchBarButton.label`

ボタンの現在のテキストを表す `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.backgroundColor`

ボタンの現在の背景色を表す16進数コードの `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.icon`

ボタンの現在のアイコンを表す `NativeImage`。この値を変更すると、タッチバーのボタンがすぐに更新されます。