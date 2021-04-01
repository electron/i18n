# Archivo representado por macOS BrowserWindows

## Descripción general

En macOS, puede establecer un archivo representado para cualquier ventana en tu aplicación. El icono del archivo representado será mostrado en la barra de título, y cuando los usuarios `Command-Click` o `Control-Click` en una ventana emergente con una ruta al archivo será mostrada.

![Archivo representado][1]

> NOTA: La captura de pantalla anterior es un ejemplo donde esta característica es usada para indicar el archivo abierto actualmente en el editor de texto Atom.

También puede establecer el estado editado de una ventana para que el ícono del archivo pueda indicar si el documento en esta ventana ha sido modificado.

Para configurar el archivo representado de la ventana, puede utilizarse las APIs [BrowserWindow.setRepresentedFilename][setrepresentedfilename] y [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Ejemplo

Comenzando con una aplicación funcional de la [Guía de inicio rápido](quick-start.md), agregue las siguientes líneas al archivo `main.js`:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)
})
```

Después de lanzar la aplicación Electron, pulse en el título con la tecla `Command` o `Control` presionada. Deberías ver la ventana emergente con el archivo que acabas de definir:

![Archivo representado](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
