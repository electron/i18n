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

* `webPreferences` Object (optional) - See [BrowserWindow](browser-window.md).</li> </ul> 

### Static Methods

#### `BrowserView.fromId(id)`

* `id` Integer

Returns `BrowserView` - The view with the given `id`.

### Instance Properties

Objects created with `new BrowserView` have the following properties:

#### `view.webContents` *Experimental*

A [`WebContents`](web-contents.md) object owned by this view.

#### `view.id` *Experimental*

A `Integer` representing the unique ID of the view.

### Instance Methods

Objects created with `new BrowserView` have the following instance methods:

#### `view.setAutoResize(options)` *Experimental*

* `pilihan` Object 
  * `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
  * `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### `view.setBounds(bounds)` *Experimental*

* `bounds` [Rectangle](structures/rectangle.md)

Resizes and moves the view to the supplied bounds relative to the window.

#### `view.setBackgroundColor(color)` *Experimental*

* `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.