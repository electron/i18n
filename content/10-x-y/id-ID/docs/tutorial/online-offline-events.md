# Deteksi Peristiwa Online / Offline

[Deteksi kejadian online dan offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events)dapat diimplementasikan dalam proses perenderer dengan menggunakan atribut [`navigator.onLine `](http://html5index.org/Offline%20-%20NavigatorOnLine.html), bagian dari API HTML5 standar. Atribut `navigator.onLine` mengembalikan `false` jika jaringan apapun permintaan dijamin gagal yaitu pasti offline (terputus dari jaringan). Mengembalikan `true` dalam semua kasus lain. Karena semua kondisi lain kembali `benar`, kita harus memperhatikan positif palsu, karena kita tidak dapat mengasumsikan nilai `benar` berarti Electron dapat mengakses internet. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Contoh:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
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

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

Mungkin ada kejadian di mana Anda ingin menanggapi kejadian ini di Proses utama juga. Proses utama bagaimanapun tidak memiliki `navigator` dan dengan demikian tidak dapat mendeteksi kejadian ini secara langsung. Menggunakan Perangkat komunikasi inter-proses Elektron, acara dapat diteruskan ke proses utama dan ditangani sesuai kebutuhan, seperti yang ditunjukkan pada contoh berikut.

_main.js_

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

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```
