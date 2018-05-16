## クラス: TouchBarScrubber

> スクラバー (スクロールできるセレクタ) を作成します。

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarScrubber(options)` *実験的*

* `options` オブジェクト 
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - An array of items to place in this scrubber.
  * `select` Function - Called when the user taps an item that was not the last tapped item. 
    * `selectedIndex` Integer - The index of the item the user selected.
  * `highlight` Function - Called when the user taps any item. 
    * `highlightedIndex` Integer - The index of the item the user touched.
  * `selectedStyle` String - 選択したアイテムのスタイル。省略値は `null`。
  * `overlayStyle` String - 選択して重なったアイテムのスタイル。省略値は `null`。
  * `showArrowButtons` Boolean - 省略値は `false`。
  * `mode` String - 省略値は `free`。
  * `continuous` Boolean - 省略値は `true`。

### インスタンスプロパティ

`TouchBarScrubber` のインスタンスには以下のプロパティがあります。

#### `touchBarScrubber.items`

このスクラバー内のアイテムを表す `ScrubberItem[]` 配列。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarScrubber.selectedStyle`

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.overlayStyle`

スクラバー内の選択したアイテムのスタイルを表す `String`。 このスタイルは、その後ろに置かれるのではなく、スクラバーアイテムの上に重ねられます。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 取りうる値:

* `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
* `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
* `null` - Actually null, not a string, removes all styles.

#### `touchBarScrubber.showArrowButtons`

このスクラバーに左 / 右の選択矢印を表示するかどうかを表す `Boolean`。この値を更新すると、すぐにタッチバーのコントロールが更新されます。

#### `touchBarScrubber.mode`

このスクラバのモードを表す `String`。この値を更新すると、すぐにタッチバーのコントロールが更新されます。以下は取りうる値です。

* `fixed` - Maps to `NSScrubberModeFixed`.
* `free` - Maps to `NSScrubberModeFree`.

#### `touchBarScrubber.continuous`

このスクラバーが連続的であるかどうかを表す `Boolean`。この値を更新すると、すぐにタッチバーのコントロールが更新されます。