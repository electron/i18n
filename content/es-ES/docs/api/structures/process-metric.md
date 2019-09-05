# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
* `type` String - Process type. One of the following values: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Ayuda de Sandbox`
  * `GPU`
  * `Plugin Pepper`
  * `Pepper Plugin Broker`
  * `Desconocido`
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.