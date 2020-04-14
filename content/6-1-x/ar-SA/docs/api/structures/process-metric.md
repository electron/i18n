# Process الكائن

* `pid` عدد صحيح - معرف العملية في المعالج.
* `type` String - Process type. One of the following values:
  * `Browser`
  * `التبويب`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - استخدام المعالج CPU لهذه العملية.
