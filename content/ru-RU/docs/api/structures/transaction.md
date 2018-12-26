# Объект Transaction

* `transactionIdentifier` String - Строка которая уникально идентифицирует успешную транзакцию оплаты.
* `transactionDate` String - Дата добавления транзакции в платежный список App Store.
* `originalTransactionIdentifier` String - Идентификатор восстановленных транзакций App Store.
* `transactionState` String - Состояние транзакции, может быть `purchasing` - покупается, `purchased` - куплено, `failed` - неудачно (не удалось, провалилось), `restored` - восстановлено or `deferred` - изменено. 
* `errorCode` Integer - Код ошибки если ошибка возникнет пока транзакция выполняется.
* `errorMessage` String - Сообщение об ошибке если ошибка возникнет пока транзакция выполняется.
* `payment` Object 
  * `productIdentifier` String - Идентификатор купленного продукта.
  * `quantity` Integer - Количество купленного.