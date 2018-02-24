# Объект Display

* `id` Number - уникальный числовой идентификатор дисплея.
* `rotation` Number - число, которое представляет собой угол поворота экрана. Может быть 0, 90, 180, 270.
* `scaleFactor` Number - матричный коэффициент пиксельного масштабирования выходного устройства.
* `touchSupport` String - может быть `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

`Display` - объект представляет физический дисплей, подключенный к системе. Фейковый `Display` может существовать в безголовой системе, или `Display` может соответствовать удаленному виртуальному дисплею.