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
      * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
      * ` nama </ 0>  String (opsional) - Menyaring kuki berdasarkan nama.</li>
<li><code>domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
      * ` path </ 0>  String (opsional) - Mengambil cookie yang jalurnya cocok dengan <code> path </ 0> .</li>
<li><code>aman`Boolean (opsional) - Filter cookie oleh properti Aman mereka.
      * `aman` Boolean (opsional) - Filter cookie oleh properti Aman mereka.
    
    Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.
    
    Sends a request to get all cookies matching `filter`, and resolves a promise with the response.
    
    #### `cookies.set(details)`
    
    * `rincian` Objek 
      * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
      * `nama` String (opsional) - Nama cookie. Kosongkan secara default jika dihilangkan.
      * `value ` String (opsional) - Nilai cookie. Kosongkan secara default jika dihilangkan.
      * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
      * ` path </ 0> String (opsional) - Jalur cookie. Kosongkan secara default jika dihilangkan.</li>
<li><code> aman </ 0>  Boolean (opsional) - Apakah cookie harus ditandai sebagai Secure. Default ke false</li>
<li><code> httpOnly </ 0>  Boolean (opsional) - Apakah kuki tersebut hanya ditandai sebagai HTTP saja. Default ke false</li>
<li><code> kadaluarsaDate </ 0>  Double (opsional) - Tanggal kadaluarsa cookie sebagai jumlah detik sejak zaman UNIX. Jika dihilangkan maka cookie menjadi cookie sesi dan tidak akan disimpan di antara sesi.</li>
</ul></li>
</ul>

<p>Returns <code>Promise<void>` - A promise which resolves when the cookie has been set</p> 
        Sets a cookie with `details`.
        
        #### `cookies.remove(url, name)`
        
        * `url`String - URL yang terkait dengan cookie.
        * `nama` String - Nama cookie untuk dihapus.
        
        Returns `Promise<void>` - A promise which resolves when the cookie has been removed
        
        Removes the cookies matching `url` and `name`
        
        #### `cookies.flushStore()`
        
        Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed
        
        Tulis data cookie yang tidak tertulis ke disk.