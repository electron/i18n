# Renderowanie Pozaekranowe

Renderowanie poza ekranem pozwala uzyskać zawartość okna przeglądarki w bitmapie, więc może być renderowana w dowolnym miejscu, na przykład na tekstury w scenie 3D. renderowanie offscreerowe w Electron używa podobnego podejścia niż projekt [Chromium Osadzony Framework](https://bitbucket.org/chromiumembedded/cef).

Można użyć dwóch trybów renderowania i tylko brudny obszar jest przekazywany w wydarzeniu `'malowanie'` aby być bardziej efektywnym. Renderowanie może być zatrzymane, kontynuowane i można ustawić szybkość klatki. Określona prędkość ramki jest najwyższą wartością graniczną, gdy nic się nie dzieje na stronie internetowej, żadne ramki nie są generowane. maksymalna liczba klatek na sekundę wynosi 60, ponieważ powyżej nie ma korzyści, tylko utrata wydajności.

**Uwaga:** Okno offscreerowe jest zawsze tworzone jako [Okno bez ramki](../api/frameless-window.md).

## Tryby Renderowania

### Akceleracja GPU

Nakładanie GPU oznacza, że GPU jest używany do kompozycji. że ramka musi być skopiowana z GPU, co wymaga większej wydajności, więc ten tryb jest nieco wolniejszy niż drugi. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Urządzenie wyjściowe oprogramowania

Ten tryb wykorzystuje oprogramowanie wyjściowe do renderowania w CPU, więc generowanie klatki jest znacznie szybsze, dlatego ten tryb jest preferowany nad przyspieszeniem GPU .

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Zużycie

``` javascript
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

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
