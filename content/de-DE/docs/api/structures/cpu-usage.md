# CPUUsage Object

* `percentCPUUsage` Number - Prozentzahl der CPU-Leistung, die seit dem letzten Aufruf von getCPUUsage genutzt wurde. Der erste Aufruf gibt 0 zurück.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.