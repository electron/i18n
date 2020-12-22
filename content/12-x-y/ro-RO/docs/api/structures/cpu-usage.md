# CPUUsage Object

* `percentCPUUsage` Number - Procentul de CPU utilizat de la ultimul apel către getCPUUsage. Primul apel returnează 0.
* `idleWakeupsPerSecond` Number - Numărul mediu al procesorului inactiv pe secundă de la ultimul apel pentru getCPUsage. Primul apel returnează 0. Va returna mereu 0 pe Windows.
