# Barra de progreso en la barra de tareas (Windows, macOS, Unity)

En Windows, el botón en la barra puede ser utilizada para mostrar una barra de progreso. Esto habilita a una página a proveer información a el usuario sin que tenga que cambiar a la página en sí.

En macOS la barra de progreso será mostrada como una parte del ícono del dock.

El Unity DE también tiene una función similar que le permite especificar la barra de progreso en el laucher.

**Barra de progreso en el botón de la barra de tareas:**

![Barra de progreso de la barra de tareas](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Los tres casos están cubiertos por la misma API - el método `setProgressBar()` disponible en estancias de `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```