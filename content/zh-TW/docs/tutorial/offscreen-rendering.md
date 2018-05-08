# 螢幕外畫面轉譯

螢幕外畫面轉譯功能讓你能以點陣圖格式取得瀏覽器視窗的內容，你能把它用在任何地方，例如當做 3D 場景的材質。 Electron 的螢幕外畫面轉譯功能採用類似於 [Chromium 嵌入式框架](https://bitbucket.org/chromiumembedded/cef) 專案的作法。

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. The rendering can be stopped, continued and the frame rate can be set. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Note:** An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

## Rendering Modes

### GPU 加速

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### 軟體輸出裝置

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## 用法

```javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```