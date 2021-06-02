# Barre de progression dans la barre des tâches (Windows, macOS, Unity)

## Vue d'ensemble

Une barre de progression permet à une fenêtre de fournir une informations à l'utilisateur sur la progression sans avoir besoin de basculer sur cette même fenêtre.

Sous Windows, vous pouvez utiliser un bouton de la barre des tâches pour afficher une barre de progression.

![Barre de progression sous Windows][1]

Sous macOS, la barre de progression s'affichera dans le cadre de l'icône du dock.

![Barre de progression sous macOS][2]

Sur Linux, l’interface graphique Unity dispose également d’une fonctionnalité similaire qui vous permet de spécifier la barre de progression dans le lanceur.

![Barre de progression sous Linux][3]

> REMARQUE : sur Windows, chaque fenêtre peut avoir sa propre barre de progression, tandis que sur macOS et Linux (Unity) il ne peut y avoir qu’une seule barre de progression pour l’application.

----

Les trois cas sont couverts par la même API - la méthode [`setProgressBar()`][setprogressbar] disponible sur une instance de `BrowserWindows`. Pour indiquer l'état de la progression vous devez appeler cette méthode avec un nombre entre `0` et `1`. Par exemple: Si vous avez une tâche qui dure relativement longtemps et qui est en est actuellement à 63% avant sa finalisation, vous l'appelleriez avec `setProgressBar(0.63)`.

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar. Setting it to a value greater than `1` will indicate an indeterminate progress bar in Windows or clamp to 100% in other operating systems. An indeterminate progress bar remains active but does not show an actual percentage, and is used for situations when you do not know how long an operation will take to complete.

Voir la [documentation API pour plus d'options et de modes][setprogressbar].

## Exemple

In this example, we add a progress bar to the main window that increments over time using Node.js timers.

```javascript fiddle='docs/fiddles/features/progress-bar'
const { app, BrowserWindow } = require('electron')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) c += INCREMENT
    else c = 0
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

After launching the Electron application, the dock (macOS) or taskbar (Windows, Unity) should show a progress bar that starts at zero and progresses through 100% to completion. It should then show indeterminate (Windows) or pin to 100% (other operating systems) briefly and then loop.

![Barre de progression du dock macOS](../images/dock-progress-bar.png)

Pour macOS, la barre de progression de votre application sera également indiquée lors de l'utilisation de [Mission Control](https://support.apple.com/en-us/HT204100):

![Barre de progression avec Mission Control](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
