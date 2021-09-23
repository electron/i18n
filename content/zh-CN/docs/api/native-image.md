# nativeImage

> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

在 Electron 内, 那些需要图片的 API 可以传递两种参数, 一种是文件路径, 一种是 `NativeImage` 实例对象。 空的图片对象将被 `null` 参数替代

例如, 创建托盘或设置窗口图标时, 你可以传递 `String` 格式的图片路径

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

或者从粘贴板读取图片，将返回 `NativeImage` 对象：

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## 支持的格式

当前只支持 `PNG` 和 `JPEG` 格式， 推荐使用 `PNG` ，因为这种格式支持透明和无损压缩

在 Windows 平台下, 你同样可以从文件路径中加载`ICO` 格式的 icons 对象。 为了达到最佳观看效果，推荐至少包含以下大小的图片尺寸：

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

在[这篇文章][icons]中查看 *尺寸说明* 的章节

## 高分辨率

在具有高 DPI 支持的平台 (如 Apple 视网膜显示器) 上, 可以在图像的基本文件名之后追加 ` @ 2x ` 以将其标记为高分辨率图像。

比如， 如果 `icon.png` 是一个普通的标准分辨率的图片，而 `icon@2x.png` 将被视为具有两倍DPI密度的高分辨率图像

如果您想同时支持不同的DPI密度显示，您可以将不同大小的图像放置在同一文件夹中，并使用文件名而不需要DPI 后缀。 例如：

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

还支持以下DPI的后缀：

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

模板图像由黑色和透明通道组成。 模板图片不是单独使用的, 它通常与其他内容混合以创建期望的最终效果

最常见的情况是使用模板图像作为菜单栏图标，因此它可以适应浅色和深色菜单栏。

** 注意: **仅在 macOS 上支持Template image。

要将图像标记为模板图像，其文件名应以 `Template` 一词结尾。 例如：

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## 方法

` nativeImage ` 模块具有以下方法, 它们都返回 ` nativeImage ` 类的实例:

### `nativeImage.createEmpty()`

返回 `NativeImage`

创建一个空的 ` NativeImage ` 实例。

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - 打算用来构建缩略图的文件路径
* `maxSize` [Size](structures/size.md) - 返回缩略图的最大宽度和高度(正数)。 在 Windows 平台下将忽略 `maxSize.height` 并根据 `maxSize.width` 缩放高度

返回 `Promise<NativeImage>` - 文件的缩略图预览图像，包含类型是 [NativeImage](native-image.md)

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

* `buffer` [Buffer][buffer]
* `选项` 对象
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (可选) - 默认1.0

返回 `NativeImage`

从 `buffer` 中创建一个新的 `NativeImage` 实例，其中包含由 `toBitmap()`返回的原始位图 像素数据。 具体格式取决于平台。

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (可选)
  * `width` Integer (可选) - 位图缓冲器所必需
  * `height` Integer (可选) - 位图缓冲器所必需
  * `scaleFactor` Double (可选) - 默认1.0

返回 `NativeImage`

从 `buffer ` 创建新的 ` NativeImage ` 实例。 尝试先解码为 PNG 或 JPEG

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

返回 `NativeImage`

从 ` dataURL ` 创建新的 ` NativeImage ` 实例。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (可选)

返回 `NativeImage`

从映射到给定图像名称的 NSImage 创建一个 `NativeImage` 实例。 可用值列表详见 [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/)

使用以下规则将`hslShift`应用于图像:

* `hsl_shift[0]` (色调): 图像的绝对色调值，0 和1 映射到 0和360，在色环上 (红色)。
* `hsl_shift[1]` (饱和度): 图像的饱和度调值， 以下关键值： 0 = 删除所有颜色。 0.5 = 保持不变。 1 = 图像完全饱和
* `hsl_shift[2]` (亮度): 图像的亮度调值, 可以为下列值: 0 = 移除所有亮度 (所有像素点设置为黑色). 0.5 = 保持不变。 1 = 全亮 (所有像素点设置为白色)。

这意味着 `[-1, 0, 1]` 将使图像完全变白，`[-1, 1, 0]`将使图像完全变黑.

在某些情况下， `NSImageName` 与其字符串表示并不匹配：其中一个例子是 `NSFolderImageName`，它的字符串表示实际上将是 `NSFolder`。 因此，您需要在传递图像之前确定正确的字符串表示方式。 可以像下面这样做：

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

其中 `SYSTEM_IMAGE_NAME` 应替换为 [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc)里面的值

## 类: NativeImage

> 本机图像，如托盘、dock栏和应用图标。

Process: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

### 实例方法

以下方法可用于 ` NativeImage ` 类的实例:

#### `image.toPNG([options])`

* `options` Object (可选)
  * `scaleFactor` Double (可选) - 默认1.0

返回 ` Buffer `-一个包含图像 ` PNG ` 编码数据的 [ Buffer ][buffer]。

#### `image.toJPEG(quality)`

* `quality` Integer - 在 0 - 100 之间

返回 ` Buffer `-一个包含图像 ` JPEG ` 编码数据的 [ Buffer ][buffer]。

#### `image.toBitmap([options])`

* `options` Object (可选)
  * `scaleFactor` Double (可选) - 默认1.0

返回 ` Buffer `-一个包含图像的原始位图像素数据副本的 [ Buffer ][buffer]。

#### `image.toDataURL([options])`

* `options` Object (可选)
  * `scaleFactor` Double (可选) - 默认1.0

返回 ` String `-图像的数据 URL。

#### `image.getBitmap([options])`

* `options` Object (可选)
  * `scaleFactor` Double (可选) - 默认1.0

返回 ` Buffer `-一个包含图像原始位图像素数据的 [ Buffer ][buffer]。

`getBitmap()` 和 `toBitmap() 的不同之处在于，<code>getBitmap()` 不会拷贝位图数据，所以你必须在返回 Buffer 后立刻使用它，否则数据可能会被更改或销毁

#### `image.getNativeHandle()` _macOS_

返回 ` Buffer `-一个 [ Buffer ][buffer], 它将 C 指针存储在图像的基础本机句柄上。 在 macOS 上, 将返回指向 ` NSImage ` 实例的指针。

请注意, 返回的指针是指向基础本机映像而不是副本的弱指针, 因此 _ 必须 _ 确保关联的 ` nativeImage ` 实例保留在周围。

#### `image.isEmpty()`

返回 ` Boolean `-图像是否为空。

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (可选) - 默认1.0

Returns [`Size`](structures/size.md).

如果传递了 `scaleFactor` ，将返回与图像表示最接近的传递值对应的大小。

#### `image.setTemplateImage(option)`

* `option` Boolean

将图像标记为模板图像。

#### `image.isTemplateImage()`

返回 ` Boolean `-图像是否为模板图像。

#### `image.crop(rect)`

* ` rect `[ Rectangle ](structures/rectangle.md)-要裁剪的图像区域.

返回 ` NativeImage `-裁剪的图像。

#### `image.resize(options)`

* `选项` 对象
  * `width` Integer (可选) - 默认值为图片宽度
  * `height` Integer (可选) - 默认值为图片高度.
  * `quality` String (optional) 所要设置的图片质量。 可能的值为 `good`、`better` 或 `best`。 默认值为`best`. 这些值表示期望的 质量/速度 的权衡。 他们被转换为某个特定算法, 取决于基础平台的能力 (CPU, GPU)。 这三种方法都可以在指定的平台上映射到相同的算法。

返回 ` NativeImage `-裁剪的图像。

如果只指定` height `或` width `，那么当前的长宽比将保留在缩放图像中。

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (可选) - 默认1.0

返回 `Float` - 图像的长宽比.

如果传递了 `scaleFactor` ，将返回与图像表示最接近的传递值对应的大小。

#### `image.getScaleFactors()`

Returns `Float[]` - 给定 nativeImage 的表示相对应的所有比例因子的数组

#### `image.addRepresentation(options)`

* `选项` 对象
  * `scaleFactor` Double - 要添加图像的缩放系数
  * `width` Integer (可选) - 默认值为 0. 如果将位图缓冲区指定为` buffer `, 则为必填项
  * `height` Integer (可选) - 默认值为 0. 如果将位图缓冲区指定为` buffer `, 则为必填项
  * `buffer` Buffer (可选) - 包含原始图像数据的缓冲区.
  * `dataURL` String (可选) - data URL 可以为 base 64 编码的 PNG 或 JPEG 图像.

为特定比例因子添加图像表示。 这可以用于在图像中明确添加不同的比例因子表示。 这种可以调用在空图像上。

### 实例属性

#### `nativeImage.isMacTemplateImage` _macOS_

`Boolean` 属性，用于决定图像是否被认为是一个 [template image](https://developer.apple.com/documentation/appkit/nsimage/1520017-template).

请注意，此属性仅对 macOS 有影响。

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
