# Oggetto CPUUsage

* `percentCPUUsage` Number- Percentuale di CPU usata dall'ultima chiamata a getCPUUsage. La prima chiamata restituisce 0.
* `idleWakeupsPerSecond` Number - Il numero medio di risvegli della cpu dallo stato di inattività al secondo dall'ultima chiamata a getCPUUsage. La prima chiamata restituisce 0. Restituirà sempre 0 su Windows.