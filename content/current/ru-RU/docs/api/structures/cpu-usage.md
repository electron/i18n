# Объект CPUUsage

* `percentCPUUsage` Number - Процент использования CPU после последнего вызова getCPUUsage. Первый вызов вернёт 0.
* `idleWakeupsPerSecond` Number - Cреднее количество секунд простоя CPU, перед пробуждением с момента последнего вызова getCPUUsage. Первый вызов вернёт 0. Всегда возвращает 0 в Windows.
