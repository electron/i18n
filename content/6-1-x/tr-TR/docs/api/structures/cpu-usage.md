# CPUKullanımı Nesnesi

* `percentCPUUsage` Number - getCPUUsage son çağırmadaki CPU yani işlemcinin yüzdesi. İlk çağrı 0 olarak döner.
* `idleWakeupsPerSecond` Number - getCPUUsage son çağırmadaki ortalama saniye başına boşta durma ve uyanma sayısı (js: number). İlk çağrı 0 olarak döner. Windows'ta her zaman 0 olarak döner.
