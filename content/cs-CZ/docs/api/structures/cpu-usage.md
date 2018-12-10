# CPUUsage Object

* `percentCPUUsage` Číslo - procento využití CPU od posledního volání getCPUUsage. První volání vrací 0.
* `idleWakeupsPerSecond` Číslo - průměrný počet probuzení CPU ze spánku za sekundu od posledního volání getCPUUsage. První volání vrací 0. Ve windows je vždy vrácena 0.