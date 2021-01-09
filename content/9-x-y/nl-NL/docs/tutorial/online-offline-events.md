# Online/Offline evenement detectie

[Online en offline event](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) detectie kan worden geïmplementeerd in het renderer-proces met de [`navigator. nLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) attribuut, onderdeel van de standaard HTML5 API. Het `navigator.onLine` attribuut geeft `onwaar` als alle netwerkverzoeken gegarandeerd mislukken (bijvoorbeeld absoluut offline (verbinding met het netwerk verbroken). Het geeft in alle andere gevallen `waar` terug. Aangezien alle andere voorwaarden `waar`terugkomen, moet men er rekening mee houden dat men valse positieve punten krijgt. omdat we niet ervan uit kunnen gaan dat `'waar'` waarde automatisch betekent dat Electron toegang heeft tot het internet. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Voorbeeld:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusVenster

app.whenReady().then(() => {
  onlineStatusVenster = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`:/file/${__dirname}/online-status.html`)
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

Er kunnen voorbeelden zijn waar u wilt reageren op deze gebeurtenissen in het hoofdproces. Het hoofdproces heeft echter geen `navigator` object en kan deze gebeurtenissen dus niet direct detecteren. Gebruik Elektron's interprocess communicatie hulpmiddelen, de evenementen kunnen worden doorgestuurd naar het hoofdproces en waar nodig worden behandeld, zoals blijkt uit het volgende voorbeeld.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
laat onlineStatusVenster

app.whenReady(). hen(() => {
  onlineStatusVenster = new BrowserWindow({ breedte: 0, hoogte: 0, toon: onwaar, webVoorkeuren: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

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
