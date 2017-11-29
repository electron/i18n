# Об'єкт Display

* `id` Number - Унікальний ідентифікатор, пов'язаний з дисплеєм.
* `rotation` Number - Може бути 0, 90, 180, 270, повертає екран за годинниковою стрілкою на введену кількість градусів.
* `scaleFactor` Number - Матричний коефіцієнт піксельного масштабування вихілного пристрою.
* `touchSupport` String - Може бути `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Об'єкт `Display` представляє фізичний дисплей, що підключений до системи. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.