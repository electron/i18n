# Ringkasan

> Cara menggunakan API Node.js dan Elektron.

Semua modul built-in Node.js </ 0> tersedia di Elektron dan modul simpul pihak ketiga juga didukung sepenuhnya (termasuk  modul asli </ 1>).</p> 

Elektron juga menyediakan beberapa modul built-in tambahan untuk pengembangan native aplikasi desktop Beberapa modul hanya tersedia dalam proses utama, beberapa hanya tersedia dalam proses renderer (halaman web), dan beberapa dapat digunakan masuk keduanya proses.

Aturan dasarnya adalah: jika sebuah modul  GUI </ 0> atau sistem tingkat rendah terkait, maka seharusnya hanya tersedia dalam proses utama. You need to be familiar with the concept of main process vs. proses renderer </ 0> skrip untuk bisa menggunakan modul tersebut.</p> 

The main process script is like a normal Node.js script:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

Proses renderer tidak berbeda dengan halaman web biasa, kecuali untuk kemampuan ekstra untuk menggunakan modul simpul:

```html
& lt; DOCTYPE html & gt;
&lt;html&gt;
&lt;body&gt;
&lt;script&gt;
  const {app} = membutuhkan ('elektron'). remote
  console.log (app.getVersion ())
</ 2>
</ 1>
</ 0>
```

To run your app, read [Run your app](../tutorial/first-app.md#running-your-app).

## Penataan ulang tugas

Pada 0,37, Anda bisa menggunakannya  tugas destruksi </ 0> agar lebih mudah digunakan modul built-in</p> 

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Jika Anda memerlukan modul ` elektron </ 0>, Anda dapat meminta dan kemudian menggunakannya
destrukturisasi untuk mengakses modul individual dari <code> elektron </ 0>.</p>

<pre><code class="javascript">const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```