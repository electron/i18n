# nativeImage

> tray や Dock やアプリケーションのアイコンを PNG や JPG ファイルで作成します。

プロセス: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Electron では、画像を取る API において、ファイルパスか `NativeImage` インスタンスのいずれかを渡すことができます。`null` を渡したときは空の画像が使われます。

例として、tray を作ったりウインドウのアイコンを設定したりするとき、`String` で画像ファイルパスを渡せます。

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

## サポートされているフォーマット

現在、`PNG` と `JPEG` 画像フォーマットがサポートされています。`PNG` は透過や可逆圧縮をサポートするため推奨します。

On Windows, you can also load `ICO` icons from file paths. For best visual quality, it is recommended to include at least the following sizes in the:

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

For example, if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

同時に異なるピクセル密度のディスプレイをサポートしたい場合、同じフォルダ内に異なるサイズの画像を置き、DPI 接尾子無しでファイル名を使用して下さい。

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

## テンプレート画像

テンプレート画像は、黒とアルファチャンネルで構成されています。テンプレート画像は単体の画像として使用するものではなく、通常、最終的にさせたい見た目を作成するため、他のコンテンツと混合されます。

The most common case is to use template images for a menu bar icon, so it can adapt to both light and dark menu bars.

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

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(buffer, options)`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object 
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `NativeImage`

`buffer` から新しい `NativeImage` インスタンスを作成します。これには`toBitmap()` によって返された生のビットマップピクセルデータが含まれます。フォーマットはプラットフォームに依存します。

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (任意) 
  * `width` Integer (optional) - Required for bitmap buffers.
  * `height` Integer (optional) - Required for bitmap buffers.
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `NativeImage`

`buffer` から `NativeImage` の新しいインスタンスを作成します。最初に PNG または JPEG としてデコードしようとします。

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

戻り値 `NativeImage`

`dataURL` から `NativeImage` の新しいインスタンスを作成します。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[] (任意)

戻り値 `NativeImage`

指定した画像名にマップされる NSImage から `NativeImage` の新しいインスタンスを作成します。 使用可能な値のリストは、[`システムアイコン`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) を参照してください。

The `hslShift` is applied to the image with the following rules:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = そのまま変わらない。 1 = 完全に明るい (すべてのピクセルを白にする)。

つまり、`[-1, 0, 1]` は完全に白い画像になり、`[-1, 1, 0]` は完全に黒い画像になります。

場合によっては、`NSImageName` はその文字列表現と一致しません。 その一例が `NSFolderImageName` で、その文字列表現は実際には `NSFolder` です。 そのため、画像を渡す前に正しい文字列表現を特定する必要があります。 これは以下のようにしてできます。

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

`SYSTEM_IMAGE_NAME` は [このリスト](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) から任意の値に置き換えてください。

## クラス: NativeImage

> tray や Dock やアプリケーションアイコンのような画像を、ネイティブにラップします。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

### インスタンスメソッド

`NativeImage` クラスのインスタンスには、以下のメソッドがあります。

#### `image.toPNG([options])`

* `options` Object (任意) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `Buffer` - `PNG` エンコードされた画像データを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toJPEG(quality)`

* `quality` Integer - 0 - 100 の間です。

戻り値 `Buffer` - `JPEG` エンコードされた画像データを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toBitmap([options])`

* `options` Object (任意) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `Buffer` - 生のビットマップ画像のピクセルデータのコピーを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toDataURL([options])`

* `options` Object (任意) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `String` - 画像のデータURL。

#### `image.getBitmap([options])`

* `options` Object (任意) 
  * `scaleFactor` Double (optional) - Defaults to 1.0.

戻り値 `Buffer` - 生のビットマップ画像のピクセルデータを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` *macOS*

戻り値 `Buffer` - 画像の元になるネイティブハンドルへの C ポインタを格納する [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。 macOS では、`NSImage` のインスタンスのポインタが返されます。

返されるポインタは、コピーではなく、元のネイティブな画像へのウィークポインタであることに注意して下さい。関連する `nativeImage` インスタンスが確実に*保持されなければなりません*。

#### `image.isEmpty()`

戻り値 `Boolean` - 画像が空かどうか。

#### `image.getSize()`

戻り値 [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

画像をテンプレート画像としてマークします。

**[非推奨](modernization/property-updates.md)**

#### `image.isTemplateImage()`

戻り値 `Boolean` - 画像がテンプレート画像かどうか。

**[非推奨](modernization/property-updates.md)**

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - 画像をトリミングする領域。

戻り値 `NativeImage` - トリミングされた画像。

#### `image.resize(options)`

* `options` Object 
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

戻り値 `NativeImage` - リサイズされた画像。

`height` または `width` のどちらかのみが指定された場合、アスペクト比はリサイズされた画像でも保持されます。

#### `image.getAspectRatio()`

戻り値 `Float` - イメージのアスペクト比。

#### `image.addRepresentation(options)`

* `options` Object 
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (optional) - The buffer containing the raw image data.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

特定の倍率における画像表現を追加します。これは異なる倍率表現を画像に明示的に追加するために使用できます。これは空の画像でも呼び出すことができます。

### インスタンスプロパティ

#### `nativeImage.isMacTemplateImage` *macOS*

`Boolean` 型のプロパティです。その画像が [テンプレート画像](https://developer.apple.com/documentation/appkit/nsimage/1520017-template) と見なされるかどうかを決定します。

このプロパティは macOS にのみ影響することに注意してください。