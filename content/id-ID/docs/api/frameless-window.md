# Jendela tanpa bingkai

> Buka jendela tanpa bilah alat, perbatasan, atau " krom " grafis lainnya .

Jendela buram tanpa bingkai adalah jendela yang tidak memiliki  krom </ 0> , bagian jendela, seperti bilah alat, yang bukan merupakan bagian dari halaman web. Ini adalah pilihan pada kelas ` BrowserWindow </ 0> .</p>

<h2>Buat jendela buram tanpa bingkai</h2>

<p>Untuk membuat jendela tanpa bingkai, Anda perlu mengatur <code> bingkai </ 0> ke <code> palsu </ 0> di
 <a href="browser-window.md">jendela Browser </ 1> 's <code> Pilihan </ 0> :</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
`</pre> 

### Alternatif macos

Pada macos 10.9 Mavericks dan yang lebih baru, ada cara alternatif untuk menentukan jendela chromeless. Alih-alih menyetel ` bingkai </ 0> ke <code> false </ 0> yang menonaktifkan kedua kontrol titlebar dan jendela, Anda mungkin ingin agar bilah judul tersembunyi dan konten Anda meluas ke ukuran jendela penuh, namun tetap lindungi kontrol jendela ("lampu lalu lintas") untuk tindakan jendela standar.
Anda dapat melakukannya dengan menetapkan <code> titleBarStyle </ 0>  option :</p>

<h4><code>tersembunyi`</h4> 

Hasil di bar judul tersembunyi dan jendela konten ukuran penuh, namun bilah judul masih memiliki kontrol jendela standar ("lampu lalu lintas") di kiri atas.

```javascript
const {jendela Browser} = memerlukan ('electron') biarkan menang = jendela Browser baru( {gaya catatan : 'tersembunyi'} ) menang.menunjukkan ()
```

#### `tersembunyi sisipan`

Hasil di bar judul tersembunyi dengan tampilan alternatif dimana tombol lampu lalu lintas sedikit lebih tertutup dari tepi jendela.

```javascript
const {jendela Browser} = memerlukan ('electron') biar menang = baru Browser jendela( {gaya catatan: 'tersembunyi sisipan'} ) menang.menunjukan ()
```

#### `adat tombol di atas hover`

Menggunakan tombol ditarik, miniatur, dan layar penuh yang dipamerkan saat melayang di kiri atas jendela. Tombol khusus ini mencegah masalah dengan peristiwa mouse yang terjadi dengan tombol toolbar jendela standar. This option is only applicable for frameless windows.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Transparent window

By setting the `transparent` option to `true`, you can also make the frameless window transparent:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### Limitations

* You can not click through the transparent area. We are going to introduce an API to set window shape to solve this, see [our issue](https://github.com/electron/electron/issues/1335) for details.
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* The `blur` filter only applies to the web page, so there is no way to apply blur effect to the content below the window (i.e. other applications open on the user's system).
* On Windows operating systems, transparent windows will not work when DWM is disabled.
* On Linux users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac the native window shadow will not be shown on a transparent window.

## Click-through window

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

## Draggable region

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

## Text selection

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Context menu

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.