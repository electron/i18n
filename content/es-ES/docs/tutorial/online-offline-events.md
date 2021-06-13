# Tarjeta de crédito

## Descripción general

La detección de [Evento en línea y fuera de líena ](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) puede ser implementado en el Renderer process usando el atributo [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte de la API HTML5 estándar.

El atributo `navigator.onLine` devuelve:

* `false` si todas la solicitudes de red están garantizada para fallar (p.ej. cuando se desconecta de la red).
* `true` en todo los otros casos.

Since many cases return `true`, you should treat with care situations of getting false positives, as we cannot always assume that `true` value means that Electron can access the Internet. Por ejemplo, en casos cuando la computadora esta corriendo un programa de virtualización que tiene un adaptador Ethernet virtual en estado "siempre conectado". Por lo tanto, si quieres determinar el estado de la conexión a Internet de Electron, deberías desarrollar una manera adicional para comprobar esto.

## Ejemplo

Starting with an HTML file `index.html`, this example will demonstrate how the `navigator.onLine` API can be used to build a connection status indicator.

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Connection status: <strong id='status'></strong></h1>
    <script src="renderer.js"></script>
</body>
</html>
```

In order to mutate the DOM, create a `renderer.js` file that adds event listeners to the `'online'` and `'offline'` `window` events. The event handler sets the content of the `<strong id='status'>` element depending on the result of `navigator.onLine`.

```js title='renderer.js'
function updateOnlineStatus () {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()
```

Finally, create a `main.js` file for main process that creates the window.

```js title='main.js'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const onlineStatusWindow = new BrowserWindow({
    width: 400,
    height: 100
  })

  onlineStatusWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

Después de lanzar la aplicación Electron deberías ver la notificación:

![Connection status](../images/connection-status.png)

> Note: If you need to communicate the connection status to the main process, use the [IPC renderer](../api/ipc-renderer.md) API.
