# Display Object

* `id` Number - Einzigartige Identifaktionsnummer (ID) die auf das entsprechende Display verweist.
* `rotation` Number - 0, 90, 180 oder 270 , repräsentiert die Display-Rotoerung in Alt-Grad (0-36).
* `scaleFactor` Number - Der Skalierungsfaktor des Ausgabe-Displays.
* `touchSupport` String - `available`, `unavailable` oder `unknown`. Gibt an ob das Display Touch unterstützt.
* `bounds` [Rectangle](rectangle.md) Boundings des Displays
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.