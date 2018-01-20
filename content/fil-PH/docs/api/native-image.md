# nativeImage

> Gumawa ng trey, pantalan, at aplikasyon na icon gamit ang PNG o JPG files.

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

The most common case is to use template images for a menu bar icon so it can adapt to both light and dark menu bars.

**Note:** Template image is only supported on macOS.

To mark an image as a template image, its filename should end with the word `Template`. For example:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Pamamaraan

The `nativeImage` module has the following methods, all of which return an instance of the `NativeImage` class:

### `nativeImage.createEmpty()`

Returns `NativeImage`

Creates an empty `NativeImage` instance.

### `nativeImage.createFromPath(path)`

* `path` String

Returns `NativeImage`

Creates a new `NativeImage` instance from a file located at `path`. This method returns an empty image if the `path` does not exist, cannot be read, or is not a valid image.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional) * `width` Integer (optional) - Required for bitmap buffers. * `height` Integer (optional) - Required for bitmap buffers. * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `NativeImage`

Creates a new `NativeImage` instance from `buffer`.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Returns `NativeImage`

Creates a new `NativeImage` instance from `dataURL`.

## Class: NativeImage

> Natively wrap images such as tray, dock, and application icons.

Proseso:[Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process) 

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

#### `image.getBitmap([options])`

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

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Defaults to the image's width. * `height` Integer (optional) - Defaults to the image's height * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.