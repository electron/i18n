# inAppPurchase

> Покупки внутри приложения в Mac App Store.

Процесс: [Основной](../glossary.md#main-process)

## События

Модуль `inAppPurchase` генерирует следующие события:

### Ивент: 'transactions-updated'

Возникает при обновлении одной или нескольких транзакций.

Возвращает:

* `event` Event
* `transactions` Transaction[] - Массив [`Transaction`](structures/transaction.md) объектов.

## Методы

Модуль `inAppPurchase` имеет следующие методы:

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - Идентификаторы продукта для покупки. (Идентификатор `com.example.app.product1` это `product1`).
* `quantity` Integer (опционально) - Количество товаров, которое хочет приобрести пользователь.

Возвращает `Promise<Boolean>` - Возвращает `true`, если товар действителен и добавлен в очередь платежей.

Вы должны начать считывать событие `transactions-updated` как можно скорее и в любом случае перед тем, как вызвать `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Идентификаторы получаемых продуктов.

Возвращает `Promise<Product[]>` - Разрешает с массив объектов [`Product`](structures/product.md).

Получает описания товара.

### `inAppPurchase.canMakePayments()`

Возвращает `Boolean` - может ли пользователь произвести платеж.

### `inAppPurchase.restoreПолletedTransactions()`

How can I get paid for translation or proofreading of this? Do you pay by Paypal? Can i also create reports for this?-Pls reply-Thank you in adv. Этот метод можно назвать либо для установки покупок на дополнительных устройствах, либо для восстановления покупок для приложения, которое пользователь удалил и переустановило.

[Очередь платежей](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) новую транзакцию для каждой ранее завершенной транзакции, которая может быть восстановлена. Каждая транзакция включает в себя копию исходной транзакции.

### `inAppPurchase.getReceiptURL()`

Возвращает `String` - путь к квитанции.

### `inAppPurchase.finishAllTransactions()`

Завершает все ожидающие транзакции.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - Дата завершения транзакции в формате ISO.

Завершает отложенные транзакции, соответствующие дате.
