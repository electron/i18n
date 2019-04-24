## Kelas: Cookie

> Permintaan dan modifikasi cookie sesi.

Proses: [Main](../glossary.md#main-process)

Contoh dari ` Cookie </ 0> kelas diakses dengan menggunakan <code> cookie </ 0> properti dari <code> Sesi </ 0> .</p>

<p>Sebagai contoh:</p>

<pre><code class="javascript">const { session } = require ('electron') // Query semua cookies.
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
`</pre> 

### Contoh peristiwa

Peristiwa berikut tersedia pada contoh ` Cookies </ 0> :</p>

<h4>Acara: 'berubah'</h4>

<ul>
<li><code>event` Event</li> 

* `cookie`[ Cookie ](structures/cookie.md) - Cookie yang telah diubah.
* `sebab` String - Penyebab perubahan dengan salah satu dari nilai berikut: 
  * ` eksplisit </ 0> - Cookie diubah secara langsung oleh tindakan konsumen.</li>
<li><code> menimpa </ 0> - Cookie dihapus secara otomatis karena operasi insert yang overwrote itu.</li>
<li><code> kadaluarsa </ 0> - Kuki dihapus secara otomatis karena kadaluarsa.</li>
<li><code> diusir </ 0> - Cookie secara otomatis digusur saat pengumpulan sampah.</li>
<li><code> kadaluarsa-menimpa </ 0> - Kuki ditimpa dengan tanggal kadaluarsa yang telah kedaluwarsa.</li>
</ul></li>
<li><code> dihapus </ 0>  Boolean - <code> true </ 0> jika cookie dihapus, <code> false </ 0> sebaliknya.</li>
</ul>

<p>Emitted ketika cookie diubah karena ditambahkan, diedit, dihapus, atau kadaluarsa.</p>

<h3>Metode Instance</h3>

<p>Metode berikut tersedia pada contoh <code> Cookies </ 0> :</p>

<h4><code>cookies.get(filter)`</h4> 
    * `filter` Obyek 
      * ` url </ 0>  String (opsional) - Mengambil cookie yang dikaitkan dengan
 <code> url </ 0> . Empty berarti mengambil cookies dari semua url.</li>
<li><code> nama </ 0>  String (opsional) - Menyaring kuki berdasarkan nama.</li>
<li><code>domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
      * ` path </ 0>  String (opsional) - Mengambil cookie yang jalurnya cocok dengan <code> path </ 0> .</li>
<li><code>aman`Boolean (opsional) - Filter cookie oleh properti Aman mereka.
      * `aman` Boolean (opsional) - Filter cookie oleh properti Aman mereka.
    
    Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.
    
    Sends a request to get all cookies matching `filter`, and resolves a promise with the response.
    
    #### `cookies.get(filter, panggilan kembali)`
    
    * `filter` Objek 
      * ` url </ 0>  String (opsional) - Mengambil cookie yang dikaitkan dengan
 <code> url </ 0> . Empty berarti mengambil cookies dari semua url.</li>
<li><code> nama </ 0>  String (opsional) - Menyaring kuki berdasarkan nama.</li>
<li><code>domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
      * ` path </ 0>  String (opsional) - Mengambil cookie yang jalurnya cocok dengan <code> path </ 0> .</li>
<li><code>aman`Boolean (opsional) - Filter cookie oleh properti Aman mereka.
      * `aman` Boolean (opsional) - Filter cookie oleh properti Aman mereka.
    * `callback` Fungsi 
      * Kesalahan `kesalahan`
      * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.
    
    Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.
    
    **[Deprecated Soon](promisification.md)**
    
    #### `cookies.set(details)`
    
    * `rincian` Sasaran 
      * `url` String - The url to associate the cookie with.
      * `name` String (optional) - The name of the cookie. Empty by default if omitted.
      * `value` String (optional) - The value of the cookie. Empty by default if omitted.
      * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
      * `path` String (optional) - The path of the cookie. Empty by default if omitted.
      * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
      * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
      * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
    
    Returns `Promise<void>` - A promise which resolves when the cookie has been set
    
    Sets a cookie with `details`.
    
    #### `cookies.set(details, panggilan kembali)`
    
    * `rincian` Sasaran 
      * `url` String - The url to associate the cookie with.
      * `name` String (optional) - The name of the cookie. Empty by default if omitted.
      * `value` String (optional) - The value of the cookie. Empty by default if omitted.
      * `domain` String (optional) - The domain of the cookie. Empty by default if omitted.
      * `path` String (optional) - The path of the cookie. Empty by default if omitted.
      * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
      * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
      * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
    * `callback` Fungsi 
      * Kesalahan `kesalahan`
    
    Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.
    
    **[Deprecated Soon](promisification.md)**
    
    #### `cookies.remove(url, name)`
    
    * `url` String - The URL associated with the cookie.
    * `name` String - The name of cookie to remove.
    
    Returns `Promise<void>` - A promise which resolves when the cookie has been removed
    
    Removes the cookies matching `url` and `name`
    
    #### `cookies.remove (url, nama, callback)`
    
    * `url` String - The URL associated with the cookie.
    * `name` String - The name of cookie to remove.
    * `callback ` Fungsi
    
    Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.
    
    **[Deprecated Soon](promisification.md)**
    
    #### `cookies.flushStore()`
    
    Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed
    
    Writes any unwritten cookies data to disk.
    
    #### `cookies.flushStore(callback)`
    
    * `callback ` Fungsi
    
    Writes any unwritten cookies data to disk.
    
    **[Deprecated Soon](promisification.md)**