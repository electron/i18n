# Объект CPUUsage

* `percentCPUUsage` Number - процент использования CPU после последнего вызова getCPUUsage. Первый вызов данного метода вернет 0.
* `idleWakeupsPerSecond` Number - среднее количество секунд простоя CPU с момента последнего вызова getCPUUsage. Первый вызов возвращает 0. На Windows всегда возвращает 0.