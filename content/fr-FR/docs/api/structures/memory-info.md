# Objet MemoryInfo

* `pid` Integer - Id du processus.
* `workingSetSize` Integer - La quantité de mémoire actuellement épinglé à la RAM physique.
* `peakWorkingSetSize` Integer - La quantité maximale de mémoire n'aillant jamais été épinglé à la RAM physique. Sur macOS, sa valeur sera toujours 0.
* `privateBytes` Integer - La quantité de mémoire non partagée par d'autres processus, tel que des empilements de JS ou du contenu HTML.
* `sharedBytes` Integer - La quantité de mémoire partagée entre processus, généralement la mémoire consommée par Electron lui-même

Notez que toutes les statistiques sont en kilo-octets.