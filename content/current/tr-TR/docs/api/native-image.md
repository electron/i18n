# nativeImage

> PNG ya da JPG dosyalarını kullanarak tepsi, dock(macOS menü) ve uygulama simgeleri oluşturun.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

Örnek olarak, bir tepsi oluştururken veya pencere simgesi ayarlarken, görüntü dosyasının yolunu `String` olarak geçirebilirsiniz:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

Or read the image from the clipboard, which returns a `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Desteklenen formatlar

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

* Küçük simge
  * 16x16 (100% DPI ölçeği)
  * 20x20 (125% DPI ölçeği)
  * 24x24 (150% DPI ölçeği)
  * 32x32 (200% DPI ölçeği)
* Büyük simge
  * 32x32 (100% DPI ölçeği)
  * 40x40 (125% DPI ölçeği)
  * 48x48 (150% DPI ölçeği)
  * 64x64 (200% DPI ölçeği)
  * 256x256

[Bu makalede](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx) bulunan *boyut gereksinimlerini* bölümünü kontrol edin.

## Yüksek çözünürlüklü görüntü

Apple Retina ekranları gibi yüksek DPI desteğine sahip platformlarda, yüksek çözünürlüklü resimleri işaretlemek için resmin temel dosya adından sonra `@2x` ekleyebilirsiniz.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Örneğin:

```plaintext
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const { Tray } = require('electron')
const appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

The following suffixes for DPI are also supported:

* `@1x`
* `@1.25x`
* `@1.33x`
* `@1.4x`
* `@1.5x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Şablon resmi

Template images consist of black and an alpha channel. Şablon görüntüleri bağımsız görüntüler olarak kullanılacak şekilde tasarlanmamıştır ve genellikle istenilen nihai görünüş oluşturmak için diğer içeriklerle karıştırılır.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Not:** Şablon görüntüsü sadece macOS'ta desteklenmektedir.

To mark an image as a template image, its filename should end with the word `Template`. Örneğin:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Metodlar

`nativeImage` modülü aşağıdaki metotlara sahiptir ve bunların hepsi `NativeImage` sınıfının bir örneğini döndürür:

### `nativeImage.createEmpty()`

`NativeImage` döndürür

Boş bir `NativeImage` örneği oluşturur.

### `nativeImage.createFromPath(path)`

* dizi `yolu`

`NativeImage` döndürür

`path` yolundaki dosyanın yeni bir `NativeImage` örneğini oluşturur. Bu metot, `path` mevcut değilse, okunamazsa veya geçerli bir görüntü değilse boş bir görüntü döndürür.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `arabellek` [Arabellek](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object
  * `width` Tamsayı
  * `height` Tamsayı
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`NativeImage` döndürür

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `arabellek` [Arabellek](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` tamsayı (isteğe bağlı) - Bitmap tamponları için gereklidir.
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`NativeImage` döndürür

`buffer`'dan yeni bir `NativeImage` örneği oluşturur. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL`Dizesi

`NativeImage` Çevir

`dataURL`'den yeni bir `NativeImage` örneği oluşturur.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` Dizge
* `hslShift` Number[] (optional)

`NativeImage` döndürür

NSImage'den, verilen resim adıyla eşleşen yeni bir `NativeImage` örneği oluşturur. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

`hslShift` görüntü uygulaması aşağıdaki gibi uygulanır:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

Bu, `[-1, 0, 1]` resmi tamamen beyaz yapar ve bu da `[-1, 1, 0]` görüntüyü tamamen siyah yapar.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Sınıf: NativeImage

> Yerel olarak tepsi resimlerini sar, liman aplikasyon ikonları.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Örnek Metodlar

Aşağıdaki yöntemler, `NativeImage` sınıfının örneklerinde bulunur:

#### `image.toPNG([options])`

* `options` Object (optional)
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `PNG` kodlanmış verisini içeririr.

#### `image.toJPEG(quality)`

* `quality` Integer - Between 0 - 100.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `JPEG` kodlanmış verisini içeririr.

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisinin kopyasını içeririr.

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`String` döndürür - Görüntünün veri URL'si.

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisini içeririr.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

`Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün temel yerel işaretçisine C işaretçisini saklar. MacOS' ta `NSImage` örneğine bir işaretçi iade edilecektir.

İşaretlenen işaretçinin, bir kopyanın yerine alttaki yerel görüntünün zayıf bir işaretçi olduğuna dikket edin, böylelikle _must_ nin `nativeImage` etrafında tutulmasını sağlıyorsunuz.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize()`

Çevirme [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Mantıksal

Görüntüyü şablon görüntüsü olarak işaretler.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `image.isTemplateImage()`

`Boolean` - Görüntünün şablon görüntüsü olup olmadığını gösterir.

**[Kullanımdan kaldırıldı](modernization/property-updates.md)**

#### `image.crop(rect)`

* `rect` [Dikdörtgen](structures/rectangle.md) - Kırpılacak resimin alanı.

Returns `NativeImage` - Kırpılan resim.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. Varsayılan değer `best`. Bu değerler elde edilmek istenen kalite/hız dengesini ifade eder. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

`NativeImage` Döndürür - Yeniden boyutlanmış resim.

Sadece `height` veya `width` belirtilirse yeniden boyutlandırılmış resimde mevcut en boy oranı korunur.

#### `image.getAspectRatio()`

`Float` Döner - Resmin en boy oranı.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Arabellek (isteğe bağlı) - Ham resim verilerini içeren arabelleği ifade eder.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Örnek Özellikleri

#### `nativeImage.isMacTemplateImage` _macOS_

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Please note that this property only has an effect on macOS.
