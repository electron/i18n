# Объект ProcessMetric

* `pid` Integer - id процесса в списке процессов.
* `тип` String - тип процесса. Один из следующих значений: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - использование CPU процессом.
* `creationTime` Number - Время создания этого процесса. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - информация о памяти для процесса.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`