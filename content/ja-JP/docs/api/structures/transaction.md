# Transaction オブジェクト

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - トランザクションステート (`"purchasing"`、`"purchased"`、`"failed"`、`"restored"`、`"deferred"`)
* `errorCode` Integer
* `errorMessage` String
* `payment` Object 
  * `productIdentifier` String
  * `quantity` Integer