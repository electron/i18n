# Objet ProcessMetric

* `pid` Integer - Id du processus.
* `type` String - Type de processus. Une des valeurs suivantes:
  * `Navigateur`
  * `Tab`
  * `Utilitaire`
  * `Zygote`
  * `Assistant bac à sable`
  * `GPU`
  * `Plugin Pepper`
  * `Broker de plugin Pepper`
  * `Inconnu`
* `cpu` [CPUUsage](cpu-usage.md) - Usage CPU du processus.
