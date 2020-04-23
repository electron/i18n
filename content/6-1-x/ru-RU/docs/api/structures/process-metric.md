# Объект ProcessMetric

* `pid` Integer - id процесса в списке процессов.
* `type` String - Тип процесса. Одно из следующих значений:
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
