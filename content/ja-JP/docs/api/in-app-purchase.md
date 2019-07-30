# inAppPurchase

> Mac App Store のアプリ内購入。

プロセス: [Main](../glossary.md#main-process)

## イベント

`inAppPurchase` モジュールは以下のイベントが発生します。

### イベント: 'transactions-updated'

1つ以上のトランザクションが更新されたときに発生します。

戻り値:

* `event` Event
* `transactions` Transaction[] - [`Transaction`](structures/transaction.md) オブジェクトの配列。

## メソッド

`inAppPurchase` モジュールには以下のメソッドがあります。

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - 購入する製品の識別子。 (`com.example.app.product1` の識別子は `product1`)。
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。
* `callback` Function (任意) - PaymentQueueに支払い情報が追加されたときに呼び出されるコールバック。 
  * `isProductValid` Boolean - プロダクトが有効かつ支払いキューに追加されたかどうか決定する。

`purchaseProduct` を呼び出す前に、できるだけ早く `transactions-updated` イベントをリッスンする必要があります。

**[非推奨予定](modernization/promisification.md)**

### `inAppPurchase.purchaseProduct(productID, quantity)`

* `productID` String - 購入する製品の識別子。 (`com.example.app.product1` の識別子は `product1`)。
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

`purchaseProduct` を呼び出す前に、できるだけ早く `transactions-updated` イベントをリッスンする必要があります。

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - The identifiers of the products to get.
* `callback` Function - The callback called with the products or an empty array if the products don't exist. 
  * `products` Product[] - Array of [`Product`](structures/product.md) objects

Retrieves the product descriptions.

**[非推奨予定](modernization/promisification.md)**

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - The identifiers of the products to get.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Retrieves the product descriptions.

### `inAppPurchase.canMakePayments()`

Returns `Boolean`, whether a user can make a payment.

### `inAppPurchase.getReceiptURL()`

Returns `String`, the path to the receipt.

### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.