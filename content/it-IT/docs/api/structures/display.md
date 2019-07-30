# Oggetto Display

* `id` Numero - Identificatore univoco associato al display.
* `rotation` Numero - Può essere 0, 90, 180, 270 e rappresenta la rotazione dello schermo in gradi in senso orario.
* `scaleFactor` Numero - Fattore di scala in pixel del dispositivo di output.
* `touchSupport` Stringa - Può essere `available`, `unavailable` o `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

L'oggetto `Display` rappresenta un display fisico connesso al sistema. Un finto `Display` potrebbe esistere in un sistema headless, o un `Display` potrebbe corrispondere ad un display virtuale remoto.