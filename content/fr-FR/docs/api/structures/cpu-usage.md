# Objet CPUUsage

* `percentCPUUsage` Number - Pourcentage de CPU utilisé depuis le dernier appel à getCPUUsage. Le premier appel renvoie 0.
* `idleWakeupsPerSecond` Number - Le nombre moyen par seconde de sortie de veille du CPU depuis le dernier appel à getCPUUsage. Le premier appel renvoie 0. Retourne toujours 0 sur Windows.