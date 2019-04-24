# NativeImage

> Crea iconos de bandeja, base y aplicación usando archivos PNG o JPG.

Proceso [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

En Electron, para las APIs que toman imágenes, se puede pasar cualquier ruta de archivo o las instancias `NativeImage`. Una imagen vacía será utilizada cuando se pasa `null`.

Por ejemplo, cuando se crea una bandeja o se configura un icono de la ventana, se puede pasar una ruta de archivo de imagen como un `String`:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
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
const { Tray } = require('electron')
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

Template images consist of black and an alpha channel. Template images are not intended to be used as standalone images and are usually mixed with other content to create the desired final appearance.

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

Crea una nueva instancia de `NativeImage` a partir de NSImage vinculada con el nombre especificado. Ver [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) para una lista de posibles valores.

El `hslShift` se aplica a la imagen con las siguientes reglas

* `hsl_shift[0]` (tonalidad): El valor de tonalidad absoluto para la imagen - 0 y 1 se mapean a 0 y 360 en la rueda de tonalidad de color (rojo).
* `hsl_shift[1]` (saturación): Cambio en la saturación de la imagen, con las siguientes valores clave: 0 = eliminar todo el color. 0.5 = sin cambios. 1 = saturación completa de la imagen.
* `hsl_shift[2]` (luminosidad): Un cambio de luminosidad para la imagen, con los siguientes valores clave: 0 = elimine toda la luminosidad (hace que todos los píxeles sean negros). 0.5 = Dejar sin cambios. 1 = Luminosidad total (hace que todos los píxeles sean blancos).

Esto significa que `[-1, 0, 1]` hará la imagen completamente blanca y `[-1, 1, 0]` la hará completamente negra.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Clase: NativeImage

> Envuelve nativamente imágenes como la bandeja, el muelle y los íconos de las aplicaciones.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instancia

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Entero (**required**) - Entre 0 - 100.

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

* `option` Booleano

Marks the image as a template image.

#### `image.isTemplateImage()`

Returns `Boolean` - Whether the image is a template image.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - El área de la imagen para ser recortada.

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Objeto * `width` Entero (opcional) - Por defecto es el ancho de la imagen. * `height` Entero (opcional) - El valor predeterminado es la altura de la imagen. * `quality` String (opcional) - La calidad deseada para el cambio de tamaño de imagen. Los valores posibles son `good`, `better` or `best`. Por defecto es `best`. Estos valores expresan una compensación de calidad/velocidad deseada. Son traducidas dentro de un método de algoritmo específico que depende de las capacidades (CPU, GPU) de la plataforma subyacente. Es posible asignar los tres métodos con el mismo algoritmo en una plataforma determinada.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Objeto * `scaleFactor` Doble - El factor de escala para agregar la representación de la imagen. * `width` Entero (opcional) - Por defecto es 0. Es necesario si un búfer de mapa de bits se especifica como `buffer`. * `height` Entero (opcional) - Por defecto es 0. Es necesario si un búfer de mapa de bits se especifica como `buffer`. `buffer` Buffer (opcional) - El búfer que contiene los datos sin procesar de la imagen. `dataURL` Cadena (opcional) - El URL de información que contiene ya sea una imagen JPEG o PNG codificada en base64.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.