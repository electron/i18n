# Processamento de Objeto

* `pid` Inteiro - id de processo do processo.
* `tipo` String - Tipo de processo. Um dos seguintes valores: 
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