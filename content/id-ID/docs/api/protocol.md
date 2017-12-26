# protokol

> Mampu melaksanakan tugas yang diberikan sepenuhnya.

Proses:  Utama </ 0></p> 

Contoh penerapan protokol yang memiliki efek yang sama seperti protokol `file://`:

```javascript
const {app, protocol} = require ('electron') const path = require ('path') app.on ('siap', () = & gt; {protocol.registerFileProtocol ('atom', (permintaan, callback) = & gt; {const url = request.url.substr (7) callback ({path: path.normalize (`$ {__ dirname} / $ {url}`)})}, (error) = & gt; {if (error) console.error ('Gagal mendaftar protokol')})})
```

** Catatan: ** Semua metode kecuali yang ditentukan hanya dapat digunakan setelah event ` ready ` dari modul ` app ` dipancarkan.

## Metode

Modul ` protocol ` memiliki beberapa metode berikut:

### `protocol.registerStandardSchemes (skema [, pilihan])`

* ` skema ` String [] - Skema kustom untuk didaftarkan sebagai skema standar.
* `pilihan` Objek (opsional) 
  * ` aman </ 0> Boolean (opsional) - <code> true </ 0> untuk mendaftarkan skema ini sebagai aman Default <code> false </ 0>.</li>
</ul></li>
</ul>

<p>Skema standar mematuhi apa yang RFC 3986 memanggil <a href="https://tools.ietf.org/html/rfc3986#section-3"> sintaks URI generik </ 0> . Misalnya <code> http </ 0> dan
 <code> https </ 0> adalah skema standar, sedangkan <code> file </ 0> tidak.</p>

<p>Mendaftarkan skema sebagai standar, akan memungkinkan sumber daya relatif dan absolut untuk diselesaikan dengan benar saat disajikan. Jika tidak, skema akan berperilaku seperti
 protokol <code> file </ 0> , namun tanpa kemampuan untuk menyelesaikan URL relatif.</p>

<p>Misalnya saat Anda memuat halaman berikut dengan protokol kustom tanpa mendaftarkannya sebagai skema standar, gambar tidak akan dimuat karena skema non-standar tidak dapat mengenali URL relatif:</p>

<pre><code class="html"><body>
  <img src='test.png'>
</body>
`</pre> 
    Mendaftarkan skema sebagai standar akan memungkinkan akses ke file melalui  FileSystem API </ 0> . Jika tidak, renderer akan membuang kesalahan keamanan untuk skema ini.</p> 
    
    Secara default penyimpanan apis web (localStorage, sessionStorage, webSQL, indexedDB, cookies) dinonaktifkan untuk skema standar. Jadi secara umum jika Anda ingin mendaftarkan sebuah protokol kustom untuk mengganti protokol ` http </ 0> , Anda harus mendaftarkannya sebagai skema standar:</p>

<pre><code class="javascript">const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
`</pre> 
    
    ** Catatan: </ 0> Metode ini hanya dapat digunakan sebelum event ` ready </ 1>  dari 
modul <code> app </ 1> dipancarkan.</p>

<h3><code>protocol.registerServiceWorkerSchemes (skema)`</h3> 
    
    * ` skema </ 0>  String [] - Skema kustom untuk didaftarkan untuk menangani pekerja layanan.</li>
</ul>

<h3><code>protocol.registerFileProtocol (skema, handler [, completion])`</h3> 
      * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
        * `permintaan` Obyek 
          * ` url </ 0>  String</li>
<li><code>referrer` String
          * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
        * `callback` Fungsi 
          * `filePath` String (optional)
      * `penyelesaian` Fungsi (opsional) 
        * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code> skema </ 0> yang akan mengirim file sebagai tanggapan. <code> handler </ 0> akan disebut dengan <code> handler (permintaan, callback) </ 0> ketika <code> permintaan </ 0> akan dibuat dengan <code> skema </ 0> . <code> selesai </ 0> akan dipanggil dengan
 <code> completion (null) </ 0> ketika <code> skema </ 0> berhasil didaftarkan atau
 <code> selesai (error) </ 0> ketika gagal</p>

<p>Untuk menangani <code> permintaan </ 0> , panggilan balik <code> </> harus dipanggil dengan jalur file atau objek yang memiliki properti <code> path </ 0> , misalnya <code> callback (filePath) </ 0> atau
 <code> callback ( {path: filePath} ) </ 0> .</p>

<p>Ketika <code> callback </ 0> dipanggil tanpa nomor , angka , atau objek yang memiliki properti
 <code> kesalahan </ 0> , <code> permintaan </ 0> akan gagal dengan kesalahan <code> </ 0>  nomor yang Anda tentukan Untuk nomor kesalahan yang tersedia, lihat
 daftar kesalahan <a href="https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h"> net </ 0> .</p>

<p>Secara default skema <code> </ 0> diperlakukan seperti <code> http: </ 0> , yang diurai berbeda dari protokol yang mengikuti "sintaks URI generik" seperti file <code> : </ 0> , jadi Anda mungkin ingin memanggil <code> protocol.registerStandardSchemes </ 0> agar skema Anda diperlakukan sebagai skema standar.</p>

<h3><code>protocol.registerBufferProtocol (skema, handler [, completion])`</h3> 
          * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
            * `permintaan` Obyek 
              * ` url </ 0>  String</li>
<li><code>referrer` String
              * ` method </ 0>  String</li>
<li><code> uploadData </ 0>  <a href="structures/upload-data.md"> UploadData [] </ 1></li>
</ul></li>
<li><code>callback` Fungsi 
                * ` penyangga </ 0> ( Buffer | <a href="structures/mime-typed-buffer.md"> MimeTypedBuffer </ 1> ) (opsional)</li>
</ul></li>
</ul></li>
<li><code>penyelesaian` Fungsi (opsional) 
                  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code> skema </ 0> yang akan mengirim <code> Buffer </ 0> sebagai tanggapan.</p>

<p>Penggunaannya sama dengan <code> registerFileProtocol </ 0> , kecuali bahwa <code> callback </ 0> 
harus dipanggil dengan objek <code> Buffer </ 0> atau objek yang memiliki <code> data </ 0> ,
 <code> mimeType </ 0> , dan <code> charset </ 0> .</p>

<p>Example:</p>

<pre><code class="javascript">const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
`</pre> 
                    ### `protocol.registerStringProtocol (skema, handler [, completion])`
                    
                    * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                      * `permintaan` Obyek 
                        * ` url </ 0>  String</li>
<li><code>referrer` String
                        * ` method </ 0>  String</li>
<li><code> uploadData </ 0>  <a href="structures/upload-data.md"> UploadData [] </ 1></li>
</ul></li>
<li><code>callback` Fungsi 
                          * `data` String (optional)
                      * `penyelesaian` Fungsi (opsional) 
                        * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code> skema </ 0> yang akan mengirim <code> String </ 0> sebagai tanggapan.</p>

<p>Penggunaan adalah sama dengan <code> registerFileProtocol </ 0> , kecuali bahwa <code> callback </ 0> 
harus disebut dengan baik <code> String </ 0> atau sebuah benda yang memiliki <code> Data </ 0> ,
 <code> mimeType </ 0> , dan <code> charset </ 0> .</p>

<h3><code>protocol.registerHttpProtocol (skema, handler [, completion])`</h3> 
                          * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                            * `permintaan` Obyek 
                              * ` url </ 0>  String</li>
<li><code>referrer` String
                              * ` method </ 0>  String</li>
<li><code> uploadData </ 0>  <a href="structures/upload-data.md"> UploadData [] </ 1></li>
</ul></li>
<li><code>callback` Fungsi 
                                * `redirectRequest` Obyek 
                                  * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>session` Object (optional)
                                  * `uploadData` Objek (opsional) 
                                    * `contentType` String - MIME type of the content.
                                    * `data` String - Content to be sent.
                            * `penyelesaian` Fungsi (opsional) 
                              * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Registers a protocol of <code>scheme` that will send an HTTP request as a response.</p> 
                                The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.
                                
                                By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.
                                
                                For POST requests the `uploadData` object must be provided.
                                
                                ### `protocol.unregisterProtocol(scheme[, completion])`
                                
                                * ` skema </ 0>  String</li>
<li><code>penyelesaian` Fungsi (opsional) 
                                  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Unregisters the custom protocol of <code>scheme`.</p> 
                                    ### `protocol.isProtocolHandled(scheme, callback)`
                                    
                                    * ` skema </ 0>  String</li>
<li><code>callback` Fungsi 
                                      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>The <code>callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.</p> 
                                        ### `protocol.interceptFileProtocol(scheme, handler[, completion])`
                                        
                                        * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                          * `permintaan` Obyek 
                                            * ` url </ 0>  String</li>
<li><code>referrer` String
                                            * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                                          * `callback` Fungsi 
                                            * `filePath` String
                                        * `penyelesaian` Fungsi (opsional) 
                                          * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Intercepts <code>scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.</p> 
                                            ### `protocol.interceptStringProtocol(scheme, handler[, completion])`
                                            
                                            * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                              * `permintaan` Obyek 
                                                * ` url </ 0>  String</li>
<li><code>referrer` String
                                                * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                                              * `callback` Fungsi 
                                                * `data` String (optional)
                                            * `penyelesaian` Fungsi (opsional) 
                                              * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Intercepts <code>scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.</p> 
                                                ### `protocol.interceptBufferProtocol(scheme, handler[, completion])`
                                                
                                                * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                                  * `permintaan` Obyek 
                                                    * ` url </ 0>  String</li>
<li><code>referrer` String
                                                    * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                                                  * `callback` Fungsi 
                                                    * `buffer` Buffer (optional)
                                                * `penyelesaian` Fungsi (opsional) 
                                                  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Intercepts <code>scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.</p> 
                                                    ### `protocol.interceptHttpProtocol(scheme, handler[, completion])`
                                                    
                                                    * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                                      * `permintaan` Obyek 
                                                        * ` url </ 0>  String</li>
<li><code>referrer` String
                                                        * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                                                      * `callback` Fungsi 
                                                        * `redirectRequest` Obyek 
                                                          * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code> sesi </ 0> Objek (opsional)</li>
<li><code>uploadData` Objek (opsional) 
                                                            * ` contentType </ 0>  String - jenis konten MIME.</li>
<li><code> data </ 0>  String - Konten yang akan dikirim</li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
<li><code>penyelesaian` Fungsi (opsional) 
                                                              * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sisipkan <code> skema </ 0> dan gunakan <code> handler </ 0> sebagai penangan baru protokol yang mengirimkan permintaan HTTP baru sebagai tanggapan.</p>

<h3><code>protocol.uninterceptProtocol (skema [, penyelesaian])`</h3> 
                                                                * ` skema </ 0>  String</li>
<li><code>penyelesaian` Fungsi (opsional) 
                                                                  *  error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Hapus interceptor dipasang untuk <code> skema </ 0> dan mengembalikan handler aslinya.</p>