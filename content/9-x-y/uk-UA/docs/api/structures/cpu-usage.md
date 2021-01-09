# Об'єкт CPUUsage

* `percentCPUUsage` Number - Процент використання CPU після останнього виклику getCPUUsage. Перший виклик повертає 0.
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. Перший виклик повертає 0. Завжди повертатиме 0 на Windows.
