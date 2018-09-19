# Transaction Object

* `transactionIdentifier` String
* `transactionDate` String
* `originalTransactionIdentifier` String
* `transactionState` String - The transaction sate (`"purchasing"`, `"purchased"`, `"failed"`, `"restored"`, or `"deferred"`)
* `kode kesalahan` Bilangan bulat
* `errorMessage` String
* `payment` Obyek 
  * `productIdentifier` String
  * `quantity` Integer