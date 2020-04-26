# nativeImage

> tray や Dock やアプリケーションのアイコンを PNG や JPG ファイルで作成します。

プロセス: [メイン](../glossary.md#main-process), [レンダラー](../glossary.md#renderer-process)

Electron では、 API が画像を取る場合、ファイルパスまたは `NativeImage` インスタンスを渡すことができます。 `null` が渡されたときは空の画像が使用されます。

例として、tray を作ったりウインドウのアイコンを設定したりするとき、`String` で画像ファイルパスを渡せます。

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

clipboard から画像を読む場合は、`NativeImage` が返されます。

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## サポートされているフォーマット

現在 `PNG` と `JPEG` の画像形式に対応しています。 透明度とか可逆圧縮に対応した `PNG` をおすすめします。

Windows では、ファイルパスから `ICO` アイコンを読み込むこともできます。 最高の表示品質を得るため、少なくとも以下のサイズを含めることをおすすめします:

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

例えば、`icon.png` が通常の標準解像度の画像であれば、`icon@2x.png` が2倍のピクセル密度を持つ高解像度の画像として扱われます。

同時に異なるピクセル密度のディスプレイをサポートしたい場合、同じフォルダ内に異なるサイズの画像を置き、DPI 接尾子無しでファイル名を使用して下さい。 例:

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

テンプレート画像は黒色とアルファチャンネルで構成されます。 テンプレート画像は単体の画像として使用するものではなく、通常、最終的にさせたい見た目を作成するため、他のコンテンツと混合されます。

最も一般的なケースは、メニューバーのアイコンに使用することです。これは明るいメニューバーと暗いメニューバーの両方に適応できます。

**注釈:** テンプレート画像は macOS でのみサポートされています。

画像をテンプレート画像としてマークするには、そのファイル名が `Template` で終わる必要があります。 例:

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
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `NativeImage`

`buffer` から新しい `NativeImage` インスタンスを作成します。これには`toBitmap()` によって返された生のビットマップピクセルデータが含まれます。 詳細な形式はプラットフォームに依存します。

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (任意)
  * `width` Integer (任意) - ビットマップバッファに必要。
  * `height` Integer (任意) - ビットマップバッファに必要。
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `NativeImage`

`buffer` から `NativeImage` の新しいインスタンスを作成します。 最初に PNG または JPEG としてデコードしようとします。

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

戻り値 `NativeImage`

`dataURL` から `NativeImage` の新しいインスタンスを作成します。

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (任意)

戻り値 `NativeImage`

指定した画像名にマップされる NSImage から `NativeImage` の新しいインスタンスを作成します。 使用可能な値のリストは、[`システムアイコン`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) を参照してください。

`hslShift` は以下のルールで画像に適用されます。

* `hsl_shift[0]` (色相): 画像における色相の絶対値 - 0 から 1 が 色相カラーホイール (赤) の 0 から 360 に割り当てられます。
* `hsl_shift[1]` (彩度): 画像における彩度の変化量。 以下のキー値を使用します: 0 = すべての色を取り除く。 0.5 = そのまま変わらない。 1 = 完全に鮮やかにする。
* `hsl_shift[2]` (明るさ): 画像における明るさの変化量。以下のキー値を使用します。 0 = 明るさをすべて取り除く (すべてのピクセルを黒にする)。 0.5 = そのまま変わらない。 1 = 完全に明るい (すべてのピクセルを白にする)。

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
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `Buffer` - `PNG` エンコードされた画像データを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toJPEG(quality)`

* `quality` Integer - 0 - 100 の間です。

戻り値 `Buffer` - `JPEG` エンコードされた画像データを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toBitmap([options])`

* `options` Object (任意)
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `Buffer` - 生のビットマップ画像のピクセルデータのコピーを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toDataURL([options])`

* `options` Object (任意)
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `String` - 画像のデータURL。

#### `image.getBitmap([options])`

* `options` Object (任意)
  * `scaleFactor` Double (任意) - 省略値は 1.0。

戻り値 `Buffer` - 生のビットマップ画像のピクセルデータを含む [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

`getBitmap()` と `toBitmap()` には違いがあります。`getBitmap()` はビットマップをコピーしないので、現在のイベントループティックで即座に使用しなければ、そのデータが変更または破棄される可能性があります。

#### `image.getNativeHandle()` _macOS_

戻り値 `Buffer` - 画像の元になるネイティブハンドルへの C ポインタを格納する [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)。 macOS では、`NSImage` のインスタンスのポインタが返されます。

返されるポインタは、コピーではなく、元のネイティブな画像へのウィークポインタであることに注意して下さい。関連する `nativeImage` インスタンスが確実に_保持されなければなりません_。

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
  * `width` Integer (任意) - 省略値は画像の幅。
  * `height` Integer (任意) - 省略値は画像の高さ。
  * `quality` String (任意) - リサイズした画像の希望する画質。 値は `good`、`better`、`best` のいずれかにできます。 省略値は、`best` です。 これらの値は、必要な画質と速度のトレードオフを表現する。 これらは、動作プラットフォームの機能 (CPU、GPU) に依存するアルゴリズム固有のメソッドに変換されます。 3 つのメソッド全てを、特定プラットフォーム上の同じアルゴリズムに割り当てることもできます。

戻り値 `NativeImage` - リサイズされた画像。

`height` または `width` のどちらかのみが指定された場合、アスペクト比はリサイズされた画像でも保持されます。

#### `image.getAspectRatio()`

戻り値 `Float` - イメージのアスペクト比。

#### `image.addRepresentation(options)`

* `options` Object
  * `scaleFactor` Double - 画像を表現する際の拡大倍率。
  * `width` Integer (任意) - 既定値は 0 です。 `buffer` にビットマップバッファが指定されている場合は必要です。
  * `height` Integer (任意) - 既定値は 0 です。 `buffer` にビットマップバッファが指定されている場合は必要です。
  * `buffer` Buffer (任意) - 生の画像データを格納するバッファ。
  * `dataURL` String (任意) - Base64 エンコードした PNG または JPEG 画像を格納しているデータURL。

画像の表現を指定された縮尺で追加します。 これによって、異なる縮尺の表現を明示的に画像へ追加できます。 空の画像で呼び出すことができます。

### インスタンスプロパティ

#### `nativeImage.isMacTemplateImage` _macOS_

`Boolean` 型のプロパティです。その画像が [テンプレート画像](https://developer.apple.com/documentation/appkit/nsimage/1520017-template) と見なされるかどうかを決定します。

このプロパティは macOS にのみ影響することに注意してください。
