# ProcessMetric Objekt

* `PID` Integer - Prozess-Id des Prozesses.
* `Typ` String - Prozess-Typ. Einer der folgenden Werte:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - CPU-Auslastung des Prozesses.
