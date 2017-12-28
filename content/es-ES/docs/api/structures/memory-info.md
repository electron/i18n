# Objeto MemoryInfo

* `pid` Integer - Process id of the process.
* `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
* `privateBytes` Entero - la cantidad de memoria no compartida por otros procesos, como JS heap o contenido HTML.
* `sharedBytes` Entero - La cantidad de memoria que ha sido compartida entre procesos, típicamente memoria consumida por el código propio de Electron

Toma en cuenta que todas las estadísticas son reportadas en Kilobytes.