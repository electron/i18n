# Görüntüleme Nesnesi

* `id` Number - Ekranla ilgili benzersiz tanımlayıcı.
* `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
* `scaleFactor` Number - Output device's pixel scale factor.
* `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `boyut` [Boyut](size.md)
* `Çalışma Alanı` [Dikdörtgen](rectangle.md)
* `workAreaSize` [Size](size.md)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.