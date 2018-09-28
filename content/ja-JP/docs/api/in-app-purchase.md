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

* `productID` String - 購入する製品の識別子。 (The identifier of `com.example.app.product1` is `product1`).
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。
* `callback` Function (任意) - PaymentQueueに支払い情報が追加されたときに呼び出されるコールバック。 
    * `isProductValid` Boolean - プロダクトが有効かつ支払いキューに追加されたかどうか決定する。

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - The identifiers of the products to get.
* `callback` Function - The callback called with the products or an empty array if the products don't exist. 
    * `products` Product[] - Array of [`Product`](structures/product.md) objects

Retrieves the product descriptions.

### `inAppPurchase.canMakePayments()`

戻り値 `Boolean` - ユーザが支払いできるかどうか。

### `inAppPurchase.getReceiptURL()`

戻り値 `String` - 領収書へのパス。

### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.