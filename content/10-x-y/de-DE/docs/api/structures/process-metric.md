# ProcessMetric Objekt

* `pid` Integer - Prozess Id des Prozesses.
* `type` String - Process type. One of the following values:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - CPU-Auslastung des Prozesses.
* `CreationTime` Number - Erstellungszeit für diesen Prozess. Die Zeit wird seit der Epoche als Anzahl von Millisekunden dargestellt. Da die `pid` wiederverwendet werden kann, nachdem ein Prozess stirbt, ist es nützlich, sowohl `pid` als auch `creationTime` zu verwenden, um einen Prozess eindeutig zu identifizieren.
* `memory` [MemoryInfo](memory-info.md) - Speicherinformationen für den Prozess.
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `niedrig`
  * `medium`
  * `hoch`
  * `unknown`
