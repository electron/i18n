## クラス: TouchBarSlider

> ネイティブ macOS アプリケーション用のタッチバー内にスライダーを作成する

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSlider(options)` *実験的*

* `options` オブジェクト 
  * `label` String (任意) - ラベルのテキスト。
  * `value` Integer (任意) - 選択されている値。
  * `minValue` Integer (任意) - 最小値。
  * `maxValue` Integer (任意) - 最大値。
  * `change` Function (任意) - スライダーが変更されたときに呼ぶ関数。 
    * `newValue` Number - Slider 上でユーザが選択した値。

### インスタンスプロパティ

`TouchBarSlider` のインスタンスには以下のプロパティがあります。

#### `touchBarSlider.label`

スライダーの現在のテキストを表す `String`。この値を変更すると、タッチバーのスライダーがすぐに更新されます。

#### `touchBarSlider.value`

スライダーの現在の値を表す `Number`。この値を変更すると、タッチバーのスライダーがすぐに更新されます。

#### `touchBarSlider.minValue`

スライダーの現在の最小値を表す `Number`。この値を変更すると、タッチバーのスライダーがすぐに更新されます。

#### `touchBarSlider.maxValue`

スライダーの現在の最大値を表す `Number`。この値を変更すると、タッチバーのスライダーがすぐに更新されます。