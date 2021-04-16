# ProcessMetric 对象

* `pid` Integer - 进程ID
* `type` 字符串-过程类型。 以下值之一：
  * `Browser`
  * `Tab`
  * `实用`
  * `受精卵`
  * `沙盒帮手`
  * `Gpu`
  * `胡椒插件`
  * `胡椒插件经纪人`
  * `未知`
* `serviceName` 字符串（可选） - 过程的非本地化名称。
* `name` 字符串（可选） - 过程的名称。 实用工具示例： `Audio Service`、 `Content Decryption Module Service`、 `Network Service`、 `Video Capture`等。
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
