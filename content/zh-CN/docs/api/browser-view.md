## 类: BrowserView

> 创建和控制视图

进程：[主进程](../glossary.md#main-process)

`BrowserView` 被用来让 [`BrowserWindow`](browser-window.md) 嵌入更多的 web 内容。 它就像一个子窗口，除了它的位置是相对于父窗口。 这意味着可以替代`webview`标签.

### 示例

```javascript
// 在主进程中.
康斯特 { BrowserView, BrowserWindow } =要求（'电子'）

const赢=新的浏览器窗口（{ width: 800, height: 600 }）

const视图=新的浏览器视图（）
赢
。 y： 0， 宽度： 300， 高度： 300 [）
视图. web 康滕茨. loadurl （'https：/ / 电子. org'）
```

### `new BrowserView([可选])` _实验功能_

* `options` Object (可选)
  * `webPreferences` Object (可选) - 详情请看 [BrowserWindow](browser-window.md).

### 实例属性

使用 `new BrowserView` 创建的对象具有以下属性:

#### `view.webContents` _实验功能_

视图的[`WebContents`](web-contents.md) 对象

### 实例方法

使用 `new BrowserView`创建的对象具有以下实例方法:

#### `view.setAutoResize(options)` _实验功能_

* `选项` 对象
  * `width` 布尔（可选） - 如果 `true`，视图的宽度将随着窗户 一起增长和缩小。 默认值为 `false`
  * `height` 布尔（可选） - 如果 `true`，视图的高度将增长和缩小 与窗口。 默认值为 `false`
  * `horizontal` 布尔（可选） - 如果 `true`，视图的x位置和宽度将增长 和收缩与窗口的比例。 默认值为 `false`
  * `vertical` 布尔（可选） - 如果 `true`，视图的y位置和高度将增长 和收缩比例与窗口。 默认值为 `false`

#### `view.setBounds(bounds)` _实验功能_

* `bounds` [Rectangle](structures/rectangle.md)

调整视图的大小，并将它移动到窗口边界

#### `view.getBounds()` _实验功能_

返回 [`Rectangle`](structures/rectangle.md)

此浏览器视图实例的 `bounds` 为 `Object`。

#### `view.setBackgroundColor(color)` _实验功能_

* `color` 字符串 - 颜色为 `#aarrggbb` 或 `#argb` 形式。 阿尔法通道 可选的。
