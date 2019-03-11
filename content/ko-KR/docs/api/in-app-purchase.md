# inAppPurchase

> Mac App Store의 인앱 결제입니다.

프로세스:[Main](../glossary.md#main-process)

## 이벤트

The `inAppPurchase` module emits the following events:

### 이벤트: 'transactions-updated'

Emitted when one or more transactions have been updated.

반환:

* `event` Event
* `transactions` Transaction[] - [`Transaction`](structures/transaction.md) 객체의 Array.

## 메소드

`inAppPurchase` 모듈은 다음 메서드를 가지고 있습니다:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - The identifiers of the product to purchase. (The identifier of `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - The number of items the user wants to purchase.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue. 
    * `isProductValid` Boolean - Determine if the product is valid and added to the payment queue.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - The identifiers of the products to get.
* `callback` Function - The callback called with the products or an empty array if the products don't exist. 
    * `products` Product[] - Array of [`Product`](structures/product.md) objects

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