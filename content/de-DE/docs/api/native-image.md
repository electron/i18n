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
* `hslShift` -Nummer[] (optional)

Rückgaben `NativeImage`

Erstellt eine neue `NativeImage` -Instanz aus dem NSImage, die dem angegebenen Bildnamen zugeordnet ist. Eine Liste der möglichen Werte finden Sie unter [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) .

Die `hslShift` wird auf das Bild mit den folgenden Regeln angewendet:

* `hsl_shift[0]` (Farbton): Der absolute Farbtonwert für das Bild - 0 und 1 Karte 0 und 360 auf dem Farbton-Farbrad (rot).
* `hsl_shift[1]` (Sättigung): Eine Sättigungsverschiebung für das Bild mit dem folgenden Schlüsselwerten: 0 = alle Farben entfernen. 0.5 = unverändert lassen. 1 = das Bild vollständig sättigen.
* `hsl_shift[2]` (Leichtigkeit): Eine Lichtverhältnisseverschiebung für das Bild mit dem folgenden Schlüsselwerten: 0 = entfernen Sie alle Leichtigkeit (alle Pixel schwarz machen). 0.5 = unverändert lassen. 1 = volle Leichtigkeit (alle Pixel weiß machen).

Das bedeutet, dass `[-1, 0, 1]` das Bild vollständig weiß und `[-1, 1, 0]` das Bild vollständig schwarz machen.

In einigen Fällen stimmt die `NSImageName` nicht mit ihrer Zeichenfolgendarstellung überein. Ein Beispiel hierfür ist `NSFolderImageName`, deren Zeichenfolgendarstellung tatsächlich `NSFolder`wäre. Daher müssen Sie die richtige Zeichenfolgendarstellung für Ihr Bild bestimmen, bevor Sie es übergeben. Dies kann mit den folgenden Erfolgen erfolgen:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() ' NSLog('%@", SYSTEM_IMAGE_NAME); '| clang -otest -x objective-c -framework Kakao - && ./test`

wobei `SYSTEM_IMAGE_NAME` durch einen beliebigen Wert aus [dieser Liste](https://developer.apple.com/documentation/appkit/nsimagename?language=objc)ersetzt werden sollten.

## Class: NativeImage

> Natives Umwickeln von Bildern wie Tray-, Dock- und Anwendungssymbolen.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Instanz Methoden

Die folgenden Methoden sind für Instanzen der `NativeImage` -Klasse verfügbar:

#### `image.toPNG([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt `Buffer` zurück : Ein [Buffer][buffer] , der die `PNG` codierten Daten des Bildes enthält.

#### `image.toJPEG(quality)`

* `quality` Ganzzahl - Zwischen 0 - 100.

Gibt `Buffer` zurück : Ein [Buffer][buffer] , der die `JPEG` codierten Daten des Bildes enthält.

#### `image.toBitmap([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt `Buffer` zurück : Ein [Puffer-][buffer] , der eine Kopie des unformatierten Bitmap- Daten des Bildes enthält.

#### `image.toDataURL([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt `String` zurück - Die Daten-URL des Bildes.

#### `image.getBitmap([options])`

* `options` Objekt (optional)
  * `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt `Buffer` zurück : Ein [Buffer][buffer] , der die unformatierten Bitmap-Pixeldaten des Bildes enthält.

Der Unterschied zwischen `getBitmap()` und `toBitmap()` besteht darin, dass `getBitmap()` die Bitmapdaten nicht kopiert, sodass Sie den zurückgegebenen Puffer sofort in aktuellen Ereignisschleifen-Tick verwenden müssen. Andernfalls können die Daten geändert oder zerstört werden.

#### `image.getNativeHandle()` _macOS_

Gibt `Buffer` zurück - Ein [Buffer-][buffer] , der C-Zeiger auf das zugrunde liegende systemeigene Handle das Bild speichert. Unter macOS wird ein Zeiger auf `NSImage` Instanz zurückgegeben.

Beachten Sie, dass der zurückgegebene Zeiger ein Schwachzeiger auf das zugrunde liegende systemeigene Bild anstelle einer Kopie ist, daher müssen Sie</em> _sicherstellen, dass die zugeordnete `nativeImage` Instanz beibehalten wird.</p>

#### `image.isEmpty()`

Gibt `Boolean` zurück : Gibt an, ob das Bild leer ist.

#### `image.getSize([scaleFactor])`

* `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt [`Size`](structures/size.md)zurück.

Wenn `scaleFactor` übergeben wird, wird die Größe zurückgegeben, die der Bilddarstellung entspricht, die dem übergebenen Wert am ehesten entspricht.

#### `image.setTemplateImage(option)`

* `option` Boolean

Markiert das Bild als Vorlagenbild.

#### `image.isTemplateImage()`

Gibt `Boolean` zurück : Gibt an, ob es sich bei dem Bild um ein Vorlagenbild handelt.

#### `image.crop(rect)`

* `rect` [Rechteck](structures/rectangle.md) - Der Bereich des zuzuschneidenden Bildes.

Gibt `NativeImage` zurück - Das zugeschnittene Bild.

#### `image.resize(options)`

* `options` -Objekt
  * `width` Ganzzahl (optional) - Stellt die Standardeinstellung für die Breite des Bildes ein.
  * `height` Ganzzahl (optional) - Stellt die Einstellung zur Bildhöhe ein.
  * `quality` String (optional) - Die gewünschte Qualität des Größenänderungsbildes. Mögliche Werte sind `good`, `better`oder `best`. Der Standardwert ist `best`. Diese Werte drücken einen gewünschten Qualitäts-/Geschwindigkeits-Kompromiss aus. Sie werden in eine algorithmusspezifische Methode übersetzt, die von den Fähigkeiten (CPU, GPU) der zugrunde liegenden Plattform abhängt. Es ist möglich, dass alle drei Methoden dem gleichen Algorithmus auf einer bestimmten Plattform zugeordnet werden.

Gibt `NativeImage` zurück - Das geänderte Bild.

Wenn nur die `height` oder die `width` angegeben werden, wird das aktuelle Seitenverhältnis im Bild mit der geänderten Größe beibehalten.

#### `image.getAspectRatio([scaleFactor])`

* `scaleFactor` Double (optional) - Standardwerte 1.0.

Gibt `Float` zurück - Das Seitenverhältnis des Bildes.

Wenn `scaleFactor` übergeben wird, wird das Seitenverhältnis zurückgegeben, das der Bilddarstellung entspricht, die dem übergebenen Wert am ehesten entspricht.

#### `image.getScaleFactors()`

Gibt `Float[]` zurück - Ein Array aller Skalierungsfaktoren, die Darstellungen für ein bestimmtes nativeImage entsprechen.

#### `image.addRepresentation(options)`

* `options` -Objekt
  * `scaleFactor` Double - Der Skalierungsfaktor, für den die Bilddarstellung hinzugefügt werden soll.
  * `width` Ganzzahl (optional) - Standardwerte auf 0. Erforderlich, wenn ein Bitmappuffer als `buffer`angegeben ist.
  * `height` Ganzzahl (optional) - Standardwerte auf 0. Erforderlich, wenn ein Bitmappuffer als `buffer`angegeben ist.
  * `buffer` Puffer (optional) - Der Puffer, der die Rohbilddaten enthält.
  * `dataURL` String (optional) - Die Daten-URL, die entweder ein Basis-64- codiertes PNG- oder JPEG-Bild enthält.

Fügen Sie eine Bilddarstellung für einen bestimmten Skalierungsfaktor hinzu. Dies kann verwendet werden, , um einem Bild explizit unterschiedliche Skalierungsfaktordarstellungen hinzuzufügen. Diese kann auf leere Bilder aufgerufen werden.

### Instanz Eigenschaften

#### `nativeImage.isMacTemplateImage` _macOS-_

Eine `Boolean` Eigenschaft, die bestimmt, ob das Bild als [Vorlagenbild](https://developer.apple.com/documentation/appkit/nsimage/1520017-template)betrachtet wird.

Bitte beachten Sie, dass diese Unterkunft nur Auswirkungen auf macOS hat.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
