# Menggunakan Pepper Flash Plugin

Elektron mendukung plugin Pepper Flash. Untuk menggunakan plugin Pepper Flash di Elektron, Anda harus secara manual menentukan lokasi plugin Pepper Flash dan kemudian mengaktifkannya di aplikasi Anda.

## Mempersiapkan salinan Flash Plugin

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Lokasi dan versinya berguna untuk dukungan Flash pepper Elektron. Anda juga bisa menyalinnya ke lokasi yang lain.

## Tambahkan Sakelar Elektronika

Anda bisa langsung menambahkan ` - ppapi-flash-path </ 0> dan <code> - ppapi-flash-version </ 0> ke
Baris perintah elektron atau dengan menggunakan metode <code> app.commandLine.appendSwitch </ 0>
sebelum acara app dimulai. Juga, aktifkan <code> plugin ` pilihan ` BrowserWindow `.

Sebagai contoh:

```javascript
const { app, BrowserWindow } = membutuhkan ('elektron')
const path = require ('path')

// Tentukan jalur flash, seandainya itu ditempatkan di direktori yang sama dengan main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

Anda juga bisa mencoba memuat sistem plugin Pepper Flash yang luas alih-alih pengiriman plugin itu sendiri, jalannya bisa diterima dengan menelepon ` app.getPath ('pepperFlashSystemPlugin') `.

## Aktifkan Plugin Flash dalam `<webview>` Tag

Tambahkan atribut ` plugin ` ke tag `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Penyelesaian masalah

Anda dapat memeriksa apakah plugin Pepper Flash dimuat dengan memeriksa ` navigator.plugins ` di konsol devtools (walaupun Anda tidak dapat mengetahui apakah path plugin benar).

Arsitektur plugin Pepper Flash harus sesuai dengan yang dimiliki Electron. Pada Windows, Kesalahan umum adalah menggunakan plugin Flash versi 32bit melawan versi 64bit Elektron.

Pada Windows the path passed to `--ppapi-flash-path` harus menggunakan `` sebagai pembatas, menggunakan POSIX-style paths tidak akan bekerja.

Untuk beberapa operasi, seperti media streaming menggunakan RTMP, perlu memberikan izin yang lebih luas kepada berkas '`.swf `. Salah satu cara untuk mencapai ini, adalah dengan menggunakan [ nw-flash-trust ](https://github.com/szwacz/nw-flash-trust).