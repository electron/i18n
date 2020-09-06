# CPUUsage 物件

* `percentCPUUsage` Number - Percentage of CPU used since the last call to getCPUUsage. 第一次呼叫返回 0。
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. 第一次呼叫返回 0。 Will always return 0 on Windows.
