# Объект Display

* `id` Number - уникальный числовой идентификатор дисплея.
* `rotation` Number - число, которое представляет собой угол поворота экрана. Может быть 0, 90, 180, 270.
* `scaleFactor` Number - матричный коэффициент пиксельного масштабирования выходного устройства.
* `touchSupport` String - может быть `available`, `unavailable`, `unknown`.
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

`Display` - объект представляет физический дисплей, подключенный к системе. Фейковый `Display` может существовать в безголовой системе, или `Display` может соответствовать удаленному виртуальному дисплею.