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
* `serviceName` String (opcional)-el nombre no localizado del proceso.
* `name` String (opcional)-el nombre del proceso. Ejemplos de utilidad: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `CPU` [CPUUsage](cpu-usage.md) - uso de CPU del proceso.
* `creationTime` Number - Tiempo de creación para este proceso. El tiempo es representado como número de milisegundos desde la época. Dado que el  `pid` puede ser usada después que un proceso muere, es útil usar  tanto el `pid` y el `creationTime` para identificar de forma única un proceso.
* `memory` [MemoryInfo](memory-info.md) - información de la memoria para el proceso.
* `sandboxed` Boolean (opcional) _macOS_ _Windows_ -si el proceso está en un espacio aislado en el nivel de sistema operativo.
* `integrityLevel` cadena (opcional) _Windows_ -uno de los siguientes valores:
  * `Untrusted`
  * `Bajo`
  * `Medio`
  * `Alto`
  * `desconocido`
