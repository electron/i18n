# Transaction Objekt

* `transactionIdentifier` String - Ein String zur eindeutigen Identifikation einer erfolgreichen Zahlungstransaktion.
* `transactionDate` String - Das Datum, an dem die Transaktion zur Zahlungswarteschlange des App Stores hinzugefügt wurde.
* `originalTransactionIdentifier` String - Die Kennung der wiederhergestellten Transaktion durch den App Store.
* `transactionState` String - Der Transaktionsstatus, kann `purchasing`, `purchased`, `failed`, `restored`, oder `deferred` sein.
* `errorCode` Integer - Der Fehlercode, falls ein Fehler beim Verarbeiten der Transaktion aufgetreten ist.
* `errorMessage` String - Die Fehlermeldung, falls ein Fehler beim Verarbeiten der Transaktion aufgetreten ist.
* `payment` Objekt
  * `productIdentifier` String - Die Kennung des gekauften Produktes.
  * `quantity` Integer  - Die gekaufte Menge.
