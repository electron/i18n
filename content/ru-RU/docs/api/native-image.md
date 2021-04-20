# nativeImage

> Создает иконки приложения, в том числе для системного лотка (Windows), дока (macOS), используя файлы PNG и JPG.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

Например, при создании вкладки в области уведомлений или установке иконки окна можно задать путь к файлу изображения в виде `String`:

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

## Поддерживаемые форматы

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

* Мелкие значки
  * 16x16 (100% DPI scale)
  * 20x20 (125% DPI scale)
  * 24x24 (150% DPI scale)
  * 32x32 (200% DPI scale)
* Большие значки
  * 32x32 (100% DPI scale)
  * 40x40 (125% DPI scale)
  * 48x48 (150% DPI scale)
  * 64x64 (200% DPI scale)
  * 256x256

Проверьте раздел *Size requirements* в [этой статье][icons].

## Изображения с высоким разрешением

На платформах, имеющих поддержку высокого DPI, таких как дисплеи Apple Retina, вы можете добавить `@2x` после имени файла изображения, чтобы пометить его как изображение с высоким разрешением.

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. Например:

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

## Шаблон изображения

Template images consist of black and an alpha channel. Template images are not intended to be used as standalone images and are usually mixed with other content to create the desired final appearance.

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

**Внимание:** Шаблонные изображения поддерживаются только на macOS.

To mark an image as a template image, its filename should end with the word `Template`. Например:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Методы

Модуль `nativeImage` имеет следующие методы, все из которых возвращают экземпляр класса `NativeImage`:

### `nativeImage.createEmpty()`

Возвращает `NativeImage`

Создает пустой экземпляр `NativeImage`.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - path to a file that we intend to construct a thumbnail out of.
* `maxSize` [Size](structures/size.md) - the maximum width and height (positive numbers) the thumbnail returned can be. The Windows implementation will ignore `maxSize.height` and scale the height according to `maxSize.width`.

Returns `Promise<NativeImage>` - fulfilled with the file's thumbnail preview image, which is a [NativeImage](native-image.md).

### `nativeImage.createFromPath(path)`

* `path` String

Возвращает `NativeImage`

Создает новый экземпляр `NativeImage` из файла, расположенного по адресу `path`. Этот метод возвращает пустое изображение, если путь `path` не существует, не может быть прочитан или является некорректным.

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer][buffer]
* `options` Object
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (опционально)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (опционально) - требуется для буферов растровых изображений.
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `NativeImage`

Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Возвращает `NativeImage`

Создает новый `NativeImage` из `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (опционально)

Возвращает `NativeImage`

Создает новый экземпляр `NativeImage` из NSImage, который сопоставляется с заданным именем изображения. Смотрите [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) для получения списка возможных значений.

`hslShift` применяется к изображению со следующими правилами:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0,5 = оставить без изменений. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0,5 = оставить без изменений. 1 = полная яркость (сделать все точки белыми).

Это означает, что `[-1, 0, 1]` сделает изображение полностью белым, а `[-1, 1, 0]` сделает изображение полностью чёрным.

В некоторых случаях `NSImageName` не соответствует строковому представлению; одним из примеров может служить `NSFolderImageName`, строковое представление которого будет `NSFolder`. Поэтому вам нужно определить правильное представление строк для вашего изображения, перед тем как его передавать. Это можно сделать следующим образом:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

где `SYSTEM_IMAGE_NAME` следует заменить любым значением из [этого списка](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Класс: NativeImage

> Встроенная упаковка изображений, таких как область уведомлений, док-станция и значки приложений.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

### Методы экземпляра

Для экземпляров класса `NativeImage` доступны следующие методы:

#### `image.toPNG([options])`

* `options` Object (опционально)
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - A [Buffer][buffer], который содержит закодированные данные изображения `PNG`.

#### `image.toJPEG(quality)`

* `quality` Integer - Качество От 0 до 100.

Возвращает `Buffer` - A [Buffer][buffer], который содержит закодированные данные изображения `JPEG`.

#### `image.toBitmap([options])`

* `options` Object (опционально)
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - [Buffer][buffer], который содержит копию сырых данных растровых пикселей изображения.

#### `image.toDataURL([options])`

* `options` Object (опционально)
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `String` - данные URL изображения.

#### `image.getBitmap([options])`

* `options` Object (опционально)
  * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - [Buffer][buffer], который содержит сырые данные растровых пикселей изображения.

Разница между `getBitmap()` и `toBitmap()` заключается в том, что `getBitmap()` не данные биткарты, поэтому вам придется использовать возвращенный буфер немедленно в текущего цикла событий; в противном случае данные могут быть изменены или уничтожены.

#### `image.getNativeHandle()` _macOS_

Возвращает `Buffer` - [Buffer][buffer] в котором хранится указатель C на базовый собственный дескриптор изображения. На macOS возвращается указатель на экземпляр `NSImage`.

Обратите внимание, что возвращаемый указатель - это слабый указатель на исходное изображение, а не на копию, поэтому вы _должны_ убедиться, что связанный с ним экземпляр `NativeImage` находится рядом.

#### `image.isEmpty()`

Возвращает `Boolean` - признак того что изображение пустое.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Boolean

Помечает изображение как шаблон изображения.

#### `image.isTemplateImage()`

Возвращает `Boolean` - признак того что изображение является шаблоном.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - область изображения до которой нужно обрезать.

Возвращает `NativeImage` - обрезанное изображение.

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (опционально) - По умолчанию высота изображения.
  * `quality` String (опционально) - Желаемое качество изображения при изменения размера. Possible values are `good`, `better`, or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Возвращает `NativeImage` - измененый размер изображения.

Если указаны только `height` или `width`, то текущее соотношение сторон будет сохранено в изображении.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Float` - пропорции изображения.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (optional) - The buffer containing the raw image data.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Свойства экземпляра

#### `nativeImage.isMacTemplateImage` _macOS_

Свойство `Boolean` определяет, считается ли [изображение шаблоном](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Пожалуйста, обратите внимание, что это свойство влияет только на macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
