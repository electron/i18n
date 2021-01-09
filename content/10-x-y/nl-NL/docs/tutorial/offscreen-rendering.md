# Offscreen Rendering

Offscreen weergave laat u de inhoud van een browservenster in een bitmap verkrijgen, zodat het overal kan worden weergegeven, bijvoorbeeld op een textuur in een 3D-scène. De offscreen weergave in Electron gebruikt een vergelijkbare aanpak dan de [Chromium ingesloten Framework](https://bitbucket.org/chromiumembedded/cef) project.

Twee modi van rendering kunnen worden gebruikt en alleen het vuile gebied wordt doorgegeven in de `'verf'` gebeurtenis om efficiënter te zijn. De weergave kan worden gestopt, verder gaan en de framesnelheid kan worden ingesteld. De opgegeven framesnelheid is een top limietwaarde, wanneer er niets op een webpagina gebeurt, worden er geen frames gegenereerd. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Opmerking:** Een offscreen venster wordt altijd gemaakt als een [Frameless Window](../api/frameless-window.md).

## Rendering Modi

### GPU versneld

GPU versnelde rendering betekent dat de GPU wordt gebruikt voor compositie. Vanwege moet de lijst worden gekopieerd van de GPU die meer prestaties vereist, Dus deze modus is behoorlijk wat langzamer dan de andere. Het voordeel van deze modus is dat WebGL en 3D CSS animaties worden ondersteund.

### Software uitvoerapparaat

Deze modus maakt gebruik van een software uitvoerapparaat voor weergave in de CPU, dus het frame is veel sneller, Daarom heeft deze modus de voorkeur boven de versnelde GPU een.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Gebruik

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

  win. oadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // update eBitmap(dirty, image. etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
