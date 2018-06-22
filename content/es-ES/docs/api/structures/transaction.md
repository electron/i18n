# Objeto Transaction

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - El estado de la transacción (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, o `"deferred"`)
* `errorCode` Entero
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer