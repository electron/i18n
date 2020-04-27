## クラス: TouchBarScrubber

> スクラバー (スクロールできるセレクタ) を作成します。

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarScrubber(options)` _実験的_

* `options` Object
  * `items` [ScrubberItem[]](structures/scrubber-item.md) - このスクラバーに配置するアイテムの配列.
  * `select` Function (任意) - ユーザーがタップしたアイテムが、最後にタップしたアイテムではないと呼ばれます。
    * `selectedIndex` Integer - ユーザが選択したアイテムのインデックス.
  * `highlight` Function (任意) - ユーザが任意のアイテムをタップしたときに呼ばれます。
    * `highlightedIndex` Integer - ユーザがタッチしたアイテムのインデックス.
  * `selectedStyle` String (任意) - 選択したアイテムのスタイル。 `background`、`outline`、`none` のいずれかにできます。 省略値は `none` です。
  * `overlayStyle` String (任意) - 選択したオーバーレイアイテムのスタイル。 `background`、`outline`、`none` のいずれかにできます。 省略値は `none` です。
  * `showArrowButtons` Boolean (任意) - 省略値は、`false` になります。
  * `mode` String (任意) - `fixed` か `free` にできます。 省略値は `free` です。
  * `continuous` Boolean (任意) - 省略値は、`true` になります。

### インスタンスプロパティ

`TouchBarScrubber` のインスタンスには以下のプロパティがあります。

#### `touchBarScrubber.items`

このスクラバー内のアイテムを表す `ScrubberItem[]` 配列。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarScrubber.selectedStyle`

スクラバー内の選択したアイテムのスタイルを表す `String`。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 取りうる値:

* `background` - `[NSScrubberSelectionStyle roundedBackgroundStyle]` に割り当て.
* `outline` - `[NSScrubberSelectionStyle outlineOverlayStyle]` に割り当て.
* `none` - スタイルを全て除去します。

#### `touchBarScrubber.overlayStyle`

スクラバー内の選択したアイテムのスタイルを表す `String`。 このスタイルは、その後ろに置かれるのではなく、スクラバーアイテムの上に重ねられます。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 以下は取りうる値です。

* `background` - `[NSScrubberSelectionStyle roundedBackgroundStyle]` に割り当て.
* `outline` - `[NSScrubberSelectionStyle outlineOverlayStyle]` に割り当て.
* `none` - スタイルを全て除去します。

#### `touchBarScrubber.showArrowButtons`

このスクラバーに左 / 右の選択矢印を表示するかどうかを表す `Boolean`。 この値を更新すると、タッチバー内のコントロールがすぐに更新されます。

#### `touchBarScrubber.mode`

このスクラバーのモードを表す `String`。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 取りうる値:

* `fixed` - `NSScrubberModeFixed` に割り当て.
* `free` - `NSScrubberModeFree` に割り当て.

#### `touchBarScrubber.continuous`

このスクラバーが連続しているかどうかを表す `Boolean`。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。
