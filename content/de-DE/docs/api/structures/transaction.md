# Transaction Object

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - Der Transaktions-Status (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, oder `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `Bezahlung` Object 
  * `productIdentifier` String
  * `quantity` Integer