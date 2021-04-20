# Depuración de la aplicación

Cada vez que su aplicación de Electron no se comporta de la manera que desea, una variedad de herramientas de depuración pueden ayudarte a encontrar errores en el código, rendimiento, u oportunidades de optimización.

## Proceso de Renderización

La herramienta mas completa para depurar un proceso de renderización individualmente son las Chromium Developer Tools. Está disponible para todos los procesos de renderización, incluyendo `BrowserWindow`, `BrowserView`, y `WebView`. Puedes abrirla programáticamente usando la API `openDevTools()` de la instancia de `webContents`:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google ofrece [documentación excelente para sus herramientas de desarrollo][devtools]. Recomendamos que se familiarice con ello - son una de las utilidades más versátiles para cualquier desarrollador de aplicaciones de Electron.

## Proceso Principal

La depuración del proceso principal es un poco más complicada, porque en este caso no se pueden abrir las Developer Tools. Las Chromium Developer Tools pueden [ser usadas para depurar el proceso principal de Electron][node-inspect] gracias a una colaboración cercana entre Google / Chrome y Node.js, pero puede encontrar obstáculos como la ausencia de `require` en la consola.

Para mas información, vea la [documentación de Depurando el Proceso Principal][main-debug].

## Fallos en V8

Si el contexto V8 falla, las DevTools mostrarán este mensaje.

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Los registros de Chromium puden ser habilitados a través de la variable de entorno `ELECTRON_ENABLE_LOGGING`. Para más información, vea la [documentacion de variables de entorno](../api/environment-variables.md#electron_enable_logging).

Alternativamente, en la línea de comando puede usarse el argumento `--enable-logging`. Más información esta disponible en la [la documentación de parámetros de la línea de comando](../api/command-line-switches.md#--enable-logging).

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
