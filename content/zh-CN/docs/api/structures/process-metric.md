# ProcessMetric 对象

* `pid` Integer - 进程ID
* `type` 字符串-过程类型。 以下值之一：
  * `浏览器`
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
* `creationTime` 编号 - 此过程的创建时间。 时间表示为自时代以来的毫秒数。 由于 `pid` 可以在过程结束后重复使用，因此 使用 `pid` 和 `creationTime` 来独特地识别过程是有用的。
* `memory` [MemoryInfo](memory-info.md) - 进程的内存信息。
* `sandboxed` 布尔 （可选） _macos_ _窗口_ - 这个过程是否在操作系统级别上沙盒。
* `integrityLevel` 字符串（可选） _视窗_ - 以下值之一：
  * `可信`
  * `低`
  * `中等`
  * `高`
  * `未知`
