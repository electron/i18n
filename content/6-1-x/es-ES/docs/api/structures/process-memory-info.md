# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ y _Windows_ - La cantidad de memoria actualmente fijado a la RAM física real en Kilobytes.
* `private` Integer - La cantidad de memoria no compartida por otros procesos, tales como JS heap o contenido HTML en Kilobytes.
* `shared` Integer - La cantidad de memoria compartida entre procesos, típicamente memoria consumida por el código Electron en sí mismo en Kilobytes.
