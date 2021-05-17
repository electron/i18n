# 任务栏的进度条 (Windows, macOS, Unity)

## 概览

进度条使窗口能够向用户提供其进度信息，而无需被切换到前台。

在Windows环境下，进度条被显示在任务栏按钮上。

![Windows Progress Bar][1]

在MacOS环境下，进度条将被显示在dock栏图标上

![macOS Progress Bar][2]

在Linux系统中，Unity桌面也有相似的特性，能在Launcher上显示进度条。

![Linux Progress Bar][3]

> 注意：在 Windows 上，每个窗口都可以有自己的进度条，而在 macOS 和 Linux（unity桌面）上，同一个应用程序只能有一个进度条。

----

All three cases are covered by the same API - the [`setProgressBar()`][setprogressbar] method available on an instance of `BrowserWindow`. To indicate your progress, call this method with a number between `0` and `1`. For example, if you have a long-running task that is currently at 63% towards completion, you would call it as `setProgressBar(0.63)`.

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar, whereas setting it to values greater than `1` (e.g. `2`) will switch the progress bar to indeterminate mode (Windows-only -- it will clamp to 100% otherwise). In this mode, a progress bar remains active but does not show an actual percentage. Use this mode for situations when you do not know how long an operation will take to complete.

参见 [API documentation for more options and modes][setprogressbar]。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

After launching the Electron application, you should see the bar in the dock (macOS) or taskbar (Windows, Unity), indicating the progress percentage you just defined.

![macOS dock progress bar](../images/dock-progress-bar.png)

For macOS, the progress bar will also be indicated for your application when using [Mission Control](https://support.apple.com/en-us/HT204100):

![Mission Control Progress Bar](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
