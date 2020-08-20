# Mga bagay sa Display

* `id` Number - Natatanging tagatukoy na may kaugnayan sa display.
* `rotation` Number - Maaring 0, 90, 180, 270, na kumakatawan sa pag-ikot ng screen nang clock-wise degrees.
* `scaleFactor` Number - dahilan ng sukat ng pixel ng output device.
* `touchSupport` String - Ay maaairng `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds`[Rectangle](rectangle.md)
* `size`[Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

Ang `Display` object ay kumakatawan sa isang pisikal na display na konektado sa sistema. Isang pekeng `Display` ang maaring umiral sa isang headless na sistema, o isang `Display` na maaring tumugma sa isang malayo, ngunit tunay na display.
