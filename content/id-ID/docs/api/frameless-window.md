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
<li>Pada pengguna Linux harus meletakkan <code> --enable-transparent-visual --disable-gpu </ 0> pada baris perintah untuk menonaktifkan GPU dan membiarkan ARGB membuat jendela transparan, ini disebabkan oleh bug hulu yang <1 > alpha channel tidak bekerja pada beberapa driver NVidia </ 1> di Linux.</li>
<li>Di Mac bayangan jendela asli tidak akan ditampilkan pada jendela transparan.</li>
</ul>

<h2>Jendela klik-tayang</h2>

<p>Untuk membuat jendela klik-tayang, yaitu membuat jendela mengabaikan semua peristiwa mouse, Anda dapat memanggil API <a href="browser-window.md#winsetignoremouseeventsignore"> win.setIgnoreMouseEvents (ignore) </ 0>
 :</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
`</pre> 
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
    
    By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.
    
    Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.
    
    To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:
    
    ```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## Pilihan teks

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menu konteks

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.