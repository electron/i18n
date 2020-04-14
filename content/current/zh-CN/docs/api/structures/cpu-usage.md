# CPUUsage 对象

* ` percentCPUUsage ` Number - 自上次调用 getCPUUsage 以来使用的 CPU 百分比。第一次调用返回0。
* `idleWakeupsPerSecond` Number - 自上次调用 getCPUUsage 以来每秒唤醒空闲 CPU 的平均次数。第一次调用返回0。在Windows环境下会永远返回0。