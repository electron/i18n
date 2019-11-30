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

* `productIDs` String[] - The identifiers of the products to get.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Retrieves the product descriptions.

### `inAppPurchase.canMakePayments()`

Returns `Boolean`, whether a user can make a payment.

### `inAppPurchase.getReceiptURL()`

Returns `String`, the path to the receipt.

### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.