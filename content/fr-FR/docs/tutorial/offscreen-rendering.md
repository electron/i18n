# Rendu hors de l'écran

Le Rendu hors de l'écran vous permet d’obtenir le contenu d’une fenêtre de navigateur dans un fichier bitmap, donc il peut être restitué n’importe où, par exemple une texture dans une scène 3D. Le rendu hors écran d'Electron utilise une approche similaire au projet [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Deux modes de rendu peuvent être utilisés et la zone sale est passée à l’événement `'paint'` pour être plus efficace. Le rendu peut être arrêté, continué et la cadence peut être définie. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. La fréquence maximale est de 60, car haut dessus il n'y a aucun bénéfices, juste des pertes de performances.

**Remarque :** Une fenêtre hors de l’écran est toujours créée comme une [Fenêtre sans cadre](../api/frameless-window.md).

## Deux modes de rendu

### Accélération GPU

Le rendu par l'acceleration GPU signifie que le GPU est utilisé pour la composition. Puisque cette fenêtre doit être copiée depuis le GPU, cela require plus de performances. Donc ce mode est légèrement plus lent que l'autre. L’avantage de ce mode est que WebGL et les animations CSS 3D sont prises en charge.

### Software output device

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

Pour activer ce mode, l'accélération GPU doit être désactivé en appelant l'API [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration).

## Utilisation

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