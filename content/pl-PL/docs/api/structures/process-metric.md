# Obiekt ProcessMetric

* `pid` Integer - Indentyfikator procesu.
* `type` String - Typ procesu. Jedna z następujących wartości: 
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
* `creationTime` Numer - Czas tworzenia dla tego procesu. Czas jest reprezentowany jako liczba milisekund od epoch. Ponieważ `pid` może być ponownie użyty po śmierci procesu, przydatne jest użycie `pid` i `creationTime` do jednoznacznego zidentyfikowania procesu.
* `memory` [MemoryInfo](memory-info.md) - Informacje dotyczące pamięci procesu.
* `sandboxed` Boolean (opcjonalne) *macOS* *Windows* - Czy proces jest w piaskownicy na poziomie systemu operacyjnego.
* `integrityLevel` String (opcjonalne) *Windows* Jedna z następujących wartości: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`