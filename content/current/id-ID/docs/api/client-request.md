## Kelas: ClientRequest

> Membuat permintaan HTTP/HTTPS.

Proses: [Main](../glossary.md#main-process)

`ClientRequest` mengimplementasikan antarmuka [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) dan karena itu [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `baru ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET method.
  * `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
  * `session` Session (optional) - The [`Session`](session.md) instance with which the request is associated.
  * `partisi` String (opsional) - nama [`partisi`](session.md) yang permintaan tersebut terkait. Default untuk string kosong. Opsi `sesi` berlaku pada `partisi`. Dengan demikian jika `sesi` secara eksplisit ditetapkan, `partisi` diabaikan.
  * `useSessionCookies` Boolean (optional) - Whether to send cookies with this request from the provided session.  This will make the `net` request's cookie behavior match a `fetch` request. Defaultnya adalah ` false </ 0> .</p></li>
<li><p spaces-before="0"><code>protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `tuan rumah` String (opsional) - server host disediakan sebagai sebuah gabungan dari nama host dan port nomor 'hostname:port'.
  * `nama host` String (opsional) - nama host server.
  * `Port` Bulat (opsional) - nomor port server mendengarkan.
  * `jalan` String (opsional) - bagian jalan dari URL permintaan.
  * `mengarahkan` String (opsional) - modus redirect untuk permintaan ini. Harus menjadi salah satu `mengikuti` `kesalahan` atau `manual`. Default untuk `mengikuti`. Bila mode `kesalahan`, pengalihan apapun akan dibatalkan. When mode is `manual` the redirection will be cancelled unless [`request.followRedirect`](#requestfollowredirect) is invoked synchronously during the [`redirect`](#event-redirect) event.

`pilihan` properti seperti `protokol`, `host`, `nama host`, `pelabuhan` dan `jalan` secara ketat mengikuti model Node.js seperti yang dijelaskan dalam modul [URL](https://nodejs.org/api/url.html).

Sebagai contoh, kita bisa menciptakan permintaan yang sama untuk 'github.com' sebagai berikut:

```JavaScript
permintaan Const = net.request ({metode: 'Mendapatkan', protokol: ' https:', nama host: 'github.com', port: 443, jalan: '/'})
```

### Contoh peristiwa

#### Event: 'respon'

Mengembalikan:

* `respon` IncomingMessage - sebuah objek yang mewakili pesan Respon HTTP.

#### Acara: 'login'

Mengembalikan:

* `authInfo` Object
  * ` isProxy </ 0>  Boolean</li>
<li><code>skema` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback ` Fungsi
  * `username` String (optional)
  * `password` String (optional)

Dibunyikan apabila otentikasi proxy meminta kredensial pengguna.

Fungsi `panggilan balik` diharapkan dipanggil kembali dengan kredensial pengguna:

* `namapengguna` String
* `katasandi` String

```JavaScript
request.on ('login', (authInfo, callback) = > {callback ('username', 'password')})
```
Menyediakan kredensial kosong akan membatalkan permintaan dan laporkan kesalahan otentikasi pada objek respon:

```JavaScript
request.on ('tanggapan', (respon) = > {console.log ('STATUS: ${response.statusCode}');   response.on ('kesalahan', (error) = > {console.log ('ERROR: ${JSON.stringify(error)}')})}) request.on ('login', (authInfo, callback) = > {callback()})
```

#### Event: 'selesai'

Dipancarkan hanya setelah potongan terakhir `permintaan` data telah ditulis ke dalam obyek `permintaan`.

#### Event: 'membatalkan'

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### Acara: 'kesalahan'

Mengembalikan:

* `kesalahan` Kesalahan - kesalahan objek menyediakan beberapa informasi tentang kegagalan.

Dibunyikan apabila modul `bersih` gagal untuk mengeluarkan permintaan jaringan. Biasanya ketika `permintaan` objek memancarkan acara `kesalahan`, `menutup` acara kemudian akan mengikuti dan objek respon tidak akan diberikan.

#### Acara : 'dekat'

Dipancarkan sebagai acara terakhir dalam transaksi permintaan-respon HTTP. `Menutup` acara menunjukkan bahwa lebih peristiwa akan dibunyikan pada objek `permintaan` atau `tanggapan`.


#### Event: 'mengalihkan'

Mengembalikan:

* `statusCode` Bilangan bulat
* `method` String
* `redirectUrl` String
* `responseHeaders` Record<String, String[]>

Emitted when the server returns a redirect response (e.g. 301 Moved Permanently). Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.  If this event is handled, [`request.followRedirect`](#requestfollowredirect) must be called **synchronously**, otherwise the request will be cancelled.

### Instance Properties

#### `request.chunkedEncoding`

`Boolean` menentukan apakah permintaan akan menggunakan HTTP chunked transfer pengkodean atau tidak. Default ke false. Properti dibaca dan ditulisi, namun dapat diatur hanya sebelum pertama menulis operasi sebagai header HTTP tidak belum dimasukkan pada kabel. Mencoba untuk mengatur properti `chunkedEncoding` setelah menulis pertama akan melempar kesalahan.

Menggunakan chunked pengkodean sangat dianjurkan jika Anda perlu mengirim permintaan besar tubuh sebagai data akan dialirkan secara potongan kecil bukannya internal buffered dalam memori proses elektron.

### Методы экземпляра

#### `request.setHeader (nama, nilai)`

* `nama` String - nama header HTTP tambahan.
* `value` String - An extra HTTP header value.

Menambahkan tambahan HTTP header. The header name will be issued as-is without lowercasing. Itu bisa disebut hanya sebelum menulis pertama. Memanggil metode ini setelah menulis pertama akan melempar kesalahan. Jika tidak melewati nilai `String`, metode `toString ()` akan dipanggil untuk mendapatkan nilai akhir.

#### `request.getHeader(name)`

* `nama` String - menentukan nama tambahan header.

Returns `String` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `nama` String - menentukan nama tambahan header.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### `request.write (potongan [, pengkodean] [, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
* `callback` Fungsi (opsional) - disebut setelah operasi tulis berakhir.

`callback` adalah pada dasarnya fungsi dummy diperkenalkan dalam tujuan menjaga kesamaan dengan Node.js API. Hal ini disebut asynchronously di kutu berikutnya setelah `potongan` konten sudah diserahkan ke lapisan jaringan kromium. Bertentangan dengan implementasi Node.js, itu tidak dijamin bahwa `potongan` konten telah memerah pada kabel sebelum `panggil balik` disebut.

Menambahkan sepotong data permintaan tubuh. Operasi menulis pertama dapat menyebabkan header permintaan yang akan diterbitkan pada kawat. Setelah pertama menulis operasi, hal ini tidak diperbolehkan untuk menambah atau menghapus sebuah header.

#### `request.end ([chunk] [, encoding] [, callback])`

* `potongan` (String | Buffer) (opsional)
* `pengkodean` String (opsional)
* `callback` Fungsi (opsional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.Abort()`

Membatalkan transaksi HTTP yang sedang berlangsung. Jika permintaan telah sudah dipancarkan `menutup` acara, operasi abort tidak akan berpengaruh. Sebaliknya acara yang sedang berlangsung akan memancarkan `membatalkan` dan `menutup` acara. Selain itu, jika ada objek tanggapan berkelanjutan, itu akan memancarkan acara `dibatalkan`.

#### `request.followRedirect()`

Continues any pending redirection. Can only be called during a `'redirect'` event.

#### `request.getUploadProgress()`

Mengembalikan `Objek`:

* `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
* `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
* `current` Integer - The number of bytes that have been uploaded so far
* `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.
