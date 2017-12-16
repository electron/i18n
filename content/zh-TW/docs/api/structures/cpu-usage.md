# CPUUsage 物件

* `percentCPUUsage` Number - 自從上一次呼叫 getCPUUsage 之後到目前為止使用的 CPU 百分比。第一次呼叫會回傳 0。
* `idleWakeupsPerSecond` Number - 自從上次呼叫 getCPUUsage 之後到目前為止，空閒 CPU 每秒平均被喚醒的次數。第一次呼叫會回傳 0。