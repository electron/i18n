# Objeto Display

* `id` Number - El identificador único asociado a la pantalla.
* `rotation` Number - Puede ser 0, 90, 180 o 270. Representa la rotación de la pantalla en grados, en el sentido de las agujas del reloj.
* `scaleFactor` Number - Factor de escalado de píxeles del dispositivo de salida.
* `touchSupport` String - Puede tener los siguientes valores: `available`, `unavailable`, `unknown`.
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

El objeto `Display` representa una pantalla física conectada al sistema. Puede existir un `Display` falso en un sistema sin entorno gráfico, o un `Display` puede corresponder a una pantalla virtual remota.