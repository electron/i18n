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

### `inAppPurchase.purchaseProduct (productID[, quantité])`

* `productID` String - Les identifiants du produit à acheter. (L'identifiant de `com.example.app.product1` est `product1`).
* `quantity` Integer (optionnel) - Le nombre d'items que l'utilisateur veut acheter.

Retours `Promise<Boolean>` - Retours `true` le produit est valide et ajouté à la file d’attente de paiement.

Tu devrais écouter l'événement `transactions-updated` dès que possible et surement avant d'appeler `purchaseProduct`.

### `inAppPurchase.getProducts (productIDs)`

* `productIDs` String[] - Les identifiants des produits à recevoir.

Retourne `Promise<Product[]>` - Se résout avec un éventail d' [`Product`](structures/product.md) objets.

Retourne les descriptions des produits.

### `inAppPurchase.canMakePayments()`

Retours `Boolean` - si un utilisateur peut effectuer un paiement.

### `inAppPurchase.restoreTransactions inachevées ()`

Restaure les transactions terminées. Cette méthode peut être appelée soit pour installer des achats sur des appareils supplémentaires, soit pour restaurer les achats d’une application que l’utilisateur a supprimée et réinstallée.

[la file d’attente](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) paiement offre une nouvelle transaction pour chaque transaction précédemment terminée qui peut être restaurée. Chaque transaction comprend une copie de la transaction originale.

### `inAppPurchase.getReceiptURL()`

Retourne `String` - le chemin vers le reçu.

### `inAppPurchase.finishAllTransactions()`

Termine toutes les transactions en cours.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - La date sous format ISO de la fin de la transaction.

Termine les transactions correspondantes à la date.
