# 事务对象

* `transactionIdentifier` String - 成功加入队列的事务的唯一标识
* `transactionDate` String - 事务被加入队列的时间
* `originalTransactionIdentifier` String - App Store恢复的事务的标识符
* `transactionState` String - 事务状态, 可以是 `purchasing`, `purchased`, `failed`, `restored` 或 `deferred`.
* `errorCode` Integer - 处理事务时发生错误时的错误代码。
* `errorMessage` String - 处理事务时发生错误时的错误消息。
* `payment` Object
  * `productIdentifier` String - 购买产品的标识符。
  * `quantity` Integer  - 购买数量。
