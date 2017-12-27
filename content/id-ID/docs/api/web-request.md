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
    * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
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

<p>The <code>listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. Hal ini dapat terjadi setelah a Sambungan TCP dibuat ke server, namun sebelum data http dikirim.</p> 
  * `rincian` Obyek 
    * `id` Integer
    * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
    * `timestamp` Duakali
    * `requestHeaders` Object
  * `callback` Fungsi 
    * `respon` Obyek 
      * `batalkan` Boolean (opsional)
      * `requestHeaders` Object (optional) - When provided, request will be made with these headers.
  
  `panggilan kembali` harus dipanggil dengan `respon` objek.
  
  #### `webRequest.onSendHeaders ([filter,] pendengar)`
  
  * `menyaring` Obyek 
    * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
  * `pendengar` Fungsi 
    * `rincian` Obyek 
      * `id` Integer
      * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
      * `timestamp` Duakali
      * `requestHeaders` Object
  
  The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.
  
  #### `webRequest.onHeadersReceived([filter, ]listener)`
  
  * `menyaring` Obyek 
    * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
  * ` pendengar </ 0> Fungsi</li>
</ul>

<p>The <code>listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.</p> 
    * `rincian` Obyek 
      * ` id </ 0>  String</li>
<li><code> url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
      * `timestamp` Duakali
      * `statusLine` String
      * `statusCode` Bilangan bulat
      * `responseHeaders` Objek
    * `callback` Fungsi 
      * `respon` Obyek 
        * `cancel` Boolean
        * `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
        * `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.
    
    `panggilan kembali` harus dipanggil dengan `respon` objek.
    
    #### `webRequest.onResponseStarted([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Duakali
        * `responseHeaders` Objek
        * `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
        * `statusCode` Bilangan bulat
        * `statusLine` String
    
    The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
    
    #### `webRequest.onBeforeRedirect([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * ` id </ 0>  String</li>
<li><code> url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Duakali
        * `redirectURL` String
        * `statusCode` Bilangan bulat
        * `ip` String (optional) - The server IP address that the request was actually sent to.
        * `fromCache` Boolean
        * `responseHeaders` Objek
    
    The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.
    
    #### `webRequest.onCompleted([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Duakali
        * `responseHeaders` Objek
        * `fromCache` Boolean
        * `statusCode` Bilangan bulat
        * `statusLine` String
    
    The `listener` will be called with `listener(details)` when a request is completed.
    
    #### `webRequest.onErrorOccurred([filter, ]listener)`
    
    * `menyaring` Obyek 
      * `url` String[] - Array pola URL yang akan digunakan untuk memfilter permintaan yang tidak sesuai dengan pola URL.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `id` Integer
        * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>resourceType` String
        * `timestamp` Duakali
        * `fromCache` Boolean
        * `error` String - The error description.
    
    The `listener` will be called with `listener(details)` when an error occurs.