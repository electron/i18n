# CPUUsage Object

* `percentCPUUsage` Number - Prozentsatz der genutzten CPU-Leistung, seit dem letzten Aufruf von getCPUUsage. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. Der erste Aufruf gibt 0 zurück. Gibt auf Windows immer 0 zurück.
