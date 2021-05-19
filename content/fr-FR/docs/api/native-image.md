# nativeImage

> Créez des icônes de bac, d'ancrage et d'application à l'aide de fichiers PNG ou JPG.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Dans Electron, pour les API d'acquisition d'images, vous pouvez passer des chemins de fichiers ou des instances de tyipe `NativeImage`. Une image vide sera utilisée lorsque `null` sera transmise.

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

Actuellement, les formats d'image `PNG` et `JPEG` sont pris en charge. `PNG` est recommandé en raison de son support de la transparence et de la compression sans perte.

Sous Windows, vous pouvez également charger les icônes `ICO` à partir de chemins de fichier. Pour une meilleure qualité visuelle , il est recommandé d'inclure au moins les tailles suivantes dans les :

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

Check the *Size requirements* section in [this article][icons].

## Images à haute résolution

On platforms that have high-DPI support such as Apple Retina displays, you can append `@2x` after image's base filename to mark it as a high resolution image.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

Si vous voulez prendre en charge simultanément les écrans avec des densités DPI différentes, vous pouvez mettre des images de tailles différentes dans le même dossier et utiliser le nom de fichier sans le suffixe des DPI. Par exemple :

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

Les templates d'image sont constituées de noir et d'un canal alpha. Elles ne sont pas destinées à être utilisées comme des images autonomes mais sont généralement mélangées avec d'autres contenus pour créer l'apparence finale désirée.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Remarque :** Les template d'image ne sont pas prise en charge que sur macOS.

To mark an image as a template image, its filename should end with the word `Template`. Par exemple :

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Méthodes

The `nativeImage` module has the following methods, all of which return an instance of the `NativeImage` class:

### `nativeImage.createEmpty()`

Retourne `NativeImage`

Crée une instance `NativeImage` vide.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - path to a file that we intend to construct a thumbnail out of.
* `maxSize` [Size](structures/size.md) - the maximum width and height (positive numbers) the thumbnail returned can be. The Windows implementation will ignore `maxSize.height` and scale the height according to `maxSize.width`.

Returns `Promise<NativeImage>` - fulfilled with the file's thumbnail preview image, which is a [NativeImage](native-image.md).

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

* `buffer` [Buffer][buffer]
* Objet `options`
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `NativeImage`

Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retourne `NativeImage`

Crée une nouvelle instance `NativeImage` à partir de `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (optional)

Retourne `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

The `hslShift` is applied to the image with the following rules:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Par conséquent, vous devrez déterminer la bonne représentation de votre image avant de la passer. Cela peut être fait avec les éléments suivants :

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

Retourne `Buffer` - Un [tampon][buffer] qui contient les données encodées `PNG` de l'image.

#### `image.toJPEG(quality)`

* `qualité` Entier - Entre 0 - 100.

Retourne `Buffer` - Un [tampon][buffer] qui contient les données encodées en `JPEG` de l'image.

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon][buffer] qui contient une copie des données du pixel brut bitmap de l'image.

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `String` - L'URL des données de l'image.

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Buffer` - Un [tampon][buffer] qui contient les données brutes des pixels bitmap de l'image.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

Retourne `Buffer` - Un [tampon][buffer] qui stocke le pointeur C sur la gestion native sous-jacente de l'image . Sur macOS, un pointeur vers `NSImage` serait retourné.

Note que le pointeur retourné est un pointeur faible vers l'image native sous-jacente au lieu d'une copie, donc vous _devez_ vous assurer que l'instance associée `nativeImage` est conservée.

#### `image.isEmpty()`

Retourne `Boolean` - Si l'image est vide.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Boolean

Marque l'image comme une image de modèle.

#### `image.isTemplateImage()`

Retourne `Boolean` - Si l'image est une image de modèle.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - L'aire de l'image à recadrer.

Retourne `NativeImage` - L'image recadrée.

#### `image.resize(options)`

* Objet `options`
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (facultatif) - La hauteur de l'image par défaut.
  * `Qualité` String (facultatif) - La qualité souhaitée de l'image de retaille. Les valeurs possibles sont `good`, `better`, ou `best`. La valeur par défaut est `meilleur`. Ces valeurs expriment un compromis qualité/vitesse souhaité. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Retourne `NativeImage` - L'image redimensionnée.

Si seulement la `hauteur` ou la `largeur` sont spécifiées, alors le ratio d'aspect actuel sera préservé dans l'image redimensionnée.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (facultatif) - 1.0 par défaut.

Retourne `Float` - Le ratio d'aspect de l'image.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* Objet `options`
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `largeur` Integer (facultatif) - 0 par défaut. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (facultatif) - 0 par défaut. Required if a bitmap buffer is specified as `buffer`.
  * `tampon` Buffer (facultatif) - Le tampon contenant les données de l'image brute.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Propriétés d'instance

#### `nativeImage.isMacTemplateImage` _macOS_

Une propriété `Boolean` qui détermine si l'image est considérée comme une [image de modèle](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Veuillez noter que cette propriété n'a qu'un effet sur macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
