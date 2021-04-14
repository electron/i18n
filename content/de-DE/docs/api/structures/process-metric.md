# ProcessMetric Objekt

* `pid` Integer - Prozess Id des Prozesses.
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
* `serviceName` String (optional) - Der nicht lokalisierte Name des Prozesses.
* `name` String (optional) - Der Name des Prozesses. Beispiele für Dienstprogramme: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`usw.
* `cpu` [CPUUsage](cpu-usage.md) - CPU-Auslastung des Prozesses.
* `CreationTime` Number - Erstellungszeit für diesen Prozess. Die Zeit wird seit der Epoche als Anzahl von Millisekunden dargestellt. Da die `pid` wiederverwendet werden kann, nachdem ein Prozess stirbt, ist es nützlich, sowohl `pid` als auch `creationTime` zu verwenden, um einen Prozess eindeutig zu identifizieren.
* `memory` [MemoryInfo](memory-info.md) - Speicherinformationen für den Prozess.
* `sandboxed` boolesch (optional) _macOS_ _Windows_ - Gibt an, ob der Prozess auf Betriebssystemebene sandkastenbasiert ist.
* `integrityLevel` String (optional) _Windows_ - Einer der folgenden Werte:
  * `untrusted`
  * `niedrig`
  * `medium`
  * `hoch`
  * `unknown`
