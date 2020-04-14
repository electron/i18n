# Offscreen Rendering

Ang offscreen rendering ay nagpapahintulot sa iyo na kumuha ng nilalaman ng isang browser window sa bitmap, kaya ito ay nai-render kahit saan, halimbawa sa isang texture ng 3D scene. Ang offscreen rendering sa electron ay gumagamit ng katulad na pamamaraan kaysa sa[Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) na proyekto.

May dalawang mode ng rendering na pwedeng magamit at ang maruming lugar lamang ay nakapasa sa `'pintura'`event upang maging mas mahusay. Ang rendering ay maaring tumigil, magpatuloy at maaring magtakda ng frame rate. Ang tinukoy na frame rate ay isang nangungunang limit value, kapag mayroong walang nangyayari sa isang webpage, walang mga frame ang nabuo. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Note:** Ang offscreen window ay laging nilikha bilang isang[Frameless Window](../api/frameless-window.md).

## Rendering Modes

### Pinabilis na GPU

Pinabilis na GPU rendering na ang ibig sabihin ay ginagamit ang GPU para sa komposisyon. Dahil sa ang frame ay may kinopya sa GPU na nangangailangan ng karagdagang performance, kaya ang mode na ito ay lubos na mas mabagal kaysa sa isa. The benefit of this mode is that WebGL and 3D CSS animations are supported.

### Software output device

Ang mode ay gumagamit ng software output device para sa rendering ng CPU, kaya ang frame generation ay mas mabilis, kaya naman ang mode na ito ay ginustong sa ibabaw ng mas pinabilis na isang GPU.

Upang paganahin ang mode na ito ng GPU acceleration ay dapat hindi paganahin sa pamamagitan ng pagtawag sa[`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## Paggamit

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
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
