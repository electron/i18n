# Objeto Transaction

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` Cadena de caracteres - el objeto transacción sacia (`"purchasing"(adquiriendo)`, `"purchased"(adquirido)`, `"failed"(fallado)`, `"restored"(restaurado)`, o `"deferred"(diferido)`)
* `errorCode` Entero
* `errorMessage` Cadena de caracteres
* `payment` Objeto 
  * `productIdentifier` Cadena de caracteres
  * `quantity` Entero