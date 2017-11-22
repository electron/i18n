# ProcessMetric Объект

* `pid` Integer - id процесса в списке процессов.
* `type` String - Тип процесса (Browser или Tab или GPU и т. д.).
* `memory` [MemoryInfo](memory-info.md) - Информация о памяти для процесса.
* `cpu` [CPUUsage](cpu-usage.md) - Использование CPU процессом.