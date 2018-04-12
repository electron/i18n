# Объект ProcessMetric

* `pid` Integer - id процесса в списке процессов.
* `type` String - тип процесса (Browser или Tab или GPU и т.д.).
* `memory` [MemoryInfo](memory-info.md) - информация о памяти для процесса.
* `cpu` [CPUUsage](cpu-usage.md) - использование CPU процессом.