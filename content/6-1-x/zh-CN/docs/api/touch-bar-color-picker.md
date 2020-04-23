## 类: TouchBarColorPicker

> 在macOS 应用程序中，为触控栏创建拾色器

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### ` new TouchBarColorPicker(可选)` _实验功能_

* `options` Object
  * `availableColors` String[] (可选) - 由可选的十六进位色值组成的字符串数组.
  * ` backgroundColor `String (可选) - 拾色器选中的颜色十六进位色值，例如 ` #ABCDEF `。
  * `change` Function (optional) - Function to call when a color is selected.
    * `color` String - 用户从拾色器中选取的颜色.

### 实例属性

以下为` TouchBarColorPicker ` 实例的可用属性:

#### `touchBarColorPicker.availableColors`

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### `touchBarColorPicker.selectedColor`

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.
