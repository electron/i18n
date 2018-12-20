## Kelas: WebRequest

> Mencegat dan memodifikasi isi permintaan pada berbagai tahap dalam masa hidupnya.

Proses: [Main](../glossary.md#main-process)

Contoh kelas `WebRequest` diakses dengan menggunakan `webRequest` properti dari `Sesi`.

Metode `WebRequest` menerima opsional `filter` dan seorang `pendengar`. Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` saat API sudah terjadi. Sebuah `rincian` objek menjelaskan permintaan.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

```javascript
const { session } = require('electron')

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.github.com/*', '*://electron.github.io']
}

session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'MyAgent'
  callback({ cancel: false, requestHeaders: details.requestHeaders })
})
```

### Metode Instance

The following methods are available on instances of `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]pendengar)`

* `menyaring` Objek (opsional) 
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `pendengar` Fungsi 
  * `rincian` Obyek 
    * `identitas` Integer
    * `url` String
    * `method` String
    * `webContentsId` Integer (optional)
    * `TipeSumberdaya` String
    * `timestamp` Duakali
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
      * `respon` Obyek 
        * `batalkan` Boolean (opsional)
        * `redirectURL` String (opsional) - Permintaan asli dicegah dikirim atau diselesaikan dan diarahkan ke URL yang diberikan.
  
  The `listener` will be called with `listener(details, callback)` when a request is about to occur.
  
  The `uploadData` is an array of `UploadData` objects.
  
  The `callback` has to be called with an `response` object.
  
  #### `webRequest.onBeforeSendHeaders([filter, ]pendengar)`
  
  * `menyaring` Objek (opsional) 
    * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
  * ` pendengar </ 0> Fungsi</li>
</ul>

<p>The <code>listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.</p> 
    * `rincian` Objek 
      * `identitas` Integer
      * ` url </ 0> String</li>
<li><code>method` String
      * `webContentsId` Integer (optional)
      * `TipeSumberdaya` String
      * `timestamp` Duakali
      * `permintaanHeaders` Objek
    * `callback` Fungsi 
      * `respon` Obyek 
        * `batalkan` Boolean (opsional)
        * `permintaanHeader` Objek (opsional) - Bila tersedia, permintaan akan dibuat dengan headers ini.
    
    The `callback` has to be called with an `response` object.
    
    #### `webRequest.onSendHeaders([filter, ]pendengar)`
    
    * `menyaring` Objek (opsional) 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * `pendengar` Fungsi 
      * `rincian` Obyek 
        * `identitas` Integer
        * ` url </ 0> String</li>
<li><code>method` String
        * `webContentsId` Integer (optional)
        * `TipeSumberdaya` String
        * `timestamp` Duakali
        * `permintaanHeaders` Objek
    
    The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.
    
    #### `webRequest.onHeadersReceived([filter, ]pendengar)`
    
    * `menyaring` Objek (opsional) 
      * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
    * ` pendengar </ 0> Fungsi</li>
</ul>

<p>The <code>listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.</p> 
      * `rincian` Object 
        * `identitas` Integer
        * `url` String
        * `method` String
        * `webContentsId` Integer (optional)
        * `Jenissumberdaya` Tali
        * `timestamp` Duakali
        * `statusGaris` String
        * `statusCode` Bilangan bulat
        * `responseHeaders` Objek
      * `callback` Fungsi 
        * `respon` Obyek 
          * `batalkan` Boolean
          * `responHeader` Objek (opsional) - Bila disediakan, server diasumsikan telah merespon dengan headers ini.
          * `statusGaris` String (opsional) - Harus diberikan saat mengesampingkan `responHeaders` untuk mengubah status header jika tidak ada respon asli status header akan digunakan.
      
      The `callback` has to be called with an `response` object.
      
      #### `webRequest.onResponseStarted([filter, ]listener)`
      
      * `menyaring` Objek (opsional) 
        * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
      * `pendengar` Fungsi 
        * `rincian` Obyek 
          * `identitas` Integer
          * `url` String
          * `method` String
          * `webContentsId` Integer (optional)
          * `Jenissumberdaya` Tali
          * `timestamp` Duakali
          * `responseHeaders` Objek
          * ` dariCache` Boolean - Menunjukkan apakah respon diambil dari disk cache.
          * `statusCode` Bilangan bulat
          * `statusGaris` String
      
      The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.
      
      #### `webRequest.onBeforeRedirect([filter, ]listener)`
      
      * `menyaring` Objek (opsional) 
        * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
      * `pendengar` Fungsi 
        * `rincian` Obyek 
          * `identitas` Integer
          * ` url </ 0> String</li>
<li><code>method` String
          * `webContentsId` Integer (optional)
          * `Jenissumberdaya` Tali
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
      * `pendengar` Fungsi 
        * `rincian` Obyek 
          * `identitas` Integer
          * `url` String
          * `method` String
          * `webContentsId` Integer (optional)
          * `TipeSumberdaya` String
          * `timestamp` Duakali
          * `responseHeaders` Objek
          * `dariCache` Boolean
          * `statusCode` Bilangan bulat
          * `statusGaris` String
      
      The `listener` will be called with `listener(details)` when a request is completed.
      
      #### `webRequest.onErrorOccurred([filter, ]listener)`
      
      * `menyaring` Objek (opsional) 
        * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
      * `pendengar` Fungsi 
        * `rincian` Obyek 
          * `identitas` Integer
          * ` url </ 0> String</li>
<li><code>method` String
          * `webContentsId` Integer (optional)
          * `TipeSumberdaya` String
          * `timestamp` Duakali
          * `dariCache` Boolean
          * `kesalahan` String - deskripsi kesalahan.
      
      The `listener` will be called with `listener(details)` when an error occurs.