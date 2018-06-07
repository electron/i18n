# nativeImage

> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

在Electron中, 对所有创建 images 的 api 来说, 您可以传递文件路径或 ` NativeImage ` 实例。当传递 ` null ` 时, 将创建一个空的image 对象.

例如, 创建托盘或设置窗口图标时, 你可以传递 `String` 格式的图片路径

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

或者从剪贴板中读取返回 ` NativeImage ` 的图像:

```javascript
const {clipboard, Tray} = require('electron')
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
const {Tray} = require('electron')
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

模板图片由黑色和清晰的颜色 (和 alpha 通道) 组成。 模板图片不是单独使用的, 它通常与其他内容混合以创建期望的最终效果

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

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (可选) 
 * `width` Integer (可选) - 对于位图bitmap, 缓冲区(buffers) 是必需的
 * `height` Integer (可选) - 对于位图bitmap, 缓冲区(buffers) 是必需的
 * `scaleFactor` Double (可选) - 默认为 1.0.

返回 `NativeImage`

从 `buffer ` 创建新的 ` NativeImage ` 实例。

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

返回 `NativeImage`

从 ` dataURL ` 创建新的 ` NativeImage ` 实例。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

返回 `NativeImage`

从映射到给定图像名称的 NSImage 创建一个 `NativeImage` 实例。 可以使用的值, 请参见 [` NSImageName `](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) 文档。

使用以下规则将`hslShift`应用于图像

* `hsl_shift[0]` (色调): 图像的绝对色调值，-0 和1 映射到 0和360，在色环上 (红色)。
* `hsl_shift[1]` (饱和度): 图像的饱和度变化, 可以为下列值: 0 = 移除所有颜色. 0.5 = 保持不变. 1 = 图像完全饱和.
* `hsl_shift[2]` (亮度): 图像的亮度变化, 可以为下列值: 0 = 移除所有亮度 (所有像素点设置为黑色). 0.5 = 保持不变。 1 = 全亮 (所有像素点设置为白色)。

这意味着 `[-1, 0, 1]` 将使图像完全变白，`[-1, 1, 0]`将使图像完全变黑.

## 类: NativeImage

> 本机图像，如托盘、dock栏和应用图标。

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

### 实例方法

以下方法可用于 ` NativeImage ` 类的实例:

#### `image.toPNG([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

返回 ` Buffer `-一个包含图像 ` PNG ` 编码数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toJPEG(quality)`

* ` quality ` Integer (** 必需 **)-介于 0-100 之间。

返回 ` Buffer `-一个包含图像 ` JPEG ` 编码数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toBitmap([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

返回 ` Buffer `-一个包含图像的原始位图像素数据副本的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toDataURL([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

返回 ` String `-图像的数据 URL。

#### `image.getBitmap([options])`

* `options` Object (可选) 
 * `scaleFactor` Double (可选) - 默认值为 1.0.

返回 ` Buffer `-一个包含图像原始位图像素数据的 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

`getBitmap()` 和 `toBitmap() 的不同之处在于，<code>getBitmap()` 不会拷贝位图数据，所以你必须在返回 Buffer 后立刻使用它，否则数据可能会被更改或销毁

#### `image.getNativeHandle()` *macOS*

返回 ` Buffer `-一个 [ Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer), 它将 C 指针存储在图像的基础本机句柄上。 在 macOS 上, 将返回指向 ` NSImage ` 实例的指针。

请注意, 返回的指针是指向基础本机映像而不是副本的弱指针, 因此 * 必须 * 确保关联的 ` nativeImage ` 实例保留在周围。

#### `image.isEmpty()`

返回 ` Boolean `-图像是否为空。

#### `image.getSize()`

Returns [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

将图像标记为模板图像。

#### `image.isTemplateImage()`

返回 ` Boolean `-图像是否为模板图像。

#### `image.crop(rect)`

* ` rect `[ Rectangle ](structures/rectangle.md)-要裁剪的图像区域.

返回 ` NativeImage `-裁剪的图像。

#### `image.resize(options)`

* ` options `Object * ` width ` Integer (可选)-默认为图像的宽度。 * `height` Integer (可选) - 默认值为图片高度. * `quality` String (optional) 所要设置的图片质量。 支持的值为`good`, `better` 或`best`. 默认值为`best`. 这些值表示期望的 质量/速度 的权衡。 它们被翻译成一种基于算法的方法，它依赖于底层平台的能力(CPU, GPU)。 这三种方法都可以在指定的平台上映射到相同的算法。

返回 ` NativeImage `-裁剪的图像。

如果只指定` height `或` width `，那么当前的长宽比将保留在缩放图像中。

#### `image.getAspectRatio()`

返回 `Float` - 图像的长宽比.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - 要添加图像的缩放系数. * `width` Integer (可选) - 默认值为 0. 如果将位图缓冲区指定为` buffer `, 则为必填项。 * `height` Integer (可选) - 默认值为 0. 如果将位图缓冲区指定为` buffer `, 则为必填项。 * `buffer` Buffer (可选) - 包含原始图像数据的缓冲区. * `dataURL` String (可选) - data URL 可以为 base 64 编码的 PNG 或 JPEG 图像.

添加特定比例的图像表示。这可以明确地用来向图像添加不同的比例表示。这可以在空图像上调用。