# 任务栏的进度条 (Windows, macOS, Unity)

在 Windows中的任务栏按钮可以被用于显示一个进度条。 This enables a window to provide progress information to the user without the user having to switch to the window itself.

在 macOS，进度条将显示为 dock 图标的一部分。

Unity DE 也具有同样的特性，在运行器上显示进度条。

**任务栏按钮中的进度栏:**

![任务栏进度栏](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

三个系统中都是用相同的API - `setProgressBar()` 方法是`BrowserWindows`的方法。 是用`0`到`1`之间的数字来表示你的进度 你正在运行一个长时间的任务, 当前进度为63%, 您可以使用 `setProgressBar(0.63)` 来调用它。

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```