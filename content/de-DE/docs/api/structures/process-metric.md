# ProcessMetric Objekt

* `pid` Integer - Prozess Id des Prozesses.
* `type` String - Prozess-Typ. Einer der folgenden Werte: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox-Helfer`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unbekannt`
* `cpu` [CPUUsage](cpu-usage.md) - CPU-Auslastung des Prozesses.
* `CreationTime` Number - Erstellungszeit für diesen Prozess. Die Zeit wird seit der Epoche als Anzahl von Millisekunden dargestellt. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - Speicherinformationen für den Prozess.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - Einer der folgenden Werte: 
  * `untrusted`
  * `niedrig`
  * `medium`
  * `hoch`
  * `unknown`