# nativeImage

> PNG ya da JPG dosyalarını kullanarak tepsi, dock(macOS menü) ve uygulama simgeleri oluşturun.

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Resim çeken API'ler için Electron'da dosya yollarını veya `NativeImage` örneklerini geçirebilirsiniz. `null` geçirilirse boş resim kullanılacaktır.

Örnek olarak, bir tepsi oluştururken veya pencere simgesi ayarlarken, görüntü dosyasının yolunu `String` olarak geçirebilirsiniz:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

Veya panodan `NativeImage` döndüren bir görüntü okuyun:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Desteklenen formatlar

Şu an için `PNG` ve `JPEG` görüntü biçimleri desteklenmektedir. `PNG`, şeffaflığı ve kayıpsız sıkıştırmayı desteklediği için önerilir.

Windows'ta `ICO` simgelerini de dosya yollarından yükleyebilirsiniz. En iyi görüntü kalitesi için aşağıdaki boyutları eklemeniz önerilir:

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

Örnek olarak eğer `icon.png` standart çözünürlüğe sahip normal bir görüntü ise, `icon@2x.png` iki kat DPI yoğunluğuna sahip yüksek çözünürlüklü görüntü olarak değerlendirilir.

Aynı anda farklı DPI yoğunluklarına sahip görüntüleri desteklemek istiyorsanız, farklı boyutlardaki görüntüleri aynı dizine koyun ve dosya isimlerini DPI son ekleri olmadan kullanın. Örneğin:

```text
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const {Tray} = require('electron')
let appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

DPI için aşağıdaki son ekler de desteklenmektedir:

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

Şablon görüntüleri siyah ve net renklerden (ve alfa kanalından) oluşur. Şablon görüntüleri bağımsız görüntüler olarak kullanılacak şekilde tasarlanmamıştır ve genellikle istenilen nihai görünüş oluşturmak için diğer içeriklerle karıştırılır.

En yaygın olanı, açık ve koyu menü çubuğuna ayarlanabilmesi için menü çubuğu simgesinde bir şablon resmi kullanmaktır.

**Not:** Şablon görüntüsü sadece macOS'ta desteklenmektedir.

Bir görüntüyü şablon görüntüsü olarak işaretmek için, dosya ismi `Template` ile bitmelidir. Örneğin:

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

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional) * `width` Integer (optional) - Required for bitmap buffers. * `height` Integer (optional) - Required for bitmap buffers. * `scaleFactor` Double (optional) - Defaults to 1.0.

`NativeImage` döndürür

`buffer`'dan yeni bir `NativeImage` örneği oluşturur.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

`NativeImage` döndürür

`dataURL`'den yeni bir `NativeImage` örneği oluşturur.

## Class: NativeImage

> Natively wrap images such as tray, dock, and application icons.

İşlem: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Örnek yöntemleri

Aşağıdaki yöntemler, `NativeImage` sınıfının örneklerinde bulunur:

#### `image.toPNG([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `PNG` kodlanmış verisini içeririr.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `JPEG` kodlanmış verisini içeririr.

#### `image.toBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisinin kopyasını içeririr.

#### `image.toDataURL([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

`String` döndürür - Görüntünün veri URL'si.

#### `image.getBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisini içeririr.

`getBitmap()` ve `toBitmap()` arasındaki fark, `getBitmap()` bitmap verilerini kopyalamamaktadır; bu nedenle, döndürülen arabelleği güncel olay döngüsü işaretinde hemen kullanmalısınız, aksi takdirde veriler değiştirilebilir veya imha edilebilir.

#### `image.getNativeHandle()` *macOS*

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Notice that the returned pointer is a weak pointer to the underlying native image instead of a copy, so you *must* ensure that the associated `nativeImage` instance is kept around.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize()`

Returns [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Görüntüyü şablon görüntüsü olarak işaretler.

#### `image.isTemplateImage()`

Returns `Boolean` - Whether the image is a template image.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Defaults to the image's width. * `height` Integer (optional) - Defaults to the image's height * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. Altta yatan platformun yeteneklerine (CPU, GPU) bağlı algoritmaya özgü bir yöntemle çevrilirler. It is possible for all three methods to be mapped to the same algorithm on a given platform.

`NativeImage` Döndürür - Yeniden boyutlanmış resim.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

`Float` Döner - Resmin en boy oranı.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Belirli ölçek faktörü için bir görüntü gösterimi ekleyin. Bu kullanılabilir görüntüye açıkca farklı ölçek faktörü gösterimleri eklemek için kullanılabilir. Bu boş görüntülerde çağrılabilir.