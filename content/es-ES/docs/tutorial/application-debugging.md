# Aplicación de Depuración

Cada vez que su aplicación de Electron no se comporta de la manera que desea, una variedad de herramientas de depuración pueden ayudarte a encontrar errores de codificación, embotellamiento de rendimiento, u oportunidades de optimización.

## Proceso de Renderización

La herramienta mas completa para depurar un proceso visualizador individualmente es el Chromium Developer Toolset. Está disponible para todos los procesos visualizador, incluyendo casos de `BrowserWindow`, `BrowserView`, y `WebView`. Puedes abrirlos mediante programación usando el API `openDevTools()` en el `webContents` de la instancia:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google ofrece [documentación excelente para sus herramientas de desarrollo](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Proceso Principal

Depurando el proceso principal es un poco complicado, desde que no se puede simplemente abrir herramientas de desarrollo para ello. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).