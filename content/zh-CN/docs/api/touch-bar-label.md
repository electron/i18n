## 类: TouchBarLabel

> 在原生macOS应用程序的触摸栏中创建一个标签

线程：[主线程](../tutorial/quick-start.md#main-process)

### `new TouchBarLabel(options)` *实验功能*

* `options` Object 
  * `label` String (可选) - 显示的文本.
  * `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### 实例属性

The following properties are available on instances of `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.