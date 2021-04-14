# nativeImage

> 使用 PNG 或 JPG 文件创建托盘、dock和应用程序图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

在 Electron 中，对于拍摄图像的 ABI，您可以通过文件路径或 `NativeImage` 实例。 传递 `null` 时，将使用空图像。

例如, 创建托盘或设置窗口图标时, 你可以传递 `String` 格式的图片路径

```javascript
康斯特 { BrowserWindow, Tray } = 需要 （'电子'）

康斯特 appIcon = 新托盘 （'/用户/某人/图像/图标.png'）
缺点赢 = 新的浏览器窗口 （+图标： '/用户/某人/图像/窗口.png'}）
控制台.log （appIcon， 赢）
```

或从剪贴板上读取图像，剪贴板返回 `NativeImage`：

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## 支持的格式

当前支持 `PNG` 和 `JPEG` 图像格式。 建议`PNG` ，因为它支持透明度和无损压缩。

在 Windows 上，您还可以从文件路径加载 `ICO` 图标。 为了获得最佳的视觉 质量，建议在以下尺寸中至少包括以下尺寸：

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

例如，如果 `icon.png` 是具有标准分辨率的正常图像，则 `icon@2x.png` 将被视为具有双倍 DPI 密度的高分辨率图像。

如果您想同时支持具有不同 DPI 密度的显示器， ，您可以将不同大小的图像放在同一文件夹中，并在没有 DPI 后缀的情况下使用文件名 。 例如：

```plaintext
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
康斯特 { Tray } = 需要 （'电子'）
康斯特图标 = 新托盘 （'/ 用户 / 某人 / 图像 / 图标.png'）
控制台.log （appIcon）
```

还支持 DPI 的以下后缀：

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

模板图像由黑色和阿尔法通道组成。 模板图片不是单独使用的, 它通常与其他内容混合以创建期望的最终效果

最常见的情况是使用菜单栏图标的模板图像，这样它就可以 适应浅色和深色菜单条。

** 注意: **仅在 macOS 上支持Template image。

要将图像标记为模板图像，其文件名应以" `Template`"一词结尾。 例如：

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## 方法

` nativeImage ` 模块具有以下方法, 它们都返回 ` nativeImage ` 类的实例:

### `nativeImage.createEmpty()`

返回 `NativeImage`

创建一个空的 ` NativeImage ` 实例。

### `nativeImage.createThumbnailFromPath(path, maxSize)` _马科斯_ _窗口_

* `path` 字符串 - 通往我们打算构建缩略图的文件的路径。
* `maxSize` [尺寸](structures/size.md) - 缩略图返回的最大宽度和高度（正数）。 Windows 的实施将忽略 `maxSize.height` ，并根据 `maxSize.width`缩放高度。

返回 `Promise<NativeImage>` - 满足与文件的缩略图预览图像，这是一个 [原生图像](native-image.md)。

### `nativeImage.createFromPath(path)`

* `path` String

返回 `NativeImage`

从位于 ` path ` 的文件创建新的 ` NativeImage ` 实例。 如果 ` path ` 不存在，，无法读取或不是有效图像，方法将返回空图像, 。

```javascript
康斯特原生图像 = 需要 （"电子"）. 原生图像

康斯特图像 = 原生图像. 创建从路径 （'/ 用户 / 某人 / 图像 / 图标.png'）
控制台.log （图像）
```

### `原生图像。创建从比特图（缓冲区，选项）`

* `buffer` [Buffer][buffer]
* `选项` 对象
  * `width` Integer
  * `height` Integer
  * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 `NativeImage`

从 `buffer` 创建一个新的 `NativeImage` 实例，其中包含 `toBitmap()`返回的原始位图 像素数据。 特定格式依赖于平台。

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Object (可选)
  * `width` 整数（可选） - 位图缓冲区所需。
  * `height` 整数（可选） - 位图缓冲区所需。
  * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 `NativeImage`

从 `buffer ` 创建新的 ` NativeImage ` 实例。 尝试先解码为巴布亚新几内亚或JPEG。

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

返回 `NativeImage`

从 ` dataURL ` 创建新的 ` NativeImage ` 实例。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` 号[]（可选）

返回 `NativeImage`

从映射到给定图像名称的 NSImage 创建一个 `NativeImage` 实例。 有关可能的值列表，请参阅 [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) 。

使用以下规则将`hslShift`应用于图像:

* `hsl_shift[0]` （色调）：图像的绝对色调值 - 0 和 1 地图 到 0 和 360 的色调颜色轮（红色）。
* `hsl_shift[1]` （饱和）：图像的饱和变化， 遵循关键值： 0 = 去除所有颜色。 0.5 = 保持不变。 1 = 图像完全饱和。
* `hsl_shift[2]` （亮度）：图像的亮度变化， 遵循关键值： 0 = 去除所有亮度（使所有像素变黑）。 0.5 = 保持不变。 1 = 全亮 (所有像素点设置为白色)。

这意味着 `[-1, 0, 1]` 将使图像完全变白，`[-1, 1, 0]`将使图像完全变黑.

在某些情况下， `NSImageName` 与其字符串表示不匹配：其中一个例子是 `NSFolderImageName`，其字符串表示实际上将是 `NSFolder`。 因此，在传递图像之前，您需要确定图像的正确字符串表示。 这可以通过以下几个方面完成：

`回声-e'#import <Cocoa/Cocoa.h>\n主（）{NSLog（@"%@"，SYSTEM_IMAGE_NAME）：}'|叮当-奥斯特-x客观-c-框架可可- && 。/测试`

如果 `SYSTEM_IMAGE_NAME` 应替换为此列表</a>

的任何值。</p> 



## 类: NativeImage



> 本机图像，如托盘、dock栏和应用图标。

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)



### 实例方法

以下方法可用于 ` NativeImage ` 类的实例:



#### `image.toPNG([options])`

* `options` Object (可选) 
    * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 ` Buffer `-一个包含图像 ` PNG ` 编码数据的 [ Buffer ][buffer]。



#### `image.toJPEG(quality)`

* `quality` 整数 - 0 - 100 之间。

返回 ` Buffer `-一个包含图像 ` JPEG ` 编码数据的 [ Buffer ][buffer]。



#### `image.toBitmap([options])`

* `options` Object (可选) 
    * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 ` Buffer `-一个包含图像的原始位图像素数据副本的 [ Buffer ][buffer]。



#### `image.toDataURL([options])`

* `options` Object (可选) 
    * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 ` String `-图像的数据 URL。



#### `image.getBitmap([options])`

* `options` Object (可选) 
    * `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 ` Buffer `-一个包含图像原始位图像素数据的 [ Buffer ][buffer]。

`getBitmap()` 和 `toBitmap()` 的区别在于， `getBitmap()` 不 复制位图数据，因此您必须立即在当前事件循环刻度 使用返回的缓冲区：否则数据可能会更改或销毁。



#### `image.getNativeHandle()` _macOS_

返回 ` Buffer `-一个 [ Buffer ][buffer], 它将 C 指针存储在图像的基础本机句柄上。 在 macOS 上, 将返回指向 ` NSImage ` 实例的指针。

请注意, 返回的指针是指向基础本机映像而不是副本的弱指针, 因此 _ 必须 _ 确保关联的 ` nativeImage ` 实例保留在周围。



#### `image.isEmpty()`

返回 ` Boolean `-图像是否为空。



#### `图像。获取大小（[scaleFactor]）`

* `scaleFactor` 翻倍（可选） - 默认值为 1.0。

Returns [`Size`](structures/size.md).

如果 `scaleFactor` 通过，这将返回与图像表示最匹配的传递值对应的大小。



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
    * `width` 整数（可选） - 图像宽度的默认值。
  * `height` Integer (可选) - 默认值为图片高度.
  * `quality` 字符串（可选） - 调整大小图像所需的质量。 可能的值是 `good`、 `better`或 `best`。 默认值为`best`. 这些值表示期望的 质量/速度 的权衡。 它们 转换为特定于算法的方法，该方法取决于基础平台 （CPU、GPU）的功能。 所有三种方法 都有可能映射到给定平台上的同一算法。

返回 ` NativeImage `-裁剪的图像。

如果只指定` height `或` width `，那么当前的长宽比将保留在缩放图像中。



#### `图像.获取视图拉蒂奥（[scaleFactor]）`

* `scaleFactor` 翻倍（可选） - 默认值为 1.0。

返回 `Float` - 图像的长宽比.

如果 `scaleFactor` 通过，这将返回与图像表示最匹配的传递值对应的纵横比。



#### `图像。获取缩放因子（）`

返回 `Float[]` - 与给定原生图像的表示相对应的所有比例因子阵列。



#### `image.addRepresentation(options)`

* `选项` 对象 
    * `scaleFactor` 双 - 添加图像表示的刻度因子。
  * `width` Integer (可选) - 默认值为 0. 如果位图缓冲区 指定为 `buffer`，则需要。
  * `height` Integer (可选) - 默认值为 0. 如果位图缓冲区 指定为 `buffer`，则需要。
  * `buffer` Buffer (可选) - 包含原始图像数据的缓冲区.
  * `dataURL` 字符串（可选） - 包含基础64 编码PNG或JPEG图像的数据网址。

为特定比例因子添加图像表示。 这可以 使用，以明确地向图像添加不同的比例因子表示。 此 可在空图像上调用。



### 实例属性



#### `nativeImage.isMacTemplateImage` _马科斯_

`Boolean` 属性，以确定图像是否被视为 [模板图像](https://developer.apple.com/documentation/appkit/nsimage/1520017-template)。

请注意，此属性仅对 macOS 有影响。

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
