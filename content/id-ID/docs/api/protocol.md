# protokol

> Mampu melaksanakan tugas yang diberikan sepenuhnya.

Proses: [Main](../glossary.md#main-process)

Contoh penerapan protokol yang memiliki efek yang sama seperti protokol `file://`:

```javascript
const {app, protocol} = require ('electron') const path = require ('path') app.on ('siap', () = & gt; {protocol.registerFileProtocol ('atom', (permintaan, callback) = & gt; {const url = request.url.substr (7) callback ({path: path.normalize (`$ {__ dirname} / $ {url}`)})}, (error) = & gt; {if (error) console.error ('Gagal mendaftar protokol')})})
```

** Catatan: ** Semua metode kecuali yang ditentukan hanya dapat digunakan setelah event ` ready ` dari modul ` app ` dipancarkan.

## Methods

Modul ` protocol ` memiliki beberapa metode berikut:

### `protocol.registerStandardSchemes(schemes[, options])`

* ` skema ` String [] - Skema kustom untuk didaftarkan sebagai skema standar.
* `options` Objek (pilihan) 
  * ` aman </ 0> Boolean (opsional) - <code> true </ 0> untuk mendaftarkan skema ini sebagai aman Default <code> false </ 0>.</li>
</ul></li>
</ul>

<p>Skema standar mematuhi apa yang RFC 3986 memanggil <a href="https://tools.ietf.org/html/rfc3986#section-3">sintaks URI generik</a>. Misalnya <code>http` dan `https` adalah skema standar, sedangkan `file` tidak.</p> 
    Mendaftarkan skema sebagai standar, akan memungkinkan sumber daya relatif dan absolut untuk diselesaikan dengan benar saat disajikan. Jika tidak, skema akan berperilaku seperti `file` protocol, namun tanpa kemampuan untuk menyelesaikan URL relatif.
    
    Misalnya saat Anda memuat halaman berikut dengan protokol kustom tanpa mendaftarkannya sebagai skema standar, gambar tidak akan dimuat karena skema non-standar tidak dapat mengenali URL relatif:
    
    ```html
    <tubuh menandai="crwd-mark">
      <img src='test.png'>
    </tubuh>
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
    
    * `skema` String
    * `handler` Fungsi 
      * `permintaan` Obyek 
        * `url` String
        * `pengarah` Tali
        * `method` String
        * `uploadData` [UploadData[]](structures/upload-data.md)
      * `callback` Fungsi 
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
        
        * `skema` String
        * `handler` Fungsi 
          * `permintaan` Obyek 
            * `url` String
            * `pengarah` String
            * `method` String
            * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
              * `penyangga` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (opsional)
          * `penyelesaian` Fungsi (opsional) 
            * Kesalahan `kesalahan`
          
          Mendaftarkan protokol `skema` yang akan mengirim `Buffer` sebagai tanggapan.
          
          Penggunaannya sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek `Buffer` atau objek yang memiliki `data`, `mimeType`, dan `charset` properti.
          
          Contoh:
          
          ```javascript
          const {protocol} = require ('electron') 
          
          protocol.registerBufferProtocol ('atom', (request, callback) = > {callback ({mimeType: 'text / html', data: Buffer.from ('<h5>Response</h5> ')})}, (error) = > {if (error) console.error (' Gagal mendaftar protokol ')})
          ```
          
          ### `protocol.registerStringProtocol (skema, handler [, completion])`
          
          * `skema` String
          * `handler` Fungsi 
            * `permintaan` Obyek 
              * ` url </ 0> String</li>
<li><code>pengarah` String
              * `method` String
              * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                * ` rtf </ 0> String (opsional)</li>
</ul></li>
</ul></li>
<li><code>penyelesaian` Fungsi (opsional) 
                  * Kesalahan `kesalahan`
                
                Mendaftarkan protokol `skema` yang akan mengirim `String` sebagai tanggapan.
                
                Penggunaan adalah sama dengan `registerFileProtocol`, kecuali bahwa `callback` harus disebut dengan baik `String` atau sebuah benda yang memiliki `Data`, `mimeType`, dan `charset` properti.
                
                ### `protocol.registerHttpProtocol(skema, handler[, completion])`
                
                * `skema` String
                * `handler` Fungsi 
                  * `permintaan` Obyek 
                    * `url` String
                    * `pengarah` String
                    * `method` String
                    * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                      * `redirectRequest` Obyek 
                        * `url` String
                        * `method` String
                        * `sesi` Objek (opsional)
                        * `uploadData` Objek (opsional) 
                          * `contentType` String - jenis konten MIME.
                          * `data` String - Konten yang akan dikirim.
                  * `penyelesaian` Fungsi (opsional) 
                    * Kesalahan `kesalahan`
                  
                  Mendaftarkan protokol `skema` yang akan mengirim permintaan HTTP sebagai tanggapan.
                  
                  Penggunaannya sama dengan ` registerFileProtocol`, kecuali bahwa `callback` harus dipanggil dengan objek ` redirectRequest` yang memiliki `url`, ` method `, `rujukan `, `uploadData` dan`sesi`.
                  
                  Secara default permintaan HTTP akan menggunakan kembali sesi saat ini. Jika Anda menginginkan meminta untuk memiliki sesi yang berbeda Anda harus menetapkan `sesi`ke`null`.
                  
                  Agar POST meminta objek `uploadData` harus disediakan.
                  
                  ### `protocol.registerStreamProtocol(scheme, handler[, completion])`
                  
                  * `skema` String
                  * `handler` Fungsi 
                    * `permintaan` Sasaran 
                      * ` url </ 0> String</li>
<li><code>header` Obyek
                      * `pengarah` Tali
                      * `method` String
                      * `uploadData` [UploadData[]](structures/upload-data.md)
                    * `callback` Fungsi 
                      * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
                  * `penyelesaian` Fungsi (opsional) 
                    * Kesalahan `kesalahan`
                  
                  Registers a protocol of `scheme` that will send a `Readable` as a response.
                  
                  The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.
                  
                  Contoh:
                  
                  ```javascript
                  const {protocol} = require('electron')
                  const {PassThrough} = require('stream')
                  
                  function createStream (text) {
                    const rv = new PassThrough() // PassThrough is also a Readable stream
                    rv.push(text)
                    rv.push(null)
                    return rv
                  }
                  
                  protocol.registerStreamProtocol('atom', (request, callback) => {
                    callback({
                      statusCode: 200,
                      headers: {
                        'content-type': 'text/html'
                      },
                      data: createStream('<h5>Response</h5>')
                    })
                  }, (error) => {
                    if (error) console.error('Failed to register protocol')
                  })
                  ```
                  
                  It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:
                  
                  ```javascript
                  const {protocol} = require('electron')
                  const fs = require('fs')
                  
                  protocol.registerStreamProtocol('atom', (request, callback) => {
                    callback(fs.createReadStream('index.html'))
                  }, (error) => {
                    if (error) console.error('Failed to register protocol')
                  })
                  ```
                  
                  ### `protocol.unregisterProtocol(scheme[, completion])`
                  
                  * `skema` String
                  * `penyelesaian` Fungsi (opsional) 
                    * Kesalahan `kesalahan`
                  
                  Unregisters the custom protocol of `scheme`.
                  
                  ### `protocol.isProtocolHandled(scheme, callback)`
                  
                  * `skema` String
                  * `callback` Fungsi 
                    * Kesalahan `kesalahan`
                  
                  The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.
                  
                  ### `protocol.interceptFileProtocol(scheme, handler[, completion])`
                  
                  * `skema` String
                  * `handler` Fungsi 
                    * `permintaan` Obyek 
                      * `url` String
                      * `pengarah` String
                      * `method` String
                      * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                        * `format` String
                    * `penyelesaian` Fungsi (opsional) 
                      * Kesalahan `kesalahan`
                    
                    Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.
                    
                    ### `protocol.interceptStringProtocol(scheme, handler[, completion])`
                    
                    * `skema` String
                    * `handler` Fungsi 
                      * `permintaan` Obyek 
                        * ` url </ 0> String</li>
<li><code>pengarah` String
                        * `method` String
                        * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                          * ` rtf </ 0> String (opsional)</li>
</ul></li>
</ul></li>
<li><code>penyelesaian` Fungsi (opsional) 
                            * Kesalahan `kesalahan`
                          
                          Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.
                          
                          ### `protocol.interceptBufferProtocol(scheme, handler[, completion])`
                          
                          * `skema` String
                          * `handler` Fungsi 
                            * `permintaan` Obyek 
                              * ` url </ 0> String</li>
<li><code>pengarah` String
                              * `method` String
                              * `uploadData</​​0> <a href="structures/upload-data.md">UploadData[]</a></li>
</ul></li>
<li><code>callback` Fungsi 
                                * `buffer` Buffer (optional)
                            * `penyelesaian` Fungsi (opsional) 
                              * Kesalahan `kesalahan`
                            
                            Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.
                            
                            ### `protocol.interceptHttpProtocol(scheme, handler[, completion])`
                            
                            * `skema` String
                            * `handler` Fungsi 
                              * `permintaan` Sasaran 
                                * ` url </ 0> String</li>
<li><code>pengarah` Tali
                                * `method` String
                                * `uploadData` [UploadData[]](structures/upload-data.md)
                              * `callback` Fungsi 
                                * `redirectRequest` Sasaran 
                                  * ` url </ 0> String</li>
<li><code>method` String
                                  * `sesi` Objek (opsional)
                                  * `uploadData` Objek (pilihan) 
                                    * `contentType` String - jenis konten MIME.
                                    * `data` String - Konten yang akan dikirim.
                            * `penyelesaian` Fungsi (opsional) 
                              * Kesalahan `kesalahan`
                            
                            Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.
                            
                            ### `protocol.interceptStreamProtocol(scheme, handler[, completion])`
                            
                            * `skema` String
                            * `handler` Fungsi 
                              * `permintaan` Sasaran 
                                * ` url </ 0> String</li>
<li><code>header` Obyek
                                * `pengarah` Tali
                                * `method` String
                                * `uploadData` [UploadData[]](structures/upload-data.md)
                              * `callback` Fungsi 
                                * `stream` (ReadableStream | [StreamProtocolResponse](structures/stream-protocol-response.md)) (optional)
                            * `penyelesaian` Fungsi (opsional) 
                              * Kesalahan `kesalahan`
                            
                            Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.
                            
                            ### `protocol.uninterceptProtocol(scheme[, completion])`
                            
                            * `skema` String
                            * `penyelesaian` Fungsi (opsional) 
                              * Kesalahan `kesalahan`
                            
                            Remove the interceptor installed for `scheme` and restore its original handler.