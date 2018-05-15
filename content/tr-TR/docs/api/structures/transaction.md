# Transaction Object

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - The transaction sate (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `errorCode` Tamsayı
* `errorMessage` String
* `payment` Nesne 
  * `productIdentifier` String
  * `quantity` Integer