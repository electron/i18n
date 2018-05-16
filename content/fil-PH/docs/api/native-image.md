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

* `imageName` String
* `hslShift` Number[]

Nagbabalik ng `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

## Class: NativeImage

> Bumabalot ng imahe katulad ng trey, pantala, ang aplikasyon na icon. 

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Instance Methods

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.

#### `image.toBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `String` - The data URL of the image.

#### `image.getBitmap([options])
 `

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's raw bitmap pixel data.

The difference between `getBitmap()` and `toBitmap()` is, `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick, otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` *macOS*

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Notice that the returned pointer is a weak pointer to the underlying native image instead of a copy, so you *must* ensure that the associated `nativeImage` instance is kept around.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize()`

Returns [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Marks the image as a template image.

#### `image.isTemplateImage()`

Returns `Boolean` - Whether the image is a template image.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop.

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Defaults to the image's width. * `height` Integer (optional) - Defaults to the image's height. * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.