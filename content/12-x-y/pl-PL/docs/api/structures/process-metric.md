# Obiekt ProcessMetric

* `pid` Integer - Indentyfikator procesu.
* `type` String - Process type. One of the following values:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `serviceName` String (optional) - The non-localized name of the process.
* `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* 0>cpu</code> [CPUUsage](cpu-usage.md) - Zużycie CPU procesu.
* `creationTime` Numer - Czas tworzenia dla tego procesu. Czas jest reprezentowany jako liczba milisekund od epoch. Ponieważ `pid` może być ponownie użyty po śmierci procesu, przydatne jest użycie `pid` i `creationTime` do jednoznacznego zidentyfikowania procesu.
* `memory` [MemoryInfo](memory-info.md) - Informacje dotyczące pamięci procesu.
* `sandboxed` Boolean (opcjonalne) _macOS_ _Windows_ - Czy proces jest w piaskownicy na poziomie systemu operacyjnego.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`
