# Barre de progression dans la barre des tâches (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

Sous macOS, la barre de progression s'affichera dans le cadre de l'icône du dock.

Le Unity DE possède également une fonctionnalité similaire qui vous permet de spécifier la barre de progression dans le lanceur.

**Barre de progression dans le bouton de la barre des tâches :**

![Barre de progression personnalisée](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```