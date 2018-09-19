# Объект Transaction

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - состояние транзакции (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer