# Obiekt MemoryInfo

* `workingSetSize` Integer - ilość pamięci obecnie przypiętej do rzeczywistej fizycznej pamięci RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Proszę zauważyć, że nie wszystkie statystyki są raportowane w jednostce kilobajtów.
