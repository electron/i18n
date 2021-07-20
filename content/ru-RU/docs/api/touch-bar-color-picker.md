## Class: TouchBarColorPicker

> Create a color picker in the touch bar for native macOS applications

Процесс: [Основной](../glossary.md#main-process)

### `new TouchBarColorPicker(options)`

* `options` Object
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected.
    * `color` String - The color that the user selected from the picker.

### Свойства экземпляра

Для экземпляров `TouchBarColorPicker` доступны следующие свойства:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
