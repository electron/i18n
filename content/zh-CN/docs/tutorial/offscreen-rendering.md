# 离屏渲染

## 概览

离屏渲染允许你以位图的方式来获取 `BrowserWindow` 中的内容，所以它可以在任何地方被渲染，例如在3D场景中的纹理。 Electron中的离屏渲染使用与 [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) 项目类似的方法。

*注意*：

* 有两种渲染模式可以使用（见下），只有未渲染区域传递到 `绘图` 事件才能提高效率。
* 您可以停止/继续渲染并设置帧速率。
* 最高帧速率为 240，因为更高的值只会带来性能上的损失而没有任何收益。
* 当网页上没有发生任何情况时，不会生成帧。
* 屏幕窗口始终创建为 [无边框窗口](../api/frameless-window.md).

### 渲染模式

#### GPU加速

GPU加速渲染意味着使用GPU用于合成。 这也就意味着帧必须从GPU拷贝过来，从而需求更多的资源，因此这会比软件输出设备更慢。 这种模式的优点是支持WebGL和3D CSS动画.

#### 软件输出设备

此模式使用软件输出设备在 CPU 中渲染，因此帧 生成的速度要快得多。 因此，此模式优先于 GPU 加速模式。

要启用此模式，必须通过调用 [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API 来禁用GPU加速。

## 示例

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

在运行Electron应用后，进入你的应用的工作目录，你会在里面找到渲染的图片。

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
