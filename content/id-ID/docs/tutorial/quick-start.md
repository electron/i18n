# Mulai Cepat

Elektron memungkinkan Anda untuk membuat aplikasi desktop dengan murni JavaScript dengan menyediakan runtime yang kaya asli (sistem operasi) api. Anda bisa melihatnya sebagai varian dari runtime Node.js yang difokuskan pada aplikasi desktop bukan server web.

Ini bukan berarti elektron mengikat JavaScript ke perpustakaan grafis antarmuka pengguna(GUI). Sebaliknya, elektron menggunakan halaman web sebagai GUI, sehingga Anda juga dapat melihatnya sebagai minimal Kromium browser, dikendalikan oleh JavaScript.

### Proses utama

Dalam elektron, proses yang menjalankan script `utama` `package.json` disebut **proses utama**. Script yang berjalan dalam proses utama dapat menampilkan GUI dengan menciptakan halaman web.

### Proses renderer

Sejak elektron menggunakan Kromium untuk menampilkan halaman web, Kromium di multi proses arsitektur juga digunakan. Setiap halaman web di elektron berjalan dalam proses sendiri, yang disebut **proses renderer**.

Di normal browser, halaman web biasanya menjalankan dalam lingkungan sandboxed dan tidak diperbolehkan akses ke sumber daya yang asli. Pengguna Elektron, namun, memiliki kekuatan untuk menggunakan api Node.js di halaman web yang memungkinkan interaksi tingkat sistem operasi yang lebih rendah.

### Perbedaan utama proses dan proses Renderer

Proses utama menciptakan halaman web dengan menciptakan contoh `BrowserWindow`. Setiap `BrowserWindow` berjalan halaman web dalam proses renderer sendiri. Ketika sebuah instance `BrowserWindow` hancur, proses renderer sesuai juga dihentikan.

Proses utama mengelola semua halaman web dan proses renderer mereka sesuai. Setiap proses renderer terisolasi dan hanya peduli tentang halaman web yang berjalan di dalamnya.

Di halaman web, memanggil native GUI terkait API tidak diperbolehkan karena mengelola sumber-daya GUI yang asli di halaman web ini sangat berbahaya dan sangat mudah untuk sumber daya kebocoran. Jika Anda ingin melakukan operasi GUI dalam halaman web, proses renderer laman web harus berkomunikasi dengan proses utama untuk meminta bahwa proses utama melakukan operasi tersebut.

Di elektron, kita memiliki beberapa cara untuk berkomunikasi antara proses utama dan proses renderer. Seperti [`ipcRenderer`](../api/ipc-renderer.md) dan [`ipcMain`](../api/ipc-main.md) modul untuk mengirim pesan, dan modul [remote](../api/remote.md) untuk gaya komunikasi RPC. Ada juga sebuah entri tentang FAQ [cara untuk berbagi data antara halaman web](../faq.md#how-to-share-data-between-web-pages).

## Menulis Aplikasi Elektron Pertama Anda

Umumnya, struktur aplikasi elektron seperti ini:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Format `package.json` sama seperti dari Node modul, dan skrip yang ditentukan oleh bidang `main` adalah skrip startup aplikasi Anda, yang akan menjalankan proses utama. Contoh `package.json` mungkin terlihat seperti ini:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Catatan**: Jika bidang `main` tidak ada dalam `package.json`, elektron akan mencoba untuk memuat `index.js`.

`main.js` akan membuat jendela dan menangani aktivitas sistem, contoh:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Simpan referensi global dari objek jendela, jika tidak, jendela akan menyala
// ditutup secara otomatis saat objek JavaScript adalah sampah yang dikumpulkan.
let win

function createWindow () {
  // Membuat jendela browser.
  win = new BrowserWindow({width: 800, height: 600})

  // dan memuat index.html dari aplikasi.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Buka devtool.
  win.webContents.openDevTools()

  // Emitted saat jendela tertutup.
  win.on('closed', () => {
    // Dereference objek jendela, biasanya anda akan menyimpan jendela
    // dalam array jika aplikasi Anda mendukung multi jendela, inilah waktunya
    // kapan kamu harus menghapus elemen yang sesuai.
    win = null
  })
}

// Metode ini akan dipanggil saat Elektron selesai
/ / mengisialisasi dan siap untuk membuat jendela browser.
// Beberapa API hanya dapat digunakan setelah event ini terjadi.
app.on('ready', createWindow)

// Keluar ketika semua jendela ditutup.
app.on('window-all-closed', () => {
  // Di macOS ini biasa digunakan untuk aplikasi dan menu bar
  // tetap aktif sampai pengguna keluar secara eksplisit menggunakan perintah Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Di macOS biasanya digunakan untuk membuat ulang jendela pada aplikasi ketika 
  // dock icon di klik dan tidak ada jendela lain disana.
  if (win === null) {
    createWindow()
  }
})

// Di file ini anda dapat menambahkan semua kode spesifik main process pada
// aplikasi. Anda juga dapat menempatkan dalam berkas terpisah dan menambahkannya di sini.
```

Akhirnya `index.html` adalah halaman web yang ingin Anda Tampilkan:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Jalankan aplikasi Anda

Setelah Anda telah membuat file `main.js`, `index.html` dan file `package.json`, Anda mungkin ingin mencoba menjalankan aplikasi anda secara lokal untuk menguji dan memastikan bahwa itu bekerja seperti yang diharapkan.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) adalah modul `npm` yang berisi versi pre-compiled elektron.

Jika Anda telah menginstall secara global dengan `npm`, maka Anda hanya akan perlu untuk menjalankan berikut dalam direktori source aplikasi Anda:

```bash
electron .
```

Jika Anda telah menginstal secara lokal, kemudian jalankan:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

    $ .\node_modules\.bin\electron .
    

### Mengunduh Binari Electron secara Manual

Jika Anda download elektron secara manual, Anda juga dapat menggunakan binari kode dan menyertakannya untuk menjalankan aplikasi Anda secara langsung.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

    $ .\electron\electron.exe your-app\
    

`Electron.app` di sini adalah bagian dari elektron paket rilis, Anda dapat men-download dari [sini](https://github.com/electron/electron/releases).

### Dijalankan sebagai sebuah distribusi

Setelah Anda selesai menulis aplikasi Anda, Anda dapat membuat sebuah distribusi dengan mengikuti panduan [Distribusi Aplikasi](./application-distribution.md) dan kemudian menjalankan app dikemas.

### Cobalah contoh ini

Clone dan jalankan kode dalam tutorial ini menggunakan repositori [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

**Catatan**: ini memerlukan [Git](https://git-scm.com) dan [Node.js](https://nodejs.org/en/download/) (termasuk [npm](https://npmjs.org)) pada sistem Anda.

```bash
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

Untuk contoh aplikasi lain, lihat [Daftar boilerplates](https://electron.atom.io/community/#boilerplates) yang diciptakan oleh masyarakat elektron yang mengagumkan.