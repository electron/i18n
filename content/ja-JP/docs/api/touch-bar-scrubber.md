## クラス: TouchBarScrubber

> スクラバー (スクロールできるセレクタ) を作成します。

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *実験的*

* `options` オブジェクト 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - このスクラバーに配置するアイテムの配列
  * `select` Function - ユーザーが最後にタップしたアイテムではないアイテムをタップすると呼ばれる 
    * `selectedIndex` Integer - ユーザが選択したアイテムのインデックス
  * `highlight` Function - ユーザが任意のアイテムをタップしたときに呼ばれる 
    * `highlightedIndex` Integer - ユーザがタッチしたアイテムのインデックス
  * `selectedStyle` String - 選択したアイテムのスタイル。省略値は `null`。
  * `overlayStyle` String - 選択して重なったアイテムのスタイル。省略値は `null`。
  * `showArrowButtons` Boolean - 省略値は `false`。
  * `mode` String - 省略値は `free`。
  * `continuous` Boolean - 省略値は `true`。

### インスタンスプロパティ

`TouchBarScrubber` のインスタンスには以下のプロパティがあります。

#### `touchBarScrubber.items`

A `ScrubberItem[]` array representing the items in this scrubber. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.overlayStyle`

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`
* `null` - Actually null, not a string, removes all styles

#### `touchBarScrubber.showArrowButtons`

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### `touchBarScrubber.mode`

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

* `fixed` - Maps to `NSScrubberModeFixed`
* `free` - Maps to `NSScrubberModeFree`

#### `touchBarScrubber.continuous`

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.