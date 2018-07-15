# CPUUsage 物件

* `percentCPUUsage` Number - 自從上一次呼叫 getCPUUsage 之後到目前為止使用的 CPU 百分比。第一次呼叫會回傳 0。
* `idleWakeupsPerSecond` Number -回傳由上次呼叫getCPUUsage，平均閒置CPU平均每秒被喚醒的次數。第一次呼叫會回傳 0。在Windows，這會永遠回傳0。