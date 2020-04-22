# Об'єкт Display

* `id` Number - Унікальний ідентифікатор, пов'язаний з дисплеєм.
* `rotation` Number - Може бути 0, 90, 180, 270, повертає екран за годинниковою стрілкою на введену кількість градусів.
* `scaleFactor` Number - Матричний коефіцієнт піксельного масштабування вихілного пристрою.
* `touchSupport` String - Може бути `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Показує чи дисплей монохромний.
* `accelerometerSupport` String - Може бути `available`, `unavailable`, `unknown`.
* `colorSpace` String - показує простір кольору (тривимірний об'єкт, який містить всі можливі комбінації кольорів) для перетворень кольору
* `colorDepth` Number - Число бітів на піксель.
* `depthPerComponent` Number - Число бітів на компонент кольору.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` для внутрішнього дисплею та `false` для зовнішьного

Об'єкт `Display` представляє фізичний дисплей, що підключений до системи. Фейковий `Display` може існувати в систесі без графічного інтерфейсу або `Display` може відповідати віддаленому, віртуальному дисплею.
