# Transaction Objekt

* `transactionIdentifier` String - Eine Zeichenfolge, die eine erfolgreiche Zahlungstransaktion eindeutig identifiziert.
* `transactionDate` String - Das Datum, an dem die Transaktion der Zahlungswarteschlange des App Store hinzugefügt wurde.
* `originalTransactionIdentifier` String - Der Bezeichner der wiederhergestellten Transaktion durch den App Store.
* `transactionState` String - Der Transaktionsstatus kann `purchasing`, `purchased`, `failed`, `restored` oder `deferred`sein.
* `errorCode` Ganzzahl - Der Fehlercode, wenn während der Verarbeitung der Transaktion ein Fehler aufgetreten ist.
* `errorMessage` String - Die Fehlermeldung, wenn während der Verarbeitung der Transaktion ein Fehler aufgetreten ist.
* `payment` -Objekt
  * `productIdentifier` String - Die Kennung des gekauften Produkts.
  * `quantity` Ganzzahl - Die gekaufte Menge.
