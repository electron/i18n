## 类: TouchBarButton

> 为mac os应用在touch bar中创建一个按钮组件

进程：[主进程](../glossary.md#main-process)

### `新的触摸按钮（选项）`

* `选项` 对象
  * ` label `String (可选) 按钮文本。
  * `accessibilityLabel` 字符串（可选） - 按钮的简短描述，供屏幕阅读器（如画外音）使用。
  * ` backgroundColor `String (可选) - 按钮背景颜色以十六进制格式，例如 ` #ABCDEF `。
  * `icon` [原生图像](native-image.md) |字符串（可选） - 按钮图标。
  * ` iconPosition `String (可选) - 可以是 ` left `、` right` 或 ` overlay `。 `overlay`的默认值。
  * ` click `function (可选) - 单击按钮时调用的函数。
  * `enabled` 布尔（可选） - 按钮是否处于启用状态。  默认值为 `true`。

在定义 `accessibilityLabel`时，请确保您</a>考虑了 macOS

最佳实践。</p> 



### 实例属性

下面的这些是`TouchBarButton`中的属性：



#### `触摸巴布顿.无障碍标签`

`String` 表示屏幕阅读器要阅读的按钮的描述。 只有在未设置标签的情况下，屏幕读取器才会阅读。



#### `touchBarButton.label`

表示按钮当前文本的 `String` 。 更改此值会立即更新触摸栏中 按钮。



#### `touchBarButton.backgroundColor`

`String` 六角形代码，表示按钮当前的背景颜色。 更改此值会立即更新 触摸栏中的按钮。



#### `touchBarButton.icon`

表示按钮当前图标的 `NativeImage` 。 更改此值会立即更新触摸栏中 按钮。



#### `触摸巴布顿.图标位置`

一个 `String` -可以 `left`， `right` 或 `overlay`。  `overlay`的默认值。



#### `触摸巴布顿启用`

`Boolean` 表示按钮是否处于启用状态。
