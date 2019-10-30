# Objet CPUUsage

* `percentCPUUsage` Number - Pourcentage de CPU utilisé depuis le dernier appel à getCPUUsage. Le premier appel renvoie 0.
* `idleWakeupsPerSecond` Number - Le nombre moyen de réveils de CPU inactifs par seconde depuis le dernier appel à getCPUUsage. Le premier appel renvoie 0, il renvoie toujours 0 sur Windows.