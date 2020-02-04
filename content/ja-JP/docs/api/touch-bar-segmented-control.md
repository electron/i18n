## クラス: TouchBarSegmentedControl

> 1つのボタンが選択状態になっているセグメントコントロール (ボタングループ) を作成します

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` *実験的*

* `options` Object 
  * `segmentStyle` String (任意) - セグメントのスタイル。 
    * `automatic` - デフォルト。 セグメントコントロールの見た目は、コントロールを表示しているウインドウタイプとウインドウ内の位置に基づいて自動決定されます。 `NSSegmentStyleAutomatic` に対応します。
    * `rounded` - コントロールを丸角スタイルで表示します。`NSSegmentStyleRounded` に対応します。
    * `textured-rounded` - コントロールをテクスチャ付きの丸角スタイルで表示します。`NSSegmentStyleTexturedRounded` に対応します。
    * `round-rect` - コントロールを丸矩形スタイルで表示します。`NSSegmentStyleRoundRect` に対応します。
    * `textured-square` - コントロールをテクスチャ付きの正方形スタイルで表示します。`NSSegmentStyleTexturedSquare` に対応します。
    * `capsule` - コントロールをカプセルスタイルで表示します。`NSSegmentStyleCapsule` に対応します。
    * `small-square` - コントロールを小さい正方形スタイルで表示します。`NSSegmentStyleSmallSquare` に対応します。
    * `separated` - コントロール内のセグメントを互いに接触しない程度に近づけて表示します。`NSSegmentStyleSeparated` に対応します。
  * `mode` String (任意) - コントロールの選択モード。 
    * `single` - デフォルト。一度に 1 つのアイテムを選択でき、何かを選択すると、前に選択したアイテムの選択が解除されます。`NSSegmentSwitchTrackingSelectOne` に対応します。
    * `multiple` - 一度に複数のアイテムを選択できます。`NSSegmentSwitchTrackingSelectAny` に対応します。
    * `buttons` - セグメントをボタンとして動作させ、各セグメントを押して離すことができますが、アクティブになることはありません。`NSSegmentSwitchTrackingMomentary` に対応します。
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - このコントロールに配置するセグメントの配列。
  * `selectedIndex` Integer (任意) - ユーザの操作によって自動的に更新される、現在選択されているセグメントのインデックス。 `multiple` モードでは、これは最後に選択したアイテムになります。
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