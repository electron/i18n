# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
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
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.