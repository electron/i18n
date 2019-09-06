# Об'єкта ProcessMetric

* `pid` Integer - Ідентифікатор процесу.
* `type` String - Тип процесу. Одне з наступних значень: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - Використання ЦП процесом.