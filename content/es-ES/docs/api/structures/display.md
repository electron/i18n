# Objeto de la Pantalla

* `id` Número - El Identificador único associado con la pantalla.
* `rotation` Número - Puede ser 0, 90, 180, 270, representa la rotación de la pantalla en grados de reloj.
* `scaleFactor` Número - Factor de escala de píxeles del dispositivo de salida.
* `touchSupport` Cuerda - Puede ser `available`, `unavailable`, `unknown`.
* `bounds` [Rectángulo](rectangle.md)
* `size` [Tamaño](size.md)
* `workArea` [Rectángulo](rectangle.md)
* `workAreaSize` [Tamaño](size.md)

El `Display` objeto de visualización representa una pantalla física conectada al sistema. Un falso `Display` puede existir en un sistema sin conexión, o una `Display` puede corresponder a una pantalla virtual remota.