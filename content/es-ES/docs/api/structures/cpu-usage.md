# Objeto CPUUsage

* `percentCPUUsage` Número - Porcentaje de CPU utilizado desde la ultima llamada a getCPUUsage. La primera llamada retorna 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.