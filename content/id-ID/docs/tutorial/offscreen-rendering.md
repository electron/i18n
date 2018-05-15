# Rendering di luar layar

Perenderan di luar layar memungkinkan Anda mendapatkan konten jendela browser dalam bitmap, sehingga dapat ditampilkan di mana saja, misalnya pada tekstur dalam adegan 3D. Perenderan offscreen di Electron menggunakan pendekatan serupa dari proyek  Chromium Embedded Framework </ 0> .</p> 

Dua mode rendering dapat digunakan dan hanya daerah kotor dilewatkan dalam ` 'cat' </ 0>  acara untuk menjadi lebih efisien. Perenderan bisa dihentikan, dilanjutkan dan frame rate bisa diatur. Frame rate yang ditentukan adalah nilai batas atas, bila tidak ada yang terjadi pada halaman web, tidak ada frame yang dihasilkan. The
maximum frame rate is 60, because above that there is no benefit, only
performance loss.</p>

<p><strong> Catatan: </ 0> Sebuah jendela offscreen selalu dibuat sebagai <a href="../api/frameless-window.md"> Frameless Jendela </ 1> .</p>

<h2>Rendering Modes</h2>

<h3>GPU dipercepat</h3>

<p>GPU accelerated rendering berarti GPU digunakan untuk komposisi. Karena itu frame harus disalin dari GPU yang membutuhkan kinerja lebih banyak, sehingga mode ini agak sedikit lebih lambat dari yang lain. Manfaat mode inilah animasi WebGL dan 3D CSS didukung.</p>

<h3>Perangkat output perangkat lunak</h3>

<p>Mode ini menggunakan perangkat output perangkat lunak untuk rendering di CPU, sehingga generasi frame jauh lebih cepat, sehingga mode ini lebih disukai daripada yang dipercepat GPU.</p>

<p>Untuk mengaktifkan mode ini akselerasi GPU harus dinonaktifkan dengan memanggil
 API <a href="../api/app.md#appdisablehardwareacceleration"><code> app.disableHardwareAcceleration () </ 0>  .</p>

<h2>Pemakaian</h2>

<pre><code class="javascript">const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
`</pre>