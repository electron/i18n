# Online/Offline Ereigniserkennung

[Erkennung von Online- und Offline-Ereignis](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) kann im Renderer-Prozess mit dem [`Navigator implementiert werden. nZeile`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) Attribut, Teil der Standard HTML5 API. Das `navigator.onLine` Attribut gibt `false` zurück, wenn Netzwerkanfragen garantiert fehlschlagen, d.h. definitiv offline (getrennt vom Netzwerk). Es gibt `true` in allen anderen Fällen zurück. Da alle anderen Bedingungen `true`zurückgeben, muss man auf falsche Positive achten, da wir nicht annehmen können, dass `true` Wert notwendigerweise bedeutet, dass Electron auf das Internet zugreifen kann. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Beispiel:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

lassen Sie onlineStatusFenster

app.whenReady().then(() => {
  onlineStatusFenster = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online', alertOnlineStatus)
  window.addEventListener('offline', alertOnlineStatus)

  alertOnlineStatus()
</script>

</body>
</html>
```

Es kann auch Instanzen geben, in denen Sie auf diese Ereignisse im Hauptprozess reagieren möchten. Der Hauptprozess hat jedoch kein `Navigator` Objekt und kann diese Ereignisse daher nicht direkt erkennen. Verwende die Kommunikationswerkzeuge von Electronic zwischen Prozessen die Ereignisse können an den Hauptprozess weitergeleitet und bei Bedarf bearbeitet werden, wie im folgenden Beispiel gezeigt.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
lassen Sie onlineStatusFenster

app.whenReady(). hen(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, zeigen: falsch, webEinstellungen: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<! OCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer. end('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()
</script>

</body>
</html>
```
