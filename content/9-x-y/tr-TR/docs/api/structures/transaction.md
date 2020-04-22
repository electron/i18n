# Transaction Object

* `transactionIdentifier` Bir karakter (string) şeklinde benzersiz bir şekilde başarılı bir ödeme transferini tanımlar.
* `transactionDate` Karakter - App Store'un ödeme sırasına eklenme tarihini geri döndürür.
* `originalTransactionIdentifier` String - The identifier of the restored transaction by the App Store.
* `transactionState` String - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - The error code if an error occurred while processing the transaction.
* `errorMessage` String - The error message if an error occurred while processing the transaction.
* `payment` Object
  * `productIdentifier` String - The identifier of the purchased product.
  * `quantity` Integer  - The quantity purchased.
