## 类: TouchBarLabel

> 在原生macOS应用程序的触摸栏中创建一个标签

线程：[主线程](../tutorial/quick-start.md#main-process)

### `new TouchBarLabel(options)` *实验功能*

* `options` Object 
  * `label` String (可选) - 显示的文本.
  * `textColor` String（可选） - 文本的十六进制颜色，例如#ABCDEF。

### 实例属性

以下属性可用于 `TouchBarLabel`:

#### `touchBarLabel.label`

表示标签当前文本的字符串。 更改此值会立即更新触摸栏中的标签。

#### `touchBarLabel.textColor`

代表标签当前文字颜色的 字符串</ 0> 十六进制代码。 更改此值立即更新
标签在触摸栏中。</p>