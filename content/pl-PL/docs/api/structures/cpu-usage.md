# Obiekt CPUUsage

* `percentCPUUsage` Liczba - Zużycie CPU w procentach od ostatniego wywołania funkcji getCPUUsage. Pierwsze wywołanie zwraca 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.