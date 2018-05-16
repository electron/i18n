# Объект CPUUsage

* `percentCPUUsage` Number - процент использования CPU после последнего вызова getCPUUsage. Первый вызов данного метода вернет 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.