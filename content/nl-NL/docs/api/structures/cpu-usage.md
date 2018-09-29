# CPUUsage Object

* `percentCPUUsage` Number - Hoeveel procent CPU er gebruikt is sinds de laatste getCPUUsage oproep.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.