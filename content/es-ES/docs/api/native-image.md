# NativeImage

> Crea iconos de bandeja, base y aplicación usando archivos PNG o JPG.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. Una imagen vacía será usada cuando se pase `null`.

Por ejemplo, cuando se crea una bandeja o se configura un icono de la ventana, se puede pasar una ruta de archivo de imagen como un `String`:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

O leer la imagen desde el portapapeles, lo cual devuelve un `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formatos Soportados

Actualmente los formatos de imágenes `PNG` y `JPEG` están soportados. `PNG` es recomendado por su soporte de transparencia y compresión sin pérdida.

En Windows, puedes leer iconos `ICO` desde rutas de archivos. For best visual quality, it is recommended to include at least the following sizes in the:

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

Revise la sección *Size requirements* en [este artículo][icons].

## Imagen de alta resolución

En las plataformas compatibles con altos PPP como las pantallas Apple Retina, se puede anexar `@2x` luego del nombre del archivo base de la imagen para marcarlo como una imagen de alta resolución.

Por ejemplo, si `icon.png` es una imagen normal que tiene resolución estándar, entonces `icon@2x.png` será tratado como una imagen de alta resolución que tiene densidad DPI.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Por ejemplo:

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

Los siguientes sufijos para DPI son soportados:

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

Template images consist of black and an alpha channel. Las imágenes de plantilla no están destinadas a ser utilizadas como imágenes independientes y son generalmente mezcladas con otro contenido para crear la apariencia final deseada.

El caso mas común es usar imágenes de plantillas para el icono de una barra de menú, así este se puede adaptar a ambas barras de menú clara y oscura.

**Nota:** La imagen de plantilla sólo es soportada en macOS.

Para marcar una imagen como plantilla, su nombre de archivo debe terminar con la palabra `Template`. Por ejemplo:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Métodos

El módulo `nativeImage` tiene los siguientes métodos, de los cuales todos devuelven una instancia de la clase `NativeImage`:

### `nativeImage.createEmpty()`

Devuelve `NativeImage`

Crea una instancia vacía `NativeImage`.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - path to a file that we intend to construct a thumbnail out of.
* `maxSize` [Size](structures/size.md) - the maximum width and height (positive numbers) the thumbnail returned can be. The Windows implementation will ignore `maxSize.height` and scale the height according to `maxSize.width`.

Returns `Promise<NativeImage>` - fulfilled with the file's thumbnail preview image, which is a [NativeImage](native-image.md).

### `nativeImage.createFromPath(path)`

* `path` String

Devuelve `NativeImage`

Crea una instancia `NativeImage` desde un archivo ubicado en `path`. Este método devuelve una imagen si la `path` no existe, o si no puede ser leída o si la imagen no es válida.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer][buffer]
* `options` Object
  * `width` Integer
  * `alto` Integer
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (opcional)
  * `width` Integer (opcional) - Requerido para búferes de bipmaps.
  * `height` Entero (opcional) - Necesario para los búferes de mapa de bits.
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `NativeImage`

Crea una nueva instancia `NativeImage` desde `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` Cadena

Devuelve `NativeImage`

Crea una nueva instancia `NativeImage` desde `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (opcional)

Devuelve `NativeImage`

Crea una nueva instancia de `NativeImage` a partir de NSImage vinculada con el nombre especificado. Vea [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) para una lista de posibles valores.

El `hslShift` se aplica a la imagen con las siguientes reglas:

* `hsl_shift[0]` (hue): El valor de hue absoluto para la imagen - 0 y 1 mapea a 0 y 360 en la rueda de color hue  (rojo).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = Dejar sin cambios. 1 = fully saturate the image.
* `hsl_shift[2]` (luminosidad): Un cambio en la luminosidad para la imagen, con los siguientes valores  claves: 0 = elimina toda la luminosidad (hace que todos los pixeles sean negros). 0.5 = Dejar sin cambios. 1 = Luminosidad total (hace que todos los píxeles sean blancos).

Esto significa que `[-1, 0, 1]` hará la imagen completamente blanca y `[-1, 1, 0]` la hará completamente negra.

En algunos casos, el `NSImageName` no coincide con su cadena de representación; un ejemplo de esto es `NSFolderImageName`, cuya cadena de representación en realidad sería `NSFolder`. Por lo tanto, necesitar determinar la cadena de representación correcta para su imagen antes de pasarla. Esto puede hacer con lo siguiente:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

donde `SYSTEM_IMAGE_NAME` debe ser reemplazado con cualquier valor de [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Clase: NativeImage

> Envuelve nativamente imágenes como la bandeja, el muelle y los íconos de las aplicaciones.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instancia

Los siguientes métodos están disponibles para las distancias de la clase `NativeImage`:

#### `image.toPNG([options])`

* `options` Object (opcional)
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer][buffer] que contiene la información codificada de la imagen `PNG`.

#### `image.toJPEG(quality)`

* `quality` Integer - Entre 0 - 100.

Devuelve `Buffer` - Un [Buffer][buffer]que contiene la información codificada de la imagen `JPEG`.

#### `image.toBitmap([options])`

* `options` Object (opcional)
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer][buffer] que contiene una copia de la información sin procesar de pixeles del mapa de bits de la imagen.

#### `image.toDataURL([options])`

* `options` Object (opcional)
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `String` - El URL de información de la imagen.

#### `image.getBitmap([options])`

* `options` Object (opcional)
  * `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer][buffer] que contiene la información sin procesar de pixeles del mapa de bits de la imagen.

La diferencia entre `getBitmap()` y `toBitmap()` es que `getBitmap()` no copia los datos bitmap, por lo que debe utilizar inmediatamente el Búfer devuelto en el ciclo del evento actual; de lo contrario, los datos podrían modificarse o destruirse.

#### `image.getNativeHandle()` _macOS_

Devuelve `Buffer` - Un [Buffer][buffer] que almacena el puntero C en el controlador nativo subyacente de la imagen. En macOS, se devolverá un puntero a la instancia `NSImage`.

Observe que el puntero devuelto es un puntero debil a la imagen nativa subyacente en lugar de una copia. Por lo tanto, _debe _ asegurarse que la instancia asociada `nativeImage` se encuentre cerca.

#### `image.isEmpty()`

Devuelve `Boolean` - Si la imagen está vacía.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Booleano

Marca la imagen como una imagen de plantilla.

#### `image.isTemplateImage()`

Devuelve `Boolean` - Si la imagen es una imagen de plantilla.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - El área de la imagen para ser recortada.

Devuelve `NativeImage` - La imagen recortada.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (opcional) - Por defecto es el ancho de la imagen.
  * `height` Entero (opcional) - El valor predeterminado es la altura de la imagen.
  * `quality` String (opcional) - La calidad deseada para el cambio de tamaño de imagen. Los posibles valores soportados son `good`, `better`, o `best`. Por defecto es `best`. Estos valores expresan una compensación de calidad/velocidad deseada. Son traducidas dentro de un método de algoritmo específico que depende de las capacidades (CPU, GPU) de la plataforma subyacente. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Devuelve `NativeImage` - La imagen redimensionada.

Si solo la `height` o la `width` son especificadas, entonces la relación de aspecto actual se conservará en la imagen redimensionada.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Doble (opcional) -Por defecto es 1.0.

Devuelve `Float` - La relación de aspecto de la imagen.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - El factor de escala para agregar a la representación de la imagen.
  * `width` Entero (opcional) - Por defecto es 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Entero (opcional) - Por defecto es 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (opcional) - El buffer que contiene los datos de la imagen sin procesar.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Propiedades de Instancia

#### `nativeImage.isMacTemplateImage` _macOS_

Una propiedad `Boolean` que determina si la imagen es considerada una [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Por favor note que esta propiedad solo tiene efecto en macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
