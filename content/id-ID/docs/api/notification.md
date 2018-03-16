# Pemberitahuan

> Buat notifikasi desktop OS

Process: [Main](../glossary.md#main-process)

## Menggunakan dalam proses renderer

Jika Anda ingin menampilkan Notifikasi dari proses renderer, Anda harus menggunakan  HTML5 Notification API </ 0></p> 

## Kelas: Pemberitahuan

> Buat notifikasi desktop OS

Process: [Main](../glossary.md#main-process)

` Pemberitahuan </ 0> adalah
 <a href="http://nodejs.org/api/events.html#events_class_events_eventemitter"> acara Emitter </ 1> .</p>

<p>Ini menciptakan baru <code> Pemberitahuan </ 0> dengan sifat asli yang ditetapkan oleh <code> Pilihan </ 0> .</p>

<h3>Metode Statis</h3>

<p>Kelas <code> pemberitaun</ 0> memiliki metode statis berikut:</p>

<h4><code>Notification.isSupported()`</h4> 

Mengembalikan ` Boolean </ 0> - Apakah pemberitahuan desktop didukung pada sistem saat ini atau tidak</p>

<h3><code> Pemberitahuan baru ( [pilihan] ) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code>pilihan` Benda 

* ` judul </ 0>  String - Judul untuk pemberitahuan, yang akan ditampilkan di bagian atas jendela pemberitahuan saat ditampilkan</li>
<li><code> subtitle </ 0>  String - (opsional) Sebuah subjudul untuk pemberitahuan, yang akan ditampilkan di bawah judul. <em> macos </ 1></li>
<li><code> tubuh </ 0> String - bahasa teks visual, yang akan ditampilkan di bawah judul atau subjudul</li>
<li><code> diam </ 0>  Boolean - (opsional) Baik atau tidak untuk mengeluarkan suara pemberitahuan OS saat menampilkan notifikasi</li>
<li><code>icon` (String | [NativeImage](native-image.md)) - (optional) An icon to use in the notification
* ` hasReply </ 0>  Boolean - (opsional) Baik atau tidak untuk menambahkan opsi jawaban sebaris ke perintah.  <em> macos </ 1></li>
<li><code>balasan pemegang tempat </ 0>  String - (opsional) pemegang tempat untuk menulis di kolom masukan jawaban inline. <em> macos </ 1></li>
<li><code> suara </ 0>  String - (opsional) Nama file suara yang akan diputar saat pemberitahuan muncul di layar. <em> macos </ 1></li>
<li><code> tindakan </ 0>  <a href="structures/notification-action.md"> pemberitahuan tindakan [] </ 1> - (opsional) Tindakan untuk ditambahkan ke pemberitahuan.  Harap baca tindakan dan batasan yang tersedia di dokumentasi < 0> tindakan pemberitahuan </ 0> <em> macos </ 1></li>
</ul></li>
</ul>

<h3>Perihal contoh</h3>

<p>Objek yang dibuat dengan <code> Pemberitahuan baru </ 0> memancarkan peristiwa berikut:</p>

<p><strong> Catatan: </ 0> Beberapa acara hanya tersedia pada sistem operasi tertentu dan diberi label seperti itu.</p>

<h4>Acara: 'show'</h4>

<p>Returns:</p>

<ul>
<li><code>event` Event

Emitted saat pemberitahuan ditunjukkan kepada pengguna, perhatikan bahwa ini dapat dipecat beberapa kali karena pemberitahuan dapat ditampilkan beberapa kali melalui metode ` menunjukan() </ 0> .</p>

<h4>Acara : 'klik'</h4>

<p>Returns:</p>

<ul>
<li><code>peristiwa` Peristiwa</li> </ul> 

Emitted saat notifikasi diklik oleh pengguna.

#### Acara : 'dekat'

Pengembalian:

* `event</ 0> Acara</li>
</ul>

<p>Emitted saat notifikasi ditutup dengan intervensi manual dari pengguna.</p>

<p>This event is not guaranteed to be emitted in all cases where the notification
is closed.</p>

<h4>Acara : 'balas' <em> macos </ 0></h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` balasan</ 0>  String - String yang dimasukkan pengguna ke kolom dibarisan balasan</li>
</ul>

<p>Emitted saat pengguna mengklik tombol "Balas" pada notifikasi dengan <code> telah di balas: benar </ 0> .</p>

<h4>Acara: 'aktifkan' <em> macOS </ 0></h4>

<p>Pengembalian:</p>

<ul>
<li><code>acara` Acara
* ` masukkan </ 0>  Nomor - Indeks tindakan yang diaktifkan</li>
</ul>

<h3>Metode Contoh</h3>

<p>Objek yang dibuat dengan <code> Notifikasi baru </ 0> memiliki metode contoh berikut:</p>

<h4><code>pemberitahuan.menunjukkan ()`</h4> 
  Segera tunjukkan notifikasi tersebut kepada pengguna, mohon perhatikan hal ini tidak seperti penerapan Pemberitahuan HTML5, cukup memberi contoh ` Notifikasi baru </ 0> tidak segera menunjukkannya kepada pengguna, Anda perlu memanggil metode ini sebelum OS akan ditampilkan. saya t.</p>

<p>If the notification has been shown before, this method will dismiss the previously
shown notification and create a new one with identical properties.</p>

<h4><code>notification.close()`</h4> 
  
  Dismisses the notification.
  
  ### Memutar Suara
  
  Di macos , Anda dapat menentukan nama suara yang ingin Anda putar saat pemberitahuan ditampilkan. Salah satu suara default (di bawah Preferensi Sistem> Suara) dapat digunakan, selain file suara khusus. Pastikan file suara disalin di bawah kumpulan aplikasi (misalnya, `App kamu .app/isi/sumber daya </ 0> ), atau salah satu dari lokasi berikut:</p>

<ul>
<li><code>~ / Perpustakaan / Suara`</li> 
  
  * `/ Perpustakaan / Suara`
  * `/ Jaringan / Perpustakaan / Suara`
  * `/ Sistem / Perpustakaan / Suara`</ul> 
  
  Lihat dokumen  NS suara </ 0> untuk informasi lebih lanjut.</p>