# Barra de progreso en la barra de tareas (Windows, macOS, Unity)

## Descripción general

A progress bar enables a window to provide progress information to the user without the need of switching to the window itself.

On Windows, you can use a taskbar button to display a progress bar.

![Barra de progreso de Windows](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

On macOS, the progress bar will be displayed as a part of the dock icon.

![Barra de progreso de macOS](../images/macos-progress-bar.png)

On Linux, the Unity graphical interface also has a similar feature that allows you to specify the progress bar in the launcher.

![Barra de progreso de Linux](../images/linux-progress-bar.png)

> NOTE: on Windows, each window can have its own progress bar, whereas on macOS and Linux (Unity) there can be only one progress bar for the application.

----

All three cases are covered by the same API - the [`setProgressBar()`](../api/browser-window.md#winsetprogressbarprogress-options) method available on an instance of `BrowserWindow`. Para indicar tu progreso, invoca este método con un número entre `0` y `1`. For example, if you have a long-running task that is currently at 63% towards completion, you would call it as `setProgressBar(0.63)`.

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar, whereas setting it to values greater than `1` (e.g. `2`) will switch the progress bar to indeterminate mode (Windows-only -- it will clamp to 100% otherwise). In this mode, a progress bar remains active but does not show an actual percentage. Use this mode for situations when you do not know how long an operation will take to complete.

Ver el [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress-options).

## Ejemplo

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), agregue las siguientes líneas al archivo `main.js`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

After launching the Electron application, you should see the bar in the dock (macOS) or taskbar (Windows, Unity), indicating the progress percentage you just defined.

![macOS dock progress bar](../images/dock-progress-bar.png)

For macOS, the progress bar will also be indicated for your application when using [Mission Control](https://support.apple.com/en-us/HT204100):

![Barra de progreso de Control de Misión](../images/mission-control-progress-bar.png)
