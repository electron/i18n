# Compras integradas

> Compras In-app en Mac App Store.

Process: [Main](../glossary.md#main-process)

## Eventos

El módulo `inAppPurchase` emite los siguientes eventos:

### Evento: 'transactions-updated'

Emitido cuando una o más transacciones han sido actualizadas.

Devuelve:

* `event` Evento
* `transactions` ([Transaction[]](structures/transaction.md) - Array of transactions.

## Métodos

The `inAppPurchase` module has the following methods:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - The id of the product to purchase. (the id of `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - The number of items the user wants to purchase.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue. (You should add a listener with `inAppPurchase.addTransactionsListener` to get the transaction status). 
  * `isProductValid` Boolean - Determine if the product is valid and added to the payment queue.

### `inAppPurchase.canMakePayments()`

Devuelve un `Boolean`, dependiendo si el usuario puede hacer un pago.

### `inAppPurchase.getReceiptURL()`

Devuelve un `String`, que la ruta/dirección del recibo.