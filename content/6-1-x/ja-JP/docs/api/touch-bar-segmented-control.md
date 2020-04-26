## クラス: TouchBarSegmentedControl

> 1つのボタンが選択状態になっているセグメントコントロール (ボタングループ) を作成します

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSegmentedControl(options)` _実験的_

* `options` Object
  * `segmentStyle` String (任意) - 以下のセグメントのスタイルのいずれかです。
    * `automatic` - デフォルト。 セグメントコントロールの見た目は、コントロールを表示しているウインドウタイプとウインドウ内の位置に基づいて自動決定されます。
    * `rounded` - コントロールは丸みのあるスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸みのあるスタイルで表示されます。
    * `round-rect` - コントロールは丸角のスタイルで表示されます。
    * `textured-rounded` - コントロールは、テクスチャ付きの丸角のスタイルで表示されます。
    * `capsule` - コントロールはカプセル状のスタイルで表示されます。
    * `small-square` - コントロールは小さな正方形のスタイルで表示されます。
    * `separated` - コントロール内のセグメントは、互いに非常に近く表示されますが、接触しません。
  * `mode` String (任意) - コントロールの選択モード。
    * `single` - 既定値。 一度に 1 つアイテムを選択し、どれかを選択すると、前に選択したアイテムの選択が解除されます。
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

コントロールの現在のセグメントスタイルを表す `String`。 この値を更新すると、タッチバー内のコントロールがすぐに更新されます。

#### `touchBarSegmentedControl.segments`

このコントロールのセグメントを表す `SegmentedControlSegment[]` 配列。 この値を更新すると、タッチバーのコントロールがすぐに更新されます。 この配列の要素の中のプロパティを更新しても **タッチバーは更新されません**。

#### `touchBarSegmentedControl.selectedIndex`

現在選択されているセグメントを表す `Integer`。 この値を変更すると、タッチバーのコントロールがすぐに更新されます。 ユーザがタッチバーに接触すると、この値が自動的に更新されます。
