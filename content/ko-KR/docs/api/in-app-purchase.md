# inAppPurchase

> Mac App Store의 인앱 결제입니다.

프로세스:[Main](../glossary.md#main-process)

## 이벤트

`inAppPurchase` 모듈은 다음 이벤트를 발생시킵니다:

### Event: 'transactions-updated'

하나 이상의 트랜잭션이 업데이트됐을 때 발생합니다.

반환:

* `event` Event
* `transactions` Transaction[] - [`Transaction`](structures/transaction.md) 객체의 Array.

## 메소드

`inAppPurchase` 모듈은 다음 메서드를 가지고 있습니다:

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - 결제할 제품의 식별자. (`com.example.app.product1` 의 식별자는 `product1` 임).
* `quantity` Integer (선택적) - 사용자가 결제하기 원하는 항목의 수량.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

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