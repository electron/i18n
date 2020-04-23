# Display Object

* `id-` Number - Unieke identificatie die is gekoppeld aan het object.
* `rotation` Number - Opties zijn 0, 90, 180, 270. Stelt de schermrotatie voor in graden (kloksgewijs).
* `scaleFactor` Number - Geeft de pixel-schalingsfactor van het toestel terug.
* `touchSupport` String - Opties zijn `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

Het `Display` object representeert een fysisch scherm aangesloten op het systeem. Een vals `Display` kan bestaan op een systeem zonder fysisch scherm, of een `Display` kan overeenkomen met een virtueel scherm op afstand.
