# Barra de progreso en la barra de tareas (Windows, macOS, Unity)

En Windows, el botón en la barra puede ser utilizada para mostrar una barra de progreso. Esto habilita a una página a proveer información a el usuario sin que tenga que cambiar a la página en sí.

En macOS la barra de progreso será mostrada como una parte del ícono del dock.

El Unity DE también tiene una función similar que le permite especificar la barra de progreso en el laucher.

__Barra de progreso en el botón de la barra de tareas:__

![Barra de progreso de la barra de tareas](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Los tres casos están cubiertos por la misma API - el método `setProgressBar()` disponible en estancias de `BrowserWindows`. Llame al método con un número entre `0` y `1` para indicar tu progreso. Si usted tiene una tarea de larga ejecución que actualmente está al 63% hacia la finalización, lo llamaríamos con `setProgressBar(0.63)`.

En términos generales, ajustar el parámetro a un valor debajo de cero (como `-1`) quitará la barra de progreso mientras el valor establecido es mayor que uno (como `2`) cambiará la barra de progreso al modo intermedio.

Ver el [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
