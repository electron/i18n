# Oggetto Transaction

* `transactionIdentifier` Stringa
* `transactionDate` Stringa
* `originalTransactionIdentifier` Stringa
* `transactionState` Stringa - Lo stato della transazione (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, oppure `"deferred"`)
* `errorCode` Integer
* `errorMessage` Stringa
* `payment` Oggetto 
  * `productIdentifier` Stringa
  * `quantity` Integer