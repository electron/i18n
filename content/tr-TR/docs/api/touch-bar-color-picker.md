## Class: TouchBarColorPicker

> Create a color picker in the touch bar for native macOS applications

Süreç: [Ana](../tutorial/quick-start.md#main-process)

### `new TouchBarColorPicker(options)` *Experimental*

* `ayarlar` Nesne 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected. 
    * `color` String - The color that the user selected from the picker

### Örnek özellikleri

The following properties are available on instances of `TouchBarColorPicker`:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

Renk seçicinin seçili rengini temsil eden `String` hex kod. Bu değeri değiştirmek dokunma çubuğundaki renk seçiciyi derhal günceller.