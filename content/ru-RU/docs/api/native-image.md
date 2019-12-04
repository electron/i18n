# nativeImage

> Создает иконки приложения, в том числе для системного лотка (Windows), дока (macOS), используя файлы PNG и JPG.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

В Electron для API, которые принимают изображения, можно передать либо пути к файлам, либо экземпляры`NativeImage`. При передаче значения `null` будет использоваться пустое изображение.

Например, при создании вкладки в области уведомлений или установке иконки окна можно задать путь к файлу изображения в виде `String`:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

Или прочтите изображение из буфера обмена, который возвращает `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Поддерживаемые форматы

В настоящее время поддерживаются форматы изображений `PNG` и `JPEG`. Рекомендуется `PNG`, поскольку он поддерживает прозрачность и сжатие без потерь.

В Windows вы также можете загрузить значки `ICO` из путей к файлам. Для лучшего визуального качества рекомендуется включить по крайней мере следующие размеры:

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

Проверьте раздел *Size requirements* в [этой статье](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Изображения с высоким разрешением

На платформах, имеющих поддержку высокого DPI, таких как дисплеи Apple Retina, вы можете добавить `@2x` после имени файла изображения, чтобы пометить его как изображение с высоким разрешением.

Например, если `icon.png` является нормальным изображением, которое имеет стандартное разрешение, то `icon@2x.png` будет рассматриваться как изображение с высоким разрешением, с двойной плотностью DPI.

Если вы хотите поддерживать дисплей с разными частотами DPI одновременно, вы можете поместить изображения с разными размерами в одну и ту же папку и использовать имя файла без суффиксов DPI. Например:

```plaintext
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

Также поддерживаются следующие суффиксы DPI:

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

Шаблонные изображения состоят из черного и Альфа-канала. Шаблонные изображения не предназначены для использования в качестве автономных изображений и обычно смешиваются с другим содержимым для создания желаемого конечного вида.

Наиболее распространенный вариант - использование шаблонных изображений для значка панели меню, с тем чтобы он мог адаптироваться как к светлым, так и темным панелям меню.

**Внимание:** Шаблонные изображения поддерживаются только на macOS.

Чтобы пометить изображение как шаблонное, его имя должно заканчиваться словом `Template`. Например:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Методы

Модуль `nativeImage` имеет следующие методы, все из которых возвращают экземпляр класса `NativeImage`:

### `nativeImage.createEmpty()`

Возвращает `NativeImage`

Создает пустой экземпляр `NativeImage`.

### `nativeImage.createFromPath(path)`

* `path` String

Возвращает `NativeImage`

Создает новый экземпляр `NativeImage` из файла, расположенного по адресу `path`. Этот метод возвращает пустое изображение, если путь `path` не существует, не может быть прочитан или является некорректным.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object * `width` Integer * `height` Integer * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `NativeImage`

Создает новый `NativeImage` экземпляр из `buffer`, который содержит необработанную растровую карту пиксельных данных, возвращенных `toBitmap()`. Конкретный формат зависит от платформы.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (опционально) * `width` Integer (опционально) - требуется для буферов растровых изображений. * `height` Integer (опционально) - требуется для буферов растровых изображений. * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `NativeImage`

Создает новый `NativeImage` из `buffer`. Сначала пытается декодировать как PNG или JPEG.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Возвращает `NativeImage`

Создает новый `NativeImage` из `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[] (опционально)

Возвращает `NativeImage`

Создает новый экземпляр `NativeImage` из NSImage, который сопоставляется с заданным именем изображения. Смотрите [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) для получения списка возможных значений.

`hslShift` применяется к изображению со следующими правилами

* `hsl_shift[0]` (оттенок): Абсолютное значение оттенка для изображения - 0 и 1 соотносится с 0 и 360 на цветовом круге оттенков (красный).
* `hsl_shift[1]` (насыщенность): Изменение насыщенности изображения с помощью следующих значений ключа: 0 = удалить весь цвет. 0.5 = оставить без изменений. 1 = полностью насыщенное изображение.
* `hsl_shift[2]` (яркость): Изменение яркости изображения с помощью следующих значений ключа: 0 = удалить всю яркость (сделать все пикселы чёрными). 0,5 = оставить без изменений. 1 = полная яркость (сделать все точки белыми).

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

* `options` Object (опционально) * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer), который содержит закодированные данные изображения `PNG`.

#### `image.toJPEG(quality)`

* `quality` Integer - Качество От 0 до 100.

Возвращает `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer), который содержит закодированные данные изображения `JPEG`.

#### `image.toBitmap([options])`

* `options` Object (опционально) * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer), который содержит копию сырых данных растровых пикселей изображения.

#### `image.toDataURL([options])`

* `options` Object (опционально) * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `String` - данные URL изображения.

#### `image.getBitmap([options])`

* `options` Object (опционально) * `scaleFactor` Double (опционально) - По умолчанию 1.0.

Возвращает `Buffer` - [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer), который содержит сырые данные растровых пикселей изображения.

Разница между `getBitmap()` и `toBitmap()` заключается в том, что `getBitmap()` не копирует растровые данные, поэтому необходимо немедленно использовать возвращаемый буфер в тикере цикла текущего события, иначе данные могут быть изменены или уничтожены.

#### `image.getNativeHandle()` *macOS*

Возвращает `Buffer` - [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) в котором хранится указатель C на базовый собственный дескриптор изображения. На macOS возвращается указатель на экземпляр `NSImage`.

Обратите внимание, что возвращаемый указатель - это слабый указатель на исходное изображение, а не на копию, поэтому вы *должны* убедиться, что связанный с ним экземпляр `NativeImage` находится рядом.

#### `image.isEmpty()`

Возвращает `Boolean` - признак того что изображение пустое.

#### `image.getSize()`

Возвращает [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Помечает изображение как шаблон изображения.

**[Устарело](modernization/property-updates.md)**

#### `image.isTemplateImage()`

Returns `Boolean` - Whether the image is a template image.

**[Устарело](modernization/property-updates.md)**

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - область изображения до которой нужно обрезать.

Возвращает `NativeImage` - обрезанное изображение.

#### `image.resize(options)`

* `options` Object * `width` Integer (опционально) - По умолчанию ширина изображения. * `height` Integer (опционально) - По умолчанию высота изображения. * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Возвращает `Float` - пропорции изображения.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### Instance Properties

#### `nativeImage.isMacTemplateImage` *macOS*

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Пожалуйста, обратите внимание, что это свойство влияет только на macOS.