# Processamento de Objeto

* `pid` Inteiro - id de processo do processo.
* `tipo` String - Tipo de processo. Um dos seguintes valores: 
  * `Browser`
  * `Tab`
  * `Utilidade`
  * `Zygote`
  * `Ajuda ao Sandbox`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Desconhecido`
* `CPU` [CPUUsage](cpu-usage.md) - uso da CPU.