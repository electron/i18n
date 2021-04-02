# 任务栏的进度条 (Windows, macOS, Unity)

## 概览

进度栏使窗口能够向用户提供进度信息 无需切换到窗口本身。

在 Windows 上，您可以使用任务栏按钮来显示进度栏。

![视窗进度栏][1]

在 macOS 上，进度栏将作为基座图标的一部分显示。

![马科斯进度栏][2]

在 Linux 上，Unity 图形界面还具有类似的功能，允许 您指定发射器中的进度栏。

![Linux 进度栏][3]

> 注意：在 Windows 上，每个窗口都可以有自己的进度栏，而在 macOS 和 Linux （Unity） 上，应用程序只能有一个进度栏。

----

所有三个个案均由同一个API涵盖，即 `BrowserWindow`实例中可用的 [`setProgressBar()`][setprogressbar] 方法。 要指示您的进度，请在 `0` 和 `1`之间使用编号 。 例如，如果你有一个长期运行的任务， 目前63%接近完成，你会称之为 `setProgressBar(0.63)`。

将参数设置为负值（例如 `-1`）将删除 条的进度，而将其设置为大于 `1` 的值（例如 `2`）将 进度栏切换到不确定模式（仅限 Windows - 它将夹紧到 100% 否则）。 在此模式下，进度栏保持活动状态，但未显示实际百分比 。 当您不知道操作需要多长时间 时，请使用此模式。

参见 [API documentation for more options and modes][setprogressbar]。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

启动 Electron 应用程序后，您应该会看到 基座 （macOS） 或任务栏（Windows、Unity）中的栏，指示您刚刚定义的进度 百分比。

![马科斯码头进度栏](../images/dock-progress-bar.png)

对于 macOS，在使用 [任务控制](https://support.apple.com/en-us/HT204100)时， 也会为您的应用程序指示进度栏：

![任务控制进度栏](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
