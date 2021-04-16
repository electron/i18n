## 类: TouchBarLabel

> 在原生macOS应用程序的触摸栏中创建一个标签

进程：[主进程](../glossary.md#main-process)

### `new TouchBarLabel(options)`

* `选项` 对象
  * `label` String (可选) - 显示的文本.
  * `accessibilityLabel` 字符串（可选） - 按钮的简短描述，供屏幕阅读器（如画外音）使用。
  * `textColor` String（可选） - 文本的十六进制颜色，例如#ABCDEF。

在定义 `accessibilityLabel`时，请确保您</a>考虑了 macOS

最佳实践。</p> 



### 实例属性

以下属性可用于 `TouchBarLabel`:



#### `touchBarLabel.label`

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.



#### `touchBarLabel.accessibilityLabel`

A `String` representing the description of the label to be read by a screen reader.



#### `touchBarLabel.textColor`

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.
