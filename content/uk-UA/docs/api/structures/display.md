# Об'єкт Display

* `id` Number - Унікальний ідентифікатор, пов'язаний з дисплеєм.
* `rotation` Number - Може бути 0, 90, 180, 270, повертає екран за годинниковою стрілкою на введену кількість градусів.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Може бути `available`, `unavailable`, `unknown`.
* `bounds` [Прямокутник](rectangle.md)
* `size` [Розмір](size.md)
* `workArea` [Прямокутник](rectangle.md)
* `workAreaSize` [Розмір](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.