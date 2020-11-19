# Objet Transaction

* `transactionIdentifier` String - Une chaîne de caractères qui identifies de manière unique une transaction de paiement réussie.
* `transactionDate` String - La date où la transaction à été ajoutée à la file de paiements de l'App Store.
* `originalTransactionIdentifier` String - L'identifieur de la transaction restaurée par l'App Store.
* `transactionState` String - L'état de la transaction - peut valoir `purchasing`, `purchased`, `failed`, `restored` ou `deferred`.
* `errorCode` Integer - Le code d'erreur si une erreur est survenue pendant le traitement de la transaction.
* `errorMessage` String - Le message d'erreur si une erreur est survenue pendant le traitement de la transaction.
* `payment` Object
  * `productIdentifier` String - L'identifieur du produit acheté.
  * `quantity` Integer - La quantité achetée.
