# Offscreen Rendering

Offscreen rendering ermöglicht es, den Inhalt eines Browser Fensters in einer Bitmap darzustellen um diesen, beispielsweise, auf einer Oberfläche in einer 3D Szene anzuzeigen. Offscreen rendering in Electron verwendet einen ähnlichen Ansatz wie das [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) Projekt.

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. The rendering can be stopped, continued and the frame rate can be set. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Notiz:** Ein offscreen Fenster wird immer als ein [Frameless Window](../api/frameless-window.md) erzeugt.

## Render Modi

### GPU Beschleunigung

GPU beschleunigtes Rendering bedeutet, dass der Grafikprozessor für die Bildgenerierung verwendet wird. Da das Bild aber zuerst auf den Grafikprozessor kopiert werden muss (was Zeit in Anspruch nimmt), ist dieser Modus langsamer als der CPU beschleunigte Modus. Die Vorteile sind die WebGL- und die 3D CSS Animationen Untersützung.

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