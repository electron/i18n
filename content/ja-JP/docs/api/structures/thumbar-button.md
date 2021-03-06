# ThumbarButton Object

* `icon` [NativeImage](../native-image.md) - The icon showing in thumbnail toolbar.
* `click` Function
* `tooltip` String (任意) - ボタンのツールチップのテキスト。
* `flags` String[] (任意) - ボタンの特定の状態や動作を制御します。 省略値は、`['enabled']` です。

`flags` は、以下の `String` を含めることができる配列です。

* `enabled` - ボタンはアクティブで、ユーザーが使用できます。
* `disabled` - そのボタンは無効化されます。 存在しますが、ユーザ操作に応答しないことを示す視覚的な状態です。
* `dismissonclick` - そのボタンをクリックすると、サムネイルウインドウがすぐに閉じます。
* `nobackground` - そのボタンの縁を描画しません。画像にのみ使用してください。
* `hidden` - そのボタンはユーザに表示されません。
* `noninteractive` - そのボタンは有効ですが、反応せず、押されたボタンの状態も描画されません。 この値は、例えば通知内で使用するボタンに使用されます。
