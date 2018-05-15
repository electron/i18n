## Kelas: pesan datang

> Tangani tanggapan terhadap permintaan HTTP / HTTPS.

Proses: [Main](../glossary.md#main-process)

` IncomingMessage </ 0> mengimplementasikan 
antarmuka <a href="https://nodejs.org/api/stream.html#stream_readable_streams"> Readable Stream </ 1> dan karena itu <a href="https://nodejs.org/api/events.html#events_class_eventemitter"> EventEmitter </ 2> .</p>

<h3>Contoh peristiwa</h3>

<h4>Acara : 'data'</h4>

<p>Mengembalikan:</p>

<ul>
<li><code> bingkai</ 0>  penyangga- Sejumlah data dari respon tubuh.</li>
</ul>

<p><code> Data </ 0>  acara adalah metode biasa mentransfer data respon ke dalam kode aplikatif.</p>

<h4>Acara : 'akhir'</h4>

<p>Menunjukkan bahwa tubuh respons telah berakhir.</p>

<h4>Acara : 'dibatalkan'</h4>

<p>Emitted ketika permintaan telah dibatalkan selama transaksi HTTP berlangsung.</p>

<h4>Acara: 'kesalahan'</h4>

<p>Mengembalikan:</p>

<p>Kesalahan <code> kesalahan </ 0> - Biasanya memegang string kesalahan yang mengidentifikasi penyebab kegagalan akar.</p>

<p>Emitted saat terjadi kesalahan saat streaming data respon acara. Misalnya, jika server menutup yang mendasari sementara respon masih streaming, sebuah event <code> kesalahan</ 0>  akan dipancarkan pada objek respon dan acara <code> tutup </ 0> selanjutnya akan mengikuti permintaan. objek.
</p>

<h3>Instance Properties</h3>

<p>Contoh <code> datang pesan </ 0> memiliki properti yang mudah dibaca berikut ini:</p>

<h4><code>respon.status Code`</h4> 

Sebuah ` Integer </ 0> yang menunjukkan kode status respons HTTP.</p>

<h4><code>response.statusMessage`</h4> 

A `String` mewakili the HTTP status message.

#### `Tanggapan`

Sebuah ` Objek </ 0> mewakili header respon HTTP. The <code> header </ 0> objek diformat sebagai berikut:</p>

<ul>
<li>Semua nama header diturunkan.</li>
<li>Setiap nama header menghasilkan properti bernilai array pada objek header.</li>
<li>Setiap nilai header didorong ke dalam array yang terkait dengan nama kopinya.</li>
</ul>

<h4><code>respon.http Versi`</h4> 

Sebuah ` String </ 0> yang menunjukkan nomor versi protokol HTTP . Nilai tipikal adalah '1.0' atau '1.1'. Selain itu <code> httpVersionMajor </ 0> dan <code> httpVersionMinor </ 0> adalah dua properti yang dapat dibaca Integer yang mengembalikan masing-masing bilangan utama HTTP dan versi minor.</p>

<h4><code>respon.http Versi utama`</h4> 

Sebuah ` Integer </ 0> yang menunjukkan nomor versi protokol utama HTTP .</p>

<h4><code>respon.http Versi kecil`</h4> 

Sebuah  Integer </ 0> yang menunjukkan nomor versi protokol HTTP minor .</p>