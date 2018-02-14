# CPUUsage-Objekt

* `percentCPUUsage` Number - Prozentzahl der CPU-Leistung, die seit dem letzten Aufruf von getCPUUsage genutzt wurde. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - Die durchschnittliche Anzahl pro Sekunde, die angibt, wie oft die CPU seit dem letzten Aufruf von getCPUUsage aus der Inaktivität aufgewacht ist. Der erste Aufruf gibt 0 zurück. Auf Windows wird immer 0 zurückgegeben.