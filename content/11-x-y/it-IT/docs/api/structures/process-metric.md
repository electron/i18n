# Oggetto ProcessMetric

* `pid` Numero Intero - Processi id del processo.
* `tipo` Stringa - Tipo di processo. Uno dei valori seguenti:
  * `Browser`
  * `Tab`
  * `Utilità`
  * `Zygote`
  * `Aiutante sandbox`
  * `GPU`
  * `Plugin Pepper`
  * `Broker del Plugin Pepper`
  * `Sconosciuto`
* `name` String (optional) - The name of the process. i.e. for plugins it might be Flash. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `cpu` [CPUUsage](cpu-usage.md) - Uso di CPU del processo.
* `creationTime` Number - Creation time for this process. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - Informazioni della memoria per il processo.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `sconosciuto`
