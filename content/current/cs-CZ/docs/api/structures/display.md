# Objekt Display

* `id` Číslo – unikátní identifikátor spojený s displayem.
* `rotation` Číslo – možné hodnoty jsou 0, 90, 180, 270 a reprezentují stupňovou rotaci obrazovky ve směru ručiček.
* `scaleFactor` Číslo – pixelové měřítko výstupního zařízení.
* `touchSupport` Text – možné hodnoty jsou `available`, `unavailable` a `unknown`.
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

Objekt `Display` reprezentuje fyzický display spojený se systémem. `Display` může být emulovaný na headless systémech, anebo může `Display` odpovídat vzdálenému virtuálnímu display.
