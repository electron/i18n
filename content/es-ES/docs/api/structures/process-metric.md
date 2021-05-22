# Objeto ProcessMetric

* `pid` Integer - Identificador del proceso.
* `type` String - Tipo de proceso. Uno de los siguiente valores:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `serviceName` String (opcional) - El nombre no localizado del proceso.
* `name` String (opcional) - El nombre del proceso. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.
* `creationTime` Number - Tiempo de creación para este proceso. El tiempo es representado como número de milisegundos desde la época. Dado que el  `pid` puede ser usada después que un proceso muere, es útil usar  tanto el `pid` y el `creationTime` para identificar de forma única un proceso.
* `memory` [MemoryInfo](memory-info.md) - información de la memoria para el proceso.
* `sandboxed` Boolean (opcional) _macOS_ _Windows_ - Si el proceso está en un espacio aislado a nivel del sistema operativo.
* `integrityLevel` String (opcional) _Windows_ - Uno de los siguientes valores:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`
