## Class: TouchBarColorPicker

> 在macOS 应用程序中，为触控栏创建拾色器

线程：[主线程](../tutorial/quick-start.md#main-process)

### ` new TouchBarColorPicker(可选)` *实验功能*

* `options` Object 
  * `availableColors` String[] (optional) - Array of hex color strings to appear as possible colors to select.
  * `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
  * `change` Function (optional) - Function to call when a color is selected. 
    * `color` String - The color that the user selected from the picker.

### 实例属性

以下为` TouchBarColorPicker ` 实例的可用属性:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.