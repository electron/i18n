# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU utilizado desde la ultima llamada a getCPUUsage.La primera llamada devuelve 0. First call returns 0.
* `idleWakeupsPerSecond` Numero - El numero promedio de CPU inactiva por segundo desde la ultima llamada a getCPUUsage. First call returns 0. Siempre retornara 0 en Windows.
