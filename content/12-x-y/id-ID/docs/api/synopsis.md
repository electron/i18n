# Ringkasan

> Cara menggunakan API Node.js dan Elektron.

Semua modul built-in Node.js </ 0> tersedia di Elektron dan modul simpul pihak ketiga juga didukung sepenuhnya (termasuk modul asli </ 1>).</p> 

Elektron juga menyediakan beberapa modul built-in tambahan untuk pengembangan native aplikasi desktop Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

Aturan dasarnya adalah: jika sebuah modul  GUI </ 0> atau sistem tingkat rendah terkait, maka seharusnya hanya tersedia dalam proses utama. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.</p> 

The main process script is like a normal Node.js script:



```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```


The renderer process is no different than a normal web page, except for the extra ability to use node modules if `nodeIntegration` is enabled:



```html
<!DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```


Untuk menjalankan aplikasi Anda, baca  Jalankan aplikasi Anda </ 0>.</p> 



## Penataan ulang tugas

Pada 0,37, Anda bisa menggunakannya  tugas destruksi </ 0> agar lebih mudah digunakan modul built-in</p> 



```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```


Jika Anda memerlukan modul ` elektron </ 0>, Anda dapat meminta dan kemudian menggunakannya
destrukturisasi untuk mengakses modul individual dari <code> elektron </ 0>.</p>

<pre><code class="javascript">const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
`</pre> 

Ini setara dengan kode berikut:



```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```
