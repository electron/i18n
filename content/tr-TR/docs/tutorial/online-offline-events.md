# Çevrimiçi/Çevrimdışı Olay Algılama

[Online ve offline etkinlik](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) algılama, standart HTML5 API'sinin bir parçası olan [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) özelliğini kullanarak oluşturucu işleminde uygulanabilir. Herhangi bir ağ isteğinin başarısız olması garantileniyorsa, yani kesinlikle çevrimdışıysa (ağ bağlantısının kesilmesi) `navigator.onLine` özelliği, `false` olarak döner. Tüm diğer durumlarda `true` olarak döner. Diğer tüm koşullar `true` olarak döndüğünden, yanlış pozitiflik almamak için dikkatli olmalısınız, çünkü `true` değerinin Electron'un kesinlikle internete eriştiğine kanaat getiremeyiz. Bilgisayarda, her zaman "bağlı" olan sanal eternet bağdaştırıcılarına sahip bir sanallaştırma yazılımı çalıştırıldığı gibi durumlarda, gerçekten Electron'un internet erişim durumunu belirlemek istiyorsanız, kontrol için ek araçlar geliştirmelisiniz.

Örnek:

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

Ana süreçteki bu olaylara da cevap vermek istediğiniz durumlar olabilmektedir. Bununla birlikte, ana süreç `navigator` nesnesine sahip değildir ve bu nedenle bu olayları doğrudan algılayamaz. Takip eden örnekte gösterildiği gibi, Electron'un süreçler arası iletişim araçları kullanılarak, olaylar ana işleme iletilebilir ve gerekirse ele alınır.

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