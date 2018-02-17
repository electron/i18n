# Obiekt Display

* `id` Number - Unikalny identyfikator powiązany z wyświetlaczem.
* `rotation` Number - może być równa 0, 90, 180, 270, reprezentuje obrót ekranu w stopniach według ruchu wskazówek zegara.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.