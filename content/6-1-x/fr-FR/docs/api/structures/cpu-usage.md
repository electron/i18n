# Objet CPUUsage

* `percentCPUUsage` Number - Pourcentage d'utilisation du CPU depuis le dernier appel de getCPUUsage. Le premier appel renvoie 0.
* `idleWakeupsPerSecond` Number - Nombre de réveils moyen du processeur par seconde depuis le dernier appel de getCPUUsage. Le premier appel renvoie 0. Renverra toujours 0 sous Windows.
