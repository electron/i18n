## 类: TouchBarLabel

> 在原生macOS应用程序的触摸栏中创建一个标签

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarLabel(options)` _实验功能_

* `options` Object
  * `label` String (可选) - 显示的文本.
  * `textColor` String（可选） - 文本的十六进制颜色，例如#ABCDEF。

### 实例属性

以下属性可用于 `TouchBarLabel`:

#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
