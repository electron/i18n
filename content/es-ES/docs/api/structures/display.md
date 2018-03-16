# Objeto Display

* `id` Number - El identificador único asociado con la pantalla.
* `rotation` Number - Puede ser 0, 90, 180 o 270, representa la rotación de la pantalla en grados según las agujas del reloj.
* `scaleFactor` Number - Factor de escalado de píxeles del dispositivo de salida.
* `touchSupport` String - Puede tener los siguientes valores: `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

El objeto de visualización `Display` representa una pantalla física conectada al sistema. Un `Display` falso puede existir en un sistema sin pantalla, o un `Display` puede corresponder a una pantalla virtual remota.