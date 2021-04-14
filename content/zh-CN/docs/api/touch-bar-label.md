## 类: TouchBarLabel

> 在原生macOS应用程序的触摸栏中创建一个标签

进程：[主进程](../glossary.md#main-process)

### `新的触摸巴标签（选项）`

* `选项` 对象
  * `label` String (可选) - 显示的文本.
  * `accessibilityLabel` 字符串（可选） - 按钮的简短描述，供屏幕阅读器（如画外音）使用。
  * `textColor` String（可选） - 文本的十六进制颜色，例如#ABCDEF。

在定义 `accessibilityLabel`时，请确保您</a>考虑了 macOS

最佳实践。</p> 



### 实例属性

以下属性可用于 `TouchBarLabel`:



#### `touchBarLabel.label`

代表标签当前文本的 `String` 。 更改此值会立即在触摸栏 更新标签。



#### `触摸巴拉贝尔.无障碍标签`

`String` 表示屏幕阅读器要阅读的标签的描述。



#### `touchBarLabel.textColor`

`String` 六角形代码，表示标签当前的文本颜色。 更改此值会立即更新触摸栏中的 标签。
