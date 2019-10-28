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

### Instance Events

#### Acara : 'diperbarui'

Pengembalian:

* `event` Event
* `state` String - Can be `progressing` or `interrupted`.

Emitted saat download telah di perbarui dan belum selesai.

` Negara </ 0> dapat menjadi salah satu dari berikut:</p>

<ul>
<li><code> maju </ 0> - Unduhan sedang dalam proses.</li>
<li><code> terputus </ 0> - Unduhan telah terganggu dan dapat dilanjutkan.</li>
</ul>

<h4>Acara : 'selesai'</h4>

<p>Mengembalikan:</p>

<ul>
<li><code>peristiwa` Peristiwa</li> 

* `state` String - Can be `completed`, `cancelled` or `interrupted`.</ul> 

Emitted saat download dalam status terminal. Ini termasuk unduhan yang selesai, unduhan yang dibatalkan (melalui ` downloadItem.cancel () </ 0> ), dan undingan terputus yang tidak dapat dilanjutkan.</p>

<p><code> Negara </ 0> dapat menjadi salah satu dari berikut:</p>

<ul>
<li><code> selesai </ 0> - Unduhan selesai dengan sukses.</li>
<li><code> dibatalkan </ 0> - Unduhan telah dibatalkan.</li>
<li><code> terputus </ 0> - Unduhan telah terganggu dan tidak dapat dilanjutkan.</li>
</ul>

<h3>Metode Instance</h3>

<p><code> download Item </ 0> objek memiliki metode berikut:</p>

<h4><code>download Item.set jalan tersimpan (jalan)`</h4> 

* ` jalan </ 0> String - Atur file path download item.</li>
</ul>

<p>API hanya tersedia dalam sesi <code> akan mengunduh </ 0> fungsi callback.
If user doesn't set the save path via the API, Electron will use the original
routine to determine the save path; this usually prompts a save dialog.</p>

<p><strong><a href="modernization/property-updates.md">Deprecated</a>: use the <code>savePath` property instead.</strong></p> 
    #### `downloadItem.getSavePath ()`
    
    Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.
    
    **[Deprecated](modernization/property-updates.md): use the `savePath` property instead.**
    
    #### `downloadItem.setSaveDialogOptions(options)`
    
    * `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).
    
    This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.
    
    #### `downloadItem.getSaveDialogOptions()`
    
    Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.
    
    #### `download Item.jedah ()`
    
    Pauses the download.
    
    #### `downloadItem.fi jeda ()`
    
    Returns `Boolean` - Whether the download is paused.
    
    #### `downloadItem.lanjut ()`
    
    Resumes the download that has been paused.
    
    **Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.
    
    #### `download Item.bisa lanjut ()`
    
    Returns `Boolean` - Whether the download can resume.
    
    #### `download Item.batal ()`
    
    Cancels the download operation.
    
    #### `downloadItem.dapatkan Url ()`
    
    Returns `String` - The origin URL where the item is downloaded from.
    
    #### `downloadItem.dapatkan tipe pantonim ()`
    
    Returns `String` - The files mime type.
    
    #### `downloadItem. Telah mengguna sikap ()`
    
    Returns `Boolean` - Whether the download has user gesture.
    
    #### `downloadItem.dapatkan nama file ()`
    
    Returns `String` - The file name of the download item.
    
    **Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.
    
    #### `downloadItem.dpatkan Total Byte ()`
    
    Returns `Integer` - The total size in bytes of the download item.
    
    If the size is unknown, it returns 0.
    
    #### `downloadItem.dapat di terima Byte()`
    
    Returns `Integer` - The received bytes of the download item.
    
    #### `downloadItem.getContentDisposition ()`
    
    Returns `String` - The Content-Disposition field from the response header.
    
    #### `downloadItem.getState ()`
    
    Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.
    
    **Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.
    
    #### `downloadItem.getURLChain ()`
    
    Returns `String[]` - The complete URL chain of the item including any redirects.
    
    #### `downloadItem.getLastModifiedTime ()`
    
    Returns `String` - Last-Modified header value.
    
    #### `downloadItem.getETag ()`
    
    Returns `String` - ETag header value.
    
    #### `downloadItem.getStartTime ()`
    
    Returns `Double` - Number of seconds since the UNIX epoch when the download was started.
    
    ### Instance Properties
    
    #### `downloadItem.savePath`
    
    A `String` property that determines the save file path of the download item.
    
    The property is only available in session's `will-download` callback function. If user doesn't set the save path via the property, Electron will use the original routine to determine the save path; this usually prompts a save dialog.