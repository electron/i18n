# Representación fuera de pantalla

La representación fuera de pantalla le permite obtener el contenido de una ventana del navegador en un mapa de bits, por lo que se puede representar en cualquier lugar, por ejemplo, en una textura en una escena 3D. La representación fuera de pantalla en Electron utiliza un enfoque similar al del proyecto [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Se pueden usar dos modos de renderizado y solo se pasa el área sucia en el evento `"pintar"` para que sea más eficiente. La renderización se puede detener, continuar y se puede establecer la velocidad de cuadros. La velocidad de fotogramas especificada es un valor límite superior, cuando no ocurre nada en una página web, no se generan marcos. La velocidad máxima de cuadros es 60, porque por encima de eso no hay beneficio, solo pérdida de rendimiento.

**Note:** An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

## Two modes of rendering

### GPU accelerated

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Software output device

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## Usage

```javascript
const {app, BrowserWindow} = require('electron')

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