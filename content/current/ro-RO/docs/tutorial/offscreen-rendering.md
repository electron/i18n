# Randare în afara ecranului

## Overview

Offscreen rendering lets you obtain the content of a `BrowserWindow` in a bitmap, so it can be rendered anywhere, for example, on texture in a 3D scene. The offscreen rendering in Electron uses a similar approach to that of the [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) project.

*Notes*:

* There are two rendering modes that can be used (see the section below) and only the dirty area is passed to the `paint` event to be more efficient.
* You can stop/continue the rendering as well as set the frame rate.
* The maximum frame rate is 60 because greater values bring only performance losses with no benefits.
* When nothing is happening on a webpage, no frames are generated.
* An offscreen window is always created as a [Frameless Window](../api/frameless-window.md).

### Modul de redare

#### Accelerare GPU

Randarea accelerată a GPU înseamnă că GPU este utilizat pentru compoziție. Because of that, the frame has to be copied from the GPU which requires more resources, thus this mode is slower than the Software output device. Beneficiul acestui mod este că animațiile WebGL și 3D CSS sunt suportate.

#### Dispozitiv de ieșire software

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster. As a result, this mode is preferred over the GPU accelerated one.

To enable this mode, GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## Exemplu

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), adaugă următoarele linii în fișierul `main.js`:

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

After launching the Electron application, navigate to your application's working folder.
