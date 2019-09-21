# ProcessMemoryInfo Object

* `residentSet` Numero Intero - *Linux* and *Windows* - La quantità di memoria bloccata nella RAM fisica in kilobytes.
* `private` Numero Intero - La quantità di memoria non condivisa da altri processi (es. Heap JS o contenuto HTML in kilobytes).
* `shared` Numero Intero - La quantità di memoria condivisa tra i processi, tipicamente consumata dallo stesso codice di Electron in kilobytes.