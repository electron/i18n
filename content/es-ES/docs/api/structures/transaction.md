# Objeto Transaction

* `transactionIdentifier` Cadena de caracteres
* `transactionDate` Cadena de caracteres
* `originalTransactionIdentifier` Cadena de caracteres
* `transactionState` Cadena de caracteres - el objeto transacción sacia (`"purchasing"(adquiriendo)`, `"purchased"(adquirido)`, `"failed"(fallado)`, `"restored"(restaurado)`, o `"deferred"(diferido)`)
* `errorCode` Entero
* `errorMessage` Cadena de caracteres
* `payment` Objeto 
  * `productIdentifier` Cadena de caracteres
  * `quantity` Entero