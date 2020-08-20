# Objeto UsoDaCPU

* Número `percentCPUUsage` - Porcentagem da CPU usada desde a última chamada de getCPUUsage. A primeira chamada retorna 0.
* Número `idleWakeupsPerSecond` - O número médio de ativações da CPU em estado ocioso por segundo desde a última chamada de getCPUUsage. Primeira chamada retorna 0. Sempre retornará 0 no Windows.
