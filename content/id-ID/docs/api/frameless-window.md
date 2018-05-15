# Jendela tanpa bingkai

> Buka jendela tanpa bilah alat, perbatasan, atau " krom " grafis lainnya .

Jendela buram tanpa bingkai adalah jendela yang tidak memiliki  krom </ 0> , bagian jendela, seperti bilah alat, yang bukan merupakan bagian dari halaman web. Ini adalah pilihan pada kelas ` BrowserWindow </ 0> .</p>

<h2>Buat jendela buram tanpa bingkai</h2>

<p>Untuk membuat jendela tanpa bingkai, Anda perlu mengatur <code> bingkai </ 0> ke <code> palsu </ 0> di
 <a href="browser-window.md">jendela Browser </ 1> 's <code> Pilihan </ 0> :</p>

<pre><code class="javascript">const {BrowserWindow} = require ('electron') misalkan win = new BrowserWindow ( {width: 800, height: 600, frame: false} ) win.show ()
`</pre> 

### Alternatif macos

Pada macos 10.9 Mavericks dan yang lebih baru, ada cara alternatif untuk menentukan jendela chromeless. Alih-alih menyetel ` bingkai </ 0> ke <code> false </ 0> yang menonaktifkan kedua kontrol titlebar dan jendela, Anda mungkin ingin agar bilah judul tersembunyi dan konten Anda meluas ke ukuran jendela penuh, namun tetap lindungi kontrol jendela ("lampu lalu lintas") untuk tindakan jendela standar.
Anda dapat melakukannya dengan menetapkan <code> titleBarStyle </ 0>  option :</p>

<h4><code>tersembunyi`</h4> 

Hasil di bar judul tersembunyi dan jendela konten ukuran penuh, namun bilah judul masih memiliki kontrol jendela standar ("lampu lalu lintas") di kiri atas.

```javascript
const {BrowserWindow} = membutuhkan ('elektron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `tersembunyi sisipan`

Hasil di bar judul tersembunyi dengan tampilan alternatif dimana tombol lampu lalu lintas sedikit lebih tertutup dari tepi jendela.

```javascript
const {BrowserWindow} = membutuhkan ('elektron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `adat tombol di atas hover`

Menggunakan tombol ditarik, miniatur, dan layar penuh yang dipamerkan saat melayang di kiri atas jendela. Tombol khusus ini mencegah masalah dengan peristiwa mouse yang terjadi dengan tombol toolbar jendela standar. Ini pilihan ini hanya berlaku untuk jendela tanpa bingkai.

```javascript
const {BrowserWindow} = require ('electron') misalkan win = new BrowserWindow ( {titleBarStyle: 'customButtonsOnHover', frame: false} ) win.show ()
```

## Jendela transparan

Dengan menetapkan ` transparan </ 0>  option untuk <code> benar </ 0> , Anda juga dapat membuat jendela tanpa bingkai transparan:</p>

<pre><code class="javascript">const {BrowserWindow} = membutuhkan ('elektron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
`</pre> 

### Keterbatasan

* Anda tidak bisa mengklik area transparan. Kami akan memperkenalkan API untuk mengatur bentuk jendela untuk mengatasi masalah ini, lihat  masalah kami </ 0> untuk rinciannya.</li> 
    
    * Jendela transparan tidak resizable. Setting ` resizable </ 0> ke <code> true </ 0> mungkin membuat jendela transparan berhenti bekerja pada beberapa platform.</li>
<li><code> blur </ 0> Filter hanya berlaku untuk halaman web, sehingga tidak ada cara untuk menerapkan efek blur dengan isi di bawah jendela (yaitu aplikasi lain yang terbuka pada sistem pengguna).</li>
<li>Pada sistem operasi Windows , jendela transparan tidak akan berfungsi saat DWM dinonaktifkan.</li>
<li>On Linux, users have to put <code>--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
    * On Mac, the native window shadow will not be shown on a transparent window.</ul> 
    
    ## Jendela klik-tayang
    
    Untuk membuat jendela klik-tayang, yaitu membuat jendela mengabaikan semua peristiwa mouse, Anda dapat memanggil API  win.setIgnoreMouseEvents (ignore) </ 0> :</p> 
    
    ```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Forwarding

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

This makes the web page click-through when over `el`, and returns to normal outside it.

## Daerah serangga

Secara default, jendela tanpa bingkai tidak dapat ditarik. Aplikasi harus menentukan ` - webkit - app-wilayah: menyeret </ 0> dalam CSS untuk pemesanan elektron yang daerah draggable (seperti OS standar titlebar), dan aplikasi juga dapat menggunakan <code> - webkit - app-wilayah: no- drag </ 0> untuk mengecualikan daerah bebas-draggable dari daerah draggable. Perhatikan bahwa hanya bentuk persegi panjang yang saat ini didukung.</p>

<p>Catatan: <code> -webkit-app-region: drag </ 0> diketahui bermasalah saat alat pengembang terbuka. Lihat ini <a href="https://github.com/electron/electron/issues/3647"> Masalah GitHub </ 0> untuk informasi lebih lanjut termasuk solusi.</p>

<p>Untuk membuat seluruh jendela menjadi seret, Anda dapat menambahkan gaya <code> -webkit-app-region: drag </ 0> sebagai
 <code> body </ 0> :</p>

<pre><code class="html">&lt;body style="-webkit-app-region: drag"&gt; 
</ 0>
`</pre> 

Dan perhatikan bahwa jika Anda telah membuat keseluruhan jendela draggable, Anda juga harus menandai tombol sebagai non-draggable, jika tidak, tidak mungkin bagi pengguna untuk mengekliknya:

```css
tombol {
   -webkit-app-region: no-drag; }
```

Jika Anda menetapkan hanya titlebar kustom sebagai draggable, Anda juga perlu membuat semua tombol di titlebar yang tidak dapat digeser.

## Pilihan teks

Di jendela tanpa bingkai, perilaku menyeret mungkin bertentangan dengan pemilihan teks. Misalnya, saat Anda menyeret titlebar Anda mungkin secara tidak sengaja memilih teks pada titlebar. Untuk mencegah hal ini, Anda perlu menonaktifkan pemilihan teks dalam area yang dapat digeser seperti ini:

```css
.bar judul {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menu konteks

Pada beberapa platform, area draggable akan diperlakukan sebagai bingkai non-klien, jadi Bila Anda klik kanan pada menu sistem akan muncul. Untuk membuat menu berperilaku benar pada semua platform Anda tidak boleh menggunakan menu konteks kustom pada daerah yang seret.