# ProcessMetric Object

* `pid` Integer - Уникален идентификатор на съответния процес.
* `type` String - Process type (Browser or Tab or GPU etc).
* `memory` [MemoryInfo](memory-info.md) - Memory information for the process.
* `cpu` [CPUUsage](cpu-usage.md) - CPU usage of the process.