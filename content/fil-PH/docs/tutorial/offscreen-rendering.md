# Offscreen Rendering

Ang offscreen rendering ay nagpapahintulot sa iyo na kumuha ng nilalaman ng isang browser window sa bitmap, kaya ito ay nai-render kahit saan, halimbawa sa isang texture ng 3D scene. Ang offscreen rendering sa electron ay gumagamit ng katulad na pamamaraan kaysa sa[Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) na proyekto.

May dalawang mode ng rendering na pwedeng magamit at ang maruming lugar lamang ay nakapasa sa `'pintura'`event upang maging mas mahusay. Ang rendering ay maaring tumigil, magpatuloy at maaring magtakda ng frame rate. Ang tinukoy na frame rate ay isang nangungunang limit value, kapag mayroong walang nangyayari sa isang webpage, walang mga frame ang nabuo. Ang pinakamataas na frame rate ay 60, dahil sa itaas na walang pakinabang, lamang pagkawala ng pagganap.

**Note:** Ang offscreen window ay laging nilikha bilang isang[Frameless Window](../api/frameless-window.md).

## Dalawang mga mode ng rendering

### Pinabilis na GPU

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