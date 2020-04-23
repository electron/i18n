# Объект ProcessMetric

* `pid` Integer - id процесса в списке процессов.
* `type` String - Process type. One of the following values:
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
* `creationTime` Number - Время создания этого процесса. Время представлено как количество миллисекунд с начала эпохи. Поскольку `pid` можно повторно использовать после смерти процесса, полезно использовать `pid` и `creationTime` для уникальной идентификации процесса.
* `memory` [MemoryInfo](memory-info.md) - информация о памяти для процесса.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `ненадёжный`
  * `низкий`
  * `средний`
  * `высокий`
  * `unknown`
