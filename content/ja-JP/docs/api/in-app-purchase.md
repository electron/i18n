# inAppPurchase

> Mac App Store のアプリ内購入。

プロセス: [Main](../glossary.md#main-process)

## イベント

`inAppPurchase` モジュールは以下のイベントが発生します。

### イベント: 'transactions-updated'

1つ以上のトランザクションが更新されたときに発生します。

戻り値:

* `event` Event
* `transactions` ([Transaction[]](structures/transaction.md) - Array of transactions.

## メソッド

`inAppPurchase` モジュールには以下のメソッドがあります。

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - The id of the product to purchase. (the id of `com.example.app.product1` is `product1`).
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue. (You should add a listener with `inAppPurchase.addTransactionsListener` to get the transaction status). 
  * `isProductValid` Boolean - プロダクトが有効かつ支払いキューに追加されたかどうか決定する。

### `inAppPurchase.canMakePayments()`

Returns `Boolean`, whether a user can make a payment.

### `inAppPurchase.getReceiptURL()`

Returns `String`, the path to the receipt.