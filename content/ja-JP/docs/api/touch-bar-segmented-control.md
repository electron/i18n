## クラス: TouchBarSegmentedControl

> 1つのボタンが選択状態になっているセグメントコントロール (ボタングループ) を作成します

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *実験的*

* `options` Object 
  * `segmentStyle` String - (任意) セグメントのスタイル。 
    * `automatic` - デフォルト。セグメント化されたコントロールの見た目は、コントロールが表示されているウインドウのタイプとウインドウ内の位置に基づいて自動的に決定されます。
    * `rounded` - コントロールは丸みのあるスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸みのあるスタイルで表示されます。
    * `round-rect` - コントロールは丸角のスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸角のスタイルで表示されます。
    * `capsule` - コントロールはカプセル状のスタイルで表示されます。
    * `small-square` - コントロールは小さな正方形のスタイルで表示されます。
    * `separated` - コントロール内のセグメントは、互いに非常に近く表示されますが、接触しません。
  * `mode` String - (任意) コントロールの選択モード。 
    * `single` - デフォルト。一度に1つのアイテムを選択し、1つを選択すると、前に選択したアイテムの選択が解除されます。
    * `multiple` - 一度に複数のアイテムを選択できます。
    * `buttons` - セグメントをボタンとして動作させ、各セグメントを押して離すことができますが、アクティブとしてマークされることはありません。
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - An array of segments to place in this control.
  * `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
  * `change` Function - Called when the user selects a new segment 
    * `selectedIndex` Integer - The index of the segment the user selected.
    * `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### インスタンスプロパティ

The following properties are available on instances of `TouchBarSegmentedControl`:

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

A `SegmentedControlSegment[]` array representing the segments in this control. この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarSegmentedControl.selectedIndex`

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.