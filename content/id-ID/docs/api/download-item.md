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

<p>Emitted saat download telah di perbarui dan belum selesai.</p>

<p><code> Negara </ 0> dapat menjadi salah satu dari berikut:</p>

<ul>
<li><code> maju </ 0> - Unduhan sedang dalam proses.</li>
<li><code> terputus </ 0> - Unduhan telah terganggu dan dapat dilanjutkan.</li>
</ul>

<h4>Acara : 'selesai'</h4>

<p>Pengembalian:</p>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code> negara </ 0>  String</li>
</ul>

<p>Emitted saat download dalam status terminal. Ini termasuk unduhan yang selesai, unduhan yang dibatalkan (melalui <code> downloadItem.cancel () </ 0> ), dan undingan terputus yang tidak dapat dilanjutkan.</p>

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

<h4><code>download Item.jedah ()`</h4> 
        
        Jeda unduhan.
        
        #### `downloadItem.fi jeda ()`
        
        Mengembalikan ` Boolean </ 0> - Apakah unduhan dijeda.</p>

<h4><code>downloadItem.lanjut ()`</h4> 
        
        Melanjutkan pengunduhan yang telah dijeda.
        
        ** Catatan: </ 0> Untuk mengaktifkan download ulang server yang Anda unduh harus mendukung permintaan jangkauan dan memberikan nilai header ` Last-Modified </ 1> dan <code> ETag </ 1> . Jika tidak <code> lanjut () </ 0> akan memberhentikan byte yang telah diterima sebelumnya dan memulai kembali unduhan dari awal.</p>

<h4><code>download Item.bisa lanjut ()`</h4> 
        
        Lanjut ` Boolean </ 0> - Apakah proses download bisa dilanjutkan.</p>

<h4><code>download Item.batal ()`</h4> 
        
        Membatalkan operasi unduh.
        
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