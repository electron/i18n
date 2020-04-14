# CPUKullanımı Nesnesi

* `percentCPUUsage` Sayı - Son yapılan getCPUUsage isteğinin ardından kullanılan işlemci gücünün yüzdesi. İlk istek 0 sonucu döner.
* `idleWakeupsPerSecond` Sayı - getCPUUsage'ya yapılan son çağrıdan bu yana ortalama boşta çalışan CPU sayısı saniye başına uyanır. İlk çağrı 0 döndürür. Windowsta her zaman 0 döndürür.