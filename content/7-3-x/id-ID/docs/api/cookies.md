## Kelas: Cookie

> Permintaan dan modifikasi cookie sesi.

Proses: [Main](../glossary.md#main-process)

Contoh dari ` Cookie </ 0> kelas diakses dengan menggunakan <code> cookie </ 0> properti dari <code> Sesi </ 0> .</p>

<p spaces-before="0">Sebagai contoh:</p>

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

<h4 spaces-before="0">Acara: 'berubah'</h4>

<ul>
<li><code>event` Event</li>
* `cookie`[ Cookie ](structures/cookie.md) - Cookie yang telah diubah.
* `cause` String - The cause of the change with one of the following values:
  * ` eksplisit </ 0> - Cookie diubah secara langsung oleh tindakan konsumen.</li>
<li><code> menimpa </ 0> - Cookie dihapus secara otomatis karena operasi insert yang overwrote itu.</li>
<li><code> kadaluarsa </ 0> - Kuki dihapus secara otomatis karena kadaluarsa.</li>
<li><code> diusir </ 0> - Cookie secara otomatis digusur saat pengumpulan sampah.</li>
<li><code> kadaluarsa-menimpa </ 0> - Kuki ditimpa dengan tanggal kadaluarsa yang telah kedaluwarsa.</li>
</ul></li>
<li><code> dihapus </ 0>  Boolean - <code> true </ 0> jika cookie dihapus, <code> false </ 0> sebaliknya.</li>
</ul>

<p spaces-before="0">Emitted ketika cookie diubah karena ditambahkan, diedit, dihapus, atau kadaluarsa.</p>

<h3 spaces-before="0">Metode Instance</h3>

<p spaces-before="0">Metode berikut tersedia pada contoh <code> Cookies </ 0> :</p>

<h4 spaces-before="0"><code>cookies.get(filter)`</h4>

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * ` nama </ 0>  String (opsional) - Menyaring kuki berdasarkan nama.</li>
<li><code>domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
  * ` path </ 0>  String (opsional) - Mengambil cookie yang jalurnya cocok dengan <code> path </ 0> .</li>
<li><code>aman`Boolean (opsional) - Filter cookie oleh properti Aman mereka.
  * `aman` Boolean (opsional) - Filter cookie oleh properti Aman mereka.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `details` Object
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (pilihan) - Domain cookie; ini akan dinormalisasi dengan titik sebelumnya sehingga juga berlaku untuk subdomain. Empty by default if omitted.
  * `jejak` String (pilihan) - Jejak dari sebuah cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Default ke false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Default ke false.
  * ` kadaluarsaDate </ 0>  Double (opsional) - Tanggal kadaluarsa cookie sebagai jumlah detik sejak zaman UNIX. Jika dihilangkan maka cookie menjadi cookie sesi dan tidak akan disimpan di antara sesi.</li>
</ul></li>
</ul>

<p spaces-before="0">Returns <code>Promise<void>` - A promise which resolves when the cookie has been set</p>

Sets a cookie with `details`.

#### `cookies.remove(url, name)`

* `url`String - URL yang terkait dengan cookie.
* `nama` String - Nama cookie untuk dihapus.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Tulis data cookie yang tidak tertulis ke disk.
