# İşlem Nesnesi

* `pid` Tam sayı -İşlemcinin işlemci kimliği.
* `type` String - Process type. One of the following values:
  * `Browser`
  * `Sekme`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - İşlemin CPU kullanımı.
