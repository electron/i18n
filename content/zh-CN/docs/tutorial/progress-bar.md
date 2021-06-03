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

将参数设置为负值 (例如， `-1`) 将删除progress bar。 设定值大于 `1` 在 Windows 中将表示一个不确定的进度条 ，或在其他操作系统中显示为 100%。 一个不确定的progress bar 仍然处于活动状态，但不显示实际百分比， 并且用于当 您不知道一个操作需要多长时间才能完成的情况。

参见 [API documentation for more options and modes][setprogressbar]。

## 示例

在此示例中，我们将进度栏添加到main window中，该窗口会使用node.js的计时器实现随着时间的推移而进度增长。

```javascript fiddle='docs/fiddles/features/progress-bar'
const { app, BrowserWindow } = require('electron')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) c += INCREMENT
    else c = 0
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

启动 Electron 应用程序后，Dock (macOS) 或 taskbar (Windows, Unity) 应该显示一个进度条, 从零开始, 到100%到完成。 应该显示不确定的 (Windows) 或短暂的固定到100% (其他操作系统) 并然后循环。

![macOS dock 进度条](../images/dock-progress-bar.png)

对于macOS，当使用 [Mission Control](https://support.apple.com/en-us/HT204100) 时，应用程序也会显示进度条

![macOS Mission Control 进度条](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
