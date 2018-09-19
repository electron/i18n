# Achat inApp

> Achats inApp sur l'Apple Store.

Processus : [Principal](../glossary.md#main-process)

## Événements

Le module `inAppPurchase` émet les événements suivants :

### Événement : 'transactions-updated'

Émis lorsqu’une ou plusieurs transactions ont été mises à jour.

Retourne :

* `event` Event
* `transactions` ([Transaction[]](structures/transaction.md) - Tableau de transactions.

## Méthodes

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