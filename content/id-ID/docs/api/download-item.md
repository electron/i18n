## Kelas: Download Item

> Kontrol unduhan file dari sumber jauh.

Proses:  Utama </ 0></p> 

` DownloadItem </ 0> adalah <code> acara Emitter </ 0> yang mewakili item unduhan di Elektron .
Ini digunakan dalam event <code> will-download </ 0>  pada kelas <code> Session </ 0> , dan memungkinkan pengguna untuk mengontrol item download.</p>

<pre><code class="javascript">// Dalam proses utamanya.
const {jendela Browser} = memerlukan (' electron ') misalkan win = jendela baru Browser () win.webContents.session.on ('will-download', ( event , item, webContents) = & gt; {
   // Set save path, membuat Elektron tidak meminta dialog simpan.
  item.setSavePath ('/ tmp / save.pdf') item.on ('util', (acara, negara bagian) = & gt; {jika (negara === 'terputus') {console.log ('Download terputus & dapat kembali ')} jika lain (negara ===' berkembang ') {jika (item.isPaused ()) {console.log (' Downl ownload berhenti ')} lain {console.log (' menerima byte: $ {item .getReceivedBytes ()} ')}}}) item.once (' dilakukan ', (acara, negara bagian) = & gt; {jika (negara ===' selesai ') {console.log (' Download berhasil ')} lain {console.log ('Download gagal: $ {state}')}})})
`</pre> 

### Contoh peristiwa

#### Acara : 'diperbarui'

Pengembalian:

* ` event </ 0>  Acara</li>
<li><code> negara </ 0>  String</li>
</ul>

<p>Emitted when the download has been updated and is not done.</p>

<p>The <code>state` can be one of following:</p> 
    * `progressing` - The download is in-progress.
    * `interrupted` - The download has interrupted and can be resumed.
    #### Event: 'done'
    
    Pengembalian:
    
    * ` event </ 0>  Acara</li>
<li><code> negara </ 0>  String</li>
</ul>

<p>Emitted when the download is in a terminal state. This includes a completed
download, a cancelled download (via <code>downloadItem.cancel()`), and interrupted download that can't be resumed.</p> 
        The `state` can be one of following:
        
        * `completed` - The download completed successfully.
        * `cancelled` - The download has been cancelled.
        * `interrupted` - The download has interrupted and can not resume.
        ### Metode Instance
        
        The `downloadItem` object has the following methods:
        
        #### `downloadItem.setSavePath(path)`
        
        * `path` String - Set the save file path of the download item.
        
        The API is only available in session's `will-download` callback function. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path(Usually prompts a save dialog).
        
        #### `downloadItem.getSavePath()`
        
        Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.
        
        #### `downloadItem.pause()`
        
        Jeda unduhan.
        
        #### `downloadItem.isPaused()`
        
        Returns `Boolean` - Whether the download is paused.
        
        #### `downloadItem.resume()`
        
        Resumes the download that has been paused.
        
        **Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.
        
        #### `downloadItem.canResume()`
        
        Resumes `Boolean` - Whether the download can resume.
        
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