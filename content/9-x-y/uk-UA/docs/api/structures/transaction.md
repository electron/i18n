# Об'єкт Transaction

* `transactionIdentifier` String - Строка, яка однозначно ідентифікує успішну платіжну транзакцію.
* `transactionDate` String - Дата коли операція була додана до платіжної черги App Store.
* `originalTransactionIdentifier` String - Ідентифікатор відновленої через App Store транзакції.
* `transactionState` String - Стан транзакції, може бути `purchasing`, `purchased`, `failed`, `restored` або `deferred`.
* `errorCode` Integer - Код помилки, якщо під час обробки транзакції сталася помилка.
* `errorMessage` String - Повідомлення про помилку, якщо під час обробки транзакції сталася помилка.
* `payment` Object
  * `productIdentifier` String - Ідентифікатор придбаного продукту.
  * `quantity` Integer  - Кількість придбаного.
