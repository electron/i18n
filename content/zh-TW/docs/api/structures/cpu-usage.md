# CPUUsage 物件

* `percentCPUUsage` Number - 自從上一次呼叫 getCPUUsage 之後到目前為止使用的 CPU 百分比。第一次呼叫會回傳 0。
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0.