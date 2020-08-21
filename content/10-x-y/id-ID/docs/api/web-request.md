## Kelas: WebRequest

> Mencegat dan memodifikasi isi permintaan pada berbagai tahap dalam masa hidupnya.

Proses: [Main](../glossary.md#main-process)

Contoh dari ` Cookie </ 0> kelas diakses dengan menggunakan <code> cookie </ 0> properti dari <code> Sesi </ 0> .</p>

<p spaces-before="0">Metode <code>WebRequest` menerima opsional `filter` dan seorang `pendengar`. Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` saat API sudah terjadi. Sebuah `rincian` objek menjelaskan permintaan.

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

### Методы экземпляра

Metode berikut tersedia pada contoh `WebRequest`:

#### `webRequest.onBeforeRequest([filter, ]pendengar)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback ` Fungsi
    * `response` Object
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

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `requestHeaders` Record<string, string>
  * `callback ` Fungsi
    * `beforeSendResponse` Object
      * `batalkan` Boolean (opsional)
      * `requestHeaders` Record<string, string | string[]> (optional) - When provided, request will be made with these headers.

Seorang `pendengar` akan dipanggil dengan `pendengar(rincian, panggilan balik)` sebelum mengirim Permintaan HTTP, setelah header permintaan tersedia. Hal ini dapat terjadi setelah a Sambungan TCP dibuat ke server, namun sebelum data http dikirim.

The `callback` has to be called with a `response` object.

#### `webRequest.onSendHeaders([filter, ]pendengar)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `requestHeaders` Record<string, string>

`pendengar` akan dipanggil dengan `pendengar(rincian)` tepat sebelum permintaan akan dikirim ke server, modifikasi sebelumnya `onBeforeSendHeader` respon terlihat pada saat pendengar ini dipecat.

#### `webRequest.onHeadersReceived([filter, ]pendengar)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `statusGaris` String
    * `statusCode` Bilangan bulat
    * `requestHeaders` Record<string, string>
    * `responseHeaders` Record<string, string[]> (optional)
  * `callback ` Fungsi
    * `headersReceivedResponse` Object
      * `batalkan` Boolean (opsional)
      * `responseHeaders` Record<string, string | string[]> (optional) - When provided, the server is assumed to have responded with these headers.
      * `statusGaris` String (opsional) - Harus diberikan saat mengesampingkan `responHeaders` untuk mengubah status header jika tidak ada respon asli status header akan digunakan.

`pendengar` akan dipanggil dengan `pendengar(rincian, callback)` ketika HTTP header tanggapan atas permintaan telah diterima.

The `callback` has to be called with a `response` object.

#### `webRequest.onResponseStarted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `responseHeaders` Record<string, string[]> (optional)
    * ` dariCache` Boolean - Menunjukkan apakah respon diambil dari disk cache.
    * `statusCode` Bilangan bulat
    * `statusGaris` String

Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` ketika byte pertama dari respon tubuh yang diterima. Untuk permintaan HTTP, ini berarti baris status dan header respon tersedia.

#### `webRequest.onBeforeRedirect([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `redirectURL` String
    * `statusCode` Bilangan bulat
    * `statusGaris` String
    * `ip` String (opsional) - Alamat IP server yang meminta benar-benar dikirim ke.
    * `dariCache` Boolean
    * `responseHeaders` Record<string, string[]> (optional)

`pendengar` akan dipanggil dengan `pendengar(rincian)` saat server memulai redirect akan segera terjadi.

#### `webRequest.onCompleted([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `responseHeaders` Record<string, string[]> (optional)
    * `dariCache` Boolean
    * `statusCode` Bilangan bulat
    * `statusGaris` String
    * `error` String

Seorang `pendengar` akan dipanggil dengan `pendengar(rincian)` ketika sebuah permintaan selesai.

#### `webRequest.onErrorOccurred([filter, ]listener)`

* `filter` Object (optional)
  * `urls` String[] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
* `listener` Function | null
  * `details` Object
    * `identitas` Integer
    * ` url </ 0> String</li>
<li><code>method` String
    * `exitCode` Integer (opsional)
    * `Jenissumberdaya` Tali
    * `pengarah` String
    * `timestamp` Duakali
    * `dariCache` Boolean
    * `kesalahan` String - deskripsi kesalahan.

`pendengar` akan dipanggil dengan `pendengar(rincian)` bila terjadi kesalahan.
