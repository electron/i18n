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
* `creationTime` Number - Creation time for this process. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - Memory information for the process.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`