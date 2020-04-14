## Kelas: Download Item

> Kontrol unduhan file dari sumber jauh.

Proses: [Main](../glossary.md#main-process)

`DownloadItem` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) that represents a download item in Electron. Ini digunakan dalam event ` will-download </ 0>  pada kelas <code> Session </ 0> , dan memungkinkan pengguna untuk mengontrol item download.</p>

<pre><code class="javascript">// Pada proses utama.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
  item.setSavePath ('/ tmp / save.pdf') item.on ('util', (acara, negara bagian) = & gt; {jika (negara === 'terputus') {console.log ('Download terputus & dapat kembali ')} jika lain (negara ===' berkembang ') {jika (item.isPaused ()) {console.log (' Downl ownload berhenti ')} lain {console.log (' menerima byte: $ {item .getReceivedBytes ()} ')}}}) item.once (' dilakukan ', (acara, negara bagian) = & gt; {jika (negara ===' selesai ') {console.log (' Download berhasil ')} lain {console.log ('Download gagal: $ {state}')}})})
`</pre>

### Contoh peristiwa

#### Acara : 'diperbarui'

Mengembalikan:

* `event` Sinyal
* `state` String - Can be `progressing` or `interrupted`.

Emitted saat download telah di perbarui dan belum selesai.

` Negara </ 0> dapat menjadi salah satu dari berikut:</p>

<ul>
<li><code> maju </ 0> - Unduhan sedang dalam proses.</li>
<li><code> terputus </ 0> - Unduhan telah terganggu dan dapat dilanjutkan.</li>
</ul>

<h4 spaces-before="0">Acara : 'selesai'</h4>

<p spaces-before="0">Mengembalikan:</p>

<ul>
<li><code>event` Sinyal</li>
* `state` String - Can be `completed`, `cancelled` or `interrupted`.</ul>

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

` Negara </ 0> dapat menjadi salah satu dari berikut:</p>

<ul>
<li><code> selesai </ 0> - Unduhan selesai dengan sukses.</li>
<li><code> dibatalkan </ 0> - Unduhan telah dibatalkan.</li>
<li><code> terputus </ 0> - Unduhan telah terganggu dan tidak dapat dilanjutkan.</li>
</ul>

<h3 spaces-before="0">Методы экземпляра</h3>

<p spaces-before="0"><code> download Item </ 0> objek memiliki metode berikut:</p>

<h4 spaces-before="0"><code>download Item.set jalan tersimpan (jalan)`</h4>

* ` jalan </ 0> String - Atur file path download item.</li>
</ul>

<p spaces-before="0">API hanya tersedia dalam sesi <code> akan mengunduh </ 0> fungsi callback.
If user doesn't set the save path via the API, Electron will use the original
routine to determine the save path; this usually prompts a save dialog.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/property-updates.md">Deprecated</a>: use the <code>savePath` property instead.</strong></p>

#### `downloadItem.getSavePath ()`

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

**[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**

#### `downloadItem.setSaveDialogOptions(options)`

* `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).

This API allows the user to set custom options for the save dialog that opens for the download item by default. API hanya tersedia dalam sesi ` akan mengunduh </ 0> fungsi callback.</p>

<h4 spaces-before="0"><code>downloadItem.getSaveDialogOptions()`</h4>

Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.

#### `download Item.jedah ()`

Jeda unduhan.

#### `downloadItem.fi jeda ()`

Mengembalikan ` Boolean </ 0> - Apakah unduhan dijeda.</p>

<h4 spaces-before="0"><code>downloadItem.lanjut ()`</h4>

Melanjutkan pengunduhan yang telah dijeda.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Jika tidak ` lanjut () </ 0> akan memberhentikan byte yang telah diterima sebelumnya dan memulai kembali unduhan dari awal.</p>

<h4 spaces-before="0"><code>download Item.bisa lanjut ()`</h4>

Returns `Boolean` - Whether the download can resume.

#### `download Item.batal ()`

Membatalkan operasi unduh.

#### `downloadItem.dapatkan Url ()`

Returns `String` - The origin URL where the item is downloaded from.

#### `downloadItem.dapatkan tipe pantonim ()`

Mengembalikan ` String </ 0> - Jenis file mime.</p>

<h4 spaces-before="0"><code>downloadItem. Telah mengguna sikap ()`</h4>

Mengembalikan ` Boolean </ 0> - Apakah pengunduhan memiliki isyarat pengguna.</p>

<h4 spaces-before="0"><code>downloadItem.dapatkan nama file ()`</h4>

Mengembalikan ` String </ 0> - Nama file dari item unduhan.</p>

<p spaces-before="0"><strong x-id="1">Note:</strong> The file name is not always the same as the actual one saved in local
disk. Jika pengguna mengubah nama file dalam dialog tabungan yang diminta, nama sebenarnya dari file yang tersimpan akan berbeda.</p>

<h4 spaces-before="0"><code>downloadItem.dpatkan Total Byte ()`</h4>

Mengembalikan ` Integer </ 0> - Ukuran total dalam byte dari item unduhan.</p>

<p spaces-before="0">Jika ukurannya tidak diketahui, ia mengembalikan 0.</p>

<h4 spaces-before="0"><code>downloadItem.dapat di terima Byte()`</h4>

Mengembalikan `Integer` - byte yang diterima dari item unduhan.

#### `downloadItem.getContentDisposition ()`

Mengembalikan ` String </ 0> - Bidang Content-Disposition dari header tanggapan.</p>

<h4 spaces-before="0"><code>downloadItem.getState ()`</h4>

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### `downloadItem.getURLChain ()`

Returns `String[]` - The complete URL chain of the item including any redirects.

#### `downloadItem.getLastModifiedTime ()`

Mengembalikan ` String </ 0> - Nilai header Terakhir-Diubah.</p>

<h4 spaces-before="0"><code>downloadItem.getETag ()`</h4>

Mengembalikan ` String </ 0> - nilai header ETag.</p>

<h4 spaces-before="0"><code>downloadItem.getStartTime ()`</h4>

Mengembalikan ` Ganda </ 0> - Jumlah detik sejak zaman UNIX saat unduhan dimulai.</p>

<h3 spaces-before="0">Instance Properties</h3>

<h4 spaces-before="0"><code>downloadItem.savePath`</h4>

A `String` property that determines the save file path of the download item.

The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.
