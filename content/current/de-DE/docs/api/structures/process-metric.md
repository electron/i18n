# ProcessMetric Objekt

* `pid` Integer - Prozess Id des Prozesses.
* `type` String - Prozess-Typ. Einer der folgenden Werte: 
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
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - Einer der folgenden Werte: 
  * `untrusted`
  * `niedrig`
  * `medium`
  * `hoch`
  * `unknown`