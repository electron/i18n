# Transaction オブジェクト

* `transactionIdentifier` String - 支払取引の成功を識別する一意な文字列。
* `transactionDate` String - App Store の支払いキューに取引情報が追加された日付。
* `originalTransactionIdentifier` String - The identifier of the restored transaction by the App Store.
* `transactionState` String - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - The error code if an error occurred while processing the transaction.
* `errorMessage` String - The error message if an error occurred while processing the transaction.
* `payment` Object 
  * `productIdentifier` String - The identifier of the purchased product.
  * `quantity` Integer - The quantity purchased.