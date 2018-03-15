# CPUUsage Object

* `percentCPUUsage` Number - Porcentagem de CPU usado desde a última chamada para getCPUUsage. Primeira chamada retorna 0.
* `idleWakeupsPerSecond` Number - O número de ativações de Cpu padrão ocioso por segundo desde a última chamada para getCPUUsage. A primeira chamada retorna 0. Sempre retornará 0 no Windows.