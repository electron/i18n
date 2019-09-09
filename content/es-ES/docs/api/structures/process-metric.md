# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
* `type` String - Tipo de proceso. Uno de los siguientes valores: 
  * `Navegador`
  * `Tab`
  * `Utilidad`
  * `Zygote`
  * `Ayuda de Sandbox`
  * `GPU`
  * `Plugin Pepper`
  * `Broker de Plugin de Pepper`
  * `Desconocido`
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.