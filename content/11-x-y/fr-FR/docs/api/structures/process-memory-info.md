# Objet ProcessMemoryInfo

* `residentSet` Integer _Linux_ et _Windows_ - La quantité de mémoire actuellement épinglée à  RAM physique actuelle en Kilobytes.
* `private` Integer - La quantité de mémoire non partagée par d'autres processus, tel que le tas JS ou le contenu HTML en Kilobytes.
* `shared` Integer - La quantité de mémoire partagée entre processus, généralement la mémoire consommée par le code d'Electron lui-même en Kilobytes.
