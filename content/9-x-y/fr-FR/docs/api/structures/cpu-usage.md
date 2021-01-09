# Objet CPUUsage

* `percentCPUUsage` Number - Pourcentage d'utilisation du CPU depuis le dernier appel de getCPUUsage. Le premier appel renvoie 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. Le premier appel renvoie 0. Renverra toujours 0 sous Windows.
