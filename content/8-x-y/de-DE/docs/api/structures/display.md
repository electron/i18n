# Display Object

* `id` Number - Einzigartige Identifaktionsnummer (ID) die auf das entsprechende Display verweist.
* `rotation` Number - 0, 90, 180 oder 270 , repräsentiert die Display-Rotoerung in Alt-Grad (0-36).
* `scaleFactor` Number - Der Skalierungsfaktor des Ausgabe-Displays.
* `touchSupport` String - `available`, `unavailable` oder `unknown`. Gibt an ob das Display Touch unterstützt.
* `monochrome` Boolean - Ob das Display ein monochromes Display ist oder nicht.
* `accelerometerSupport` String - Kann `available`, `unavailable`, `unknown` sein.
* `colorSpace` String -  repräsentieren einen Farbraum (dreidimensionales Objekt, das alle realisierbaren Farbkombinationen enthält) für den Zweck der Farbkonvertierungen
* `colorDepth` Number - Die Anzahl der Bits pro Pixel.
* `depthPerComponent` Number - Die Anzahl der Bits pro Farbkomponente.
* `bounds` [Rectangle](rectangle.md) Boundings des Displays
* `size` [Size](size.md)
* workArea Rectangle
* workAreaSize Size
* `internal` Boolean - `true` für eine interne Anzeige und `false` für eine externe Anzeige

Das `Display` Objekt repräsentiert ein echtes physisches Display welches vom Betriebssystem verwendet wird und daher an den Client angeschlossen ist. Wenn ein imitiertes/emuliertes `Display` existiert, kann das entweder daran liegen, dass das Betriebssystem "headless" läuft (ohne grafische Oberfläche) oder dass das Betriebssystem mit einem virtuellen Display verbunden ist.
