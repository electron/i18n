# Objet CPUUsage

* `percentCPUUsage` Number - Pourcentage de CPU utilisé depuis le dernier appel à getCPUUsage. Le premier appel renvoie 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.