# ProcessMetric Object

* `pid` Integer - Process id of the process.
* `type` String - Process type. Một trong những điều sau đây:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - CPU usage of the process.
