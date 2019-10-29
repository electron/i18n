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
* `creationTime` Number - Время создания этого процесса. Время представлено как количество миллисекунд с эпохи. Поскольку `pid` можно повторно использовать после смерти процесса, полезно использовать `pid` и `creationTime` для уникальной идентификации процесса.
* `memory` [MemoryInfo](memory-info.md) - информация о памяти для процесса.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Является ли процесс песочницей на уровне ОС.
* `integrityLevel` String (опционально) *Windows* - Одно из следующих значений: 
  * `ненадёжный`
  * `low`
  * `medium`
  * `high`
  * `unknown`