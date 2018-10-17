# 事务对象

* `transactionIdentifier` String - 成功加入队列的事务的唯一标识
* `transactionDate` String - 事务被加入队列的时间
* `originalTransactionIdentifier` String - The identifier of the restored transaction by the App Store.
* `transactionState` String - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - The error code if an error occurred while processing the transaction.
* `errorMessage` String - The error message if an error occurred while processing the transaction.
* `payment` Object 
  * `productIdentifier` String - The identifier of the purchased product.
  * `quantity` Integer - The quantity purchased.