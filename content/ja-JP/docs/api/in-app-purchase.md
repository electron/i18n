# inAppPurchase

> Mac App Store のアプリ内購入。

プロセス: [Main](../glossary.md#main-process)

## イベント

`inAppPurchase` モジュールは以下のイベントが発生します。

### イベント: 'transactions-updated'

1つ以上のトランザクションが更新されたときに発生します。

戻り値:

* `event` Event
* `transactions` ([Transaction[]](structures/transaction.md) - トランザクションの配列。

## メソッド

`inAppPurchase` モジュールには以下のメソッドがあります。

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - 購入対象のプロダクトID。 (`com.example.app.product1` のIDは `product1` です).
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。
* `callback` Function (任意) - PaymentQueueに支払い情報が追加されたときに呼び出されるコールバック。 (トランザクション状態を取得するのに `inAppPurchase.addTransactionsListener` でリスナを追加する必要があります)。 
  * `isProductValid` Boolean - プロダクトが有効かつ支払いキューに追加されたかどうか決定する。

### `inAppPurchase.canMakePayments()`

戻り値 `Boolean` - ユーザが支払いできるかどうか。

### `inAppPurchase.getReceiptURL()`

戻り値 `String` - 領収書へのパス。