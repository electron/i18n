# Обект ProcessMetric

* `pid` Integer - Уникален идентификатор на съответния процес.
* `type` String - Тип процес (браузър или таб или GPU и др.).
* `memory` [MemoryInfo](memory-info.md) - Информация за процеса.
* `cpu` [CPUUsage](cpu-usage.md) - Употреба на процесора.