# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - La cantidad de memoria actualmente anclada a la RAM física real en kilobytes.
* `private` Integer - La cantidad de memoria no compartida por otros procesos, como el montículo JS o el contenido HTML en Kilobytes.
* `shared` Integer - La cantidad de memoria compartida entre procesos, típicamente memoria consumida por el código Electron en sí mismo en Kilobytes.
