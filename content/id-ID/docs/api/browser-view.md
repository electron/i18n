## Kelas: lihat browser

> Buat dan kontrol tampilan.

**Catatan:** lihat browser API masih bersifat eksperimental dan mungkin mengubah atau dihapus elektron pada masa depan.

Proses: [Utama](../glossary.md#main-process)

A `lihat browser` dapat digunakan untuk menyematkan konten web tambahan ke `jendela Browse`. Ini seperti jendela anak, kecuali yang diposisikan relatif terhadap jendela miliknya. Hal ini dimaksudkan untuk menjadi alternatif tag `lihat web`.

## Contoh

```javascript
// Dalam proses utamanya.
const {BrowserView, BrowserWindow} = require('elektron') nyalakan = baru BrowserWindow ({width: 800, height: 600}) win.on('tertutup', () => {mut = null}) = BrowserView baru ({webPreferences: {nodeIntegration: false}}) win.setBrowserView (view) view.setBounds ({x: 0, y: 0, lebar: tinggi 300,: 300 }) view.webContents.loadURL('https://electron.atom.io')
```

### `baru lihat browser([options])` *Eksperimental*

* `pilihan` Objek (opsional) 
  * `refrensi web` Objek (contoh) - Lihat [jendela Browser](browser-window.md).

### Metode Statis

#### `Lihat Browser.fromId (id)`

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
  *  lebar </ 0>  Boolean - Jika <code> benar </ 0> , lebar tampilan akan tumbuh dan menyusut bersamaan dengan jendela. <code> false </ 0> secara default.</li>
<li><code> tinggi </ 0>  Boolean - Jika <code> benar </ 0> , tinggi tampilan akan tumbuh dan menyusut bersamaan dengan jendela. <code> salah </ 0> secara default.</li>
</ul></li>
</ul>

<h4><code> lihat.set batas (batas) </ 0>  <em> Eksperimental </ 1></h4>

<ul>
<li><code> batas </ 0>  <a href="structures/rectangle.md">  Empat persegi panjang </ 1></li>
</ul>

<p>Mengubah ukuran dan memindahkan pandangan ke batas yang tersedia relatif terhadap jendela.</p>

<h4><code> lihat.set latar belakang warna(warna) </ 0>  <em> Eksperimental </ 1></h4>

<ul>
<li><code> warna </ 0>  tali - Warna dalam <code> #aarrggbb </ 0> atau <code> #argb </ 0> . Saluran alfa bersifat opsional.</li>
</ul>