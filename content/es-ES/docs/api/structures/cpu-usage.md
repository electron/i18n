# Objeto CPUUsage

* `percentCPUUsage` Number - Porcentaje de CPU utilizado desde la ultima llamada a getCPUUsage. La primera llamada retorna 0.
* `idleWakeupsPerSecond` Número: la cantidad de activaciones del cpu inactivas promedio por segundo desde la última llamada a getCPUUsage. La primera llamada devuelve a 0. Siempre devolverá a 0 en Windows.