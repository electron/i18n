# Obiekt MemoryInfo

* `workingSetSize` Integer - ilość pamięci obecnie przypiętej do rzeczywistej fizycznej pamięci RAM.
* `peakWorkingSetSize` Integer - Maksymalna ilość pamięci, która kiedykolwiek została przypięta do rzeczywistej fizycznej pamięci RAM.
* `privateBytes` Integer (opcjonalne) _Windows_ - Ilość pamięci, która nie jest współdzielona przez inne procesy, takie jak JS heap albo zawartość HTML.

Proszę zauważyć, że nie wszystkie statystyki są raportowane w jednostce kilobajtów.
