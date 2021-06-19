# Archivo representado por macOS BrowserWindows

## Descripción general

En macOS, puede establecer un archivo representado para cualquier ventana en tu aplicación. El icono del archivo representado será mostrado en la barra de título, y cuando los usuarios `Command-Click` o `Control-Click` en una ventana emergente con una ruta al archivo será mostrada.

![Archivo representado][1]

> NOTA: La captura de pantalla anterior es un ejemplo donde esta característica es usada para indicar el archivo abierto actualmente en el editor de texto Atom.

También puede establecer el estado editado de una ventana para que el ícono del archivo pueda indicar si el documento en esta ventana ha sido modificado.

Para configurar el archivo representado de la ventana, puede utilizarse las APIs [BrowserWindow.setRepresentedFilename][setrepresentedfilename] y [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Ejemplo

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')
const os = require('os');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
}

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename(os.homedir())
  win.setDocumentEdited(true)
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

Después de lanzar la aplicación Electron, pulse en el título con la tecla `Command` o `Control` presionada. Deberías ver una ventana emergente con el archivo representado en la parte superior. En esta guía, este es el directorio principal del usuario actual:

![Archivo representado](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
