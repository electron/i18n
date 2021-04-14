# inAppPurchase

> Mac App Store中的应用内购买

进程：[主进程](../glossary.md#main-process)

## 事件

`inAppPurchase` 模块触发以下事件:

### 事件：'transactions-updated'

一个或多个 transactions 更新时会触发这一事件。

返回:

* `event` Event
* `transactions` 交易[]- [`Transaction`](structures/transaction.md) 对象阵列。

## 方法

`inAppPurchase` 模块包含以下方法：

### `购买产品（产品ID[，数量]）`

* `productID` String - 预付款商品的ID (`com.example.app.product1` 的ID是 `product1`).
* `quantity` Integer (可选) - 用户所要购买的商品数量.

退货 `Promise<Boolean>` - 如果产品有效并添加到付款队列中，则返回 `true` 。

在调用`purchaseProduct`之前，你应该尽可能快的监听`transactions-updated`事件

### `在应用程序购买.获取产品（产品ID）`

* `productIDs` String[] - 预购商品ID

返回 `Promise<Product[]>` - 用一系列 [`Product`](structures/product.md) 对象解决。

检索商品的描述

### `inAppPurchase.canMakePayments()`

退货 `Boolean` - 用户是否可以付款。

### `在App购买。恢复已完成的交易（）`

恢复已完成的事务。 此方法可以称为在其他设备上安装购买，也可以为用户删除并重新安装的应用程序恢复购买。

[付款队列](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) 为可恢复的每个以前完成的事务提供新交易。 每笔交易都包含原始交易的副本。

### `inAppPurchase.getReceiptURL()`

返回 `String` - 收据的路径。

### `在应用程序购买。完成所有交易（）`

完成所有待处理的交易

### `在App购买。完成交易日期（日期）`

* `date` String - 待完成交易的ISO标准日期格式

完成与日期对应的待处理事务
