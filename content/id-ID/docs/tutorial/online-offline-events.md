# Deteksi Peristiwa Online / Offline

[Deteksi kejadian online dan offline](https://developer.mozilla.org/en-US/docs/Online_and_offline_events)dapat diimplementasikan dalam proses perenderer dengan menggunakan atribut [`navigator.onLine `](http://html5index.org/Offline%20-%20NavigatorOnLine.html), bagian dari API HTML5 standar. Atribut `navigator.onLine` mengembalikan `false` jika jaringan apapun permintaan dijamin gagal yaitu pasti offline (terputus dari jaringan). Mengembalikan `true` dalam semua kasus lain. Karena semua kondisi lain kembali `benar`, kita harus memperhatikan positif palsu, karena kita tidak dapat mengasumsikan nilai `benar` berarti Electron dapat mengakses internet. Seperti dalam kasus di mana komputer menjalankan perangkat lunak virtualisasi yang memiliki adapter ethernet virtual yang selalu "terhubung." Karena itu, jika Anda benar-benar ingin menentukan status akses internet Elektron, Anda harus mengembangkan cara tambahan untuk pengecekan.

Contoh:

*main.js*

```javascript
const { app, BrowserWindow } = membutuhkan('electron')

biarkan onlineStatusWindow

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

Mungkin ada kejadian di mana Anda ingin menanggapi kejadian ini di Proses utama juga. Proses utama bagaimanapun tidak memiliki `navigator` dan dengan demikian tidak dapat mendeteksi kejadian ini secara langsung. Menggunakan Perangkat komunikasi inter-proses Elektron, acara dapat diteruskan ke proses utama dan ditangani sesuai kebutuhan, seperti yang ditunjukkan pada contoh berikut.

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