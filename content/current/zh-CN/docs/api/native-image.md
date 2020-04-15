# nativeImage

> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

例如, 创建托盘或设置窗口图标时, 你可以传递 `String` 格式的图片路径

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

## 支持的格式

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

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

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. 例如：

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

## 模板图片

Template images consist of black and an alpha channel. 模板图片不是单独使用的, 它通常与其他内容混合以创建期望的最终效果

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

** 注意: **仅在 macOS 上支持Template image。

To mark an image as a template image, its filename should end with the word `Template`. 例如：

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

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 `NativeImage`

Creates a new `NativeImage` instance from `buffer` that contains the raw bitmap pixel data returned by `toBitmap()`. The specific format is platform-dependent.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (optional)
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 `NativeImage`

从 `buffer ` 创建新的 ` NativeImage ` 实例。 Tries to decode as PNG or JPEG first.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

返回 `NativeImage`

从 ` dataURL ` 创建新的 ` NativeImage ` 实例。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (optional)

返回 `NativeImage`

从映射到给定图像名称的 NSImage 创建一个 `NativeImage` 实例。 See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

使用以下规则将`hslShift`应用于图像:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = 保持不变。 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = 保持不变。 1 = 全亮 (所有像素点设置为白色)。

这意味着 `[-1, 0, 1]` 将使图像完全变白，`[-1, 1, 0]`将使图像完全变黑.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## 类: NativeImage

> 本机图像，如托盘、dock栏和应用图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### 实例方法

以下方法可用于 ` NativeImage ` 类的实例:

#### `image.toPNG([options])`

* `options` Object (optional)
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 ` Buffer `-一个包含图像 ` PNG ` 编码数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toJPEG(quality)`

* `quality` Integer - Between 0 - 100.

返回 ` Buffer `-一个包含图像 ` JPEG ` 编码数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 ` Buffer `-一个包含图像的原始位图像素数据副本的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toDataURL([options])`

* `options` Object (optional)
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 ` String `-图像的数据 URL。

#### `image.getBitmap([options])`

* `options` Object (optional)
  * `scaleFactor` Double (optional) - Defaults to 1.0.

返回 ` Buffer `-一个包含图像原始位图像素数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

返回 ` Buffer `-一个 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer), 它将 C 指针存储在图像的基础本机句柄上。 在 macOS 上, 将返回指向 ` NSImage ` 实例的指针。

请注意, 返回的指针是指向基础本机映像而不是副本的弱指针, 因此 _ 必须 _ 确保关联的 ` nativeImage ` 实例保留在周围。

#### `image.isEmpty()`

返回 ` Boolean `-图像是否为空。

#### `image.getSize()`

Returns [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

将图像标记为模板图像。

**[过时的](modernization/property-updates.md)**

#### `image.isTemplateImage()`

返回 ` Boolean `-图像是否为模板图像。

**[过时的](modernization/property-updates.md)**

#### `image.crop(rect)`

* ` rect `[ Rectangle ](structures/rectangle.md)-要裁剪的图像区域.

返回 ` NativeImage `-裁剪的图像。

#### `image.resize(options)`

* `options` Object
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (可选) - 默认值为图片高度.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. 默认值为`best`. 这些值表示期望的 质量/速度 的权衡。 They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

返回 ` NativeImage `-裁剪的图像。

如果只指定` height `或` width `，那么当前的长宽比将保留在缩放图像中。

#### `image.getAspectRatio()`

返回 `Float` - 图像的长宽比.

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (可选) - 默认值为 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (可选) - 默认值为 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (可选) - 包含原始图像数据的缓冲区.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

### 实例属性

#### `nativeImage.isMacTemplateImage` _macOS_

A `Boolean` property that determines whether the image is considered a [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

Please note that this property only has an effect on macOS.
