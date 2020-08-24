# inAppPurchase

> Покупки внутри приложения в Mac App Store.

Процесс: [Главный](../glossary.md#main-process)

## События

Модуль `inAppPurchase` генерирует следующие события:

### Ивент: 'transactions-updated'

Возникает при обновлении одной или нескольких транзакций.

Возвращает:

* Событие типа `event`
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

Возвращает `Boolean`, может ли пользователь произвести платеж.

### `inAppPurchase.getReceiptURL()`

Возвращает `String`, путь к чеку (квитанции).

### `inAppPurchase.finishAllTransactions()`

Завершает все ожидающие транзакции.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - Дата завершения транзакции в формате ISO.

Завершает отложенные транзакции, соответствующие дате.
