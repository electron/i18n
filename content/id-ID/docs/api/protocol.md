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

<p>A standard scheme adheres to what RFC 3986 calls <a href="https://tools.ietf.org/html/rfc3986#section-3">generic URI
syntax</a>. For example <code>http` and `https` are standard schemes, while `file` is not.</p> 
    Registering a scheme as standard, will allow relative and absolute resources to be resolved correctly when served. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.
    
    For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:
    
    ```html
<body>
  <img src='test.png'>
</body>
```

Registering a scheme as standard will allow access to files through the [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Otherwise the renderer will throw a security error for the scheme.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme:

```javascript
const {app, protocol} = require('electron')

protocol.registerStandardSchemes(['atom'])
app.on('ready', () => {
  protocol.registerHttpProtocol('atom', '...')
})
```

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted.

### `protocol.registerServiceWorkerSchemes(schemes)`

* `schemes` String[] - Custom schemes to be registered to handle service workers.
### `protocol.registerFileProtocol(scheme, handler[, completion])`

* ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
  * `permintaan` Obyek 
    * ` url </ 0>  String</li>
<li><code>referrer` String
    * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
  * `callback` Fungsi 
    * `filePath` String (optional)
* `completion` Fungsi (opsional) 
  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Registers a protocol of <code>scheme` that will send the file as a response. The `handler` will be called with `handler(request, callback)` when a `request` is going to be created with `scheme`. `completion` will be called with `completion(null)` when `scheme` is successfully registered or `completion(error)` when failed.</p> 
    To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({path: filePath})`.
    
    When `callback` is called with nothing, a number, or an object that has an `error` property, the `request` will fail with the `error` number you specified. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).
    
    By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`, so you probably want to call `protocol.registerStandardSchemes` to have your scheme treated as a standard scheme.
    
    ### `protocol.registerBufferProtocol(scheme, handler[, completion])`
    
    * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
      * `permintaan` Obyek 
        * ` url </ 0>  String</li>
<li><code>referrer` String
        * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
      * `callback` Fungsi 
        * `buffer` (Buffer | [MimeTypedBuffer](structures/mime-typed-buffer.md)) (optional)
    * `completion` Fungsi (opsional) 
      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Registers a protocol of <code>scheme` that will send a `Buffer` as a response.</p> 
        The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data`, `mimeType`, and `charset` properties.
        
        Example:
        
        ```javascript
const {protocol} = require('electron')

protocol.registerBufferProtocol('atom', (request, callback) => {
  callback({mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>')})
}, (error) => {
  if (error) console.error('Failed to register protocol')
})
```
    
    ### `protocol.registerStringProtocol(scheme, handler[, completion])`
    
    * ` skema </ 0>  String</li>
<li><code>handler` Fungsi 
      * `permintaan` Obyek 
        * ` url </ 0>  String</li>
<li><code>referrer` String
        * ` method </ 0>  String</li>
<li><code>uploadData` [UploadData[]](structures/upload-data.md)
      * `callback` Fungsi 
        * `data` String (optional)
    * `completion` Fungsi (opsional) 
      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Registers a protocol of <code>scheme` that will send a `String` as a response.</p> 
        The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data`, `mimeType`, and `charset` properties.
        
        ### `protocol.registerHttpProtocol(scheme, handler[, completion])`
        
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
<li><code>session` Object (optional)
              * `uploadData` Objek (opsional) 
                * `contentType` String - MIME type of the content.
                * `data` String - Content to be sent.
        * `completion` Fungsi (opsional) 
          * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Registers a protocol of <code>scheme` that will send an HTTP request as a response.</p> 
            The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.
            
            By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.
            
            For POST requests the `uploadData` object must be provided.
            
            ### `protocol.unregisterProtocol(scheme[, completion])`
            
            * ` skema </ 0>  String</li>
<li><code>completion` Fungsi (opsional) 
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
                    * `completion` Fungsi (opsional) 
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
                        * `completion` Fungsi (opsional) 
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
                            * `completion` Fungsi (opsional) 
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
<li><code>session` Object (optional)
                                      * `uploadData` Objek (opsional) 
                                        * `contentType` String - MIME type of the content.
                                        * `data` String - Content to be sent.
                                * `completion` Fungsi (opsional) 
                                  * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Intercepts <code>scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.</p> 
                                    ### `protocol.uninterceptProtocol(scheme[, completion])`
                                    
                                    * ` skema </ 0>  String</li>
<li><code>completion` Fungsi (opsional) 
                                      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Remove the interceptor installed for <code>scheme` and restore its original handler.</p>