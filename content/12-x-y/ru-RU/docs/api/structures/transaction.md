# Объект Transaction

* `transactionIdentifier` String - строка, которая уникально идентифицирует успешную транзакцию оплаты.
* `transactionDate` String - дата добавления транзакции в платежный список App Store.
* `originalTransactionIdentifier` String - идентификатор восстановленной транзакции App Store.
* `transactionState` String - состояние транзакции, может быть `purchasing`, `purchased`, `failed`, `restored` или `deferred`.
* `errorCode` Integer - код ошибки, если ошибка возникнет во время выполнения транзакции.
* `errorMessage` String - сообщение об ошибке, если ошибка возникнет во время выполнения транзакции.
* `payment` Object
  * `productIdentifier` String - идентификатор купленного продукта.
  * `quantity` Integer  - количество купленного.
