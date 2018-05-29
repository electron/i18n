# Menggunakan Widevine CDM Plugin

Di Elektron Anda dapat menggunakan plugin Widevine CDM yang dikirimkan bersama browser Chrome.

## Mendapatkan plugin

Elektron tidak disertakan dengan plugin Widevine CDM karena alasan lisensi, untuk mendapatkan ini, Anda perlu menginstal browser Chrome resmi terlebih dahulu, yang seharusnya cocok arsitektur dan versi Chrome dari Elektron yang Anda gunakan.

**Catatan:** Versi utama browser Chrome harus sama dengan Chrome Versi yang digunakan oleh Electron, jika tidak plugin tidak akan bekerja sekalipun `navigator.plugins` akan menunjukkannya telah dimuat.

### Windows & macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` adalah lokasi sistem untuk menyimpan data aplikasi, pada Windows itu `%LOCALAPPDATA%`, di macos itu `~/Library/Application Support`. `VERSION` adalah Versi versi plugin plugin Widevine, seperti `1.4.8.866`. `PLATFORM` adalah `mac` atau `menang`. `ARCH`adalah`x86`atau`x64`.

Pada Windows, binari yang dibutuhkan adalah `widevinecdm.dll` dan `widevinecdmadapter.dll`, di mac Osmereka adalah`libwidevinecdm.dylib` dan `wid vinecdmada ter.plugin`. Anda bisa menyalinnya ke manapun Anda suka, tapi mereka harus disatukan.

### Linux

Di Linux binari plugin dikirimkan bersamaan dengan browser Chrome, Anda bisa temukan di bawah `/opt/google/chrome`, nama filenya adalah`libwidevinecdm.so` dan `libwidevinecdmadapter.so`.

## Menggunakan plugin

Setelah mendapatkan file plugin, Anda harus melewati jalur `widevinecdmadapter`ke Elektron dengan `-widevine-cdm-path` tombol perintah, dan pluginnya versi dengan `-widevine-cdm-version` switch.

**Catatan:** Meskipun hanya binari `widevinecdmadapter` yang dikirimkan ke Elektron, `widevinecdm` biner harus dikesampingkan.

Sakelar perintah harus dilewatkan sebelum `siap`acara`aplikasi` modul akan dipancarkan, dan halaman yang menggunakan plugin ini harus memiliki plugin diaktifkan.

Contoh kode:

```javascript
const {app, BrowserWindow} = membutuhkan('elektron')

// Anda harus melewati nama file `widevinecdmadapter` di sini
// * `widevinecdmadapter.plugin` di macos,
// * `libwidevinecdmadapter.so` di Linux,
// * `widevinecdmadapter.dll` di Windows.
app.commandLine.appendSwitch ('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// Versi plugin bisa didapat dari halaman `chrome://plugins` di Chrome.
app.commandLine.appendSwitch ('widevine-cdm-version', '1.4.8.8.86')

biarkan menang = nol
app.on ('siap', () = > {
  win = new BrowserWindow ({
    webPreferences: {
      // Plugin `` harus diaktifkan.
      plugin: benar
    }
  })
  win.show()
})
```

## Memeriksa plugin

Untuk memverifikasi apakah plugin berhasil, Anda dapat menggunakan cara berikut:

* Buka devtools dan periksa apakah `navigator.plugins` menyertakan Widevine Plugin CDM.
* Buka https://shaka-player-demo.appspot.com/ dan muat manifes yang digunakan `Widevine`.
* Buka http://www.dash-player.com/demo/drm-test-area/, periksa apakah halaman kata `bitdash menggunakan Widevine di browser Anda`, lalu putar video tersebut.