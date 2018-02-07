# gupitin ng maikli ang mga litrato

> Gumawa ng trey, pantalan, at aplikasyon na icon gamit ang PNG o JPG files.

Proseso:[Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Sa Electron, para sa APIs na kumukuha ng imahe, pwede mong ipasa alinman sa file paths o `NativeImage` mga pagkakataon. Ang walang laman na imahe ay gagamitin kung `null` ay maipasa.

Halimbawa, kung gagawa ng trey o pagtatakda sa window's icon, pwede mong ipasa ang file path ng imahe bilang `String`:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

O basahin ang imahe mula sa klipbord na nagbabalik sa `NativeImage`:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Suportadong Pormat 

Sa kasalukuyan `PNG` and `JPEG` ipormat ng imahe ay suportad. `PNG` ay inirerekomenda dahil ito ay sumusuporta sa aninaw at walang pagkakawalang compression.

Sa Windows, pwede ka ring mag load ng `ICO` icons galing sa file paths. Para pinakamahusay na biswal na kalidad, nirerekomenda ang pag sama sa mga sumusunod na laki sa:

* Maliit na icon 
 * 16x16 (100% DPI scale) 
 * 20x20 (125% DPI scale)
 * 24x24 (150% DPI scale)
 * 32x32 (200% DPI scale) 
* Malaking Icon 
 * 32x32 (100% DPI scale)
 * 40x40 (125% DPI scale)
 * 48x48 (150% DPI scale)
 * 64x64 (200% DPI scale)
* 256x256

Itsek ang *Size requirements* na seksyon sa [ artikulong ito](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Mataas na Resolusyong Imahe 

Sa platform na may high-DPI support katulod ng Apple Retina displays, pwede kang magdagdag ng `@2x` pagkatapos ng image's base filename para markahan ito bilang mataas na resolusyong imahe. 

Halmibawa kung `icon.png` ay normal na imahe na may standard na resolusyon, pagkatapos ay `icon@2x.png` ito ay mabibilang na mataas na resolusyong imahe na mayroong dobleng DPI density.

Kung gusto mong sumuporta ng displey nay mag magkaibang DPI densities na magkasabay, pwede kang maglagay ng imahe na may iba-ibang laki sa parehong folder at gamitin ang filename sa walang DPI suffixes. Halimbawa:

```text
imahe/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const {Tray} = require('electron')
let appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Ang mga sumusunod na suffixes ng DPI ay suportado rin.

* `@1x`
* `@1.25x`
* `@1.33x`
* `@1.4x`
* `@1.4x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Template Image

Ang template image ay binubuo ng itim at malinaw na kulay (at ang aplha channel). Ang template images ay hindi inilalaan para gamiting napag-iisang imahe at kadalasan ay inihahalo sa ibang nilalaman para bumuo ng nais na huling kaanyuan.

Ang pinaka karaniwang kaso ay ang paggamit ng template images para sa menu bar icon upang maakma sa kapwa maliwanag at madilim na menu bars.

**Note:** Template image ay suportado lamang ng macOS.

Para markahan ang imahe bilang template image, ang filename at dapat magtatapos sa salitang `Template`. Halimbawa:

* `xxxTemplate.png`
* `xxxTemplate@2x.png

`

## Pamamaraan

Ang ` nativeimage ` modyul ay may mga sumusunod na pamamaraan, lahat ng ito ay bumalik sa isang halimbawa ng `NativeImage` na klase:

### `nativeImage.createEmpty()`

Returns `NativeImage`

Gumawa ng walang lamang `NativeImage` instance.

### `nativeImage.createFromPath(path)`

* `path` String

Returns `NativeImage`

Gumawa ng bagong 0>NativeImage</code> instance mula sa file na matatagpuan sa `path`. Ang pamamaraan ay bumabalik ng walang lamang imahe kapag ang `path` ay hindi umiiral, hindi mababasa or walang bisang imahe. 

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `ativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional) * `width` Integer (optional) - Kinakailangan para sa mga bitmap buffers. * `height` Integer (optional) - Kinakailangan para sa mga bitmap buffers. * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `NativeImage`

Gumawa ng bagong `NativeImage` instance mula `buffer`.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Returns `NativeImage`

Gumawa ng bagong `NativeImage` instance mula `dataURL`. 

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

Returns `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values:  
 0 = remove all color.  
 0.5 = leave unchanged.  
 1 = fully saturate the image. 
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values:  
 0 = remove all lightness (make all pixels black).  
 0.5 = leave unchanged.  
 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

## Class: NativeImage

> Bumabalot ng imahe katulad ng trey, pantala, ang aplikasyon na icon. 

Proseso:[Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Halimbawa ng mga pamamaraan

Ang mga sumusunod na paraan ay magagamit sa mga pagkakataong `NativeImage` klase : 

#### `image.toPNG([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Nagbabalik `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) na naglalaman ng mga imaheng `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Nagbabalik `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) na naglalaman ng mga imaheng`JPEG` encoded data

#### `image.toBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Nagbabalik `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) na naglalaman ng kopya ng mga imaheng hilaw na bitmap pixel data. 

#### `image.toDataURL([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Nagbabalik `String` - Ang data URL ng imahe.

#### `image.getBitmap([options])
 `

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Nagbabalik `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) na naglalaman ng hilaw na bitmap pixel data.

Ang pagkakaiba ng `getBitmap()` and `toBitmap()` ay, `getBitmap()` hindi kinukopya ang bitmap data, kaya dapat gumamit ng returned Buffer agad kasalukuyang kaganapang loop tick, kunghindi ay baka magbago o mawasak ang data.

#### `image.getNativeHandle()` *macOS*

Nagbabalik ng `image.getNativeHandle()` [macOS](https://nodejs.org/api/buffer.html#buffer_class_buffer) na nagiimbak ng C pointer na pinagbabatayan ng native handle ng imahe. Sa macOS, ang panturo sa `NSImage` na pagkakataon ay ibinabalik. 

Pansinin na ang mga binabalik sa panturo ay mahinang panturo sa pinagbatayang native image sa halip na isang kopya, kaya ikaw * ay dapat * isigurado ng ang mga kaugnayang `nativeImage` pagkakataon ay nasa paligid. 

#### `image.isEmpty()`

Nagbabalik ng `Boolean` - kung ang imahe ay walang laman.

#### `image.getSize()`

Nagbabalik [`Size`](structures/size.md) 

#### `image.setTemplateImage(option)`

* `option` Boolean

Nagmamarka ng imahe bilang template image. 

#### `image.isTemplateImage()`

Nagbabalik `Boolean` - Kung ang imahe ay isang template image. 

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) -Ang lugar kung saan ika-crop ang imahe. 

Nagbabalik sa`NativeImage` - Ang naka-crop na imahe.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Default sa lapad ng imahe. * `height` Integer (optional) - Default sa taas ng imahe * `quality` String (optional) - Ang nais na kalidad sa imaheng binago ang laki. Posibleng halaga ay mga `good`, `better` or `best`. Ang default ay `best`. Ang mga halagan ito ay nagpapahayag ng ninais na kalidad/bilis ng tradeooff. Ito ay isinalin sa algorithm-specific na paraan na nag depende sa kapabilidad (CPU, GPU) sa pinagbatayan na platform. Ito ay posible sa lahat ng tatlong pamamaraan na mai-map sa parehong algorithm sa binigay na platform. 

Nagbabalik `NativeImage` - Ang imaheng nibago ang laki.

Kung sana ang `height` or the `width` ay tinutukoy ang kasalukuyang ration ng aspeto ay mapapangalagaan sa imaheng binago ang laki.

#### `image.getAspectRatio()`

Nagbabalik `Float` - Ang ratio ng aspeto ng imahe.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - Ang scale factor para idagdag sa prinisentang imahe para. * `width` Integer (optional) - Defaults to 0. Ito ay kailangan if ang bitmap buffer ay tinutukoy bilang `buffer`. * `height` Integer (optional) - Defaults to 0. Ito ay kailangan if ang bitmap buffer ay tinutukoy bilang `buffer`. * `buffer` Buffer (optional) - Ang buffer ay naglalaman ng mga hilaw na datos ng larawan. * `dataURL` String (optional) - An data URL ay naglalaman ng alinman sa base 64 naka encode PNG o JPEG na imahe.

Magdagdag ng naka presentang larawan para sa tinutukoy na scale factor. Pwede rin itong gamitin para magdagdag ng ibang representasyong scale factor sa isang imahe. Pwede itong tawaging imaheng walang laman.