# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU usado desde la última llamada a getCPUUsage. La primera llamada devuelve 0.
* `idleWakeupsPerSecond` Number - El número promedio de activaciones de cpu ocioso desde la última llamada a getCPUUsage. La primera llamada devuelve 0. Siempre devolverá 0 en Windows.
