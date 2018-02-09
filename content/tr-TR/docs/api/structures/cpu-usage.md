# CPUUsage Nesnesi

* `percentCPUUsage` Sayı - Son yapılan getCPUUsage isteğinin ardından kullanılan işlemci gücünün yüzdesi. İlk istek 0 sonucu döner.
* `idleWakeupsPerSecond` Sayı - Son getCPUUsage isteğinden sonra, işlemci yükünün olmadığı durumlardaki ortalama uyanma sayısı. İlk istek 0 sonucu döner. Windows'ta her zaman 0 sonucu döner.