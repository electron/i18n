# Offscreen Rendering

Offscreen rendering lets you obtain the content of a browser window in a bitmap, so it can be rendered anywhere, for example on a texture in a 3D scene. The offscreen rendering in Electron uses a similar approach than the [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) project.

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. The rendering can be stopped, continued and the frame rate can be set. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Note:** An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

## Rendering Modes

### GPU accelerated

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Software Ausgabegerät

Dieser Modus verwendet ein Software Ausgabegerät um auf der CPU zu rendern. Da die Bildgenerierung in diesem Modus um einiges schneller ist, wird dieser über den GPU beschleunigten Modus bevorzugt.

Um diesen Modus einzuschalten, muss GPU Beschleunigung ausgeschaltet werden. Dies erreicht man indem man die [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API aufruft.

## Beispiel

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