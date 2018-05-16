# Oggetto CPUUsage

* `percentCPUUsage` Number- Percentuale di CPU usata dall'ultima chiamata a getCPUUsage. La prima chiamata restituisce 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.