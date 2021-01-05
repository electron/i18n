# 离屏渲染

## 概览

Offscreen rendering lets you obtain the content of a `BrowserWindow` in a bitmap, so it can be rendered anywhere, for example, on texture in a 3D scene. The offscreen rendering in Electron uses a similar approach to that of the [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) project.

*注意*：

* There are two rendering modes that can be used (see the section below) and only the dirty area is passed to the `paint` event to be more efficient.
* 您可以停止/继续渲染并设置帧速率。
* The maximum frame rate is 240 because greater values bring only performance losses with no benefits.
* When nothing is happening on a webpage, no frames are generated.
* An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

### 渲染模式

#### GPU加速

GPU加速渲染意味着使用GPU用于合成。 Because of that, the frame has to be copied from the GPU which requires more resources, thus this mode is slower than the Software output device. 这种模式的优点是支持WebGL和3D CSS动画.

#### 软件输出设备

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster. As a result, this mode is preferred over the GPU accelerated one.

To enable this mode, GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## 示例

从 起从[快速启动指南](quick-start.md)开始运行，将以下行添加到 `main.js` 文件：

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
