# Ekran Dışı İşleme

Ekran dışı görüntülenme, bir tarayıcı penceresinin içeriğini bir bitmap olarak edinmenizi sağlar, böylece, herhangi bir yerde, örneğin bir 3D sahnedeki bir doku üzerinde oluşturulabilir. Electron'daki ekran dışı işleme, [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) projesinden daha benzer bir yaklaşım kullanıyor.

İki işleme modu kullanılabilir ve olayın daha verimli olması için sadece kirli alan ` 'paint' ` 'ten geçebilir. İşleme durdurulabilir, devam ettirilebilir ve kare hızı ayarlanabilir. Belirtilen kare hızı bir üst limit değeridir, bir web sayfasında hiçbir şey olmadığında hiç çerçeve oluşturulmaz. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Not:** Bir ekran dışı pencere her zamanan [Frameless Window](../api/frameless-window.md) oluşturur.

## Rendering Modes

### GPU hızlandırma

GPU hızlandırılmış oluşturma, GPU'nun kompozisyon için kullanıldığı anlamına gelir. Çünkü daha çok performans gerektiren pencerenin GPU'dan kopyalanması gerekir, bu nedenle bu mod diğerinden oldukça yavaştır. Bu modun faydası WEBGL ve 3D CSS animasyonlarının desteklenmesidir.

### Çıkış aygıtı yazılımı

Bu mod, CPU'da oluşturulması için bir yazılım çıktı aygıtı kullanır, bu sayede çerçeve üretimi çok daha hızlıdır, dolayısıyla bu mod hızlandırılmış GPU modelden daha çok tercih edilir.

Bu modu etkinleştirmek için [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API'sinin çağırılarak GPU hızlandırmasının devre dışı bırakılması gerekir.

## Kullanım

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

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
