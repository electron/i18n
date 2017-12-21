# bersih

> Masalahkan permintaan HTTP / HTTPS menggunakan perpustakaan jaringan asli Chromium

Proses:  Utama </ 0></p> 

The `` net </ 0> modul adalah client-side API untuk mengeluarkan HTTP (S) permintaan. Hal ini mirip dengan modul < N > HTTP </ 0> dan
 <a href="https://nodejs.org/api/https.html"> HTTPS </ 1> dari Node.js namun menggunakan library jaringan asli Chromium dan bukan implementasi Node.js, yang menawarkan dukungan yang lebih baik untuk proxy web.</p>

<p>Berikut ini adalah daftar yang tidak lengkap mengapa Anda dapat mempertimbangkan untuk menggunakan 
modul <code> net </ 0> daripada modul Node.js asli:</p>

<ul>
<li>Manajemen otomatis konfigurasi sistem proxy, dukungan protokol wpad dan file konfigurasi proxy pac.</li>
<li>Terowongan otomatis permintaan HTTPS.</li>
<li>Dukungan untuk otentikasi proxy menggunakan skema dasar, ringkasan, NTLM, Kerberos atau negosiasi otentikasi.</li>
<li>Dukungan untuk proxy pemantauan lalu lintas: Proxy seperti fiddler yang digunakan untuk kontrol akses dan pemantauan.</li>
</ul>

<p>The <code> net </ 0> modul API telah secara khusus dirancang untuk meniru, sedekat mungkin, akrab Node.js API . Komponen API termasuk kelas, metode, dan nama-nama acara yang mirip dengan yang sering digunakan dalam Node.js.</p>

<p>Misalnya, contoh berikut dengan cepat menunjukkan bagaimana <code> net </ 0>  API dapat digunakan:</p>

<pre><code class="javascript">const {app} = require('electron')
app.on('ready', () => {
  const {net} = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
``</pre> 

Omong-omong, hampir sama dengan bagaimana Anda biasa menggunakan modul  HTTP </ 0> /  HTTPS </ 1> dari Node.js</p> 

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Methods

The `net` module has the following methods:

### `net.request(options)`

* `options` (Object | String) - The `ClientRequest` constructor options.

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.