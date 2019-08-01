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