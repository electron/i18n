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

Si le paramètre à une valeur négative (par exemple `-1`) cela supprimera la barre de progression. . Une valeur supérieure à `1` indiquera sous Windows une barre de progression indéfinie et la verrouillera à 100% avec les autres systèmes d'exploitation. Une barre de progression indéterminée reste active mais n’affiche pas de pourcentage réel et est utilisée pour les situations où on ne sait pas combien de temps une opération prendra pour se terminer.

Voir la [documentation API pour plus d'options et de modes][setprogressbar].

## Exemple

Dans cet exemple, nous ajoutons une barre de progression à la fenêtre principale qui s’incrémente au fil du temps à l’aide des timers de Node.js.

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

Après le lancement de l’application Electron, le dock (macOS) ou la barre des tâches (Windows, Unity) affichera une barre de progression qui commence à zéro et progresse jusqu’à 100 % à la fin. Cela devrait alors s'afficher brièvement en indéterminé (Windows) ou vérouillé à 100% (autres systèmes d'exploitation), puis boucler.

![Barre de progression du dock macOS](../images/dock-progress-bar.png)

Pour macOS, la barre de progression de votre application sera également indiquée lors de l'utilisation de [Mission Control](https://support.apple.com/en-us/HT204100):

![Barre de progression avec Mission Control](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
