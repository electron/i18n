# Rendu Offscreen

## Vue d'ensemble

Le Rendu hors-écran vous permet de récupérer le contenu d’une `BrowserWindow` dans un fichier bitmap, donc il pourra être restitué n’importe où, par exemple une texture dans une scène 3D. Le rendu hors-écran d'Electron utilise une approche comparable au projet [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

*Notes* :

* Il y a deux modes de rendu qui peuvent être utilisés (voir la section ci-dessous) et seule la zone modifiée est concernée par l'événement `paint` pour plus d'efficacité.
* Vous pouvez stopper/reprendre le rendu ainsi que définir la fréquence d'affichage de l’image.
* Le taux de rafraîchissement maximal est de 240 car des valeurs plus élevées n'apportent que des pertes de performances sans avantage particulier.
* Quand rien ne se passe sur une page Web, aucune image n'est générée.
* **Remarque :** Une fenêtre hors-écran est toujours créée comme une [Frameless Window](../api/frameless-window.md).

### Mode de rendu

#### Accélération GPU

Le rendu par l'acceleration GPU signifie que le GPU est utilisé pour la composition. A cause de cela, cette fenêtre doit être copiée depuis le GPU et cela nécessite plus de performances. Donc ce mode est légèrement plus lent que l'autre. L’avantage de ce mode est que WebGL et les animations CSS 3D sont prises en charge.

#### Périphérique d'affichage logiciel

Ce mode utilise un périphérique d'affichage logiciel pour le rendu du CPU, donc la génération de l'image est beaucoup plus rapide. Par conséquent, ce mode est préférable au mode d'accélération GPU.

Pour activer ce mode, l'accélération GPU doit être désactivée en appelant l'API [`app.disableHardwareAcceleration()`][disablehardwareacceleration].

## Exemple

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

Après avoir lancé l'application Electron, accédez au dossier contenant votre application, où vous trouverez l'image affichée.

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
