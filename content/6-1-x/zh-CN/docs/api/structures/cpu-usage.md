# CPUUsage 对象

* ` percentCPUUsage ` Number - 自上次调用 getCPUUsage 以来使用的 CPU 百分比。 第一次调用返回 0。
* ` idleWakeupsPerSecond `Number - 自上次调用 getCPUUsage 后每秒平均空闲 CPU 唤醒数。 第一次调用返回 0。 在 Windows 上始终返回 0。
