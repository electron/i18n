# Objet ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - La quantité de mémoire partagée entre processus, généralement la mémoire consommée par le code d'Electron lui-même en Kilobytes.
