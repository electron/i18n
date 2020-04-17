# dialog

> Tampilkan dialog sistem asli untuk membuka dan menyimpan file, mengingatkan, dll.

Proses: [Main](../glossary.md#main-process)

Contoh menampilkan dialog untuk memilih beberapa file dan direktori:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = membutuhkan ('elektron'). remote console.log (dialog)
```

## Methods

The ` dialog </ 0> modul memiliki metode berikut:</p>

<h3 spaces-before="0"><code>dialog.showOpenDialogSync([browserWindow, ]options)`</h3>

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * ` judul </ 0>  String (opsional)</li>
<li><code> default jalan</ 0>  String (opsional)</li>
<li><code> buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><p spaces-before="0"><code>properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:</p>
    * ` buka file </ 0> - Memungkinkan file dipilih.</li>
<li><code> buka direktorat </ 0> - Biarkan direktori dipilih.</li>
<li><code> multi pilihan</ 0> - Memungkinkan beberapa jalur untuk dipilih.</li>
<li><code>showHiddenFiles` - Tampilkan file tersembunyi dalam dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Ini tidak benar-benar membuat file di jalan tapi memungkinkan jalur yang tidak ada untuk dikembalikan yang harus dibuat oleh aplikasi.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `pesan` String (opsional) _macOS_ - Pesan untuk menampilkan kotak masukan di atas.
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.

Returns `String[] | undefined`, the file paths chosen by the user; if the dialog is cancelled it returns `undefined`.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Sebagai contoh:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Elemen `ekstensi` harus berisi ekstensi tanpa wildcard atau titik (misalnya `'png'` bagus tapi ` '. Png'` dan ` '*.png'` buruk). Untuk menampilkan semua file, gunakan wildcard `'*'` (tidak ada wildcard lain yang didukung).

**Catatan:** Pada Windows dan Linux, sebuah dialog terbuka tidak dapat berupa pemilih file dan pemilih direktori, jadi jika Anda menetapkan `properti` ke ` ['openFile', ' openDirectory ']` pada platform ini, pemilih direktori akan ditampilkan.

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * ` judul </ 0>  String (opsional)</li>
<li><code> default jalan</ 0>  String (opsional)</li>
<li><code> buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><p spaces-before="0"><code>properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:</p>
    * ` buka file </ 0> - Memungkinkan file dipilih.</li>
<li><code> buka direktorat </ 0> - Biarkan direktori dipilih.</li>
<li><code> multi pilihan</ 0> - Memungkinkan beberapa jalur untuk dipilih.</li>
<li><code>showHiddenFiles` - Tampilkan file tersembunyi dalam dialog.
    * `createDirectory` _macOS_ - Allow creating new directories from dialog.
    * `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. Ini tidak benar-benar membuat file di jalan tapi memungkinkan jalur yang tidak ada untuk dikembalikan yang harus dibuat oleh aplikasi.
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `pesan` String (opsional) _macOS_ - Pesan untuk menampilkan kotak masukan di atas.
  * `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Fungsi (opsional)

Returns `Promise<Object>` - Resolve wih an object containing the following:

* `canceled` Boolean - whether or not the dialog was canceled.
* `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. Sebagai contoh:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

Elemen `ekstensi` harus berisi ekstensi tanpa wildcard atau titik (misalnya `'png'` bagus tapi ` '. Png'` dan ` '*.png'` buruk). Untuk menampilkan semua file, gunakan wildcard `'*'` (tidak ada wildcard lain yang didukung).

**Catatan:** Pada Windows dan Linux, sebuah dialog terbuka tidak dapat berupa pemilih file dan pemilih direktori, jadi jika Anda menetapkan `properti` ke ` ['openFile', ' openDirectory ']` pada platform ini, pemilih direktori akan ditampilkan.

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * ` judul </ 0>  String (opsional)</li>
<li><code>defaultPath` String (opsional) - Jalur direktori absolut, path file absolut, atau nama file yang akan digunakan secara default.
  * ` buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><code>pesan` String (opsional) _macOS_ - Pesan untuk menampilkan teks di atas.
  * `nameFieldLabel` String (opsional) _macOS_ - Label khusus untuk teks yang ditampilkan di depan bidang teks nama file.
  * `showsTagField` Boolean (opsional) _macOS_ - Tampilkan kotak masukan tag, defaultnya `true`.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `String | undefined`, the path of the file chosen by the user; if the dialog is cancelled it returns `undefined`.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

Filter `` menentukan kumpulan jenis file yang dapat ditampilkan, lihat `dialog.showOpenDialog ` untuk sebuah contoh.

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * ` judul </ 0>  String (opsional)</li>
<li><code>defaultPath` String (opsional) - Jalur direktori absolut, path file absolut, atau nama file yang akan digunakan secara default.
  * ` buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><code>pesan` String (opsional) _macOS_ - Pesan untuk menampilkan teks di atas.
  * `nameFieldLabel` String (opsional) _macOS_ - Label khusus untuk teks yang ditampilkan di depan bidang teks nama file.
  * `showsTagField` Boolean (opsional) _macOS_ - Tampilkan kotak masukan tag, defaultnya `true`.
  * `securityScopedBookmarks` Boolean (optional) _macOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.

Returns `Promise<Object>` - Resolve with an object containing the following:
  * `canceled` Boolean - whether or not the dialog was canceled.
  * `filePath` String (optional) If the dialog is canceled this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

Filter `` menentukan kumpulan jenis file yang dapat ditampilkan, lihat `dialog.showOpenDialog ` untuk sebuah contoh.

**Note:** On macOS, using the asynchronous version is recommended to avoid issues when expanding and collapsing the dialog.

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `ketik` String (opsional) - Bisa jadi `"none"`, `"info"`, `"error"`, `"pertanyaan"` atau `"peringatan"`. Pada Windows, `"question"` menampilkan ikon yang sama dengan `"info"`, kecuali jika Anda menyetel ikon menggunakan opsi ` "icon" `. Pada macos, keduanya `"warning"` dan `"error"` menampilkan ikon peringatan yang sama.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opsional) - Indeks tombol pada susunan tombol yang akan dipilih secara default saat kotak pesan terbuka.
  * `title` String (opsional) - Judul kotak pesan, beberapa platform tidak akan menampilkannya.
  * `pesan` String - Isi kotak pesan.
  * `detail` String (opsional) - Informasi tambahan dari pesan.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `ikon` ([NativeImage](native-image.md) | String) (opsional)
  * `cancelId` Integer (opsional) - Indeks tombol yang akan digunakan untuk membatalkan dialog, melalui tombol `Esc`. Secara default ini diberikan ke tombol pertama dengan "cancel" atau "no" sebagai label. Jika tidak ada tombol berlabel seperti itu dan pilihan ini tidak diset, `0` akan digunakan sebagai nilai balik atau respons balik.
  * `noLink` Boolean (opsional) - Pada Windows Electron akan mencoba untuk mencari tahu dari mana `buttons` adalah tombol yang umum (seperti "Batal" atau "Ya"), dan menampilkan yang lain sebagai link perintah dalam dialog. Hal ini bisa membuat dialog tampil dengan gaya aplikasi Windows modern . Jika Anda tidak menyukai perilaku ini, Anda dapat mengatur `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (opsional) - Menormalisasi tombol akses keyboard. Defaultnya adalah ` false </ 0> . Mengaktifkan asumsi ini <code>&` digunakan pada label tombol untuk penempatan tombol akses pintas keyboard dan label akan dikonversi sehingga bekerja dengan benar pada setiap platform, `&` karakter dihapus di macos, dikonversi ke `_` di Linux, dan tidak tersentuh pada Windows. Misalnya, label tombol `Vie&w` akan dikonversi ke `Vie_w` di Linux dan ` View ` di macos dan dapat dipilih melalui `Alt-W` pada Windows dan Linux.

Returns `Integer` - the index of the clicked button.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `ketik` String (opsional) - Bisa jadi `"none"`, `"info"`, `"error"`, `"pertanyaan"` atau `"peringatan"`. Pada Windows, `"question"` menampilkan ikon yang sama dengan `"info"`, kecuali jika Anda menyetel ikon menggunakan opsi ` "icon" `. Pada macos, keduanya `"warning"` dan `"error"` menampilkan ikon peringatan yang sama.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (opsional) - Indeks tombol pada susunan tombol yang akan dipilih secara default saat kotak pesan terbuka.
  * `title` String (opsional) - Judul kotak pesan, beberapa platform tidak akan menampilkannya.
  * `pesan` String - Isi kotak pesan.
  * `detail` String (opsional) - Informasi tambahan dari pesan.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `ikon` [NativeImage](native-image.md) (opsional)
  * `cancelId` Integer (opsional) - Indeks tombol yang akan digunakan untuk membatalkan dialog, melalui tombol `Esc`. Secara default ini diberikan ke tombol pertama dengan "cancel" atau "no" sebagai label. Jika tidak ada tombol berlabel seperti itu dan pilihan ini tidak diset, `0` akan digunakan sebagai nilai balik atau respons balik.
  * `noLink` Boolean (opsional) - Pada Windows Electron akan mencoba untuk mencari tahu dari mana `buttons` adalah tombol yang umum (seperti "Batal" atau "Ya"), dan menampilkan yang lain sebagai link perintah dalam dialog. Hal ini bisa membuat dialog tampil dengan gaya aplikasi Windows modern . Jika Anda tidak menyukai perilaku ini, Anda dapat mengatur `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (opsional) - Menormalisasi tombol akses keyboard. Defaultnya adalah ` false </ 0> . Mengaktifkan asumsi ini <code>&` digunakan pada label tombol untuk penempatan tombol akses pintas keyboard dan label akan dikonversi sehingga bekerja dengan benar pada setiap platform, `&` karakter dihapus di macos, dikonversi ke `_` di Linux, dan tidak tersentuh pada Windows. Misalnya, label tombol `Vie&w` akan dikonversi ke `Vie_w` di Linux dan ` View ` di macos dan dapat dipilih melalui `Alt-W` pada Windows dan Linux.

Returns `Promise<Object>` - resolves with a promise containing the following properties:
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Shows a message box, it will block the process until the message box is closed.

Argumen `browserWindow` memungkinkan dialog untuk menempel pada jendela induk, membuatnya menjadi modal.

### `dialog.showErrorBox(judul, konten)`

* `title` String - Judul yang akan ditampilkan di kotak kesalahan.
* `content` String - Isi teks untuk ditampilkan di kotak kesalahan.

Menampilkan dialog modal yang menunjukkan pesan kesalahan.

API ini dapat dipanggil dengan aman sebelum `siap` acara yang digunakan aplikasi `app`, biasanya digunakan untuk melaporkan kesalahan pada tahap awal startup. Jika dipanggil sebelum acara aplikasi `siap` di Linux, pesan akan dipancarkan ke stderr, dan tidak ada dialog GUI yang akan muncul.

### `dialog.showCertificateTrustDialog ([browserWindow,] options, callback)` _ macos _ _ Windows _

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `sertifikat` [Sertifikat](structures/certificate.md) - Sertifikat untuk dipercaya/diimpor.
  * `pesan` String - Pesan untuk ditampilkan kepada pengguna.
* `callback ` Fungsi

Di macos , ini menampilkan dialog modal yang menampilkan informasi pesan dan sertifikat, dan memberi pengguna pilihan untuk mempercayai / mengimpor sertifikat. Jika Anda memberikan argumen `browserWindow`, dialog akan dilampirkan ke jendela induk, membuatnya menjadi modal.

Pada Windows pilihannya lebih terbatas, karena API Win32 digunakan:

* Argumen `pesan` tidak digunakan, karena OS menyediakan dialog konfirmasinya sendiri.
* Argumen `browserWindow` diabaikan karena tidak mungkin membuat modal dialog konfirmasi ini.

**[Deprecated Soon](modernization/promisification.md)**

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object
  * `sertifikat` [Sertifikat](structures/certificate.md) - Sertifikat untuk dipercaya/diimpor.
  * `pesan` String - Pesan untuk ditampilkan kepada pengguna.

Returns `Promise<void>` - resolves when the certificate trust dialog is shown.

Di macos , ini menampilkan dialog modal yang menampilkan informasi pesan dan sertifikat, dan memberi pengguna pilihan untuk mempercayai / mengimpor sertifikat. Jika Anda memberikan argumen `browserWindow`, dialog akan dilampirkan ke jendela induk, membuatnya menjadi modal.

Pada Windows pilihannya lebih terbatas, karena API Win32 digunakan:

* Argumen `pesan` tidak digunakan, karena OS menyediakan dialog konfirmasinya sendiri.
* Argumen `browserWindow` diabaikan karena tidak mungkin membuat modal dialog konfirmasi ini.

## Lembar

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

Anda dapat memanggil `BrowserWindow.getCurrentWindow (). SetSheetOffset (offset)` untuk mengubah offset dari bingkai jendela tempat lembaran dilekatkan.
