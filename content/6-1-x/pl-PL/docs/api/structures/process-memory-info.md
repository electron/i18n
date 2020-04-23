# Obiekt ProcessMemoryInfo

* `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - Ilość pamięci, która jest współdzielona przez procesy, zazwyczaj pamięć zużywana przez kod Electron'a w kilobajtach.
