# nativeImage

> Crea iconos de bandeja, base y aplicación usando archivos PNG o JPG.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

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

## Clase: NativeImage

> Envuelve nativamente imágenes como la bandeja, el muelle y los íconos de las aplicaciones.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instancia

Los siguientes métodos están disponibles para las distancias de la clase `NativeImage`:

#### `image.toPNG([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contiene la información codificada de la imagen `PNG`.

#### `image.toJPEG(quality)`

* `quality` Entero (**required**) - Entre 0 - 100.

Devuelve `Buffer` - Un [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)que contiene la información codificada de la imagen `JPEG`.

#### `image.toBitmap([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contiene una copia de la información sin procesar de pixeles del mapa de bits de la imagen.

#### `image.toDataURL([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Devuelve `String` - El URL de información de la imagen.

#### `image.getBitmap([options])`

* `options` Objeto (opcional) * `scaleFactor` Doble (opcional) - Por defecto es 1.0.

Devuelve `Buffer` - Un [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contiene la información sin procesar de pixeles del mapa de bits de la imagen.

La diferencia entre `getBitmap()` y `toBitmap()` es que `getBitmap()` no copia la informacion del mapa de bits, así que hay que utilizar el Buffer devuelto inmediatamente en el tic del bucle del evento actual, de lo contrario la información puede ser cambiada o destruida.

#### `image.getNativeHandle()` *macOS*

Devuelve `Buffer` - Un [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que almacena el puntero C en el controlador nativo subyacente de la imagen. En macOS, se devolverá un puntero a la instancia `NSImage`.

Observe que el puntero devuelto es un puntero debil a la imagen nativa subyacente en lugar de una copia. Por lo tanto, *debe * asegurarse que la instancia asociada `nativeImage` se encuentre cerca.

#### `image.isEmpty()`

Devuelve `Boolean` - Si la imagen está vacía.

#### `image.getSize()`

Devuelve [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Booleano

Marca la imagen como una imagen de plantilla.

#### `image.isTemplateImage()`

Devuelve `Boolean` - Si la imagen es una imagen de plantilla.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - El área de la imagen para ser recortada

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Defaults to the image's width. * `height` Integer (optional) - Defaults to the image's height * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. Estos valores expresan una compensación de calidad/velocidad deseada. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.