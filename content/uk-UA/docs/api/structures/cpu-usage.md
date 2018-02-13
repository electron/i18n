# Об'єкт CPUUsage

* `percentCPUUsage` Number - Процент використання CPU після останнього виклику getCPUUsage. Перший виклик поверне 0.
* `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.