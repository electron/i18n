# Menggunakan Widevine CDM Plugin

Di Elektron Anda dapat menggunakan plugin Widevine CDM yang dikirimkan bersama browser Chrome.

## Mendapatkan plugin

Elektron tidak disertakan dengan plugin Widevine CDM karena alasan lisensi, untuk mendapatkan ini, Anda perlu menginstal browser Chrome resmi terlebih dahulu, yang seharusnya cocok arsitektur dan versi Chrome dari Elektron yang Anda gunakan.

**Catatan:** Versi utama browser Chrome harus sama dengan Chrome Versi yang digunakan oleh Electron, jika tidak plugin tidak akan bekerja sekalipun `navigator.plugins` akan menunjukkannya telah dimuat.

### Windows & macOS

Buka `chrome://components/` di browser Chrome, temukan `WidevineCdm` dan buat yakin itu up to date, maka Anda dapat menemukan semua plugin binari dari `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` direktori.

`APP_DATA` adalah lokasi sistem untuk menyimpan data aplikasi, pada Windows itu `%LOCALAPPDATA%`, di macos itu `~/Library/Application Support`. `VERSION` adalah Versi versi plugin plugin Widevine, seperti `1.4.8.866`. `PLATFORM` adalah `mac` atau `menang`. `ARCH`adalah`x86`atau`x64`.

Pada Windows, binari yang dibutuhkan adalah `widevinecdm.dll` dan `widevinecdmadapter.dll`, di mac Osmereka adalah`libwidevinecdm.dylib` dan `wid vinecdmada ter.plugin`. Anda bisa menyalinnya ke manapun Anda suka, tapi mereka harus disatukan.

### Linux

Di Linux binari plugin dikirimkan bersamaan dengan browser Chrome, Anda bisa temukan di bawah `/opt/google/chrome`, nama filenya adalah`libwidevinecdm.so` dan `libwidevinecdmadapter.so`.

## Menggunakan plugin

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

Example code:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  })
  win.show()
})
```

## Verifying the plugin

To verify whether the plugin works, you can use following ways:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.