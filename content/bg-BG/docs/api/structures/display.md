# Обект Display

* `id` Number - Уникален идентификатор за съответния дисплей.
* `rotation` Number - Може да бъде 0, 90, 180, 270, показва ъгъла на завъртане на екрана в градуси по посока на часовниковата стрелка.
* `scaleFactor` Number - Показва каква скала на пикселите използва съответното устройство.
* `touchSupport` String - Може да бъде `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

Обектът `Display` представя физическия дисплей, свързан към системата. Фалшив `Display` може да съществува без глава система, или `Display` може да съответства на отдалечен, виртуален дисплей.