# Detección de eventos online y Offline

La detección de [eventos en linea y fuera de ella](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) puede ser implementada en el proceso de renderización usando el atributo [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte de la HTML5 API estándar. El atributo `navigator.onLine` devuelve `falso` si cualquier solicitud de red están garantizadas a fallar i.e. definitivamente fuera de linea (desconectado de la red). Devuelve `verdad` en cualquier otro caso. Debido a que todas las otras condiciones devuelven `true`, uno tiene que estar al tanto de obtener falsos positivos, debido a que no podemos asumir que el valor `true` necesariamente significa que Electron puede acceder a Internet. Tal como en los casos en que la computadora ejecuta un software de virtualización que tiene adaptadores de Ethernet virtuales que siempre están "conectados". Por lo tanto, si realmente desea determinar el estado de acceso a Internet de Electron, debe desarrollar medios adicionales para verificar.

Ejemplo:

*main.js*

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

*online-status.html*

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

Puede haber casos en los que desee responder a estos eventos en el proceso principal también. Sin embargo, el proceso principal no tiene un objeto `navigator`, y por lo tanto no puede detectar estos eventos directamente. Usando utilidades de comunicación entre procesos del Electron, los acontecimientos pueden remitió al proceso principal y manejados según sea necesario, como se muestra en el ejemplo siguiente.

*main.js*

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

*online-status.html*

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline',  updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```