# CPUUsage 物件

* `percentCPUUsage` Number - 自從上一次呼叫 getCPUUsage 之後到目前為止 CPU 的使用率。 第一次呼叫將轉回 0。
* `idleWakeupsPerSecond` Number - 自從上一次呼叫 getCPUUsage 之後到目前為止閒置的 CPU 每秒平均被喚醒的次數。 第一次呼叫將轉回 0。 在 Windows 上呼叫將始終轉回 0。
