# Menggunakan Pepper Flash Plugin

Elektron mendukung plugin Pepper Flash. Untuk menggunakan plugin Pepper Flash di Elektron, Anda harus secara manual menentukan lokasi plugin Pepper Flash dan kemudian mengaktifkannya di aplikasi Anda.

## Mempersiapkan salinan Flash Plugin

Di macos dan Linux, rincian plugin Pepper Flash dapat ditemukan oleh navigasikan ke ` chrome: // plugins ` di browser Chrome. Lokasi dan versinya berguna untuk dukungan Flash pepper Elektron. Anda juga bisa menyalinnya ke lokasi yang lain.

## Tambahkan Sakelar Elektronika

Anda bisa langsung menambahkan ` - ppapi-flash-path </ 0> dan <code> - ppapi-flash-version </ 0> ke
Baris perintah elektron atau dengan menggunakan metode <code> app.commandLine.appendSwitch </ 0>
sebelum acara app dimulai. Juga, aktifkan <code> plugin ` pilihan ` BrowserWindow `.

For example:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
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

You can also try loading the system wide Pepper Flash plugin instead of shipping the plugins yourself, its path can be received by calling `app.getPath('pepperFlashSystemPlugin')`.

## Enable Flash Plugin in a `<webview>` Tag

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## Penyelesaian masalah

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).