# nativeImage

> PNG ya da JPG dosyalarını kullanarak tepsi, dock(macOS menü) ve uygulama simgeleri oluşturun.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

`NativeImage` Çevir

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

* `arabellek` [Arabellek](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` obje (isteğe bağlı) *`width` tamsayı (isteğe bağlı) - Bitmap tamponları için gereklidir. * `height` tamsayı (isteğe bağlı) - Bitmap tamponları için gereklidir. * `scaleFactor` Double (isteğe bağlı) - Varsayılan değer 1.0.

`NativeImage` döndürür

`buffer`'dan yeni bir `NativeImage` örneği oluşturur.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL`Dizesi

`NativeImage` döndürür

`dataURL`'den yeni bir `NativeImage` örneği oluşturur.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` Dizge
* `hslShift` Number[]

`NativeImage` Çevir

NSImage'den, verilen resim adıyla eşleşen yeni bir `NativeImage` örneği oluşturur. Olası değerlerin bir listesi için [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) bölümüne bakın.

`hslShift` görüntü uygulaması aşağıdaki gibi uygulanır

* `hsl_shift[0]` (renk tonu): Görüntünün mutlak renk tonu değeri - 0 ve 1, renk tonu tekerleğinde (kırmızı) 0 ve 360'a denk gelir.
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

Bu, `[-1, 0, 1]` resmi tamamen beyaz yapar ve bu da `[-1, 1, 0]` görüntüyü tamamen siyah yapar.

## Sınıf: NativeImage

> Yerel olarak tepsi resimlerini sar, liman aplikasyon ikonları.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Örnek Metodlar

Aşağıdaki yöntemler, `NativeImage` sınıfının örneklerinde bulunur:

#### `image.toPNG([options])`

* `options` Obje (isteğe bağlı) * `scaleFactor` Double (İsteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `PNG` kodlanmış verisini içeririr.

#### `image.toJPEG(quality)`

* `quality` tamsayı (**required**) - 0 - 100 arasında.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün `JPEG` kodlanmış verisini içeririr.

#### `image.toBitmap([options])`

* `options` Obje (isteğe bağlı) * `scaleFactor` Double (İsteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisinin kopyasını içeririr.

#### `image.toDataURL([options])`

* `options` Obje (isteğe bağlı) * `scaleFactor` Double (İsteğe bağlı) - Varsayılan değer 1.0.

`String` döndürür - Görüntünün veri URL'si.

#### `image.getBitmap([options])`

* `options` Obje (isteğe bağlı) * `scaleFactor` Double (İsteğe bağlı) - Varsayılan değer 1.0.

`Buffer` döndürür - Bir [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün raw bitmap pixel verisini içeririr.

`getBitmap()` ve `toBitmap()` arasındaki fark, `getBitmap()` bitmap verilerini kopyalamamaktadır; bu nedenle, döndürülen arabelleği güncel olay döngüsü işaretinde hemen kullanmalısınız, aksi takdirde veriler değiştirilebilir veya imha edilebilir.

#### `image.getNativeHandle()` *macOS*

`Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) görüntünün temel yerel işaretçisine C işaretçisini saklar. MacOS' ta `NSImage` örneğine bir işaretçi iade edilecektir.

İşaretlenen işaretçinin, bir kopyanın yerine alttaki yerel görüntünün zayıf bir işaretçi olduğuna dikket edin, böylelikle *must* nin `nativeImage` etrafında tutulmasını sağlıyorsunuz.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize()`

Çevirme [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Mantıksal

Görüntüyü şablon görüntüsü olarak işaretler.

#### `image.isTemplateImage()`

`Boolean` - Görüntünün şablon görüntüsü olup olmadığını gösterir.

#### `image.crop(rect)`

* `rect` [Dikdörtgen](structures/rectangle.md) - Kırpılacak resimin alanı.

Returns `NativeImage` - Kırpılan resim.

#### `image.resize(options)`

* `options` obje * `width` tamsayı(İsteğe bağlı) - Resmin varsayılan genişliğidir. * `height` Integer (optional) - Defaults to the image's height. * `quality` String (optional) - The desired quality of the resize image. Olası değerler `good`, `better` or `best`. Varsayılan değer `best`. Bu değerler elde edilmek istenen kalite/hız dengesini ifade eder. Altta yatan platformun yeteneklerine (CPU, GPU) bağlı algoritmaya özgü bir yöntemle çevrilirler. Her üç yöntemin önceden belirlenmiş bir platformda aynı algoritma ile eşleştirilmesi mümkündür.

`NativeImage` Döndürür - Yeniden boyutlanmış resim.

Sadece `height` veya `width` belirtilirse yeniden boyutlandırılmış resimde mevcut en boy oranı korunur.

#### `image.getAspectRatio()`

`Float` Döner - Resmin en boy oranı.

#### `image.addRepresentation(options)`

* `options` obje * `scaleFactor` Çift - Gösterilen resimdeki ölçek faktörü. `width` tamsayı (isteğe bağlı) - Varsayılan değer 0. Bir bitmap arabelleği `buffer` belirtilirse gereklidir. `height` Tamsayı (İsteğe bağlı) - varsayılan değer 0. Bir bitmap arabelleği `buffer` belirtilirse gereklidir. * `buffer` Arabellek (isteğe bağlı) - Ham resim verilerini içeren arabelleği ifade eder. * `dataURL` Dizi (isteğe bağlı) - Taban 64 lük sistem ile kodlanmış JPEG ve PNG resmi içeren URL.

Belirli ölçek faktörü için bir görüntü gösterimi ekleyin. Bu kullanılabilir görüntüye açıkca farklı ölçek faktörü gösterimleri eklemek için kullanılabilir. Bu boş görüntülerde çağrılabilir.