# 任务栏的进度条 (Windows, macOS, Unity)

## 概览

进度条使窗口能够向用户提供其进度信息，而无需被切换到前台。

在Windows环境下，进度条被显示在任务栏按钮上。

![Windows 进度条][1]

在MacOS环境下，进度条将被显示在dock栏图标上

![macOS 进度条][2]

在Linux系统中，Unity桌面也有相似的特性，能在Launcher上显示进度条。

![Linux 进度条][3]

> 注意：在 Windows 上，每个窗口都可以有自己的进度条，而在 macOS 和 Linux（unity桌面）上，同一个应用程序只能有一个进度条。

----

这三种环境中的进度条功能由同一个API实现：`BrowserWindow`实例下的[`setProgressBar()`][setprogressbar]方法。 此方法以介于 `0` 和 `1` 之间的小数表示进度。 例如，如果有一个耗时很长的任务，它当前的进度是63%，那么你可以用`setProgressBar(0.63)`来显示这一进度。

将参数设置为负值（如`-1`）来移除进度条。而将参数设定为`1`以上的值（如`2`）将会使进度条处于“不确定”状态（仅适用于Windows，其他平台会直接显示为100%） 在此模式下，进度条保持活动，但并不显示实际百分比。 当不知道一项操作的具体进度时，这一模式将是较为实用的。

参见 [API documentation for more options and modes][setprogressbar]。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

启动 Electron 应用程序后，您应该在 dock (macOS) 或任务栏 (Windows, Unity) 中看到此栏，它显示刚刚定义的进度百分比。

![macOS dock 进度条](../images/dock-progress-bar.png)

对于macOS，当使用 [Mission Control](https://support.apple.com/en-us/HT204100) 时，应用程序也会显示进度条

![macOS Mission Control 进度条](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
