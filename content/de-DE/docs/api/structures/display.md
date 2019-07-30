# Display Object

* `id` Number - Einzigartige Identifaktionsnummer (ID) die auf das entsprechende Display verweist.
* `rotation` Number - 0, 90, 180 oder 270 , repräsentiert die Display-Rotoerung in Alt-Grad (0-36).
* `scaleFactor` Number - Der Skalierungsfaktor des Ausgabe-Displays.
* `touchSupport` String - `available`, `unavailable` oder `unknown`. Gibt an ob das Display Touch unterstützt.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md) Boundings des Displays
* `size` [Size](size.md)
* workArea Rectangle
* workAreaSize Size
* `internal` Boolean - `true` for an internal display and `false` for an external display

Das `Display` Objekt repräsentiert ein echtes physisches Display welches vom Betriebssystem verwendet wird und daher an den Client angeschlossen ist. Wenn ein imitiertes/emuliertes `Display` existiert, kann das entweder daran liegen, dass das Betriebssystem "headless" läuft (ohne grafische Oberfläche) oder dass das Betriebssystem mit einem virtuellen Display verbunden ist.