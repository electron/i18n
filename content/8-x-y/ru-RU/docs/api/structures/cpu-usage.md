# Объект CPUUsage

* `percentCPUUsage` Number - процент использования CPU после последнего вызова getCPUUsage. Первый вызов вернет 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. Первый вызов вернет 0. Всегда возвращает 0 в Windows.
