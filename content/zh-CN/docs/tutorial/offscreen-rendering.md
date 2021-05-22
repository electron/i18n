# 离屏渲染

## 概览

离屏渲染允许你以位图的方式来获取 `BrowserWindow` 中的内容，所以它可以在任何地方被渲染，例如在3D场景中的纹理。 Electron中的离屏渲染使用与 [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) 项目类似的方法。

*注意*：

* There are two rendering modes that can be used (see the section below) and only the dirty area is passed to the `paint` event to be more efficient.
* 您可以停止/继续渲染并设置帧速率。
* 最高帧速率为 240，因为更高的值只会带来性能上的损失而没有任何收益。
* 当网页上没有发生任何情况时，不会生成帧。
* 屏幕窗口始终创建为 [无边框窗口](../api/frameless-window.md).

### 渲染模式

#### GPU加速

GPU加速渲染意味着使用GPU用于合成。 Because of that, the frame has to be copied from the GPU which requires more resources, thus this mode is slower than the Software output device. 这种模式的优点是支持WebGL和3D CSS动画.

#### 软件输出设备

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster. As a result, this mode is preferred over the GPU accelerated one.

To enable this mode, GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

启动 Electron 应用程序后，导航到应用程序文件夹。

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
