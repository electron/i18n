## クラス: TouchBarSlider

> ネイティブ macOS アプリケーション用のタッチバー内にスライダーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSlider(options)` _Experimental_

* `options` Object
  * `label` String (任意) - ラベルのテキスト。
  * `value` Integer (任意) - 選択されている値。
  * `minValue` Integer (任意) - 最小値。
  * `maxValue` Integer (任意) - 最大値。
  * `change` Function (optional) - Function to call when the slider is changed.
    * `newValue` Number - Slider 上でユーザが選択した値。

### インスタンスプロパティ

`TouchBarSlider` のインスタンスには以下のプロパティがあります。

#### `touchBarSlider.label`

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.value`

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.minValue`

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### `touchBarSlider.maxValue`

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.
