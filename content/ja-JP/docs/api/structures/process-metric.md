# ProcessMetric オブジェクト

* `pid` Integer - プロセスのプロセス ID。
* `type` String - プロセスの種類。以下の値の一つ。 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - プロセスの CPU 使用率。
* `creationTime` Number - このプロセスの作成時間。 時間はエポックからのミリ秒数として表されます。 Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) - プロセスのメモリ情報。
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`