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