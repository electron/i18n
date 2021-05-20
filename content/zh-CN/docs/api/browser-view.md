# BrowserView

`BrowserView` 被用来让 [`BrowserWindow`](browser-window.md) 嵌入更多的 web 内容。 它就像一个子窗口，除了它的位置是相对于父窗口。 这意味着可以替代`webview`标签.

## 类: BrowserView

> 创建和控制视图

进程：[主进程](../glossary.md#main-process)

### 示例

```javascript
// 在主进程中.
const { BrowserView, BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

const view = new BrowserView()
win.setBrowserView(view)
view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://electronjs.org')
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
  * `width` Boolean（可选） - 如果 `true`，视图的宽度将随着窗户 一起增长和缩小。 默认值为 `false`
  * `height` 布尔（可选） - 如果 `true`，视图的高度将增长和缩小 与窗口。 默认值为 `false`
  * `horizontal` Boolean（可选） - 如果 `true`，视图的x位置和宽度将增长 和收缩与窗口的比例。 默认值为 `false`
  * `vertical` 布尔（可选） - 如果 `true`，视图的y位置和高度将增长 和收缩比例与窗口。 默认值为 `false`

#### `view.setBounds(bounds)` _实验功能_

* `bounds` [Rectangle](structures/rectangle.md)

调整视图的大小，并将它移动到窗口边界

#### `view.getBounds()` _实验功能_

返回 [`Rectangle`](structures/rectangle.md)

此浏览器视图实例的 `bounds` 为 `Object`。

#### `view.setBackgroundColor(color)` _实验功能_

* `color` 字符串 - 颜色为 `#aarrggbb` 或 `#argb` 形式。 阿尔法通道 可选的。
