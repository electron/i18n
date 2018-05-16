# NativeImage

> Crea iconos de bandeja, base y aplicación usando archivos PNG o JPG.

Proceso [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

En Electron, para las APIs que toman imágenes, se puede pasar cualquier ruta de archivo o las instancias `NativeImage`. Una imagen vacía será utilizada cuando se pasa `null`.

Por ejemplo, cuando se crea una bandeja o se configura un icono de la ventana, se puede pasar una ruta de archivo de imagen como un `String`:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

O leer la imagen desde el portapapeles, lo cual devuelve un `NativeImage`:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formatos Soportados

Actualmente los formatos de imagen `PNG` and `JPEG` son soportados. Se recomienda`PNG` debido a su soporte a la transparencia y la compresión sin pérdida de información.

En Windows, también pueden cargarse iconos `ICO` desde las rutas de archivo. Para mejor calidad visual se recomienda incluir al menos los siguientes tamaños en el:

* Ícono pequeño 
 * 16x16 (100% DPI scale)
 * 20x20 (125% DPI scale)
 * 24x24 (150% DPI scale)
 * 32x32 (200% DPI scale)
* Ícono Grande 
 * 32x32 (100% DPI scale)
 * 40x40 (125% DPI scale)
 * 48x48 (150% DPI scale)
 * 64x64 (200% DPI scale)
* 256x256

Revise la sección *Size requirements* en [este artículo](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Imagen de alta resolución

En las plataformas compatibles con altos PPP como las pantallas Apple Retina, se puede anexar `@2x` luego del nombre del archivo base de la imagen para marcarlo como una imagen de alta resolución.

Por ejemplo, si `icon.png` es una imagen normal que tiene una resolución estándar, entonces `icon@2x.png` será tratado como una imagen de alta resolución que tiene una densidad doble de PPP.

Si se desea soportar pantallas con distintas densidades PPP al mismo tiempo, se pueden poner imágenes con distintos tamaños en la misma carpeta y usar el nombre del archivo sin los sufijos PPP. Por ejemplo:

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

También se admiten los siguientes sufijos para PPP:

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

## Imagen de plantilla

Las imágenes de plantilla consisten en colores negros y claros (y un canal alfa). Las imágenes de plantilla no están destinadas a ser utilizadas como imágenes independientes y son generalmente mezcladas con otro contenido para crear la apariencia final deseada.

El caso más común es usar imágenes de plantilla para un icono de barra de menú para que pueda adaptarse a barras de menú tanto claras como oscuras.

**Nota:** La imagen de plantilla sólo es soportada en macOS.

Para marcar una imagen como una imagen de plantilla, su nombre de archivo debe terminar con la palabra `Template`. Por ejemplo:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Métodos

El módulo `nativeImage` tiene los siguientes métodos, de los cuales todos devuelven una instancia de la clase `NativeImage`:

### `nativeImage.createEmpty()`

Devuelve `NativeImage`

Crea una instancia vacía `NativeImage`.

### `nativeImage.createFromPath(path)`

* `path` Cadena

Devuelve `NativeImage`

Crea una instancia `NativeImage` desde un archivo ubicado en `path`. Este método devuelve una imagen si la `path` no existe, o si no puede ser leída o si la imagen no es válida.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Objeto (opcional) * `width` Entero (opcional) - Necesario para los búferes de mapa de bits. * `height` Entero (opcional) - Necesario para los búferes de mapa de bits. * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `NativeImage`

Crea una nueva instancia `NativeImage` desde `buffer`.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` Cadena

Devuelve `NativeImage`

Crea una nueva instancia `NativeImage` desde `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

Devuelve `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

## Clase: NativeImage

> Envuelve nativamente imágenes como la bandeja, el muelle y los íconos de las aplicaciones.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instancia

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.

#### `image.toBitmap([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Returns `String` - The data URL of the image.

#### `image.getBitmap([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

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