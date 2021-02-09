# Detección de eventos online y Offline

## Descripción general

La detección de [Evento en línea y fuera de líena ](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) puede ser implementado en el Renderer process usando el atributo [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte de la API HTML5 estándar.

El atributo `navigator.onLine` devuelve:

* `false` if all network requests are guaranteed to fail (e.g. when disconnected from the network).
* `true` in all other cases.

Since many cases return `true`, you should treat with care situations of getting false positives, as we cannot always assume that `true` value means that Electron can access the Internet. For example, in cases when the computer is running a virtualization software that has virtual Ethernet adapters in "always connected" state. Therefore, if you want to determine the Internet access status of Electron, you should develop additional means for this check.

## Ejemplo

### Event detection in the Renderer process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

create the `online-status.html` file and add the following line before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

y añadir el archivo `rendererer.js`:

```javascript
const alertOnlineStatus = () => { window.alert(navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', alertOnlineStatus)
window.addEventListener('offline', alertOnlineStatus)

alertOnlineStatus()
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Online-offline-event detection](../images/online-event-detection.png)

### Event detection in the Main process

There may be situations when you want to respond to online/offline events in the Main process as well. The Main process, however, does not have a `navigator` object and cannot detect these events directly. In this case, you need to forward the events to the Main process using Electron's inter-process communication (IPC) utilities.

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

create the `online-status.html` file and add the following line before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

y añadir el archivo `rendererer.js`:

```javascript
const { ipcRenderer } = require('electron')
const updateOnlineStatus = () => { ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline') }

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

After launching the Electron application, you should see the notification in the Console:

```sh
npm start

> electron@1.0.0 start /electron
> electron .

online
```
