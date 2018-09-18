# Objeto de Transação

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - O estado de transação (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer