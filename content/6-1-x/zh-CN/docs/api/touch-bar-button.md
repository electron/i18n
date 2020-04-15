## 类: TouchBarButton

> 为mac os应用在touch bar中创建一个按钮组件

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new BrowserView(可选)` _实验功能_

* `options` Object
  * ` label `String (可选) 按钮文本。
  * ` backgroundColor `String (可选) - 按钮背景颜色以十六进制格式，例如 ` #ABCDEF `。
  * `icon` [NativeImage](native-image.md) (可选)
  * ` iconPosition `String (可选) - 可以是 ` left `、` right` 或 ` overlay `。
  * ` click `function (可选) - 单击按钮时调用的函数。

### 实例属性

下面的这些是`TouchBarButton`中的属性：

#### `touchBarButton.label`

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.backgroundColor`

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### `touchBarButton.icon`

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.
