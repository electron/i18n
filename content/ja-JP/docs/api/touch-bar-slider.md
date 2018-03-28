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

The following properties are available on instances of `TouchBarSlider`:

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.