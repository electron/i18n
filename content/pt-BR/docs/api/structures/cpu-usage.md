# CPUUsage Object

* `percentCPUUsage` Number - Porcentagem de CPU usado desde a última chamada para getCPUUsage. Primeira chamada retorna 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.