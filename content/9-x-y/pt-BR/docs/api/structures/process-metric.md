# Processamento de Objeto

* `pid` Inteiro - id de processo do processo.
* `type` String - Process type. One of the following values:
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
* `memória` [MemoryInfo](memory-info.md) - informações de memória para o processo.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `baixo`
  * `medium`
  * `alto`
  * `desconhecido`
