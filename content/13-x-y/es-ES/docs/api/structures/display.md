# Objeto Display

* `id` Number - El identificador único asociado a la pantalla.
* `rotation` Number - Puede ser 0, 90, 180 o 270. Representa la rotación de la pantalla en grados, en el sentido de las agujas del reloj.
* `scaleFactor` Number - Factor de escalado de píxeles del dispositivo de salida.
* `touchSupport` String - Puede tener los siguientes valores: `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - Si el pantalla es o no una pantalla monocromática.
* `accelerometerSupport` String - Puede ser `available`, `unavailable`, `unknown`.
* `colorSpace` String - representa un espacio de color (objetos tridimensionales que contiene todos las combinaciones de color realizables)  para el propósito de conversión de colores
* `colorDepth` Number - El numero de bits por pixel.
* `depthPerComponent` Number - El numero de bits por componente de color.
* `displayFrequency` Number - La tasa de actualización de la pantalla.
* `bounds` [Rectangle](rectangle.md) - los límites de la pantalla en puntos DIP.
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md) - el área de trabajo de la pantalla en puntos DIP.
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` para un pantalla interna y `false` para una pantalla externa

El objeto `Display` representa una pantalla física conectada al sistema. Puede existir un `Display` falso en un sistema sin entorno gráfico, o un `Display` puede corresponder a una pantalla virtual remota.
