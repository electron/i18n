# Rendu Offscreen

## Vue d'ensemble

Le rendu hors écran vous permet d’obtenir le contenu d’un `BrowserWindow` dans une bitmap , de sorte qu’il peut être rendu n’importe où, par exemple, sur la texture dans une scène 3D. Le rendu hors écran dans Electron utilise une approche similaire à celle du [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) projet.

*Notes*:

* Il existe deux modes de rendu qui peuvent être utilisés (voir la section ci-dessous) et seulement la zone sale est transmise à l’événement `paint` pour être plus efficace.
* Vous pouvez arrêter/continuer le rendu ainsi que définir la vitesse d’image.
* Le taux d’image maximum est de 240 parce que des valeurs plus élevées n’apportent que des et des pertes sans avantages.
* Lorsque rien ne se passe sur une page Web, aucun cadre n’est généré.
* Une fenêtre hors écran est toujours créée comme une fenêtre [frameless](../api/frameless-window.md).

### Mode de rendu

#### Accélération GPU

Le rendu par l'acceleration GPU signifie que le GPU est utilisé pour la composition. En raison cela, le cadre doit être copié à partir du GPU qui nécessite plus de ressources, donc ce mode est plus lent que le périphérique de sortie du logiciel. L’avantage de ce mode est que WebGL et les animations CSS 3D sont prises en charge.

#### Logiciel de périphérique sortant

Ce mode utilise un dispositif de sortie logicielle pour le rendu dans le processeur, de sorte que le cadre génération est beaucoup plus rapide. En conséquence, ce mode est préféré au GPU accéléré.

Pour activer ce mode, l’accélération GPU doit être désactivée en appelant l' [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Exemple

Commencer avec une application fonctionnelle du [Guide de démarrage rapide](quick-start.md), ajoutez les lignes suivantes au fichier `main.js`:

```javascript fiddle='docs/fiddles/features/offscreen-rendering'
const { app, BrowserWindow } = require ('electron')
const fs = require ('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then()=> {
  victoire = nouveau BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL ('https://github.com')
  win.webContents.on('paint', (événement, sale, image) => {
    fs.writeFileSync ('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})
```

Après avoir lancé l’application Electron, accédez au dossier de travail votre application.

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
