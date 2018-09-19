# Об'єкт Transaction

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - Стан транзакції (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, чи `"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer