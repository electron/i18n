## Class: TouchBarColorPicker

> 讓 macOS 原生應用程式在 Touch Bar 中建立色彩選擇器。

處理序: [主處理序](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *試驗中*

* `options` Object 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected. 
    * `color` String - The color that the user selected from the picker.

### 物件屬性

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.