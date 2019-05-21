# CPUUsage Object

* `percentCPUUsage` Number - Hoeveel procent CPU er gebruikt is sinds de laatste getCPUUsage oproep.
* `idleWakeupsPerSecond` Aantal - Het aantal gemiddelde niet-actieve cpu-wekkingen per seconde sinds de laatste aanroep voor getCPUUUsage. Eerste aanroep geeft 0 terug. Zal altijd 0 teruggeven op Windows.