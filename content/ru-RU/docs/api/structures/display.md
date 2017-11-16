# Display Object

* `id` Number - уникальный числовой идентификатор дисплея.
* `rotation` Number - число, которое представляет собой угол поворота экрана. Может быть 0, 90, 180, 270.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

`Display` представляет собой реальный подключенный дисплей. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.