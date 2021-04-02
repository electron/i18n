# Objet ProcessMetric

* `pid` Integer - Id du processus.
* `type` String - Type de processus. Une des valeurs suivantes:
  * `Navigateur`
  * `Tab`
  * `Utilitaire`
  * `Zygote`
  * `Aide sandbox`
  * `Gpu`
  * `Plugin au poivre`
  * `Courtier Pepper Plugin`
  * `Inconnu`
* `serviceName` String (facultatif) - Le nom non localisé du processus.
* `name` String (facultatif) - Le nom du processus. Exemples d’utilité : `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `cpu` [CPUUsage](cpu-usage.md) - Usage CPU du processus.
* `creationTime` Nombre - Heure de création pour ce processus. Le temps est représenté par le nombre de millisecondes depuis l'epoch. Puisque le `pid` peut être réutilisé après la mort d'un processus, il est utile d'utiliser à la fois le `pid` et le `creationTime` pour identifier de manière unique un processus.
* `memory` [MemoryInfo](memory-info.md) - Information sur la mémoire du processus.
* `sandboxed` Boolean (facultatif) _macOS_ _Windows_ - Si le processus est bac à sable au niveau OS.
* `integrityLevel` String (facultatif) _Windows_ - L’une des valeurs suivantes:
  * `non-confiance`
  * `Faible`
  * `Douleur moyenne`
  * `Haute`
  * `Inconnu`
