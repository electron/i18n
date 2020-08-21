# gupitin ng maikli ang mga litrato

> Gumawa ng tray, dock, at aplikasyon na mga icon gamit ang PNG o JPG na mga file.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

Halimbawa, kung gagawa ng tray o setting sa icon ng window, pwede mong ipasa ang file path ng imahe bilang isang `String`:

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

## Suportadong mga Pormat

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

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

Suriin ang *Kinakailangan sa sukat* na seksyon sa [ artikulong ito][icons].

## Imaheng may Mataas na Resolusyon

Sa plataporma na may suporta sa mataas na DPI katulad ng Apple Retina na mga display, pwede kang magdagdag ng `@2x` pagkatapos ng base filename ng imahe para markahan ito bilang imaheng may mataas na resolusyon.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Halimbawa:

```plaintext
imahe/
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
* `@1.4x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Template na Imahe

Template images consist of black and an alpha channel. Ang mga template na imahe ay hindi inilalaan para gamiting napag-iisang imahe at kadalasan ay inihahalo sa ibang nilalaman para bumuo ng nais na huling kaanyuan.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Tandaan:** Ang template na imahe ay suportado lamang sa macOS.

To mark an image as a template image, its filename should end with the word `Template`. Halimbawa:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Mga Paraan

Ang ` nativeimage ` na modyul ay may mga sumusunod na pamamaraan, lahat ng ito ay nagbabalik ng isang instance ng `NativeImage` na klase:

### `nativeImage.createEmpty()`

Nagbabalik ng `NativeImage`

Gumawa ng bakanteng `NativeImage` na instance.

### `nativeImage.createFromPath(path)`

* `path` na String

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa file na matatagpuan sa `path`. Ang paraang ito ay nagbabalik ng bakanteng imahe kapag ang `path` ay hindi umiiral, hindi mababasa or hindi isang tamang imahe.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer][buffer]
* `options` Object
  * `lapad` Integer
  * `taas` Integer
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik ng `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `ativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` na Integer (opsyonal) - Kinakailangan para sa mga bitmap na buffer.
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` na String

Nagbabalik ng `NativeImage`

Gumagawa ng bagong `NativeImage` na instance mula sa `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` na String
* `hslShift` Number[] (optional)

Nagbabalik ng `NativeImage`

Gumagawa ng isang bagong `NativeImage` na instance mula sa NSImage na nagmamapa sa binigay na pangalan ng imahe. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

Ang `hslShift` ay inaaplay sa imahe na may sumusunod na mga patakaran:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Class: NativeImage

> Bumabalot ng imahe katulad ng trey, pantala, ang aplikasyon na icon.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Mga Halimbawa ng Sistematikong Paraan

Ang mga sumusunod na paraan ay magagamit sa mga pagkakataong `NativeImage` klase :

#### `image.toPNG([options])`

* `options` Object (optional)
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik `Buffer` - A [Buffer][buffer] na naglalaman ng mga imaheng `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer - Between 0 - 100.

Nagbabalik `Buffer` - A [Buffer][buffer] na naglalaman ng mga imaheng`JPEG` encoded data

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik `Buffer` - A [Buffer][buffer] na naglalaman ng kopya ng mga imaheng hilaw na bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik `String` - Ang data URL ng imahe.

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik `Buffer` - A [Buffer][buffer] na naglalaman ng hilaw na bitmap pixel data.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

Nagbabalik ng `image.getNativeHandle()` [macOS][buffer] na nagiimbak ng C pointer na pinagbabatayan ng native handle ng imahe. Sa macOS, ang panturo sa  `NSImage` na pagkakataon ay ibinabalik.

Pansinin na ang mga binabalik sa panturo ay mahinang panturo sa pinagbatayang native image sa halip na isang kopya, kaya ikaw _ ay dapat _ isigurado ng ang mga kaugnayang `nativeImage` pagkakataon ay nasa paligid.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize([scaleFactor])`

* `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Returns [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Boolean

Nagmamarka ng imahe bilang template image.

#### `image.isTemplateImage()`

Nagbabalik `Boolean` - Kung ang imahe ay isang template image.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop.

Nagbabalik sa`NativeImage` - Ang naka-crop na imahe.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. Ang default ay `best`. Ang mga halagan ito ay nagpapahayag ng ninais na kalidad/bilis ng tradeooff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Nagbabalik `NativeImage` - Ang imaheng nibago ang laki.

Kung sana ang `height` or the `width` ay tinutukoy ang kasalukuyang ration ng aspeto ay mapapangalagaan sa imaheng binago ang laki.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` na Doble (opsyonal) - Naka-default sa 1.0.

Nagbabalik `Float` - Ang ratio ng aspeto ng imahe.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (optional) - Ang buffer ay naglalaman ng mga hilaw na datos ng larawan.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Katangian ng pagkakataon

#### `nativeImage.isMacTemplateImage` _macOS_

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Please note that this property only has an effect on macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
