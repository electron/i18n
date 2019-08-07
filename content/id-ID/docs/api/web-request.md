## Kelas: WebRequest

> Mencegat dan memodifikasi isi permintaan pada berbagai tahap dalam masa hidupnya.

Proses: [Main](../glossary.md#main-process)

Contoh dari ` Cookie </ 0> kelas diakses dengan menggunakan <code> cookie </ 0> properti dari <code> Sesi </ 0> .</p>

<p>Metode <code>WebRequest` menerima opsional `filter` dan seorang `pendengar`. Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` saat API sudah terjadi. Sebuah `rincian` objek menjelaskan permintaan.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

Sebuah `filter` objek memiliki `url` properti yang merupakan Array URL pola yang akan digunakan untuk menyaring permintaan yang tidak sesuai dengan URL pola. Jika `filter` dihilangkan maka semua permintaan akan dicocokkan.

Untuk event tertentu ` pendengar` dilewatkan dengan `panggilan kembali`, yang seharusnya dipanggil dengan `respon` ketika objek `pendengar` telah melakukan pekerjaannya.

Contoh menambahkan `User-Agent` header untuk permintaan:

```javascript
const { session } = require('electron')
// Mengubah agen pengguna untuk semua permintaan ke url berikut.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ requestHeaders: details.requestHeaders })
})
```

### Metode Instance

Metode berikut tersedia pada contoh `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]pendengar)`

* `menyaring` Objek (opsional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `pendengar` Function | null 
  * `rincian` Obyek 
    * `identitas` Integer
    * `url` String
    * `method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
      * `Tanggapan` Obyek 
        * `batalkan` Boolean (opsional)
        * `redirectURL` String (opsional) - Permintaan asli dicegah dikirim atau diselesaikan dan diarahkan ke URL yang diberikan.
  
  Seorang `pendengar` akan dipanggil dengan `pendengar(rincian, panggilan balik)` saat sebuah permintaan akan segera terjadi.
  
  `UploadData` sebuah array `UploadData` objek.
  
  `panggilan kembali` harus dipanggil dengan `respon` objek.
  
  Some examples of valid `urls`:
  
  ```js
  'http://foo:1234/'
  'http://foo.com/'
  'http://foo:1234/bar'
  '*://*/*'
  '*://example.com/*'
  '*://example.com/foo/*'
  'http://*.foo:1234/'
  'file://foo:1234/bar'
  'http://foo:*/'
  '*://www.foo.com/'
  ```
  
  #### `webRequest.onBeforeSendHeaders([filter, ]pendengar)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * `url` String
      * ` path </ 0>  String</li>
<li><code>exitCode` Integer (opsional)
      * `Jenissumberdaya` Tali
      * `pengarah` String
      * `timestamp` Duakali
      * `permintaanHeaders` Objek
    * `callback` Lokasi: 
      * `Tanggapan` Benda 
        * `batalkan` Boolean (opsional)
        * `permintaanHeader` Objek (opsional) - Bila tersedia, permintaan akan dibuat dengan headers ini.
  
  The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.
  
  `panggilan kembali` harus dipanggil dengan `respon` objek.
  
  #### `webRequest.onSendHeaders([filter, ]pendengar)`
  
  * `menyaring` Object (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * `url` String
      * `method` String
      * `exitCode` Integer (opsional)
      * `Jenissumberdaya` Tali
      * `pengarah` String
      * `timestamp` Duakali
      * `permintaanHeaders` Objek
  
  The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.
  
  #### `webRequest.onHeadersReceived([filter, ]pendengar)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * ` url </ 0> String</li>
<li><code>method` String
      * `exitCode` Integer (opsional)
      * `Jenissumberdaya` Tali
      * `pengarah` String
      * `timestamp` Duakali
      * `statusGaris` String
      * `statusCode` Bilangan bulat
      * `responseHeaders` Objek
    * `callback` Fungsi 
      * `Tanggapan` Obyek 
        * `batalkan` Boolean (opsional)
        * `responHeader` Objek (opsional) - Bila disediakan, server diasumsikan telah merespon dengan headers ini.
        * `statusGaris` String (opsional) - Harus diberikan saat mengesampingkan `responHeaders` untuk mengubah status header jika tidak ada respon asli status header akan digunakan.
  
  The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.
  
  `panggilan kembali` harus dipanggil dengan `respon` objek.
  
  #### `webRequest.onResponseStarted([filter, ]listener)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * `url` String
      * `method` String
      * `exitCode` Integer (opsional)
      * `TipeSumberdaya` String
      * `pengarah` String
      * `timestamp` Duakali
      * `responseHeaders` Objek
      * ` dariCache` Boolean - Menunjukkan apakah respon diambil dari disk cache.
      * `statusCode` Bilangan bulat
      * `statusGaris` String
  
  The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
  
  #### `webRequest.onBeforeRedirect([filter, ]listener)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * `url` String
      * `method` String
      * `exitCode` Integer (opsional)
      * `Jenissumberdaya` Tali
      * `pengarah` String
      * `timestamp` Duakali
      * `redirectURL` String
      * `statusCode` Bilangan bulat
      * `ip` String (opsional) - Alamat IP server yang meminta benar-benar dikirim ke.
      * `dariCache` Boolean
      * `responseHeaders` Objek
  
  The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.
  
  #### `webRequest.onCompleted([filter, ]listener)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * ` url </ 0> String</li>
<li><code>method` String
      * `exitCode` Integer (opsional)
      * `TipeSumberdaya` String
      * `pengarah` String
      * `timestamp` Duakali
      * `responseHeaders` Objek
      * `dariCache` Boolean
      * `statusCode` Bilangan bulat
      * `statusGaris` String
  
  The `listener` will be called with `listener(details)` when a request is completed.
  
  #### `webRequest.onErrorOccurred([filter, ]listener)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * `pendengar` Function | null 
    * `rincian` Obyek 
      * `identitas` Integer
      * ` url </ 0> String</li>
<li><code>method` String
      * `exitCode` Integer (opsional)
      * `TipeSumberdaya` String
      * `pengarah` String
      * `timestamp` Duakali
      * `dariCache` Boolean
      * `kesalahan` String - deskripsi kesalahan.
  
  The `listener` will be called with `listener(details)` when an error occurs.