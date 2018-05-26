# inAppPurchase

> Покупки внутри приложения в Mac App Store.

Процесс: [Main](../glossary.md#main-process)

## События

The `inAppPurchase` module emits the following events:

### Ивент: 'transactions-updated'

Emitted when one or more transactions have been updated.

Возвращает:

* Событие типа `event`
* `transactions` ([Transaction[]](structures/transaction.md) - Array of transactions.

## Методы

The `inAppPurchase` module has the following methods:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - The id of the product to purchase. (the id of `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - The number of items the user wants to purchase.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue. (You should add a listener with `inAppPurchase.addTransactionsListener` to get the transaction status). 
  * `isProductValid` Boolean - Determine if the product is valid and added to the payment queue.

### `inAppPurchase.canMakePayments()`

Returns `Boolean`, whether a user can make a payment.

### `inAppPurchase.getReceiptURL()`

Returns `String`, the path to the receipt.