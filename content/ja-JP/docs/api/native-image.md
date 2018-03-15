# nativeImage

> tray や Dock やアプリケーションのアイコンを PNG や JPG ファイルで作成します。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron では、画像を取る API において、ファイルパスか `NativeImage` インスタンスのいずれかを渡すことができます。`null` を渡したときは空の画像が使われます。

例として、tray を作ったりウインドウのアイコンを設定したりするとき、`String` で画像ファイルパスを渡せます。

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

clipboard から画像を読む場合は `NativeImage` が返されます。

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## サポートされているフォーマット

現在、`PNG` と `JPEG` 画像フォーマットがサポートされています。`PNG` は透過や可逆圧縮をサポートするため推奨します。

Windows では、ファイルパスから `ICO` アイコンを読み込むこともできます。最高の画質を得るには、少なくとも以下のサイズを含むことを推奨します。

* 小さいアイコン 
 * 16x16 (DPI スケール 100%)
 * 20x20 (DPI スケール 125%)
 * 24x24 (DPI スケール 150%)
 * 32x32 (DPI スケール 200%)
* 大きいアイコン 
 * 32x32 (DPI スケール 100%)
 * 40x40 (DPI スケール 125%)
 * 48x48 (DPI スケール 150%)
 * 64x64 (DPI スケール 200%)
* 256x256

[この記事](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx) 内の *サイズ要件* の章を確認して下さい。

## 高解像度の画像

Apple Retina ディスプレイのような高解像度をサポートしているプラットフォームにおいて、画像のファイルネームの後ろに `@2x` を加えることで、高解像度の画像としてマークすることができます。

例えば `icon.png` が通常の標準解像度の画像であれば、`icon@2x.png` が2倍のピクセル密度を持つ高解像度の画像として扱われます。

同時に異なるピクセル密度のディスプレイをサポートしたい場合、同じフォルダ内に異なるサイズの画像を置き、DPI 接尾子無しでファイル名を使用して下さい。

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

以下の DPI 接尾子がサポートされています。

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

## テンプレート画像

テンプレート画像は黒色と透明色 (とアルファチャンネル) で構成されます。 テンプレート画像は単体の画像として使用するものではなく、通常、最終的にさせたい見た目を作成するため、他のコンテンツと混合されます。

最も一般的なケースは、メニューバーのアイコンに使用することです。これは明るいメニューバーと暗いメニューバーの両方に適応できます。

**注釈:** テンプレート画像は macOS でのみサポートされています。

画像をテンプレート画像としてマークするには、そのファイル名が `Template` で終わる必要があります。以下が例です。

* `xxxTemplate.png`
* `xxxTemplate.png`

## メソッド

`nativeImage` オブジェクトには以下のメソッドがあります。いずれも `NativeImage` クラスのインスタンスを返します。

### `nativeImage.createEmpty()`

戻り値 `NativeImage`

空の `NativeImage` インスタンスを作成します。

### `nativeImage.createFromPath(path)`

* `path` String

戻り値 `NativeImage`

`path` のファイルから新しい `NativeImage` インスタンスを作成します。 このメソッドは、`path` が存在しない、読めない、有効な画像でない場合は、空の画像を返します。

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (任意) * `width` Integer (任意) - ビットマップバッファに必要。 * `height` Integer (任意) - ビットマップバッファに必要。 * `scaleFactor` Double (任意) - 省略値は1.0。

戻り値 `NativeImage`

`buffer` から `NativeImage` の新しいインスタンスを作成します。

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

戻り値 `NativeImage`

`dataURL` から `NativeImage` の新しいインスタンスを作成します。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

戻り値 `NativeImage`

指定した画像名にマップされる NSImage から `NativeImage` の新しいインスタンスを作成します。 使用可能な値のリストは、[`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) を参照してください。

`hslShift` は以下のルールで画像に適用されます。

* `hsl_shift[0]` (色相): 画像における色相の絶対値 - 0 から 1 が 色相カラーホイール (赤) の 0 から 360 に割り当てられる。
* `hsl_shift[1]` (彩度): 画像における彩度の変化量。以下のキー値を使用する。  
 0 = すべての色が抜かれる。  
 0.5 = 変わらないまま。  
 1 = 画像の彩度を最大にする。 
* `hsl_shift[2]` (明度): 画像における明度の変化量。以下のキー値を使用する。  
 0 = すべての明度がなくなる (すべてのピクセルが黒になる)。  
 0.5 = 変わらないまま。  
 1 = 明度が最大になる (すべてのピクセルが白になる)。

つまり、`[-1, 0, 1]` は完全に白い画像になり、`[-1, 1, 0]` は完全に黒い画像になります。

## クラス: NativeImage

> Natively wrap images such as tray, dock, and application icons.

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

### インスタンスメソッド

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer (**required**) - Between 0 - 100.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.

#### `image.toBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `String` - The data URL of the image.

#### `image.getBitmap([options])`

* `options` Object (optional) * `scaleFactor` Double (optional) - Defaults to 1.0.

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

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` Object * `width` Integer (optional) - Defaults to the image's width. * `height` Integer (optional) - Defaults to the image's height * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.