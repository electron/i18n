# Writing Your First Electron App

Elektron memungkinkan Anda untuk membuat aplikasi desktop dengan murni JavaScript dengan menyediakan runtime yang kaya asli (sistem operasi) api. Anda bisa melihatnya sebagai varian dari runtime Node.js yang difokuskan pada aplikasi desktop bukan server web.

Ini bukan berarti elektron mengikat JavaScript ke perpustakaan grafis antarmuka pengguna(GUI). Sebaliknya, elektron menggunakan halaman web sebagai GUI, sehingga Anda juga dapat melihatnya sebagai minimal Kromium browser, dikendalikan oleh JavaScript.

**Note**: This example is also available as a repository you can [download and run immediately](#trying-this-example).

As far as development is concerned, an Electron application is essentially a Node.js application. The starting point is a `package.json` that is identical to that of a Node.js module. A most basic Electron app would have the following folder structure:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Create a new empty folder for your new Electron application. Open up your command line client and run `npm init` from that very folder.

```sh
npm init
```

npm will guide you through creating a basic `package.json` file. The script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Memasang Elektron

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
peasangan npm --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Pengembangan Elektron dalam Singkatnya

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // dan memuat index.html dari aplikasi.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

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

## Menjalankan Aplikasi Anda

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).