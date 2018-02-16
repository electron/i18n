# Obiekt Display

* `id` Number - Unikalny indetyfikator powiązany z wyświetlaczem.
* `rotation` Number - może być 0, 90, 180, 270, reprezentuje obrót w stopniach według ruchu wskazówek zegaru ekranu.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - może przyjmować wartości `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.