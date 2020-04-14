# 任务栏的进度条 (Windows, macOS, Unity)

在 Windows 中的任务栏按钮可以被用于显示一个进度条。 这可以让一个窗口提供进度信息给用户，而不必切自行切换到这个窗口。

在 macOS，进度条将显示为 dock 图标的一部分。

Unity DE 也具有同样的特性，在运行器上显示进度条。

__任务栏按钮中的进度栏:__

![任务栏进度栏](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

三个系统中都是用相同的API - `setProgressBar()` 方法是 `BrowserWindows` 的方法。 是用 `0` 到 `1` 之间的数字来表示你的进度。 你正在运行一个长时间的任务, 当前进度为63%, 您可以使用 `setProgressBar(0.63)` 来调用它。

一般来说，将参数设置为 0 以下的值（例如 `-1`）将会去掉进度条，而设置为 1 以上（例如 `2`）将会切换这个进度条为不确定的进度。

参见 [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress)。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
