## Клас: TouchBarColorPicker

> Створює палітру кольорів на Touch Bar для нативних macOS додатків

Процес: [Main](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Експериментальний*

* `options` Об'єкт 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected. 
    * `color` String - The color that the user selected from the picker.

### Властивості Екземпляра

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.