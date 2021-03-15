# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
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
* `serviceName` String (optional) - The non-localized name of the process.
* `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.
* `creationTime` Number - Tiempo de creación para este proceso. El tiempo es representado como número de milisegundos desde la época. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - información de la memoria para el proceso.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `desconocido`
