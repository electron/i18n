# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
* `type` String - Process type. One of the following values:
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
* `creationTime` Number - Creation time for this process. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - información de la memoria para el proceso.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `desconocido`
