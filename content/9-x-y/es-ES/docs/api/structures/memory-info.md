# Objeto MemoryInfo (Información de memoria)

* `workingSetSize` entero - La cantidad de memoria actualmente cubierta por la RAM física real.
* `peakWorkingSetSize` Entero - La cantidad máxima de memoria que ha sido cubierta por la RAM física real.
* `privateBytes` Entero (opcional) _Windows_ - La cantidad de memoria no compartida por otros procesos, como el heap de JS o contenido HTML.

Toma en cuenta que todas las estadísticas son reportadas en Kilobytes.
