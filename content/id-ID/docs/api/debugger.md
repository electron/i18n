## Kelas: Debugger

> Transport alternatif untuk protokol debugging jarak jauh Chrome.

Proses:  Utama </ 0></p> 

Alat Pengembang Chrome memiliki  pengikatan khusus </ 0> yang tersedia pada runtime JavaScript yang memungkinkan berinteraksi dengan halaman dan menginstruksikannya.</p> 

```javascript
const {BrowserWindow} = require ('elektron') nyalakan = baru BrowserWindow () mencoba {win.webContents.debugger.attach ('1.1')} ha (err) {console.log ('Debugger melampirkan gagal:', err )} win.webContents.debugger.on ('hapus' (acara, alasan) = & gt; {console.log ('Debugger yang tertutup karena:', alasan)}) win.webContents.debugger.on ('pesan' acara, metode, params) = & gt; {jika (metode === 'Network.requestWillBeSent') {jika (params.request.url === 'https://www.github.com') {win.webContents. debugger.detach ()}}}) win.webContents.debugger.sendCommand ('Network.enable')
```

### Metode Instance

#### `debugger.melmpirkan ( [protocolVersion] )`

* ` protocolVersion </ 0>  String (opsional) - Versi protokol debug yang diminta</li>
</ul>

<p>Atasi debugger ke <code>isi web </ 0> .</p>

<h4><code>debugger.adalah terlampir()`</h4> 
  Mengembalikan ` Boolean </ 0> - Apakah debugger terpasang ke <code>isi web </ 0> .</p>

<h4><code>debugger.melepaskan ()`</h4> 
  
  Lepaskan debugger dari `isi web </ 0> .</p>

<h4><code>debugger.kirim perintah (metode [, perintah Params, panggil kembali])`</h4> 
  
  * ` method </ 0>  String - Nama metode, harus menjadi salah satu metode yang didefinisikan oleh
  protokol debugging jarak jauh.</li>
<li><code> perintah Params </ 0> Objek (opsional) - Objek JSON dengan parameter permintaan.</li>
<li><code>callback` Fungsi (opsional) - Respon 
    * ` kesalahan</ 0> Objek - Pesan kesalahan yang menunjukkan kegagalan perintah.</li>
<li><code> mengulang </ 0> Setiap - Respon yang didefinisikan oleh atribut 'kembali' dari
  deskripsi perintah dalam protokol debugging jarak jauh.</li>
</ul></li>
</ul>

<p>Kirim perintah yang diberikan ke target debugging.</p>

<h3>Contoh peristiwa</h3>

<h4>Acara : 'melepaskan'</h4>

<ul>
<li><code>event` Sinyal
    * ` alasan </ 0>  String - Alasan untuk memisahkan debugger.</li>
</ul>

<p>Emitted saat sesi debugging dihentikan. Hal ini terjadi ketika
 <code>isi web</ 0> ditutup atau devtools dipanggil untuk < web > konten < 0> yang dilampirkan </ 0> .</p>

<h4>Acara : 'pesan'</h4>

<ul>
<li><code>event` Sinyal
    *  metode </ 0> String - nama metode.</li>
<li><code> params </ 0> Objek - Parameter acara ditentukan oleh  atribut 'parameter'
 dalam protokol debugging jarak jauh.</li>
</ul>

<p>Emitted kapanpun terjadi debugging sasaran soal acara instrumentasi .</p>