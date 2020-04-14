# ProcessMemoryInfo Object

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Numero Intero - La quantità di memoria condivisa tra i processi, tipicamente consumata dallo stesso codice di Electron in kilobytes.
