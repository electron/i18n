# asli

> Buat ikon nampan, dok , dan aplikasi menggunakan file PNG atau JPG.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

Misalnya, saat membuat baki atau mengatur ikon jendela, Anda dapat melewati jalur file gambar sebagai ` String </ 0> :</p>

<pre><code class="javascript">const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
`</pre>

Or read the image from the clipboard, which returns a `NativeImage`:

```javascript
const { clipboard, Tray } = require ('electron') const image = clipboard.readImage () const appIcon = Baki baru (gambar) console.log (appIcon)
```

## Format yang Didukung

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

* Small icon
  * 16x16 (skala DPI 100%)
  * 20x20 (skala DPI 125%)
  * 24x24 (skala DPI 150%)
  * 32x32 (skala DPI 200%)
* Ikon besar
  * 32x32 (skala DPI 100%)
  * 40x40 (skala DPI 125%)
  * 48x48 (skala DPI 150%)
  * 64x64 (skala DPI 200%)
  * 256x256

Periksa * persyaratan Ukuran </ 0> di

 artikel ini </ 1> .</p> 



## Gambar Resolusi Tinggi

Pada platform yang memiliki dukungan DPI tinggi seperti display Apple Retina, Anda dapat menambahkan ` @ 2x </ 0> setelah nama file dasar gambar untuk menandainya sebagai gambar beresolusi tinggi.</p>

<p spaces-before="0">For example, if <code>icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Sebagai contoh:



```plaintext
gambar / ├── icon.png ├── icon@2x.png └── icon@3x.png
```




```javascript
const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```


The following suffixes for DPI are also supported:

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

Template images consist of black and an alpha channel. Gambar template tidak dimaksudkan untuk dijadikan gambar standalone dan biasanya dicampur dengan konten lain untuk menciptakan tampilan akhir yang diinginkan.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

** Catatan: </ 0> Gambar template hanya didukung pada macOS .</p> 

To mark an image as a template image, its filename should end with the word `Template`. Sebagai contoh:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`



## Metode

Itu ` gambar asli </ 0> modul memiliki metode berikut, yang semuanya mengembalikan instance dari <code> NativeImage </ 0> kelas:</p>

<h3 spaces-before="0"><code>gambar asli.membuat kosong()`</h3> 

Mengembalikan ` gambar asli </ 0></p>

<p spaces-before="0">Membuat instance <code>NativeImage` kosong.



### `nativeImage.createFromPath(jalur)`

* ` path </ 0>  String</li>
</ul>

<p spaces-before="0">Mengembalikan <code> gambar asli </ 0></p>

<p spaces-before="0">Membuat instance <code>NativeImage` baru dari sebuah file yang berada di `path`. Metode ini mengembalikan gambar kosong jika `path` tidak ada, tidak bisa dibaca, atau tidak gambar yang valid.</p> 
  

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```




### `nativeImage.createFromBitmap(buffer, options)`

* `penyangga` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object 
    * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>faktor skala`dua kali lipat (opsional) - Default ke 1.0.
Mengembalikan ` gambar asli </ 0></p>

<p spaces-before="0">Creates a new <code>NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.



### `nativeImage.createFromBuffer(buffer[, pilihan])`

* `penyangga` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional) 
    * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
Mengembalikan ` gambar asli </ 0></p>

<p spaces-before="0">Membuat contoh<code>gambar baru` baru dari `penyangga`. Tries to decode as PNG or JPEG first.



### `gambar asli.buatdaridataURL(dataURL)`

* ` dataURL ` tali
Mengembalikan ` gambar asli </ 0></p>

<p spaces-before="0">Menciptakan yang baru <code>Gambar Asli` contoh dari `dataURL`.



### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (optional)
Mengembalikan ` gambar asli </ 0></p>

<p spaces-before="0">Creates a new <code>NativeImage` instance from the NSImage that maps to the given image name. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

The `hslShift` is applied to the image with the following rules:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).

* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.

* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).
This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).



## Kelas: Gambar asli



> Bungkus gambar seperti nampan, dermaga, dan ikon aplikasi.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)



### Metode Instance

Metode berikut tersedia pada contoh kelas ` Gambar asli`:



#### `gambar.untukPng([options])`

* `options` Object (optional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
Mengembalikan `Penyangga` - A [ Penyangga](https://nodejs.org/api/buffer.html#buffer_class_buffer)berisi data yang dikodekan` PNG </ 0>.</p>

<h4 spaces-before="0"><code>image.toJPEG(quality)`</h4> 

* `quality` Integer - Between 0 - 100.

Mengembalikan`Buffer` - A [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi data dikodekan `JPEG`.



#### `image.toBitmap([options])`

* `options` Object (optional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.

Mengembalikan `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi salinan piksel bitmap mentah gambar data.



#### `image.toDataURL([options])`

* `options` Object (optional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.

Mengembalikan ` String ` - URL data gambar.



#### `image.getBitmap([options])`

* `options` Object (optional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.

Mengembalikan `Buffer` - A [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi data piksel bitmap mentah gambar.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.



#### `image.getNativeHandle()` _macOS_

Mengembalikan `Buffer` - A [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang menyimpan pointer C ke pegangan asli yang mendasarinya foto. Di macOS, sebuah pointer ke instance` NSImage ` akan dikembalikan.

Perhatikan bahwa pointer yang dikembalikan adalah pointer lemah ke native yang mendasarinya gambar bukan salinannya, jadi Anda _harus_ memastikannya terkait `nativeImage` contoh disimpan di sekitar.



#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.



#### `image.getSize()`

Mengembalikan [`Ukuran`](structures/size.md)



#### `image.setTemplateImage(option)`

* `pilihan` Boolean

Menandai gambar sebagai gambar template.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `image.isTemplateImage()`

Mengembalikan `Boolean` - Apakah gambar itu adalah gambar template.

**[Tidak berlaku lagi](modernization/property-updates.md)**



#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - Area gambar yang akan dipotong.

Mengembalikan `NativeImage` - Gambar yang dipotong.



#### `gambar.mengubah ukuran (pilihan)`

* `options` Object 
    * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. Defaultnya adalah ` terbaik </ 0> .
Nilai ini mengekspresikan kualitas / kecepatan tradeoff yang diinginkan. They are translated
into an algorithm-specific method that depends on the capabilities
(CPU, GPU) of the underlying platform. It is possible for all three methods
to be mapped to the same algorithm on a given platform.</li>
</ul></li>
</ul>

<p spaces-before="0">Mengembalikan <code> gambar asli </ 0> - gambar ukurannya.</p>

<p spaces-before="0">Jika hanya <code> tinggi </ 0> atau <code> lebar</ 0> </ 0> yang ditentukan maka rasio aspek saat ini akan dipertahankan dalam gambar ukurannya.</p>

<h4 spaces-before="0"><code>image.getAspectRatio()`</h4> 
    Mengembalikan ` mengapung </ 0> - Rasio aspek gambar.</p>

<h4 spaces-before="0"><code>image.addRepresentation(options)`</h4> 
    
    * `options` Object 
    * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (opsional) - Default ke 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Default ke 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (opsional) - Buffer yang berisi data gambar mentah.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.



### Contoh properti



#### `nativeImage.isMacTemplateImage` _macOS_

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Please note that this property only has an effect on macOS.
