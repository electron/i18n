# CPUUsage Object

* `percentCPUUsage` Number - Prozentzahl der CPU-Leistung, die seit dem letzten Aufruf von getCPUUsage genutzt wurde. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - Die Anzahl an verfügbaren CPU Aufweckungen pro Sekunde seite dem letzten Aufruf von getCPUUsage. Erster Aufruf gibt 0 zurück. Auf Windows wird immer 0 zurückgegeben.