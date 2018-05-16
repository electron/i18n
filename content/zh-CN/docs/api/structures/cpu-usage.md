# CPUUsage 对象

* ` percentCPUUsage `自上次调用 getCPUUsage 以来使用的 CPU 百分比。第一次调用返回0。
* ` idleWakeupsPerSecond `数字-自上次调用 getCPUUsage 以来, 每秒平均空闲 cpu wakeups 数。第一次调用返回0。将总是在窗口返回0。