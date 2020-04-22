# Объект CPUUsage

* `percentCPUUsage` Number - процент использования CPU после последнего вызова getCPUUsage. Первый вызов вернет 0.
* `idleWakeupsPerSecond` Number - среднее количество секунд простоя Cpu перед пробуждением с момента последнего вызова getCPUUsage. Первый вызов вернет 0. Всегда возвращает 0 в Windows.
