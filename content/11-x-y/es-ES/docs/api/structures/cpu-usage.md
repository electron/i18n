# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU utilizado desde la última llamada a getCPUUsage. La primera llamada devuelve 0.
* `idleWakeupsPerSecond` Numero - El numero promedio de CPU inactiva por segundo desde la ultima llamada a getCPUUsage. La primera llamada devuelve 0. Siempre retornara 0 en Windows.
