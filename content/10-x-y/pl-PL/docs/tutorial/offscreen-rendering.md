# Renderowanie Pozaekranowe

Renderowanie poza ekranem pozwala uzyskać zawartość okna przeglądarki w bitmapie, więc może być renderowana w dowolnym miejscu, na przykład na tekstury w scenie 3D. renderowanie offscreerowe w Electron używa podobnego podejścia niż projekt [Chromium Osadzony Framework](https://bitbucket.org/chromiumembedded/cef).

Można użyć dwóch trybów renderowania i tylko brudny obszar jest przekazywany w wydarzeniu `'malowanie'` aby być bardziej efektywnym. Renderowanie może być zatrzymane, kontynuowane i można ustawić szybkość klatki. Określona prędkość ramki jest najwyższą wartością graniczną, gdy nic się nie dzieje na stronie internetowej, żadne ramki nie są generowane. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Uwaga:** Okno offscreerowe jest zawsze tworzone jako [Okno bez ramki](../api/frameless-window.md).

## Tryby Renderowania

### Akceleracja GPU

Nakładanie GPU oznacza, że GPU jest używany do kompozycji. że ramka musi być skopiowana z GPU, co wymaga większej wydajności, więc ten tryb jest nieco wolniejszy niż drugi. Zaletą tego trybu jest to, że animacje CSS WebGL i 3D są obsługiwane.

### Urządzenie wyjściowe oprogramowania

Ten tryb wykorzystuje oprogramowanie wyjściowe do renderowania w CPU, więc generowanie klatki jest znacznie szybsze, dlatego ten tryb jest preferowany nad przyspieszeniem GPU .

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Zużycie

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let wygraj

app.whenReady(). hen() => {
  wygraj = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  wygrywa. oadURL('http://github.com')
  win.webContents.on('paint', (zdarzenie, brud, obrazek) => {
    // updateBitmap(brudność, obraz). etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
