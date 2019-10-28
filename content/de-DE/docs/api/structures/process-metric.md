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
* `creationTime` Number - Creation time for this process. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - Speicherinformationen für den Prozess.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `niedrig`
  * `medium`
  * `hoch`
  * `unknown`