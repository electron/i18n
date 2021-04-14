# inAppPurchase

> Compras no aplicativo na Mac App Store.

Processo: [Main](../glossary.md#main-process)

## Eventos

O módulo `inAppPurchase` emite os seguintes eventos:

### Evento: 'atualizado em transações'

Emitido quando uma ou mais transações foram atualizadas.

Retorna:

* `event` Event
* `transactions` Transaction[] - Matriz de objetos [`Transaction`](structures/transaction.md) .

## Métodos

O módulo `inAppPurchase` tem os seguintes métodos:

### `inAppPurchase.purchaseProduct (productID[, quantidade])`

* `productID` String - Os identificadores do produto para compra. (O identificador de `com.example.app.product1` é `product1`).
* `quantity` Inteiro (opcional) - O número de itens que o usuário deseja comprar.

Devolução `Promise<Boolean>` - Devoluções `true` se o produto for válido e adicionado à fila de pagamento.

Você deve ouvir o evento `transactions-updated` o mais rápido possível e certamente antes de chamar `purchaseProduct`.

### `inAppPurchase.getProducts (productIDs)`

* `productIDs` String[] - Os identificadores dos produtos para obter.

Devoluções `Promise<Product[]>` - Resolve com uma matriz de objetos [`Product`](structures/product.md) .

Recupera as descrições do produto.

### `inAppPurchase.canMakePayments()`

Devoluções `Boolean` - se um usuário pode fazer um pagamento.

### `inAppPurchase.restoreTransactionscompletedTransactions()`

Restaura transações concluídas. Este método pode ser chamado para instalar compras em dispositivos adicionais ou para restaurar compras para um aplicativo que o usuário excluiu e reinstalou.

[A fila de pagamento](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) oferece uma nova transação para cada transação previamente concluída que pode ser restaurada. Cada transação inclui uma cópia da transação original.

### `inAppPurchase.getReceiptURL()`

Devoluções `String` - o caminho para o recebimento.

### `inAppPurchase.finishAllTransactions()`

Completa todas as transações pendentes.

### `inAppPurchase.finishTransactionByDate(data)`

* `date` String - A data formatada da transação para finalizar.

Completa as transações pendentes correspondentes à data.
