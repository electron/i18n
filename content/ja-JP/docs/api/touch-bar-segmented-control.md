## クラス: TouchBarSegmentedControl

> 1つのボタンが選択状態になっているセグメントコントロール (ボタングループ) を作成します

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` *実験的*

* `options` Object 
  * `segmentStyle` String (任意) - セグメントのスタイル。 
    * `automatic` - デフォルト。 セグメントコントロールの見た目は、コントロールを表示しているウインドウタイプとウインドウ内の位置に基づいて自動決定されます。 `NSSegmentStyleAutomatic` に対応します。
    * `rounded` - コントロールを丸角スタイルで表示します。`NSSegmentStyleRounded` に対応します。
    * `textured-rounded` - コントロールをテクスチャ付きの丸角スタイルで表示します。`NSSegmentStyleTexturedRounded` に対応します。
    * `round-rect` - The control is displayed using the round rect style. Maps to `NSSegmentStyleRoundRect`.
    * `textured-square` - The control is displayed using the textured square style. Maps to `NSSegmentStyleTexturedSquare`.
    * `capsule` - The control is displayed using the capsule style. Maps to `NSSegmentStyleCapsule`.
    * `small-square` - The control is displayed using the small square style. Maps to `NSSegmentStyleSmallSquare`.
    * `separated` - The segments in the control are displayed very close to each other but not touching. Maps to `NSSegmentStyleSeparated`.
  * `mode` String (任意) - コントロールの選択モード。 
    * `single` - Default. One item selected at a time, selecting one deselects the previously selected item. Maps to `NSSegmentSwitchTrackingSelectOne`.
    * `multiple` - Multiple items can be selected at a time. Maps to `NSSegmentSwitchTrackingSelectAny`.
    * `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active. Maps to `NSSegmentSwitchTrackingMomentary`.
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - このコントロールに配置するセグメントの配列。
  * `selectedIndex` Integer (任意) - ユーザの操作によって自動的に更新される、現在選択されているセグメントのインデックス。 When the mode is `multiple` it will be the last selected item.
  * `change` Function (任意) - ユーザが新しいセグメントを選択したときに呼ばれます。 
    * `selectedIndex` Integer - ユーザが選択したセグメントのインデックス。
    * `isSelected` Boolean - ユーザの選択結果として、セグメントが選択されたかどうか。

### インスタンスプロパティ

`TouchBarSegmentedControl` のインスタンスには以下のプロパティがあります。

#### `touchBarSegmentedControl.segmentStyle`

コントロールの現在のセグメントのスタイルを表す `String`。この値を変更すると、タッチバーのコントロールがすぐに更新されます。

#### `touchBarSegmentedControl.segments`

このコントロールのセグメントを表す `SegmentedControlSegment[]` 配列。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarSegmentedControl.selectedIndex`

現在選択されているセグメントを表す `Integer`。 この値を変更すると、タッチバーのコントロールがすぐに更新されます。 ユーザがタッチバーに接触すると、この値が自動的に更新されます。