# Объект CPUUsage

* `percentCPUUsage` Number - Процент использования CPU после последнего вызова getCPUUsage. Первый вызов данного метода вернет 0.
* `idleWakeupsPerSecond` Number - среднее количество секунд простоя CPU перед пробуждением с момента последнего вызова getCPUUsage. Первый вызов возвращает 0.