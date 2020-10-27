# Barra de progreso en la barra de tareas (Windows, macOS, Unity)

## Descripción general

Un progress bar le permite a una ventana proveer información de progreso al usuario sin necesidad de cambiar a la propia ventana.

En Windows puede usar un taskbar button para mostrar un progress bar.

![Barra de progreso de Windows](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

En macOS, el progress bar será mostrado como parte del dock icon.

![Barra de progreso de macOS](../images/macos-progress-bar.png)

En Linux, la interfaz gráfica Unity además tiene una característica similar que le permite especificar el progress bar en en el lanzador.

![Barra de progreso de Linux](../images/linux-progress-bar.png)

> NOTA: en Windows, cada ventana tiene su propio progress bar, mientras que en macOS y Linux(Unity)  puede haber un solo progress bar para la aplicación.

----

Los tres casos son cubiertos por la misma API - el método [`setProgressBar()`](../api/browser-window.md#winsetprogressbarprogress-options) disponible en una instancia de `BrowserWindow`. Para indicar tu progreso, invoca este método con un número entre `0` y `1`. Por ejemplo, si tiene una tarea de larga ejecución que actualmente esta al 63% para completar, debería llamarlo como `setProgressBar(0.63)`.

Estableciendo el parámetro a valores negativos (p.ej. `-1`) eliminara el progress bar, mientras que estableciendo valores mas grandes que `1` (p.ej. `2`) cambiará el progress bar al modo indeterminado (Solo Windows -- de lo contrario se ajustará al 100%). En este modo un progress bar permanece activo pero no muestra un porcentaje real. Use este modo para situaciones cuando no sabe cuanto tiempo tomará una tarea en completarse.

Ver el [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress-options).

## Ejemplo

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), agregue las siguientes líneas al archivo `main.js`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

Después de lanzar la aplicación Electron, debería ver la barra en el dock (macOS) o taskbar (Windows, Unity), indicando el porcentaje de progreso que acaba de definir.

![macOS dock progress bar](../images/dock-progress-bar.png)

Para macOS, el progress bar también será indicado para su aplicación cuando utilice [Mission Control](https://support.apple.com/en-us/HT204100):

![Barra de progreso de Control de Misión](../images/mission-control-progress-bar.png)
