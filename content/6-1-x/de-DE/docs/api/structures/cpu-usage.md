# CPUUsage Object

* `percentCPUUsage` Number - Prozentsatz der genutzten CPU-Leistung, seit dem letzten Aufruf von getCPUUsage. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - Die Anzahl des durchschnittlichen Aufwachens aus dem Leerlauf pro Sekunde seit dem letzten Aufruf von getCPUUsage. Der erste Aufruf gibt 0 zurück. Gibt auf Windows immer 0 zurück.
