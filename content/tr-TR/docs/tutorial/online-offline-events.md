# Çevrimiçi/Çevrimdışı Olay Algılama

[Online ve offline etkinlik](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) algılama, standart HTML5 API'sinin bir parçası olan [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) özelliğini kullanarak oluşturucu işleminde uygulanabilir. The `navigator.onLine` attribute returns `false` if any network requests are guaranteed to fail i.e. definitely offline (disconnected from the network). It returns `true` in all other cases. Since all other conditions return `true`, one has to be mindful of getting false positives, as we cannot assume `true` value necessarily means that Electron can access the internet. Bilgisayarda, her zaman "bağlı" olan sanal eternet bağdaştırıcılarına sahip bir sanallaştırma yazılımı çalıştırıldığı gibi durumlarda, gerçekten Electron'un internet erişim durumunu belirlemek istiyorsanız, kontrol için ek araçlar geliştirmelisiniz.

Örneğin:

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

There may be instances where you want to respond to these events in the main process as well. Bununla birlikte, ana süreç `navigator` nesnesine sahip değildir ve bu nedenle bu olayları doğrudan algılayamaz. Using Electron's inter-process communication utilities, the events can be forwarded to the main process and handled as needed, as shown in the following example.

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