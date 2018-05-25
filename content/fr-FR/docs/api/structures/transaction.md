# Objet Transaction

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - L'état de la transaction (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, ou `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Objet 
  * `productIdentifier` String
  * `quantity` Integer