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

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - 購入する製品の識別子。 (`com.example.app.product1` の識別子は `product1`)。
* `quantity` Integer (任意) - ユーザーが購入しようとしている商品数。

戻り値 `Promise<Boolean>` - プロダクトが有効で支払いキューに追加されている場合は、`true` を返します。

`purchaseProduct` を呼び出す前に、できるだけ早く `transactions-updated` イベントをリッスンする必要があります。

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - 取得する製品の識別子。

戻り値 `Promise<Product[]>` - [`Product`](structures/product.md) オブジェクトの配列で実行されます。

製品説明を探します。

### `inAppPurchase.canMakePayments()`

戻り値 `Boolean` - ユーザが支払いできるかどうか。

### `inAppPurchase.getReceiptURL()`

戻り値 `String` - 領収書へのパス。

### `inAppPurchase.finishAllTransactions()`

すべての保留中の取引を完了させます。

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - 取引を終える ISO 形式の日付。

日付に対応するすべての保留中の取引を完了させます。
