# Obiekt ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `privateBytes` Integer - Ilość pamięci, która nie jest współdzielona przez inne procesy, takie jak JS heap albo zawartość HTML w kilobajtach.
* `shared` Integer - Ilość pamięci, która jest współdzielona przez procesy, zazwyczaj pamięć zużywana przez kod Electron'a w kilobajtach.
