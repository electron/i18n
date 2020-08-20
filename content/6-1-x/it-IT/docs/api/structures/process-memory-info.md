# ProcessMemoryInfo Object

* `residentSet` Intero _Linux_ e _Windowss_ - La quantità di memoria attualmente segnata alla RAM fisica attuale in Kilobyte.
* `private` Numero Intero - La quantità di memoria non condivisa da altri processi (es. Heap JS o contenuto HTML in kilobytes).
* `shared` Numero Intero - La quantità di memoria condivisa tra i processi, tipicamente consumata dallo stesso codice di Electron in kilobytes.
