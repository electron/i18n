# 오프 스크린 렌더링

오프 스크린 렌더링을 사용하면 브라우저 창의 내용을 비트 맵으로 가져올 수 있으며, 3D scene 의 텍스처와 같이 어디에서나 렌더링 할 수 있습니다. Electron의 오프 스크린 렌더링은 [Chromium 임베디드 프레임워크](https://bitbucket.org/chromiumembedded/cef) 프로젝트와 비슷한 방식을 사용합니다.

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. The rendering can be stopped, continued and the frame rate can be set. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Note:** An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

## Rendering Modes

### GPU accelerated

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Software output device

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## Usage

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