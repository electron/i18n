## クラス: TouchBarButton

> ネイティブ macOS アプリケーション用のタッチバー内にボタンを作成する

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarButton(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - ボタンのテキスト。
  * `backgroundColor` String (任意) - 16進数形式、即ち `#ABCDEF` のボタンの背景色。
  * `icon` [NativeImage](native-image.md) (任意) - ボタンのアイコン。
  * `iconPosition` String (任意) - `left`、`right`、`overlay` にできます。
  * `click` Function (任意) - ボタンがクリックされたときに呼ぶ関数。

### インスタンスプロパティ

`TouchBarButton` のインスタンスには以下のプロパティがあります。

#### `touchBarButton.label`

ボタンの現在のテキストを表す `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.backgroundColor`

ボタンの現在の背景色を表す16進数コードの `String`。この値を変更すると、タッチバーのボタンがすぐに更新されます。

#### `touchBarButton.icon`

ボタンの現在のアイコンを表す `NativeImage`。この値を変更すると、タッチバーのボタンがすぐに更新されます。