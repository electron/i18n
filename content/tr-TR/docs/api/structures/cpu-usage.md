# CPUUsage Nesnesi

* `percentCPUUsage` Sayı - Son yapılan getCPUUsage isteğinin ardından kullanılan işlemci gücünün yüzdesi. İlk istek 0 sonucu döner.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.