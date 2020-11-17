# Görüntüleme Nesnesi

* `id` Sayı - Ekranla ilgili benzersiz tanımlayıcı.
* `rotation` Sayı - 0, 90, 180, 270 olabilir, ekranın saat yönündeki dönüş derecesini temsil eder.
* `scaleFactor` Sayı - Çıktı cihazının piksel ölçeği çarpanı.
* `touchSupport` Dize - `available`, `unavailable`, `unknown` olabilir.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Dikdörtgen](rectangle.md)
* `size` [Boyut](size.md)
* `workArea` [Dikdörtgen](rectangle.md)
* `workAreaSize` [Boyut](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

`Display` nesnesi sisteme bağlanmış fiziksel bir ekranı temsil eder. Sahte bir `Display` monitörsüz bir sistemde mevcut olabilir, ya da bir `Display` uzak, sanal bir ekrana karşılık gelebilir.
