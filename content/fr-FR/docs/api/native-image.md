# nativeImage

> Create tray, dock, and application icons using PNG or JPG files.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

For example, when creating a tray or setting a window's icon, you can pass an image file path as a `String`:

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

## Formats supportés

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

* Petite icône 
  * 16x16 (100% DPI scale)
  * 20x20 (125% DPI scale)
  * 24x24 (150% DPI scale)
  * 32x32 (200% DPI scale)
* Grande icône 
  * 32x32 (100% DPI scale)
  * 40x40 (125% DPI scale)
  * 48x48 (150% DPI scale)
  * 64x64 (200% DPI scale)
  * 256x256

Check the *Size requirements* section in [this article](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Images à haute résolution

On platforms that have high-DPI support such as Apple Retina displays, you can append `@2x` after image's base filename to mark it as a high resolution image.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. For example:

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

## Template Image

Template images consist of black and an alpha channel. Template images are not intended to be used as standalone images and are usually mixed with other content to create the desired final appearance.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Note:** Template image is only supported on macOS.

To mark an image as a template image, its filename should end with the word `Template`. For example:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Méthodes

The `nativeImage` module has the following methods, all of which return an instance of the `NativeImage` class:

### `nativeImage.createEmpty()`

Retourne `NativeImage`

Creates an empty `NativeImage` instance.

### `nativeImage.createFromPath(path)`

* `path` String

Retourne `NativeImage`

Creates a new `NativeImage` instance from a file located at `path`. This method returns an empty image if the `path` does not exist, cannot be read, or is not a valid image.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Objet 
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (facultatif) 
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retourne `NativeImage`

Creates a new `NativeImage` instance from `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[] (optional)

Retourne `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

The `hslShift` is applied to the image with the following rules:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Classe : NativeImage

> Natively wrap images such as tray, dock, and application icons.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Méthodes d’instance

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Object (facultatif) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données encodées `PNG` de l'image.

#### `image.toJPEG(quality)`

* `qualité` Entier - Entre 0 - 100.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données encodées en `JPEG` de l'image.

#### `image.toBitmap([options])`

* `options` Object (facultatif) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient une copie des données du pixel brut bitmap de l'image.

#### `image.toDataURL([options])`

* `options` Object (facultatif) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `String` - L'URL des données de l'image.

#### `image.getBitmap([options])`

* `options` Object (facultatif) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données brutes des pixels bitmap de l'image.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` *macOS*

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui stocke le pointeur C sur la gestion native sous-jacente de l'image . Sur macOS, un pointeur vers `NSImage` serait retourné.

Note que le pointeur retourné est un pointeur faible vers l'image native sous-jacente au lieu d'une copie, donc vous *devez* vous assurer que l'instance associée `nativeImage` est conservée.

#### `image.isEmpty()`

Retourne `Boolean` - Si l'image est vide.

#### `image.getSize()`

Retourne [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Marque l'image comme une image de modèle.

**[Déprécié ](modernization/property-updates.md)**

#### `image.isTemplateImage()`

Retourne `Boolean` - Si l'image est une image de modèle.

**[Déprécié ](modernization/property-updates.md)**

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - L'aire de l'image à recadrer.

Retourne `NativeImage` - L'image recadrée.

#### `image.resize(options)`

* `options` Objet 
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Retourne `NativeImage` - L'image redimensionnée.

Si seulement la `hauteur` ou la `largeur` sont spécifiées, alors le ratio d'aspect actuel sera préservé dans l'image redimensionnée.

#### `image.getAspectRatio()`

Retourne `Float` - Le ratio d'aspect de l'image.

#### `image.addRepresentation(options)`

* `options` Objet 
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (optional) - The buffer containing the raw image data.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Ajouter une représentation d'image pour un facteur d'échelle spécifique. Ceci peut être utilisé pour ajouter explicitement différentes représentations de facteur d'échelle à une image. Cette peut être appelée sur des images vides.

### Propriétés d'instance

#### `nativeImage.isMacTemplateImage` *macOS*

Une propriété `Boolean` qui détermine si l'image est considérée comme une [image de modèle](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Veuillez noter que cette propriété n'a qu'un effet sur macOS.