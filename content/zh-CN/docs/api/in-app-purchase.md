# inAppPurchase

> Mac App Store中的应用内购买

进程：[主进程](../glossary.md#main-process)

## 事件

`inAppPurchase` 模块触发以下事件:

### 事件：'transactions-updated'

一个或多个 transactions 更新时会触发这一事件。

返回:

* `event` Event
* `transactions` Transaction[] - Array of [`Transaction`](structures/transaction.md) objects.

## 方法

`inAppPurchase` 模块包含以下方法：

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - The identifiers of the product to purchase. (The identifier of `com.example.app.product1` is `product1`).
* `quantity` Integer (可选) - 用户所要购买的商品数量.
* `callback` Function (可选) - 当购买事件被推到 PaymentQueue中时触发这个回调函数. 
    * `isProductValid` Boolean - 用来表示商品是否已经添加到支付队列中。

在调用`purchaseProduct`之前，你应该尽可能快的监听`transactions-updated`事件

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - 预购商品ID
* `callback` Function - 当商品不存在时，被商品对象或空的列表调用的回调 
    * `products` Product[] - [`Product`](structures/product.md) 对象的数据

Retrieves the product descriptions.

### `inAppPurchase.canMakePayments()`

返回 `Boolean`, 用来判断用户是否可以发起支付.

### `inAppPurchase.getReceiptURL()`

返回 `String`, 指收据路径.

### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.