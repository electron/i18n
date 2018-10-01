## クラス: TouchBarPopover

> ネイティブ macOS アプリケーション用のタッチバー内にポップオーバーを作成する

Process: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarPopover(options)` *実験的*

* `options` Object 
  * `label` String (任意) - ポップオーバーするボタンのテキスト。
  * `icon` [NativeImage](native-image.md) (任意) - ポップオーバーするボタンのアイコン。
  * `items` [TouchBar](touch-bar.md) (任意) - ポップオーバー内に表示するアイテム。
  * `showCloseButton` Boolean (任意) - `true` にするとポップオーバーの左に閉じるボタンを表示し、`false` にすると表示しません。省略値は `true` です。

### インスタンスプロパティ

`TouchBarPopover` のインスタンスには以下のプロパティがあります。

#### `touchBarPopover.label`

ポップオーバーの現在のボタンのテキストを表す `String`。この値を変更すると、タッチバーのポップオーバーがすぐに更新されます。

#### `touchBarPopover.icon`

ポップオーバーの現在のボタンのアイコンを表す `NativeImage`。この値を変更すると、タッチバーのポップオーバーがすぐに更新されます。