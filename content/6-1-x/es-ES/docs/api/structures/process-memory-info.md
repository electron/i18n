# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - La cantidad de memoria no compartida por otros procesos, tales como JS heap o contenido HTML en Kilobytes.
* `shared` Integer - La cantidad de memoria compartida entre procesos, típicamente memoria consumida por el código Electron en sí mismo en Kilobytes.
