# Objeto MemoryInfo (Información de memoria)

* `pid` Entero - (ProcessId) indicador del proceso.
* `workingSetSize` entero - La cantidad de memoria actualmente cubierta por la RAM física real.
* `peakWorkingSetSize` Entero - La cantidad máxima de memoria que ha sido cubierta por la RAM física real. En macOS este valor siempre va a ser 0.
* `privateBytes` Entero - la cantidad de memoria no compartida por otros procesos, como JS heap o contenido HTML.
* `sharedBytes` Entero - La cantidad de memoria que ha sido compartida entre procesos, típicamente memoria consumida por el código propio de Electron

Toma en cuenta que todas las estadísticas son reportadas en Kilobytes.