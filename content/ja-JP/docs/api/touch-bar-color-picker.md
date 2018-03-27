## クラス: TouchBarColorPicker

> ネイティブ macOS アプリケーション用のタッチバー内にカラーピッカーを作成する

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *実験的*

* `options` オブジェクト 
  * `availableColors` String[] (任意) - 選択可能な色として表示される、16進数の色の文字列の配列。
  * `selectedColor` String (任意) - 16進数形式、即ち `#ABCDEF` の選択された色。
  * `change` Function (任意) - 色が選択されたときに呼ぶ関数。 
    * `color` String - ユーザがピッカーから選択した色

### インスタンスプロパティ

`TouchBarColorPicker` のインスタンスには以下のプロパティがあります。

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.