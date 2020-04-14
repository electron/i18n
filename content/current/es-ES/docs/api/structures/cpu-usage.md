# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU utilizado desde la ultima llamada a getCPUUsage. La primera llamada devuelve 0.
* `idleWakeupsPerSecond` Número - El número promedio de reactivaciones de CPU inactivas por segundo desde la última llamada a getCPUUsage. La primera llamada devuelve 0. Siempre devolverá 0 en Windows.