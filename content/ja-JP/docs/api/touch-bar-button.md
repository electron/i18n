## クラス: TouchBarButton

> ネイティブ macOS アプリケーション用のタッチバー内にボタンを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - ボタンのテキスト。
  * `accessibilityLabel` String (optional) - A short description of the button for use by screenreaders like VoiceOver.
  * `backgroundColor` String (任意) - 16進数形式、即ち `#ABCDEF` のボタンの背景色。
  * `icon` [NativeImage](native-image.md) | String (任意) - ボタンのアイコン。
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Function (任意) - ボタンがクリックされたときに呼ぶ関数。

When defining `accessibilityLabel`, ensure you have considered macOS [best practices](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc).

### インスタンスプロパティ

`TouchBarButton` のインスタンスには以下のプロパティがあります。

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

ボタンの現在のテキストを表す `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.backgroundColor`

ボタンの現在の背景色を表す16進数コードの `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.icon`

ボタンの現在のアイコンを表す `NativeImage`。この値を変更すると、タッチバーのボタンがすぐに更新されます。