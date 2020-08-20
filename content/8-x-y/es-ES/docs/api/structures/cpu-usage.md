# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU usado desde la última llamada a getCPUUsage. La primera llamada devuelve 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. La primera llamada devuelve 0. Siempre devolverá 0 en Windows.
