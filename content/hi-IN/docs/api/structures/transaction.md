# Transaction Object

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - The transaction sate (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` ऑब्जेक्ट 
  * `productIdentifier` String
  * `quantity` Integer