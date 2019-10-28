# Objet MemoryInfo

* `workingSetSize` Integer - La quantité de mémoire actuellement épinglé à la RAM physique.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Notez que toutes les statistiques sont en kilo-octets.
