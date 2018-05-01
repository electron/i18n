# Rilevamento di eventi online/offline

L'identificazione [Evento online ed offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) può essere implementata nel processo di rendering usando l'attributo [`navigatore.inLinea`](http://html5index.org/Offline%20-%20NavigatorOnLine.html), parte dell'API standard HTML5. The `navigator.onLine` attribute returns `false` if any network requests are guaranteed to fail i.e. definitely offline (disconnected from the network). It returns `true` in all other cases. Since all other conditions return `true`, one has to be mindful of getting false positives, as we cannot assume `true` value necessarily means that Electron can access the internet. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Esempio:

*main.js*

```javascript
const {app, BrowserWindow} = require('electron')

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

There may be instances where you want to respond to these events in the main process as well. The main process however does not have a `navigator` object and thus cannot detect these events directly. Using Electron's inter-process communication utilities, the events can be forwarded to the main process and handled as needed, as shown in the following example.

*main.js*

```javascript
const {app, BrowserWindow, ipcMain} = require('electron')
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
  const {ipcRenderer} = require('electron')
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