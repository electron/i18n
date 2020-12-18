# Offscreen vykreslování

Offscreen rendering vám umožní získat obsah okna prohlížeče v bitmapě, aby to bylo možné vykreslit kdekoli, například na texturě ve 3D scéně. offscreen rendering v Electronu používá podobný přístup jako projekt [Chromium vložený Framework](https://bitbucket.org/chromiumembedded/cef).

Lze použít dva režimy vykreslování a v události `'barva'` je procházena pouze špinavá plocha, aby byla efektivnější. Vykreslování může být zastaveno, pokračovat a nastavit frekvenci snímku. Zadaná frekvence snímků je nejvyšší limitní hodnota, když se na webové stránce nic neděje, nejsou vytvořeny žádné rámce. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Poznámka:** Okno vypnuté obrazovky je vždy vytvořeno jako [bezrámové okno](../api/frameless-window.md).

## Režim vykreslování

### Grafická akcelerace

Grafické zrychlené vykreslování znamená, že se GPU používá ke složení. Kvůli musí být snímek zkopírován z grafické karty, která vyžaduje větší výkonnost, proto je tento režim o něco pomalejší než ten druhý. Výhodou tohoto režimu je, že jsou podporovány WebGL a 3D CSS animace.

### Softwarové výstupní zařízení

Tento režim používá softwarové výstupní zařízení pro vykreslování v CPU, takže generování rámu je mnohem rychlejší, proto je tento režim preferován před grafickou akcelerací .

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Využití

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.whenReady(). hen(() => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  vyhraje. oadURL('http://github.com')
  win.webContents.on('paint', (event dirty, image) => {
    // updateBitmap(dirty, image. etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
