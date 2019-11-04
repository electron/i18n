# Oggetto CPUUsage

* `percentCPUUsage` Number- Percentuale di CPU usata dall'ultima chiamata a getCPUUsage. La prima chiamata restituisce 0.
* `idleWakeupsPerSecond` Numero - Il numero di wakeup CPU medi per secondo dall'ultima chiamata a getCPUUsage. La prima chiamata restituisce 0. Restituirà sempre 0 su Windows.