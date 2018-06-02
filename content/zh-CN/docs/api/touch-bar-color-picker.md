## Class: TouchBarColorPicker

> 在macOS 应用程序中，为触控栏创建拾色器

进程：[主进程](../tutorial/quick-start.md#main-process)

### ` new TouchBarColorPicker(可选)` *实验功能*

* `options` Object 
  * `availableColors` String[] (可选) - 由可选的十六进位色值组成的字符串数组.
  * ` backgroundColor `String (可选) - 拾色器选中的颜色十六进位色值，例如 ` #ABCDEF `。
  * `change` Function (可选) - 当选中某一个颜色时触发这个函数. 
    * `color` String - 用户从拾色器中选取的颜色.

### 实例属性

以下为` TouchBarColorPicker ` 实例的可用属性:

#### `touchBarColorPicker.availableColors`

`String[]`类型，指可以在拾色器中选择的颜色。改变这个数组的值会即时更新触摸条中的拾色器。

#### `touchBarColorPicker.selectedColor`

`String`类型，指拾色器当前选中的十六进位颜色色值。改变这个值会即时更新触摸条中的拾色器。