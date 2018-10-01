# Oggetto Transaction

* `transactionIdentifier` String - Una stringa che identifica univocamente una transazione di un pagamento andato a buon fine.
* `transactionDate` String - La data della transazione che è stata aggiunta alla coda di pagamento dell'App Store.
* `originalTransactionIdentifier` String - L'identificatore della transazione ripristinata dall'App Store.
* `transactionState` String - Lo stato della transazione, può essere `purchasing`, `purchased`, `failed`, `restored` o `deferred`.
* `errorCode` Integer - Il codice di errore se un errore si verifica durante l'elaborazione della transazione.
* `errorMessage` String - Il messaggio di errore se un errore si verifica durante l'elaborazione della transazione.
* `payment` Oggetto 
  * `productIdentifier` String - L'identificativo del prodotto acquistato.
  * `quantity` Integer - La quantità acquistata.