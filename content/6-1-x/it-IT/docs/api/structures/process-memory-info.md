# ProcessMemoryInfo Object

* `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Numero Intero - La quantità di memoria non condivisa da altri processi (es. Heap JS o contenuto HTML in kilobytes).
* `shared` Numero Intero - La quantità di memoria condivisa tra i processi, tipicamente consumata dallo stesso codice di Electron in kilobytes.
