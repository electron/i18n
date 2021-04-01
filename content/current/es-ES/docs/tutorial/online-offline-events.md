# Detección de eventos online y Offline

## Descripción general

La detección de [Evento en línea y fuera de líena ](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) puede ser implementado en el Renderer process usando el atributo [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte de la API HTML5 estándar.

El atributo `navigator.onLine` devuelve:

* `false` si todas la solicitudes de red están garantizada para fallar (p.ej. cuando se desconecta de la red).
* `true` en todo los otros casos.

Since many cases return `true`, you should treat with care situations of getting false positives, as we cannot always assume that `true` value means that Electron can access the Internet. Por ejemplo, en casos cuando la computadora esta corriendo un programa de virtualización que tiene un adaptador Ethernet virtual en estado "siempre conectado". Por lo tanto, si quieres determinar el estado de la conexión a Internet de Electron, deberías desarrollar una manera adicional para comprobar esto.

## Ejemplo

### Detección de eventos en el Renderer process

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)
})
```

en el archivo `index.html`, agregar la siguiente linea antes de la etiqueta de cierre `</body>`:

```html
<script src="renderer.js"></script>
```

y añadir el archivo `rendererer.js`:

```javascript fiddle='docs/fiddles/features/online-detection/renderer'
const alertOnlineStatus = () => { window.alert(navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Detección de eventos online-offline](../images/online-event-detection.png)

### Detección de eventos en el Main process

Puede haber situaciones cuando quieras responder a eventos online/offline en el Main process también. El Main process, sin embargo, no tiene un objeto `navigator` y no puede detectar estos eventos directamente. En este caso, necesitas reenviar los eventos al Main process usando la utilidad inter-process comunication (IPC).

Comenzando con una aplicación funcionando desde [Guía de Inicio Rápido](quick-start.md), actualiza el archivo `main.js` con las siguiente lineas:

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

en el archivo `index.html`, agregar la siguiente linea antes de la etiqueta de cierre `</body>`:

```html
<script src="renderer.js"></script>
```

y añadir el archivo `rendererer.js`:

```javascript fiddle='docs/fiddles/features/online-detection/main'
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => { ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Después de lanzar la aplicación Electron, deberías ver la notificación en la Consola:

```sh
npm start

> electron@1.0.0 start /electron
> electron .

online
```
