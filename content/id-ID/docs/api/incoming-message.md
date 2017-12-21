## Kelas: pesan datang

> Tangani tanggapan terhadap permintaan HTTP / HTTPS.

Proses:  Utama </ 0></p> 

` IncomingMessage </ 0> mengimplementasikan 
antarmuka <a href="https://nodejs.org/api/stream.html#stream_readable_streams"> Readable Stream </ 1> dan karena itu <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> EventEmitter </ 2> .</p>

<h3>Contoh peristiwa</h3>

<h4>Acara : 'data'</h4>

<p>Pengembalian:</p>

<ul>
<li><code> bingkai</ 0>  penyangga- Sejumlah data dari respon tubuh.</li>
</ul>

<p><code> Data </ 0>  acara adalah metode biasa mentransfer data respon ke dalam kode aplikatif.</p>

<h4>Acara : 'akhir'</h4>

<p>Menunjukkan bahwa tubuh respons telah berakhir.</p>

<h4>Acara : 'dibatalkan'</h4>

<p>Emitted ketika permintaan telah dibatalkan selama transaksi HTTP berlangsung.</p>

<h4>Acara: 'kesalahan'</h4>

<p>Pengembalian:</p>

<p>Kesalahan <code> kesalahan </ 0> - Biasanya memegang string kesalahan yang mengidentifikasi penyebab kegagalan akar.</p>

<p>Emitted saat terjadi kesalahan saat streaming data respon acara. Misalnya, jika server menutup yang mendasari sementara respon masih streaming, sebuah event <code> kesalahan</ 0>  akan dipancarkan pada objek respon dan acara <code> tutup </ 0> selanjutnya akan mengikuti permintaan. objek.
</p>

<h3>Instance Properties</h3>

<p>Contoh <code> datang pesan </ 0> memiliki properti yang mudah dibaca berikut ini:</p>

<h4><code>response.statusCode`</h4> 

An `Integer` indicating the HTTP response status code.

#### `response.statusMessage`

A `String` representing the HTTP status message.

#### `response.headers`

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

* All header names are lowercased.
* Each header name produces an array-valued property on the headers object.
* Each header value is pushed into the array associated with its header name.

#### `response.httpVersion`

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### `response.httpVersionMajor`

An `Integer` indicating the HTTP protocol major version number.

#### `response.httpVersionMinor`

An `Integer` indicating the HTTP protocol minor version number.