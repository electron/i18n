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
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.
* `creationTime` Number - Tiempo de creación para este proceso. El tiempo es representado como número de milisegundos desde la época. Dado que el  `pid` puede ser usada después que un proceso muere, es útil usar  tanto el `pid` y el `creationTime` para identificar de forma única un proceso.
* `memory` [MemoryInfo](memory-info.md) - información de la memoria para el proceso.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `desconocido`
