# Obiekt CPUUsage

* `percentCPUUsage` Liczba - Zużycie CPU w procentach od ostatniego wywołania funkcji getCPUUsage. Pierwsze wywołanie zwraca 0.
* `idleWakeupsPerSecond` Number - Liczba średnich pobudek CPU w stanie spoczynku na sekundę od ostatniego wywołania funkcji getCPUUsage. Pierwsze wywołanie funkcji zwraca 0. Zawsze będzie zwracać 0 na systemie Windows.