# Transaction 对象

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - transaction状态 (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, 或 `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer