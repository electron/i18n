# CPUUsage Object

* `percentCPUUsage` Number - Prozentsatz der genutzten CPU-Leistung, seit dem letzten Aufruf von getCPUUsage. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - Die Anzahl von isolierten CPU-Aufwachroutinen pro Sekunde seit dem letzten Aufruf von getCPUUsage. Der erste Aufruf gibt 0 zurück. Gibt auf Windows immer 0 zurück.
