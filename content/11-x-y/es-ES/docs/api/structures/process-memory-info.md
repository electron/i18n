# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - La cantidad de memoria actualmente anclada a la RAM física real en kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - La cantidad de memoria compartida entre procesos, típicamente memoria consumida por el código Electron en sí mismo en Kilobytes.
