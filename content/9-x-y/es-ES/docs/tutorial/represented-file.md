# Archivo representado por macOS BrowserWindows

En macOS, una ventana puede establecer su archivo representado, de modo que el icono del archivo se muestre en la barra de título y cuando los usuarios hagan clic con el botón Comando o haga clic con el botón Control en el título, se muestre una ventana emergente de ruta.

También puede establecer el estado editado de una ventana para que el ícono del archivo pueda indicar si el documento en esta ventana ha sido modificado.

__Menú emergente de archivo representado:__

![Archivo representado](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Para configurar el archivo representado de la ventana, puede utilizarse las APIs [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) y [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
