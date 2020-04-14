# Objeto UsoDaCPU

* `percentCPUUsage` Number - Porcentagem de CPU usado desde a última chamada para getCPUUsage. Primeira chamada retorna 0.
* `idleWakeupsPerSecond` Number - O número médio de ativações inativas da CPU por segundo desde a última ligação para o getCPUUsage. Primeiro, a ligação retorna 0. Vai sempre retornar 0 no Windows.