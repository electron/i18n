## 类：TouchBarButton

> 为mac os应用在touch bar中创建一个按钮组件

进程：[主进程](../tutorial/quick-start.md#main-process)

### `new BrowserView(可选)` *实验功能*

* `参数` 对象 
  * ` label `String (可选) 按钮文本。
  * ` backgroundColor `String (可选) - 按钮背景颜色以十六进制格式，例如 ` #ABCDEF `。
  * `icon` [NativeImage](native-image.md) (可选)
  * ` iconPosition `String (可选) - 可以是 ` left `、` right` 或 ` overlay `。
  * ` click `function (可选) - 单击按钮时调用的函数。

### 实例属性

下面的这些是`TouchBarButton`中的属性：

#### `touchBarButton.label`

用一个`String`展示按钮里面当前文本。改变这个值会即时刷新。

#### `touchBarButton.backgroundColor`

用一个16进制`String`定义按钮的背景色。改变这个值会即时刷新。

#### `touchBarButton.icon`

用一个`NativeImage`定义按钮上的图标。改变这个值会即时刷新。