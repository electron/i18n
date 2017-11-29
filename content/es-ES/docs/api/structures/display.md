# Objeto Display

* `id` Number - El identificador único asociado con la pantalla.
* `rotation` Number - Puede ser 0, 90, 180 o 270. Representa la rotación de la pantalla en grados, en el sentido de las agujas del reloj.
* `scaleFactor` Number - Factor de escalado de píxeles del dispositivo de salida.
* `touchSupport` String - Puede tener los siguientes valores: `available`, `unavailable`, `unknown`.
* `bounds` [Rectángulo](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

El objeto de visualización `Display` representa una pantalla física conectada al sistema. Un falso `Display` puede existir en un sistema sin conexión, o un `Display` puede corresponder a una pantalla virtual remota.