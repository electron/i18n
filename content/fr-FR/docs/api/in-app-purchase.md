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

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - Les identifiants du produit à acheter. (L'identifiant de `com.example.app.product1` est `product1`).
* `quantity` Integer (optionnel) - Le nombre d'items que l'utilisateur veut acheter.
* `callback` Function (optionnel) - La fonction de retour appellée lorsque le paiement est ajouté au `PaymentQueue`. 
    * `isProductValid` Boolean - Détermine si le produit est valide et ajouté à la file de paiements.

Tu devrais écouter l'événement `transactions-updated` dès que possible et surement avant d'appeler `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - Les identifiants des produits à recevoir.
* `callback` Function - La fonction de retour appelée avec le produit ou un tableau vide si le produit n'existe pas. 
    * `products` Product[] - Tableau d'objets [`Product`](structures/product.md)

Retourne les descriptions des produits.

### `inAppPurchase.canMakePayments()`

Retourne un `Boolean`, qui dit si l'utilisateur peut faire un paiement.

### `inAppPurchase.getReceiptURL()`

Retourne une `String`, l'URL du reçu.

### `inAppPurchase.finishAllTransactions()`

Termine toutes les transactions en cours.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - La date sous format ISO de la fin de la transaction.

Termine les transactions correspondantes à la date.