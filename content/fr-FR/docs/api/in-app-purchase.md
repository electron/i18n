# Achat inApp

> Achats inApp sur l'Apple Store.

Processus : [Principal](../glossary.md#main-process)

## Événements

Le module `inAppPurchase` émet les événements suivants :

### Événement : 'transactions-updated'

Émis lorsqu’une ou plusieurs transactions ont été mises à jour.

Retourne :

* `event` Event
* `transactions` Transaction[] - Tableau d'objets [`Transaction`](structures/transaction.md).

## Méthodes

Le module `inAppPurchase` possède les méthodes suivantes :

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - Les identifiants du produit à acheter. (L'identifiant de `com.example.app.product1` est `product1`).
* `quantity` Integer (optionnel) - Le nombre d'items que l'utilisateur veut acheter.

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