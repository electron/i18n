# Objet Display

* `id` Number - Identificateur unique associé à l'affichage.
* `rotation` Number - Peut être 0, 90, 180, 270, représente la rotation de l'écran en degrés dans le sens horaire.
* `scaleFactor` Number - Facteur d'échelle en pixel du périphérique de sortie.
* `touchSupport` String - Peut être `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

L’objet `Display` représente un affichage physique connecté au système. Un faux `Display` existe peut-être sur un système sans en-tête, ou un `Display` peut correspondre à un écran virtuel distant.