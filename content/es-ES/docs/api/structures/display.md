# Objeto Display

* `id` Number - El identificador único asociado a la pantalla.
* `rotation` Number - Puede ser 0, 90, 180 o 270. Representa la rotación de la pantalla en grados, en el sentido de las agujas del reloj.
* `scaleFactor` Number - Factor de escalado de píxeles del dispositivo de salida.
* `touchSupport` String - Puede tener los siguientes valores: `available`, `unavailable`, `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

El objeto `Display` representa una pantalla física conectada al sistema. Puede existir un `Display` falso en un sistema sin entorno gráfico, o un `Display` puede corresponder a una pantalla virtual remota.