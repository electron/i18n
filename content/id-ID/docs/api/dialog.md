# dialog

> Tampilkan dialog sistem asli untuk membuka dan menyimpan file, mengingatkan, dll.

Proses:  Utama </ 0></p> 

Contoh menampilkan dialog untuk memilih beberapa file dan direktori:

```javascript
const {dialog} = require ('electron') console.log (dialog.showOpenDialog ({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

Dialog dibuka dari thread utama Elektron. Jika Anda ingin menggunakan objek dialog dari proses renderer, ingatlah untuk mengaksesnya dengan menggunakan remote:

```javascript
const {dialog} = membutuhkan ('elektron'). remote console.log (dialog)
```

## Metode

The ` dialog </ 0> modul memiliki metode berikut:</p>

<h3><code>dialog.showOpenDialog ([browserWindow,] options [, callback])`</h3> 

* ` jendela browser </ 0> jendela Browser(opsional)</li>
<li><code>pilihan` Objek 
  * ` judul </ 0>  String (opsional)</li>
<li><code> default jalan</ 0>  String (opsional)</li>
<li><code> buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><code>properti` String [] (opsional) - Berisi fitur mana yang harus digunakan dialog. Nilai berikut didukung: 
    * ` buka file </ 0> - Memungkinkan file dipilih.</li>
<li><code> buka direktorat </ 0> - Biarkan direktori dipilih.</li>
<li><code> multi pilihan</ 0> - Memungkinkan beberapa jalur untuk dipilih.</li>
<li><code>showHiddenFiles` - Tampilkan file tersembunyi dalam dialog.
    * `createDirectory` - Biarkan membuat direktori baru dari dialog. *macOS*
    * `promptToCreate` - Prompt untuk pembuatan jika path file yang dimasukkan dalam dialog tidak ada. Ini tidak benar-benar membuat file di jalan tapi memungkinkan jalur yang tidak ada untuk dikembalikan yang harus dibuat oleh aplikasi. *Windows*
    * `noResolveAliases` - Nonaktifkan jalur alias otomatis (symlink) resolusi. Alias yang dipilih sekarang akan mengembalikan jalur alias alih-alih jalan sasaran mereka *macOS*
    * `treatPackageAsDirectory` - Treat packages, such as `.app` folders, as a directory instead of a file. *macOS*
  * `message` String (optional) *macOS* - Message to display above input boxes.
* `callback` Function (optional) 
  * `filePaths` String[] - An array of file paths chosen by the user

Returns `String[]`, an array of file paths chosen by the user, if the callback is provided it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. For example:

```javascript
{
  filters: [
    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
    {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Custom File Type', extensions: ['as']},
    {name: 'All Files', extensions: ['*']}
  ]
}
```

The `extensions` array should contain extensions without wildcards or dots (e.g. `'png'` is good but `'.png'` and `'*.png'` are bad). To show all files, use the `'*'` wildcard (no other wildcard is supported).

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* ` jendela browser </ 0> jendela Browser(opsional)</li>
<li><code>pilihan` Obyek 
  * ` judul </ 0>  String (opsional)</li>
<li><code>defaultPath` String (optional) - Absolute directory path, absolute file path, or file name to use by default.
  * ` buttonLabel </ 0>  String (opsional) - Label khusus untuk tombol konfirmasi, bila dibiarkan kosong, label default akan digunakan.</li>
<li><code> filter </ 0>  <a href="structures/file-filter.md"> FileFilter [] </ 1> (opsional)</li>
<li><code>message` String (optional) *macOS* - Message to display above text fields.
  * `nameFieldLabel` String (optional) *macOS* - Custom label for the text displayed in front of the filename text field.
  * `showsTagField` Boolean (optional) *macOS* - Show the tags input box, defaults to `true`.
* `callback` Function (optional) 
  * `filename` String

Returns `String`, the path of the file chosen by the user, if a callback is provided it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* ` jendela browser </ 0> jendela Browser(opsional)</li>
<li><code>pilihan` Obyek 
  * `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
  * `title` String (optional) - Title of the message box, some platforms will not show it.
  * `message` String - Content of the message box.
  * `detail` String (optional) - Extra information of the message.
  * `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
  * `icon` [NativeImage](native-image.md) (optional)
  * `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. Secara default ini diberikan ke tombol pertama dengan "cancel" atau "no" sebagai label. If no such labeled buttons exist and this option is not set, `` will be used as the return value or callback response. Pilihan ini diabaikan pada Windows.
  * `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. Hal ini bisa membuat dialog tampil dengan gaya aplikasi Windows modern . Jika Anda tidak menyukai perilaku ini, Anda dapat mengatur `noLink` to `true`.
  * `normalizeAccessKeys` Boolean (opsional) - Menormalisasi tombol akses keyboard. Defaultnya adalah ` false </ 0> . Mengaktifkan asumsi ini <code>&` digunakan pada label tombol untuk penempatan tombol akses pintas keyboard dan label akan dikonversi sehingga bekerja dengan benar pada setiap platform, `&` karakter dihapus di macos, dikonversi ke `_` di Linux, dan tidak tersentuh pada Windows. Misalnya, label tombol `Vie&w` akan dikonversi ke `Vie_w` di Linux dan ` View ` di macos dan dapat dipilih melalui `Alt-W` pada Windows dan Linux.
* `callback` Fungsi (opsional) 
  * `response` Number - The index of the button that was clicked
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

If a `callback` is passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(judul, konten)`

* `title` String - Judul yang akan ditampilkan di kotak kesalahan
* `content` String - Isi teks untuk ditampilkan di kotak kesalahan

Menampilkan dialog modal yang menunjukkan pesan kesalahan.

API ini dapat dipanggil dengan aman sebelum `siap` acara yang digunakan aplikasi `app`, biasanya digunakan untuk melaporkan kesalahan pada tahap awal startup. Jika dipanggil sebelum acara aplikasi `siap` di Linux, pesan akan dipancarkan ke stderr, dan tidak ada dialog GUI yang akan muncul.

### `dialog.showCertificateTrustDialog ([browserWindow,] options, callback)` * macos * * Windows *

* ` jendela browser </ 0> jendela Browser(opsional)</li>
<li><code>pilihan` Obyek 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback ` Fungsi

Di macos , ini menampilkan dialog modal yang menampilkan informasi pesan dan sertifikat, dan memberi pengguna pilihan untuk mempercayai / mengimpor sertifikat. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

Pada Windows pilihannya lebih terbatas, karena API Win32 digunakan:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a `BrowserWindow` reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.