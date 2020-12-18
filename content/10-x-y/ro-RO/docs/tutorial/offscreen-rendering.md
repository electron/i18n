# Randare în afara ecranului

Redarea în afara ecranului vă permite să obțineți conținutul unei ferestre a browserului într-o hartă bitmap, astfel încât să poată fi randat oriunde, de exemplu pe o textură într-o scenă 3D. Redarea în afara ecranului în Electron folosește o abordare similară față de proiectul [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Două moduri de redare pot fi folosite și numai zona murdară este pasată în evenimentul `'paint'` pentru a fi mai eficientă. Redarea poate fi oprită, continuă și rata de cadru poate fi setată. Nivelul de cadru specificat este o valoare limită de vârf. atunci când nu se întâmplă nimic pe o pagină web, nu sunt generate cadouri. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Notă:** O fereastră în afara ecranului este întotdeauna creată ca [Fereastră fără cadru](../api/frameless-window.md).

## Modul de redare

### Accelerare GPU

Randarea accelerată a GPU înseamnă că GPU este utilizat pentru compoziție. Din cauza că acest cadru trebuie copiat din GPU care necesită mai multă performanță, Astfel, acest mod este un pic mai lent decât celălalt. Beneficiul acestui mod este că animațiile WebGL și 3D CSS sunt suportate.

### Dispozitiv de ieșire software

Acest mod folosește un dispozitiv de ieșire software pentru redarea în CPU, astfel încât generarea de cadru este mult mai rapidă, prin urmare, acest mod este preferat față de cel GPU accelerat.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Utilizare

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.whenReady(). hen(() => {
  win = new BrowserWindow({
    webPreferens: {
      offscreen: true
    }
  })

  câştigă. oadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, imagine. etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
