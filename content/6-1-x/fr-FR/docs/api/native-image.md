# nativeImage

> Create tray, dock, and application icons using PNG or JPG files.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

For example, when creating a tray or setting a window's icon, you can pass an image file path as a `String`:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

Or read the image from the clipboard which returns a `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formats supportés

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality it is recommended to include at least the following sizes in the:

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

For example if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Par exemple :

```text
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```


```javascript
const { Tray } = require('electron')
let appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Les suffixes suivants pour le DPI sont également pris en charge :

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

The most common case is to use template images for a menu bar icon so it can adapt to both light and dark menu bars.

**Note:** Template image is only supported on macOS.

To mark an image as a template image, its filename should end with the word `Template`. Par exemple :

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

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retourne `NativeImage`

Creates a new `NativeImage` instance from `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[]

Retourne `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules
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

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données encodées `PNG` de l'image.

#### `image.toJPEG(quality)`

* `quality` Integer (**requis**) - Entre 0 et 100.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données encodées en `JPEG` de l'image.

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient une copie des données du pixel brut bitmap de l'image.

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `String` - L'URL des données de l'image.

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui contient les données brutes des pixels bitmap de l'image.

La différence entre `getBitmap()` et `toBitmap()` est, `getBitmap()` ne copie pas les données bitmap, donc vous devez utiliser le tampon retourné immédiatement en tick de boucle d'événement, sinon les données pourraient être modifiées ou détruites.

#### `image.getNativeHandle()` _macOS_

Retourne `Buffer` - Un [tampon](https://nodejs.org/api/buffer.html#buffer_class_buffer) qui stocke le pointeur C sur la gestion native sous-jacente de l'image . Sur macOS, un pointeur vers `NSImage` serait retourné.

Note que le pointeur retourné est un pointeur faible vers l'image native sous-jacente au lieu d'une copie, donc vous _devez_ vous assurer que l'instance associée `nativeImage` est conservée.

#### `image.isEmpty()`

Retourne `Boolean` - Si l'image est vide.

#### `image.getSize()`

Retourne [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Marque l'image comme une image de modèle.

#### `image.isTemplateImage()`

Retourne `Boolean` - Si l'image est une image de modèle.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - L'aire de l'image à recadrer.

Retourne `NativeImage` - L'image recadrée.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (facultatif) - La hauteur de l'image par défaut.
  * `Qualité` String (facultatif) - La qualité souhaitée de l'image de retaille. Les valeurs possibles sont `bien`, `mieux` ou `meilleurs`. La valeur par défaut est `meilleur`. Ces valeurs expriment un compromis qualité/vitesse souhaité. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Retourne `NativeImage` - L'image redimensionnée.

Si seulement la `hauteur` ou la `largeur` sont spécifiées, alors le ratio d'aspect actuel sera préservé dans l'image redimensionnée.

#### `image.getAspectRatio()`

Retourne `Float` - Le ratio d'aspect de l'image.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `largeur` Integer (facultatif) - 0 par défaut. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (facultatif) - 0 par défaut. Required if a bitmap buffer is specified as `buffer`.
  * `tampon` Buffer (facultatif) - Le tampon contenant les données de l'image brute.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.
