# Barra de progreso en la barra de tareas (Windows, macOS, Unity)

## Descripción general

Un progress bar le permite a una ventana proveer información de progreso al usuario sin necesidad de cambiar a la propia ventana.

En Windows puede usar un taskbar button para mostrar un progress bar.

![Barra de progreso de Windows][1]

En macOS, el progress bar será mostrado como parte del dock icon.

![Barra de progreso de macOS][2]

En Linux, la interfaz gráfica Unity además tiene una característica similar que le permite especificar el progress bar en en el lanzador.

![Barra de progreso de Linux][3]

> NOTA: en Windows, cada ventana tiene su propio progress bar, mientras que en macOS y Linux(Unity)  puede haber un solo progress bar para la aplicación.

----

Los tres casos son cubiertos por la misma API - el método [`setProgressBar()`][setprogressbar] disponible en una instancia de `BrowserWindow`. Para indicar tu progreso, invoca este método con un número entre `0` y `1`. Por ejemplo, si tiene una tarea de larga ejecución que actualmente esta al 63% para completar, debería llamarlo como `setProgressBar(0.63)`.

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar. Setting it to a value greater than `1` will indicate an indeterminate progress bar in Windows or clamp to 100% in other operating systems. Una barra de progreso indeterminada permanece activa pero no muestra un porcentaje real, y se utiliza para situaciones cuando no sabe cuánto tardará una operación en completarse.

Ver el [API documentation for more options and modes][setprogressbar].

## Ejemplo

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

Después de lanzar la aplicación Electron, el Dock (macOS) o la barra de tareas (Windows, Unity) deben mostrar una barra de progreso que comience en cero y progrese hasta el 100% hasta completarse. Luego debe mostrar indeterminado (Windows) o anclar a 100% (otros sistemas operativos) brevemente y luego bucle.

![macOS dock progress bar](../images/dock-progress-bar.png)

Para macOS, el progress bar también será indicado para su aplicación cuando utilice [Mission Control](https://support.apple.com/en-us/HT204100):

![Barra de progreso de Control de Misión](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
