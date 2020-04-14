# Обект Display

* `id` Number - Unique identifier associated with the display.
* `rotation` Number - Може да бъде 0, 90, 180, 270, показва ъгъла на завъртане на екрана в градуси по посока на часовниковата стрелка.
* `scaleFactor` Number - Показва каква скала на пикселите използва съответното устройство.
* `touchSupport` String - Може да бъде `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Дали дисплея е монохромен или не е монохромен.
* `accelerometerSupport` String - Може да бъде `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` за вграден дисплей и `false` за външен дисплей

Обектът `Display` представя физическия дисплей, свързан към системата. Фалшив `Display` може да съществува без глава система, или `Display` може да съответства на отдалечен, виртуален дисплей.
