# Об'єкт CPUUsage

* `percentCPUUsage` Number - Процент використання CPU після останнього виклику getCPUUsage. Перший виклик поверне 0.
* `idleWakeupsPerSecond` Number - середня кількість секунд простою CPU перед пробудженням з моменту останнього виклику getCPUUsage. Перший виклик поверне 0. Завжди повертає 0 на Windows.