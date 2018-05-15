## クラス: TouchBarColorPicker

> ネイティブ macOS アプリケーション用のタッチバー内にカラーピッカーを作成する

プロセス: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *実験的*

* `options` オブジェクト 
  * `availableColors` String[] (任意) - 選択可能な色として表示される、16進数の色の文字列の配列。
  * `selectedColor` String (任意) - 16進数形式、即ち `#ABCDEF` の選択された色。
  * `change` Function (任意) - 色が選択されたときに呼ぶ関数。 
    * `color` String - ユーザがピッカーから選択した色.

### インスタンスプロパティ

`TouchBarColorPicker` のインスタンスには以下のプロパティがあります。

#### `touchBarColorPicker.availableColors`

選択するカラーピッカーの使用可能な色を表す`String[]` 配列。この値を変更すると、すぐにタッチバーのカラーピッカーが更新されます。

#### `touchBarColorPicker.selectedColor`

カラーピッカーの現在選択された色を表す16進数コードの `String`。この値を変更すると、すぐにタッチバーのカラーピッカーが更新されます。