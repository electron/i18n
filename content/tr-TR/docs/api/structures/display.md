# Görüntüleme Nesnesi

* `id` Sayı - Ekranla ilgili benzersiz tanımlayıcı.
* `rotation` Sayı - 0, 90, 180, 270 olabilir, ekranın saat yönündeki dönüş derecesini temsil eder.
* `scaleFactor` Sayı - Çıktı cihazının piksel ölçeği çarpanı.
* `touchSupport` Dize - `available`, `unavailable`, `unknown` olabilir.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

`Display` nesnesi sisteme bağlanmış fiziksel bir ekranı temsil eder. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.