## Kelas: Download Item

> Kontrol unduhan file dari sumber jauh.

Proses: [Main](../glossary.md#main-process)

` DownloadItem </ 0> adalah <code> acara Emitter </ 0> yang mewakili item unduhan di Elektron .
Ini digunakan dalam event <code> will-download </ 0>  pada kelas <code> Session </ 0> , dan memungkinkan pengguna untuk mengontrol item download.</p>

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
Jika pengguna tidak mengatur jalur simpan melalui API , Elektron akan menggunakan rutinitas asli untuk menentukan jalur simpan (Biasanya meminta dialog simpan).</p>

<h4><code>downloadItem.getSavePath ()`</h4> 
    Mengembalikan ` String </ 0> - Jalur penyimpanan item unduhan. Ini akan menjadi jalur yang ditetapkan melalui <code> downloadItem.setSavePath (jalur) </ 0> atau jalur yang dipilih dari dialog simpan yang ditunjukkan.</p>

<h4><code>downloadItem.setSaveDialogOptions(options)`</h4> 
    
    * `options` SaveDialogOptions - Set the save file dialog options. This object has the same properties as the `options` parameter of [`dialog.showSaveDialog()`](dialog.md).
    
    This API allows the user to set custom options for the save dialog that opens for the download item by default. The API is only available in session's `will-download` callback function.
    
    #### `downloadItem.getSaveDialogOptions()`
    
    Returns `SaveDialogOptions` - Returns the object previously set by `downloadItem.setSaveDialogOptions(options)`.
    
    #### `downloadItem.pause()`
    
    Pauses the download.
    
    #### `downloadItem.isPaused()`
    
    Returns `Boolean` - Whether the download is paused.
    
    #### `downloadItem.resume()`
    
    Resumes the download that has been paused.
    
    **Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.
    
    #### `downloadItem.canResume()`
    
    Returns `Boolean` - Whether the download can resume.
    
    #### `downloadItem.cancel()`
    
    Cancels the download operation.
    
    #### `downloadItem.getURL()`
    
    Returns `String` - The origin url where the item is downloaded from.
    
    #### `downloadItem.getMimeType()`
    
    Returns `String` - The files mime type.
    
    #### `downloadItem.hasUserGesture()`
    
    Returns `Boolean` - Whether the download has user gesture.
    
    #### `downloadItem.getFilename()`
    
    Returns `String` - The file name of the download item.
    
    **Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.
    
    #### `downloadItem.getTotalBytes()`
    
    Returns `Integer` - The total size in bytes of the download item.
    
    If the size is unknown, it returns 0.
    
    #### `downloadItem.getReceivedBytes()`
    
    Returns `Integer` - The received bytes of the download item.
    
    #### `downloadItem.getContentDisposition()`
    
    Returns `String` - The Content-Disposition field from the response header.
    
    #### `downloadItem.getState()`
    
    Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.
    
    **Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.
    
    #### `downloadItem.getURLChain()`
    
    Returns `String[]` - The complete url chain of the item including any redirects.
    
    #### `downloadItem.getLastModifiedTime()`
    
    Returns `String` - Last-Modified header value.
    
    #### `downloadItem.getETag()`
    
    Returns `String` - ETag header value.
    
    #### `downloadItem.getStartTime()`
    
    Returns `Double` - Number of seconds since the UNIX epoch when the download was started.