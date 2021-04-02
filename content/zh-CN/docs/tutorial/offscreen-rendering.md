# 离屏渲染

## 概览

屏幕外渲染允许您在 位图中获取 `BrowserWindow` 的内容，因此可以在任何地方呈现，例如，在 3D 场景中的纹理上。 Electron 中的屏幕外渲染采用与 [铬嵌入式框架](https://bitbucket.org/chromiumembedded/cef) 项目类似的方法。

*注意*：

* 有两种渲染模式可以使用（见下面的部分），并且只有在脏区域传递给 `paint` 事件以更高效 。
* 您可以停止/继续渲染并设置帧速率。
* 最大帧速率为 240，因为更高的值只带来性能 损失，没有好处。
* 当网页上发生任何情况时，不会生成帧。
* 屏幕外窗口始终被创建为 [无框窗口](../api/frameless-window.md)。

### 渲染模式

#### GPU加速

GPU加速渲染意味着使用GPU用于合成。 由于 ，框架必须从需要更多资源的 GPU 复制， 因此此模式比软件输出设备慢。 这种模式的优点是支持WebGL和3D CSS动画.

#### 软件输出设备

此模式使用软件输出设备在 CPU 中渲染，因此帧 生成要快得多。 因此，此模式优于GPU 加速模式。

要启用此模式，必须通过调用 [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API 来禁用 GPU 加速度。

## 示例

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
康斯特 { app, BrowserWindow } =要求（'电子'）
const fs=需要（'fs'）

应用程序。禁用硬软件的认证（）

让赢得

应用程序> 。
  赢=新浏览器窗口（\网络预示物： { offscreen: true } ）
  

  赢.com。 脏的， 图像）=> =
    fs.写文件同步（"ex.png"，图像
  ）
  赢
。
```

启动 Electron 应用程序后，导航到应用程序文件夹。

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
