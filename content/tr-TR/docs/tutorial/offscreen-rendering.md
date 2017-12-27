# Ekran Dışı İşleme

Ekran dışı görüntülenme, bir tarayıcı penceresinin içeriğini bir bitmap olarak edinmenizi sağlar, böylece, herhangi bir yerde, örneğin bir 3D sahnedeki bir doku üzerinde oluşturulabilir. Electron'daki ekran dışı işleme, [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) projesinden daha benzer bir yaklaşım kullanıyor.

İki işleme modu kullanılabilir ve olayın daha verimli olması için sadece kirli alan ` 'paint' ` 'ten geçebilir. İşleme durdurulabilir, devam ettirilebilir ve kare hızı ayarlanabilir. Belirtilen kare hızı bir üst limit değeridir, bir web sayfasında hiçbir şey olmadığında hiç çerçeve oluşturulmaz. En yüksek kare hızı değeri 60'tır, çünkü daha yukarıda hiçbir yararı yoktur, sadece performans kaybıdır.

**Not:** Bir ekran dışı pencere her zamanan [Frameless Window](../api/frameless-window.md) oluşturur.

## İşlemenin iki modu

### GPU hızlandırma

GPU hızlandırılmış oluşturma, GPU'nun kompozisyon için kullanıldığı anlamına gelir. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Çıkış aygıtı yazılımı

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