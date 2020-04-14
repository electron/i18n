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

* `productID` String - 预付款商品的ID (`com.example.app.product1` 的ID是 `product1`).
* `quantity` Integer (可选) - 用户所要购买的商品数量.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue.
  * `isProductValid` Boolean - 用来表示商品是否已经添加到支付队列中。

在调用`purchaseProduct`之前，你应该尽可能快的监听`transactions-updated`事件

**[即将弃用](modernization/promisification.md)**

### `inAppPurchase.purchaseProduct(productID, quantity)`

* `productID` String - 预付款商品的ID (`com.example.app.product1` 的ID是 `product1`).
* `quantity` Integer (可选) - 用户所要购买的商品数量.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

在调用`purchaseProduct`之前，你应该尽可能快的监听`transactions-updated`事件

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - 预购商品ID
* `callback` Function - The callback called with the products or an empty array if the products don't exist.
  * `products` Product[] - [`Product`](structures/product.md) 对象的数据

检索商品的描述

**[即将弃用](modernization/promisification.md)**

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - 预购商品ID

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

检索商品的描述

### `inAppPurchase.canMakePayments()`

返回 `Boolean`, 用来判断用户是否可以发起支付.

### `inAppPurchase.getReceiptURL()`

返回 `String`, 指收据路径.

### `inAppPurchase.finishAllTransactions()`

完成所有待处理的交易

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - 待完成交易的ISO标准日期格式

完成与日期对应的待处理事务
