# Processamento de Objeto

* `pid` Inteiro - id de processo do processo.
* `tipo` String - Process type. One of the following values: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `CPU` [CPUUsage](cpu-usage.md) - uso da CPU do processo.