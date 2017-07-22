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
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

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

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```bash
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```bash
$ ./node_modules/.bin/electron .
```

#### Windows

```bash
$ .\node_modules\.bin\electron .
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```bash
$ ./electron/electron your-app/
```

#### Windows

```bash
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

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

For more example apps, see the [list of boilerplates](https://electron.atom.io/community/#boilerplates) created by the awesome electron community.