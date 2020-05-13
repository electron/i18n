# Ekstensi DevTools

Elektron mendukung [Ekstensi DevTools Chrome](https://developer.chrome.com/extensions/devtools), yang dapat digunakan untuk memperluas kemampuan devtools untuk debugging kerangka web populer.

## Cara memuat ekstensi DevTools

Dokumen ini menjelaskan proses untuk secara manual memuat ekstensi. Anda juga dapat mencoba [elektron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), alat pihak ketiga yang mengunduh ekstensi langsung dari Chrome WebStore.

Untuk memuat ekstensi elektron, Anda perlu mengunduh di peramban Chrome, gunakan path filesystem, dan kemudian muat dengan memanggil API `BrowserWindow.addDevToolsExtension(extension)`.

Menggunakan [Alat-alat pengembang React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) sebagai contoh:

1. Menginstal di peramban Chrome.
1. Navigasikan ke `chrome://extensions`, dan cari ID ekstensi, yang merupakan hash string seperti `fmkadmapgofadopljbjfkapdkoienihi`.
1. Cari lokasi filesystem yang digunakan oleh Chrome untuk menyimpan ekstensi:
   * pada Windows berada di `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * pada Linux bisa berada di:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * pada macOS berada di `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**Catatan:** `BrowserWindow.addDevToolsExtension` API tidak disebut sebelum event siap saat modul app dibunyikan.

The extension will be remembered so you only need to call this API once per extension. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

### How to remove a DevTools Extension

You can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to remove it. The name of the extension is returned by `BrowserWindow.addDevToolsExtension` and you can get the names of all installed DevTools Extensions using the `BrowserWindow.getDevToolsExtensions` API.

## Dukungan Ekstensi DevTool

Elektron hanya mendukung seperangkat terbatas API `chrome.*`, sehingga beberapa ekstensi yang menggunakan tidak mendukung API `chrome.*` untuk fitur ekstensi chrome mungkin tidak bekerja. Ekstensi Devtools berikut diuji dan dijamin bekerja di elektron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Munculkan Alat Pengembang](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Apa yang harus saya lakukan jika Ekstensi DevTools tidak bekerja?

Pertama pastikan ekstensi tetap dikelola, beberapa ekstensi bahkan tidak bisa bekerja untuk versi terbaru dari Chrome browser, dan kita tidak mampu melakukan apa pun untuk mereka.

Kemudian mengajukan bug di Daftar persoalan elektron 's, dan menjelaskan bagian mana dari ekstensi tidak bekerja seperti yang diharapkan.
