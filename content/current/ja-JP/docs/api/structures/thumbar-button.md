# ThumbarButton オブジェクト

* `icon` [NativeImage](../native-image.md) - サムネイルツールバーで表示されるアイコン。
* `click` Function
* `tooltip` String (任意) - ボタンのツールチップのテキスト。
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` は、以下の `String` を含めることができる配列です。

* `enabled` - そのボタンはアクティブかつユーザが使用可能です。
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - そのボタンをクリックすると、サムネイルウインドウがすぐに閉じます。
* `nobackground` - そのボタンの縁を描画しません。画像にのみ使用してください。
* `hidden` - そのボタンはユーザに表示されません。
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
