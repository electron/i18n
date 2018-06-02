# inAppPurchase

> Mac App Store中的应用内购买

进程：[主进程](../glossary.md#main-process)

## 事件

`inAppPurchase` 模块触发以下事件:

### 事件：'transactions-updated'

一个或多个 transactions 更新时会触发这一事件。

返回:

* `event` Event
* `transactions` ([Transaction[]](structures/transaction.md) - transactions数组.

## 方法

`inAppPurchase` 模块包含以下方法：

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - 所要购买商品的id. (`com.example.app.product1` 的id是 `product1`).
* `quantity` Integer (可选) - 用户所要购买的商品数量.
* `callback` Function (可选) - 当购买事件被推到 PaymentQueue中时触发这个回调函数. (你可以通过添加一个 `inAppPurchase.addTransactionsListener` 监听器来获取 transaction的状态)。 
  * `isProductValid` Boolean - 用来表示商品是否已经添加到支付队列中。

### `inAppPurchase.canMakePayments()`

返回 `Boolean`, 用来判断用户是否可以发起支付.

### `inAppPurchase.getReceiptURL()`

返回 `String`, 指收据路径.