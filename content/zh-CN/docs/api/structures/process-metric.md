# ProcessMetric 对象

* `pid` Integer - 进程ID
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
* `serviceName` String (optional) - The non-localized name of the process.
* `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `cpu` [CPUUsage](cpu-usage.md) - CPU使用率
* `creationTime` Number - Creation time for this process. 时间表示为自时代以来的毫秒数。 Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - 进程的内存信息。
* `sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `低`
  * `medium`
  * `高`
  * `unknown`
