# Transaction 객체

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - 거래 상태 (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer