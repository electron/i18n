# Oggetto ProcessMetric

* `pid` Integer - Id del processo.
* `tipo` Stringa - Tipo di processo. Uno dei valori seguenti:
  * `Browser`
  * `Tab`
  * `Utilità`
  * `Zygote`
  * `Aiutante sandbox`
  * `GPU`
  * `Plugin Pepper`
  * `Broker del Plugin Pepper`
  * `Sconosciuto`
* `cpu` [CPUUsage](cpu-usage.md) - Uso di CPU del processo.
