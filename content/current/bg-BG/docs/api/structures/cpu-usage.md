# Обект CPUUsage

* `percentCPUUsage` Number - Процент на натовареност на процесора от последното извикване на функцията getCPUUsage. Първото извикване връща стойност 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.