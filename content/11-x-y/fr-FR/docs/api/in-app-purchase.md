# Achat inApp

> Achats inApp sur l'Apple Store.

Processus : [Main](../glossary.md#main-process)

## Événements

Le module `inAppPurchase` émet les événements suivants :

### Événement : 'transactions-updated'

Émis lorsqu’une ou plusieurs transactions ont été mises à jour.

Retourne :

* `event` Événement
* `transactions` Transaction[] - Tableau d'objets [`Transaction`](structures/transaction.md).

## Méthodes

Le module `inAppPurchase` possède les méthodes suivantes :

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - Les identifiants du produit à acheter. (L'identifiant de `com.example.app.product1` est `product1`).
* `quantity` Integer (optionnel) - Le nombre d'items que l'utilisateur veut acheter.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

Tu devrais écouter l'événement `transactions-updated` dès que possible et surement avant d'appeler `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Les identifiants des produits à recevoir.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Retourne les descriptions des produits.

### `inAppPurchase.canMakePayments()`

Returns `Boolean` - whether a user can make a payment.

### `inAppPurchase.restoreCompletedTransactions()`

Restores finished transactions. This method can be called either to install purchases on additional devices, or to restore purchases for an application that the user deleted and reinstalled.

[The payment queue](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) delivers a new transaction for each previously completed transaction that can be restored. Each transaction includes a copy of the original transaction.

### `inAppPurchase.getReceiptURL()`

Returns `String` - the path to the receipt.

### `inAppPurchase.finishAllTransactions()`

Termine toutes les transactions en cours.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - La date sous format ISO de la fin de la transaction.

Termine les transactions correspondantes à la date.
