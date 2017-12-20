## Kelas: lihat browser

> Buat dan kontrol tampilan.

** Catatan: </ 0> lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.</p> 

Proses:  Utama </ 0></p> 

A ` lihat browser</ 0> dapat digunakan untuk menyematkan konten web tambahan ke
 <code> jendela Browser</ 0> . Ini seperti jendela anak, kecuali yang diposisikan relatif terhadap jendela miliknya. Hal ini dimaksudkan untuk menjadi alternatif
 tag <code> lihat web</ 0> .</p>

<h2>Contoh</h2>

<pre><code class="javascript">// Dalam proses utamanya.
const {BrowserView, BrowserWindow} = require ('elektron') nyalakan = baru BrowserWindow ({width: 800, height: 600}) win.on ('tertutup', () = & gt; {mut = null}) = BrowserView baru ({webPreferences: {nodeIntegration: false}}) win.setBrowserView (view) view.setBounds ({x: 0, y: 0, lebar: tinggi 300,: 300}) view.webContents.loadURL ('https : //electron.atom.io ')
`</pre> 

### ` baru lihat browser( [options] ) </ 0>  <em> Eksperimental </ 1></h3>

<ul>
<li><code>pilihan` Objek (opsional) 

* ` refrensi web</ 0> </ 0> Objek (contoh) - Lihat <a href="browser-window.md">jendela Browser </ 1>.</li>
</ul></li>
</ul>

<h3>Metode Statis</h3>

<h4><code>Lihat Browser.fromId (id)`</h4> 
  * ` id </ 0>  Bilangan bulat</li>
</ul>

<p>Kembali <code> lihat Browser </ 0> - Tampilan dengan <code> id </ 0> yang diberikan .</p>

<h3>Contoh properti</h3>

<p>Objek yang dibuat dengan <code>lihat Browser baru </ 0> memiliki properti berikut:</p>

<h4><code> baru lihat browser () </ 0> <em> Eksperimental </ 1></h4>

<p>Sebuah <a href="web-contents.md"><code> isi Web </ 0> objek yang dimiliki oleh pandangan ini.</p>

<h4><code> lihat.id </ 0>  <em> Eksperimental </ 1></h4>

<p>A <code>bilangan bulat </ 0> mewakili ID unik dari tampilan.</p>

<h3>Metode contoh</h3>

<p>Objek yang dibuat dengan <code> lihat Browser baru </ 0> memiliki metode contoh berikut:</p>

<h4><code> lihat.set otomatis ubah ukuran (pilihan) </ 0>  <em> Eksperimental </ 1></h4>

<ul>
<li><code>pilihan` Objek 
    * ` lebar </ 0>  Boolean - Jika <code> benar </ 0> , lebar tampilan akan tumbuh dan menyusut bersamaan dengan jendela. <code> false </ 0> secara default.</li>
<li><code> tinggi </ 0>  Boolean - Jika <code> benar </ 0> , tinggi tampilan akan tumbuh dan menyusut bersamaan dengan jendela. <code> salah </ 0> secara default.</li>
</ul></li>
</ul>

<h4><code> lihat.set batas (batas) </ 0>  <em> Eksperimental </ 1></h4>

<ul>
<li><code> batas </ 0>  <a href="structures/rectangle.md">  Empat persegi panjang </ 1></li>
</ul>

<p>Mengubah ukuran dan memindahkan pandangan ke batas yang tersedia relatif terhadap jendela.</p>

<h4><code>view.setBackgroundColor(color)` *Experimental*</h4> 
      * `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.