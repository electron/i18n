## Kelas: pesan datang

> Tangani tanggapan terhadap permintaan HTTP / HTTPS.

Proses: [Main](../glossary.md#main-process)

` IncomingMessage </ 0> mengimplementasikan 
antarmuka <a href="https://nodejs.org/api/stream.html#stream_readable_streams"> Readable Stream </ 1> dan karena itu <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> EventEmitter </ 2> .</p>

<h3 spaces-before="0">Contoh peristiwa</h3>

<h4 spaces-before="0">Acara : 'data'</h4>

<p spaces-before="0">Pengembalian:</p>

<ul>
<li><code> bingkai</ 0>  penyangga- Sejumlah data dari respon tubuh.</li>
</ul>

<p spaces-before="0"><code> Data </ 0>  acara adalah metode biasa mentransfer data respon ke dalam kode aplikatif.</p>

<h4 spaces-before="0">Acara : 'akhir'</h4>

<p spaces-before="0">Menunjukkan bahwa tubuh respons telah berakhir.</p>

<h4 spaces-before="0">Acara : 'dibatalkan'</h4>

<p spaces-before="0">Emitted ketika permintaan telah dibatalkan selama transaksi HTTP berlangsung.</p>

<h4 spaces-before="0">Acara: 'kesalahan'</h4>

<p spaces-before="0">Pengembalian:</p>

<p spaces-before="0">Kesalahan <code> kesalahan </ 0> - Biasanya memegang string kesalahan yang mengidentifikasi penyebab kegagalan akar.</p>

<p spaces-before="0">Emitted saat terjadi kesalahan saat streaming data respon acara. Misalnya, jika server menutup yang mendasari sementara respon masih streaming, sebuah event <code> kesalahan</ 0>  akan dipancarkan pada objek respon dan acara <code> tutup </ 0> selanjutnya akan mengikuti permintaan. objek.
</p>

<h3 spaces-before="0">Contoh properti</h3>

<p spaces-before="0">Contoh <code> datang pesan </ 0> memiliki properti yang mudah dibaca berikut ini:</p>

<h4 spaces-before="0"><code>respon.status Code`</h4>

Sebuah ` Integer </ 0> yang menunjukkan kode status respons HTTP.</p>

<h4 spaces-before="0"><code>response.statusMessage`</h4>

A `String` mewakili the HTTP status message.

#### `Tanggapan`

An `Record<string, string[]>` representing the response HTTP headers. The `headers` object is formatted as follows:

* Semua nama header diturunkan.
* Setiap nama header menghasilkan properti bernilai array pada objek header.
* Setiap nilai header didorong ke dalam array yang terkait dengan nama kopinya.

#### `respon.http Versi`

Sebuah ` String </ 0> yang menunjukkan nomor versi protokol HTTP . Nilai tipikal adalah '1.0' atau '1.1'. Selain itu <code> httpVersionMajor </ 0> dan <code> httpVersionMinor </ 0> adalah dua properti yang dapat dibaca Integer yang mengembalikan masing-masing bilangan utama HTTP dan versi minor.</p>

<h4 spaces-before="0"><code>respon.http Versi utama`</h4>

Sebuah ` Integer </ 0> yang menunjukkan nomor versi protokol utama HTTP .</p>

<h4 spaces-before="0"><code>respon.http Versi kecil`</h4>

Sebuah  Integer </ 0> yang menunjukkan nomor versi protokol HTTP minor .</p>
