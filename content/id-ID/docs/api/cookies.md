## Class: Cookies

> Query and modify a session's cookies.

Proses:  Utama </ 0></p> 

Contoh dari ` Cookie </ 0> kelas diakses dengan menggunakan <code> cookie </ 0> properti dari <code> Sesi </ 0> .</p>

<p>Sebagai contoh:</p>

<pre><code class="javascript">const {session} = require ('electron') // Query semua cookies.
session.defaultSession.cookies.get ({}, (error, cookies) = & gt; {
   console.log (error, cookies)}) // Query semua cookies yang terkait dengan url tertentu.
session.defaultSession.cookies.get ({url: 'http://www.github.com'}, (kesalahan, cookie) = & gt; {
   console.log (error, cookies)}) // Setel cookie dengan diberi data cookie; // dapat menimpa cookie yang setara jika ada.
const cookie = {url: 'http://www.github.com', nama: 'dummy_name', nilai: 'dummy'} session.defaultSession.cookies.set (cookie, (error) = & gt; {
   if (error ) console.error (error)})
`</pre> 

### Instance Events

Peristiwa berikut tersedia pada contoh ` Cookies </ 0> :</p>

<h4>Event: 'changed'</h4>

<ul>
<li><code> event </ 0>  Acara</li>
<li><code>cookie` [Cookie](structures/cookie.md) - The cookie that was changed</li> 

* `cause` String - Penyebab perubahan dengan salah satu dari nilai berikut: 
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

<h4><code>cookies.get(filter, callback)`</h4> 
    * `filter` Obyek 
      * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
      * `name` String (optional) - Filters cookies by name.
      * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`
      * `path` String (optional) - Retrieves cookies whose path matches `path`.
      * `secure` Boolean (optional) - Filters cookies by their Secure property.
      * `session` Boolean (optional) - Filters out session or persistent cookies.
    * `callback` Fungsi 
      * ` error </ 0> Kesalahan</li>
<li><code>cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.
    
    Sends a request to get all cookies matching `details`, `callback` will be called with `callback(error, cookies)` on complete.
    
    #### `cookies.set(details, callback)`
    
    * `details` Obyek 
      * `url` String - The url to associate the cookie with.
      * `name` String (optional) - The name of the cookie. Empty by default if omitted.
      * `value` String (optional) - The value of the cookie. Empty by default if omitted.
      * `domain` String (optional) - The domain of the cookie. Empty by default if omitted.
      * `path` String (optional) - The path of the cookie. Empty by default if omitted.
      * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
      * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
      * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
    * `callback` Fungsi 
      * ` error </ 0> Kesalahan</li>
</ul></li>
</ul>

<p>Sets a cookie with <code>details`, `callback` will be called with `callback(error)` on complete.</p> 
        #### `cookies.remove(url, name, callback)`
        
        * `url` String - The URL associated with the cookie.
        * `name` String - The name of cookie to remove.
        * `callback ` Fungsi
        
        Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.
        
        #### `cookies.flushStore(callback)`
        
        * `callback ` Fungsi
        
        Tulis data cookie yang tidak tertulis ke disk.