## Kelas: WebRequest

> Mencegat dan memodifikasi isi permintaan pada berbagai tahap dalam masa hidupnya.

Proses:  Utama </ 0></p> 

Contoh kelas `WebRequest` diakses dengan menggunakan `webRequest` properti dari `Sesi`.

Metode `WebRequest` menerima opsional `filter` dan seorang `pendengar`. Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` saat API sudah terjadi. Sebuah `rincian` objek menjelaskan permintaan. Melewati `null` sebagai `pendengar` akan berhenti berlangganan dari acara tersebut.

Sebuah `filter` objek memiliki `url` properti yang merupakan Array URL pola yang akan digunakan untuk menyaring permintaan yang tidak sesuai dengan URL pola. Jika `filter` dihilangkan maka semua permintaan akan dicocokkan.

Untuk event tertentu ` pendengar` dilewatkan dengan `panggilan kembali`, yang seharusnya dipanggil dengan `respon` ketika objek `pendengar` telah melakukan pekerjaannya.

Contoh menambahkan `User-Agent` header untuk permintaan:

```javascript
const {session} = require('electron')
// Mengubah agen pengguna untuk semua permintaan ke url berikut.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({cancel: false, requestHeaders: details.requestHeaders})
})
```

### Metode Instance

Metode berikut tersedia pada contoh `WebRequest`:

#### `webRequest.onBeforeRequest ([filter,]pendengar)`

* `filter` Objek 
  * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
* `pendengar` Fungsi 
  * `rincian` Obyek 
    * `id` Integer
    * `url` String
    * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
    * `timestamp` Duakali
    * `uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Fungsi 
    * `respon` Obyek 
      * `batalkan` Boolean (opsional)
      * `redirectURL` String (opsional) - Permintaan asli dicegah dikirim atau diselesaikan dan diarahkan ke URL yang diberikan.

Seorang `pendengar` akan dipanggil dengan `pendengar(rincian, panggilan balik)` saat sebuah permintaan akan segera terjadi.

`UploadData` sebuah array `UploadData` objek.

`panggilan kembali` harus dipanggil dengan `respon` objek.

#### `webRequest.onBeforeSendHeaders ([filter,] pendengar)`

* `menyaring` Obyek 
  * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
* ` pendengar </ 0> Fungsi</li>
</ul>

<p>Seorang <code>pendengar` akan dipanggil dengan `pendengar(rincian, panggilan balik)` sebelum mengirim Permintaan HTTP, setelah header permintaan tersedia. Hal ini dapat terjadi setelah a Sambungan TCP dibuat ke server, namun sebelum data http dikirim.</p> 
  * `rincian` Obyek 
    * `id` Integer
    * `url` String
    * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
    * `timestamp` Duakali
    * `permintaanHeaders` Objek
  * `callback` Fungsi 
    * `respon` Obyek 
      * `batalkan` Boolean (opsional)
      * `permintaanHeader` Objek (opsional) - Bila tersedia, permintaan akan dibuat dengan headers ini.
  
  `panggilan kembali` harus dipanggil dengan `respon` objek.
  
  #### `webRequest.onSendHeaders ([filter,] pendengar)`
  
  * `menyaring` Obyek 
    * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
  * `pendengar` Fungsi 
    * `rincian` Obyek 
      * `id` Integer
      * `url` String
      * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
      * `timestamp` Duakali
      * `permintaanHeaders` Objek
  
  `pendengar` akan dipanggil dengan `pendengar(rincian)` tepat sebelum permintaan akan dikirim ke server, modifikasi sebelumnya `onBeforeSendHeader` respon terlihat pada saat pendengar ini dipecat.
  
  #### `webRequest.onHeadersReceived([filter, ]listener)`
  
  * `menyaring` Obyek 
    * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
  * ` pendengar </ 0> Fungsi</li>
</ul>

<p><code>pendengar` akan dipanggil dengan `pendengar(rincian, callback)` ketika HTTP header tanggapan atas permintaan telah diterima.</p> 
    * `rincian` Obyek 
      * ` id </ 0>  String</li>
<li><code>url` String
      * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
      * `timestamp` Duakali
      * `statusGaris` String
      * `statusCode` Bilangan bulat
      * `responseHeaders` Objek
    * `callback` Fungsi 
      * `respon` Obyek 
        * `batalkan` Boolean
        * `responHeader` Objek (opsional) - Bila disediakan, server diasumsikan telah merespon dengan headers ini.
        * `statusGaris` String (opsional) - Harus diberikan saat mengesampingkan `responHeaders` untuk mengubah status header jika tidak ada respon asli status header akan digunakan.
    
    `panggilan kembali` harus dipanggil dengan `respon` objek.
    
    #### `webRequest.onResponseStarted([filter, ]pendengar)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * `url` String
        * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
        * `timestamp` Duakali
        * `responseHeaders` Objek
        * ` dariCache` Boolean - Menunjukkan apakah respon diambil dari disk cache.
        * `statusCode` Bilangan bulat
        * `statusGaris` String
    
    Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` ketika byte pertama dari respon tubuh yang diterima. Untuk permintaan HTTP, ini berarti baris status dan header respon tersedia.
    
    #### `webRequest.onBeforeRedirect([filter, ]pendengar)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * ` id </ 0>  String</li>
<li><code>url` String
        * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
        * `timestamp` Duakali
        * `redirectURL` String
        * `statusCode` Bilangan bulat
        * `ip` String (opsional) - Alamat IP server yang meminta benar-benar dikirim ke.
        * `dariCache` Boolean
        * `responseHeaders` Objek
    
    `pendengar` akan dipanggil dengan `pendengar(rincian)` saat server memulai redirect akan segera terjadi.
    
    #### `webRequest.onCompleted([filter, ]pendengar)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * `url` String
        * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
        * `timestamp` Duakali
        * `responseHeaders` Objek
        * `dariCache` Boolean
        * `statusCode` Bilangan bulat
        * `statusGaris` String
    
    Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` ketika sebuah permintaan selesai.
    
    #### `webRequest.onErrorOccurred([filter, ]pendengar)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * `url` String
        * ` method </ 0>  String</li>
<li><code>TipeSumberdaya` String
        * `timestamp` Duakali
        * `dariCache` Boolean
        * `kesalahan` String - deskripsi kesalahan.
    
    `pendengar` akan dipanggil dengan `pendengar(rincian)` bila terjadi kesalahan.