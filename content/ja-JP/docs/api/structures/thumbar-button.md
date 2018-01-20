# ThumbarButton オブジェクト

* `icon` [NativeImage](../native-image.md) - ツールバーサムネイルで表示されるアイコン。 
* `click` Function
* `tooltip` String (optional) - ボタンのツールチップのテキスト。
* `flags` String[] (optional) - 特定の状態や行動を制御する ボタン。デフォルトでは、 `['enabled']`。

`flags` は、 `String` を含むことができる配列です。

* `enabled` - ボタンはアクティブで、ユーザーが使用できます。
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.