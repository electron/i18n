# ProcessMetric 对象

* `pid` Integer - 进程ID
* `type` String - 进程类型。 以下值之一：
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `serviceName` String (可选) - 进程的非本地化名称。
* `name` String (可选) - 进程的名称。 功能性示例： `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, 等等。
* `cpu` [CPUUsage](cpu-usage.md) - CPU使用率
* `creationTime` Number - 此进程的创建时间。 新时代（1970-01-01 00:00:00 UTC）以来的毫秒数表示的时间。 由于 `pid` 可以在进程结束后被重复使用，因此经常同时使用 `pid` 和 `creationTime` 来唯一地识别一个进程。
* `memory` [MemoryInfo](memory-info.md) - 进程的内存信息。
* `sandboxed` Boolean (可选) _macOS_ _Windows_ - 该进程是否在操作系统级别上被沙盒化。
* `integrityLevel` String (可选) _Windows_ - 以下值之一：
  * `untrusted`
  * `低`
  * `medium`
  * `高`
  * `unknown`
