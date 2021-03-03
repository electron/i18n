# Objeto UsoDaCPU

* Número `percentCPUUsage` - Porcentagem da CPU usada desde a última chamada de getCPUUsage. A primeira chamada retorna 0.
* `idleWakeupsPerSecond` Number - O número médio de ativações por segundo de CPU ociosa desde a última chamada para getCPUUsage. Primeira chamada retorna 0. Sempre retornará 0 no Windows.
