# Obiekt CPUUsage

* `percentCPUUsage` Liczba - Zużycie CPU w procentach od ostatniego wywołania funkcji getCPUUsage. Pierwsze wywołanie zwraca 0.
* `idleWakeupsPerSecond` Number - Średnia liczba wybudzeń procesora ze stanu bezczynności na sekundę od ostatniego wywołania funkcji getCPUUsage. Pierwsze wywołanie zwraca 0. Na urządzeniach z systemem Windows funkcja zawsze zwraca wartość 0.