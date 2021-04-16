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
* `serviceName` String (optional) - The non-localized name of the process.
* `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `CPU` [CPUUsage](cpu-usage.md) - uso da CPU.
* `creationTime` Number - Creation time for this process. O tempo é representado como número de milissegundos desde a época. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memória` [MemoryInfo](memory-info.md) - informações de memória para o processo.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `baixo`
  * `medium`
  * `alto`
  * `desconhecido`
