# Aplicación de Depuración

Cada vez que su aplicación de Electron no se comporta de la manera que desea, una variedad de herramientas de depuración pueden ayudarte a encontrar errores de codificación, embotellamiento de rendimiento, u oportunidades de optimización.

## Proceso de Renderización

La herramienta mas completa para depurar un proceso visualizador individualmente es el Chromium Developer Toolset. Está disponible para todos los procesos visualizador, incluyendo casos de `BrowserWindow`, `BrowserView`, y `WebView`. Puedes abrirlos mediante programación usando el API `openDevTools()` en el `webContents` de la instancia:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google ofrece [documentación excelente para sus herramientas de desarrollo](https://developer.chrome.com/devtools). Recomendamos que se familiarice con ello - son usualmente una de las utilidades más poderosas en cualquier cinturón de herramientas de un desarrollador Electron.

## Proceso Principal

La depuración del proceso principal es un poco más complicada, porque no se pueden abrir las developer tools en este caso. Las Herramientas de Desarrollo Chromium pueden [ser usadas para depurar el proceso principal de Electron](https://nodejs.org/en/docs/inspector/) gracias a una colaboración cercana entre Google / Chrome y Node.js, pero puede encontrar obstáculos como un `require` no presente en la consola.

Para mas información, ve el [Depurando la documentación de proceso principal](./debugging-main-process.md).

## V8 Crashes

If the V8 context crashes, the DevTools will display this message.

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Chromium logs can be enabled via the `ELECTRON_ENABLE_LOGGING` environment variable. For more information, see the [environment variables documentation](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Alternatively, the command line argument `--enable-logging` can be passed. More information is available in the [command line switches documentation](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).