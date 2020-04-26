## クラス: TouchBarColorPicker

> ネイティブ macOS アプリケーション用のタッチバー内にカラーピッカーを作成する

プロセス: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarColorPicker(options)` _実験的_

* `options` Object
  * `availableColors` String[] (任意) - 選択可能な色として表示される、16進数の色の文字列の配列。
  * `selectedColor` String (任意) - 16進数形式、即ち `#ABCDEF` の選択された色。
  * `change` Function (任意) - 色が選択されたときに呼ばれる関数。
    * `color` String - ユーザがピッカーから選択した色.

### インスタンスプロパティ

`TouchBarColorPicker` のインスタンスには以下のプロパティがあります。

#### `touchBarColorPicker.availableColors`

カラーピッカーで選択できる色を表す `String[]` 配列。 この値を変更すると、タッチバー内のカラーピッカーがすぐに更新されます。

#### `touchBarColorPicker.selectedColor`

カラーピッカーで選択した色を表す 16 進数の `String`。 この値を変更すると、タッチバー内のカラーピッカーがすぐに更新されます。
