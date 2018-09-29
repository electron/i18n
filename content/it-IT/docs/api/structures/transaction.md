# Oggetto Transaction

* `transactionIdentifier` String - Una stringa che identifica univocamente una transazione di un pagamento andato a buon fine.
* `transactionDate` String - La data della transazione che è stata aggiunta alla coda di pagamento dell'App Store.
* `originalTransactionIdentifier` String - L'identificatore della transazione ripristinata dall'App Store.
* `transactionState` String - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - The error code if an error occurred while processing the transaction.
* `errorMessage` String - The error message if an error occurred while processing the transaction.
* `payment` Oggetto 
  * `productIdentifier` String - The identifier of the purchased product.
  * `quantity` Integer - The quantity purchased.