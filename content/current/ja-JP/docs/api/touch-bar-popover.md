## クラス: TouchBarPopover

> ネイティブ macOS アプリケーション用のタッチバー内にポップオーバーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarPopover(options)` _Experimental_

* `options` Object
  * `label` String (任意) - ポップオーバーするボタンのテキスト。
  * `icon` [NativeImage](native-image.md) (任意) - ポップオーバーするボタンのアイコン。
  * `items` [TouchBar](touch-bar.md) - ポップオーバー内に表示するアイテム。
  * `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. 省略値は `true` です。

### インスタンスプロパティ

`TouchBarPopover` のインスタンスには以下のプロパティがあります。

#### `touchBarPopover.label`

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### `touchBarPopover.icon`

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.
