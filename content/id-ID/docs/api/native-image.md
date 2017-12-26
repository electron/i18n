# asli

> Buat ikon nampan, dok , dan aplikasi menggunakan file PNG atau JPG.

Proses:  Utama </ 0> ,  Renderer </ 1></p> 

Di Elektron , untuk API yang mengambil gambar, Anda dapat melewati jalur file atau ` NativeImage </ 0> . Gambar kosong akan digunakan saat <code> null </ 0> dilewatkan.</p>

<p>Misalnya, saat membuat baki atau mengatur ikon jendela, Anda dapat melewati jalur file gambar sebagai <code> String </ 0> :</p>

<pre><code class="javascript">const {BrowserWindow, Tray} = require ('electron') const appIcon = Baki baru ('/ Users / someone / images / icon.png') biarkan menang = new BrowserWindow ({icon: '/ Users / someone / images / window .png '}) console.log (appIcon, win)
`</pre> 

Atau baca gambar dari clipboard yang mengembalikan ` NativeImage </ 0> :</p>

<pre><code class="javascript">const {clipboard, Tray} = require ('electron') const image = clipboard.readImage () const appIcon = Baki baru (gambar) console.log (appIcon)
`</pre> 

## Format yang Didukung

Saat ` PNG </ 0> dan <code> JPEG </ 0> format gambar yang didukung. <code> PNG </ 0> direkomendasikan karena dukungannya terhadap transparansi dan kompresi tanpa rugi.</p>

<p>Pada Windows , Anda juga dapat memuat ikon <code> ICO </ 0> dari jalur file. Untuk kualitas visual terbaik, disarankan untuk menyertakan setidaknya ukuran berikut di:</p>

<ul>
<li>Small icon

<ul>
<li>16x16 (skala DPI 100%)</li>
<li>20x20 (skala DPI 125%)</li>
<li>24x24 (skala DPI 150%)</li>
<li>32x32 (skala DPI 200%)</li>
</ul></li>
<li>Ikon besar

<ul>
<li>32x32 (skala DPI 100%)</li>
<li>40x40 (skala DPI 125%)</li>
<li>48x48 (skala DPI 150%)</li>
<li>64x64 (skala DPI 200%)</li>
</ul></li>
<li>256x256</li>
</ul>

<p>Periksa <em> persyaratan Ukuran </ 0> di <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx"> artikel ini </ 1> .</p>

<h2>Gambar Resolusi Tinggi</h2>

<p>Pada platform yang memiliki dukungan DPI tinggi seperti display Apple Retina, Anda dapat menambahkan <code> @ 2x </ 0> setelah nama file dasar gambar untuk menandainya sebagai gambar beresolusi tinggi.</p>

<p>Misalnya jika <code> icon.png </ 0> adalah gambar normal yang memiliki resolusi standar, maka
 <code> icon@2x.png </ 0> akan diperlakukan sebagai gambar beresolusi tinggi yang memiliki densitas DPI ganda .</p>

<p>Jika Anda ingin mendukung display dengan kepadatan DPI yang berbeda pada saat bersamaan, Anda dapat meletakkan gambar dengan ukuran berbeda di folder yang sama dan menggunakan nama file tanpa sufiks DPI. Sebagai contoh:</p>

<pre><code class="text">gambar / ├── icon.png ├── icon@2x.png └── icon@3x.png
`</pre> 

```javascript
const {Tray} = membutuhkan ('elektron')
biarkan appIcon = Baki baru ('/Users/someone /images / icon.png')
console.log (appIcon)
```

Menyusul sufiks DPI juga didukung:

* `@1x`
* `@ 1.25x`
* `@1.33x`
* `@1.4x`
* `@1.5x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Gambar Template

Gambar template terdiri dari warna hitam dan bening (dan alpha channel). Gambar template tidak dimaksudkan untuk dijadikan gambar standalone dan biasanya dicampur dengan konten lain untuk menciptakan tampilan akhir yang diinginkan.

Kasus yang paling umum adalah dengan menggunakan gambar template untuk ikon menu bar sehingga bisa menyesuaikan dengan menu bar terang dan gelap.

** Catatan: </ 0> Gambar template hanya didukung pada macOS .</p> 

Untuk menandai gambar sebagai gambar template, nama filenya harus diakhiri dengan kata ` Template </ 0> . Sebagai contoh:</p>

<ul>
<li><code>xxxTemplate.png`</li> 

* `xxxTemplate@2x.png`</ul> 

## Metode

Itu ` gambar asli </ 0> modul memiliki metode berikut, yang semuanya mengembalikan instance dari <code> NativeImage </ 0> kelas:</p>

<h3><code>gambar asli.membuat kosong()`</h3> 

Mengembalikan ` gambar asli </ 0></p>

<p>Membuat instance < ID > NativeImage </ 0> kosong .</p>

<h3><code>nativeImage.createFromPath(jalur)`</h3> 

* ` path </ 0>  String</li>
</ul>

<p>Mengembalikan <code> gambar asli </ 0></p>

<p>Membuat instance <code>NativeImage` baru dari sebuah file yang berada di `path`. Metode ini mengembalikan gambar kosong jika ` path </ 0> tidak ada, tidak bisa dibaca, atau bukan gambar yang valid.</p>

<pre><code class="javascript">const nativeImage = require('elektron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(gambar)
`</pre> 
 ### `nativeImage.createFromBuffer(buffer[, pilihan])`
 
 * `penyangga` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
 * `pilihan`Objek (opsional)  *` width ` Integer (opsional) - Diperlukan untuk buffer bitmap. *`height` Integer (opsional) - Diperlukan untuk buffer bitmap. *`faktor skala`dua kali lipat (opsional) - Default ke 1.0.
 
 Mengembalikan ` gambar asli </ 0></p>

<p>Membuat contoh<code>gambar baru` baru dari `penyangga`.
 
 ### `gambar asli.buatdaridataURL(dataURL)`
 
 * ` dataURL ` tali
 
 Mengembalikan ` gambar asli </ 0></p>

<p>Menciptakan yang baru <code>Gambar Asli` contoh dari `dataURL`.
 
 ## Kelas: Gambar asli
 
 > Bungkus gambar seperti tray, dock , dan ikon aplikasi.
 
 Proses:  Utama </ 0> ,  Renderer </ 1></p> 
 
 ### Metode Instance
 
 Metode berikut tersedia pada contoh kelas ` Gambar asli`:
 
 #### `gambar.untukPng([options])`
 
 * `pilihan` Objek (opsional)  *`faktor skala` Dua kali lipat (opsional) - Default ke 1.0.
 
 Mengembalikan `Penyangga` - A [ Penyangga](https://nodejs.org/api/buffer.html#buffer_class_buffer)berisi data yang dikodekan` PNG </ 0>.</p>

<h4><code>image.toJPEG(quality)`</h4> 
 
 * `quality` Integer (**required**) - Between 0 - 100.
 
 Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.
 
 #### `image.toBitmap([options])`
 
 * `pilihan` Objek (opsional)  *`faktor skala` Dua kali lipat (opsional) - Default ke 1.0.
 
 Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.
 
 #### `image.toDataURL([options])`
 
 * `pilihan` Objek (opsional)  *`faktor skala` Dua kali lipat (opsional) - Default ke 1.0.
 
 Returns `String` - The data URL of the image.
 
 #### `image.getBitmap([options])`
 
 * `pilihan` Objek (opsional)  *`faktor skala` Dua kali lipat (opsional) - Default ke 1.0.
 
 Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's raw bitmap pixel data.
 
 The difference between `getBitmap()` and `toBitmap()` is, `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick, otherwise the data might be changed or destroyed.
 
 #### `image.getNativeHandle()` *macOS*
 
 Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.
 
 Perhatikan bahwa pointer kembali adalah pointer lemah untuk gambar asli yang mendasari bukan salinan, sehingga Anda * harus </ 0> memastikan bahwa terkait dengan ` nativeImage </ 1> contoh disimpan di sekitar.</p>

<h4><code>image.isEmpty()`</h4> 
 
 Returns `Boolean` - Whether the image is empty.
 
 #### `image.getSize()`
 
 Mengembalikan ` Ukuran </ 0></p>

<h4><code>image.setTemplateImage(option)`</h4> 
 
 * `option` Boolean
 
 Menandai gambar sebagai gambar template.
 
 #### `image.isTemplateImage()`
 
 Returns `Boolean` - Whether the image is a template image.
 
 #### `image.crop(rect)`
 
 * `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop
 
 Returns `NativeImage` - The cropped image.
 
 #### `gambar.mengubah ukuran (pilihan)`
 
 * ` pilihan </ 0> Objek
  * <code> lebar </ 0>  Integer (opsional) - Default ke lebar gambar.
 * <code> tinggi </ 0>  bilangan bulat (opsional) - Default ke tinggi gambar
  * <code> kualitas </ 0>  String (opsional) - Kualitas gambar mengubah ukuran yang diinginkan.
   Nilai yang mungkin <code> bagus </ 0> , <code> lebih baik </ 0> atau <code> terbaik </ 0> . Defaultnya adalah <code> terbaik </ 0> .
   Nilai ini mengekspresikan kualitas / kecepatan tradeoff yang diinginkan. Mereka diterjemahkan
    ke dalam metode algoritma khusus yang bergantung pada kemampuan
    (CPU, GPU) dari platform yang mendasarinya. Ada kemungkinan ketiga metode
    dipetakan ke algoritma yang sama pada platform tertentu.</li>
</ul>

<p>Mengembalikan <code> gambar asli </ 0> - gambar ukurannya.</p>

<p>Jika hanya <code> tinggi </ 0> atau <code> lebar</ 0> </ 0> yang ditentukan maka rasio aspek saat ini akan dipertahankan dalam gambar ukurannya.</p>

<h4><code>image.getAspectRatio()`</h4> 
  Mengembalikan ` mengapung </ 0> - Rasio aspek gambar.</p>

<h4><code>image.addRepresentation(options)`</h4> 
  
  * `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.
  
  Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.