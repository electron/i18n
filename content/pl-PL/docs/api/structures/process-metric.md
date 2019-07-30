# Obiekt ProcessMetric

* `pid` Integer - Indentyfikator procesu.
* `typ` String - Process type. One of the following values: 
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* 0>cpu</code> [CPUUsage](cpu-usage.md) - Zużycie CPU procesu.