# Obiekt MemoryInfo

* `pid` Integer - Indetyfikator procesu.
* `workingSetSize` Integer - ilość pamięci obecnie przypiętej do rzeczywistej fizycznej pamięci RAM.
* `peakWorkingSetSize` Integer - Maksymalna ilość pamięci, która kiedykolwiek została przypięta do rzeczywistej fizycznej pamięci RAM. Na macOS jego wartość będzie zawsze równa 0.
* `privateBytes` Integer - Ilość pamięci, która nie jest współdzielona przez inne procsery, takie jak JS heap albo zawartość HTML.
* `sharedBytes` Integer - Ilość pamięci, która jest współdzielona przez procesy, zazwyczaj pamięć zużywana przez kod Electron'a

Proszę zauważyć, że nie wszystkie statystyki są raportowane w jednostce kilobajtów.