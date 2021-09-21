## クラス: TouchBarPopover

> ネイティブ macOS アプリケーション用のタッチバー内にポップオーバーを作成する

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### `new TouchBarPopover(options)`

* `options` Object
  * `label` String (任意) - ポップオーバーするボタンのテキスト。
  * `icon` [NativeImage](native-image.md) (任意) - ポップオーバーするボタンのアイコン。
  * `items` [TouchBar](touch-bar.md) - ポップオーバー内に表示するアイテム。
  * `showCloseButton` Boolean (任意) - `true` にするとポップオーバーの左に閉じるボタンを表示し、`false` にすると表示しません。 省略値は `true` です。

### インスタンスプロパティ

`TouchBarPopover` のインスタンスには以下のプロパティがあります。

#### `touchBarPopover.label`

ポップオーバーの現在のボタンのテキストを表す `String`。 この値を変更すると、タッチバー内のポップオーバーのコントロールがすぐに更新されます。

#### `touchBarPopover.icon`

ポップオーバーの現在のボタンのアイコンを表す `NativeImage`。 この値を変更すると、タッチバー内のポップオーバーのコントロールがすぐに更新されます。
