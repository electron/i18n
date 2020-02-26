# Obiekt ProcessMemoryInfo

* `residentSet` Integer *Linux* *Windows* - Ilość pamięci obecnie przypięta do fizycznej pamięci RAM w kilobajtach.
* `privateBytes` Integer - Ilość pamięci, która nie jest współdzielona przez inne procesy, takie jak JS heap albo zawartość HTML w kilobajtach.
* `shared` Integer - Ilość pamięci, która jest współdzielona przez procesy, zazwyczaj pamięć zużywana przez kod Electron'a w kilobajtach.