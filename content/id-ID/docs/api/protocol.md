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

<p>Skema standar mematuhi apa yang RFC 3986 memanggil <a href="https://tools.ietf.org/html/rfc3986#section-3">sintaks URI generik</a>. Misalnya <code>http` dan `https` adalah skema standar, sedangkan `file` tidak.</p> 
    Mendaftarkan skema sebagai standar, akan memungkinkan sumber daya relatif dan absolut untuk diselesaikan dengan benar saat disajikan. Jika tidak, skema akan berperilaku seperti `file` protocol, namun tanpa kemampuan untuk menyelesaikan URL relatif.
    
    Misalnya saat Anda memuat halaman berikut dengan protokol kustom tanpa mendaftarkannya sebagai skema standar, gambar tidak akan dimuat karena skema non-standar tidak dapat mengenali URL relatif:
    
    ```html
<body>
  <img src='test.png'>
</body>
```

Mendaftarkan skema sebagai standar akan memungkinkan akses ke file melalui [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Jika tidak, renderer akan membuang kesalahan keamanan untuk skema ini.

Secara default penyimpanan apis web (localStorage, sessionStorage, webSQL, indexedDB, cookies) dinonaktifkan untuk skema standar. Jadi secara umum jika Anda ingin mendaftarkan sebuah protokol kustom untuk mengganti protokol `http`, Anda harus mendaftarkannya sebagai skema standar:

```javascript
const {app, protocol} = require ('electron') 

protocol.registerStandardSchemes (['atom']) app.on('siap', () => {protocol.registerHttpProtocol ('atom', '...' )})
```

**Catatan:** Metode ini hanya dapat digunakan sebelum event `ready` dari modul `app` dipancarkan.

### `protocol.registerServiceWorkerSchemes (skema)`

* `skema` String[] - Skema kustom untuk didaftarkan untuk menangani pekerja layanan.
### `protocol.registerFileProtocol (skema, handler [, completion])`

* ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
  * `permintaan` Obyek 
    * ` url </ 0>  String</li>
<li><code>pengarah` String
    * ` method </ 0>  String</li>
<li><code>uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
      * `filePath` String (opsional)
  * `penyelesaian` Fungsi (opsional) 
    * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code>skema` yang akan mengirim file sebagai tanggapan. `handler` akan disebut dengan `handler(permintaan, callback)` ketika `permintaan` akan dibuat dengan `skema`. `selesai` akan dipanggil dengan `selesai (null)` ketika `skema` berhasil didaftarkan atau `selesai(error)` ketika gagal.</p> 
      Untuk menangani `permintaan`, `panggilan balik` harus dipanggil dengan jalur file atau objek yang memiliki properti `path`, misalnya `callback(filePath)` atau `callback({path: filePath})`.
      
      Ketika `callback` dipanggil tanpa nomor, angka, atau objek yang memiliki properti `kesalahan`, `permintaan` akan gagal dengan `kesalahan` nomor yang Anda tentukan. Untuk nomor kesalahan yang tersedia, silakan lihat [daftar kesalahan bersih](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
      
      Secara default `skema` diperlakukan seperti `http:`, yang diurai berbeda dari protokol yang mengikuti "sintaks URI generik" seperti `file:`, jadi Anda mungkin ingin memanggil `protocol.registerStandardSchemes` agar skema Anda diperlakukan sebagai skema standar.
      
      ### `protocol.registerBufferProtocol (skema, handler [, completion])`
      
      * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
        * `permintaan` Obyek 
          * ` url </ 0>  String</li>
<li><code>pengarah` String
          * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
        * `callback` Fungsi 
          * `penyangga` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (opsional)
      * `penyelesaian` Fungsi (opsional) 
        * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code>skema` yang akan mengirim `Buffer` sebagai tanggapan.</p> 
          Penggunaannya sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek `Buffer` atau objek yang memiliki `data`, `mimeType`, dan `charset` properti.
          
          Contoh:
          
          ```javascript
const {protocol} = require ('electron') 

protocol.registerBufferProtocol ('atom', (request, callback) = > {callback ({mimeType: 'text / html', data: Buffer.from ('<h5>Response</h5> ')})}, (error) = > {if (error) console.error (' Gagal mendaftar protokol ')})
```
      
      ### `protocol.registerStringProtocol (skema, handler [, completion])`
      
      * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
        * `permintaan` Obyek 
          * ` url </ 0>  String</li>
<li><code>pengarah` String
          * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
        * `callback` Fungsi 
          * `data` String (opsional)
      * `penyelesaian` Fungsi (opsional) 
        * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code>skema` yang akan mengirim `String` sebagai tanggapan.</p> 
          Penggunaan adalah sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus disebut dengan baik `String` atau sebuah benda yang memiliki `Data`, `mimeType`, dan `charset` properti.
          
          ### `protocol.registerHttpProtocol(skema, handler[, completion])`
          
          * `skema` String
          * `handler` Fungsi 
            * `permintaan` Obyek 
              * ` url </ 0>  String</li>
<li><code>pengarah` String
              * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
            * `callback` Fungsi 
              * `redirectRequest` Obyek 
                * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>sesi` Objek (opsional)
                * `uploadData` Objek (opsional) 
                  * `contentType` String - jenis konten MIME.
                  * `data` String - Konten yang akan dikirim.
          * `penyelesaian` Fungsi (opsional) 
            * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Mendaftarkan protokol <code>skema` yang akan mengirim permintaan HTTP sebagai tanggapan.</p> 
              Penggunaannya sama dengan ` registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek ` redirectRequest` yang memiliki `url`, ` method `, `rujukan `, `uploadData` dan`sesi`.
              
              Secara default permintaan HTTP akan menggunakan kembali sesi saat ini. Jika Anda menginginkan meminta untuk memiliki sesi yang berbeda Anda harus menetapkan `sesi`ke`null`.
              
              Agar POST meminta objek `uploadData` harus disediakan.
              
              ### `protocol.uninterceptProtocol (skema [, penyelesaian])`
              
              * ` skema </ 0>  String</li>
<li><code>penyelesaian` Fungsi (opsional) 
                * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Unregisters protokol kustom <code>skema`.</p> 
                  ### `protocol.isProtocolHandled(scheme, panggilan kembali)`
                  
                  * ` skema </ 0>  String</li>
<li><code>callback` Fungsi 
                    * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>The<code>callback ` akan dipanggil dengan boolean yang menunjukkan apakah ada sudah menjadi handler untuk skema ``.</p> 
                      ### `protocol.interceptFileProtocol(skema, handler[,completion])`
                      
                      * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                        * `permintaan` Obyek 
                          * ` url </ 0>  String</li>
<li><code>pengarah` String
                          * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                        * `callback` Fungsi 
                          * `fullPath` String
                      * `penyelesaian` Fungsi (opsional) 
                        * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sisipkan <code>skema` dan gunakan ` handler ` sebagai penangan baru protokol yang mengirimkan file sebagai tanggapan.</p> 
                          ### `protocol.interceptFileProtocol(skema, handler[,completion])`
                          
                          * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                            * `permintaan` Obyek 
                              * ` url </ 0>  String</li>
<li><code>pengarah` String
                              * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
                            * `callback` Fungsi 
                              * ` rtf </ 0> String (opsional)</li>
</ul></li>
</ul></li>
<li><code>penyelesaian` Fungsi (opsional) 
                                * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sisipkan <code>skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirim `String` sebagai tanggapan.</p> 
                                  ### `protocol.interceptBufferProtocol(skema, handler[, completion])`
                                  
                                  * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                    * `permintaan` Obyek 
                                      * ` url </ 0>  String</li>
<li><code>pengarah` String
                                      * ` method </ 0>  String</li>
<li><code>uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                                        * `penyangga` Buffer (opsional)
                                    * `penyelesaian` Fungsi (opsional) 
                                      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sisipkan <code>skema` dan gunakan <0 handler</code> sebagai penangan baru protokol yang mengirimkan `Buffer` sebagai tanggapan.</p> 
                                        ### `protocol.interceptHttpProtocol (skema, handler [, completion])`
                                        
                                        * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
                                          * `permintaan` Obyek 
                                            * ` url </ 0>  String</li>
<li><code>pengarah` String
                                            * ` method </ 0>  String</li>
<li><code>uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>panggilan balik` Fungsi 
                                              * `redirectRequest` Sasaran 
                                                * ` url </ 0>  String</li>
<li><code> method </ 0>  String</li>
<li><code>sesi` Objek (opsional)
                                                * `uploadData` Objek (pilihan) 
                                                  * `contentType` String - jenis konten MIME.
                                                  * `data` String - Konten yang akan dikirim.
                                          * `penyelesaian` Fungsi (opsional) 
                                            * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sisipkan <code>skema` dan gunakan `handler` sebagai penangan baru protokol yang mengirimkan permintaan HTTP baru sebagai tanggapan.</p> 
                                              ### `protocol.uninterceptProtocol(skema[, penyelesaian])`
                                              
                                              * `skema` String
                                              * `penyelesaian` Fungsi (opsional) 
                                                * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Hapus interceptor dipasang untuk <code>skema` dan mengembalikan handler aslinya.</p>