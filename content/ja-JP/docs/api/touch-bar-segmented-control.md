## クラス: TouchBarSegmentedControl

> 1つのボタンが選択状態になっているセグメントコントロール (ボタングループ) を作成します

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarSegmentedControl(options)` *実験的*

* `options` Object 
  * `segmentStyle` String (optional) - Style of the segments: 
    * `automatic` - デフォルト。セグメント化されたコントロールの見た目は、コントロールが表示されているウインドウのタイプとウインドウ内の位置に基づいて自動的に決定されます。
    * `rounded` - コントロールは丸みのあるスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸みのあるスタイルで表示されます。
    * `round-rect` - コントロールは丸角のスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸角のスタイルで表示されます。
    * `capsule` - The control is displayed using the capsule style.
    * `small-square` - コントロールは小さな正方形のスタイルで表示されます。
    * `separated` - コントロール内のセグメントは、互いに非常に近く表示されますが、接触しません。
  * `mode` String (optional) - The selection mode of the control: 
    * `single` - デフォルト。一度に1つのアイテムを選択し、1つを選択すると、前に選択したアイテムの選択が解除されます。
    * `multiple` - 一度に複数のアイテムを選択できます。
    * `buttons` - セグメントをボタンとして動作させ、各セグメントを押して離すことができますが、アクティブとしてマークされることはありません。
  * `segments` [SegmentedControlSegment[]](structures/segmented-control-segment.md) - このコントロールに配置するセグメントの配列。
  * `selectedIndex` Integer (任意) - ユーザの操作によって自動的に更新される、現在選択されているセグメントのインデックス。 multiple モードでは、最後に選択したアイテムになります。
  * `change` Function - Called when the user selects a new segment. 
    * `selectedIndex` Integer - ユーザが選択したセグメントのインデックス。
    * `isSelected` Boolean - ユーザの選択結果として、セグメントが選択されたかどうか。

### インスタンスプロパティ

`TouchBarSegmentedControl` のインスタンスには以下のプロパティがあります。

#### `touchBarSegmentedControl.segmentStyle`

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### `touchBarSegmentedControl.segments`

このコントロールのセグメントを表す `SegmentedControlSegment[]` 配列。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarSegmentedControl.selectedIndex`

現在選択されているセグメントを表す `Integer`。 この値を変更すると、タッチバーのコントロールがすぐに更新されます。 ユーザがタッチバーに接触すると、この値が自動的に更新されます。