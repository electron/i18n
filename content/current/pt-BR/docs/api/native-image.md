# nativeImage

> Cria ícones de bandeija, dock e aplicações usando arquivos PNG ou JPG.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

Por exemplo, quando for criar uma bandeija ou designar um ícone para uma janela, você pode passar um caminho de arquivo de imagem com a `String`:

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

## Formatos Suportados

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

* Ícone pequeno
  * 16x16 (com escala de DPI com 100%)
  * 20x20 (com escala de DPI com 125%)
  * 24x24 (com escala de DPI com 150%)
  * 32x32 (com escala de DPI com 200%)
* Ícone grande
  * 32x32 (com escala de DPI com 100%)
  * 40x40 (com escala de DPI com 150%)
  * 48x48 (com escala de DPI com 150%)
  * 64x64 (com escala de DPI com 200%)
  * 256x256

Confira a seção *Size requirements* [nesse artigo](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Imagem em Alta Resolução

Em plataformas que possuem suporte para high-DPI como a tela Retina da Apple, você pode acrescentar `@2x` depois do nome base da imagem para marcar-la como imagem de alta resolução.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Como por exemplo:

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

## Modelo de Imagem

Template images consist of black and an alpha channel. Imagens padrão não são destinadas a serem usadas sozinhas, e geralmente são acompanhadas por outros conteúdos para criar a aparência final desejada.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Nota:** Imagens padrão são suportadas somente no macOS.

To mark an image as a template image, its filename should end with the word `Template`. Como por exemplo:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Métodos

O módulo `nativeImage` possui os seguintes métodos, todos os quais retornam uma instância da classe `NativeImage`:

### `nativeImage.createEmpty()`

Retorna `NativeImage`

Cria uma instância `NativeImage` vazia.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - path to a file that we intend to construct a thumbnail out of.
* `maxSize` [Size](structures/size.md) - the maximum width and height (positive numbers) the thumbnail returned can be. The Windows implementation will ignore `maxSize.height` and scale the height according to `maxSize.width`.

Returns `Promise<NativeImage>` - fulfilled with the file's thumbnail preview image, which is a [NativeImage](native-image.md).

### `nativeImage.createFromPath(path)`

* `path` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` de um arquivo localizado em `path`. Esse método retorna uma imagem vazia se `path` não existir, não poder ser lido, ou não ser uma imagem válida.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (opicional) - Necessário para buffers de bitmap.
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (optional)

Retorna `NativeImage`

Cria uma nova instância de `NativeImage` a partir de NSImage o qual direciona para o dado nome da Imagem. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

O `hslShift` é aplicado à imagem com as seguintes regras:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

Isso significa que `[-1, 0, 1]` irá deixar a imagem totalmente branca e `[-1, 1, 0]` irá deixar a imagem totalmente preta.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Class: NativeImage

> Natively wrap images such as tray, dock, and application icons.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instância

Os seguintes métodos estão disponíveis nas instâncias da classe `NativeImage`:

#### `image.toPNG([options])`

* `options` Object (optional)
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados codificados de `PNG` da imagem.

#### `image.toJPEG(quality)`

* `quality` Integer - Between 0 - 100.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados codificados de `JPG` da imagem.

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém uma copia dos dados de bitmap crus (sem alterações) da imagem.

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `String` - Os dados de URL da imagem.

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados de bitmap crus (sem alterações) da imagem.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` no _macOS_

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Perceba que o ponteiro retornado é um ponteiro fraco para a imagem nativa subjacente invés de uma cópia, então você _deve_ se certificar de que a instância `nativeImage` esteja próxima.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Boolean

Marca a imagem como uma imagem padrão.

#### `image.isTemplateImage()`

Retorna `Boolean` - sendo a imagem uma imagem padrão ou não.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - A área da imagem a ser cortada.

Retorna `NativeImage` - A imagem cortada.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. O padrão é `best`. Esses valores apresentam a qualidade/velocidade de troca desejada. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Retorna `NativeImage` - A imagem redimensionada.

Se apenas o `height` ou o `width` forem definidos então a atual proporção de tela da imagem será preservada na imagem redimensionada.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Float` - A proporção de tela da imagem.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Padrão sendo 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (opcional) - Padrão sendo 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (opcional) - O buffer contendo os dados crus (sem alteração) da imagem.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Propriedades de Instância

#### `nativeImage.isMacTemplateImage` _macOS_

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Please note that this property only has an effect on macOS.
