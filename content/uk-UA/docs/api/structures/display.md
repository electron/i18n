# Об'єкт Display

* `id` Number - Унікальний ідентифікатор, пов'язаний з дисплеєм.
* `rotation` Number - Може бути 0, 90, 180, 270, повертає екран за годинниковою стрілкою на введену кількість градусів.
* `scaleFactor` Number - Матричний коефіцієнт піксельного масштабування вихілного пристрою.
* `touchSupport` String - Може бути `available`, `unavailable`, `unknown`.
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

Об'єкт `Display` представляє фізичний дисплей, що підключений до системи. Фейковий `Display` може існувати в систесі без графічного інтерфейсу або `Display` може відповідати віддаленому, віртуальному дисплею.