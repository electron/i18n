# gambarasli

> Buat ikon nampan, dok , dan aplikasi menggunakan file PNG atau JPG.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Di Elektron , untuk API yang mengambil gambar, Anda dapat melewati jalur file atau ` NativeImage </ 0> . Gambar kosong akan digunakan saat <code> null </ 0> dilewatkan.</p>

<p>Misalnya, saat membuat baki atau mengatur ikon jendela, Anda dapat melewati jalur file gambar sebagai <code> String </ 0> :</p>

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

Saat ` PNG </ 0> dan <code> JPEG </ 0> format gambar yang didukung. <code> PNG </ 0> direkomendasikan karena dukungannya terhadap transparansi dan kompresi tanpa rugi.</p>

<p>On Windows, you can also load <code>ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

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

Periksa * persyaratan Ukuran </ 0> di  artikel ini </ 1> .</p> 

## Gambar Resolusi Tinggi

Pada platform yang memiliki dukungan DPI tinggi seperti display Apple Retina, Anda dapat menambahkan ` @ 2x </ 0> setelah nama file dasar gambar untuk menandainya sebagai gambar beresolusi tinggi.</p>

<p>For example, if <code>icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

Jika Anda ingin mendukung display dengan kepadatan DPI yang berbeda pada saat bersamaan, Anda dapat meletakkan gambar dengan ukuran berbeda di folder yang sama dan menggunakan nama file tanpa sufiks DPI. Sebagai contoh:

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

Template images consist of black and an alpha channel. Template images are not intended to be used as standalone images and are usually mixed with other content to create the desired final appearance.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

** Catatan: </ 0> Gambar template hanya didukung pada macOS .</p> 

Untuk menandai gambar sebagai gambar template, nama filenya harus diakhiri dengan kata ` Template </ 0> . Sebagai contoh:</p>

<ul>
<li><code>xxxTemplate.png`</li> 

* `xxxTemplate@2x.png`</ul> 

## Metode

Itu ` gambar asli </ 0> modul memiliki metode berikut, yang semuanya mengembalikan instance dari <code> NativeImage </ 0> kelas:</p>

<h3><code>gambar asli.membuat kosong()`</h3> 

Mengembalikan ` gambar asli </ 0></p>

<p>Membuat instance <code>NativeImage` kosong.

### `nativeImage.createFromPath(jalur)`

* ` path </ 0>  String</li>
</ul>

<p>Mengembalikan <code> gambar asli </ 0></p>

<p>Membuat instance <code>NativeImage` baru dari sebuah file yang berada di `path`. Metode ini mengembalikan gambar kosong jika `path` tidak ada, tidak bisa dibaca, atau tidak gambar yang valid.</p> 
  ```javascript
  const nativeImage = require('electron').nativeImage
  
  const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
  console.log(image)
  ```
  
  ### `nativeImage.createFromBitmap(buffer, options)`
  
  * `penyangga` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
  * `pilihan` Obyek 
    * ` width </ 0>  Integer</li>
<li><code> tinggi </ 0>  Integer</li>
<li><code>faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan ` gambar asli </ 0></p>

<p>Creates a new <code>NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.
  
  ### `nativeImage.createFromBuffer(buffer[, pilihan])`
  
  * `penyangga` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
  * `pilihan` Objek (opsional) 
    * `width` Integer (optional) - Required for bitmap buffers.
    * `height` Integer (optional) - Required for bitmap buffers.
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan ` gambar asli </ 0></p>

<p>Creates a new <code>NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.
  
  ### `gambar asli.buatdaridataURL(dataURL)`
  
  * ` dataURL ` tali
  
  Mengembalikan ` gambar asli </ 0></p>

<p>Menciptakan yang baru <code>Gambar Asli` contoh dari `dataURL`.
  
  ### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*
  
  * `imageName` String
  * `hslShift` Number[] (optional)
  
  Mengembalikan ` gambar asli </ 0></p>

<p>Creates a new <code>NativeImage` instance from the NSImage that maps to the given image name. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.
  
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
  
  #### `image.toPNG([options])`
  
  * `pilihan` Objek (opsional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan `Penyangga` - A [ Penyangga](https://nodejs.org/api/buffer.html#buffer_class_buffer)berisi data yang dikodekan` PNG </ 0>.</p>

<h4><code>image.toJPEG(quality)`</h4> 
  
  * `quality` Integer - Between 0 - 100.
  
  Mengembalikan`Buffer` - A [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi data dikodekan `JPEG`.
  
  #### `image.toBitmap([options])`
  
  * `pilihan` Objek (opsional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi salinan piksel bitmap mentah gambar data.
  
  #### `image.toDataURL([options])`
  
  * `pilihan` Objek (opsional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan ` String ` - URL data gambar.
  
  #### `image.getBitmap([options])`
  
  * `pilihan` Objek (opsional) 
    * `faktor skala`dua kali lipat (opsional) - Default ke 1.0.
  
  Mengembalikan `Buffer` - A [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang berisi data piksel bitmap mentah gambar.
  
  The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.
  
  #### ` image.getNativeHandle () </ 0>  <em> macos </ 1></h4>

<p>Mengembalikan <code>Buffer` - A [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer) yang menyimpan pointer C ke pegangan asli yang mendasarinya foto. Di macOS, sebuah pointer ke instance` NSImage ` akan dikembalikan.</p> 
  
  Perhatikan bahwa pointer yang dikembalikan adalah pointer lemah ke native yang mendasarinya gambar bukan salinannya, jadi Anda *harus* memastikannya terkait `nativeImage` contoh disimpan di sekitar.
  
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
  
  #### `image.resize(options)`
  
  * `pilihan` Obyek 
    * `width` Integer (optional) - Defaults to the image's width.
    * `height` Integer (optional) - Defaults to the image's height.
    * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. Defaultnya adalah ` terbaik </ 0> .
Nilai ini mengekspresikan kualitas / kecepatan tradeoff yang diinginkan. They are translated
into an algorithm-specific method that depends on the capabilities
(CPU, GPU) of the underlying platform. It is possible for all three methods
to be mapped to the same algorithm on a given platform.</li>
</ul></li>
</ul>

<p>Mengembalikan <code> gambar asli </ 0> - gambar ukurannya.</p>

<p>Jika hanya <code> tinggi </ 0> atau <code> lebar</ 0> </ 0> yang ditentukan maka rasio aspek saat ini akan dipertahankan dalam gambar ukurannya.</p>

<h4><code>image.getAspectRatio()`</h4> 
      Mengembalikan ` mengapung </ 0> - Rasio aspek gambar.</p>

<h4><code>image.addRepresentation(options)`</h4> 
      
      * `pilihan` Obyek 
        * `scaleFactor` Double - The scale factor to add the image representation for.
        * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
        * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
        * `buffer` Buffer (opsional) - Buffer yang berisi data gambar mentah.
        * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.
      
      Tambahkan representasi gambar untuk faktor skala tertentu. Ini bisa digunakan untuk secara eksplisit menambahkan representasi faktor skala yang berbeda ke gambar. Ini Bisa disebut pada gambar kosong.
      
      ### Contoh properti
      
      #### `nativeImage.isMacTemplateImage` *macOS*
      
      A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).
      
      Please note that this property only has an effect on macOS.