# bersih

> Masalahkan permintaan HTTP / HTTPS menggunakan perpustakaan jaringan asli Chromium

Proses: [Main](../glossary.md#main-process)

The `` net </ 0> modul adalah client-side API untuk mengeluarkan HTTP (S) permintaan. Hal ini mirip dengan modul < N > HTTP </ 0> dan
 <a href="https://nodejs.org/api/https.html"> HTTPS </ 1> dari Node.js namun menggunakan library jaringan asli Chromium dan bukan implementasi Node.js, yang menawarkan dukungan yang lebih baik untuk proxy web.</p>

<p spaces-before="0">Berikut ini adalah daftar yang tidak lengkap mengapa Anda dapat mempertimbangkan untuk menggunakan 
modul <code> net </ 0> daripada modul Node.js asli:</p>

<ul>
<li><p spaces-before="0">Manajemen otomatis konfigurasi sistem proxy, dukungan protokol wpad dan file konfigurasi proxy pac.</p></li>
<li><p spaces-before="0">Terowongan otomatis permintaan HTTPS.</p></li>
<li><p spaces-before="0">Dukungan untuk otentikasi proxy menggunakan skema dasar, ringkasan, NTLM, Kerberos atau negosiasi otentikasi.</p></li>
<li><p spaces-before="0">Dukungan untuk proxy pemantauan lalu lintas: Proxy seperti fiddler yang digunakan untuk kontrol akses dan pemantauan.</p></li>
</ul>

<p spaces-before="0">The API components (including classes, methods, properties and event names) are similar to those used in
Node.js.</p>

<p spaces-before="0">Example usage:</p>

<pre><code class="javascript">const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
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

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Methods

Itu ` net </ 0> modul memiliki metode berikut:</p>

<h3 spaces-before="0"><code>net.pilihan (pilihan)`</h3>

* `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

Mengembalikan  permintaan clien</ 0></p>

<p spaces-before="0">Menciptakan <a href="./client-request.md"><code> permintaan klien </ 0> misalnya menggunakan disediakan
 <code> Pilihan </ 1> yang langsung diteruskan ke <code> permintaan klien </ 1> konstruktor.
Metode <code> net.request </ 0> akan digunakan untuk mengeluarkan permintaan HTTP yang aman dan tidak aman sesuai dengan skema protokol yang ditentukan di objek <code> options </ 0> .</p>
