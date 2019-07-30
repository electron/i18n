# nativeImage

> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

在Electron中, 对所有创建 images 的 api 来说, 您可以传递文件路径或 ` NativeImage ` 实例。当传递 ` null ` 时, 将创建一个空的image 对象.

例如, 创建托盘或设置窗口图标时, 你可以传递 `String` 格式的图片路径

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

或者从剪贴板中读取返回 ` NativeImage ` 的图像:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## 支持的格式

当前支持 ` PNG ` 和 ` JPEG ` 图像格式。建议使用 ` PNG `, 因为它支持透明和无损压缩。

在 Windows 上, 还可以从文件路径加载 ` ICO ` 图标。为了最佳的视觉质量, 建议在中至少包括以下大小:

* 小图标 
 * 16x16 (100% DPI scale)
 * 20x20 (125% DPI scale)
 * 24x24 (150% DPI scale)
 * 32x32 (200% DPI scale)
* 大图标 
 * 32x32 (100% DPI scale)
 * 40x40 (125% DPI scale)
 * 48x48 (150% DPI scale)
 * 64x64 (200% DPI scale)
* 256x256

在[这篇文章](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx)中查看 *尺寸说明* 的章节

## 高分辨率

在具有高 DPI 支持的平台 (如 Apple 视网膜显示器) 上, 可以在图像的基本文件名之后追加 ` @ 2x ` 以将其标记为高分辨率图像。

例如, 如果 ` icon. png ` 是具有标准分辨率的普通图像, 而 ` icon@2x. png ` 将被视为具有两倍 DPI 密度的高分辨率图像。

如果希望同时支持不同 DPI 密度的显示器, 可以将不同大小的图像放在同一文件夹中, 并使用没有 DPI 后缀的文件名。例如:

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

还支持下面这些 DPI 后缀:

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

## 模板图片

模板图像由黑色和清晰的颜色（和一个alpha通道）组成。模板图像不能用作独立图像，通常与其他内容混合以创建所需的最终外观。

最常见的情况是使用模板图片的菜单栏图标, 使它可以适应浅色和深色菜单栏。

** 注意: **仅在 macOS 上支持Template image。

若要将图像标记为Template image, 其文件名应以` Template ` 结尾。例如:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## 方法

` nativeImage ` 模块具有以下方法, 它们都返回 ` nativeImage ` 类的实例:

### `nativeImage.createEmpty()`

返回 `NativeImage`

创建一个空的 ` NativeImage ` 实例。

### `nativeImage.createFromPath(path)`

* `path` String

返回 `NativeImage`

从位于 ` path ` 的文件创建新的 ` NativeImage ` 实例。 如果 ` path ` 不存在，，无法读取或不是有效图像，方法将返回空图像, 。

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object * `width` Integer * `height` Integer * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional) * `width` Integer (optional) - Required for bitmap buffers. * `height` Integer (optional) - Required for bitmap buffers. * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 `NativeImage`

Creates a new `NativeImage` instance from `buffer`. Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

返回 `NativeImage`

Creates a new `NativeImage` instance from `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

返回 `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## 类: NativeImage

> 本机图像，如托盘、dock栏和应用图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### 实例方法

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.

#### `image.toBitmap([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

Returns `String` - The data URL of the image.

#### `image.getBitmap([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

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