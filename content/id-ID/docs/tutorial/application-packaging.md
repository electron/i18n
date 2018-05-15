# Kemasan Aplikasi

Untuk mengurangi [ masalah </ 0> di sekitar nama path yang panjang di Windows , sedikit mempercepat ` require </ 1> dan menyembunyikan kode sumber Anda dari pemeriksaan sepintas, Anda dapat memilih untuk mengemas aplikasi Anda menjadi <a href="https://github.com/electron/asar"> asar </ 2> 
arsipkan dengan sedikit perubahan pada kode sumber Anda.</p>

<p>Most users will get this feature for free, since it's supported out of the box
by <a href="https://github.com/electron-userland/electron-packager"><code>electron-packager`](https://github.com/joyent/node/issues/6960), [`electron-forge`](https://github.com/electron-userland/electron-forge), and [`electron-builder`](https://github.com/electron-userland/electron-builder). If you are not using any of these tools, read on.

## Generating `asar` Archives

Sebuah  asar </ 0> arsip adalah tar-seperti format yang sederhana yang concatenates file ke dalam satu file. Elektron dapat membaca file-file sewenang-wenang darinya tanpa membongkar seluruh berkas.</p> 

Langkah-langkah untuk mengemas aplikasi Anda ke arsip ` asar </ 0> :</p>

<h3>1. Instal Asar Utility</h3>

<pre><code class="sh">$ npm install -g asar
`</pre> 

### 2. Paket dengan ` asar pack </ 0></h3>

<pre><code class="sh">$ asar pak aplikasi aplikasi Anda. asar
`</pre> 

## Menggunakan ` asar </ 0> Arsip</h2>

<p>Di Elektron ada dua set API: API Node yang disediakan oleh Node .js dan API Web yang disediakan oleh Chromium . Kedua API mendukung file bacaan dari arsip <code> asar </ 0> .</p>

<h3> API Node</h3>

<p>Dengan patch khusus di Elektron , API Node seperti <code> fs.readFile </ 0> dan <code> memerlukan </ 0> 
memperlakukan <code> asar </ 0> arsip sebagai direktori virtual, dan file di dalamnya seperti file biasa di filesystem</p>

<p>Misalnya, misalkan kita memiliki arsip <code> example.asar </ 0> di bawah <code> / path / to </ 0> :</p>

<pre><code class="sh">$ asar list / path / to / example. asar 
/app.js /file.txt /dir/module.js /static/index.html /static/main.css /static/jquery.min.js
`</pre> 

Baca file di arsip ` asar </ 0> :</p>

<pre><code class="javascript">const fs = require ('fs') fs.readFileSync ('/ path / to / example.asar / file.txt')
`</pre> 

Cantumkan semua file di bawah akar arsip:

```javascript
const fs = require ('fs') fs.readdirSync ('/ path / to / example.asar')
```

Gunakan modul dari arsip:

```javascript
membutuhkan ('/ path / to / example.asar / dir / module.js')
```

Anda juga dapat menampilkan halaman web di arsip ` asar </ 0> dengan <code> BrowserWindow </ 0> :</p>

<pre><code class="javascript">const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
`</pre> 

### Web API

Di halaman web, file dalam arsip dapat diminta dengan protokol ` : </ 0> . Seperti API Node  , <code> asar </ 0> arsip diperlakukan sebagai direktori.</p>

<p>Misalnya, untuk mendapatkan file dengan <code> $ .get </ 0> :</p>

<pre><code class="html"><script> 
biarkan $ = memerlukan ('./ jquery.min.js') $ .get ('file: ///path/to/example.asar/file.txt', (data) = & gt; {
   console. log (data)})
 </ 0>
`</pre> 

### Mengobati Arsip ` asar </ 0> sebagai File Normal</h3>

<p>Untuk beberapa kasus seperti memverifikasi checksum arsip <code> asar </ 0> , kita perlu membaca isi arsip <code> asar </ 0> sebagai file. Untuk tujuan ini Anda dapat menggunakan modul <code> original-fs </ 0> built-in
 yang menyediakan API asli <code> fs </ 0> tanpa <code> asar </ 0> ;</p>

<pre><code class="javascript">const originalFs = require ('original-fs') originalFs.readFileSync ('/ path / to / example.asar')
`</pre> 

Anda juga dapat mengatur ` process.noAsar </ 0> ke <code> true </ 0> untuk menonaktifkan dukungan <code> asar </ 0> di modul <code> fs </ 0></p>

<pre><code class="javascript">const fs = require ('fs') process.noAsar = true fs.readFileSync ('/ path / to / example.asar')
`</pre> 

## Keterbatasan API Node 

Meskipun kami berusaha keras membuat arsip ` asar </ 0> di API Node  bekerja seperti direktori sebanyak mungkin, masih ada batasan karena sifat rendah dari API Node . </p>

<h3>Arsip hanya baca saja</h3>

<p>Arsip tidak dapat dimodifikasi sehingga semua API Node yang dapat memodifikasi file tidak akan berfungsi dengan arsip <code> asar </ 0> .</p>

<h3>Direktori Kerja Tidak Dapat Ditetapkan ke Direktori di Arsip</h3>

<p>Meskipun arsip <code> asar </ 0> diperlakukan sebagai direktori, tidak ada direktori aktual dalam filesystem, jadi Anda tidak dapat mengatur direktori kerja ke direktori di arsip <code> asar </ 0> . Melewati mereka sebagai <code> cwd </ 0>  pilihan dari beberapa API juga akan menyebabkan kesalahan.</p>

<h3>Extra Unpacking pada Beberapa API</h3>

<p>Sebagian besar <code> fs </ 0> API dapat membaca file atau mendapatkan informasi file dari arsip <code> asar </ 0> tanpa membongkar, namun untuk beberapa API yang mengandalkan cara melewatkan jalur file sebenarnya ke panggilan sistem yang mendasarinya, Elektron akan mengekstrak file yang dibutuhkan ke file sementara dan melewati jalur file sementara ke API untuk membuatnya bekerja. Ini menambahkan sedikit overhead untuk API tersebut.</p>

<p>API yang membutuhkan pembongkaran ekstra adalah:</p>

<ul>
<li><code>child_process.execFile`</li> 

* `child_process.execFileSync`
* `fs.open`
* `fsopenSync`
* ` process.dlopen </ 0> - Digunakan oleh <code> require </ 0> pada modul asli</li>
</ul>

<h3>Informasi Stat Fake <code> fs.stat </ 0></h3>

<p><code>Statistik` objek yang dikembalikan oleh `fs.stat` dan teman-teman pada file dalam arsip `asar` yang dihasilkan oleh menebak, karena file tidak ada pada filesystem. Jadi sebaiknya Anda tidak mempercayai objek ` Statistik </ 0> kecuali untuk mendapatkan ukuran file dan memeriksa jenis file.</p>

<h3>Menjalankan binari di dalam <code>asar` Arsip</h3> 
    Ada API Node yang dapat menjalankan binari seperti ` child_process.exec </ 0> ,
 <code> child_process.spawn </ 0> dan <code> child_process.execFile </ 0> , namun hanya <code> execFile </ 0> didukung untuk menjalankan binari di dalam arsip <code> asar </ 0> .</p>

<p>Ini karena <code> exec </ 0> dan <code> menelurkan </ 0> menerima <code> perintah </ 0> daripada <code> file </ 0> sebagai masukan, dan <code> perintah </ 0 > dieksekusi di bawah shell Tidak ada cara yang dapat diandalkan untuk menentukan apakah sebuah perintah menggunakan file dalam arsip asar , dan bahkan jika kita melakukannya, kita tidak dapat memastikan apakah kita dapat mengganti jalan di perintah tanpa efek samping.</p>

<h2>Adding Unpacked Files to <code>asar` Archives</h2> 
    
    As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.
    
    As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:
    
    ```sh
    $ asar paket app app.asar--membongkar *.node
    ```
    
    After running the command, you will notice that a folder named `app.asar.unpacked` was created together with the `app.asar` file. It contains the unpacked files and should be shipped together with the `app.asar` archive.