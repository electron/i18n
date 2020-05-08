# Objeto ProcessMetric

* `pid` Entero - (ProcessId) indicador del proceso.
* `type` String - Tipo de proceso. Uno de los siguiente valores:
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
