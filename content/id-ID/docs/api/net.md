# bersih

> Masalahkan permintaan HTTP / HTTPS menggunakan perpustakaan jaringan asli Chromium

Proses: [Main](../glossary.md#main-process)

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

<pre><code class="javascript">const {app} = require ('electron')
app.on ('siap', () => {
  const {net} = require ('electron')
  const request = net.request ('https://github.com')
  request.on ('respon', (respon) => {
    console.log (`STATUS: ${response.statusCode}`)
    console.log (`HEADERS: $ {JSON.stringify (response.header)}`)
    response.on ('data', (chunk) => {
      console.log (`BODY: ${chunk}`)
    })
    response.on ('akhir', () =>
      console.log ('Tidak ada lagi data yang di respon'.)
    })
  })
  request.end ()
})
``</pre> 

Omong-omong, hampir sama dengan bagaimana Anda biasa menggunakan modul  HTTP </ 0> /  HTTPS </ 1> dari Node.js</p> 

Itu` net </ 0>  API hanya dapat digunakan setelah aplikasi memancarkan <code> siap </ 0>  acara . Mencoba untuk menggunakan modul sebelum <code> siap </ 0>  acara akan melemparkan kesalahan.</p>

<h2>Metode</h2>

<p>Itu <code> net </ 0> modul memiliki metode berikut:</p>

<h3><code>net.pilihan (pilihan)`</h3> 

* `options` (Object | String) - Opsi konstruktor `ClientRequest`.

Mengembalikan  permintaan clien</ 0></p>

<p>Menciptakan <a href="./client-request.md"><code> permintaan klien </ 0> misalnya menggunakan disediakan
 <code> Pilihan </ 1> yang langsung diteruskan ke <code> permintaan klien </ 1> konstruktor.
Metode <code> net.request </ 0> akan digunakan untuk mengeluarkan permintaan HTTP yang aman dan tidak aman sesuai dengan skema protokol yang ditentukan di objek <code> options </ 0> .</p>