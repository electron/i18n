# nativeImage

> Erstellen Sie Tray-, Dock- und Anwendungssymbole mithilfe von PNG- oder JPG-Dateien.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In Electron können Sie für die APIs, die Bilder aufnehmen, entweder Dateipfade oder `NativeImage` Instanzen übergeben. Ein leeres Bild wird verwendet, wenn `null` übergeben wird.

Wenn Sie z. B. ein Fach erstellen oder das Symbol eines Fensters festlegen, können Sie einen Bilddateipfad als `String`übergeben:

```javascript
const { BrowserWindow, Tray } = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
const win = new BrowserWindow(' icon: '/Users/somebody/images/window.png' '.log
'
```

Oder lesen Sie das Bild aus der Zwischenablage, das eine `NativeImage`zurückgibt:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Unterstütze Formate

Derzeit werden `PNG` und `JPEG` Bildformate unterstützt. `PNG` wird empfohlen, da er Transparenz und verlustfreie Komprimierung unterstützt.

Unter Windows können Sie auch `ICO` Symbole aus Dateipfaden laden. Für beste visuelle Qualität wird empfohlen, mindestens die folgenden Größen in die folgenden Größen aufzunehmen:

* Kleines Icon
  * 16x16 (100% DPI scale)
  * 20x20 (125% DPI scale)
  * 24x24 (150% DPI scale)
  * 32x32 (200% DPI scale)
* Großes Icon
  * 32x32 (100% DPI scale)
  * 40x40 (125% DPI scale)
  * 48x48 (150% DPI scale)
  * 64x64 (200% DPI scale)
  * 256x256

Überprüfen Sie den Abschnitt *Größe* Abschnitt in [diesem Artikel][icons].

## Hochauflösende Bilder

Auf Plattformen mit hoher DPI-Unterstützung, wie Apple Retina-Displays, können Sie `@2x` nach dem Basisdateinamen des Bildes anhängen, um es als hochauflösendes Bild zu markieren.

Wenn `icon.png` beispielsweise ein normales Bild mit Standardauflösung ist, werden `icon@2x.png` als bild mit hoher Auflösung behandelt, das eine doppelte DPI- -Dichte aufweist.

Wenn Sie Displays mit unterschiedlichen DPI-Dichten gleichzeitig unterstützen möchten, können Sie Bilder mit unterschiedlichen Größen in denselben Ordner einlegen und den Dateinamen ohne DPI-Suffixe verwenden. Ein Beispiel:

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

Die folgenden Suffixe für DPI werden ebenfalls unterstützt:

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

## Template Bild

Vorlagenbilder bestehen aus Schwarz und einem Alphakanal. Vorlagenbilder sind nicht als eigenständige Bilder gedacht und werden in der Regel mit anderen Inhalten gemischt, um das gewünschte endgültige Erscheinungsbild zu erstellen.

Der häufigste Fall ist die Verwendung von Vorlagenbildern für ein Menüleistensymbol, damit es sich sowohl an helle als auch dunkle Menüleisten anpassen kann.

**Hinweis:** Vorlagenbild wird nur unter macOS unterstützt.

Um ein Bild als Vorlagenbild zu markieren, sollte der Dateiname mit dem Wort `Template`enden. Ein Beispiel:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Methoden

Das `nativeImage` -Modul verfügt über die folgenden Methoden, die alle einer Instanz der `NativeImage` -Klasse zurückgeben:

### `nativeImage.createEmpty()`

Rückgaben `NativeImage`

Erstellt eine leere `NativeImage` Instanz.

### `nativeImage.createThumbnailFromPath(path, maxSize)` _macOS_ _Windows_

* `path` String - Pfad zu einer Datei, aus der wir eine Miniaturansicht erstellen möchten.
* `maxSize` [Größe](structures/size.md) - die maximale Breite und Höhe (positive Zahlen), die die zurückgegebene Miniaturansicht zurückgegeben werden kann. Die Windows-Implementierung ignoriert `maxSize.height` und skaliert die Höhe entsprechend `maxSize.width`.

Gibt `Promise<NativeImage>` zurück - erfüllt mit dem Miniaturansichtsbild der Datei, das eine [NativeImage](native-image.md)ist.

### `nativeImage.createFromPath(path)`

* `path` String

Rückgaben `NativeImage`

Erstellt eine neue `NativeImage` Instanz aus einer Datei, die sich in `path`befindet. Diese Methode gibt ein leeres Bild zurück, wenn die `path` nicht vorhanden ist, nicht gelesen werden kann oder kein gültiges Bild .

```javascript
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBitmap(Puffer, Optionen)`

* `buffer` [Buffer][buffer]
* `options` -Objekt
  * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Rückgaben `NativeImage`

Erstellt eine neue `NativeImage` -Instanz aus `buffer` , die die unformatierte Bitmap Pixeldaten enthält, die von `toBitmap()`zurückgegeben werden. Das spezifische Format ist plattformabhängig.

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* `options` Objekt (optional)
  * `width` Ganzzahl (optional) - Erforderlich für Bitmappuffer.
  * `height` Ganzzahl (optional) - Erforderlich für Bitmappuffer.
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Rückgaben `NativeImage`

Erstellt eine neue `NativeImage` -Instanz aus `buffer`. Versucht, zuerst als PNG oder JPEG zu dekodieren.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Rückgaben `NativeImage`

Erstellt eine neue `NativeImage` -Instanz aus `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* `hslShift` Number[] (optional)

Rückgaben `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) for a list of possible values.

The `hslShift` is applied to the image with the following rules:

* `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
* `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
* `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

In some cases, the `NSImageName` doesn't match its string representation; one example of this is `NSFolderImageName`, whose string representation would actually be `NSFolder`. Therefore, you'll need to determine the correct string representation for your image before passing it in. This can be done with the following:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cocoa - && ./test`

where `SYSTEM_IMAGE_NAME` should be replaced with any value from [this list](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).

## Class: NativeImage

> Natively wrap images such as tray, dock, and application icons.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Instanz Methoden

The following methods are available on instances of the `NativeImage` class:

#### `image.toPNG([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns `Buffer` - A [Buffer][buffer] that contains the image's `PNG` encoded data.

#### `image.toJPEG(quality)`

* `quality` Integer - Between 0 - 100.

Returns `Buffer` - A [Buffer][buffer] that contains the image's `JPEG` encoded data.

#### `image.toBitmap([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns `Buffer` - A [Buffer][buffer] that contains a copy of the image's raw bitmap pixel data.

#### `image.toDataURL([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns `String` - The data URL of the image.

#### `image.getBitmap([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns `Buffer` - A [Buffer][buffer] that contains the image's raw bitmap pixel data.

The difference between `getBitmap()` and `toBitmap()` is that `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick; otherwise the data might be changed or destroyed.

#### `image.getNativeHandle()` _macOS_

Returns `Buffer` - A [Buffer][buffer] that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Notice that the returned pointer is a weak pointer to the underlying native image instead of a copy, so you _must_ ensure that the associated `nativeImage` instance is kept around.

#### `image.isEmpty()`

Returns `Boolean` - Whether the image is empty.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns [`Size`](structures/size.md).

If `scaleFactor` is passed, this will return the size corresponding to the image representation most closely matching the passed value.

#### `image.setTemplateImage(option)`

* `option` Boolean

Marks the image as a template image.

#### `image.isTemplateImage()`

Returns `Boolean` - Whether the image is a template image.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - The area of the image to crop.

Returns `NativeImage` - The cropped image.

#### `image.resize(options)`

* `options` -Objekt
  * `width` Integer (optional) - Defaults to the image's width.
  * `height` Integer (optional) - Defaults to the image's height.
  * `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better`, or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (optional) - Standardwerte 1.0.

Returns `Float` - The image's aspect ratio.

If `scaleFactor` is passed, this will return the aspect ratio corresponding to the image representation most closely matching the passed value.

#### `image.getScaleFactors()`

Returns `Float[]` - An array of all scale factors corresponding to representations for a given nativeImage.

#### `image.addRepresentation(options)`

* `options` -Objekt
  * `scaleFactor` Double - The scale factor to add the image representation for.
  * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
  * `buffer` Buffer (optional) - The buffer containing the raw image data.
  * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Fügen Sie eine Bilddarstellung für einen bestimmten Skalierungsfaktor hinzu. Dies kann verwendet werden, , um einem Bild explizit unterschiedliche Skalierungsfaktordarstellungen hinzuzufügen. Diese kann auf leere Bilder aufgerufen werden.

### Instanz Eigenschaften

#### `nativeImage.isMacTemplateImage` _macOS-_

Eine `Boolean` Eigenschaft, die bestimmt, ob das Bild als [Vorlagenbild](https://developer.apple.com/documentation/appkit/nsimage/1520017-template)betrachtet wird.

Bitte beachten Sie, dass diese Unterkunft nur Auswirkungen auf macOS hat.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
