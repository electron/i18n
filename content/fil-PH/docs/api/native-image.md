# gupitin ng maikli ang mga litrato

> Gumawa ng tray, dock, at aplikasyon na mga icon gamit ang PNG o JPG na mga file.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Sa Electron, para sa APIs na kumukuha ng imahe, pwede mong ipasa alinman sa file paths o `NativeImage` na mga instance. Ang walang laman na imahe ay gagamitin kung ang `null` ay maipasa.

Halimbawa, kung gagawa ng tray o setting sa icon ng window, pwede mong ipasa ang file path ng imahe bilang isang `String`:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

O basahin ang imahe mula sa klipbord na nagbabalik ng isang `NativeImage`:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Suportadong mga Pormat

Sa kasalukuyan ang `PNG` at `JPEG` na mga pormat ng imahe ay suportado. Ang `PNG` ay inirerekomenda dahil ito ay sumusuporta sa malinis at walang pagkawalang kompresyon.

Sa Windows, pwede ka ring mag load ng `ICO` na mga icon galing sa mga file path. Para sa pinakamahusay na kalidad na biswal, inirerekomenda ang pag sama sa mga sumusunod na sukat sa:

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

Suriin ang *Kinakailangan sa sukat* na seksyon sa [ artikulong ito](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Imaheng may Mataas na Resolusyon

Sa plataporma na may suporta sa mataas na DPI katulad ng Apple Retina na mga display, pwede kang magdagdag ng `@2x` pagkatapos ng base filename ng imahe para markahan ito bilang imaheng may mataas na resolusyon.

Halimbawa kung `icon.png` ay normal na imahe na may istandard na resolusyon, samakatuwid ang `icon@2x.png` ay tatratuhin bilang imaheng may mataas na resolusyon na mayroong dobleng DPI na density.

Kung gusto mong suportahan ang mga display na nayy magkaibang mga DPI na density ng sabayan, pwede kang maglagay ng imahe na may iba-ibang sukat sa parehong folder at gamitin ang filename nang walang mga DPI suffix. Halimbawa:

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

Ang mga sumusunod na mga suffix ng DPI ay suportado rin:

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

## Template na Imahe

Ang template na imahe ay binubuo ng itim at malinaw na mga kulay (at ang alpha na tsanel). Ang mga template na imahe ay hindi inilalaan para gamiting napag-iisang imahe at kadalasan ay inihahalo sa ibang nilalaman para bumuo ng nais na huling kaanyuan.

Ang pinakakaraniwang kaso ay ang paggamit ng template na mga imahe para sa menu bar na icon upang maakma sa kapwa maliwanag at madilim na mga menu bar.

**Tandaan:** Ang template na imahe ay suportado lamang sa macOS.

Para markahan ang imahe bilang template na imahe, ang filename ay dapat magtatapos sa salitang `Template`. Halimbawa:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Mga Paraan

Ang ` nativeimage ` na modyul ay may mga sumusunod na pamamaraan, lahat ng ito ay nagbabalik ng isang instance ng `NativeImage` na klase:

### `nativeImage.createEmpty()`

Nagbabalik ng `NativeImage`

Gumawa ng bakanteng `NativeImage` na instance.

### `nativeImage.createFromPath(path)`

* `path` String

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa file na matatagpuan sa `path`. Ang paraang ito ay nagbabalik ng bakanteng imahe kapag ang `path` ay hindi umiiral, hindi mababasa or hindi isang tamang imahe.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `ativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (opsyonal) * `width` Integer (opsyonal) - Kinakailangan para sa mga bitmap na buffer. * `height` na Integer (opsyonal) - Kinakailangan para sa mga bitmap na buffer. * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa `buffer`.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` na String

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` na String
* `hslShift` Number[]

Nagbabalik ng `NativeImage`

Gumagawa ng isang bagong `NativeImage` na instance mula sa NSImage na nagmamapa sa binigay na pangalan ng imahe. Tingnan ang [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) para sa listahan ng mga posibleng halaga.

Ang `hslShift` ay inaaplay sa imahe na may sumusunod na mga patakaran

* `hsl_shift[0]` (hue): Ang ganap na halaga ng hue para sa imahe - 0 at 1 na minamapa sa 0 at 360 sa pangkulay na gulong ng hue (pula).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

## Class: NativeImage

> Bumabalot ng imahe katulad ng trey, pantala, ang aplikasyon na icon. 

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Mga Pamamaraan ng Instance

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

Returns `Boolean` - Whether the image is empty.

#### `image.getSize()`

Nagbabalik [`Size`](structures/size.md) 

#### `image.setTemplateImage(option)`

* `option` Boolean

Nagmamarka ng imahe bilang template image. 

#### `image.isTemplateImage()`

Nagbabalik `Boolean` - Kung ang imahe ay isang template image. 

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop.

Nagbabalik sa`NativeImage` - Ang naka-crop na imahe.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Default sa lapad ng imahe. * `height` Integer (optional) - Defaults to the image's height. * `quality` String (optional) - The desired quality of the resize image. Posibleng halaga ay mga `good`, `better` or `best`. Ang default ay `best`. Ang mga halagan ito ay nagpapahayag ng ninais na kalidad/bilis ng tradeooff. Ito ay isinalin sa algorithm-specific na paraan na nag depende sa kapabilidad (CPU, GPU) sa pinagbatayan na platform. Ito ay posible sa lahat ng tatlong pamamaraan na mai-map sa parehong algorithm sa binigay na platform. 

Nagbabalik `NativeImage` - Ang imaheng nibago ang laki.

Kung sana ang `height` or the `width` ay tinutukoy ang kasalukuyang ration ng aspeto ay mapapangalagaan sa imaheng binago ang laki.

#### `image.getAspectRatio()`

Nagbabalik `Float` - Ang ratio ng aspeto ng imahe.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - Ang scale factor para idagdag sa prinisentang imahe para. * `width` Integer (optional) - Defaults to 0. Ito ay kailangan if ang bitmap buffer ay tinutukoy bilang `buffer`. * `height` Integer (optional) - Defaults to 0. Ito ay kailangan if ang bitmap buffer ay tinutukoy bilang `buffer`. * `buffer` Buffer (optional) - Ang buffer ay naglalaman ng mga hilaw na datos ng larawan. * `dataURL` String (optional) - An data URL ay naglalaman ng alinman sa base 64 naka encode PNG o JPEG na imahe.

Magdagdag ng naka presentang larawan para sa tinutukoy na scale factor. Pwede rin itong gamitin para magdagdag ng ibang representasyong scale factor sa isang imahe. Pwede itong tawaging imaheng walang laman.