# Objeto UsoDaCPU

* Número `percentCPUUsage` - Porcentagem da CPU usada desde a última chamada de getCPUUsage. A primeira chamada retorna 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. Primeira chamada retorna 0. Sempre retornará 0 no Windows.
