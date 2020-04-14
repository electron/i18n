## クラス: TouchBarButton

> ネイティブ macOS アプリケーション用のタッチバー内にボタンを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` _Experimental_

* `options` Object
  * `label` String (任意) - ボタンのテキスト。
  * `accessibilityLabel` String (任意) - VoiceOver などのスクリーンリーダーが使用するボタンの簡単な説明文。
  * `backgroundColor` String (任意) - 16進数形式、即ち `#ABCDEF` のボタンの背景色。
  * `icon` [NativeImage](native-image.md) | String (任意) - ボタンのアイコン。
  * `iconPosition` String (optional) - Can be `left`, `right` or `overlay`. Defaults to `overlay`.
  * `click` Function (任意) - ボタンがクリックされたときに呼ぶ関数。

`accessibilityLabel` を定義するときは、macOS [ベストプラクティス](https://developer.apple.com/documentation/appkit/nsaccessibilitybutton/1524910-accessibilitylabel?language=objc) を満たしていることを確認してください。

### インスタンスプロパティ

`TouchBarButton` のインスタンスには以下のプロパティがあります。

#### `touchBarButton.accessibilityLabel`

A `String` representing the description of the button to be read by a screen reader. Will only be read by screen readers if no label is set.

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
