# Об'єкт CPUUsage

* `percentCPUUsage` Number - Процент використання CPU після останнього виклику getCPUUsage. Перший виклик повертає 0.
* `idleWakeupsPerSecond` Number - Середня кількість секунд бездіяльності CPU з моменту останньго виклику getCPUUsage. Перший виклик повертає 0. Завжди повертатиме 0 на Windows.
